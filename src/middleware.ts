// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Aggressively remove X-Frame-Options
  response.headers.delete('x-frame-options');
  response.headers.delete('X-Frame-Options');
  response.headers.delete('X-FRAME-OPTIONS');
  
  // Set CSP
  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self' https://*.shopify.com https://*.myshopify.com https://admin.shopify.com"
  );
  
  return response;
}

export const config = {
  matcher: [
    '/(.*)',
  ],
};