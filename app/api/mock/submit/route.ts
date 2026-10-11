import { NextRequest, NextResponse } from "next/server";
import { saveMockScore } from "@/lib/mock-db";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { studentEmail, topicName, score, wpm } = await req.json();

    if (!studentEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const cleanEmail = studentEmail.toLowerCase().trim();

    // 1. Save score in mock scores table
    await saveMockScore(cleanEmail, topicName || "Screening Round", score || 75, wpm || 110);

    // 2. Also update student_applications table if candidate just finished admission screening
    try {
      await supabase
        .from("student_applications")
        .update({
          screening_score: score,
          screening_status: score >= 70 ? "Passed" : "Under Review",
        })
        .ilike("email", cleanEmail);
    } catch (e) {
      console.error("Error updating application screening score:", e);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error submitting mock score";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
