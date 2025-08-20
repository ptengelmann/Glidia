// src/app/api/test-env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasShopifyKey: !!process.env.SHOPIFY_API_KEY,
    hasShopifySecret: !!process.env.SHOPIFY_API_SECRET,
    hasMongoUri: !!process.env.MONGODB_URI,
    hasOpenAI: !!process.env.OPENAI_API_KEY,
    shopifyKeyFirst10: process.env.SHOPIFY_API_KEY?.substring(0, 10),
  });
}