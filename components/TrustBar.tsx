"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, Users, GraduationCap } from "lucide-react";

const stats = [
  { icon: Users, value: "100+", label: "Students Trained" },
  { icon: GraduationCap, value: "95%", label: "Placement Rate" },
  { icon: Award, value: "5+", label: "Course Programs" },
  { icon: CheckCircle2, value: "100%", label: "Online Training" },
];

export default function TrustBar() {
  return (
    <section className="py-8 bg-brand-gray-50 border-y border-brand-gray-100">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <stat.icon className="w-5 h-5 text-brand-primary" />
              <div>
                <span className="text-xl font-bold text-brand-navy">
                  {stat.value}
                </span>
                <span className="text-sm text-brand-gray-500 ml-2 font-medium">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
