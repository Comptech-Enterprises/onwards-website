"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";

function AnimatedLogoMark() {
  return (
    <div className="relative mx-auto w-20 h-20">
      <svg
        width={80}
        height={80}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="teamLogoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="50%" stopColor="#d4622b" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        {/* Thread — draws the corner arm like a stitched line */}
        <motion.path
          d="M 22 26 H 62 C 75.25 26 86 36.75 86 50 V 82"
          stroke="url(#teamLogoGrad)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
        {/* Core node — settles once the thread completes */}
        <motion.circle
          cx="36"
          cy="64"
          r="14"
          fill="url(#teamLogoGrad)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "backOut", delay: 1.2 }}
          className="origin-[36px_64px]"
        />
      </svg>
    </div>
  );
}

const team = [
  {
    name: "Rohan Malhotra",
    role: "Founder & CEO",
    bio: "Former co-founder of a proptech startup. Early staff at WeWork India.",
  },
  {
    name: "Ananya Kapoor",
    role: "Head of Operations",
    bio: "Led facility operations at Awfis and Smartworks across 8 cities.",
  },
  {
    name: "Kabir Sethi",
    role: "Design Lead",
    bio: "Founding design team at a leading interior studio. Former Zomato.",
  },
  {
    name: "Meera Iyer",
    role: "Client Success Manager",
    bio: "Former account lead at Regus, managing 40+ enterprise clients.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export default function TeamPageClient() {
  return (
    <>
      <Header alwaysSolid />
      <main className="bg-[#faf8f5] min-h-screen py-28 lg:py-36">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedLogoMark />

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] leading-[1.1] tracking-tight"
          >
            We are the people who
            <br />
            make up Onward
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed"
          >
            Our philosophy is simple; hire great people and give them the
            resources and support to do their best work.
          </motion.p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left">
            {team.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="aspect-[4/3] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-[#1a1a2e] border border-gray-200 flex items-center justify-center relative group">
                  <span className="absolute inset-0 bg-gradient-to-br from-[#d4622b]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="text-3xl sm:text-5xl font-bold text-white/90 tracking-tight">
                    {initials(person.name)}
                  </span>
                </div>
                <h3 className="mt-4 font-bold text-[#1a1a2e]">{person.name}</h3>
                <p className="text-sm font-semibold text-[#d4622b]">
                  {person.role}
                </p>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {person.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
