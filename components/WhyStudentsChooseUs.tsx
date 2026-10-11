"use client";

import { motion } from "framer-motion";
import {
  Bug,
  Settings,
  Server,
  TestTube,
  Code2,
  Database,
  FileSearch,
  RefreshCw,
} from "lucide-react";

const expertise = [
  { icon: Bug, label: "Manual Testing" },
  { icon: Server, label: "Backend Testing" },
  { icon: Settings, label: "API Testing" },
  { icon: Database, label: "ETL Testing" },
  { icon: Code2, label: "Automation Testing" },
  { icon: TestTube, label: "Performance Testing" },
  { icon: FileSearch, label: "Real Industry Projects" },
  { icon: RefreshCw, label: "Agile & DevOps" },
];

export default function WhyStudentsChooseUs() {
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
              Real Industry Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3 tracking-tight leading-tight">
              Why Students{" "}
              <span className="text-brand-primary">Choose Us</span>
            </h2>
            <p className="text-brand-gray-500 text-lg mt-5 leading-relaxed">
              Instead of learning from trainers who only teach theory, learn from
              professionals actively working on real testing projects in the
              industry.
            </p>
            <p className="text-brand-gray-500 text-base mt-4 leading-relaxed">
              Our instructors bring years of hands-on experience from top
              product companies and service firms, ensuring you learn what
              actually matters in the workplace.
            </p>
          </motion.div>

          {/* Right - Expertise Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {expertise.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-brand-gray-100 hover:border-brand-primary/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-primary/[0.08] flex items-center justify-center shrink-0 group-hover:bg-brand-primary/[0.12] transition-colors">
                  <item.icon className="w-5 h-5 text-brand-primary" />
                </div>
                <span className="text-sm font-semibold text-brand-navy">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
