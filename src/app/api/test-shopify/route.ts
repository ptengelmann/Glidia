// src/app/api/test-shopify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getOrderStatusByName } from '@/lib/shopify';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shop = searchParams.get('shop') || 'glidiatest.myshopify.com';
  const orderName = searchParams.get('order') || '1003';

  try {
    const result = await getOrderStatusByName(orderName, shop);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    });
  }
}