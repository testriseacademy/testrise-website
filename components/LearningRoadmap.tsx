"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Bug,
  Code2,
  FolderKanban,
  Users,
  Briefcase,
} from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    step: "01",
    title: "Foundation",
    desc: "Learn SDLC, STLC, testing fundamentals, and software quality concepts.",
  },
  {
    icon: Bug,
    step: "02",
    title: "Manual Testing Mastery",
    desc: "Test case design, defect management, test planning, and execution strategies.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Tools & Automation",
    desc: "Master Selenium, Postman, SQL, Python, and industry-standard testing tools.",
  },
  {
    icon: FolderKanban,
    step: "04",
    title: "Real Projects",
    desc: "Work on live industry projects to build your portfolio and gain confidence.",
  },
  {
    icon: Users,
    step: "05",
    title: "Interview Preparation",
    desc: "Mock interviews, resume building, and complete placement preparation.",
  },
  {
    icon: Briefcase,
    step: "06",
    title: "Placement & Career",
    desc: "Get placed in a top company and begin your software testing career.",
  },
];

export default function LearningRoadmap() {
  return (
    <section className="section-padding bg-brand-gray-50">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
            Your Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3 tracking-tight">
            Learning Roadmap
          </h2>
          <p className="text-brand-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            A structured path from beginner to job-ready software tester.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative bg-white rounded-2xl p-7 border border-brand-gray-100 hover:border-brand-primary/20 hover:shadow-xl transition-all duration-300"
            >
              {/* Step Number */}
              <span className="absolute top-5 right-5 text-4xl font-bold text-brand-primary/[0.07] select-none">
                {item.step}
              </span>
              <div className="w-12 h-12 rounded-xl bg-brand-primary/[0.08] flex items-center justify-center mb-5 group-hover:bg-brand-primary/[0.12] transition-colors">
                <item.icon className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-brand-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
