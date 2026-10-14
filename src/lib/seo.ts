export const SITE_NAME = "Tribal 3";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tribal3.bond"
).replace(/\/+$/, "");

export const SITE_EMAIL = "tribal3tech@gmail.com";
export const SITE_PHONE = "+92 312 2767819";

export function mailComposeUrl(subject = "") {
  const base = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE_EMAIL)}`;
  return subject ? `${base}&su=${encodeURIComponent(subject)}` : base;
}

export const SITE_CITY = "Karachi";
export const SITE_COUNTRY = "PK";
export const SITE_TAGLINE = "Best Software House in Karachi";
// hello

export const SOCIAL_LINKS = [
  "https://www.instagram.com/tribal3tech/",
  "https://www.linkedin.com/in/tribal-3-27a299435/",
];

export const TITLE =
  "Tribal 3 | Best Software House in Karachi | Web Development Company";

export const DESCRIPTION =
  "Tribal 3 is the best software house in Karachi offering custom web development, MERN stack apps, Shopify and WordPress e-commerce, mobile app development, UI/UX design, SEO and digital marketing. Hire a top software company and IT company in Karachi, Pakistan for software development, software house services and business websites.";

// Local + commercial + long-tail search phrases this site targets.
// Includes common spelling variants users actually type into Google.
export const KEYWORDS = [
  "software house in Karachi",
  "best software house in Karachi",
  "software house Karachi",
  "top software house in Karachi",
  "software company in Karachi",
  "best software company in Karachi",
  "IT company in Karachi",
  "best IT company in Karachi",
  "software development company in Karachi",
  "software development services Karachi",
  "web development company in Karachi",
  "best web development company in Karachi",
  "web development agency Karachi",
  "website design company in Karachi",
  "website development in Karachi",
  "mobile app development company in Karachi",
  "app developers in Karachi",
  "ecommerce website development Karachi",
  "Shopify expert in Karachi",
  "WordPress developer in Karachi",
  "MERN stack development company Karachi",
  "React developer Karachi",
  "Node.js developer Karachi",
  "Next.js development company",
  "UI UX design agency Karachi",
  "graphic design company in Karachi",
  "logo design Karachi",
  "SEO services in Karachi",
  "best SEO company in Karachi",
  "digital marketing agency in Karachi",
  "social media marketing Karachi",
  "IT services in Karachi",
  "hire developers in Karachi",
  "custom software development Pakistan",
  "software house in Pakistan",
  "best software house in Pakistan",
  "digital agency Karachi",
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
  "frontend development company",
  "backend development services",
  "full stack development company",
  "web application development company",
  "SaaS development company",
  "progressive web app development",
  "website redesign services",
  "responsive web design services",
  "landing page design services",
  "headless CMS development",
  "TypeScript development services",
  "Vue.js development company",
  "Angular development company",
  "Laravel development company",
  "PHP development company",
  "Python development company",
  "Django development services",
  "Express.js development",
  "GraphQL API development",
  "REST API development",
  "microservices development",
  "database design and optimization",
  "MongoDB development services",
  "PostgreSQL development",
  "iOS app development company",
  "Android app development company",
  "React Native development",
  "Flutter app development",
  "cross platform app development",
  "mobile app UI design",
  "app maintenance services",
  "WooCommerce development",
  "Shopify store setup",
  "Shopify Plus development",
  "online store development",
  "payment gateway integration",
  "custom marketplace development",
  "dropshipping website development",
  "mobile app design services",
  "brand identity design",
  "rebranding services",
  "motion graphics design",
  "product design services",
  "wireframing and prototyping",
  "local SEO services",
  "technical SEO audit",
  "on page SEO services",
  "off page SEO services",
  "keyword research services",
  "link building services",
  "content marketing agency",
  "Google Ads management",
  "Facebook Ads management",
  "pay per click management",
  "email marketing services",
  "conversion rate optimization",
  "TikTok marketing agency",
  "Instagram marketing services",
  "AWS development services",
  "serverless development",
  "Docker and Kubernetes services",
  "CI CD pipeline setup",
  "website speed optimization",
  "website security services",
  "domain and hosting services",
  "custom CRM development",
  "ERP software development",
  "billing software development",
  "inventory management software",
  "POS system development",
  "school management system development",
  "booking system development",
  "e-learning platform development",
  "real estate website development",
  "restaurant website development",
  "freelance web developer in Karachi",
  "website maker in Karachi",
  "cheap website design in Karachi",
  "affordable web development Karachi",
  "best website developer in Karachi",
  "software house in Karachi for startups",
  "IT solutions company in Karachi",
  "tech company in Karachi",
  "development agency in Karachi",
  "software house near me",
  "web developer near me",
  "software house in Gulshan Karachi",
  "software house in DHA Karachi",
  "software house in PECHS Karachi",
  "software house in Clifton Karachi",
  "tribal 3",
  "tribal3",
  "tribal 3 space",
  "tribal three",
  "tribel 3",
  "tribal3tech",
  "softwere house in karachi",
  "softwear house in karachi",
  "software house in karatchi",
];

export const SERVICE_AREAS = [
  "Karachi",
  "Pakistan",
  "Dubai",
  "United Arab Emirates",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Saudi Arabia",
  "Qatar",
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

export const FAQS: { question: string; answer: string }[] = [
  {
    question: "Which is the best software house in Karachi?",
    answer:
      "Tribal 3 is a top software house in Karachi providing web development, mobile app development, UI/UX design, SEO, digital marketing and custom software for businesses in Pakistan and worldwide.",
  },
  {
    question: "What services does a software house in Karachi offer?",
    answer:
      "A software house in Karachi like Tribal 3 offers custom web development, MERN stack apps, Shopify and WordPress e-commerce stores, mobile apps, UI/UX design, SEO, digital marketing, cloud and DevOps, and software maintenance.",
  },
  {
    question: "How much does website development in Karachi cost?",
    answer:
      "Website development cost in Karachi depends on scope. Tribal 3 offers affordable, transparent packages for business websites, e-commerce stores and custom web applications. Contact us for a free quote.",
  },
  {
    question: "Do you work with clients outside Karachi and Pakistan?",
    answer:
      "Yes. Tribal 3 is a Karachi based software house serving clients across Pakistan, Dubai, the USA, the UK, Canada, Australia and worldwide.",
  },
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ["Tribal 3", "Tribal3", "Tribal Three", "Tribal 3 Software House"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/icon`,
      email: SITE_EMAIL,
      telephone: SITE_PHONE,
      description: DESCRIPTION,
      slogan: "Best Software House in Karachi",
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE_CITY,
        addressRegion: "Sindh",
        addressCountry: SITE_COUNTRY,
      },
      areaServed: SERVICE_AREAS.map((area) => ({
        "@type": "AdministrativeArea",
        name: area,
      })),
      knowsLanguage: ["en", "ur"],
      priceRange: "$$",
      sameAs: SOCIAL_LINKS,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: SITE_EMAIL,
          telephone: SITE_PHONE,
          areaServed: "Worldwide",
          availableLanguage: ["English", "Urdu"],
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software House & Digital Services in Karachi",
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
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};
