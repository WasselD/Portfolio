"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import Icon from "@/components/ui/Icon";
import ProjectForm from "./ProjectForm";
import CertForm from "./CertForm";
import { listItems, saveItem, removeItem, importSeed, mode, signOut } from "@/lib/admin-store";
import { formatMonthYear } from "@/lib/format";

const EASE = [0.7, 0, 0.2, 1];
const TABS = [
  { kind: "projects", label: "Projects", one: "project" },
  { kind: "certifications", label: "Certificates", one: "certificate" },
];

function IconButton({ label, onClick, disabled, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="grid h-10 w-10 place-items-center border border-fg/25 transition-colors hover:border-fg hover:bg-fg hover:text-bg disabled:pointer-events-none disabled:opacity-25"
    >
      {children}
    </button>
  );
}

function Row({ kind, item, index, count, confirming, onEdit, onMove, onAskDelete, onDelete, onCancelDelete }) {
  const isProject = kind === "projects";
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li
      className="group relative flex flex-col border-t border-fg/15 py-5 transition-colors hover:bg-fg/5"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      onClick={() => setShowDetails((p) => !p)}
    >
      <div className="grid grid-cols-[1fr_auto] items-center gap-5 cursor-pointer">
        <div className="min-w-0">
          <p className="truncate text-lg font-medium">{isProject ? item.title : item.name}</p>
          <p className="truncate text-sm text-fg/55">
            {isProject
              ? [item.category, item.date].filter(Boolean).join(", ")
              : [item.organization, formatMonthYear(item.issueDate), item.status].filter(Boolean).join(", ")}
          </p>
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {confirming ? (
            <>
              <span className="mr-1 hidden text-sm sm:inline">Delete?</span>
              <button type="button" onClick={onDelete} className="pill pill-solid !px-4 !py-2 text-sm">Yes, delete</button>
              <button type="button" onClick={onCancelDelete} className="px-2 text-sm text-fg/60 hover:text-fg">No</button>
            </>
          ) : (
            <>
              <IconButton label="Move up" onClick={() => onMove(-1)} disabled={index === 0}><Icon name="chevUp" /></IconButton>
              <IconButton label="Move down" onClick={() => onMove(1)} disabled={index === count - 1}><Icon name="chevDown" /></IconButton>
              <IconButton label="Edit" onClick={onEdit}><Icon name="edit" /></IconButton>
              <IconButton label="Delete" onClick={onAskDelete}><Icon name="trash" /></IconButton>
            </>
          )}
        </div>
      </div>

      {/* Affichage des détails au survol ou au clic */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 border-t border-fg/10 pt-3 text-sm text-fg/70 space-y-1"
          >
            {isProject ? (
              <>
                {item.description && <p><strong>Description:</strong> {item.description}</p>}
                {item.summary && <p><strong>Summary:</strong> {item.summary}</p>}
                {item.services?.length > 0 && <p><strong>Services:</strong> {item.services.join(", ")}</p>}
                {item.link && <p><strong>Link:</strong> <a href={item.link} target="_blank" rel="noreferrer" className="underline">{item.link}</a></p>}
              </>
            ) : (
              <>
                {item.description && <p><strong>Description:</strong> {item.description}</p>}
                {item.credentialId && <p><strong>Credential ID:</strong> {item.credentialId}</p>}
                {item.credentialUrl && <p><strong>URL:</strong> <a href={item.credentialUrl} target="_blank" rel="noreferrer" className="underline">{item.credentialUrl}</a></p>}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Dashboard({ email }) {
  const [kind, setKind] = useState("projects");
  const [data, setData] = useState({ projects: null, certifications: null });
  const [loadError, setLoadError] = useState("");
  const [editing, setEditing] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (which = ["projects", "certifications"]) => {
    try {
      const results = await Promise.all(which.map((k) => listItems(k)));
      setData((d) => ({ ...d, ...Object.fromEntries(which.map((k, i) => [k, results[i]])) }));
      setLoadError("");
    } catch (e) {
      setLoadError(e.message);
      setData((d) => ({ projects: d.projects || [], certifications: d.certifications || [] }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!editing) return;
    const onKey = (e) => e.key === "Escape" && setEditing(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editing]);

  const tab = TABS.find((t) => t.kind === kind);
  const items = data[kind];

  const save = async (item) => {
    setSaving(true);
    try {
      const withOrder =
        item.id || item.sortOrder !== undefined
          ? item
          : { ...item, sortOrder: items.length ? Math.min(...items.map((x) => x.sortOrder ?? 0)) - 1 : 1 };
      await saveItem(kind, withOrder);
      await load([kind]);
      setEditing(null);
      toast.success(item.id ? "Saved." : `Added. It's now first in ${tab.label.toLowerCase()}.`);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async (item) => {
    try {
      await removeItem(kind, item.id);
      setConfirmId(null);
      await load([kind]);
      toast.success("Deleted.");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const move = async (index, dir) => {
    const next = [...items];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    try {
      await Promise.all(
        next.map((it, i) => (it.sortOrder === i + 1 ? null : saveItem(kind, { ...it, sortOrder: i + 1 })))
      );
      await load([kind]);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const doImport = async () => {
    try {
      await importSeed(kind);
      await load([kind]);
      toast.success("Imported. You can now edit or delete these.");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-[var(--gutter)] pb-24">
      <header className="flex flex-wrap items-center justify-between gap-4 py-6">
        <div className="flex items-center gap-3">
          <span className="text-[0.95rem] font-semibold">Studio</span>
        </div>
        <div className="flex items-center gap-5 text-sm">
          {email && <span className="hidden text-fg/50 sm:inline">{email}</span>}
          <a href="/" className="underline-offset-4 hover:underline">View site</a>
          {mode === "supabase" && (
            <button onClick={signOut} className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
              <Icon name="logout" size={14} /> Sign out
            </button>
          )}
        </div>
      </header>

      {loadError && (
        <div className="mb-10 border border-fg px-7 py-5 text-sm" role="alert">
          <strong className="font-medium">Couldn&apos;t load from Supabase.</strong> {loadError}
        </div>
      )}

      <h1 className="display text-[clamp(3.5rem,11vw,9rem)]">Studio</h1>

      <div className="mt-10 flex items-end justify-between gap-6 border-b border-fg/15">
        <div className="flex gap-8" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.kind}
              role="tab"
              aria-selected={kind === t.kind}
              onClick={() => { setKind(t.kind); setConfirmId(null); }}
              className={`relative pb-4 text-lg transition-colors ${kind === t.kind ? "text-fg" : "text-fg/45 hover:text-fg"}`}
            >
              {t.label}
              <sup className="ml-1 text-xs text-fg/50">{data[t.kind]?.length ?? ""}</sup>
              {kind === t.kind && (
                <motion.span layoutId="admin-tab" className="absolute inset-x-0 -bottom-px h-px bg-fg" transition={{ duration: 0.4, ease: EASE }} />
              )}
            </button>
          ))}
        </div>
        <button onClick={() => setEditing({ item: null })} className="pill pill-solid mb-3 !px-5 !py-3 text-sm">
          <Icon name="plus" size={15} /> Add {tab.one}
        </button>
      </div>

      {mode === "supabase" && !loadError && items && items.length === 0 && (
        <div className="mt-8 border border-fg/25 px-7 py-5 text-sm text-fg/75">
          <p>Nothing saved yet.</p>
          <button onClick={doImport} className="pill mt-4 !px-4 !py-2.5 text-sm">Import current {tab.label.toLowerCase()}</button>
        </div>
      )}

      {items === null ? (
        <p className="py-16 text-fg/50">Loading...</p>
      ) : (
        <ul>
          {items.map((it, i) => (
            <Row
              key={it.id}
              kind={kind}
              item={it}
              index={i}
              count={items.length}
              confirming={confirmId === it.id}
              onEdit={() => setEditing({ item: it })}
              onMove={(d) => move(i, d)}
              onAskDelete={() => setConfirmId(it.id)}
              onDelete={() => del(it)}
              onCancelDelete={() => setConfirmId(null)}
            />
          ))}
          {items.length > 0 && <li className="border-t border-fg/15" aria-hidden="true" />}
        </ul>
      )}

      <AnimatePresence>
        {editing && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-40 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditing(null)}
            />
            <motion.aside
              key="drawer"
              role="dialog"
              aria-label={`${editing.item ? "Edit" : "Add"} ${tab.one}`}
              data-tone="ink"
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[560px] flex-col border-l border-fg/25"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="flex items-center justify-between px-8 pb-4 pt-8">
                <h2 className="display text-4xl">{editing.item ? "Edit" : "New"} {tab.one}</h2>
                <IconButton label="Close" onClick={() => setEditing(null)}><Icon name="x" /></IconButton>
              </div>
              {kind === "projects" ? (
                <ProjectForm
                  key={editing.item?.id || "new"}
                  initial={editing.item}
                  categories={items.map((p) => p.category).filter(Boolean)}
                  onSubmit={save}
                  onCancel={() => setEditing(null)}
                  saving={saving}
                />
              ) : (
                <CertForm key={editing.item?.id || "new"} initial={editing.item} onSubmit={save} onCancel={() => setEditing(null)} saving={saving} />
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}