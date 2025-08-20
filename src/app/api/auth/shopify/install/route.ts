// src/app/api/auth/shopify/install/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuthorizationUrl, isValidShopDomain } from '@/lib/shopify-oauth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const shop = searchParams.get('shop');

  console.log('Install route called with shop:', shop);

  if (!shop) {
    return NextResponse.json(
      { error: 'Shop parameter is required' },
      { status: 400 }
    );
  }

  // Normalize shop domain
  const shopDomain = shop.endsWith('.myshopify.com') ? shop : `${shop}.myshopify.com`;

  if (!isValidShopDomain(shopDomain)) {
    return NextResponse.json(
      { error: 'Invalid shop domain' },
      { status: 400 }
    );
  }

  try {
    // Generate OAuth authorization URL
    const authUrl = getAuthorizationUrl(shopDomain);
    console.log('Redirecting to authorization URL:', authUrl);

    // Redirect to Shopify OAuth flow
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Install route error:', error);
    return NextResponse.json(
      { error: 'Failed to generate authorization URL' },
      { status: 500 }
    );
  }
}

// Also handle POST requests (some Shopify flows use POST)
export async function POST(request: NextRequest) {
  return GET(request);
}