// src/app/api/debug-headers/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const response = NextResponse.json({
    message: 'Debug headers',
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    timestamp: new Date().toISOString()
  });

  // Remove X-Frame-Options
  response.headers.delete('X-Frame-Options');
  
  // Set CSP
  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self' https://*.shopify.com https://*.myshopify.com https://admin.shopify.com"
  );

  return response;
}