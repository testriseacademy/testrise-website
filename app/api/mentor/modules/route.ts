import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { appendRow, LMS_SHEETS } from "@/lib/google-sheets";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "mentor" && session.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const { courseId, moduleName, order } = await req.json();

    if (!courseId || !moduleName) {
      return NextResponse.json(
        { error: "Course ID and Module Name are required." },
        { status: 400 }
      );
    }

    const moduleId = `MOD-${Date.now().toString().slice(-6)}`;
    await appendRow(LMS_SHEETS.MODULES, [
      moduleId,
      courseId,
      moduleName.trim(),
      order || 1,
      "Published",
    ]);

    return NextResponse.json({ success: true, moduleId });
  } catch (err: any) {
    console.error("Create module error:", err);
    return NextResponse.json({ error: err.message || "Failed to create module" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "mentor" && session.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const { moduleId, moduleName, order } = await req.json();
    if (!moduleId) {
      return NextResponse.json({ error: "Module ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (moduleName) updateData.module_name = moduleName.trim();
    if (order !== undefined) updateData.order_index = order;

    const { error } = await supabase
      .from("lms_modules")
      .update(updateData)
      .eq("module_id", moduleId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Update module error:", err);
    return NextResponse.json({ error: err.message || "Failed to update module" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "mentor" && session.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const moduleId = searchParams.get("moduleId");

    if (!moduleId) {
      return NextResponse.json({ error: "Module ID is required" }, { status: 400 });
    }

    // Soft delete
    const { error } = await supabase
      .from("lms_modules")
      .update({ status: "Deleted" })
      .eq("module_id", moduleId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Delete module error:", err);
    return NextResponse.json({ error: err.message || "Failed to delete module" }, { status: 500 });
  }
}
