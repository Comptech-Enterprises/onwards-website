import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    title: "Solutions",
    links: [
      { label: "Managed Office", href: "/solutions/managed-office" },
      { label: "Private Suites", href: "/solutions/private-suites" },
      { label: "Virtual Office", href: "/solutions/virtual-office" },
      { label: "On-Demand", href: "/solutions/on-demand" },
      { label: "Custom Built", href: "/solutions/custom-built" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Delhi", href: "/locations/delhi" },
      { label: "Noida", href: "/locations/noida" },
      { label: "Gurgaon", href: "/locations/gurgaon" },
      { label: "All Locations", href: "/locations" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "#" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#faf8f5] text-gray-500 pt-16 pb-10 border-t border-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-14 items-start">
          {/* Logo + Bio */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center mb-5 group">
              <Image
                src="/onward-logo.webp"
                alt="Onward Workspaces"
                width={160}
                height={36}
                className="h-8 sm:h-9 w-auto object-contain group-hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 max-w-sm">
              Premium coworking spaces built around your brand, ambition, and people across Delhi NCR.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 text-xs text-gray-500">
              <div>
                <span className="font-semibold text-[#1a1a2e] block">Direct Phone:</span>
                <a href="tel:9910668152" className="hover:text-[#d4622b] transition-colors">+91 9910668152</a>
              </div>
              <div>
                <span className="font-semibold text-[#1a1a2e] block">Email:</span>
                <a href="mailto:info@onwardworkspaces.com" className="hover:text-[#d4622b] transition-colors">info@onwardworkspaces.com</a>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[#1a1a2e] font-semibold text-xs mb-5 uppercase tracking-widest">
                  {col.title}
                </h4>
                <ul className="space-y-3 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="relative inline-block text-[#1a1a2e] hover:text-[#d4622b] transition-colors py-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#d4622b] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Onward Workspaces. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <a
                key={l}
                href="#"
                className="relative inline-block text-[#1a1a2e] hover:text-[#d4622b] transition-colors py-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#d4622b] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
