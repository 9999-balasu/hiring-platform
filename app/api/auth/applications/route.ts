/*import { NextResponse } from "next/server";

// Example: Handle GET requests
export async function GET() {
  return NextResponse.json({ message: "Applications API working!" });
}

// Example: Handle POST requests
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // You can process the `data` here (e.g., save it to a database)
    
    return NextResponse.json({ message: "Application received", data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process application" }, { status: 500 });
  }
}*/


import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Applications API working!" });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // TODO: Process `data` (e.g., save to database)

    return NextResponse.json({ message: "Application received", data }, { status: 201 });
  } catch (error) {
    console.error("Error processing application:", error); // ✅ Log the error
    return NextResponse.json({ error: "Failed to process application" }, { status: 500 });
  }
}

