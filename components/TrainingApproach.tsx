"use client";

import { motion } from "framer-motion";
import {
  Video,
  FolderKanban,
  ClipboardList,
  Users,
  Target,
  FileText,
  PhoneCall,
  Monitor,
} from "lucide-react";

const methods = [
  { icon: Video, label: "Live Online Classes", desc: "Interactive instructor-led sessions" },
  { icon: FolderKanban, label: "Real Projects", desc: "Industry-grade testing projects" },
  { icon: ClipboardList, label: "Assignments", desc: "Hands-on practice tasks" },
  { icon: Users, label: "Mock Interviews", desc: "Interview simulation rounds" },
  { icon: Target, label: "Placement Prep", desc: "Complete placement training" },
  { icon: FileText, label: "Resume Building", desc: "Professional resume guidance" },
  { icon: PhoneCall, label: "Interview Calls", desc: "HR connections & market openings" },
  { icon: Monitor, label: "Tool Practice", desc: "Hands-on with testing tools" },
];

export default function TrainingApproach() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
            How We Train
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3 tracking-tight">
            Our Training Approach
          </h2>
          <p className="text-brand-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            A comprehensive learning methodology that prepares you for real
            industry challenges and interview success.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {methods.map((method, i) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group text-center bg-brand-gray-50 rounded-2xl p-6 border border-brand-gray-100 hover:border-brand-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-primary/[0.08] flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary/[0.12] transition-colors">
                <method.icon className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-sm font-bold text-brand-navy mb-1">
                {method.label}
              </h3>
              <p className="text-xs text-brand-gray-500">{method.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
