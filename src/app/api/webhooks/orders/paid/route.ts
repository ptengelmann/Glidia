// src/app/api/webhooks/orders/paid/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhook } from '@/lib/shopify-oauth';
import { dbConnect } from '@/lib/db';
import mongoose from 'mongoose';

// Order cache schema for faster WISMO responses
const OrderCacheSchema = new mongoose.Schema({
  shopDomain: { type: String, required: true },
  orderId: { type: String, required: true },
  orderNumber: { type: String, required: true },
  customerEmail: { type: String },
  customerName: { type: String },
  status: { type: String },
  fulfillmentStatus: { type: String },
  financialStatus: { type: String },
  totalPrice: { type: Number },
  currency: { type: String },
  shippingAddress: {
    name: String,
    address1: String,
    city: String,
    country: String,
    zip: String,
  },
  lineItems: [
    {
      productId: String,
      variantId: String,
      title: String,
      quantity: Number,
      price: Number,
    }
  ],
  tracking: {
    company: String,
    number: String,
    url: String,
  },
  createdAt: { type: Date },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
  indexes: [
    { shopDomain: 1, orderNumber: 1 },
    { shopDomain: 1, customerEmail: 1 },
  ]
});

const OrderCache = mongoose.models.OrderCache || mongoose.model('OrderCache', OrderCacheSchema);

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const hmacHeader = req.headers.get('x-shopify-hmac-sha256');
    const shopDomain = req.headers.get('x-shopify-shop-domain');

    if (!hmacHeader || !shopDomain) {
      return NextResponse.json({ error: 'Missing required headers' }, { status: 401 });
    }

    if (!verifyWebhook(rawBody, hmacHeader)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const order = JSON.parse(rawBody);

    console.log(`💰 New order #${order.order_number} from ${shopDomain}`);

    await dbConnect();

    // Cache order data for faster WISMO responses
    await OrderCache.findOneAndUpdate(
      { 
        shopDomain,
        orderId: order.id.toString() 
      },
      {
        shopDomain,
        orderId: order.id.toString(),
        orderNumber: `#${order.order_number}`,
        customerEmail: order.email,
        customerName: `${order.billing_address?.first_name} ${order.billing_address?.last_name}`.trim(),
        status: 'paid',
        fulfillmentStatus: order.fulfillment_status || 'unfulfilled',
        financialStatus: order.financial_status,
        totalPrice: parseFloat(order.total_price),
        currency: order.currency,
        shippingAddress: order.shipping_address ? {
          name: `${order.shipping_address.first_name} ${order.shipping_address.last_name}`.trim(),
          address1: order.shipping_address.address1,
          city: order.shipping_address.city,
          country: order.shipping_address.country,
          zip: order.shipping_address.zip,
        } : undefined,
        lineItems: order.line_items?.map((item: any) => ({
          productId: item.product_id?.toString(),
          variantId: item.variant_id?.toString(),
          title: item.title,
          quantity: item.quantity,
          price: parseFloat(item.price),
        })),
        createdAt: new Date(order.created_at),
      },
      { 
        upsert: true, 
        new: true 
      }
    );

    console.log(`✅ Order #${order.order_number} cached successfully`);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Order webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}