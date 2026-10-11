"use client";

import { motion } from "framer-motion";
import { Video, Play, Clock } from "lucide-react";
import Image from "next/image";

export default function LiveSessionCTA() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-main">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-brand-primary/[0.08] text-brand-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
              <Video className="w-4 h-4" />
              Software Testing Introduction – Free Session
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy tracking-tight">
              Before You Decide,{" "}
              <span className="text-brand-primary">
                Attend Our Free Session
              </span>
            </h2>
            <p className="text-brand-gray-500 text-base mt-3 max-w-xl mx-auto leading-relaxed">
              A detailed session covering everything — what is software testing,
              career opportunities, salary packages, training process, placement
              strategy, complete fees structure with full transparency, and Q&amp;A.
            </p>
          </motion.div>

          {/* Video Card Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="group relative block rounded-2xl overflow-hidden border border-brand-gray-200 shadow-lg hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
          >
            {/* Thumbnail — gradient with logo */}
            <div className="relative aspect-video bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Test Rise Academy — Free Introduction Session"
                width={200}
                height={150}
                className="w-1/3 h-auto object-contain opacity-30"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-brand-navy/10 transition-colors duration-500" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-brand-primary/90 group-hover:bg-brand-primary flex items-center justify-center shadow-2xl shadow-brand-primary/40 transition-all duration-300 group-hover:scale-110">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Bottom Left - Brand */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2.5 bg-black/75 backdrop-blur-md rounded-xl px-3 py-2 border border-white/15 shadow-xl">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white flex items-center justify-center p-0.5 overflow-hidden shrink-0 shadow-sm">
                  <Image
                    src="/logo.png"
                    alt="Test Rise Academy"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-white font-bold text-xs md:text-sm tracking-tight block leading-tight">
                    TEST RISE ACADEMY
                  </span>
                  <span className="text-brand-primary-light text-[9px] md:text-[10px] font-medium tracking-wider uppercase block">
                    Career Roadmap Session
                  </span>
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <Clock className="w-3.5 h-3.5 text-white/80" />
                <span className="text-white/90 text-xs font-medium">
                  Free Session
                </span>
              </div>

              {/* Live Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-red-500/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bottom text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-center text-brand-gray-400 text-sm mt-5"
          >
            ✦ Free session · No signup required · Online
          </motion.p>
        </div>
      </div>
    </section>
  );
}
