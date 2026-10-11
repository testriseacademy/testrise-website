"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    qualification: "BE / B.Tech",
    course: "Software Testing Masters (Pay After Placement)",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: dbError } = await supabase.from("leads").insert([
        {
          full_name: form.fullName,
          phone: form.phone,
          email: form.email,
          qualification: form.qualification,
          course_interested: form.course,
          message: form.message || null,
        },
      ]);

      if (dbError) {
        console.error("Supabase lead insert error:", dbError);
      }
      setSubmitted(true);
      setForm({
        fullName: "",
        phone: "",
        email: "",
        qualification: "BE / B.Tech",
        course: "Software Testing Masters (Pay After Placement)",
        message: "",
      });
    } catch (err) {
      console.error("Lead submission error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

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
            Book Free Career Counseling
          </h2>
          <p className="text-brand-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Have questions about Software Testing or Pay After Placement? Connect with our senior industry mentors today.
          </p>
        </motion.div>

        {/* Contact info cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
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

        {/* Lead Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-brand-gray-200 shadow-xl shadow-brand-navy/5"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-brand-navy">
              Request a Free 1-on-1 Counseling Call
            </h3>
            <p className="text-brand-gray-500 text-sm mt-1">
              Fill details below and our counseling mentor will contact you within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-brand-navy">Inquiry Received!</h4>
              <p className="text-brand-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                Thank you for reaching out to Test Rise Academy. Our career counselor will call you shortly to discuss your software testing roadmap and batch timings.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-brand-gray-100 hover:bg-brand-gray-200 text-brand-navy text-sm font-semibold rounded-xl transition-colors"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Patil"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-brand-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 9876543210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-brand-gray-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-brand-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase mb-1.5">
                    Highest Qualification
                  </label>
                  <select
                    value={form.qualification}
                    onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-brand-gray-50/50"
                  >
                    <option value="BE / B.Tech (CS/IT/Mechanical/Civil/ETC)">BE / B.Tech (Any Branch)</option>
                    <option value="BCA / MCA / BSc (IT/CS)">BCA / MCA / BSc (IT/CS)</option>
                    <option value="Diploma in Engineering">Diploma in Engineering</option>
                    <option value="B.Com / BA / B.Sc (Non-Tech)">Non-Tech Graduate</option>
                    <option value="Working Professional (Career Switch)">Working Professional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase mb-1.5">
                  Interested Program
                </label>
                <select
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-brand-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-brand-gray-50/50"
                >
                  <option value="Software Testing Masters (Pay After Placement)">
                    Software Testing Masters (Pay After Placement)
                  </option>
                  <option value="Automation Testing (Selenium + Java + TestNG)">
                    Automation Testing (Selenium + Java + TestNG)
                  </option>
                  <option value="Manual Testing + JIRA + Agile Certification">
                    Manual Testing + JIRA + Agile Certification
                  </option>
                  <option value="API Testing with Postman & REST Assured">
                    API Testing with Postman & REST Assured
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase mb-1.5">
                  Any Questions or Specific Requirements? (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your educational background or any questions regarding placement..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-brand-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-brand-gray-50/50 resize-none"
                />
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl shadow-lg shadow-brand-primary/25 hover:bg-brand-primary-dark transition-all flex items-center justify-center gap-2 group text-base disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting Inquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Submit & Book Free Counseling Call
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
