// src/app/api/auth/shopify/install/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateInstallUrl, isValidShopDomain } from '@/lib/shopify-oauth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shop = searchParams.get('shop');

  if (!shop) {
    return NextResponse.json(
      { error: 'Shop parameter is required' },
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
    const installUrl = generateInstallUrl(shop);
    
    // Redirect to Shopify for app installation
    return NextResponse.redirect(installUrl);
  } catch (error) {
    console.error('Install error:', error);
    return NextResponse.json(
      { error: 'Failed to generate install URL' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { shop } = await req.json();

    if (!shop) {
      return NextResponse.json(
        { error: 'Shop parameter is required' },
        { status: 400 }
      );
    }

    if (!isValidShopDomain(shop)) {
      return NextResponse.json(
        { error: 'Invalid shop domain' },
        { status: 400 }
      );
    }

    const installUrl = generateInstallUrl(shop);
    
    return NextResponse.json({
      ok: true,
      installUrl,
      message: 'Redirect to this URL to install the app'
    });
  } catch (error) {
    console.error('Install POST error:', error);
    return NextResponse.json(
      { error: 'Failed to generate install URL' },
      { status: 500 }
    );
  }
}