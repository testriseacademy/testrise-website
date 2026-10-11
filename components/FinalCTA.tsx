"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
              Start Your Journey
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mt-4 tracking-tight leading-tight">
              Ready to Launch Your{" "}
              <span className="text-brand-primary">Testing Career</span>?
            </h2>
            <p className="text-brand-gray-500 text-lg mt-6 leading-relaxed max-w-xl mx-auto">
              Become a Certified Software Testing Professional.
              <br />
              <span className="font-semibold text-brand-navy">
                No Prior Experience Required.
              </span>{" "}
              <span className="font-semibold text-brand-primary">
                Pay After Placement.
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <a
              href="#placement"
              className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-brand-primary/25 text-base active:scale-[0.98]"
            >
              Explore Pay After Placement
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="tel:+919999999999"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-brand-gray-200 hover:border-brand-primary text-brand-navy font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg text-base"
            >
              <Phone className="w-5 h-5" />
              Call: +91-99999-99999
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-brand-gray-400 font-medium"
          >
            <span>✦ No Upfront Fees</span>
            <span>✦ 100% Online</span>
            <span>✦ 95% Placement Rate</span>
            <span>✦ Industry Expert Mentors</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
