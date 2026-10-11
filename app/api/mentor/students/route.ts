import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  createUserOrUpdate,
  updateStudentAccess,
  readSheet,
  LMS_SHEETS,
} from "@/lib/google-sheets";
import { sendNewStudentWelcomeEmail } from "@/lib/email";

// GET: Fetch all students
export async function GET() {
  try {
    const session = await getSession();
    if (!session || (session.role !== "mentor" && session.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await readSheet(LMS_SHEETS.USERS);
    const students = users
      .filter((row) => row[2] === "student")
      .map((row) => ({
        email: row[0],
        fullName: row[3],
        courseAssigned: row[4] || "1",
        lastLogin: row[5] || "",
        status: row[6] || "Active",
        roll_number: row[8] ? parseInt(row[8]) : null,
      }));

    return NextResponse.json({ students });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error fetching students";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST: Actions: create, update_access, update_status
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "mentor" && session.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action } = body;

    // 1. Create new student account & send welcome email
    if (action === "create") {
      const { email, fullName, password, courseAssigned } = body;
      if (!email || !fullName) {
        return NextResponse.json(
          { error: "Email and Full Name are required." },
          { status: 400 }
        );
      }

      const tempPassword = password || "TRA@1234";
      const result = await createUserOrUpdate({
        email,
        fullName,
        passwordHash: tempPassword,
        role: "student",
        courseAssigned: courseAssigned || "1",
        status: "Active",
      });

      if (result.success) {
        try {
          await sendNewStudentWelcomeEmail({
            studentName: fullName,
            email: email.trim().toLowerCase(),
            temporaryPassword: tempPassword,
            rollNumber: result.rollNumber,
          });
        } catch (emailErr) {
          console.error("Welcome email error:", emailErr);
        }

        return NextResponse.json({ success: true, rollNumber: result.rollNumber });
      }

      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // 2. Update Access Level (1, 2, 3)
    if (action === "update_access") {
      const { email, courseAssigned } = body;
      const result = await updateStudentAccess(email, { courseAssigned });
      if (result.success) {
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // 3. Update Status (Active / Blocked)
    if (action === "update_status") {
      const { email, status } = body;
      const result = await updateStudentAccess(email, { status });
      if (result.success) {
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
