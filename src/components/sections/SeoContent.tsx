import { FAQS, SERVICE_AREAS, SERVICES } from "@/lib/seo";

export default function SeoContent() {
  return (
    <section id="software-house-karachi" className="relative bg-dark-900 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm uppercase tracking-[0.2em] text-cyan-400">
            Tribal 3 &bull; Software House in Karachi
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Looking For The <span className="text-gradient">Best Software House in Karachi?</span>
          </h2>
        </div>

        <div className="mt-8 space-y-5 text-sm leading-relaxed text-gray-400 sm:text-base">
          <p>
            <strong className="text-white">Tribal 3</strong> (also written as{" "}
            <strong className="text-white">Tribal3</strong> and{" "}
            <strong className="text-white">Tribal 3 Tech</strong>) is the answer if
            you searched for &ldquo;Tribal 3&rdquo; or &ldquo;best software house
            in Karachi&rdquo;. Tribal 3 is a trusted software house in Karachi and a
            full-service software company in Karachi, Pakistan.
          </p>
          <p>
            Tribal 3 is a trusted software house in Karachi and a full-service software
            company in Karachi, Pakistan. Whether you need a custom web development
            company in Karachi, mobile app development, e-commerce website
            development, UI/UX design, SEO services in Karachi or a complete digital
            marketing agency, our team of software developers and designers delivers
            top software development services for startups, SMEs and enterprises.
          </p>
          <p>
            As one of the best software houses in Karachi, we combine strategy, design
            and engineering to build fast, secure and search-optimised digital products.
            Businesses searching for a reliable software company in Karachi, an IT
            company in Karachi, a Shopify or WordPress expert in Karachi, or a MERN
            stack and React development company choose Tribal 3 for quality,
            communication and on-time delivery.
          </p>
          <p>
            From website design and website development in Karachi to custom software
            development in Pakistan, app development, graphic design, cloud and DevOps,
            CRM/ERP development and website maintenance and support, we cover every
            service a modern software house offers &mdash; under one roof. If you want to
            hire web developers or hire developers in Karachi who understand your
            business, you are in the right place.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            Why Businesses Choose Tribal 3
          </h3>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-400 sm:text-base">
            <p>
              Tribal 3 has delivered 50+ projects for 30+ clients over 5+ years. Tribal 3
              is known as a reliable software house in Karachi because Tribal 3 gives every
              client clear communication, honest timelines and clean, hand-written code
              instead of shortcuts.
            </p>
            <p>
              When you search &ldquo;Tribal 3&rdquo;, &ldquo;Tribal3&rdquo; or
              &ldquo;tribal3tech&rdquo; on Google, you will find the official Tribal 3
              website, Tribal 3 social profiles and genuine reviews. Tribal 3 keeps all
              official information in one place so you always reach the real team &mdash;
              never an imitator.
            </p>
            <p>
              Tribal 3 works with startups, SMEs and enterprises in Karachi, across
              Pakistan and worldwide. Whether you need a business website, a Shopify or
              WordPress store, a MERN stack web app, a mobile app or SEO and digital
              marketing, Tribal 3 is the software house in Karachi to call first.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            Our Software House Services in Karachi
          </h3>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <li
                key={service.name}
                className="glass-card rounded-xl p-4 text-sm text-gray-300"
              >
                <span className="font-semibold text-white">{service.name}</span>
                {" — "}
                {service.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            Software Development Company Serving Karachi &amp; Worldwide
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
            Tribal 3 is a Karachi based software house delivering web, mobile and
            software projects across Pakistan and beyond. We proudly serve clients in:
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {SERVICE_AREAS.map((area) => (
              <span
                key={area}
                className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            FAQs About Choosing a Software House in Karachi
          </h3>
          <div className="mt-5 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="glass-card rounded-xl p-4 sm:p-5">
                <h4 className="text-sm font-semibold text-white sm:text-base">
                  {faq.question}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
