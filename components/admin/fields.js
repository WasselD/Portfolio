"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Icon from "@/components/ui/Icon";
import { uploadImage, mode } from "@/lib/admin-store";

export function Field({ label, hint, error, children }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
      {hint && !error && <p className="mt-1.5 text-[0.8rem] text-fg/40">{hint}</p>}
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  );
}

/** Comma or Enter adds a tag; Backspace on an empty box removes the last one. */
export function TagInput({ value, onChange, placeholder }) {
  const [text, setText] = useState("");
  const add = (raw) => {
    const t = raw.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setText("");
  };
  return (
    <div>
      {value.length > 0 && (
        <ul className="mb-3 flex flex-wrap gap-2">
          {value.map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5 border border-fg/35 py-1 pl-3.5 pr-2 text-sm">
              {t}
              <button type="button" onClick={() => onChange(value.filter((x) => x !== t))} aria-label={`Remove ${t}`} className="grid h-5 w-5 place-items-center hover:bg-fg hover:text-bg">
                <Icon name="x" size={11} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <input
        className="field"
        value={text}
        placeholder={placeholder}
        onChange={(e) => (e.target.value.endsWith(",") ? add(e.target.value.slice(0, -1)) : setText(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add(text);
          } else if (e.key === "Backspace" && !text && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => text && add(text)}
      />
    </div>
  );
}

/** Upload (resized in the browser) or paste a URL. Shown in the same pill the site uses. */
export function ImageField({ value, onChange }) {
  const input = useRef(null);
  const [busy, setBusy] = useState(false);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadImage(file));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="relative mb-4 grid aspect-[2.2/1] w-full place-items-center overflow-hidden border border-fg/25">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Project preview" className="h-full w-full object-cover" />
        ) : (
          <span className="text-sm text-fg/40">No image yet</span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => input.current?.click()} disabled={busy} className="pill !px-4 !py-2.5 text-sm">
          <Icon name="upload" size={14} /> {busy ? "Uploading..." : value ? "Replace image" : "Upload image"}
        </button>
        {value && (
          <button type="button" onClick={() => onChange("")} className="text-sm text-fg/55 underline underline-offset-4 hover:text-fg">
            Remove
          </button>
        )}
        <input ref={input} type="file" accept="image/*" hidden onChange={pick} />
      </div>
      <input
        className="field mt-5"
        placeholder="...or paste an image URL"
        value={value?.startsWith("data:") ? "" : value || ""}
        onChange={(e) => onChange(e.target.value.trim())}
      />
      {mode === "local" && (
        <p className="mt-1.5 text-[0.8rem] text-fg/40">Local preview: images are stored in this browser only.</p>
      )}
    </div>
  );
}

export const isUrl = (v) => !v || /^https?:\/\/\S+\.\S+/i.test(v);
