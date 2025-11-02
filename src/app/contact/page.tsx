"use client"; // Required for client-side form handling.

import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    setLoading(false);
    setResult(json.message || (res.ok ? "Message sent!" : "Something went wrong."));
    if (res.ok) form.reset();
  }

  return (
    <main className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="mt-2 text-sm text-gray-400">Prefer email? devin.a.carmichael@gmail.com</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm">Your email</span>
          <input name="email" type="email" required className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white" />
        </label>
        <label className="block">
          <span className="text-sm">Message</span>
          <textarea name="message" required rows={6} className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white" />
        </label>
        <button disabled={loading} className="rounded bg-white px-4 py-2 text-black disabled:opacity-60">
          {loading ? "Sending…" : "Send"}
        </button>
        {result && <p className="text-sm">{result}</p>}
      </form>
    </main>
  );
}
