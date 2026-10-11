import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { saveProgress } from "@/lib/google-sheets";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { lessonId, status, watchTimeSeconds } = await req.json();

    if (!lessonId) {
      return NextResponse.json({ error: "lessonId is required" }, { status: 400 });
    }

    const result = await saveProgress(
      session.email,
      lessonId,
      status || "Completed",
      watchTimeSeconds || 0
    );

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error saving progress";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
