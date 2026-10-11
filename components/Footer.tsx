"use client";

import Image from "next/image";
import { Share2, Globe, Video, MessageSquare } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "Pay After Placement", href: "/#placement" },
  { label: "About Us", href: "/#about" },
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
              India&apos;s practical Software Testing Training Academy. Helping
              aspiring testers transition into high-paying QA careers with
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
                Contact
              </h4>
              <p className="text-white/50 text-sm">+91-99999-99999</p>
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
