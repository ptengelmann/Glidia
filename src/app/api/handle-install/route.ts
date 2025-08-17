// src/app/api/handle-install/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import mongoose from 'mongoose';

// Store schema
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
    const { shop } = await req.json();
    
    if (!shop) {
      return NextResponse.json(
        { error: 'Shop parameter required' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();
    
    // For development, we'll use a placeholder access token
    // In production, this would come from the actual OAuth flow
    const placeholderToken = `dev_token_${Date.now()}`;
    
    // Save installation
    const installation = await Store.findOneAndUpdate(
      { shop },
      {
        shop,
        accessToken: placeholderToken,
        scopes: process.env.SHOPIFY_SCOPES || 'read_orders,read_products,read_customers',
        isActive: true,
        installedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    console.log(`✅ App installation recorded for shop: ${shop}`);

    return NextResponse.json({
      ok: true,
      message: 'Installation recorded successfully',
      shop,
      installedAt: installation.installedAt,
    });

  } catch (error) {
    console.error('Handle install error:', error);
    return NextResponse.json(
      { error: 'Failed to handle installation' },
      { status: 500 }
    );
  }
}