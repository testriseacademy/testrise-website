"use client";

import { motion } from "framer-motion";
import {
  Bug,
  Server,
  Settings,
  Database,
  Code2,
  Building2,
  ArrowRight,
} from "lucide-react";

const programs = [
  {
    icon: Bug,
    title: "Software Manual Testing & Backend Testing",
    desc: "Complete manual testing training — test case design, defect lifecycle, SDLC, STLC, backend testing with SQL, and industry-standard methodologies.",
    featured: true,
  },
  {
    icon: Settings,
    title: "API Testing",
    desc: "Master REST & SOAP API testing using Postman, REST Assured. Learn request/response validation, authentication testing, and API automation.",
    featured: false,
  },
  {
    icon: Database,
    title: "ETL Testing",
    desc: "Data warehouse testing, ETL validation, data integrity checks, SQL-based data verification, and enterprise data pipeline testing.",
    featured: false,
  },
  {
    icon: Code2,
    title: "Python Automation Testing",
    desc: "Selenium WebDriver with Python, Pytest framework, automation framework design, CI/CD integration, and industry-grade test automation.",
    featured: false,
  },
  {
    icon: Building2,
    title: "Corporate Training",
    desc: "Customized software testing training programs tailored for corporate teams and organizations with specific project needs.",
    featured: false,
  },
];

export default function TrainingPrograms() {
  return (
    <section id="courses" className="section-padding bg-white">
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
            Our Programs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-brand-navy mt-3 tracking-tight">
            Training Programs
          </h2>
          <p className="text-brand-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Comprehensive software testing training programs designed for every
            stage of your career journey.
          </p>
        </motion.div>

        {/* Program Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`group relative rounded-2xl p-7 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                program.featured
                  ? "bg-brand-navy border-brand-navy text-white hover:shadow-brand-navy/20"
                  : "bg-white border-brand-gray-100 hover:border-brand-primary/20 hover:shadow-brand-primary/5"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  program.featured
                    ? "bg-brand-primary"
                    : "bg-brand-primary/[0.08]"
                }`}
              >
                <program.icon
                  className={`w-6 h-6 ${
                    program.featured ? "text-white" : "text-brand-primary"
                  }`}
                />
              </div>
              <h3
                className={`text-lg font-bold mb-2 ${
                  program.featured ? "text-white" : "text-brand-navy"
                }`}
              >
                {program.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  program.featured ? "text-white/70" : "text-brand-gray-500"
                }`}
              >
                {program.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
