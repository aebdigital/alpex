import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "GDPR a cookies | Alpex Autoservis",
  description: "Informácie o ochrane osobných údajov a používaní cookies na webe ALPEX Group.",
  alternates: {
    canonical: "/gdpr",
  },
};

export default function GdprPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-graphite">
      <header className="border-b border-stone-200 bg-white">
        <div className="section-shell flex min-h-20 items-center justify-between gap-4">
          <Link href="/" className="focus-ring font-[var(--font-display)] text-2xl font-bold">
            Alpex
          </Link>
          <Link
            href="/"
            className="focus-ring rounded-[8px] border border-stone-300 px-4 py-3 text-sm font-bold transition hover:border-graphite"
          >
            Späť na web
          </Link>
        </div>
      </header>

      <section className="section-shell py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">
            Súkromie
          </p>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl font-bold leading-tight sm:text-6xl">
            Ochrana osobných údajov a cookies
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-700">
            Táto stránka sumarizuje, ako ALPEX Group s. r. o. spracúva kontaktné
            údaje návštevníkov webu a ako pristupuje k súhlasu s cookies.
          </p>
          <CookieSettingsButton className="focus-ring mt-8 inline-flex rounded-[8px] bg-signal px-6 py-4 text-sm font-bold text-white transition hover:bg-red-700">
            Otvoriť nastavenia cookies
          </CookieSettingsButton>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-soft">
            <h2 className="font-[var(--font-display)] text-2xl font-bold">
              Prevádzkovateľ
            </h2>
            <div className="mt-4 leading-7 text-stone-700">
              <p>ALPEX Group s. r. o.</p>
              <p>Hrdličkova 15, 811 01 Bratislava</p>
              <p>IČO: 17330068</p>
              <p>DIČ: 2020342225</p>
              <p>IČ DPH: SK2020342225</p>
            </div>
          </article>

          <article className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-soft">
            <h2 className="font-[var(--font-display)] text-2xl font-bold">
              Kontaktné údaje
            </h2>
            <div className="mt-4 leading-7 text-stone-700">
              <p>Zodpovedná osoba: Martin Hanák</p>
              <p>
                Email:{" "}
                <a className="font-semibold text-signal hover:underline" href="mailto:servis@alpex.sk">
                  servis@alpex.sk
                </a>
              </p>
              <p>
                Mobil:{" "}
                <a className="font-semibold text-signal hover:underline" href="tel:+421911078758">
                  +421 911 078 758
                </a>
              </p>
            </div>
          </article>
        </div>

        <div className="mt-8 space-y-5 rounded-[8px] border border-stone-200 bg-white p-6 leading-8 text-stone-700 shadow-soft sm:p-8">
          <section>
            <h2 className="font-[var(--font-display)] text-2xl font-bold text-graphite">
              Aké údaje spracúvame
            </h2>
            <p className="mt-3">
              Ak nás kontaktujete cez formulár, email alebo telefonicky, spracúvame
              najmä meno, emailovú adresu, telefónne číslo a obsah vašej správy.
              Údaje používame na vybavenie požiadavky, dohodnutie termínu a následnú
              servisnú komunikáciu.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-display)] text-2xl font-bold text-graphite">
              Právny základ a doba uchovávania
            </h2>
            <p className="mt-3">
              Kontaktné údaje spracúvame na základe predzmluvnej komunikácie,
              plnenia zmluvy alebo oprávneného záujmu odpovedať na vašu požiadavku.
              Údaje uchovávame len počas nevyhnutnej doby, prípadne podľa zákonných
              účtovných a daňových povinností.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-display)] text-2xl font-bold text-graphite">
              Cookies
            </h2>
            <p className="mt-3">
              Web používa nevyhnutné technické úložisko, ktoré zabezpečuje správne
              fungovanie stránky a uloženie voľby súhlasu. Voliteľné analytické a
              marketingové cookies sa používajú iba po vašom súhlase. Svoj výber
              môžete kedykoľvek zmeniť cez tlačidlo nastavení cookies.
            </p>
          </section>

          <section>
            <h2 className="font-[var(--font-display)] text-2xl font-bold text-graphite">
              Vaše práva
            </h2>
            <p className="mt-3">
              Máte právo požiadať o prístup k osobným údajom, opravu, vymazanie,
              obmedzenie spracúvania, prenositeľnosť údajov a namietať proti
              spracúvaniu. Pri otázkach nás kontaktujte na servis@alpex.sk.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
