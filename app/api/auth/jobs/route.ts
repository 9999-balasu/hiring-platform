

import { NextResponse } from "next/server";
import { connectDB } from "utils/connectDB";
import Job from "app/lib/models/Job";

export async function POST(req: Request) {
  try {
    await connectDB(); // Connect to the database

    const { title, description, skills, recruiterId } = await req.json();
    
    // Validate input
    if (!title || !description || !skills || !recruiterId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create a new job entry
    const job = await Job.create({ title, description, skills, recruiter: recruiterId });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
