import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getOrderStatusByName } from "@/lib/shopify";

const BodySchema = z.object({ 
  orderName: z.string().min(1) 
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    console.log("WISMO BODY:", json);
    const { orderName } = BodySchema.parse(json);

    const data = await getOrderStatusByName(orderName); // Use legacy auth
    if (!data) {
      return NextResponse.json({ ok: false, error: "ORDER_NOT_FOUND" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    console.error("WISMO ERROR:", err);
    if (err?.issues) {
      return NextResponse.json({ ok: false, error: "BAD_REQUEST", details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: "BAD_REQUEST", details: err?.message || String(err) }, { status: 400 });
  }
}