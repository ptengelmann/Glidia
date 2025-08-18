// src/app/app/billing/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, CreditCard, Crown, Zap, AlertCircle, Package } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: string;
  orderLimit: number;
  features: string[];
  recommended?: boolean;
}

interface BillingData {
  subscription: {
    planId: string;
    status: string;
    currentPeriodEnd?: string;
    hasActiveSubscription: boolean;
  };
  currentPlan: PricingPlan;
  availablePlans: PricingPlan[];
}

export default function BillingPage() {
  const searchParams = useSearchParams();
  const shop = searchParams?.get('shop') || 'glidiatest.myshopify.com';
  const success = searchParams?.get('success');
  const error = searchParams?.get('error');
  
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<string | null>(null);

  useEffect(() => {
    fetchBillingData();
  }, [shop]);

  const fetchBillingData = async () => {
    try {
      const response = await fetch(`/api/billing?shop=${encodeURIComponent(shop)}`);
      const data = await response.json();
      
      if (data.ok) {
        setBillingData(data);
      }
    } catch (error) {
      console.error('Failed to fetch billing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    if (planId === 'free') return;
    
    setSubscribing(planId);
    
    try {
      console.log('Creating subscription for plan:', planId, 'shop:', shop);
      
      const response = await fetch('/api/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop, planId }),
      });
      
      const data = await response.json();
      console.log('Billing API response:', data);
      
      if (data.ok && data.confirmationUrl) {
        console.log('Redirecting to confirmation URL:', data.confirmationUrl);
        // Redirect to Shopify billing confirmation
        window.location.href = data.confirmationUrl;
      } else {
        console.error('Billing API error:', data);
        
        let errorMessage = 'Failed to create subscription. Please try again.';
        
        if (data.shopifyError) {
          errorMessage = `Shopify billing error: ${data.details || 'Unknown error'}`;
        } else if (data.error === 'Store not found') {
          errorMessage = 'Store not found. Please make sure the app is properly installed.';
        } else if (data.error === 'Invalid store credentials. Please reinstall the app.') {
          errorMessage = 'App needs to be reinstalled. Please go to your Shopify admin and reinstall Glidia.';
        }
        
        alert(errorMessage);
      }
    } catch (error: any) {
      console.error('Subscription error:', error);
      alert(`Network error: ${error.message}`);
    } finally {
      setSubscribing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading billing information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Glidia</h1>
                <p className="text-sm text-gray-500">AI WISMO & WISMR Platform</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Billing
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <CreditCard className="w-4 h-4" />
            Subscription Plans
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Glidia Plan
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Scale your customer support automation with plans designed for businesses of all sizes.
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="font-semibold text-green-800">Subscription Activated!</h3>
                <p className="text-green-700">
                  Welcome to Glidia {searchParams?.get('plan')}! Your 14-day free trial has started.
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <div>
                <h3 className="font-semibold text-red-800">Subscription Error</h3>
                <p className="text-red-700">
                  {error === 'activation_failed' && 'Failed to activate subscription. Please try again.'}
                  {error === 'missing_shop' && 'Missing shop parameter.'}
                  {error === 'store_not_found' && 'Store not found.'}
                  {error === 'confirmation_failed' && 'Billing confirmation failed.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Current Plan Status */}
        {billingData && (
          <div className="mb-12 bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-6">Current Plan Status</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{billingData.currentPlan.name}</h3>
                <p className="text-gray-600">
                  {billingData.currentPlan.price === 0 ? 'Free' : `${billingData.currentPlan.price}/month`}
                </p>
                <p className="text-sm text-gray-500">
                  Up to {billingData.currentPlan.orderLimit.toLocaleString()} orders/month
                </p>
              </div>
              <div className="text-right">
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  billingData.subscription.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {billingData.subscription.status}
                </div>
                {billingData.subscription.currentPeriodEnd && (
                  <p className="text-sm text-gray-500 mt-1">
                    Renews {new Date(billingData.subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Pricing Plans */}
        {billingData && (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-12">
            {billingData.availablePlans.map((plan) => {
              const isCurrentPlan = plan.id === billingData.subscription.planId;
              const isSubscribing = subscribing === plan.id;
              
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-xl border p-6 h-full flex flex-col ${
                    plan.recommended
                      ? 'border-purple-500 shadow-lg ring-2 ring-purple-100'
                      : 'border-gray-200 shadow-sm hover:shadow-md'
                  } ${isCurrentPlan ? 'border-green-400 ring-2 ring-green-100' : ''} transition-all`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div className="absolute -top-3 right-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Current
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{plan.name}</h3>
                    <div className="mb-2">
                      {plan.price === 0 ? (
                        <span className="text-3xl font-bold text-gray-900">Free</span>
                      ) : (
                        <div className="flex items-baseline justify-center">
                          <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                          <span className="text-gray-500 ml-1">/mo</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {plan.orderLimit.toLocaleString()} orders/month
                    </p>
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <div className="mt-auto">
                    <button
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={isCurrentPlan || isSubscribing}
                      className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                        isCurrentPlan
                          ? 'bg-green-50 text-green-700 border border-green-200 cursor-not-allowed'
                          : plan.recommended
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      } ${isSubscribing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isCurrentPlan ? (
                        'Current Plan'
                      ) : isSubscribing ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Processing...
                        </div>
                      ) : plan.price === 0 ? (
                        'Continue Free'
                      ) : (
                        `Start ${plan.name}`
                      )}
                    </button>
                    
                    {plan.price > 0 && !isCurrentPlan && (
                      <p className="text-center text-xs text-gray-500 mt-2">
                        14-day free trial
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Features Comparison */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Reduce Support Tickets</h3>
            <p className="text-gray-600 text-sm">
              Automatically handle up to 80% of WISMO queries with AI-powered responses.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Save Money</h3>
            <p className="text-gray-600 text-sm">
              Save thousands per month in support costs compared to hiring additional staff.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Crown className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Improve Satisfaction</h3>
            <p className="text-gray-600 text-sm">
              Provide instant, 24/7 responses that keep customers happy and informed.
            </p>
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Calculate Your Savings</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Without Glidia</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Support agent salary:</span>
                  <span className="font-medium">$40,000/year</span>
                </div>
                <div className="flex justify-between">
                  <span>Benefits & overhead:</span>
                  <span className="font-medium">$15,000/year</span>
                </div>
                <div className="flex justify-between">
                  <span>Software tools:</span>
                  <span className="font-medium">$3,000/year</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total annual cost:</span>
                  <span className="text-red-600">$58,000</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">With Glidia Pro</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Glidia Pro plan:</span>
                  <span className="font-medium">$3,588/year</span>
                </div>
                <div className="flex justify-between">
                  <span>Reduced agent time (80%):</span>
                  <span className="font-medium">$11,600/year</span>
                </div>
                <div className="flex justify-between">
                  <span>Setup & maintenance:</span>
                  <span className="font-medium">$2,000/year</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total annual cost:</span>
                  <span className="text-green-600">$17,188</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6 p-4 bg-white rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              Annual Savings: $40,812
            </p>
            <p className="text-gray-600">ROI: 237% in the first year</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">How does the 14-day free trial work?</h3>
              <p className="text-gray-600 text-sm">
                You get full access to all features for 14 days. No credit card required upfront. 
                You can cancel anytime during the trial with no charges.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-600 text-sm">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What happens if I exceed my order limit?</h3>
              <p className="text-gray-600 text-sm">
                We'll notify you when you're approaching your limit. You can upgrade your plan or 
                continue with reduced functionality until your next billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Is my data secure?</h3>
              <p className="text-gray-600 text-sm">
                Absolutely. We use OAuth 2.0 for secure authentication and only request minimal permissions. 
                We never store sensitive customer data and all communications are encrypted.
              </p>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Need help choosing the right plan?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@glidia.com"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/docs"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}