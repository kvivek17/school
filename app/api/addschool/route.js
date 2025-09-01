import { NextResponse } from "next/server";
import formidable from "formidable";
import path from "path";
import fs from "fs";
import { getConnection } from "../../../lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const form = formidable({
    multiples: false,
    uploadDir: path.join(process.cwd(), "public/schoolImages"),
    keepExtensions: true,
  });

  // formidable provides a .parse method that works with Node.js req
  // In App Router, you can pass the Node.js req via `req` from middleware
  // So we need to convert the Request to Node.js compatible object

  // Instead, an easier way is to read the form data manually:
  const formData = await req.formData();
  const name = formData.get("name");
  const address = formData.get("address");
  const city = formData.get("city");
  const state = formData.get("state");
  const contact = formData.get("contact");
  const email_id = formData.get("email_id");
  const file = formData.get("image"); // File object

  // Save file manually
  const filePath = path.join(process.cwd(), "public/schoolImages", file.name);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  // Save record in MySQL
  try {
    const db = await getConnection();
    await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, `/schoolImages/${file.name}`, email_id]
    );

    return NextResponse.json({ message: "School added successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
