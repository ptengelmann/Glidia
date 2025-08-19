// src/app/api/webhooks/middleware.ts
import { NextRequest } from 'next/server';

/**
 * Shared webhook utilities
 */
export function getShopFromHeaders(req: NextRequest): string | null {
  // Shopify sends shop domain in different headers depending on webhook type
  return req.headers.get('x-shopify-shop-domain') || 
         req.headers.get('x-shopify-domain') ||
         null;
}

export function logWebhookActivity(
  webhookType: string, 
  shop: string, 
  success: boolean, 
  details?: any
) {
  const logData = {
    webhook: webhookType,
    shop,
    success,
    timestamp: new Date().toISOString(),
    ...details
  };
  
  console.log(`📡 WEBHOOK: ${JSON.stringify(logData)}`);
  
  // TODO: Send to analytics/monitoring service
}