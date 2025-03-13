import { NextResponse } from "next/server";

import { connectDB } from "utils/connectDB";
import Candidate from "app/lib/models/Candidate";

export async function GET(req: Request) {
  try {
    await connectDB();
    const candidates = await Candidate.find();
    return NextResponse.json(candidates, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch candidates" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, skills, experience, education, resume } = await req.json();

    const candidate = new Candidate({
      name,
      email,
      skills,
      experience,
      education,
      resume,
    });

    await candidate.save();
    return NextResponse.json({ message: "Profile created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
  }
}
