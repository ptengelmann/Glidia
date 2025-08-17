// src/app/api/installations/route.ts
import { NextResponse } from 'next/server';
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

export async function GET() {
  try {
    await dbConnect();
    
    const installations = await Store.find({}).select('-accessToken'); // Don't expose access tokens
    
    return NextResponse.json({
      ok: true,
      count: installations.length,
      installations: installations.map(store => ({
        shop: store.shop,
        scopes: store.scopes,
        installedAt: store.installedAt,
        isActive: store.isActive,
        createdAt: store.createdAt,
        updatedAt: store.updatedAt,
      }))
    });
  } catch (error) {
    console.error('Error fetching installations:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to fetch installations' },
      { status: 500 }
    );
  }
}