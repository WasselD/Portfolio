"use client";

import { useState } from "react";
import { PROJECT_CATEGORIES } from "@/lib/data/projects";
import { Field, TagInput, isUrl } from "./fields";

const blank = () => ({
  title: "",
  description: "",
  category: "Full Stack",
  date: String(new Date().getFullYear()),
  technologies: [],
  features: [],
  github: "",
  demo: "",
  frame: true,
});

export default function ProjectForm({ initial, categories, onSubmit, onCancel, saving }) {
  const [v, setV] = useState(() => ({ ...blank(), ...(initial || {}), github: initial?.github || "", demo: initial?.demo || "" }));
  const [featuresText, setFeaturesText] = useState((initial?.features || []).join("\n"));
  const [errors, setErrors] = useState({});
  const set = (k) => (val) => setV((p) => ({ ...p, [k]: val }));
  const on = (k) => (e) => set(k)(e.target.value);
  const suggestions = Array.from(new Set([...PROJECT_CATEGORIES, ...categories]));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!v.title.trim()) err.title = "Give the project a title.";
    if (!v.description.trim()) err.description = "Add a short description.";
    if (!isUrl(v.github.trim())) err.github = "Enter a full link, like https://example.com";
    if (!isUrl(v.demo.trim())) err.demo = "Enter a full link, like https://example.com";
    setErrors(err);
    if (Object.keys(err).length) return;
    onSubmit({
      ...(initial || {}),
      title: v.title.trim(),
      description: v.description.trim(),
      category: v.category.trim() || "Other",
      date: v.date.trim(),
      technologies: v.technologies,
      features: featuresText.split("\n").map((l) => l.trim()).filter(Boolean),
      github: v.github.trim() || null,
      demo: v.demo.trim() || null,
      frame: v.frame,
    });
  };

  return (
    <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 space-y-8 overflow-y-auto px-8 pb-8 pt-2">
        <Field label="Title" error={errors.title}>
          <input className="field" value={v.title} onChange={on("title")} placeholder="Project name" autoFocus />
        </Field>
        <Field label="Description" error={errors.description}>
          <textarea className="field" rows={3} value={v.description} onChange={on("description")} placeholder="One or two sentences." />
        </Field>
        <div className="grid grid-cols-[1fr_7rem] gap-6">
          <Field label="Category">
            <input className="field" list="project-categories" value={v.category} onChange={on("category")} />
            <datalist id="project-categories">{suggestions.map((c) => <option key={c} value={c} />)}</datalist>
          </Field>
          <Field label="Year">
            <input className="field" value={v.date} onChange={on("date")} inputMode="numeric" />
          </Field>
        </div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem]">
          <input
            type="checkbox"
            checked={v.frame}
            onChange={(e) => setV((p) => ({ ...p, frame: e.target.checked }))}
            className="mt-1 h-4 w-4 shrink-0 accent-white"
          />
          <span>
            Show a live frame of the demo site
            <span className="mt-0.5 block text-[0.8rem] text-fg/45">
              Turn off if the frame looks blank on the site: some sites don&apos;t allow embedding.
            </span>
          </span>
        </label>
        <Field label="Technologies" hint="Press Enter or comma after each one.">
          <TagInput value={v.technologies} onChange={set("technologies")} placeholder="Next.js" />
        </Field>
        <Field label="Highlights" hint="One per line. The first two are shown on the site.">
          <textarea className="field" rows={3} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} />
        </Field>
        <div className="grid gap-8 sm:grid-cols-2">
          <Field label="Code link (GitHub)" error={errors.github}>
            <input className="field" value={v.github} onChange={on("github")} placeholder="https://github.com/..." />
          </Field>
          <Field label="Live demo link" hint="Shows a live frame. Leave empty for a GitHub-only project." error={errors.demo}>
            <input className="field" value={v.demo} onChange={on("demo")} placeholder="https://..." />
          </Field>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-fg/15 px-8 py-5">
        <button type="submit" disabled={saving} className="pill pill-solid">{saving ? "Saving..." : initial ? "Save changes" : "Add project"}</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 text-fg/60 hover:text-fg">Cancel</button>
      </div>
    </form>
  );
}
