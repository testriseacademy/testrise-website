"use client";

import { useState } from "react";
import {
  Users,
  FileText,
  HelpCircle,
  Share2,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Shield,
  Loader2,
  Lock,
  Unlock,
  Sparkles,
} from "lucide-react";
import { formatRollNumber } from "@/lib/google-sheets";

interface StudentRow {
  email: string;
  fullName: string;
  courseAssigned: string;
  lastLogin: string;
  status: string;
  roll_number: number | null;
}

interface ApplicationRow {
  id: number;
  full_name: string;
  email: string;
  mobile: string;
  city?: string;
  qualification?: string;
  passout_year?: string;
  current_status?: string;
  selected_course?: string;
  lead_source?: string;
  roll_number?: string;
  status: string;
  screening_score?: number;
  created_at: string;
}

interface InquiryRow {
  id: number;
  name: string;
  email: string;
  mobile: string;
  course?: string;
  query?: string;
  city?: string;
  status: string;
  created_at: string;
}

interface MentorStudentManagerProps {
  initialStudents: StudentRow[];
  initialApplications: ApplicationRow[];
  initialInquiries: InquiryRow[];
  initialProgress: string[][];
  initialPartners: any[];
}

export default function MentorStudentManager({
  initialStudents,
  initialApplications,
  initialInquiries,
  initialProgress,
  initialPartners,
}: MentorStudentManagerProps) {
  const [activeTab, setActiveTab] = useState<"students" | "applications" | "inquiries" | "partners">("students");

  // State
  const [students, setStudents] = useState<StudentRow[]>(initialStudents);
  const [applications, setApplications] = useState<ApplicationRow[]>(initialApplications);
  const [inquiries, setInquiries] = useState<InquiryRow[]>(initialInquiries);
  const [partners, setPartners] = useState<any[]>(initialPartners);
  const [searchTerm, setSearchTerm] = useState("");

  // Add student modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("TRA@1234");
  const [newLevel, setNewLevel] = useState("1");
  const [savingStudent, setSavingStudent] = useState(false);
  const [addSuccessMsg, setAddSuccessMsg] = useState("");

  // Video progress details modal
  const [selectedStudentProgress, setSelectedStudentProgress] = useState<{
    email: string;
    records: string[][];
  } | null>(null);

  // Filter students
  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.roll_number && s.roll_number.toString().includes(searchTerm))
  );

  // Update Access Level (1, 2, 3)
  const handleUpdateLevel = async (email: string, level: string) => {
    try {
      const res = await fetch("/api/mentor/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_access",
          email,
          courseAssigned: level,
        }),
      });
      if (res.ok) {
        setStudents((prev) =>
          prev.map((s) => (s.email === email ? { ...s, courseAssigned: level } : s))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Active / Blocked Status
  const handleToggleStatus = async (email: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Blocked" : "Active";
    try {
      const res = await fetch("/api/mentor/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_status",
          email,
          status: newStatus,
        }),
      });
      if (res.ok) {
        setStudents((prev) =>
          prev.map((s) => (s.email === email ? { ...s, status: newStatus } : s))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Create Student
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;
    setSavingStudent(true);
    setAddSuccessMsg("");

    try {
      const res = await fetch("/api/mentor/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          fullName: newName.trim(),
          email: newEmail.trim().toLowerCase(),
          password: newPassword,
          courseAssigned: newLevel,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAddSuccessMsg(
          `Student enrolled successfully! Roll No: ${formatRollNumber(data.rollNumber)}`
        );
        setStudents((prev) => [
          ...prev,
          {
            email: newEmail.trim().toLowerCase(),
            fullName: newName.trim(),
            courseAssigned: newLevel,
            lastLogin: "Never",
            status: "Active",
            roll_number: data.rollNumber || null,
          },
        ]);
        setTimeout(() => {
          setShowAddModal(false);
          setNewName("");
          setNewEmail("");
          setAddSuccessMsg("");
        }, 1500);
      } else {
        alert(data.error || "Failed to create student");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingStudent(false);
    }
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = async (id: number, status: string) => {
    try {
      const res = await fetch("/api/mentor/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update Application Status
  const handleUpdateAppStatus = async (id: number, status: string) => {
    try {
      const res = await fetch("/api/mentor/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status } : app))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Count progress for student
  const getStudentProgressSummary = (email: string) => {
    const records = initialProgress.filter(
      (p) => p[0]?.toLowerCase() === email.toLowerCase()
    );
    const completed = records.filter((p) => p[2] === "Completed").length;
    return { count: completed, totalStarted: records.length, records };
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
      {/* Tab Switcher & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex flex-wrap bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab("students")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "students"
                ? "bg-emerald-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            Students Roster ({students.length})
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "applications"
                ? "bg-emerald-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "inquiries"
                ? "bg-emerald-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab("partners")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "partners"
                ? "bg-emerald-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Share2 className="w-4 h-4" />
            Referral Partners ({partners.length})
          </button>
        </div>

        {activeTab === "students" && (
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name, roll no, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add Student
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: STUDENTS ROSTER */}
      {activeTab === "students" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Roll No</th>
                <th className="py-3 px-4 font-semibold">Student Name</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Access Level</th>
                <th className="py-3 px-4 font-semibold">Video Progress</th>
                <th className="py-3 px-4 font-semibold">Last Login</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No students found. Click &quot;Add Student&quot; to enroll a new candidate.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((stud) => {
                  const progressSummary = getStudentProgressSummary(stud.email);
                  return (
                    <tr key={stud.email} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                        {formatRollNumber(stud.roll_number)}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">{stud.fullName}</td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {stud.email}
                      </td>
                      {/* Access Level Selector */}
                      <td className="py-3 px-4">
                        <div className="flex gap-1">
                          {["1", "2", "3"].map((lvl) => (
                            <button
                              key={lvl}
                              onClick={() => handleUpdateLevel(stud.email, lvl)}
                              className={`w-6 h-6 rounded-md font-bold text-[10px] transition-all ${
                                stud.courseAssigned === lvl
                                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                                  : "bg-slate-950 text-slate-500 border border-slate-800 hover:text-white"
                              }`}
                              title={`Unlock Level ${lvl}`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </td>
                      {/* Progress Badge */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() =>
                            setSelectedStudentProgress({
                              email: stud.email,
                              records: progressSummary.records,
                            })
                          }
                          className="px-2.5 py-1 bg-slate-950 text-slate-300 rounded-lg border border-slate-800 text-[11px] font-semibold hover:border-emerald-500/40 hover:text-emerald-400 transition-all flex items-center gap-1.5"
                        >
                          <Clock className="w-3 h-3 text-emerald-400" />
                          {progressSummary.count} Watched ({progressSummary.totalStarted} started)
                        </button>
                      </td>
                      <td className="py-3 px-4 text-slate-400 text-[11px]">
                        {stud.lastLogin || "Never"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            stud.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {stud.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleStatus(stud.email, stud.status)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all ${
                            stud.status === "Active"
                              ? "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                          }`}
                        >
                          {stud.status === "Active" ? "Block" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: REGISTRATION APPLICATIONS */}
      {activeTab === "applications" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Roll No</th>
                <th className="py-3 px-4 font-semibold">Candidate</th>
                <th className="py-3 px-4 font-semibold">Contact</th>
                <th className="py-3 px-4 font-semibold">Qualification</th>
                <th className="py-3 px-4 font-semibold">Screening Score</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Change Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No admission applications submitted yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                      {app.roll_number || "-"}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-white">{app.full_name}</p>
                      <p className="text-slate-400 text-[11px]">{app.city || "Online"}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-slate-300 font-mono text-[11px]">{app.mobile}</p>
                      <p className="text-slate-500 text-[11px]">{app.email}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {app.qualification || "Graduation"}{" "}
                      {app.passout_year ? `(${app.passout_year})` : ""}
                    </td>
                    <td className="py-3 px-4">
                      {app.screening_score !== undefined && app.screening_score !== null ? (
                        <span
                          className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                            app.screening_score >= 70
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {app.screening_score}% Score
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[10px]">Pending Test</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 text-slate-300 border border-slate-800">
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2 py-1 text-xs focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Call Done">Call Done</option>
                        <option value="Converted">Converted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Junk">Junk</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: INQUIRIES */}
      {activeTab === "inquiries" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Contact</th>
                <th className="py-3 px-4 font-semibold">Query</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No lead inquiries received yet.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-semibold text-white">{inq.name}</td>
                    <td className="py-3 px-4">
                      <p className="text-slate-300 font-mono text-[11px]">{inq.mobile}</p>
                      <p className="text-slate-500 text-[11px]">{inq.email}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-300 max-w-xs truncate">
                      {inq.query || "Asked about Software Testing & Pay After Placement"}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 text-slate-300 border border-slate-800">
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2 py-1 text-xs focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Inquiry Submitted">Inquiry Submitted</option>
                        <option value="Call Done">Call Done</option>
                        <option value="Converted">Converted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Junk">Junk</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: REFERRAL PARTNERS */}
      {activeTab === "partners" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Partner ID</th>
                <th className="py-3 px-4 font-semibold">Partner Name</th>
                <th className="py-3 px-4 font-semibold">Phone</th>
                <th className="py-3 px-4 font-semibold">Profession</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {partners.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No referral partners registered yet. Partners register on `/refer`.
                  </td>
                </tr>
              ) : (
                partners.map((part) => (
                  <tr key={part.id || part.partner_id} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                      {part.partner_id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">{part.full_name}</td>
                    <td className="py-3 px-4 font-mono text-slate-300">{part.phone}</td>
                    <td className="py-3 px-4 text-slate-400">{part.profession || "General"}</td>
                    <td className="py-3 px-4 text-slate-400">{part.address || "India"}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {part.status || "Active"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL: ADD STUDENT */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Enroll New Student</h3>
            <p className="text-xs text-slate-400 mb-6">
              Create student login credentials and assign their starting access level.
            </p>

            {addSuccessMsg && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {addSuccessMsg}
              </div>
            )}

            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Initial Password
                </label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs font-mono focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Initial Course Access Level
                </label>
                <select
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="1">Level 1 - Software Manual Testing & SQL</option>
                  <option value="2">Level 2 - API Testing & ETL Data Pipelines</option>
                  <option value="3">Level 3 - Python Automation & Live Projects</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingStudent}
                  className="px-5 py-2.5 text-xs font-bold bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-600 disabled:opacity-50 transition-all flex items-center gap-1.5"
                >
                  {savingStudent ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Enrolling...
                    </>
                  ) : (
                    "Save & Enroll Student"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW VIDEO PROGRESS DETAILS */}
      {selectedStudentProgress && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Study & Watch Activity</h3>
                <p className="text-xs text-slate-400 font-mono">
                  {selectedStudentProgress.email}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudentProgress(null)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-800 rounded-lg"
              >
                Close
              </button>
            </div>

            {selectedStudentProgress.records.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                Student has not started watching any lessons yet.
              </p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {selectedStudentProgress.records.map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center text-xs"
                  >
                    <div>
                      <p className="font-semibold text-white">{rec[1]}</p>
                      <p className="text-[10px] text-slate-500">
                        Last Active: {rec[4] ? new Date(rec[4]).toLocaleString() : "Recently"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          rec[2] === "Completed"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {rec[2]}
                      </span>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {Math.round((parseInt(rec[3]) || 0) / 60)} mins
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
