// src/lib/shopify-billing.ts
import { GraphQLClient, gql } from 'graphql-request';

const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';

function createBillingClient(shop: string, accessToken: string) {
  const endpoint = `https://${shop}/admin/api/${API_VERSION}/graphql.json`;
  return new GraphQLClient(endpoint, {
    headers: {
      'X-Shopify-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
  });
}

export interface BillingPlan {
  name: string;
  price: number;
  interval: 'MONTHLY' | 'ANNUALLY';
  trialDays?: number;
  test?: boolean;
}

/**
 * Create a subscription charge for a merchant
 */
export async function createSubscription(
  shop: string,
  accessToken: string,
  plan: BillingPlan
) {
  const client = createBillingClient(shop, accessToken);

  const CREATE_SUBSCRIPTION = gql`
    mutation CreateAppSubscription($lineItems: [AppSubscriptionLineItemInput!]!, $name: String!, $test: Boolean, $trialDays: Int, $returnUrl: String!) {
      appSubscriptionCreate(
        lineItems: $lineItems
        name: $name
        test: $test
        trialDays: $trialDays
        returnUrl: $returnUrl
      ) {
        appSubscription {
          id
          name
          status
          trialDays
          currentPeriodEnd
        }
        confirmationUrl
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    name: plan.name,
    test: plan.test || false,
    trialDays: plan.trialDays || 0,
    returnUrl: `${process.env.SHOPIFY_APP_URL}/app/billing/confirm`,
    lineItems: [
      {
        plan: {
          appRecurringPricingDetails: {
            price: {
              amount: plan.price,
              currencyCode: 'USD'
            },
            interval: plan.interval
          }
        }
      }
    ]
  };

  try {
    const data = await client.request<any>(CREATE_SUBSCRIPTION, variables);
    
    if (data.appSubscriptionCreate.userErrors.length > 0) {
      throw new Error(data.appSubscriptionCreate.userErrors.map((e: any) => e.message).join(', '));
    }

    return {
      subscription: data.appSubscriptionCreate.appSubscription,
      confirmationUrl: data.appSubscriptionCreate.confirmationUrl
    };
  } catch (error) {
    console.error('Failed to create subscription:', error);
    throw error;
  }
}

/**
 * Get current subscription status for a merchant
 */
export async function getCurrentSubscription(shop: string, accessToken: string) {
  const client = createBillingClient(shop, accessToken);

  const GET_SUBSCRIPTION = gql`
    query GetCurrentSubscription {
      currentAppInstallation {
        activeSubscriptions {
          id
          name
          status
          trialDays
          currentPeriodEnd
          lineItems {
            plan {
              pricingDetails {
                ... on AppRecurringPricing {
                  price {
                    amount
                    currencyCode
                  }
                  interval
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await client.request<any>(GET_SUBSCRIPTION);
    const subscriptions = data.currentAppInstallation?.activeSubscriptions || [];
    
    return subscriptions.length > 0 ? subscriptions[0] : null;
  } catch (error) {
    console.error('Failed to get subscription:', error);
    return null;
  }
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(shop: string, accessToken: string, subscriptionId: string) {
  const client = createBillingClient(shop, accessToken);

  const CANCEL_SUBSCRIPTION = gql`
    mutation CancelSubscription($id: ID!) {
      appSubscriptionCancel(id: $id) {
        appSubscription {
          id
          status
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const data = await client.request<any>(CANCEL_SUBSCRIPTION, { id: subscriptionId });
    
    if (data.appSubscriptionCancel.userErrors.length > 0) {
      throw new Error(data.appSubscriptionCancel.userErrors.map((e: any) => e.message).join(', '));
    }

    return data.appSubscriptionCancel.appSubscription;
  } catch (error) {
    console.error('Failed to cancel subscription:', error);
    throw error;
  }
}

/**
 * Check if merchant has an active subscription
 */
export async function hasActiveSubscription(shop: string, accessToken: string): Promise<boolean> {
  const subscription = await getCurrentSubscription(shop, accessToken);
  return subscription && subscription.status === 'ACTIVE';
}

/**
 * Get usage-based billing details
 */
export async function getUsageCharges(shop: string, accessToken: string) {
  const client = createBillingClient(shop, accessToken);

  const GET_USAGE = gql`
    query GetUsageCharges {
      currentAppInstallation {
        activeSubscriptions {
          id
          lineItems {
            usageRecords(first: 50) {
              edges {
                node {
                  id
                  description
                  price {
                    amount
                    currencyCode
                  }
                  subscriptionLineItem {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await client.request<any>(GET_USAGE);
    return data.currentAppInstallation?.activeSubscriptions[0]?.lineItems[0]?.usageRecords?.edges || [];
  } catch (error) {
    console.error('Failed to get usage charges:', error);
    return [];
  }
}