import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { HeroParallax } from "@/components/HeroParallax";

const services = [
  {
    title: "Mechanické práce",
    text: "Poskytujeme kompletný servis a údržbu všetkých typov vozidiel s dôrazom na spoľahlivosť a kvalitu.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          d="M14.7 6.3a4.2 4.2 0 0 0-5.5 5.5l-5.4 5.4a2.1 2.1 0 0 0 3 3l5.4-5.4a4.2 4.2 0 0 0 5.5-5.5l-3 3-3-3 3-3Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    title: "Pneuservis",
    text: "Zabezpečujeme profesionálnu výmenu, opravu a uskladnenie pneumatík pre maximálnu bezpečnosť a komfort vašej jazdy.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 4v3m0 10v3M4 12h3m10 0h3M6.4 6.4l2.1 2.1m7 7 2.1 2.1m0-11.2-2.1 2.1m-7 7-2.1 2.1"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "Elektrikárske práce",
    text: "Ponúkame elektrické opravy a inštalácie pre bezpečnú a efektívnu prevádzku vášho vozidla.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          d="m13 2-8 12h6l-1 8 9-13h-6l0-7Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    title: "Príprava na STK",
    text: "Pripravíme vaše vozidlo na STK rýchlo a spoľahlivo. Zabezpečíme, aby ste technickou kontrolou prešli bez problémov.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          d="M8 4h8m-9 3h10a2 2 0 0 1 2 2v10H5V9a2 2 0 0 1 2-2Zm1 4h8m-8 4h5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
];

const stats = [
  { value: "20", label: "rokov skúseností" },
  { value: "10 000", label: "opravených áut" },
  { value: "5 000", label: "spokojných zákazníkov" },
];

const gallery = [
  {
    src: "/images/workshop-wide.jpg",
    alt: "Interiér autoservisu ALPEX so zdvihákmi",
    className: "md:col-span-2",
  },
  {
    src: "/images/exterior-premio-doors.jpg",
    alt: "Exteriér servisu ALPEX Group s dielňami",
    className: "md:col-span-2",
  },
  {
    src: "/images/workshop-mercedes.jpg",
    alt: "Servisná dielňa s vozidlom Mercedes",
    className: "",
  },
  {
    src: "/images/tyre-service-bay.jpg",
    alt: "Pneuservis s pripravenými pneumatikami",
    className: "",
  },
  {
    src: "/images/exterior-suzuki.jpg",
    alt: "Vstup do servisu Suzuki a Premio",
    className: "",
  },
];

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "ALPEX Group s. r. o.",
  alternateName: "ALPEX Autoservis",
  url: "https://alpex.sk",
  image: "https://alpex.sk/images/exterior-premio-doors.jpg",
  description:
    "Profesionálny autoservis v Bratislave s mechanickými prácami, pneuservisom, elektrikárskymi opravami, diagnostikou a prípravou na STK.",
  telephone: "+421911078758",
  email: "servis@alpex.sk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hrdličkova 15",
    postalCode: "811 01",
    addressLocality: "Bratislava",
    addressCountry: "SK",
  },
  vatID: "SK2020342225",
  areaServed: [
    {
      "@type": "City",
      name: "Bratislava",
    },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Mechanické práce",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Pneuservis",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Elektrikárske práce",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Príprava na STK",
      },
    },
  ],
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M5 12h13m-5-5 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/15 bg-graphite/80 backdrop-blur-xl">
      <a href="#main" className="skip-link">
        Preskočiť na hlavný obsah
      </a>
      <div className="section-shell flex min-h-20 items-center justify-between gap-4 py-3">
        <Link href="/" className="focus-ring flex items-center gap-3 text-white">
          <span className="grid h-11 w-11 place-items-center rounded-[8px] bg-signal font-[var(--font-display)] text-xl font-bold">
            A
          </span>
          <span className="font-[var(--font-display)] text-2xl font-bold tracking-wide">
            Alpex
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-white md:flex">
          <a className="focus-ring transition hover:text-white" href="#sluzby">
            Služby
          </a>
          <a className="focus-ring transition hover:text-white" href="#o-nas">
            O nás
          </a>
          <a className="focus-ring transition hover:text-white" href="#galeria">
            Galéria
          </a>
        </nav>

        <a
          href="tel:+421911078758"
          className="focus-ring hidden rounded-[8px] bg-white px-4 py-3 text-sm font-bold text-graphite transition hover:bg-sunline sm:inline-flex"
        >
          +421 911 078 758
        </a>
      </div>
    </header>
  );
}

function CtaLink({ children = "Dohodnúť termín" }: { children?: React.ReactNode }) {
  return (
    <a
      href="#kontakt"
      className="focus-ring inline-flex items-center justify-center gap-2 rounded-[8px] bg-signal px-6 py-4 text-sm font-bold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-red-700"
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Header />
      <main id="main">
        <HeroParallax>
          <div className="section-shell flex min-h-svh items-center pb-24 pt-28">
            <div className="max-w-3xl">
              <p className="mb-5 inline-flex rounded-[8px] border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-sunline backdrop-blur">
                Autoservis Bratislava
              </p>
              <h1 className="font-[var(--font-display)] text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
                Alpex Autoservis
              </h1>
              <p className="mt-6 max-w-2xl font-[var(--font-display)] text-2xl font-semibold leading-tight text-white sm:text-3xl">
                Riešenia pre všetky problémy s automobilmi
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
                Profesionálna starostlivosť o vaše auto, ktorá zaručí bezpečnosť
                na cestách a maximálnu spokojnosť každého zákazníka.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CtaLink />
                <a
                  href="#sluzby"
                  className="focus-ring inline-flex items-center justify-center rounded-[8px] border border-white/35 px-6 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-graphite"
                >
                  Zobraziť služby
                </a>
              </div>
            </div>
          </div>
        </HeroParallax>

        <div className="relative z-10 -mt-[100svh] overflow-hidden rounded-t-[28px] shadow-[0_-26px_70px_rgba(21,23,26,0.18)]">

        <section className="bg-graphite py-5 text-white">
          <div className="section-shell grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-sunline" />
              <span className="text-sm font-semibold">Mechanika, elektrika, pneuservis</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-sunline" />
              <span className="text-sm font-semibold">Viac ako 20 rokov skúseností</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-sunline" />
              <span className="text-sm font-semibold">Hrdličkova 15, Bratislava</span>
            </div>
          </div>
        </section>

        <section id="sluzby" className="bg-stone-50 py-24">
          <div className="section-shell">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">
                Služby
              </p>
              <h2 className="mt-3 font-[var(--font-display)] text-4xl font-bold text-graphite sm:text-5xl">
                Ponúkame široké spektrum služieb
              </h2>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-[8px] bg-graphite text-sunline">
                    {service.icon}
                  </div>
                  <h3 className="mt-7 font-[var(--font-display)] text-2xl font-bold text-graphite">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-stone-600">{service.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-10">
              <CtaLink />
            </div>
          </div>
        </section>

        <section id="o-nas" className="bg-[#ece7de] py-24">
          <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative min-h-[420px] overflow-hidden rounded-[8px] shadow-lift">
              <Image
                src="/images/workshop-wide.jpg"
                alt="Servisná hala ALPEX"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">
                O nás
              </p>
              <h2 className="mt-3 font-[var(--font-display)] text-4xl font-bold text-graphite sm:text-5xl">
                Náš príbeh
              </h2>
              <p className="mt-6 text-lg leading-8 text-stone-700">
                Vitajte v našom autoservise! Sme firma s viac ako 20-ročnou
                tradíciou v oblasti servisu a opráv vozidiel. Našou misiou je
                poskytovať kvalitné a spoľahlivé služby pre všetkých majiteľov áut.
              </p>
              <p className="mt-4 text-lg leading-8 text-stone-700">
                Náš tím skúsených mechanikov je vyškolený na prácu so všetkými
                značkami a modelmi vozidiel. Veríme v poctivú prácu,
                transparentnosť a dlhodobé vzťahy so zákazníkmi.
              </p>
              <div className="mt-9">
                <CtaLink />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">
                  Prečo práve my?
                </p>
                <h2 className="mt-3 font-[var(--font-display)] text-4xl font-bold text-graphite sm:text-5xl">
                  Skúsenosti, ktoré cítiť v každej oprave
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[8px] border border-stone-200 bg-stone-50 p-6"
                  >
                    <p className="font-[var(--font-display)] text-5xl font-bold text-signal">
                      {stat.value}
                    </p>
                    <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-stone-600">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10">
              <CtaLink>Objednať termín</CtaLink>
            </div>
          </div>
        </section>

        <section id="galeria" className="bg-graphite py-24 text-white">
          <div className="section-shell">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-sunline">
                  Galéria
                </p>
                <h2 className="mt-3 font-[var(--font-display)] text-4xl font-bold sm:text-5xl">
                  Naša práca
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-white/70">
                Reálne zábery z prevádzky, dielne, pneuservisu a servisných brán
                ALPEX Group v Bratislave.
              </p>
            </div>

            <div className="mt-12 grid auto-rows-[260px] gap-4 md:grid-cols-4">
              {gallery.map((image) => (
                <figure
                  key={image.src}
                  className={`group relative overflow-hidden rounded-[8px] bg-white/10 ${image.className}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 25vw, 100vw"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className="bg-stone-50 py-24">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">
                Kontakt
              </p>
              <h2 className="mt-3 font-[var(--font-display)] text-4xl font-bold text-graphite sm:text-5xl">
                Objednať termín
              </h2>
              <div className="mt-8 space-y-6 text-stone-700">
                <div>
                  <p className="font-bold text-graphite">ALPEX Group s. r. o.</p>
                  <p className="mt-2 leading-7">Hrdličkova 15<br />811 01 Bratislava</p>
                </div>
                <div className="leading-7">
                  <p>Zodpovedná osoba: Martin Hanák</p>
                  <p>
                    email:{" "}
                    <a className="font-semibold text-signal hover:underline" href="mailto:servis@alpex.sk">
                      servis@alpex.sk
                    </a>
                  </p>
                  <p>
                    mobil:{" "}
                    <a className="font-semibold text-signal hover:underline" href="tel:+421911078758">
                      +421 911 078 758
                    </a>
                  </p>
                </div>
                <div className="leading-7">
                  <p>IČO: 17330068</p>
                  <p>DIČ: 2020342225</p>
                  <p>IČ DPH: SK2020342225</p>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
        </div>
      </main>

      <footer className="bg-graphite py-8 text-white">
        <div className="section-shell flex flex-col justify-between gap-4 text-sm text-white/70 sm:flex-row">
          <p>© Copyright • ALPEX Group s. r. o. 2026 • Všetky práva vyhradené</p>
          <div className="flex gap-5">
            <Link className="focus-ring hover:text-white" href="/gdpr">
              GDPR a cookies
            </Link>
            <a
              className="focus-ring hover:text-white"
              href="https://aebdigital.sk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tvorba webu - AEB Digital
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
