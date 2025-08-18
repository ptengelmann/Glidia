// src/lib/billing.ts
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'annually';
  orderLimit: number;
  features: string[];
  recommended?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'monthly',
    orderLimit: 50,
    features: [
      'Up to 50 orders/month',
      'Basic AI responses',
      'Email support',
      'Basic analytics'
    ]
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    interval: 'monthly',
    orderLimit: 500,
    features: [
      'Up to 500 orders/month',
      'Advanced AI responses',
      'Brand voice customization',
      'Priority support',
      'Advanced analytics'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 99,
    interval: 'monthly',
    orderLimit: 2000,
    recommended: true,
    features: [
      'Up to 2,000 orders/month',
      'Multi-channel support',
      'Custom branding',
      'Webhook automation',
      'Dedicated support',
      'Custom integrations'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 299,
    interval: 'monthly',
    orderLimit: 10000,
    features: [
      'Up to 10,000 orders/month',
      'White-label solution',
      'Advanced automations',
      'Priority phone support',
      'Custom AI training',
      'Enterprise integrations'
    ]
  }
];

export function getPlanById(planId: string): PricingPlan | undefined {
  return PRICING_PLANS.find(plan => plan.id === planId);
}

export function getRecommendedPlan(): PricingPlan {
  return PRICING_PLANS.find(plan => plan.recommended) || PRICING_PLANS[1];
}

export function calculateUsage(ordersProcessed: number): {
  currentPlan: PricingPlan;
  usagePercentage: number;
  needsUpgrade: boolean;
} {
  // Find the appropriate plan based on usage
  const currentPlan = PRICING_PLANS.find(plan => 
    ordersProcessed <= plan.orderLimit
  ) || PRICING_PLANS[PRICING_PLANS.length - 1];

  const usagePercentage = (ordersProcessed / currentPlan.orderLimit) * 100;
  const needsUpgrade = usagePercentage > 80;

  return {
    currentPlan,
    usagePercentage,
    needsUpgrade
  };
}

// Shopify billing configuration
export const SHOPIFY_BILLING_CONFIG = {
  plans: PRICING_PLANS.filter(plan => plan.id !== 'free').map(plan => ({
    name: `${plan.name} Plan`,
    price: plan.price,
    interval: plan.interval.toUpperCase() as 'MONTHLY' | 'ANNUALLY',
    trialDays: 14, // 14-day free trial
    test: process.env.NODE_ENV === 'development'
  }))
};