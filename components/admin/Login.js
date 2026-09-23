"use client";

import { useState } from "react";
import { signIn } from "@/lib/admin-store";
import { validateAdminLogin } from "@/lib/validation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation et assainissement (Sanitization)
    const { isValid, errors, sanitizedValues } = validateAdminLogin({ email, password });

    if (!isValid) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({ email: "", password: "" });
    setBusy(true);

    try {
      await signIn(sanitizedValues.email, sanitizedValues.password);
    } catch (err) {
      setError(err.message || "Identifiants invalides.");
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center px-[var(--gutter)]">
      <form onSubmit={submit} className="w-full max-w-md" noValidate>
        <h1 className="display text-[clamp(4rem,14vw,8rem)]">Studio</h1>
        <p className="mt-4 text-fg/55">Sign in to manage projects and certificates.</p>

        <div className="mt-12 space-y-8">
          <div>
            <label className="field-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              className={`field ${fieldErrors.email ? "border-red-500" : ""}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((prev) => ({ ...prev, email: "" }));
                }
              }}
            />
            {fieldErrors.email && (
              <p className="field-error mt-2 text-xs text-red-500" role="alert">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label className="field-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className={`field ${fieldErrors.password ? "border-red-500" : ""}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: "" }));
                }
              }}
            />
            {fieldErrors.password && (
              <p className="field-error mt-2 text-xs text-red-500" role="alert">
                {fieldErrors.password}
              </p>
            )}
          </div>
        </div>

        {error && (
          <p className="field-error mt-6 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={busy} className="pill pill-solid mt-10 w-full">
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}