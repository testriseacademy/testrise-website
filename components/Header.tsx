"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Placement", href: "/#placement" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Refer & Earn 🎁", href: "/refer" },
  { label: "Student Login", href: "/lms/login" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-black/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-main flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Test Rise Academy"
            width={48}
            height={48}
            className="h-10 w-auto md:h-12 transition-transform group-hover:scale-105"
          />
          <div className="hidden sm:block">
            <span className="text-brand-navy font-bold text-lg leading-tight block tracking-tight">
              TEST RISE
            </span>
            <span className="text-brand-primary text-[0.65rem] font-medium tracking-[0.2em] uppercase">
              Academy
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-brand-gray-600 hover:text-brand-primary font-medium text-sm transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+919999999999"
            className="flex items-center gap-2 text-brand-gray-600 hover:text-brand-primary text-sm font-medium transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>+91-99999-99999</span>
          </a>
          <a
            href="/#placement"
            className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/25 active:scale-[0.98]"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-xl hover:bg-brand-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-brand-navy" />
          ) : (
            <Menu className="w-6 h-6 text-brand-navy" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-brand-gray-200 mt-2"
          >
            <nav className="container-main py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-brand-navy hover:text-brand-primary font-medium text-base py-3 px-4 rounded-xl hover:bg-brand-primary/5 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-4 pt-4 border-t border-brand-gray-200 flex flex-col gap-3">
                <a
                  href="tel:+919999999999"
                  className="flex items-center gap-2 text-brand-gray-600 text-sm font-medium px-4"
                >
                  <Phone className="w-4 h-4" />
                  +91-99999-99999
                </a>
                <a
                  href="/#placement"
                  onClick={() => setMobileOpen(false)}
                  className="bg-brand-primary text-white font-semibold text-center py-3 rounded-xl hover:bg-brand-primary-dark transition-colors"
                >
                  Apply Now
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
