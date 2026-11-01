import { PROJECTS } from "./data/projects";
import { CERTIFICATIONS } from "./data/certifications";
import { projectFromRow, certFromRow } from "./mappers";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export const ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase();
export const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_KEY);

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

export async function loadPublicContent() {
  if (hasSupabase) {
    const [p, c] = await Promise.all([rest("projects"), rest("certifications")]);
    return {
      projects: p.length ? p.map(projectFromRow).sort(bySort) : null,
      certifications: c.length ? c.map(certFromRow).sort(bySort) : null,
    };
  }
  return { projects: null, certifications: null };
}
