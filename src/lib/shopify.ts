// src/lib/shopify.ts
import { GraphQLClient, gql, ClientError } from "graphql-request";

const SHOP = process.env.SHOPIFY_SHOP;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION || "2024-10";

function client() {
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

export async function getOrderStatusByName(orderName: string) {
  const c = client();

  // ✅ Removed deprecated/removed `fulfillmentStatus`
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
      status: o.displayFulfillmentStatus ?? null, // ← use displayFulfillmentStatus
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
