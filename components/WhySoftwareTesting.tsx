"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Brain,
  Globe,
  Code2,
  Rocket,
} from "lucide-react";

const reasons = [
  {
    icon: TrendingUp,
    title: "Fastest Growing IT Domain",
    desc: "Software testing and QA is one of the fastest growing domains in the IT industry with huge demand.",
  },
  {
    icon: Brain,
    title: "Easy to Learn",
    desc: "Software testing doesn't require deep coding knowledge. Logical thinking and attention to detail are key.",
  },
  {
    icon: Globe,
    title: "Global Opportunities",
    desc: "Every software company needs testers. QA professionals are in demand worldwide across all industries.",
  },
  {
    icon: Code2,
    title: "Coding is Optional to Start",
    desc: "Start with manual testing without coding. Gradually learn automation as you progress in your career.",
  },
  {
    icon: Rocket,
    title: "High Salary Growth",
    desc: "QA professionals earn competitive salaries with excellent growth potential — from tester to QA lead to QA manager.",
  },
];

export default function WhySoftwareTesting() {
  return (
    <section className="section-padding bg-white">
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
              Why Software Testing?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3 tracking-tight leading-tight">
              Why Software Testing is the{" "}
              <span className="text-brand-primary">
                Best Career Choice
              </span>
            </h2>
            <p className="text-brand-gray-500 text-lg mt-5 leading-relaxed">
              Software testing is the easiest and most practical path to
              enter the IT industry. If you have logical thinking and
              attention to detail, you&apos;re already halfway there.
            </p>

            {/* Path Visualization */}
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <span className="bg-brand-gray-100 text-brand-navy font-semibold text-sm px-5 py-2.5 rounded-full">
                Any Graduation
              </span>
              <span className="text-brand-primary font-bold text-lg">→</span>
              <span className="bg-brand-primary/10 text-brand-primary font-semibold text-sm px-5 py-2.5 rounded-full">
                Testing Training
              </span>
              <span className="text-brand-primary font-bold text-lg">→</span>
              <span className="bg-brand-primary text-white font-semibold text-sm px-5 py-2.5 rounded-full">
                IT Career
              </span>
            </div>
          </motion.div>

          {/* Right - Reasons */}
          <div className="space-y-4">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-start gap-4 bg-brand-gray-50 rounded-xl p-5 border border-brand-gray-100 hover:border-brand-primary/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-primary/[0.08] flex items-center justify-center shrink-0 group-hover:bg-brand-primary/[0.12] transition-colors mt-0.5">
                  <reason.icon className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-navy mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-brand-gray-500 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
