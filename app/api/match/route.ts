/*import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Candidate from "@/lib/models/Candidate";
import Job from "@/lib/models/Job";

export async function GET(req: Request) {
  try {
    await connectDB();
    const candidates = await Candidate.find();
    const jobs = await Job.find();

    const matches = jobs.map((job) => {
      const rankedCandidates = candidates.map((candidate) => {
        const skillMatch = candidate.skills.filter((skill) => job.requiredSkills.includes(skill)).length;
        const experienceMatch = candidate.experience >= job.minExperience ? 1 : 0;

        const compatibilityScore = (skillMatch / job.requiredSkills.length) * 70 + experienceMatch * 30;

        return {
          candidateId: candidate._id,
          name: candidate.name,
          email: candidate.email,
          score: compatibilityScore.toFixed(2),
          explanation: `Matched ${skillMatch} skills, experience ${experienceMatch ? "sufficient" : "insufficient"}.`
        };
      });

      return {
        jobId: job._id,
        jobTitle: job.title,
        company: job.company,
        matches: rankedCandidates.sort((a, b) => Number(b.score) - Number(a.score)),
      };
    });

    return NextResponse.json(matches, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to match candidates" }, { status: 500 });
  }
}*/

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Candidate from "@/lib/models/Candidate";
import Job from "@/lib/models/Job";

export async function GET(req: Request) {
  try {
    await connectDB();
    const candidates = await Candidate.find();
    const jobs = await Job.find();

    const matches = jobs.map((job) => {
      const rankedCandidates = candidates.map((candidate) => {
        const skillMatch = candidate.skills.filter((skill: string) => 
          (job.requiredSkills as string[]).includes(skill)
        ).length;

        const experienceMatch = candidate.experience >= job.minExperience ? 1 : 0;

        const compatibilityScore = (skillMatch / job.requiredSkills.length) * 70 + experienceMatch * 30;

        return {
          candidateId: candidate._id,
          name: candidate.name,
          email: candidate.email,
          score: compatibilityScore.toFixed(2),
          explanation: `Matched ${skillMatch} skills, experience ${experienceMatch ? "sufficient" : "insufficient"}.`
        };
      });

      return {
        jobId: job._id,
        jobTitle: job.title,
        company: job.company,
        matches: rankedCandidates.sort((a, b) => Number(b.score) - Number(a.score)),
      };
    });

    return NextResponse.json(matches, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to match candidates" }, { status: 500 });
  }
}

