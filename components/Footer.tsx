"use client";

import Image from "next/image";
import { Share2, Globe, Video, MessageSquare } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "All Courses", href: "/courses" },
  { label: "Software Testing Course", href: "/courses/software-testing" },
  { label: "Java Selenium Course", href: "/courses/java-selenium" },
  { label: "Teamcenter PLM Course", href: "/courses/teamcenter-plm" },
  { label: "ETL Testing Course", href: "/courses/etl-testing" },
  { label: "API Testing Course", href: "/courses/api-testing" },
  { label: "Python Automation", href: "/courses/python-automation" },
  { label: "Pay After Placement", href: "/#placement" },
  { label: "FAQ", href: "/#faq" },
  { label: "Referral Program 🎁", href: "/refer" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

const socials = [
  { icon: Share2, href: "#", label: "LinkedIn" },
  { icon: Globe, href: "#", label: "Website" },
  { icon: MessageSquare, href: "#", label: "WhatsApp" },
  { icon: Video, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy pt-16 pb-8">
      <div className="container-main">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.png"
                alt="Test Rise Academy"
                width={44}
                height={44}
                className="h-10 w-auto"
              />
              <div>
                <span className="text-white font-bold text-lg leading-tight block tracking-tight">
                  TEST RISE
                </span>
                <span className="text-brand-primary-light text-[0.6rem] font-medium tracking-[0.2em] uppercase">
                  Academy
                </span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              Pune&apos;s leading Software Testing &amp; Siemens Teamcenter PLM Training Academy. Helping
              graduates &amp; professionals transition into high-paying QA, ETL &amp; PLM careers with
              hands-on training and Pay After Placement.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-brand-primary/20 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4 text-white/60 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h4 className="text-white font-semibold text-sm mb-3 tracking-wide">
                Campus &amp; Office
              </h4>
              <p className="text-white/80 text-sm font-medium leading-relaxed">
                Office No. A-614, 6th Floor,<br />
                Supreme Headquarters, Baner,<br />
                Pune, Maharashtra - 411045
              </p>
              <p className="text-white/50 text-sm mt-3">
                <a
                  href="tel:+919561643054"
                  className="hover:text-white transition-colors"
                >
                  +91 95616 43054
                </a>
              </p>
              <p className="text-white/50 text-sm mt-1">
                info@testriseacademy.com
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © 2026 Test Rise Academy. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Online Training · Learn from Anywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
