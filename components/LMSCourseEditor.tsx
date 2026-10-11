"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Video,
  FileText,
  ChevronUp,
  ChevronDown,
  Loader2,
  ArrowLeft,
  Pencil,
  X,
  Save,
  BookOpen,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

export interface LessonData {
  lessonId: string;
  moduleId: string;
  lessonTitle: string;
  lessonType: "video" | "youtube" | "notes" | "assignment";
  driveFileId: string;
  notesContent: string;
  attachmentUrl: string;
  durationMinutes: number;
  order: number;
  status: string;
}

export interface ModuleData {
  moduleId: string;
  courseId: string;
  moduleName: string;
  order: number;
  lessons: LessonData[];
}

interface LMSCourseEditorProps {
  courseId: string;
  courseName: string;
  modules: ModuleData[];
}

export default function LMSCourseEditor({
  courseId,
  courseName,
  modules: initialModules,
}: LMSCourseEditorProps) {
  const router = useRouter();
  const [modules, setModules] = useState<ModuleData[]>(initialModules);

  useEffect(() => {
    setModules(initialModules);
  }, [initialModules]);

  const [newModuleName, setNewModuleName] = useState("");
  const [addingModule, setAddingModule] = useState(false);
  const [activeLessonFormModId, setActiveLessonFormModId] = useState<string | null>(null);

  // Lesson Form state (for Add New)
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonType, setLessonType] = useState<"video" | "youtube" | "notes" | "assignment">("video");
  const [videoUrl, setVideoUrl] = useState("");
  const [notesContent, setNotesContent] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [duration, setDuration] = useState("15");
  const [savingLesson, setSavingLesson] = useState(false);

  // Edit Lesson state
  const [editingLesson, setEditingLesson] = useState<LessonData | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editType, setEditType] = useState<"video" | "youtube" | "notes" | "assignment">("video");
  const [editVideoUrl, setEditVideoUrl] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editAttachment, setEditAttachment] = useState("");
  const [editDuration, setEditDuration] = useState("15");
  const [savingEdit, setSavingEdit] = useState(false);

  // Reorder loading state
  const [reordering, setReordering] = useState<string | null>(null);

  const resetAddForm = () => {
    setLessonTitle("");
    setLessonType("video");
    setVideoUrl("");
    setNotesContent("");
    setAttachmentUrl("");
    setDuration("15");
    setActiveLessonFormModId(null);
  };

  const openEditForm = (lesson: LessonData) => {
    setEditingLesson(lesson);
    setEditTitle(lesson.lessonTitle);
    setEditType(lesson.lessonType);

    if (lesson.lessonType === "youtube" && lesson.driveFileId) {
      setEditVideoUrl(`https://www.youtube.com/watch?v=${lesson.driveFileId}`);
    } else if (lesson.lessonType === "video" && lesson.driveFileId) {
      setEditVideoUrl(`https://drive.google.com/file/d/${lesson.driveFileId}/view`);
    } else {
      setEditVideoUrl(lesson.driveFileId || "");
    }
    setEditNotes(lesson.notesContent || "");
    setEditAttachment(lesson.attachmentUrl || "");
    setEditDuration(String(lesson.durationMinutes || 15));
  };

  // Add Module
  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleName.trim()) return;

    setAddingModule(true);
    try {
      const res = await fetch("/api/mentor/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          moduleName: newModuleName.trim(),
          order: modules.length + 1,
        }),
      });

      if (res.ok) {
        setNewModuleName("");
        router.refresh();
        setTimeout(() => window.location.reload(), 600);
      }
    } catch (err) {
      console.error("Failed to add module:", err);
    } finally {
      setAddingModule(false);
    }
  };

  // Add Lesson
  const handleAddLesson = async (moduleId: string) => {
    if (!lessonTitle.trim()) return;

    setSavingLesson(true);
    try {
      const res = await fetch("/api/mentor/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId,
          lessonTitle: lessonTitle.trim(),
          lessonType,
          videoUrl: videoUrl.trim(),
          notesContent: notesContent.trim(),
          attachmentUrl: attachmentUrl.trim(),
          durationMinutes: parseInt(duration) || 15,
        }),
      });

      if (res.ok) {
        resetAddForm();
        router.refresh();
        setTimeout(() => window.location.reload(), 600);
      }
    } catch (err) {
      console.error("Failed to add lesson:", err);
    } finally {
      setSavingLesson(false);
    }
  };

  // Update Lesson
  const handleUpdateLesson = async () => {
    if (!editingLesson || !editTitle.trim()) return;

    setSavingEdit(true);
    try {
      const res = await fetch("/api/mentor/lessons", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: editingLesson.lessonId,
          lessonTitle: editTitle.trim(),
          lessonType: editType,
          videoUrl: editVideoUrl.trim(),
          notesContent: editNotes.trim(),
          attachmentUrl: editAttachment.trim(),
          durationMinutes: editDuration,
        }),
      });

      if (res.ok) {
        setEditingLesson(null);
        router.refresh();
        setTimeout(() => window.location.reload(), 600);
      }
    } catch (err) {
      console.error("Failed to update lesson:", err);
    } finally {
      setSavingEdit(false);
    }
  };

  // Delete Lesson
  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;

    try {
      const res = await fetch(`/api/mentor/lessons?lessonId=${lessonId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (err) {
      console.error("Failed to delete lesson:", err);
    }
  };

  // Reorder Lesson (Move Up or Down)
  const handleReorder = async (moduleId: string, lessonIdx: number, direction: "up" | "down") => {
    const mod = modules.find((m) => m.moduleId === moduleId);
    if (!mod) return;

    const swapIdx = direction === "up" ? lessonIdx - 1 : lessonIdx + 1;
    if (swapIdx < 0 || swapIdx >= mod.lessons.length) return;

    const lessonA = mod.lessons[lessonIdx];
    const lessonB = mod.lessons[swapIdx];

    const updatedLessons = [...mod.lessons];
    [updatedLessons[lessonIdx], updatedLessons[swapIdx]] = [
      updatedLessons[swapIdx],
      updatedLessons[lessonIdx],
    ];

    updatedLessons.forEach((l, idx) => {
      l.order = idx + 1;
    });

    const orderedLessonIds = updatedLessons.map((l) => l.lessonId);

    // Optimistic UI update
    setModules((prev) =>
      prev.map((m) => (m.moduleId === moduleId ? { ...m, lessons: updatedLessons } : m))
    );

    setReordering(lessonA.lessonId);
    try {
      const res = await fetch("/api/mentor/lessons", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId,
          orderedLessonIds,
          lessonIdA: lessonA.lessonId,
          orderA: lessonA.order,
          lessonIdB: lessonB.lessonId,
          orderB: lessonB.order,
        }),
      });

      if (!res.ok) {
        alert("Failed to save reordered lessons");
        setModules(initialModules);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to reorder lessons:", err);
      setModules(initialModules);
    } finally {
      setReordering(null);
    }
  };

  const renderLessonForm = (
    mode: "add" | "edit",
    moduleId: string,
    title: string,
    setTitle: (v: string) => void,
    type: string,
    setType: (v: any) => void,
    vUrl: string,
    setVUrl: (v: string) => void,
    notes: string,
    setNotes: (v: string) => void,
    attach: string,
    setAttach: (v: string) => void,
    dur: string,
    setDur: (v: string) => void,
    saving: boolean,
    onSave: () => void,
    onCancel: () => void
  ) => (
    <div className="p-6 bg-slate-950/80 border-b border-slate-800 space-y-4">
      <h4 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center justify-between">
        <span>{mode === "add" ? "Add New Lesson Details" : `Editing: ${editingLesson?.lessonTitle}`}</span>
        <button
          onClick={onCancel}
          className="text-slate-500 hover:text-white p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Lesson Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:ring-1 focus:ring-emerald-500"
            placeholder="e.g. Test Scenarios Design & Best Practices"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Lesson Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs focus:ring-1 focus:ring-emerald-500"
          >
            <option value="video">Google Drive Video</option>
            <option value="youtube">YouTube Video</option>
            <option value="notes">Text Notes / Documentation</option>
            <option value="assignment">Assignment / Project Task</option>
          </select>
        </div>
      </div>

      {(type === "video" || type === "youtube") && (
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Video Link / Drive File URL
          </label>
          <input
            type="text"
            value={vUrl}
            onChange={(e) => setVUrl(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:ring-1 focus:ring-emerald-500 font-mono"
            placeholder="Paste full Google Drive link or YouTube URL here"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Duration (Minutes)</label>
          <input
            type="number"
            value={dur}
            onChange={(e) => setDur(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:ring-1 focus:ring-emerald-500"
            placeholder="15"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Reference PDF / Attachment Link (Optional)
          </label>
          <input
            type="text"
            value={attach}
            onChange={(e) => setAttach(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:ring-1 focus:ring-emerald-500"
            placeholder="Paste PDF or Google Docs link"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1">
          Lecture Notes / Description / Code Snippets (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:ring-1 focus:ring-emerald-500 font-sans"
          placeholder="Enter notes, key interview takeaways, or cheat sheet links..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onCancel}
          className="px-3.5 py-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold hover:text-white"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving || !title.trim()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold hover:bg-emerald-600 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20"
        >
          {saving && <Loader2 className="w-3 h-3 animate-spin" />}
          {mode === "add" ? (
            <>
              <Plus className="w-3.5 h-3.5" /> Save Lesson
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" /> Update Lesson
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-slate-100">
      {/* Header Link */}
      <a
        href="/lms/mentor"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Mentor Panel
      </a>

      {/* Course Title Banner */}
      <div className="mb-10 pb-6 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase">
            Curriculum & Syllabus Editor
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-tight">
            {courseName}
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Course ID: <span className="font-mono text-slate-400">{courseId}</span> • Add modules,
            video lessons, notes and assignments.
          </p>
        </div>

        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-xl text-xs font-bold border border-emerald-500/20">
          Live Editable
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Modules & Lessons List (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Course Modules ({modules.length})
            </h2>
          </div>

          {modules.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
              <p className="text-slate-400 text-sm">
                No modules added yet. Use the sidebar form on the right to create your first module.
              </p>
            </div>
          ) : (
            modules.map((mod, modIdx) => (
              <div
                key={mod.moduleId}
                className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl"
              >
                {/* Module Header */}
                <div className="bg-slate-900/90 px-5 py-4 border-b border-slate-800 flex justify-between items-center gap-4">
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      Module {modIdx + 1}: {mod.moduleName}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {mod.moduleId} • {mod.lessons.length} lessons
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      resetAddForm();
                      setActiveLessonFormModId(
                        activeLessonFormModId === mod.moduleId ? null : mod.moduleId
                      );
                    }}
                    className="inline-flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold text-xs px-3 py-1.5 rounded-xl border border-emerald-500/20 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Lesson
                  </button>
                </div>

                {/* Add Lesson Form Inline */}
                {activeLessonFormModId === mod.moduleId &&
                  !editingLesson &&
                  renderLessonForm(
                    "add",
                    mod.moduleId,
                    lessonTitle,
                    setLessonTitle,
                    lessonType,
                    setLessonType,
                    videoUrl,
                    setVideoUrl,
                    notesContent,
                    setNotesContent,
                    attachmentUrl,
                    setAttachmentUrl,
                    duration,
                    setDuration,
                    savingLesson,
                    () => handleAddLesson(mod.moduleId),
                    () => resetAddForm()
                  )}

                {/* Edit Lesson Form Inline */}
                {editingLesson &&
                  editingLesson.moduleId === mod.moduleId &&
                  renderLessonForm(
                    "edit",
                    mod.moduleId,
                    editTitle,
                    setEditTitle,
                    editType,
                    setEditType,
                    editVideoUrl,
                    setEditVideoUrl,
                    editNotes,
                    setEditNotes,
                    editAttachment,
                    setEditAttachment,
                    editDuration,
                    setEditDuration,
                    savingEdit,
                    handleUpdateLesson,
                    () => setEditingLesson(null)
                  )}

                {/* Lessons List */}
                <div className="divide-y divide-slate-800/60">
                  {mod.lessons.length === 0 ? (
                    <div className="p-5 text-center text-slate-500 text-xs">
                      No lessons in this module. Click &quot;Add Lesson&quot; above to create one.
                    </div>
                  ) : (
                    mod.lessons.map((lesson, lessonIdx) => (
                      <div
                        key={lesson.lessonId}
                        className="flex items-center justify-between p-4 bg-slate-950/30 hover:bg-slate-900/40 transition-all gap-3"
                      >
                        {/* Lesson Info */}
                        <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-slate-400 shrink-0 border border-slate-800">
                            {lesson.lessonType === "notes" ? (
                              <FileText className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Video className="w-3.5 h-3.5 text-emerald-400" />
                            )}
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-bold text-slate-200 text-xs truncate leading-snug">
                              {lesson.lessonTitle}
                            </p>
                            <p className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">
                              {lesson.lessonType} • {lesson.durationMinutes} mins
                            </p>
                          </div>
                        </div>

                        {/* Controls: Move Up, Move Down, Edit, Delete */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleReorder(mod.moduleId, lessonIdx, "up")}
                            disabled={lessonIdx === 0 || reordering === lesson.lessonId}
                            className="p-1.5 text-slate-500 hover:text-emerald-400 transition-colors rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move Up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleReorder(mod.moduleId, lessonIdx, "down")}
                            disabled={lessonIdx === mod.lessons.length - 1 || reordering === lesson.lessonId}
                            className="p-1.5 text-slate-500 hover:text-emerald-400 transition-colors rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move Down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => openEditForm(lesson)}
                            className="p-1.5 text-slate-500 hover:text-amber-400 transition-colors rounded-lg"
                            title="Edit Lesson"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteLesson(lesson.lessonId)}
                            className="p-1.5 text-slate-500 hover:text-red-400 transition-colors rounded-lg"
                            title="Delete Lesson"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Course Settings Sidebar (Right Column) */}
        <div className="space-y-6">
          {/* Add Module Form */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              Add Course Module
            </h3>

            <form onSubmit={handleAddModule} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Module Name
                </label>
                <input
                  type="text"
                  required
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:ring-1 focus:ring-emerald-500"
                  placeholder="e.g. Test Plan & Matrix Design"
                  disabled={addingModule}
                />
              </div>

              <button
                type="submit"
                disabled={addingModule || !newModuleName.trim()}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {addingModule && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Add Module
              </button>
            </form>
          </div>

          {/* Quick Instructions Card */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              Google Drive Video Tips
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              When pasting Google Drive links, make sure the video&apos;s sharing permission is set to{" "}
              <b className="text-emerald-400">&quot;Anyone with the link can view&quot;</b>.
            </p>
            <p className="text-slate-500 text-[11px] leading-relaxed mt-2">
              Google automatically secures the embedded stream for students on the portal.
            </p>
          </div>

          {/* Controls Summary Card */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-semibold text-white text-sm mb-3">Controls Quick Guide</h3>
            <div className="space-y-2 text-slate-400 text-xs leading-relaxed">
              <p>
                ✏️ <b className="text-amber-400">Edit</b> — Modify title, video link, notes, or
                attachments.
              </p>
              <p>
                ▲▼ <b className="text-emerald-400">Reorder</b> — Move lessons up or down in sequence.
              </p>
              <p>
                🗑️ <b className="text-red-400">Delete</b> — Remove lesson from student syllabus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
