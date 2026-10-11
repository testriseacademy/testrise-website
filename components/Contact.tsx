"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91-99999-99999"],
    href: "tel:+919999999999",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@testriseacademy.com"],
    href: "mailto:info@testriseacademy.com",
  },
  {
    icon: MapPin,
    title: "Location",
    lines: ["Online Training", "Learn from Anywhere"],
    href: null,
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Monday – Saturday", "10 AM – 7 PM"],
    href: null,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-brand-gray-50">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3 tracking-tight">
            Contact Us
          </h2>
          <p className="text-brand-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Have questions? We&apos;re here to help you start your software
            testing career journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {info.href ? (
                <a
                  href={info.href}
                  className="block bg-white rounded-2xl p-7 border border-brand-gray-100 hover:border-brand-primary/20 hover:shadow-lg transition-all duration-300 text-center group h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-brand-primary/[0.08] flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-primary/[0.12] transition-colors">
                    <info.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mb-2">
                    {info.title}
                  </h3>
                  {info.lines.map((line) => (
                    <p
                      key={line}
                      className="text-sm text-brand-gray-500 leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </a>
              ) : (
                <div className="bg-white rounded-2xl p-7 border border-brand-gray-100 hover:border-brand-primary/20 hover:shadow-lg transition-all duration-300 text-center group h-full">
                  <div className="w-14 h-14 rounded-xl bg-brand-primary/[0.08] flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-primary/[0.12] transition-colors">
                    <info.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mb-2">
                    {info.title}
                  </h3>
                  {info.lines.map((line) => (
                    <p
                      key={line}
                      className="text-sm text-brand-gray-500 leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
