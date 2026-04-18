"use client";

type CookieSettingsButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export function CookieSettingsButton({
  className = "",
  children = "Nastavenia cookies",
}: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("alpex:open-cookie-settings"))}
    >
      {children}
    </button>
  );
}
