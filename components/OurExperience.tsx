"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, Target, Handshake } from "lucide-react";

const highlights = [
  {
    icon: BookOpen,
    title: "Practical Learning",
    desc: "Hands-on training with real testing tools and environments",
  },
  {
    icon: Target,
    title: "Industry Projects",
    desc: "Work on actual enterprise testing scenarios",
  },
  {
    icon: Handshake,
    title: "Interview Preparation",
    desc: "Comprehensive mock interviews & resume building",
  },
  {
    icon: Award,
    title: "Placement Support",
    desc: "Dedicated assistance until you land your job",
  },
];

export default function OurExperience() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
              Our Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3 tracking-tight leading-tight">
              Your Trusted{" "}
              <span className="text-brand-primary">Software Testing</span>{" "}
              Training Partner
            </h2>
            <p className="text-brand-gray-500 text-lg mt-5 leading-relaxed">
              Test Rise Academy is dedicated to helping aspiring testers
              successfully transition into high-paying QA and testing careers
              in the IT industry.
            </p>
            <p className="text-brand-gray-500 text-base mt-4 leading-relaxed">
              We focus on practical learning, real-world testing implementation,
              interview preparation and placement support — instead of only
              theoretical training.
            </p>
          </motion.div>

          {/* Right - Highlights Grid */}
          <div className="grid grid-cols-2 gap-5">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-brand-gray-50 rounded-2xl p-6 border border-brand-gray-100 hover:border-brand-primary/20 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-primary/[0.08] flex items-center justify-center mb-4 group-hover:bg-brand-primary/[0.12] transition-colors">
                  <item.icon className="w-5 h-5 text-brand-primary" />
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
