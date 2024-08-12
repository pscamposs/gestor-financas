import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET() {
  const db = await pool.getConnection();
  try {
    const query = "call get_user_invoices(?)";
    const [invoiceRows]: any = await db.execute(query, [1]);
    const invoiceData = invoiceRows[0];
    const queryProfile = `
      SELECT id, name, salary from user WHERE id = ?;
    `;
    const [profileRows]: any = await db.query(queryProfile, [1]);
    const profileData = profileRows[0];

    return NextResponse.json({
      profile: profileData,
      invoices: invoiceData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  } finally {
    db.release();
  }
}
