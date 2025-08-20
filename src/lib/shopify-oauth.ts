// src/lib/shopify-oauth.ts
import crypto from 'crypto';

const API_KEY = process.env.SHOPIFY_API_KEY!;
const API_SECRET = process.env.SHOPIFY_API_SECRET!;
const SCOPES = process.env.SHOPIFY_SCOPES || 'read_orders,read_products,write_orders';

// Use SHOPIFY_APP_URL for production, fallback to APP_URL or localhost
const APP_URL = process.env.SHOPIFY_APP_URL || process.env.APP_URL || 'http://localhost:3000';

console.log('OAuth Configuration:', {
  apiKeySet: !!API_KEY,
  apiSecretSet: !!API_SECRET,
  appUrl: APP_URL,
  environment: process.env.NODE_ENV
});

/**
 * Generate OAuth authorization URL for Shopify app installation
 */
export function getAuthorizationUrl(shop: string, state?: string): string {
  const shopDomain = shop.endsWith('.myshopify.com') ? shop : `${shop}.myshopify.com`;
  
  const params = new URLSearchParams({
    client_id: API_KEY,
    scope: SCOPES,
    redirect_uri: `${APP_URL}/api/auth/shopify/callback`,
    state: state || crypto.randomBytes(16).toString('hex'),
  });

  return `https://${shopDomain}/admin/oauth/authorize?${params.toString()}`;
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(shop: string, code: string): Promise<string> {
  const shopDomain = shop.endsWith('.myshopify.com') ? shop : `${shop}.myshopify.com`;
  
  const requestBody = {
    client_id: API_KEY,
    client_secret: API_SECRET,
    code,
  };

  console.log('Exchanging code for token:', { 
    shop: shopDomain, 
    code: code.substring(0, 10) + '...',
    apiKey: API_KEY ? 'SET' : 'MISSING',
    apiSecret: API_SECRET ? 'SET' : 'MISSING',
    appUrl: APP_URL
  });
  
  const response = await fetch(`https://${shopDomain}/admin/oauth/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  console.log('Token exchange response status:', response.status);
  console.log('Response headers:', Object.fromEntries(response.headers.entries()));
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Token exchange error details:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
      requestBody: { ...requestBody, client_secret: 'HIDDEN' }
    });
    throw new Error(`Failed to exchange code for token: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  console.log('Token exchange successful, token received:', !!data.access_token);
  return data.access_token;
}

/**
 * Verify webhook HMAC signature
 */
export function verifyWebhook(data: string, signature: string): boolean {
  const hmac = crypto.createHmac('sha256', API_SECRET);
  hmac.update(data);
  const hash = hmac.digest('base64');
  return hash === signature;
}

/**
 * Generate app installation URL
 */
export function generateInstallUrl(shop: string): string {
  return getAuthorizationUrl(shop);
}

/**
 * Validate shop domain
 */
export function isValidShopDomain(shop: string): boolean {
  const shopRegex = /^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com$/;
  const normalizedShop = shop.endsWith('.myshopify.com') ? shop : `${shop}.myshopify.com`;
  return shopRegex.test(normalizedShop);
}

/**
 * Verify HMAC for OAuth callback (optional security enhancement)
 */
export function verifyOAuthHmac(query: URLSearchParams, hmac: string): boolean {
  const params = new URLSearchParams(query);
  params.delete('hmac');
  params.delete('signature');
  
  const sortedParams = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  
  const calculatedHmac = crypto
    .createHmac('sha256', API_SECRET)
    .update(sortedParams)
    .digest('hex');
  
  return calculatedHmac === hmac;
}