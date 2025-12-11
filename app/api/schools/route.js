export const runtime = "nodejs";

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import { prisma } from "@/lib/prisma";

// ---------- POST: Add School ----------
export async function POST(req) {
  try {
    // Stop build-time evaluation
    if (!req.body && process.env.NODE_ENV === "production") {
      return Response.json({ message: "Skip build evaluation" });
    }

    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email = formData.get("email_id");
    const imageFile = formData.get("image");

    if (!name || !address || !city || !contact || !email || !imageFile) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "schoolImages");

    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${imageFile.name}`;
    await writeFile(path.join(uploadDir, fileName), buffer);

    const imageUrl = `/schoolImages/${fileName}`;

    const newSchool = await prisma.school.create({
      data: { name, address, city, state, contact, email_id: email, image: imageUrl },
    });

    return Response.json(newSchool, { status: 201 });

  } catch (error) {
    console.error("POST error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// ---------- GET: Fetch Schools ----------
export async function GET() {
  try {
    const schools = await prisma.school.findMany();
    return Response.json(schools, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return Response.json({ error: "Failed to fetch schools" }, { status: 500 });
  }
}

// ---------- DELETE ----------
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id) {
      return Response.json({ error: "Missing ID" }, { status: 400 });
    }

    await prisma.school.delete({ where: { id } });

    return Response.json({ message: "Deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("DELETE error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
