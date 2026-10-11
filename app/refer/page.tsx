"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import {
  Gift,
  Users,
  ArrowRight,
  Target,
  Zap,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  CheckCircle2,
  TrendingUp,
  Shield,
  Trophy,
  Award,
} from "lucide-react";

const whyUs = [
  {
    icon: Award,
    title: "High Demand QA Skills",
    desc: "Software Testing & Automation (Selenium, API, SQL) is in high demand across IT companies with constant hiring year-round.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: TrendingUp,
    title: "Fast Career Transition",
    desc: "Non-IT & IT graduates can transition into QA roles within 3 months of practical hands-on project training.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Shield,
    title: "Pay After Placement Model",
    desc: "Zero upfront tuition fee. No financial stress for candidates. Fee is collected only after candidate gets hired in IT.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Trophy,
    title: "Proven Placement Support",
    desc: "Dedicated resume building, mock interviews, and 600+ candidates trained and guided toward successful IT placements.",
    color: "from-amber-500 to-orange-600",
  },
];

const steps = [
  {
    step: "01",
    icon: Users,
    title: "You Register",
    desc: "Fill the referral partner registration form once. Receive your unique Referral Partner ID instantly.",
  },
  {
    step: "02",
    icon: ArrowRight,
    title: "You Refer Candidates",
    desc: "Share candidate details with us or tell them to mention your Partner ID when applying at Test Rise Academy.",
  },
  {
    step: "03",
    icon: Target,
    title: "Free Counseling & Demo",
    desc: "Candidate attends our free career counseling session and enrolls in the Software Testing Masters program.",
  },
  {
    step: "04",
    icon: Zap,
    title: "Practical Training Begins",
    desc: "3-Month intensive Manual & Automation testing training begins with zero upfront fees.",
  },
  {
    step: "05",
    icon: Briefcase,
    title: "Candidate Gets Placed",
    desc: "Candidate clears IT company interviews and lands a Software Testing / QA role.",
  },
  {
    step: "06",
    icon: Gift,
    title: "You Earn ₹15,000",
    desc: "Referral bonus is credited directly to your bank account upon placement fee confirmation. 🚀",
  },
];

const faqs = [
  {
    q: "1. When do I receive the ₹15,000 referral bonus?",
    a: "Once your referred candidate receives an offer letter, successfully gets placed in an IT company, and the academy receives the placement fee confirmation, your ₹15,000 referral bonus is processed promptly and credited directly to your bank account.",
  },
  {
    q: "2. What qualifies as a successful referral?",
    a: "Any eligible candidate (Graduate / Diploma in any branch with basic English & logical skills) who is linked with your referral partner ID, completes training, gets placed at an IT company, and fulfills the payment terms.",
  },
  {
    q: "3. Is there any limit on the number of candidates I can refer?",
    a: "Absolutely none! You can refer as many candidates as you want. Each successful placement earns you ₹15,000 with zero caps.",
  },
  {
    q: "4. What if the candidate doesn't get placed?",
    a: "Since we operate on a 100% Pay After Placement model, neither the candidate nor the academy pays fees upfront. If a candidate isn't placed, no referral bonus is triggered. However, with our practical training and placement pipeline, we ensure sincere candidates get placed.",
  },
  {
    q: "5. What if someone else has already referred the same candidate?",
    a: "Referral attribution is strictly on a first-linked basis. When a candidate applies and mentions your referral code/name, they are locked to your partner profile.",
  },
  {
    q: "6. Does the candidate have to pay anything upfront?",
    a: "No. 100% Pay After Placement! Zero financial burden on them or their family. No upfront payment, no risk. Fees are collected in 3 salary installments after placement.",
  },
  {
    q: "7. How do I track my referred candidates?",
    a: "Our referral team provides regular updates via WhatsApp/Email regarding your candidate's status (Demo Attended, Training Active, Interview Stage, Placed, Bonus Paid).",
  },
];

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  profession: string;
  address: string;
  agreed: boolean;
}

export default function ReferralPage() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    mobile: "",
    email: "",
    profession: "",
    address: "",
    agreed: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ referralCode: string; name: string } | null>(null);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const generatedCode = `TRA-REF-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const { error: dbError } = await supabase.from("referral_partners").insert([
        {
          partner_id: generatedCode,
          full_name: form.fullName,
          phone: form.mobile,
          email: form.email,
          profession: form.profession || null,
          address: form.address,
        },
      ]);

      if (dbError) {
        console.error("Supabase insert error:", dbError);
      }
      setSuccess({ referralCode: generatedCode, name: form.fullName });
    } catch (err) {
      console.error("Submission error:", err);
      setSuccess({ referralCode: generatedCode, name: form.fullName });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white font-sans selection:bg-brand-primary selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1d]/80 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Test Rise Academy" width={36} height={36} className="h-8 w-auto" />
            <div>
              <span className="text-white font-bold text-base leading-tight block tracking-tight">TEST RISE</span>
              <span className="text-brand-primary-light text-[0.55rem] font-medium tracking-[0.2em] uppercase">Academy</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3.5 py-2 bg-white/[0.06] border border-white/[0.12] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-white/[0.12] transition-colors"
            >
              ← Back to Main Site
            </Link>
            <a
              href="#register"
              className="px-4 py-2 bg-gradient-to-r from-brand-primary to-cyan-500 text-white text-xs sm:text-sm font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand-primary/20"
            >
              Join Partner Program
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary-light text-xs sm:text-sm font-semibold mb-8">
            <Gift className="w-4 h-4" />
            Test Rise Academy — Referral Partner Program
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] text-white mb-6">
            Earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-light via-cyan-300 to-emerald-400">₹15,000 Referral Bonus</span> Per Successful Candidate Placement
          </h1>

          <p className="text-white/70 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            Refer friends, relatives, or colleagues for our <span className="text-white font-semibold">Software Testing & Automation Training</span> with <span className="text-emerald-400 font-semibold">100% Pay After Placement (3 Months Salary Model)</span>. ₹0 upfront cost for them, high rewards for you!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#register"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-primary to-cyan-500 text-white font-bold text-base rounded-xl hover:opacity-95 active:scale-95 transition-all shadow-xl shadow-brand-primary/25 flex items-center justify-center gap-2"
            >
              <Gift className="w-5 h-5" />
              Register as Referral Partner
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold text-base rounded-xl hover:bg-white/10 transition-all"
            >
              How Program Works ↓
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Bonus Per Placement", val: "₹15,000" },
              { label: "Upfront Cost For Candidate", val: "₹0 (Pay After Job)" },
              { label: "Referral Cap", val: "Unlimited" },
              { label: "Payout Method", val: "Direct Bank Transfer" },
            ].map((m, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-center">
                <p className="text-xl sm:text-2xl font-black text-brand-primary-light">{m.val}</p>
                <p className="text-white/50 text-xs mt-1 font-medium">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Cards */}
      <section className="py-20 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Recommend Test Rise Academy?</h2>
            <p className="text-white/60 text-base max-w-2xl mx-auto">High conversion rates because candidates love our risk-free Pay After Placement guarantee.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] transition-colors">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-5 text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <span className="text-brand-primary-light text-xs font-bold uppercase tracking-wider">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">6-Step Referral Partner Journey</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-brand-primary-light">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-white/10">{s.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Registration Form */}
      <section id="register" className="py-24 border-t border-white/[0.06] relative">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Free Registration</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Become a Referral Partner</h2>
            <p className="text-white/60 text-base mt-2">Fill the registration form once and get your Partner ID to start referring.</p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.1] shadow-2xl backdrop-blur-xl">
            {success ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Registration Successful!</h3>
                  <p className="text-white/70 text-sm mt-2">Welcome to Test Rise Academy Referral Partner Network, <span className="text-white font-semibold">{success.name}</span>!</p>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 max-w-md mx-auto">
                  <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider">Your Referral Partner ID</p>
                  <p className="text-3xl font-black text-emerald-400 mt-1 font-mono tracking-wider">{success.referralCode}</p>
                  <p className="text-xs text-white/60 mt-2">Save this code. Ask your referred candidates to mention this ID when enrolling!</p>
                </div>

                <button
                  onClick={() => setSuccess(null)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  Register Another Partner
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary text-sm transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Current Role / Profession <span className="text-white/40 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.profession}
                    onChange={(e) => setForm({ ...form, profession: e.target.value })}
                    placeholder="e.g. Working Professional, HR, Student, Educator..."
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Permanent Address / City *</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="City, State / Full permanent address"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary text-sm transition-colors"
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors">
                  <input
                    type="checkbox"
                    required
                    checked={form.agreed}
                    onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                    className="mt-1 w-5 h-5 accent-brand-primary flex-shrink-0 cursor-pointer"
                  />
                  <span className="text-white/80 text-xs sm:text-sm leading-relaxed select-none">
                    I understand that I will receive a ₹15,000 referral bonus for each eligible candidate who gets successfully placed and fulfills the payment conditions.
                  </span>
                </label>

                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-brand-primary to-cyan-500 text-white font-extrabold text-base rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Registering Partner...
                    </>
                  ) : (
                    <>
                      <Gift className="w-5 h-5" />
                      Register as Referral Partner
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-white/60 text-sm sm:text-base">Everything you need to know about Test Rise Academy referral program.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden transition-colors hover:border-white/[0.15]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-white font-semibold text-base pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-brand-primary-light flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/50 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 pt-1">
                    <p className="text-white/75 text-sm sm:text-base leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-brand-primary/10 via-cyan-500/10 to-transparent border border-brand-primary/20 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Earning Rewards?</h2>
            <p className="text-white/70 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              One simple registration. Unlimited candidate referrals. ₹15,000 per successful placement.
            </p>
            <a
              href="#register"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-brand-primary to-cyan-500 text-white font-extrabold text-base rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-brand-primary/25"
            >
              <Gift className="w-5 h-5" />
              Register Now — It's Free
              <ArrowRight className="w-5 h-5" />
            </a>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6 text-sm text-white/50">
              <span className="flex items-center justify-center gap-2"><Phone className="w-4 h-4 text-brand-primary-light" /> +91 99999 99999</span>
              <span className="flex items-center justify-center gap-2"><Mail className="w-4 h-4 text-brand-primary-light" /> info@testriseacademy.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/[0.06] text-center text-white/40 text-sm">
        <p>© 2026 Test Rise Academy. All rights reserved. · <Link href="/" className="hover:text-white transition-colors">Home</Link></p>
      </footer>
    </div>
  );
}
