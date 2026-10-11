"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Calendar,
  Briefcase,
  BookOpen,
} from "lucide-react";

export default function ApplyPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [qualification, setQualification] = useState("B.E / B.Tech");
  const [passoutYear, setPassoutYear] = useState("2025");
  const [currentStatus, setCurrentStatus] = useState("Fresher");
  const [selectedCourse, setSelectedCourse] = useState("Software Testing Professional Masters");
  const [leadSource, setLeadSource] = useState("Website");
  const [referralName, setReferralName] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      setError("Please agree to the Pay After Placement admission terms.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          mobile,
          city,
          qualification,
          passoutYear,
          currentStatus,
          selectedCourse,
          leadSource,
          referralName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(
          `/apply/screening?email=${encodeURIComponent(email)}&name=${encodeURIComponent(
            fullName
          )}&mobile=${encodeURIComponent(mobile)}&roll=${encodeURIComponent(data.rollNumber)}`
        );
      }, 1200);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.07] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-sky-500/[0.05] rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Top Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-emerald-400" />
          Back to website
        </Link>

        {/* Header Branding */}
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="Test Rise Academy"
            width={60}
            height={60}
            className="h-12 w-auto mx-auto mb-3 object-contain"
          />
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            Admissions Open · Pay After Placement
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">
            Candidate Application & Registration
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto leading-relaxed">
            Complete your admission registration. Next step: take the 2-minute AI Communication & Screening Assessment.
          </p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl"
        >
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-4 flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl p-4 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="font-semibold">
                Application Submitted! Loading AI Screening Assessment...
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Kulkarni"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  disabled={loading || success}
                />
              </div>
            </div>

            {/* Email & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ramesh@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    disabled={loading || success}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  WhatsApp / Mobile <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    disabled={loading || success}
                  />
                </div>
              </div>
            </div>

            {/* City & Qualification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current City / State
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Pune, Maharashtra"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    disabled={loading || success}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Highest Qualification
                </label>
                <select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  disabled={loading || success}
                >
                  <option value="B.E / B.Tech">B.E / B.Tech (Any Branch)</option>
                  <option value="BCA / MCA">BCA / MCA / B.Sc IT</option>
                  <option value="B.Sc / M.Sc">B.Sc / M.Sc</option>
                  <option value="Diploma">Diploma (Polytechnic)</option>
                  <option value="B.Com / BBA / Other">B.Com / BBA / Other Graduate</option>
                </select>
              </div>
            </div>

            {/* Passout Year & Current Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Graduation Year
                </label>
                <select
                  value={passoutYear}
                  onChange={(e) => setPassoutYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  disabled={loading || success}
                >
                  <option value="2026">2026 (Final Year)</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="Before 2021">Before 2021 / Gap</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  disabled={loading || success}
                >
                  <option value="Fresher Looking for Job">Fresher Looking for Job</option>
                  <option value="Working in Non-IT, Looking to Switch">
                    Working in Non-IT, Looking to Switch
                  </option>
                  <option value="Career Gap (Returning to Workforce)">
                    Career Gap (Returning to Workforce)
                  </option>
                  <option value="College Student">Final Year Student</option>
                </select>
              </div>
            </div>

            {/* Referral / Partner info */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Referral Partner Code or Friend Name (Optional)
              </label>
              <input
                type="text"
                value={referralName}
                onChange={(e) => setReferralName(e.target.value)}
                placeholder="e.g. TRA-PARTNER-102 or friend's name"
                className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                disabled={loading || success}
              />
            </div>

            {/* Pay After Placement Terms Agreement */}
            <div className="pt-2">
              <label className="flex items-start gap-3 p-4 bg-slate-950/80 border border-slate-800 rounded-2xl cursor-pointer hover:border-emerald-500/40 transition-colors">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 h-4 w-4 shrink-0 bg-slate-900"
                  disabled={loading || success}
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I agree to the <strong>Pay After Placement</strong> terms: I will complete the Software Testing training first, and pay course fees from my salary (3 months salary after getting placed in an IT company).
                </span>
              </label>
            </div>

            {/* Submit CTA */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-extrabold rounded-2xl text-sm transition-all duration-200 shadow-xl shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Submit Application & Start AI Screening
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
