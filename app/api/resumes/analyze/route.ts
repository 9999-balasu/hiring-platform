import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Resume from "@/lib/models/Resume";
import Job from "@/lib/models/Job"; 
import { analyzeResume } from "@/utils/analyzeResume";

analyzeResume

export async function POST(req: Request) {
  try {
    await connectDB();
    const { resumeId, jobId } = await req.json();

    const resume = await Resume.findById(resumeId);
    const job = await Job.findById(jobId);

    if (!resume || !job) {
      return NextResponse.json({ error: "Resume or Job not found" }, { status: 404 });
    }

    const feedback = analyzeResume(resume, job);

    return NextResponse.json({ feedback }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}
