import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Resume from "@/lib/models/Resume";
import pdfParse from "pdf-parse";

// Function to extract details from resume text
const extractResumeDetails = (text: string) => {
  const contactInfo = text.match(/(Email:?\s*[\w.-]+@[\w.-]+\.\w{2,})/i)?.[0] || "Not found";
  const skills = text.match(/Skills:?\s*(.*)/i)?.[1]?.split(",") || [];
  const experience = text.match(/Experience:?\s*(.*)/i)?.[1] || "Not found";
  const education = text.match(/Education:?\s*(.*)/i)?.[1] || "Not found";

  return { contactInfo, skills, experience, education };
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer()); // Convert to Buffer
    const pdfData = await pdfParse(buffer); // Parse PDF text
    const extractedData = extractResumeDetails(pdfData.text);

    const newResume = new Resume({
      name: file.name,
      contactInfo: extractedData.contactInfo,
      skills: extractedData.skills,
      experience: extractedData.experience,
      education: extractedData.education,
    });

    await newResume.save();

    return NextResponse.json({ message: "Resume uploaded successfully", resume: newResume }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process resume" }, { status: 500 });
  }
}
