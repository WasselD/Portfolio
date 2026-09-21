"use client";

import { useState } from "react";
import { signIn } from "@/lib/admin-store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signIn(email.trim(), password);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center px-[var(--gutter)]">
      <form onSubmit={submit} className="w-full max-w-md">
        <h1 className="display text-[clamp(4rem,14vw,8rem)]">Studio</h1>
        <p className="mt-4 text-fg/55">Sign in to manage projects and certificates.</p>

        <div className="mt-12 space-y-8">
          <div>
            <label className="field-label" htmlFor="email">Email</label>
            <input id="email" type="email" autoComplete="username" required className="field" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="field-label" htmlFor="password">Password</label>
            <input id="password" type="password" autoComplete="current-password" required className="field" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        {error && <p className="field-error mt-6" role="alert">{error}</p>}

        <button type="submit" disabled={busy} className="pill pill-solid mt-10">
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
