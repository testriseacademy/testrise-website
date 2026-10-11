"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Laptop,
  Users,
  ArrowRightLeft,
  Briefcase,
  UserCheck,
  BookOpen,
  Globe,
} from "lucide-react";

const profiles = [
  { icon: GraduationCap, label: "BE/BTech/BSc Graduates" },
  { icon: Laptop, label: "IT Freshers" },
  { icon: Users, label: "Career Gap Candidates" },
  { icon: ArrowRightLeft, label: "Domain Switchers to IT" },
  { icon: Briefcase, label: "Non-IT Professionals" },
  { icon: UserCheck, label: "Manual Testers Upgrading Skills" },
  { icon: BookOpen, label: "Any Graduate with Good Communication" },
  { icon: Globe, label: "Anyone Wanting to Enter IT" },
];

export default function WhoCanJoin() {
  return (
    <section className="section-padding bg-brand-gray-50">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
              Who Can Join
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3 tracking-tight leading-tight">
              This Program is{" "}
              <span className="text-brand-primary">For You</span> If...
            </h2>
            <p className="text-brand-gray-500 text-lg mt-5 leading-relaxed">
              Our software testing training is designed for anyone who wants to
              build a successful career in IT — regardless of your background.
            </p>
            <p className="text-brand-gray-500 text-base mt-4 leading-relaxed">
              Whether you&apos;re a fresher, experienced professional looking to
              switch, or someone returning after a career gap — software testing
              is your gateway to the IT industry.
            </p>
          </motion.div>

          {/* Right - Profile Grid */}
          <div className="grid grid-cols-2 gap-4">
            {profiles.map((profile, i) => (
              <motion.div
                key={profile.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-brand-gray-100 hover:border-brand-primary/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-primary/[0.08] flex items-center justify-center shrink-0 group-hover:bg-brand-primary/[0.12] transition-colors">
                  <profile.icon className="w-5 h-5 text-brand-primary" />
                </div>
                <span className="text-sm font-semibold text-brand-navy">
                  {profile.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
