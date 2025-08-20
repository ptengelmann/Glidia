import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    environment: process.env.NODE_ENV,
    shopify: {
      apiKey: process.env.SHOPIFY_API_KEY ? 'SET' : 'MISSING',
      apiSecret: process.env.SHOPIFY_API_SECRET ? 'SET' : 'MISSING',
      appUrl: process.env.SHOPIFY_APP_URL || 'MISSING',
      scopes: process.env.SHOPIFY_SCOPES || 'MISSING',
    },
    app: {
      url: process.env.APP_URL || 'MISSING',
    },
    mongodb: process.env.MONGODB_URI ? 'SET' : 'MISSING',
    openai: process.env.OPENAI_API_KEY ? 'SET' : 'MISSING',
  };

  return NextResponse.json(config);
}