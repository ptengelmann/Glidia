// src/app/api/debug/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    apiKey: process.env.SHOPIFY_API_KEY?.substring(0, 8) + '...',
    apiSecret: process.env.SHOPIFY_API_SECRET?.substring(0, 8) + '...',
    scopes: process.env.SHOPIFY_SCOPES,
    appUrl: process.env.SHOPIFY_APP_URL,
    hasApiKey: !!process.env.SHOPIFY_API_KEY,
    hasApiSecret: !!process.env.SHOPIFY_API_SECRET,
    keyLength: process.env.SHOPIFY_API_KEY?.length,
    secretLength: process.env.SHOPIFY_API_SECRET?.length,
  });
}