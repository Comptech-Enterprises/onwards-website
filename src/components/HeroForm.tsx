"use client";

import { useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";

function validateFields(fields: { name: string; email: string; phone: string; teamSize: string }) {
  const errs: Record<string, string> = {};
  const { name, email, phone, teamSize } = fields;

  if (!name.trim() || name.trim().length < 2) errs.name = "Enter a valid name";
  else if (/\d/.test(name)) errs.name = "Name should not contain numbers";
  else if (name.trim().length > 100) errs.name = "Name is too long";

  if (!email.trim()) errs.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) errs.email = "Enter a valid email";
  else if (/\.(test|example|invalid)$/i.test(email.trim())) errs.email = "Enter a real email address";

  const digits = phone.replace(/\D/g, "");
  if (!digits) errs.phone = "Phone number is required";
  else if (digits.length < 10 || digits.length > 15) errs.phone = "Enter a valid phone number";

  if (!teamSize.trim()) errs.teamSize = "Team size is required";
  else if (teamSize.trim().length > 50) errs.teamSize = "Invalid team size";

  return errs;
}

export default function HeroForm() {
  const pathname = usePathname();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const loadedAt = useRef(Date.now());

  const renderTurnstile = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      (window as any).turnstile &&
      turnstileRef.current &&
      turnstileRef.current.childElementCount === 0 &&
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    ) {
      (window as any).turnstile.render(turnstileRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        size: "invisible",
        callback: (token: string) => setTurnstileToken(token),
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const fields = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      teamSize: String(fd.get("teamSize") || ""),
    };

    const fieldErrors = validateFields(fields);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          heardFrom: "",
          requirements: "",
          pathname,
          _t: loadedAt.current,
          company_url: fd.get("company_url") || "",
          "cf-turnstile-response": turnstileToken,
        }),
      });

      if (res.ok) {
        router.push("/thank-you");
      } else {
        const data = await res.json().catch(() => null);
        if (data?.errors) {
          setErrors(data.errors);
          setStatus("idle");
        } else {
          setStatus("error");
        }
      }
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full bg-white/10 backdrop-blur-sm border rounded-lg px-3 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:border-[#b44512] focus:bg-white/15 transition-all text-sm";

  const inputClass = (field: string) =>
    `${inputBase} ${errors[field] ? "border-red-400" : "border-white/20"}`;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={renderTurnstile}
      />
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center"
          >
            <div className="w-12 h-12 mx-auto rounded-full bg-[#b44512]/20 text-[#b44512] flex items-center justify-center text-2xl font-bold mb-3">
              ✓
            </div>
            <h2 className="text-lg font-bold text-white">Request Received!</h2>
            <p className="text-white/70 text-sm mt-1">
              Our team will contact you shortly.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-3 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#b44512] text-white hover:bg-[#a84114] transition-colors"
            >
              Submit Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={false}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 space-y-3"
          >
            <h2 className="text-white font-bold text-base mb-1">Book a Site Visit</h2>

            {/* Honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name *"
                aria-label="Full Name"
                className={inputClass("name")}
                onChange={() => errors.name && setErrors((p) => { const { name: _, ...rest } = p; return rest; })}
              />
              {errors.name && <p className="text-red-300 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                required
                placeholder="Work Email *"
                aria-label="Work Email"
                className={inputClass("email")}
                onChange={() => errors.email && setErrors((p) => { const { email: _, ...rest } = p; return rest; })}
              />
              {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone *"
                  aria-label="Phone"
                  inputMode="numeric"
                  className={inputClass("phone")}
                  onKeyDown={(e) => {
                    if (
                      e.key.length === 1 &&
                      !/[\d+\-() ]/.test(e.key) &&
                      !e.ctrlKey && !e.metaKey
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^\d+\-() ]/g, "");
                    if (errors.phone) setErrors((p) => { const { phone: _, ...rest } = p; return rest; });
                  }}
                />
                {errors.phone && <p className="text-red-300 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="teamSize"
                  required
                  placeholder="Team Size *"
                  aria-label="Team Size"
                  className={inputClass("teamSize")}
                  onChange={() => errors.teamSize && setErrors((p) => { const { teamSize: _, ...rest } = p; return rest; })}
                />
                {errors.teamSize && <p className="text-red-300 text-xs mt-1">{errors.teamSize}</p>}
              </div>
            </div>

            <div ref={turnstileRef} />

            {(status === "error" || errors._form) && (
              <p className="text-red-300 text-xs text-center">
                {errors._form || "Something went wrong. Please try again."}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-gradient-to-r from-[#b44512] to-[#d4622b] text-white py-2.5 rounded-lg font-bold text-sm hover:shadow-lg transition-all disabled:opacity-70 cursor-pointer"
            >
              {status === "submitting" ? "Processing..." : "Schedule a Visit →"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );
}
