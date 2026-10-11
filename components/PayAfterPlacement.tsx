"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

const points = [
  "Complete your training",
  "Get placed in a company",
  "Start your career",
  "Pay your course fees from your salary — 3 months salary after placement.",
];

const reassurances = [
  "No upfront financial burden",
  "No education loan stress",
  "No pressure on parents after graduation",
];

export default function PayAfterPlacement() {
  return (
    <section
      id="placement"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-brand-navy" />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-primary/[0.06] rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />

      <div className="container-main relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-primary/20 text-brand-primary-light rounded-full px-5 py-2.5 text-sm font-semibold mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Our Biggest USP
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]"
          >
            Study First.
            <br />
            <span className="text-brand-primary-light">
              Pay After Placement.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-white/60 text-lg mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            We believe financial limitations should never stop talented students
            from building successful careers. Pay 3 months salary after you get placed.
          </motion.p>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-10"
          >
            {points.map((point, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 glass-dark rounded-xl px-5 py-3"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-primary-light shrink-0" />
                <span className="text-white/90 text-sm font-medium">
                  {point}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Reassurances */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mt-10"
          >
            {reassurances.map((r) => (
              <span
                key={r}
                className="text-brand-primary-light/80 text-sm font-medium"
              >
                ✦ {r}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-12"
          >
            <a
              href="/apply"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-light text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-brand-primary/30 text-base active:scale-[0.98]"
            >
              Apply Now — Pay After Placement
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
