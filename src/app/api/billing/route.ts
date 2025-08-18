// src/app/api/billing/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbConnect } from '@/lib/db';
import mongoose from 'mongoose';
import { createSubscription, getCurrentSubscription, hasActiveSubscription } from '@/lib/shopify-billing';
import { PRICING_PLANS, getPlanById } from '@/lib/billing';

// Store schema
const StoreSchema = new mongoose.Schema({
  shop: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  scopes: { type: String, required: true },
  installedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  subscription: {
    id: String,
    planId: String,
    status: String,
    trialEndsAt: Date,
    currentPeriodEnd: Date,
  }
}, {
  timestamps: true
});

const Store = mongoose.models.Store || mongoose.model('Store', StoreSchema);

const CreateSubscriptionSchema = z.object({
  shop: z.string(),
  planId: z.string(),
});

const GetBillingSchema = z.object({
  shop: z.string(),
});

// GET - Get current billing status
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shop = searchParams.get('shop');

    if (!shop) {
      return NextResponse.json(
        { error: 'Shop parameter required' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    const store = await Store.findOne({ shop, isActive: true });
    if (!store) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      );
    }

    // Get current subscription from Shopify
    const shopifySubscription = await getCurrentSubscription(shop, store.accessToken);
    
    // Update local database with latest subscription info
    if (shopifySubscription) {
      store.subscription = {
        id: shopifySubscription.id,
        planId: store.subscription?.planId || 'free',
        status: shopifySubscription.status,
        currentPeriodEnd: shopifySubscription.currentPeriodEnd
      };
      await store.save();
    }

    const currentPlan = getPlanById(store.subscription?.planId || 'free');

    return NextResponse.json({
      ok: true,
      shop,
      subscription: {
        planId: store.subscription?.planId || 'free',
        status: store.subscription?.status || 'FREE',
        currentPeriodEnd: store.subscription?.currentPeriodEnd,
        hasActiveSubscription: await hasActiveSubscription(shop, store.accessToken)
      },
      currentPlan,
      availablePlans: PRICING_PLANS
    });

  } catch (error) {
    console.error('Billing status error:', error);
    return NextResponse.json(
      { error: 'Failed to get billing status' },
      { status: 500 }
    );
  }
}

// POST - Create new subscription
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { shop, planId } = CreateSubscriptionSchema.parse(body);

    const plan = getPlanById(planId);
    if (!plan || plan.id === 'free') {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    const store = await Store.findOne({ shop, isActive: true });
    if (!store) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      );
    }

    // Create subscription charge in Shopify
    const billingPlan = {
      name: `Glidia ${plan.name} Plan`,
      price: plan.price,
      interval: 'MONTHLY' as const,
      trialDays: 14,
      test: process.env.NODE_ENV === 'development'
    };

    const result = await createSubscription(shop, store.accessToken, billingPlan);

    // Update store with pending subscription
    store.subscription = {
      id: result.subscription.id,
      planId: plan.id,
      status: 'PENDING',
    };
    await store.save();

    return NextResponse.json({
      ok: true,
      subscription: result.subscription,
      confirmationUrl: result.confirmationUrl
    });

  } catch (error) {
    console.error('Create subscription error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}