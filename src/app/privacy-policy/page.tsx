import type { Metadata } from "next";
import { SITE_EMAIL, mailComposeUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the simple privacy policy of Tribal 3, a software house in Karachi. Learn what information Tribal 3 collects, how it is used and how you can contact us at tribal3tech@gmail.com.",
  keywords: [
    "Tribal 3 privacy policy",
    "tribal3 privacy policy",
    "software house in Karachi privacy policy",
    "Tribal 3",
    "tribal3",
  ],
  alternates: { canonical: "/privacy-policy" },
};

const sections: { title: string; body: string[] }[] = [
  {
    title: "1. Information We Collect",
    body: [
      "When you use the Tribal 3 contact form we collect your name, email address and your message so we can reply to you.",
      "Like most websites we also collect basic, non-personal information such as the pages you visit, the device and browser you use and your approximate location. This helps Tribal 3 understand how the website is used and improve it.",
      "If you apply for a job at Tribal 3, we collect the details you submit, such as your name, contact information and CV.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "Tribal 3 uses your information only to reply to your enquiry, provide the services you ask for, share project updates, improve our website and keep our services safe and reliable.",
      "We do not sell your personal information to anyone. We only share it with trusted service providers that help us run the website and our email, and only as much as they need to do that job.",
    ],
  },
  {
    title: "3. Cookies and Analytics",
    body: [
      "Tribal 3 uses cookies and similar technologies, including Google Analytics, to measure website traffic and understand which pages are useful.",
      "You can block or delete cookies at any time in your browser settings. The website will still work, but some features may behave differently.",
    ],
  },
  {
    title: "4. Data Security",
    body: [
      "We use reasonable technical and organisational measures to protect your information from loss, misuse or unauthorised access. No website can promise perfect security, but we take this seriously.",
    ],
  },
  {
    title: "5. Your Choices",
    body: [
      "You can ask Tribal 3 at any time to see, correct or delete the personal information we hold about you. Just email us and we will help.",
      "If you no longer want to receive updates from Tribal 3, reply to any email and ask to be removed.",
    ],
  },
  {
    title: "6. Children's Privacy",
    body: [
      "Our services are meant for businesses and professionals. Tribal 3 does not knowingly collect personal information from children under 13. If you believe a child has shared information with us, please contact us and we will delete it.",
    ],
  },
  {
    title: "7. Changes to This Policy",
    body: [
      "Tribal 3 may update this privacy policy from time to time. When we do, we will publish the new version on this page with a new effective date.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="min-h-[70vh] bg-dark-900 pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm uppercase tracking-[0.2em] text-cyan-400">
            Legal
          </span>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
            This is the simple privacy policy of Tribal 3, a software house in
            Karachi, Pakistan. It explains what information we collect and how we
            use it, in plain English.
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
            Questions about your privacy?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-400 sm:text-base">
            Contact Tribal 3 and we will be happy to help.
          </p>
          <a
            href={mailComposeUrl("Privacy Policy Question")}
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
