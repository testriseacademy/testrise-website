import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  appendRow,
  LMS_SHEETS,
  extractMediaSource,
  updateLesson,
  deleteLessonById,
  swapLessonOrder,
  getLessons,
} from "@/lib/google-sheets";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "mentor" && session.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const {
      moduleId,
      lessonTitle,
      lessonType = "video",
      videoUrl = "",
      notesContent = "",
      attachmentUrl = "",
      durationMinutes = 10,
    } = await req.json();

    if (!moduleId || !lessonTitle) {
      return NextResponse.json(
        { error: "Module ID and Lesson Title are required." },
        { status: 400 }
      );
    }

    // Extract ID for YouTube or Google Drive
    const media = extractMediaSource(videoUrl);
    const mediaId = media.id || videoUrl;

    // Get current lessons to compute order
    const currentLessons = await getLessons(moduleId);
    const orderIndex = currentLessons.length + 1;
    const lessonId = `LES-${moduleId.replace("MOD-", "")}-${Date.now().toString().slice(-4)}`;

    await appendRow(LMS_SHEETS.LESSONS, [
      lessonId,
      moduleId,
      lessonTitle.trim(),
      lessonType,
      mediaId,
      notesContent.trim(),
      attachmentUrl.trim(),
      parseInt(durationMinutes) || 10,
      orderIndex,
      "Published",
    ]);

    return NextResponse.json({ success: true, lessonId });
  } catch (err: any) {
    console.error("Create lesson error:", err);
    return NextResponse.json({ error: err.message || "Failed to create lesson" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "mentor" && session.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const {
      lessonId,
      lessonTitle,
      lessonType,
      videoUrl,
      notesContent,
      attachmentUrl,
      durationMinutes,
    } = await req.json();

    if (!lessonId) {
      return NextResponse.json({ error: "Lesson ID is required." }, { status: 400 });
    }

    let mediaId = videoUrl;
    if (videoUrl) {
      const media = extractMediaSource(videoUrl);
      mediaId = media.id || videoUrl;
    }

    const result = await updateLesson(lessonId, {
      lessonTitle: lessonTitle ? lessonTitle.trim() : undefined,
      lessonType,
      driveFileId: mediaId,
      notesContent: notesContent !== undefined ? notesContent.trim() : undefined,
      attachmentUrl: attachmentUrl !== undefined ? attachmentUrl.trim() : undefined,
      durationMinutes: durationMinutes !== undefined ? parseInt(durationMinutes) || 0 : undefined,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Update lesson error:", err);
    return NextResponse.json({ error: err.message || "Failed to update lesson" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "mentor" && session.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const lessonId = searchParams.get("lessonId");

    if (!lessonId) {
      return NextResponse.json({ error: "Lesson ID is required." }, { status: 400 });
    }

    await deleteLessonById(lessonId);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Delete lesson error:", err);
    return NextResponse.json({ error: err.message || "Failed to delete lesson" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "mentor" && session.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await req.json();
    const { moduleId, orderedLessonIds, lessonIdA, orderA, lessonIdB, orderB } = body;

    const result = await swapLessonOrder(
      lessonIdA,
      orderA,
      lessonIdB,
      orderB,
      moduleId,
      orderedLessonIds
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Reorder failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Reorder lessons error:", err);
    return NextResponse.json({ error: err.message || "Failed to reorder lessons" }, { status: 500 });
  }
}
