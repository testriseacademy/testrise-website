import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  getCourses,
  getModules,
  getLessons,
  getStudentProgress,
  formatRollNumber,
} from "@/lib/google-sheets";
import LMSNavbar from "@/components/LMSNavbar";
import {
  BookOpen,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  Award,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/lms/login?redirect=/lms/dashboard");
  }

  // If mentor visits dashboard, give them a seamless portal
  const assignedLevel = session.courseAssigned || "1";
  const courses = await getCourses(assignedLevel);
  const progressRecords = await getStudentProgress(session.email);

  const completedLessonIds = new Set(
    progressRecords.filter((p) => p.status === "Completed").map((p) => p.lessonId)
  );

  // Compute total lessons available across unlocked courses
  let totalLessonsCount = 0;
  const courseDetails = await Promise.all(
    courses.map(async (course) => {
      const modules = await getModules(course.courseId);
      let courseLessonsTotal = 0;
      let courseCompletedCount = 0;

      for (const m of modules) {
        const lessons = await getLessons(m.moduleId);
        const published = lessons.filter((l) => l.status === "Published");
        courseLessonsTotal += published.length;
        courseCompletedCount += published.filter((l) =>
          completedLessonIds.has(l.lessonId)
        ).length;
      }

      totalLessonsCount += courseLessonsTotal;
      const percent =
        courseLessonsTotal > 0
          ? Math.round((courseCompletedCount / courseLessonsTotal) * 100)
          : 0;

      return {
        ...course,
        modulesCount: modules.length,
        lessonsCount: courseLessonsTotal,
        completedCount: courseCompletedCount,
        percent,
      };
    })
  );

  const totalCompletedCount = completedLessonIds.size;
  const overallPercentage =
    totalLessonsCount > 0
      ? Math.round((totalCompletedCount / totalLessonsCount) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <LMSNavbar user={session} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Student Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-8 shadow-2xl mb-10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-mono font-bold border border-emerald-500/20">
                  Roll No: {formatRollNumber(session.rollNumber)}
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold">
                  Access Level {assignedLevel}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back, {session.fullName}!
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Track your software testing lectures, assignments, and mock interview preparations.
              </p>
            </div>

            {/* Overall Progress Gauge */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 sm:px-6 flex items-center gap-4 shrink-0 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-400 text-base">
                {overallPercentage}%
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                  Program Progress
                </p>
                <p className="text-sm font-bold text-white mt-0.5">
                  {totalCompletedCount} of {totalLessonsCount} Completed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action: AI Mock Interview Practice Banner */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-300">
                AI Communication & Mock Interview Practice
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Practice interview questions on camera with instant feedback on confidence, speech clarity, and testing keywords.
              </p>
            </div>
          </div>
          <a
            href="/apply/screening"
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-lg shadow-amber-400/10"
          >
            Start Practice Round
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Enrolled Courses / Modules Grid */}
        <div className="mb-14">
          <h2 className="text-xl font-bold text-white tracking-tight mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            Your Learning Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseDetails.map((course) => (
              <div
                key={course.courseId}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all rounded-3xl p-6 flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2.5 py-0.5 bg-slate-950 text-emerald-400 rounded-lg text-[10px] font-bold border border-slate-800 uppercase">
                      {course.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {course.percent}%
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base mt-2 mb-2 group-hover:text-emerald-400 transition-colors">
                    {course.courseName}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {course.description}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mt-6 border border-slate-800">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${course.percent}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium mt-2">
                    <span>{course.modulesCount} Modules</span>
                    <span>
                      {course.completedCount}/{course.lessonsCount} Lessons
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/80">
                  <a
                    href={`/lms/course/${course.courseId}`}
                    className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Open Course Lectures
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentor Support Banner */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Need course doubts resolved or higher level unlock? Connect with your senior mentor.
            </span>
          </div>
          <a
            href="mailto:info@testriseacademy.com"
            className="text-emerald-400 hover:underline font-semibold"
          >
            info@testriseacademy.com
          </a>
        </div>
      </main>
    </div>
  );
}
