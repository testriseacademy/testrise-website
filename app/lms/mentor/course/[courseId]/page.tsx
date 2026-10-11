import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  getAllCourses,
  getModules,
  getLessons,
} from "@/lib/google-sheets";
import LMSNavbar from "@/components/LMSNavbar";
import LMSCourseEditor, { ModuleData } from "@/components/LMSCourseEditor";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function MentorCourseEditPage({ params }: PageProps) {
  const { courseId } = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/lms/login?redirect=/lms/mentor/course/${courseId}`);
  }

  if (session.role !== "mentor" && session.role !== "admin") {
    redirect("/lms/dashboard");
  }

  const allCourses = await getAllCourses();
  const course = allCourses.find((c) => c.courseId === courseId);

  if (!course) {
    redirect("/lms/mentor");
  }

  // Fetch modules & nested lessons
  const modulesRaw = await getModules(courseId);
  const modulesWithLessons: ModuleData[] = await Promise.all(
    modulesRaw.map(async (mod, idx) => {
      const lessons = await getLessons(mod.moduleId);
      return {
        moduleId: mod.moduleId,
        courseId: mod.courseId,
        moduleName: mod.moduleName,
        order: mod.orderIndex || idx + 1,
        lessons: lessons.map((l) => ({
          lessonId: l.lessonId,
          moduleId: l.moduleId,
          lessonTitle: l.lessonTitle,
          lessonType: l.lessonType || "video",
          driveFileId: l.driveFileId || "",
          notesContent: l.notesContent || l.notes || "",
          attachmentUrl: l.attachmentUrl || "",
          durationMinutes: l.durationMinutes || 10,
          order: l.orderIndex || l.order || 1,
          status: l.status || "Published",
        })),
      };
    })
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <LMSNavbar user={session} />
      <main className="flex-1">
        <LMSCourseEditor
          courseId={course.courseId}
          courseName={course.courseName}
          modules={modulesWithLessons}
        />
      </main>
    </div>
  );
}
