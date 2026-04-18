"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

type ContactResponse = {
  success?: boolean;
  message?: string;
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

async function postContact(endpoint: string, payload: Record<string, string>) {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setFeedback("Vyplňte prosím meno, email a správu.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      let response = await postContact("/.netlify/functions/contact", payload);

      if (response.status === 404) {
        response = await postContact("/api/contact", payload);
      }

      let result: ContactResponse = {};

      try {
        result = (await response.json()) as ContactResponse;
      } catch {
        result = {};
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Správu sa nepodarilo odoslať.");
      }

      setStatus("success");
      setFeedback(result.message || "Správa bola odoslaná. Ozveme sa vám čo najskôr.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Správu sa nepodarilo odoslať. Skúste to prosím neskôr.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-soft sm:p-8"
      noValidate
    >
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-graphite">Meno</span>
          <input
            name="name"
            className="focus-ring mt-2 w-full rounded-[8px] border border-stone-300 px-4 py-3 text-graphite transition focus:border-graphite disabled:bg-stone-100"
            autoComplete="name"
            minLength={2}
            required
            disabled={status === "loading"}
          />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-graphite">Email</span>
          <input
            type="email"
            name="email"
            className="focus-ring mt-2 w-full rounded-[8px] border border-stone-300 px-4 py-3 text-graphite transition focus:border-graphite disabled:bg-stone-100"
            autoComplete="email"
            required
            disabled={status === "loading"}
          />
        </label>
      </div>
      <label className="mt-5 block">
        <span className="text-sm font-bold text-graphite">Správa</span>
        <textarea
          name="message"
          rows={7}
          className="focus-ring mt-2 w-full resize-y rounded-[8px] border border-stone-300 px-4 py-3 text-graphite transition focus:border-graphite disabled:bg-stone-100"
          minLength={10}
          required
          disabled={status === "loading"}
        />
      </label>

      <div aria-live="polite" className="min-h-12">
        {feedback && (
          <p
            className={`mt-5 rounded-[8px] border px-4 py-3 text-sm font-semibold ${
              status === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {feedback}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="focus-ring mt-3 inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-signal px-6 py-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-wait disabled:bg-stone-500 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Odosielam
          </>
        ) : (
          <>
            Odoslať
            <ArrowIcon />
          </>
        )}
      </button>
    </form>
  );
}
