"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LogOut, BookOpen, Shield, Menu, X, Sparkles, UserCheck } from "lucide-react";
import { formatRollNumber } from "@/lib/google-sheets";

interface LMSNavbarProps {
  user: {
    fullName: string;
    email: string;
    role: string;
    courseAssigned: string;
    rollNumber?: number;
  };
}

export default function LMSNavbar({ user }: LMSNavbarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/lms/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  const isMentor = user.role === "mentor" || user.role === "admin";

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 font-sans shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href={isMentor ? "/lms/mentor" : "/lms/dashboard"} className="flex items-center gap-3 group">
              <Image
                src="/logo.png"
                alt="Test Rise Academy"
                width={40}
                height={40}
                className="h-9 w-auto object-contain"
              />
              <div>
                <span className="text-white font-bold text-base leading-tight block tracking-tight">
                  TEST RISE
                </span>
                <span className="text-emerald-400 text-[0.6rem] font-medium tracking-wider uppercase">
                  LMS Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/lms/dashboard"
              className="text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              Student Dashboard
            </Link>

            {isMentor && (
              <Link
                href="/lms/mentor"
                className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold transition-colors flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20"
              >
                <Shield className="w-3.5 h-3.5" />
                Mentor Control Panel
              </Link>
            )}

            <Link
              href="/apply/screening"
              className="text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              AI Mock Practice
            </Link>
          </div>

          {/* User Profile & Logout */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-white flex items-center justify-end gap-1.5">
                {user.fullName}
                {user.rollNumber && (
                  <span className="bg-slate-800 text-emerald-400 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700">
                    {formatRollNumber(user.rollNumber)}
                  </span>
                )}
              </p>
              <p className="text-[11px] text-slate-400">{user.email}</p>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 font-semibold px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-3">
          <div className="pb-3 border-b border-slate-800">
            <p className="text-sm font-bold text-white">{user.fullName}</p>
            <p className="text-xs text-slate-400">{user.email}</p>
            {user.rollNumber && (
              <p className="text-xs font-mono text-emerald-400 mt-1">
                Roll No: {formatRollNumber(user.rollNumber)}
              </p>
            )}
          </div>

          <Link
            href="/lms/dashboard"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-300 hover:text-white text-sm font-medium py-1.5"
          >
            Student Dashboard
          </Link>

          {isMentor && (
            <Link
              href="/lms/mentor"
              onClick={() => setMenuOpen(false)}
              className="block text-emerald-400 font-medium text-sm py-1.5"
            >
              Mentor Control Panel
            </Link>
          )}

          <Link
            href="/apply/screening"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-300 hover:text-white text-sm font-medium py-1.5"
          >
            AI Mock Practice
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full text-left text-red-400 font-medium text-sm pt-2 border-t border-slate-800 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {loggingOut ? "Logging out..." : "Sign Out"}
          </button>
        </div>
      )}
    </header>
  );
}
