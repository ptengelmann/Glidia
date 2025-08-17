// src/app/api/wismo/ai/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateWismoResponse, logCustomerQuery } from "@/lib/ai";

const RequestSchema = z.object({
  orderName: z.string().min(1),
  customerName: z.string().optional(),
  customerQuery: z.string().optional().default("Where is my order?"),
  storeInfo: z.object({
    name: z.string().optional(),
    brandVoice: z.enum(['professional', 'friendly', 'casual', 'luxury']).optional(),
    supportEmail: z.string().email().optional(),
  }).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { orderName, customerName, customerQuery, storeInfo } = RequestSchema.parse(json);

    console.log("AI WISMO Request:", { orderName, customerName });

    // Generate AI-powered response
    const aiResponse = await generateWismoResponse({
      orderName,
      customerName,
      storeInfo,
    });

    // Log the query for analytics (async, non-blocking)
    logCustomerQuery(customerQuery, orderName, aiResponse).catch(console.error);

    return NextResponse.json({
      ok: true,
      data: {
        message: aiResponse.message,
        tone: aiResponse.tone,
        suggestedActions: aiResponse.suggestedActions,
        escalationNeeded: aiResponse.escalationNeeded,
        timestamp: new Date().toISOString(),
      },
    });

  } catch (err: any) {
    console.error("AI WISMO Error:", err);
    
    if (err?.issues) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: err.issues },
        { status: 400 }
      );
    }

    // Graceful fallback for AI failures
    return NextResponse.json(
      { 
        ok: true, 
        data: {
          message: "I apologize, but I'm having trouble accessing your order information right now. Please try again in a moment or contact our support team directly.",
          tone: "apologetic",
          escalationNeeded: true,
          timestamp: new Date().toISOString(),
        }
      },
      { status: 200 } // Still return 200 to provide fallback response
    );
  }
}

// Optional: GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    service: "Glidia AI WISMO",
    version: "1.0.0",
    endpoints: {
      POST: "Generate AI response for order status query",
    },
    example: {
      orderName: "#1001",
      customerName: "John",
      customerQuery: "Where is my order?",
      storeInfo: {
        name: "My Store",
        brandVoice: "friendly"
      }
    }
  });
}