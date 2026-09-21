// Admin data access. Only ever imported by the /admin route, so the Supabase
// SDK is code-split away from the public site.
import {
  hasSupabase,
  SUPABASE_URL,
  SUPABASE_KEY,
  LOCAL_KEY,
  SEEDS,
  bySort,
} from "./content";
import { projectFromRow, projectToRow, certFromRow, certToRow } from "./mappers";

export const mode = hasSupabase ? "supabase" : "local";

// Databases created before the `frame` option have no such column. Only send it when it
// is safe (the column is known to exist) or when it is actually needed (turning frames off).
let frameColumn = false;
function safeRow(kind, row) {
  if (kind === "projects" && row.frame !== false && !frameColumn) {
    const { frame, ...rest } = row; // eslint-disable-line no-unused-vars
    return rest;
  }
  return row;
}
function friendly(error) {
  if (/frame/i.test(error.message) && /column/i.test(error.message)) {
    return new Error("Your database needs a small update. Run supabase/setup.sql again (it is safe to re-run), then retry.");
  }
  return new Error(error.message);
}

const KINDS = {
  projects: { toRow: projectToRow, fromRow: projectFromRow },
  certifications: { toRow: certToRow, fromRow: certFromRow },
};

/* ---------------------------------------------------------------- client */
let clientPromise = null;
export function getClient() {
  if (!hasSupabase) return Promise.resolve(null);
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) =>
      createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
      })
    );
  }
  return clientPromise;
}

/* ------------------------------------------------------------------ auth */
export async function getSession() {
  const c = await getClient();
  if (!c) return null;
  const { data } = await c.auth.getSession();
  return data.session;
}
export async function onAuthChange(cb) {
  const c = await getClient();
  if (!c) return () => {};
  const { data } = c.auth.onAuthStateChange((_e, session) => cb(session));
  return () => data.subscription.unsubscribe();
}
export async function signIn(email, password) {
  const c = await getClient();
  const { error } = await c.auth.signInWithPassword({ email, password });
  if (error) throw new Error("Wrong email or password.");
}
export async function signOut() {
  const c = await getClient();
  if (c) await c.auth.signOut();
}

/* ----------------------------------------------------------------- local */
function readLocal() {
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return {};
}
function writeLocal(kind, items) {
  const data = { ...readLocal(), [kind]: items };
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  } catch {
    throw new Error("Browser storage is full. Use a smaller image or an image URL.");
  }
}
// Read-modify-write on localStorage must not yield between the read and the write,
// otherwise concurrent saves (e.g. reordering) overwrite each other.
function localItems(kind) {
  const stored = readLocal()[kind];
  return [...(stored ?? SEEDS[kind])].sort(bySort);
}
const uid = () =>
  (typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID()) ||
  `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/* ------------------------------------------------------------------ CRUD */
export async function listItems(kind) {
  if (hasSupabase) {
    const c = await getClient();
    const { data, error } = await c
      .from(kind)
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    if (kind === "projects" && data.length) frameColumn = "frame" in data[0];
    return data.map(KINDS[kind].fromRow).sort(bySort);
  }
  return localItems(kind);
}

export async function saveItem(kind, item) {
  if (hasSupabase) {
    const c = await getClient();
    const row = safeRow(kind, KINDS[kind].toRow(item));
    const q = item.id
      ? c.from(kind).update(row).eq("id", item.id)
      : c.from(kind).insert(row);
    const { data, error } = await q.select();
    if (error) throw friendly(error);
    // Row-level security silently filters writes from non-admins.
    if (!data?.length) throw new Error("Not allowed. Sign in with the admin account.");
    return KINDS[kind].fromRow(data[0]);
  }
  const items = localItems(kind);
  if (item.id) {
    writeLocal(kind, items.map((x) => (x.id === item.id ? { ...x, ...item } : x)));
    return item;
  }
  const created = { ...item, id: uid() };
  writeLocal(kind, [...items, created]);
  return created;
}

export async function removeItem(kind, id) {
  if (hasSupabase) {
    const c = await getClient();
    const { data, error } = await c.from(kind).delete().eq("id", id).select();
    if (error) throw new Error(error.message);
    if (!data?.length) throw new Error("Not allowed. Sign in with the admin account.");
    return;
  }
  writeLocal(kind, localItems(kind).filter((x) => x.id !== id));
}

/** Copy the built-in content into the database so it can be edited or deleted. */
export async function importSeed(kind) {
  if (!hasSupabase) return;
  const c = await getClient();
  const rows = SEEDS[kind].map((s) => safeRow(kind, KINDS[kind].toRow({ ...s })));
  const { error } = await c.from(kind).insert(rows);
  if (error) throw friendly(error);
}

/* ---------------------------------------------------------------- images */
async function resizeImage(file, maxSide = 1800) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error("That file is not a readable image."));
      i.src = url;
    });
    const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((r) => canvas.toBlob(r, "image/webp", 0.86));
    if (!blob) throw new Error("Could not process that image.");
    return blob;
  } finally {
    URL.revokeObjectURL(url);
  }
}

const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(new Error("Could not read the image."));
    r.readAsDataURL(blob);
  });

/** Returns a URL you can store on a project. */
export async function uploadImage(file) {
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
  // Smaller in local mode: everything has to fit in browser storage.
  const blob = await resizeImage(file, hasSupabase ? 1800 : 1200);
  if (hasSupabase) {
    const c = await getClient();
    const base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
    const path = `projects/${Date.now()}-${base || "image"}.webp`;
    const { error } = await c.storage
      .from("portfolio")
      .upload(path, blob, { contentType: "image/webp", cacheControl: "31536000", upsert: false });
    if (error) throw new Error(error.message);
    return c.storage.from("portfolio").getPublicUrl(path).data.publicUrl;
  }
  return blobToDataUrl(blob);
}
