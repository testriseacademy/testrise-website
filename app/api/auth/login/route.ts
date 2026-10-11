import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail, updateLastLogin } from "@/lib/google-sheets";
import { createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const record = await findUserByEmail(email);

    if (!record) {
      return NextResponse.json(
        { error: "User not found with this email. Please check your email or contact support." },
        { status: 401 }
      );
    }

    const { user, rowIndex } = record;

    if (user.status === "Blocked" || user.status === "Inactive") {
      return NextResponse.json(
        { error: "Your account is currently suspended. Please contact your mentor." },
        { status: 403 }
      );
    }

    // Check password
    const isMatch = password === user.passwordHash || (user.passwordHash === "mentor123" && password === "mentor123");

    if (!isMatch) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    // Update last login
    await updateLastLogin(rowIndex, user.email);

    // Create session cookie
    await createSession({
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      courseAssigned: user.courseAssigned || "1",
      rollNumber: user.rollNumber,
    });

    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        courseAssigned: user.courseAssigned,
        rollNumber: user.rollNumber,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal login error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
