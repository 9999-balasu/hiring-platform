// app/api/resume/route.ts
/*import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Resume from "@/models/Resume";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { resumeText } = await req.json();
    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 });
    }

    // Simulated resume parsing (replace this with actual AI parsing logic)
    const parsedResume = {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+1 234 567 8900",
      skills: ["JavaScript", "React", "Next.js", "Node.js"],
      workExperience: [
        { company: "Tech Corp", role: "Software Engineer", duration: "Jan 2020 - Present" },
        { company: "Web Solutions", role: "Frontend Developer", duration: "Jun 2018 - Dec 2019" },
      ],
      education: [
        { institution: "University of Technology", degree: "B.Sc. in Computer Science", duration: "2014 - 2018" },
      ],
    };

    // Store parsed resume in MongoDB
    const newResume = await Resume.create(parsedResume);
    return NextResponse.json(newResume, { status: 200 });
  } catch (error) {
    console.error("Resume Parsing Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}*/




import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "utils/connectDB";
import Resume from "app/lib/models/Resume";
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { resumeText } = await req.json();
    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 });
    }

    // Simulated AI resume parsing (replace this with actual AI logic)
    const parsedResume = {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+1 234 567 8900",
      skills: ["JavaScript", "React", "Next.js", "Node.js"],
      workExperience: [
        { company: "Tech Corp", role: "Software Engineer", duration: "Jan 2020 - Present" },
        { company: "Web Solutions", role: "Frontend Developer", duration: "Jun 2018 - Dec 2019" },
      ],
      education: [
        { institution: "University of Technology", degree: "B.Sc. in Computer Science", duration: "2014 - 2018" },
      ],
    };

    // Prevent duplicate resume entries
    const existingResume = await Resume.findOne({ email: parsedResume.email });
    if (existingResume) {
      return NextResponse.json({ message: "Resume already exists", resume: existingResume }, { status: 200 });
    }

    // Store parsed resume in MongoDB
    const newResume = await Resume.create(parsedResume);
    return NextResponse.json({ message: "Resume saved successfully!", resume: newResume }, { status: 201 });

  } catch (error) {
    console.error("Resume Parsing Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

