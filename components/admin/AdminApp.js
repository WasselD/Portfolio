"use client";

import { useEffect, useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { mode, getSession, onAuthChange, signOut } from "@/lib/admin-store";
import { ADMIN_EMAIL } from "@/lib/content";

export default function AdminApp() {
  const [state, setState] = useState({ loading: true, session: null });

  useEffect(() => {
    let off = () => {};
    let alive = true;

    (async () => {
      try {
        const session = await getSession();
        if (!alive) return;
        setState({ loading: false, session });

        const unsub = await onAuthChange((s) => alive && setState({ loading: false, session: s }));
        if (alive) off = unsub;
        else if (unsub) unsub();
      } catch (err) {
        if (alive) setState({ loading: false, session: null });
      }
    })();

    return () => {
      alive = false;
      off();
    };
  }, []);

  // 1. Loading screen while checking Supabase auth status
  if (state.loading) {
    return (
      <main className="grid min-h-screen place-items-center text-fg/50">
        Loading...
      </main>
    );
  }

  // 2. If no session exists, force user to Login page
  if (!state.session) {
    return <Login />;
  }

  // 3. Verify user email against configured ADMIN_EMAIL
  const userEmail = state.session.user?.email || "";
  const targetAdminEmail = (
    ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || ""
  ).toLowerCase();

  const isAuthorized =
    !targetAdminEmail || userEmail.toLowerCase() === targetAdminEmail;

  if (!isAuthorized) {
    return (
      <main className="grid min-h-screen place-items-center px-[var(--gutter)] text-center">
        <div>
          <h1 className="display text-[clamp(3rem,10vw,6rem)]">No access</h1>
          <p className="mt-4 text-fg/60">
            {userEmail} isn&apos;t authorized to access the studio.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button onClick={signOut} className="pill pill-solid">
              Sign out
            </button>
            <a href="/" className="pill">
              Return Home
            </a>
          </div>
        </div>
      </main>
    );
  }

  // 4. User is authenticated and authorized -> Render Studio Dashboard
  return <Dashboard email={userEmail} />;
}