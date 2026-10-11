"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  BookOpen,
  Users,
  Briefcase,
  TrendingUp,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Industry-Ready Curriculum",
    desc: "Our curriculum is designed by industry experts who work on real testing projects every day.",
  },
  {
    icon: Target,
    title: "Placement Focused Training",
    desc: "Every module, assignment, and project is designed keeping your placement interview in mind.",
  },
  {
    icon: BookOpen,
    title: "Hands-On Practice",
    desc: "Practice on real-world applications, not just theory. Work on live projects during training.",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    desc: "Learn from testers with 8+ years of experience in top product and service companies.",
  },
  {
    icon: Briefcase,
    title: "Pay After Placement",
    desc: "No financial burden. Complete your training first, pay only after getting placed.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth Support",
    desc: "We don't just place you — we support your career growth with ongoing mentorship.",
  },
];

export default function WhyTestRise() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-main">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
            Why Test Rise Academy
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-brand-navy mt-3 tracking-tight">
            Why Choose <span className="text-brand-primary">Test Rise</span>?
          </h2>
          <p className="text-brand-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            We don&apos;t just teach testing — we build testing professionals
            who are ready to excel in the industry from day one.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative rounded-2xl p-7 border border-brand-gray-100 bg-white hover:border-brand-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-primary/[0.08] flex items-center justify-center mb-5 group-hover:bg-brand-primary/[0.12] transition-colors">
                <reason.icon className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-brand-gray-500 leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
