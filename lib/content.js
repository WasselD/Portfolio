// Public, read-only content loading. Deliberately does NOT import the
// Supabase SDK: reads are one plain fetch, so the home page stays light.
import { PROJECTS } from "./data/projects";
import { CERTIFICATIONS } from "./data/certifications";
import { projectFromRow, certFromRow } from "./mappers";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export const ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase();
export const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_KEY);

export const LOCAL_KEY = "wd-portfolio-content-v1";
export const SEEDS = { projects: PROJECTS, certifications: CERTIFICATIONS };

export const bySort = (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0);

async function rest(table) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?select=*&order=sort_order.asc,created_at.desc`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  if (!res.ok) throw new Error(`Failed to load ${table} (${res.status})`);
  return res.json();
}

/**
 * Returns { projects, certifications }. A value is null when there is nothing
 * to override, in which case the built-in seed content is shown instead.
 * (Empty database table => seed content, so a fresh setup never shows a blank site.)
 */
export async function loadPublicContent() {
  if (hasSupabase) {
    const [p, c] = await Promise.all([rest("projects"), rest("certifications")]);
    return {
      projects: p.length ? p.map(projectFromRow).sort(bySort) : null,
      certifications: c.length ? c.map(certFromRow).sort(bySort) : null,
    };
  }
  // Local preview mode (no Supabase configured): read this browser's copy.
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      return {
        projects: d.projects?.length ? [...d.projects].sort(bySort) : null,
        certifications: d.certifications?.length ? [...d.certifications].sort(bySort) : null,
      };
    }
  } catch {
    /* ignore */
  }
  return { projects: null, certifications: null };
}
