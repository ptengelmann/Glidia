// src/app/api/webhooks/orders/fulfilled/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhook } from '@/lib/shopify-oauth';
import { dbConnect } from '@/lib/db';
import mongoose from 'mongoose';

// Use the same OrderCache model
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
  shippingAddress: mongoose.Schema.Types.Mixed,
  lineItems: [mongoose.Schema.Types.Mixed],
  tracking: {
    company: String,
    number: String,
    url: String,
  },
  createdAt: { type: Date },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true
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

    console.log(`📦 Order fulfilled #${order.order_number} from ${shopDomain}`);

    await dbConnect();

    // Update order cache with fulfillment info
    const updateData: any = {
      fulfillmentStatus: 'fulfilled',
      status: 'fulfilled',
      updatedAt: new Date(),
    };

    // Add tracking info if available
    if (order.fulfillments && order.fulfillments.length > 0) {
      const fulfillment = order.fulfillments[0];
      if (fulfillment.tracking_number) {
        updateData.tracking = {
          company: fulfillment.tracking_company || 'Unknown',
          number: fulfillment.tracking_number,
          url: fulfillment.tracking_url || null,
        };
      }
    }

    await OrderCache.findOneAndUpdate(
      { 
        shopDomain,
        orderId: order.id.toString() 
      },
      updateData
    );

    console.log(`✅ Order #${order.order_number} fulfillment updated`);

    // TODO: Trigger proactive notification to customer
    // "Great news! Your order #1234 has shipped..."

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Fulfillment webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}