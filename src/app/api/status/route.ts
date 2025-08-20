import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  
  // Check for shop session
  const shopSession = cookieStore.get('shop');
  const tokenSession = cookieStore.get('shopify_token');
  
  const status = {
    authenticated: false,
    shop: null as string | null,
    hasToken: false,
    environment: {
      nodeEnv: process.env.NODE_ENV,
      appUrl: process.env.SHOPIFY_APP_URL || process.env.APP_URL,
      apiKeySet: !!process.env.SHOPIFY_API_KEY,
      apiSecretSet: !!process.env.SHOPIFY_API_SECRET,
    },
    oauth: {
      installUrl: `${process.env.SHOPIFY_APP_URL || process.env.APP_URL}/api/auth/shopify/install`,
      callbackUrl: `${process.env.SHOPIFY_APP_URL || process.env.APP_URL}/api/auth/shopify/callback`,
    },
    debug: {
      cookiesFound: {
        shop: !!shopSession,
        token: !!tokenSession,
      },
      timestamp: new Date().toISOString(),
    }
  };

  if (shopSession) {
    status.shop = shopSession.value;
    status.authenticated = true;
  }

  if (tokenSession) {
    status.hasToken = true;
  }

  return NextResponse.json(status);
}