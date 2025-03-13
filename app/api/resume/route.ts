import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
//import Resume from "@/lib/models/Resume";
import pdfParse from "pdf-parse";
import Resume from "../../../lib/models/Resume";



export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfData = await pdfParse(buffer);
    
    const extractedData = {
      name: file.name,
      text: pdfData.text,
    };

    const newResume = new Resume(extractedData);
    await newResume.save();

    return NextResponse.json({ message: "Resume uploaded", resume: newResume }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process resume" }, { status: 500 });
  }
}
