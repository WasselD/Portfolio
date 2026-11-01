"use client";

import { useState } from "react";
import { signIn } from "@/lib/admin-store";
import { validateAdminLogin } from "@/lib/validation";
import Icon from "@/components/ui/Icon";

export default function Login() {
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const { isValid, errors, sanitizedValues } = validateAdminLogin({
      email: formData.get("email"),
      password: formData.get("password"),
    });

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
      <form onSubmit={submit} className="w-full max-w-md" noValidate autoComplete="off">
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
              autoComplete="off"
              required
              className={`field ${fieldErrors.email ? "border-red-500" : ""}`}
              name="email"
              onChange={(e) => {
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
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                required
                className={`field pr-10 ${fieldErrors.password ? "border-red-500" : ""}`}
                name="password"
                onChange={() => {
                  if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((shown) => !shown)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute bottom-2 right-0 p-1 text-fg/55 hover:text-fg"
              >
                <Icon name={showPassword ? "eyeOff" : "eye"} size={18} />
              </button>
            </div>
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
