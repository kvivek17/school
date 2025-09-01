import { NextResponse } from "next/server";
import { getConnection } from "../../../lib/db";

export async function GET(req) {
  try {
    const db = await getConnection();

    // Parse URL for query parameters
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // Fetch single school
      const [rows] = await db.query("SELECT * FROM schools WHERE id = ?", [id]);

      return NextResponse.json(rows[0]); // return single object
    } else {
      // Fetch all schools
      const [rows] = await db.execute(
        "SELECT id, name, address, city, image FROM schools"
      );
      return NextResponse.json(rows); // return array
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
