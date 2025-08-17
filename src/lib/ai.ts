// src/lib/ai.ts
import OpenAI from 'openai';
import { getOrderStatusByName } from './shopify';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export interface WismoContext {
  orderName: string;
  customerName?: string;
  storeInfo?: {
    name: string;
    brandVoice?: 'professional' | 'friendly' | 'casual' | 'luxury';
    supportEmail?: string;
  };
}

export interface WismoResponse {
  message: string;
  tone: 'positive' | 'neutral' | 'apologetic';
  suggestedActions?: string[];
  escalationNeeded: boolean;
}

/**
 * Core AI Response Generator for WISMO queries
 * Generates empathetic, branded responses based on real order data
 */
export async function generateWismoResponse(
  context: WismoContext
): Promise<WismoResponse> {
  try {
    // 1. Fetch real order data
    const orderData = await getOrderStatusByName(context.orderName);
    
    if (!orderData) {
      return {
        message: `I couldn't find an order with the number ${context.orderName}. Could you please double-check the order number? You can find it in your confirmation email.`,
        tone: 'neutral',
        escalationNeeded: false,
      };
    }

    // 2. Determine order status and context
    const statusInfo = analyzeOrderStatus(orderData);
    
    // 3. Generate AI response based on real data
    const prompt = buildWismoPrompt(orderData, statusInfo, context);
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: getSystemPrompt(context.storeInfo?.brandVoice || 'friendly'),
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const aiMessage = completion.choices[0]?.message?.content || 'Unable to generate response';
    
    return {
      message: aiMessage,
      tone: statusInfo.tone,
      suggestedActions: statusInfo.suggestedActions,
      escalationNeeded: statusInfo.escalationNeeded,
    };

  } catch (error) {
    console.error('AI Response generation failed:', error);
    return {
      message: 'I apologize, but I\'m having trouble accessing your order information right now. Please try again in a moment or contact our support team.',
      tone: 'apologetic',
      escalationNeeded: true,
    };
  }
}

/**
 * Analyze order status and determine response context
 */
function analyzeOrderStatus(orderData: any) {
  const status = orderData.status?.toLowerCase() || '';
  const hasTracking = !!orderData.tracking;
  const isDelivered = status.includes('delivered') || status.includes('fulfilled');
  const isShipped = status.includes('shipped') || status.includes('transit');
  const isPending = status.includes('pending') || status.includes('unfulfilled');

  // Determine tone and escalation needs
  let tone: 'positive' | 'neutral' | 'apologetic' = 'neutral';
  let escalationNeeded = false;
  let suggestedActions: string[] = [];

  if (isDelivered) {
    tone = 'positive';
    suggestedActions = ['Check delivery location', 'Contact carrier if not received'];
  } else if (isShipped && hasTracking) {
    tone = 'positive';
    suggestedActions = ['Track package', 'Check estimated delivery'];
  } else if (isPending) {
    tone = 'neutral';
    suggestedActions = ['Wait for processing confirmation', 'Check for updates'];
    
    // Check if order is old and still pending - might need escalation
    if (orderData.processedAt) {
      const orderAge = Date.now() - new Date(orderData.processedAt).getTime();
      if (orderAge > 7 * 24 * 60 * 60 * 1000) { // 7 days
        escalationNeeded = true;
        tone = 'apologetic';
      }
    }
  } else {
    tone = 'apologetic';
    escalationNeeded = true;
  }

  return {
    status,
    hasTracking,
    isDelivered,
    isShipped,
    isPending,
    tone,
    escalationNeeded,
    suggestedActions,
  };
}

/**
 * Build the prompt for AI response generation
 */
function buildWismoPrompt(orderData: any, statusInfo: any, context: WismoContext) {
  const customerName = context.customerName || 'there';
  const storeName = context.storeInfo?.name || 'our store';
  
  return `
Customer Query: "Where is my order ${orderData.name}?"

ORDER DETAILS:
- Order Number: ${orderData.name}
- Status: ${orderData.status || 'Unknown'}
- Total: ${orderData.total?.amount} ${orderData.total?.currencyCode}
- Processed: ${orderData.processedAt ? new Date(orderData.processedAt).toLocaleDateString() : 'Unknown'}
- Ship To: ${orderData.shipTo || 'Not specified'}

TRACKING INFO:
${orderData.tracking ? `
- Carrier: ${orderData.tracking.company}
- Tracking Number: ${orderData.tracking.number}
- Tracking URL: ${orderData.tracking.url}
` : '- No tracking information available yet'}

CONTEXT:
- Customer Name: ${customerName}
- Store Name: ${storeName}
- Response Tone: ${statusInfo.tone}
- Escalation Needed: ${statusInfo.escalationNeeded}

Generate a helpful, empathetic response that:
1. Acknowledges their order specifically
2. Provides current status clearly
3. Includes tracking info if available
4. Sets appropriate expectations
5. Offers next steps
6. Maintains the brand voice

Keep it concise but warm and helpful.
  `.trim();
}

/**
 * System prompts for different brand voices
 */
function getSystemPrompt(brandVoice: string) {
  const basePrompt = `You are a helpful customer service AI assistant that provides order status updates. Always be accurate, empathetic, and helpful.`;
  
  const voicePrompts = {
    professional: `${basePrompt} Use a professional, courteous tone. Be direct and informative while maintaining warmth.`,
    friendly: `${basePrompt} Use a warm, conversational tone. Be approachable and helpful, like talking to a friend.`,
    casual: `${basePrompt} Use a relaxed, informal tone. Be helpful and easy-going, but still informative.`,
    luxury: `${basePrompt} Use an elegant, premium tone. Be sophisticated and attentive, emphasizing quality service.`,
  };

  return voicePrompts[brandVoice as keyof typeof voicePrompts] || voicePrompts.friendly;
}

/**
 * Generate WISMR (refund) responses - for future expansion
 */
export async function generateWismrResponse(
  refundId: string,
  context: WismoContext
): Promise<WismoResponse> {
  // TODO: Implement refund status checking and AI response
  return {
    message: 'Refund tracking coming soon!',
    tone: 'neutral',
    escalationNeeded: false,
  };
}

/**
 * Log customer queries for analytics
 */
export async function logCustomerQuery(
  query: string,
  orderName: string,
  response: WismoResponse,
  storeId?: string
) {
  // TODO: Implement logging to MongoDB for analytics
  console.log('Query logged:', { query, orderName, response: response.tone, storeId });
}