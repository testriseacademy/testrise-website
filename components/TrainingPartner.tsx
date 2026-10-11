"use client";

import { motion } from "framer-motion";
import {
  Bug,
  Settings,
  Database,
  Code2,
  Building2,
} from "lucide-react";

const services = [
  { icon: Bug, label: "Manual Testing" },
  { icon: Settings, label: "API Testing" },
  { icon: Database, label: "ETL Testing" },
  { icon: Code2, label: "Automation Testing" },
  { icon: Building2, label: "Corporate Training" },
];

export default function TrainingPartner() {
  return (
    <section className="section-padding bg-brand-gray-50">
      <div className="container-main">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy tracking-tight leading-tight">
              Training Partner for High-End{" "}
              <span className="text-brand-primary">Software Testing</span>{" "}
              Training
            </h2>
            <p className="text-brand-gray-500 text-lg mt-5 leading-relaxed max-w-2xl mx-auto">
              For Freshers, IT Professionals and Corporate Teams. We ensure
              every student gets industry-ready skills to secure top QA positions.
            </p>
          </motion.div>

          {/* Service Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {services.map((service, i) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                className="flex items-center gap-3 bg-white rounded-xl px-6 py-4 border border-brand-gray-100 shadow-sm hover:shadow-md hover:border-brand-primary/20 transition-all duration-300"
              >
                <service.icon className="w-5 h-5 text-brand-primary" />
                <span className="text-sm font-semibold text-brand-navy">
                  {service.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
