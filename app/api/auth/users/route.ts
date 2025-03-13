


/*
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDB";
import User from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    await connectDB(); // Connect to MongoDB

    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}*/



/*import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDB";
import User from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    await connectDB(); // Connect to MongoDB

    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
*/


import { NextResponse } from "next/server";

import { connectDB } from "utils/connectDB";
import User from "app/lib/models/User";
export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
