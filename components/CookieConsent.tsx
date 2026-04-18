"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Preferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const storageKey = "alpex-cookie-consent-v1";

const defaultPreferences: Preferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function Toggle({
  checked,
  disabled,
  label,
  description,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  description: string;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <div className="flex gap-4 rounded-[8px] border border-stone-200 bg-white p-4">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`focus-ring mt-1 h-7 w-12 shrink-0 rounded-full p-1 transition ${
          checked ? "bg-signal" : "bg-stone-300"
        } ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <div>
        <p className="font-semibold text-graphite">{label}</p>
        <p className="mt-1 text-sm leading-6 text-stone-600">{description}</p>
      </div>
    </div>
  );
}

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);

  useEffect(() => {
    setMounted(true);

    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { preferences?: Preferences };
        setPreferences({
          necessary: true,
          analytics: Boolean(parsed.preferences?.analytics),
          marketing: Boolean(parsed.preferences?.marketing),
        });
      } catch {
        window.localStorage.removeItem(storageKey);
        setBannerOpen(true);
      }
    } else {
      setBannerOpen(true);
    }

    const openSettings = () => {
      setSettingsOpen(true);
      setBannerOpen(false);
    };

    window.addEventListener("alpex:open-cookie-settings", openSettings);
    return () => window.removeEventListener("alpex:open-cookie-settings", openSettings);
  }, []);

  const savePreferences = (nextPreferences: Preferences) => {
    setPreferences(nextPreferences);
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        preferences: nextPreferences,
        savedAt: new Date().toISOString(),
      }),
    );
    setBannerOpen(false);
    setSettingsOpen(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="focus-ring fixed bottom-4 left-4 z-40 rounded-[8px] border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-graphite shadow-soft transition hover:-translate-y-0.5 hover:border-stone-300"
        onClick={() => {
          setSettingsOpen(true);
          setBannerOpen(false);
        }}
      >
        Nastavenia cookies
      </button>

      {bannerOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 animate-slideUp px-4 pb-4 sm:px-6">
          <div className="mx-auto max-w-5xl rounded-[8px] border border-stone-200 bg-white p-5 shadow-lift sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-[var(--font-display)] text-xl font-bold text-graphite">
                  Cookies pre lepší servis
                </p>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">
                  Používame nevyhnutné technické úložisko a voliteľné cookies na
                  analytiku a marketing. Súhlas môžete kedykoľvek zmeniť cez tlačidlo
                  nastavení.
                </p>
                <Link
                  href="/gdpr"
                  className="focus-ring mt-3 inline-flex text-sm font-semibold text-signal underline-offset-4 hover:underline"
                >
                  Ochrana osobných údajov
                </Link>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                <button
                  type="button"
                  className="focus-ring rounded-[8px] bg-signal px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                  onClick={() =>
                    savePreferences({ necessary: true, analytics: true, marketing: true })
                  }
                >
                  Prijať všetko
                </button>
                <button
                  type="button"
                  className="focus-ring rounded-[8px] border border-stone-300 px-5 py-3 text-sm font-bold text-graphite transition hover:border-graphite"
                  onClick={() => setSettingsOpen(true)}
                >
                  Upraviť
                </button>
                <button
                  type="button"
                  className="focus-ring rounded-[8px] px-5 py-3 text-sm font-bold text-stone-600 transition hover:bg-stone-100 hover:text-graphite"
                  onClick={() => savePreferences(defaultPreferences)}
                >
                  Len nevyhnutné
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {settingsOpen && (
        <div
          className="fixed inset-0 z-50 animate-fadeIn overflow-y-auto bg-graphite/70 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
        >
          <div className="mx-auto max-w-2xl animate-slideUp rounded-[8px] bg-stone-50 p-5 shadow-lift sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">
                  Súkromie
                </p>
                <h2
                  id="cookie-settings-title"
                  className="mt-2 font-[var(--font-display)] text-3xl font-bold text-graphite"
                >
                  Nastavenia cookies
                </h2>
              </div>
              <button
                type="button"
                aria-label="Zavrieť nastavenia cookies"
                className="focus-ring grid h-10 w-10 place-items-center rounded-[8px] border border-stone-200 bg-white text-2xl leading-none text-graphite transition hover:border-stone-400"
                onClick={() => setSettingsOpen(false)}
              >
                ×
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-stone-600">
              Vyberte, s ktorými kategóriami súhlasíte. Nevyhnutné cookies sú potrebné
              na správne fungovanie webu a nedajú sa vypnúť.
            </p>

            <div className="mt-6 grid gap-3">
              <Toggle
                checked
                disabled
                label="Nevyhnutné"
                description="Zabezpečujú načítanie stránky, uloženie vášho súhlasu a základnú bezpečnosť."
              />
              <Toggle
                checked={preferences.analytics}
                label="Analytické"
                description="Pomáhajú pochopiť návštevnosť a zlepšovať obsah webu."
                onChange={(analytics) =>
                  setPreferences((current) => ({ ...current, analytics }))
                }
              />
              <Toggle
                checked={preferences.marketing}
                label="Marketingové"
                description="Slúžia na meranie kampaní a relevantnejšiu komunikáciu."
                onChange={(marketing) =>
                  setPreferences((current) => ({ ...current, marketing }))
                }
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="focus-ring rounded-[8px] px-5 py-3 text-sm font-bold text-stone-600 transition hover:bg-stone-200 hover:text-graphite"
                onClick={() => savePreferences(defaultPreferences)}
              >
                Odmietnuť voliteľné
              </button>
              <button
                type="button"
                className="focus-ring rounded-[8px] border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-graphite transition hover:border-graphite"
                onClick={() =>
                  savePreferences({ necessary: true, analytics: true, marketing: true })
                }
              >
                Prijať všetko
              </button>
              <button
                type="button"
                className="focus-ring rounded-[8px] bg-signal px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                onClick={() => savePreferences(preferences)}
              >
                Uložiť nastavenia
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
