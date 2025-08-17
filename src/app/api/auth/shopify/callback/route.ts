// src/app/api/auth/shopify/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken, isValidShopDomain } from '@/lib/shopify-oauth';
import { dbConnect } from '@/lib/db';
import mongoose from 'mongoose';

// Store schema for installed shops
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shop = searchParams.get('shop');
  const code = searchParams.get('code');
  const hmac = searchParams.get('hmac');
  const state = searchParams.get('state');

  if (!shop || !code) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  if (!isValidShopDomain(shop)) {
    return NextResponse.json(
      { error: 'Invalid shop domain' },
      { status: 400 }
    );
  }

  try {
    // Exchange code for access token
    const accessToken = await exchangeCodeForToken(shop, code);
    
    // Connect to database
    await dbConnect();
    
    // Save or update store installation
    await Store.findOneAndUpdate(
      { shop },
      {
        shop,
        accessToken,
        scopes: process.env.SHOPIFY_SCOPES || 'read_orders,read_products,read_customers',
        isActive: true,
        installedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    console.log(`✅ App installed successfully for shop: ${shop}`);

    // Redirect to success page or app dashboard
    const successUrl = new URL('/app/dashboard', req.url);
    successUrl.searchParams.set('shop', shop);
    successUrl.searchParams.set('installed', 'true');
    
    return NextResponse.redirect(successUrl.toString());

  } catch (error) {
    console.error('OAuth callback error:', error);
    
    const errorUrl = new URL('/app/error', req.url);
    errorUrl.searchParams.set('message', 'Installation failed');
    
    return NextResponse.redirect(errorUrl.toString());
  }
}