





import { NextResponse } from "next/server";

import { connectDB } from "utils/connectDB";
import Job from "app/lib/models/Job";
export async function GET() {
  try {
    await connectDB(); // Connect to MongoDB
    const jobs = await Job.find(); // Fetch all jobs
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
