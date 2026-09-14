import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team | Onward Workspaces",
  description: "The people who make up Onward Workspaces.",
};

const team = [
  {
    name: "Rohan Malhotra",
    role: "Founder & CEO",
    bio: "Former co-founder of a proptech startup. Early staff at WeWork India.",
    img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Ananya Kapoor",
    role: "Head of Operations",
    bio: "Led facility operations at Awfis and Smartworks across 8 cities.",
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Kabir Sethi",
    role: "Design Lead",
    bio: "Founding design team at a leading interior studio. Former Zomato.",
    img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Meera Iyer",
    role: "Client Success Manager",
    bio: "Former account lead at Regus, managing 40+ enterprise clients.",
    img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function TeamPage() {
  return (
    <main className="bg-[#faf8f5] min-h-screen py-28 lg:py-36">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#d4622b] tracking-wide">
          We&apos;re hiring!
        </span>

        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] leading-[1.1] tracking-tight">
          We are the people who
          <br />
          make up Onward
        </h1>

        <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Our philosophy is simple; hire great people and give them the
          resources and support to do their best work.
        </p>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left">
          {team.map((person) => (
            <div key={person.name}>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-4 font-bold text-[#1a1a2e]">{person.name}</h3>
              <p className="text-sm font-semibold text-[#d4622b]">
                {person.role}
              </p>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {person.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
