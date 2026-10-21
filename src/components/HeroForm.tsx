"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroForm() {
  const pathname = usePathname();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [heardFrom, setHeardFrom] = useState("");
  const [socialPlatform, setSocialPlatform] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const fd = new FormData(form);

    let heardFromValue = fd.get("heardFrom") as string;
    if (heardFromValue === "Social") {
      heardFromValue = `Social - ${fd.get("socialPlatform") || ""}`;
    } else if (heardFromValue === "Other") {
      heardFromValue = `Other - ${fd.get("heardFromOther") || ""}`;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          teamSize: fd.get("teamSize"),
          heardFrom: heardFromValue,
          requirements: "",
          pathname,
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setHeardFrom("");
        setSocialPlatform("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:border-[#d4622b] focus:bg-white/15 transition-all text-sm";
  const selectClass = (hasValue: boolean) =>
    `w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#d4622b] focus:bg-white/15 transition-all text-sm cursor-pointer ${hasValue ? "text-white" : "text-white/50"}`;

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-[#d4622b]/20 text-[#d4622b] flex items-center justify-center text-2xl font-bold mb-3">
            ✓
          </div>
          <h3 className="text-lg font-bold text-white">Request Received!</h3>
          <p className="text-white/70 text-sm mt-1">
            Our team will contact you shortly.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-3 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#d4622b] text-white hover:bg-[#b8501f] transition-colors"
          >
            Submit Another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 space-y-3"
        >
          <h3 className="text-white font-bold text-base mb-1">Book a Site Visit</h3>

          <input type="text" name="name" required placeholder="Full Name *" className={inputClass} />
          <input type="email" name="email" required placeholder="Work Email *" className={inputClass} />

          <div className="grid grid-cols-2 gap-3">
            <input type="tel" name="phone" required placeholder="Phone *" className={inputClass} />
            <input type="text" name="teamSize" required placeholder="Team Size *" className={inputClass} />
          </div>

          <select
            name="heardFrom"
            required
            value={heardFrom}
            onChange={(e) => setHeardFrom(e.target.value)}
            className={selectClass(!!heardFrom)}
          >
            <option value="" disabled>How did you hear about us? *</option>
            <option value="Google">Google</option>
            <option value="Social">Social</option>
            <option value="Referred by someone">Referred by someone</option>
            <option value="Saw your hoarding or poster">Saw your hoarding or poster</option>
            <option value="Other">Other (please specify)</option>
          </select>

          {heardFrom === "Social" && (
            <select
              name="socialPlatform"
              required
              value={socialPlatform}
              onChange={(e) => setSocialPlatform(e.target.value)}
              className={selectClass(!!socialPlatform)}
            >
              <option value="" disabled>Select a platform</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
          )}

          {heardFrom === "Other" && (
            <input
              type="text"
              name="heardFromOther"
              required
              placeholder="Please specify"
              className={inputClass}
            />
          )}

          {status === "error" && (
            <p className="text-red-300 text-xs text-center">Something went wrong. Please try again.</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-gradient-to-r from-[#d4622b] to-[#ea580c] text-white py-2.5 rounded-lg font-bold text-sm hover:shadow-lg transition-all disabled:opacity-70 cursor-pointer"
          >
            {status === "submitting" ? "Processing..." : "Schedule a Visit →"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
