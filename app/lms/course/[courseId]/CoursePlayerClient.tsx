"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  Play,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { LMSCourse, LMSModule, LMSLesson, StudentProgress } from "@/lib/google-sheets";

interface CoursePlayerClientProps {
  course: LMSCourse;
  modulesWithLessons: (LMSModule & { lessons: LMSLesson[] })[];
  initialProgress: StudentProgress[];
  userEmail: string;
}

export default function CoursePlayerClient({
  course,
  modulesWithLessons,
  initialProgress,
  userEmail,
}: CoursePlayerClientProps) {
  // First lesson as default
  const allLessons = modulesWithLessons.flatMap((m) => m.lessons);
  const [activeLesson, setActiveLesson] = useState<LMSLesson | null>(
    allLessons[0] || null
  );

  const [completedIds, setCompletedIds] = useState<Set<string>>(
    new Set(initialProgress.filter((p) => p.status === "Completed").map((p) => p.lessonId))
  );

  const [marking, setMarking] = useState(false);
  const [watchSeconds, setWatchSeconds] = useState(0);

  // Timer ticker to increment watch time for active lesson
  useEffect(() => {
    const timer = setInterval(() => {
      setWatchSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeLesson]);

  // Periodic watch progress sync (every 30 seconds)
  useEffect(() => {
    if (!activeLesson) return;

    const syncInterval = setInterval(async () => {
      if (watchSeconds > 0) {
        try {
          await fetch("/api/lms/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lessonId: activeLesson.lessonId,
              status: completedIds.has(activeLesson.lessonId) ? "Completed" : "In Progress",
              watchTimeSeconds: watchSeconds,
            }),
          });
        } catch (err) {
          console.error(err);
        }
      }
    }, 30000);

    return () => clearInterval(syncInterval);
  }, [activeLesson, watchSeconds, completedIds]);

  const handleToggleCompleted = async () => {
    if (!activeLesson) return;
    setMarking(true);

    const isCurrentlyDone = completedIds.has(activeLesson.lessonId);
    const newStatus = isCurrentlyDone ? "In Progress" : "Completed";

    try {
      const res = await fetch("/api/lms/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: activeLesson.lessonId,
          status: newStatus,
          watchTimeSeconds: Math.max(watchSeconds, 60),
        }),
      });

      if (res.ok) {
        setCompletedIds((prev) => {
          const next = new Set(prev);
          if (isCurrentlyDone) {
            next.delete(activeLesson.lessonId);
          } else {
            next.add(activeLesson.lessonId);
          }
          return next;
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setMarking(false);
    }
  };

  const isCurrentCompleted = activeLesson ? completedIds.has(activeLesson.lessonId) : false;

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
      {/* Left: Video Player & Lecture Meta */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/lms/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-emerald-400" />
            Back to Dashboard
          </Link>

          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            {course.category}
          </span>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
          {activeLesson ? (
            <iframe
              src={activeLesson.videoUrl}
              title={activeLesson.lessonTitle}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="text-center p-8 text-slate-500">
              <Play className="w-12 h-12 mx-auto mb-2 opacity-40 text-emerald-400" />
              Select a lesson from the syllabus to start watching.
            </div>
          )}
        </div>

        {/* Lesson Information & Actions */}
        {activeLesson && (
          <div className="mt-6 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-slate-400">
                  {activeLesson.lessonId}
                </span>
                <span className="text-slate-600">?</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  {activeLesson.durationMinutes} Mins
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeLesson.lessonTitle}
              </h1>
              <p className="text-xs text-slate-400 mt-1 font-medium">{course.courseName}</p>
            </div>

            <button
              onClick={handleToggleCompleted}
              disabled={marking}
              className={`px-5 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shrink-0 ${
                isCurrentCompleted
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                  : "bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/20"
              }`}
            >
              {isCurrentCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Marked Completed (Undo)
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  Mark as Completed
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Right: Syllabus Navigation Tree */}
      <div className="w-full lg:w-96 flex flex-col shrink-0">
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                Course Syllabus
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {completedIds.size} of {allLessons.length} Lessons Finished
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
              {allLessons.length > 0
                ? Math.round((completedIds.size / allLessons.length) * 100)
                : 0}
              %
            </span>
          </div>

          {/* Module Accordions */}
          <div className="space-y-4 flex-1 overflow-y-auto pr-1">
            {modulesWithLessons.map((mod) => (
              <div
                key={mod.moduleId}
                className="bg-slate-950/60 border border-slate-800/80 rounded-2xl overflow-hidden"
              >
                <div className="p-3.5 bg-slate-900/40 border-b border-slate-800/60 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                      Module {mod.orderIndex}
                    </span>
                    <h3 className="text-xs font-bold text-white mt-0.5">{mod.moduleName}</h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {mod.lessons.length} Lessons
                  </span>
                </div>

                <div className="divide-y divide-slate-800/40">
                  {mod.lessons.map((lesson) => {
                    const isDone = completedIds.has(lesson.lessonId);
                    const isActive = activeLesson?.lessonId === lesson.lessonId;

                    return (
                      <button
                        key={lesson.lessonId}
                        onClick={() => {
                          setActiveLesson(lesson);
                          setWatchSeconds(0);
                        }}
                        className={`w-full text-left p-3 flex items-center justify-between gap-3 transition-colors ${
                          isActive
                            ? "bg-emerald-500/10 text-emerald-300 font-bold border-l-2 border-emerald-500"
                            : "hover:bg-slate-800/40 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Play className="w-3 h-3 text-slate-500 shrink-0" />
                          )}
                          <span className="text-xs truncate">{lesson.lessonTitle}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 shrink-0">
                          {lesson.durationMinutes}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
