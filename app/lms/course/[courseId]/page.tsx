import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  getAllCourses,
  getCourses,
  findUserByEmail,
  getModules,
  getLessons,
  getStudentProgress,
} from "@/lib/google-sheets";
import LMSNavbar from "@/components/LMSNavbar";
import CoursePlayerClient from "./CoursePlayerClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { courseId } = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/lms/login?redirect=/lms/course/${courseId}`);
  }

  // Enforce student access level check matching SPA
  if (session.role !== "mentor" && session.role !== "admin") {
    const freshUserData = await findUserByEmail(session.email);
    const assignedLevel = freshUserData?.user?.courseAssigned || session.courseAssigned || "1";
    const allowedCourses = await getCourses(assignedLevel);
    if (!allowedCourses.some((c) => c.courseId === courseId)) {
      redirect("/lms/dashboard");
    }
  }

  const allCourses = await getAllCourses();
  const course = allCourses.find((c) => c.courseId === courseId);

  if (!course) {
    redirect("/lms/dashboard");
  }

  const modules = await getModules(courseId);
  const progressRecords = await getStudentProgress(session.email);

  const modulesWithLessons = await Promise.all(
    modules.map(async (mod) => {
      const lessons = await getLessons(mod.moduleId);
      return {
        ...mod,
        lessons: lessons.filter((l) => l.status === "Published"),
      };
    })
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <LMSNavbar user={session} />
      <CoursePlayerClient
        course={course}
        modulesWithLessons={modulesWithLessons}
        initialProgress={progressRecords}
        userEmail={session.email}
      />
    </div>
  );
}
