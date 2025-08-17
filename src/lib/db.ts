// src/lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

type Cached = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
let cached: Cached = (global as any)._mongoose || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  (global as any)._mongoose = cached;
  return cached.conn;
}
