import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  db.connectDB();
  db.disconnectDB();
  return NextResponse.json({
    username: "hungnongtrai",
  });
}
