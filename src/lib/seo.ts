export const SITE_NAME = "Tribal 3";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tribal3.bond"
).replace(/\/+$/, "");

export const SITE_EMAIL = "tribal3tech@gmail.com";
export const SITE_CITY = "Karachi";
export const SITE_COUNTRY = "PK";

export const SOCIAL_LINKS = [
  "https://www.instagram.com/tribal3tech/",
  "https://www.linkedin.com/in/tribal-3-27a299435/",
];

export const TITLE =
  "Tribal 3 | Web Development, E-Commerce & Digital Marketing Agency";

export const DESCRIPTION =
  "Tribal 3 is a Karachi based digital agency delivering custom web development, MERN stack apps, Shopify and WordPress e-commerce, UI/UX design, SEO and digital marketing for businesses worldwide.";

export const KEYWORDS = [
  "digital agency Karachi",
  "web development company",
  "web development agency Pakistan",
  "custom web development",
  "MERN stack development",
  "React developer",
  "Node.js developer",
  "Next.js development",
  "e-commerce website development",
  "Shopify development",
  "WordPress development",
  "mobile app development",
  "UI UX design agency",
  "graphic design and branding",
  "SEO services",
  "digital marketing agency",
  "social media management",
  "API development and integration",
  "cloud and DevOps services",
  "CRM ERP development",
  "workflow automation",
  "cybersecurity and data protection",
  "website maintenance and support",
  "AI integration",
  "quality assurance and testing",
  "business website Pakistan",
  "hire web developers",
];

export interface SeoService {
  name: string;
  description: string;
}

export const SERVICES: SeoService[] = [
  {
    name: "Custom Web Development",
    description:
      "Bespoke, hand-coded websites and web applications built for speed, scalability and search visibility.",
  },
  {
    name: "UI/UX Design & Wireframing",
    description:
      "User research, wireframes and pixel-perfect interface design that turns visitors into customers.",
  },
  {
    name: "Mobile App Development",
    description:
      "Cross-platform Android and iOS apps with smooth performance, secure APIs and offline support.",
  },
  {
    name: "E-Commerce Solutions",
    description:
      "Conversion focused online stores on Shopify, WooCommerce and custom stacks, with payments, inventory and shipping.",
  },
  {
    name: "Search Engine Optimization (SEO)",
    description:
      "Technical SEO, on-page optimisation, keyword research, content strategy and link building to win organic traffic.",
  },
  {
    name: "Digital Marketing & Social Media Management",
    description:
      "Paid campaigns, social media and content marketing that turn attention into measurable pipeline.",
  },
  {
    name: "Cloud & DevOps Services",
    description:
      "Managed hosting, CI/CD pipelines, monitoring and zero-downtime deployments on AWS, Vercel and containers.",
  },
  {
    name: "Quality Assurance (QA) & Testing",
    description:
      "Manual and automated testing, performance audits and regression checks for bug-free releases.",
  },
  {
    name: "Enterprise Software & CRM/ERP Development",
    description:
      "Custom business software, dashboards and CRM/ERP systems that automate real workflows.",
  },
  {
    name: "API Development & Integration",
    description:
      "REST and GraphQL APIs plus third-party integrations that connect your tools, payments and data.",
  },
  {
    name: "Workflow Automation",
    description:
      "Automate repetitive tasks, approvals and data sync so your team focuses on growth.",
  },
  {
    name: "Graphic Design & Branding",
    description:
      "Logos, brand identity and marketing collateral built to make your business unforgettable.",
  },
  {
    name: "Maintenance & Support Services",
    description:
      "Ongoing updates, backups, security patches and performance monitoring long after launch.",
  },
  {
    name: "Cybersecurity & Data Protection",
    description:
      "Security audits, hardening and best-practice data protection so your customers' data stays safe.",
  },
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon`,
        width: 512,
        height: 512,
      },
      email: SITE_EMAIL,
      description: DESCRIPTION,
      slogan: "Premium Digital Experiences",
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE_CITY,
        addressCountry: SITE_COUNTRY,
      },
      areaServed: "Worldwide",
      knowsLanguage: ["en", "ur"],
      sameAs: SOCIAL_LINKS,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: SITE_EMAIL,
          areaServed: "Worldwide",
          availableLanguage: ["English", "Urdu"],
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};