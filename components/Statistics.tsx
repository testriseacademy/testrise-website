"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "600+", label: "Students Trained", suffix: "" },
  { value: "95", label: "Placement Rate", suffix: "%" },
  { value: "5+", label: "Course Programs", suffix: "" },
  { value: "50+", label: "Hiring Partners", suffix: "" },
  { value: "100", label: "Online Training", suffix: "%" },
  { value: "4.8", label: "Student Rating", suffix: "★" },
];

export default function Statistics() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-navy" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-brand-primary-light font-semibold text-sm tracking-wider uppercase">
            Our Numbers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 tracking-tight">
            Numbers That Speak
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-white">
                {stat.value}
                <span className="text-brand-primary-light">{stat.suffix}</span>
              </p>
              <p className="text-white/50 text-sm font-medium mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
