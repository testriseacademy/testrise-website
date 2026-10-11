import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  readSheet,
  LMS_SHEETS,
  getAllCourses,
  getModules,
  getLessons,
} from "@/lib/google-sheets";
import { supabase } from "@/lib/supabase";
import LMSNavbar from "@/components/LMSNavbar";
import MentorStudentManager from "@/components/MentorStudentManager";
import MentorMockManager from "@/components/MentorMockManager";
import { BookOpen, Users, Video, ShieldCheck, ChevronRight, Edit3 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MentorDashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/lms/login?redirect=/lms/mentor");
  }

  if (session.role !== "mentor" && session.role !== "admin") {
    redirect("/lms/dashboard");
  }

  // 1. Fetch all courses
  const courses = await getAllCourses();

  // 2. Fetch all student users
  const allUsers = await readSheet(LMS_SHEETS.USERS);
  const studentsRaw = allUsers.filter((u) => u[2] === "student");

  // 3. Fetch all progress records
  const allProgress = await readSheet(LMS_SHEETS.PROGRESS);

  // 4. Calculate lessons per course
  const coursesLessonsCount: Record<string, number> = {};
  for (const c of courses) {
    const modules = await getModules(c.courseId);
    let count = 0;
    for (const m of modules) {
      const lessons = await getLessons(m.moduleId);
      count += lessons.filter((l) => l.status === "Published").length;
    }
    coursesLessonsCount[c.courseId] = count;
  }

  // 5. Compile student list for MentorStudentManager
  const studentsList = studentsRaw.map((studRow) => {
    const email = studRow[0];
    const fullName = studRow[3];
    const courseAssigned = studRow[4] || "1";
    const lastLogin = studRow[5] || "Never";
    const status = studRow[6] || "Active";
    const roll_number = studRow[8] ? parseInt(studRow[8]) : null;

    return { email, fullName, courseAssigned, lastLogin, status, roll_number };
  });

  // 6. Fetch applications from Supabase
  let applications: any[] = [];
  try {
    const { data } = await supabase
      .from("student_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      applications = data;
    }
  } catch (err) {
    console.error(err);
  }

  // 7. Fetch inquiries from Supabase
  let inquiries: any[] = [];
  try {
    const { data } = await supabase
      .from("student_inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      inquiries = data;
    }
  } catch (err) {
    console.error(err);
  }

  // 8. Fetch referral partners from Supabase
  let partners: any[] = [];
  try {
    const { data } = await supabase
      .from("referral_partners")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      partners = data;
    }
  } catch (err) {
    console.error(err);
  }

  const totalLessonsGlobal = Object.values(coursesLessonsCount).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <LMSNavbar user={session} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mentor Greeting */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Mentor Operations Panel
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Welcome, {session.fullName}. Manage students, track watch time, and control QA course levels.
            </p>
          </div>
          <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl text-xs font-bold border border-emerald-500/20 uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            {session.role} Account
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Total Enrolled
              </p>
              <p className="text-2xl font-bold text-white mt-0.5">
                {studentsList.length} Students
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Active Programs
              </p>
              <p className="text-2xl font-bold text-white mt-0.5">
                {courses.length} Programs
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Total Lessons
              </p>
              <p className="text-2xl font-bold text-white mt-0.5">
                {totalLessonsGlobal} Lessons
              </p>
            </div>
          </div>
        </div>

        {/* Course Syllabus Overview */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white tracking-tight mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            QA Curriculum & Level Management
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.courseId}
                className="bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all rounded-3xl p-6 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <span className="px-2.5 py-0.5 bg-slate-950 text-emerald-400 rounded-lg text-[10px] font-bold border border-slate-800 uppercase">
                    {course.category}
                  </span>
                  <h3 className="font-bold text-white text-base mt-3 mb-1">
                    {course.courseName}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mt-2 line-clamp-2">
                    {course.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2 justify-between items-center">
                  <span className="text-[11px] font-mono text-slate-500">
                    {coursesLessonsCount[course.courseId] || 0} Lessons
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`/lms/mentor/course/${course.courseId}`}
                      className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-md shadow-emerald-500/10"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Syllabus
                    </a>
                    <a
                      href={`/lms/course/${course.courseId}`}
                      className="text-xs text-slate-400 hover:text-white font-semibold inline-flex items-center gap-1 px-2 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700"
                      title="Preview Player"
                    >
                      Preview
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student & Admissions Manager Section */}
        <div className="mb-14">
          <MentorStudentManager
            initialStudents={studentsList}
            initialApplications={applications}
            initialInquiries={inquiries}
            initialProgress={allProgress}
            initialPartners={partners}
          />
        </div>

        {/* AI Mock Interview Management Section */}
        <div>
          <MentorMockManager />
        </div>
      </main>
    </div>
  );
}
