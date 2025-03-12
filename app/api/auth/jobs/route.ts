export async function POST(req: Request) {
    await connectDB();
    const { title, description, skills, recruiterId } = await req.json();
    const job = await Job.create({ title, description, skills, recruiter: recruiterId });
  
    return NextResponse.json(job, { status: 201 });
  }
  