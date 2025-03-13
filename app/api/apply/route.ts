/*import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/lib/models/Application";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { jobId, candidateId, coverLetter } = await req.json();

    const application = new Application({
      jobId,
      candidateId,
      coverLetter,
      status: "Pending",
    });

    await application.save();
    return NextResponse.json({ message: "Application submitted!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
  }
}*/



import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/lib/models/Application";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { jobId, candidateId, coverLetter } = await req.json();

    const application = new Application({
      jobId,
      candidateId,
      coverLetter,
      status: "Pending",
    });

    await application.save();
    return NextResponse.json({ message: "Application submitted!" }, { status: 201 });
  } catch (error) {
    console.error("Error submitting application:", error); // ✅ Log the error
    return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
  }
}

