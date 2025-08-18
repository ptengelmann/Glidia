// src/app/api/billing/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import mongoose from 'mongoose';
import { getCurrentSubscription } from '@/lib/shopify-billing';

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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shop = searchParams.get('shop');
    const charge_id = searchParams.get('charge_id');

    if (!shop) {
      return NextResponse.redirect(
        new URL('/app/billing?error=missing_shop', req.url)
      );
    }

    await dbConnect();
    
    const store = await Store.findOne({ shop, isActive: true });
    if (!store) {
      return NextResponse.redirect(
        new URL('/app/billing?error=store_not_found', req.url)
      );
    }

    // Get the latest subscription status from Shopify
    const subscription = await getCurrentSubscription(shop, store.accessToken);
    
    if (subscription && subscription.status === 'ACTIVE') {
      // Update local database
      store.subscription = {
        id: subscription.id,
        planId: store.subscription?.planId || 'starter',
        status: 'ACTIVE',
        currentPeriodEnd: subscription.currentPeriodEnd,
        trialEndsAt: subscription.trialDays ? 
          new Date(Date.now() + subscription.trialDays * 24 * 60 * 60 * 1000) : 
          undefined
      };
      await store.save();

      console.log(`✅ Subscription activated for ${shop}: ${subscription.id}`);

      // Redirect to success page
      return NextResponse.redirect(
        new URL(`/app/billing?success=true&plan=${store.subscription.planId}`, req.url)
      );
    } else {
      console.log(`❌ Subscription activation failed for ${shop}`);
      
      // Redirect to error page
      return NextResponse.redirect(
        new URL('/app/billing?error=activation_failed', req.url)
      );
    }

  } catch (error) {
    console.error('Billing confirmation error:', error);
    
    return NextResponse.redirect(
      new URL('/app/billing?error=confirmation_failed', req.url)
    );
  }
}