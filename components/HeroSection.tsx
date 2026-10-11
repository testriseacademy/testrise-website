"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bug, Users, Briefcase, ShieldCheck } from "lucide-react";
import Image from "next/image";

const badges = [
  { icon: Bug, label: "No Prior Testing Experience Needed" },
  { icon: Users, label: "Learn from Industry Experts" },
  { icon: Briefcase, label: "Pay After Placement" },
  { icon: ShieldCheck, label: "100% Job Focused Training" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/[0.04] rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-primary/[0.03] rounded-full blur-3xl -translate-x-1/3 translate-y-1/4" />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#142B45 1px, transparent 1px), linear-gradient(90deg, #142B45 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-main w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-brand-primary/[0.08] text-brand-primary rounded-full px-4 py-2 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
              Any Graduate → Testing Course → IT Career
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-brand-navy leading-[1.1] tracking-tight mb-6"
            >
              Become a Certified{" "}
              <span className="text-brand-primary">Software Testing</span>{" "}
              Professional
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-brand-gray-500 leading-relaxed mb-8 max-w-xl"
            >
              Launch your IT career with India&apos;s most practical Software
              Testing Training. Master Manual, API, ETL &amp; Automation Testing.
            </motion.p>

            {/* Badge Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-3 mb-10"
            >
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-3 bg-brand-gray-50 rounded-xl px-4 py-3 border border-brand-gray-100"
                >
                  <badge.icon className="w-5 h-5 text-brand-primary shrink-0" />
                  <span className="text-sm font-medium text-brand-navy">
                    {badge.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="/lms/login"
                className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-brand-primary/25 active:scale-[0.98] text-base"
              >
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#placement"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-brand-gray-200 hover:border-brand-primary text-brand-navy font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg text-base"
              >
                Pay After Placement
              </a>
            </motion.div>
          </div>

          {/* Right - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative">
              {/* Floating decorative elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-brand-primary/10 rounded-2xl -z-10"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-primary/[0.07] rounded-3xl -z-10"
              />

              {/* Main Image — Hero Illustration */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-navy/10 border border-brand-gray-100 flex items-center justify-center aspect-[4/3]">
                <Image
                  src="/hero-illustration.jpg"
                  alt="Test Rise Academy — Software Testing Training"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 md:-left-10 glass rounded-2xl p-4 shadow-xl shadow-black/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-brand-navy">600+</p>
                    <p className="text-xs text-brand-gray-500 font-medium">
                      Students Placed
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
