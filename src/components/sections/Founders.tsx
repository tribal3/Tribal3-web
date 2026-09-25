"use client";

import { motion } from "framer-motion";

const founders = [
  {
    name: "Muhammad Ayan",
    roles: ["Software Engineer", "Operations Manager", "Hiring Lead"],
    bio: "Ayan designs clean and simple interfaces that are easy to use. He also looks after hiring at Tribal 3, making sure only the right people join our team.",
  },
  {
    name: "Muhammad Faizan",
    roles: ["Software Engineer", "Strategic Planner", "Marketing Manager"],
    bio: "Faizan helps startups plan their next move and manage their growth. He also leads our marketing efforts so the right people hear about Tribal 3.",
  },
  {
    name: "Meelad Raza",
    roles: ["Senior Software Engineer", "Development Lead"],
    bio: "Meelad heads the development side of Tribal 3. He turns ideas into reliable products and makes sure every project is built strong, tested, and shipped on time.",
  },
];

export default function Founders() {
  return (
    <section id="founders" className="relative bg-dark-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center sm:mb-14"
        >
          <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase">Our Founders</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            The People <span className="text-gradient">Behind Tribal 3</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
            A small, focused team of engineers and strategists building 360&deg; digital solutions for businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="glass-card flex min-w-0 flex-col items-center rounded-2xl p-5 text-center sm:p-7"
            >
              <h3 className="text-sm font-semibold px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300">
                {f.name}
              </h3>

              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {f.roles.map((r) => (
                  <span
                    key={r}
                    className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300"
                  >
                    {r}
                  </span>
                ))}
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mt-5">{f.bio}</p>

              <a
                href="#contact"
                className="inline-block mt-6 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors"
              >
                Get in touch &rarr;
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}