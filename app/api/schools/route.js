import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import { prisma } from "@/lib/prisma";

// ---------- POST: Add School ----------
export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email = formData.get("email_id");
    const imageFile = formData.get("image");

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email || !imageFile) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
      });
    }

    // Prepare folder path
    const uploadDir = path.join(process.cwd(), "public", "schoolImages");

    // Create folder if not exists
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Save image
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${imageFile.name}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const imageUrl = `/schoolImages/${fileName}`;

    // Save record in MySQL via Prisma
    const newSchool = await prisma.school.create({
      data: {
        name,
        address,
        city,
        state,
        contact,
        email_id: email,
        image: imageUrl,
      },
    });

    return new Response(JSON.stringify(newSchool), { status: 201 });

  } catch (error) {
    console.error("Error adding school:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

// ---------- GET: Fetch Schools ----------
export async function GET() {
  try {
    const schools = await prisma.school.findMany();
    return new Response(JSON.stringify(schools), { status: 200 });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch schools" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing ID" }), { status: 400 });
    }

    await prisma.school.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: "Deleted successfully" }), {
      status: 200,
    });

  } catch (error) {
    console.error("DELETE error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

