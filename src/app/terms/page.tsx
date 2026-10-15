import type { Metadata } from "next";
import { SITE_EMAIL, mailComposeUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the simple terms of service of Tribal 3, a software house in Karachi, Pakistan. Clear rules for using the Tribal 3 website and working with our team.",
  keywords: [
    "Tribal 3 terms of service",
    "tribal3 terms",
    "Tribal 3 terms and conditions",
    "software house in Karachi terms",
    "Tribal 3",
    "tribal3",
  ],
  alternates: { canonical: "/terms" },
};

const sections: { title: string; body: string[] }[] = [
  {
    title: "1. Agreement",
    body: [
      "By using the Tribal 3 website you agree to these terms. If you do not agree, please do not use the website. Tribal 3 is a software house based in Karachi, Pakistan.",
    ],
  },
  {
    title: "2. Our Services",
    body: [
      "The information on this website is for general information about Tribal 3 and the services we offer, such as web development, mobile apps, UI/UX design, e-commerce, SEO and digital marketing.",
      "Every client project is different. Project scope, timeline, price and deliverables are always agreed separately in writing before work begins. A quote is not a binding contract until both sides accept it.",
    ],
  },
  {
    title: "3. Payments",
    body: [
      "Payment terms, milestones and refunds are set out in each project agreement or invoice. Unless agreed otherwise, work starts after the agreed advance payment is received.",
    ],
  },
  {
    title: "4. Intellectual Property",
    body: [
      "All content on this website, including the Tribal 3 name, logo, text, graphics and design, belongs to Tribal 3 and may not be copied or reused without our written permission.",
      "Ownership of the final deliverables of a client project is transferred to the client according to the project agreement, once payments are complete.",
    ],
  },
  {
    title: "5. Job Applications",
    body: [
      "If you apply for a role at Tribal 3, please provide accurate information. Submitting an application does not create an employment contract. We may keep your details to contact you about future opportunities.",
    ],
  },
  {
    title: "6. Third-Party Links",
    body: [
      "This website may link to third-party websites, such as LinkedIn, Instagram, Facebook and TikTok. Tribal 3 is not responsible for the content, policies or practices of those websites.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    body: [
      "The website is provided as is. While we try to keep everything accurate and up to date, Tribal 3 does not guarantee that the website will always be available or error-free, and is not liable for any loss arising from its use.",
    ],
  },
  {
    title: "8. Governing Law",
    body: [
      "These terms are governed by the laws of Pakistan, and any dispute will be handled by the courts of Karachi, Pakistan.",
    ],
  },
  {
    title: "9. Changes to These Terms",
    body: [
      "Tribal 3 may update these terms at any time. The latest version will always be available on this page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <section className="min-h-[70vh] bg-dark-900 pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm uppercase tracking-[0.2em] text-cyan-400">
            Legal
          </span>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
            These are the simple terms for using the Tribal 3 website and working
            with our team, written in plain English.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          {sections.map((section) => (
            <div key={section.title} className="glass-card rounded-2xl p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5 text-center sm:p-6">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Questions about these terms?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-400 sm:text-base">
            Contact Tribal 3 and we will be happy to help.
          </p>
          <a
            href={mailComposeUrl("Terms of Service Question")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/20 px-5 py-3 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/30"
          >
            {SITE_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
