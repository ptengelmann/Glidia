// src/app/api/webhooks/app/uninstalled/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhook } from '@/lib/shopify-oauth';
import { dbConnect } from '@/lib/db';
import mongoose from 'mongoose';

// Import Store model (we'll extract this later)
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

export async function POST(req: NextRequest) {
  try {
    // Get raw body for HMAC verification
    const rawBody = await req.text();
    const hmacHeader = req.headers.get('x-shopify-hmac-sha256');

    if (!hmacHeader) {
      console.error('Missing HMAC header');
      return NextResponse.json({ error: 'Missing HMAC header' }, { status: 401 });
    }

    // Verify webhook authenticity
    if (!verifyWebhook(rawBody, hmacHeader)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const webhookData = JSON.parse(rawBody);
    const shop = webhookData.domain;

    console.log(`🗑️ App uninstalled from shop: ${shop}`);

    // Connect to database
    await dbConnect();

    // Mark store as inactive instead of deleting (for analytics)
    await Store.findOneAndUpdate(
      { shop },
      { 
        isActive: false, 
        uninstalledAt: new Date() 
      }
    );

    // TODO: Cancel any active subscriptions
    // TODO: Send notification to your team
    // TODO: Log analytics event

    console.log(`✅ Store ${shop} marked as inactive`);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}