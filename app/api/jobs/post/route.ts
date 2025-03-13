




import { NextResponse } from "next/server";

import { connectDB } from "utils/connectDB";
import Job from "app/lib/models/Job";
export async function POST(req: Request) {
  try {
    await connectDB();
    const { title, company, location, recruiter } = await req.json();

    if (!title || !company || !location || !recruiter) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const job = new Job({ title, company, location, recruiter });
    await job.save();

    return NextResponse.json({ message: "Job posted successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to post job" }, { status: 500 });
  }
}
