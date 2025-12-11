import { prisma } from "../../../lib/prisma";
import cloudinary from "../../../lib/cloudinary";

export async function GET() {
  try {
    const schools = await prisma.school.findMany();
    return Response.json(schools);
  } catch (error) {
    console.error("GET error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const form = await req.formData();

    const name = form.get("name");
    const address = form.get("address");
    const city = form.get("city");
    const state = form.get("state");
    const contact = form.get("contact");
    const email_id = form.get("email_id");
    const imageFile = form.get("image");

    if (!imageFile || typeof imageFile === "string") {
      return Response.json({ error: "Image is required" }, { status: 400 });
    }

    // Convert uploaded image to buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const imageUrl = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: "schools" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result.secure_url);
        }
      );
      upload.end(buffer);
    });

    // Insert into DB
    const newSchool = await prisma.school.create({
      data: {
        name,
        address,
        city,
        state,
        contact,
        email_id,
        image: imageUrl,
      },
    });

    return Response.json(newSchool);
  } catch (error) {
    console.error("POST error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await prisma.school.delete({
      where: { id: Number(id) },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
