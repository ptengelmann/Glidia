// src/lib/shopify.ts
import { GraphQLClient, gql, ClientError } from "graphql-request";
import { dbConnect } from './db';
import mongoose from 'mongoose';

const API_VERSION = process.env.SHOPIFY_API_VERSION || "2024-10";

// Store schema for accessing OAuth tokens
const StoreSchema = new mongoose.Schema({
  shop: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  scopes: { type: String, required: true },
  installedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true
});

const Store = mongoose.models.Store || mongoose.model('Store', StoreSchema);

// Get OAuth token for a shop
async function getShopToken(shop: string) {
  await dbConnect();
  const store = await Store.findOne({ shop, isActive: true });
  if (!store) {
    throw new Error(`No active installation found for shop: ${shop}`);
  }
  return store.accessToken;
}

// Create GraphQL client with OAuth token
async function client(shop: string) {
  if (!shop) throw new Error("Shop parameter required");
  
  const token = await getShopToken(shop);
  const endpoint = `https://${shop}/admin/api/${API_VERSION}/graphql.json`;
  
  return new GraphQLClient(endpoint, {
    headers: {
      "X-Shopify-Access-Token": token,
      "Content-Type": "application/json",
    },
  });
}

// Legacy client for backwards compatibility (when you have SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN)
function legacyClient() {
  const SHOP = process.env.SHOPIFY_SHOP;
  const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
  
  if (!SHOP) throw new Error("SHOPIFY_SHOP missing");
  if (!TOKEN) throw new Error("SHOPIFY_ADMIN_TOKEN missing");
  
  const endpoint = `https://${SHOP}/admin/api/${API_VERSION}/graphql.json`;
  return new GraphQLClient(endpoint, {
    headers: {
      "X-Shopify-Access-Token": TOKEN,
      "Content-Type": "application/json",
    },
  });
}

export async function getOrderStatusByName(orderName: string, shop?: string) {
  let c: GraphQLClient;
  
  // Use OAuth token if shop provided, otherwise fall back to legacy
  if (shop) {
    c = await client(shop);
  } else {
    c = legacyClient();
  }

  const QUERY = gql`
    query OrderByName($query: String!) {
      orders(first: 1, query: $query) {
        edges {
          node {
            id
            name
            displayFulfillmentStatus
            fulfillments(first: 5) {
              trackingInfo { number url company }
              status
              createdAt
            }
            shippingAddress { name city country }
            processedAt
            totalPriceSet { shopMoney { amount currencyCode } }
          }
        }
      }
    }
  `;

  const q = `name:${orderName.startsWith("#") ? orderName : `#${orderName}`}`;

  try {
    const data = await c.request<any>(QUERY, { query: q });
    const edge = data?.orders?.edges?.[0];
    if (!edge) return null;
    const o = edge.node;

    const firstTracking = o.fulfillments?.[0]?.trackingInfo?.[0] || null;

    return {
      id: o.id,
      name: o.name,
      status: o.displayFulfillmentStatus ?? null,
      tracking: firstTracking
        ? { number: firstTracking.number, url: firstTracking.url, company: firstTracking.company }
        : null,
      processedAt: o.processedAt,
      shipTo: o.shippingAddress?.city
        ? `${o.shippingAddress.name} — ${o.shippingAddress.city}, ${o.shippingAddress.country}`
        : null,
      total: o.totalPriceSet?.shopMoney,
    };
  } catch (e: any) {
    if (e instanceof ClientError) {
      console.error("Shopify GraphQL errors:", e.response?.errors);
      throw new Error(
        "Shopify API error: " +
          (e.response?.errors?.map((er: any) => er.message).join("; ") || "Unknown")
      );
    }
    throw e;
  }
}