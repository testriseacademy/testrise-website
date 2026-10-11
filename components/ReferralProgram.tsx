"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Share2, UserCheck, Wallet, CheckCircle2, ArrowRight } from "lucide-react";

export default function ReferralProgram() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerPhone: "",
    friendName: "",
    friendPhone: "",
    course: "Software Testing Masters",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        referrerName: "",
        referrerPhone: "",
        friendName: "",
        friendPhone: "",
        course: "Software Testing Masters",
      });
    }, 4000);
  };

  const steps = [
    {
      step: "01",
      icon: Share2,
      title: "Share Details",
      desc: "Fill in your details and your friend's contact information in the referral form below.",
    },
    {
      step: "02",
      icon: UserCheck,
      title: "Friend Joins",
      desc: "Our career counselor connects with your friend for free demo session & enrollment.",
    },
    {
      step: "03",
      icon: Wallet,
      title: "Earn Cashback",
      desc: "Receive up to ₹2,000 direct cash reward for every friend who joins Test Rise Academy!",
    },
  ];

  return (
    <section id="referral" className="py-20 md:py-28 relative overflow-hidden bg-brand-navy text-white">
      {/* Background decorations */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/20 border border-brand-primary/30 text-brand-primary-light text-xs font-semibold uppercase tracking-wider mb-4">
            <Gift className="w-4 h-4 text-brand-primary-light" />
            Refer & Earn Rewards
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Help a Friend Build a IT Career & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-light via-cyan-300 to-emerald-400">Earn Rewards</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg">
            Know someone looking to start a career in Software Testing? Refer them to Test Rise Academy and earn up to <span className="text-emerald-400 font-semibold">₹2,000 per enrollment</span> with unlimited earning potential!
          </p>
        </motion.div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-brand-primary/50 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary to-cyan-500 flex items-center justify-center shadow-lg shadow-brand-primary/20 text-white group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-white/20 group-hover:text-brand-primary-light transition-colors">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Referral Form & Benefits Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Benefits info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-gradient-to-br from-brand-navy-light via-brand-navy to-slate-900 rounded-3xl p-8 border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full mb-4">
                Unlimited Referral Earning
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Why Refer Your Friends To Test Rise?
              </h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Pay After Placement (₹0 upfront fee guarantee)",
                  "100% Practical Automation & Manual Testing training",
                  "Direct Referral Cash credited upon batch joining",
                  "No cap on earnings — refer 5 friends, earn ₹10,000+",
                  "Dedicated placement support till student gets hired",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase font-semibold tracking-wider">Reward Rate</p>
                <p className="text-xl font-bold text-white">₹2,000 <span className="text-xs font-normal text-emerald-400">per friend enrollment</span></p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white text-brand-navy rounded-3xl p-8 md:p-10 shadow-2xl relative"
          >
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-brand-navy">Referral Submitted Successfully!</h4>
                <p className="text-brand-gray-600 max-w-md mx-auto text-sm">
                  Thank you! Our career team will get in touch with your friend shortly. Once they enroll, we will credit your reward.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-brand-navy">Submit a Friend's Referral</h3>
                  <p className="text-brand-gray-500 text-sm mt-1">Enter your details and your friend's details below.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.referrerName}
                      onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase mb-1">Your Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9876543210"
                      value={formData.referrerPhone}
                      onChange={(e) => setFormData({ ...formData, referrerPhone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-gray-50/50"
                    />
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase mb-1">Friend's Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amit Patil"
                      value={formData.friendName}
                      onChange={(e) => setFormData({ ...formData, friendName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase mb-1">Friend's Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9123456789"
                      value={formData.friendPhone}
                      onChange={(e) => setFormData({ ...formData, friendPhone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-gray-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase mb-1">Interested Course</label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-gray-50/50"
                  >
                    <option value="Software Testing Masters">Software Testing Masters (Pay After Placement)</option>
                    <option value="Automation Testing (Selenium + Java)">Automation Testing (Selenium + Java)</option>
                    <option value="API & Performance Testing">API & Performance Testing</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl shadow-lg shadow-brand-primary/30 hover:bg-brand-primary-dark transition-all flex items-center justify-center gap-2 group text-base"
                >
                  Submit Referral & Claim Reward
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
