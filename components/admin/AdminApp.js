"use client";

import { useEffect, useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { mode, getSession, onAuthChange, signOut } from "@/lib/admin-store";
import { ADMIN_EMAIL } from "@/lib/content";

export default function AdminApp() {
  const [state, setState] = useState({ loading: true, session: null });

  useEffect(() => {
    if (mode === "local") {
      setState({ loading: false, session: null });
      return;
    }
    let off = () => {};
    let alive = true;
    (async () => {
      const session = await getSession();
      if (!alive) return;
      setState({ loading: false, session });
      const unsub = await onAuthChange((s) => alive && setState({ loading: false, session: s }));
      if (alive) off = unsub;
      else unsub();
    })();
    return () => {
      alive = false;
      off();
    };
  }, []);

  if (state.loading) return <main className="grid min-h-screen place-items-center text-fg/50">Loading...</main>;

  if (mode === "local") return <Dashboard email="" />;

  if (!state.session) return <Login />;

  const email = state.session.user?.email || "";
  // UX guard only. The real protection is row-level security in the database.
  if (ADMIN_EMAIL && email.toLowerCase() !== ADMIN_EMAIL) {
    return (
      <main className="grid min-h-screen place-items-center px-[var(--gutter)] text-center">
        <div>
          <h1 className="display text-[clamp(3rem,10vw,6rem)]">No access</h1>
          <p className="mt-4 text-fg/60">{email} isn&apos;t the admin account for this site.</p>
          <button onClick={signOut} className="pill mt-8">Sign out</button>
        </div>
      </main>
    );
  }

  return <Dashboard email={email} />;
}
