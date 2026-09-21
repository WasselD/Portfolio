"use client";

import { useState } from "react";
import { CERT_STATUSES } from "@/lib/data/certifications";
import { Field, isUrl } from "./fields";

const toDateInput = (s) => {
  // accepts "2026-02-22" | "2026-02" | "22-02-2026" and returns yyyy-mm-dd for <input type=date>
  if (!s) return "";
  let m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return s;
  if ((m = String(s).match(/^(\d{4})-(\d{2})$/))) return `${m[1]}-${m[2]}-01`;
  if ((m = String(s).match(/^(\d{2})-(\d{2})-(\d{4})$/))) return `${m[3]}-${m[2]}-${m[1]}`;
  return "";
};

export default function CertForm({ initial, onSubmit, onCancel, saving }) {
  const [v, setV] = useState(() => ({
    name: "",
    organization: "",
    issueDate: "",
    status: "Active",
    credentialId: "",
    credentialUrl: "",
    description: "",
    ...(initial || {}),
    issueDate: toDateInput(initial?.issueDate),
    credentialUrl: initial?.credentialUrl || "",
  }));
  const [errors, setErrors] = useState({});
  const on = (k) => (e) => setV((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!v.name.trim()) err.name = "Enter the certificate name.";
    if (!v.organization.trim()) err.organization = "Who issued it?";
    if (!isUrl(v.credentialUrl.trim())) err.credentialUrl = "Must start with https://";
    setErrors(err);
    if (Object.keys(err).length) return;
    onSubmit({
      ...(initial || {}),
      name: v.name.trim(),
      organization: v.organization.trim(),
      issueDate: v.issueDate,
      status: v.status,
      credentialId: v.credentialId.trim(),
      credentialUrl: v.credentialUrl.trim() || null,
      description: v.description.trim(),
    });
  };

  return (
    <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 space-y-8 overflow-y-auto px-8 pb-8 pt-2">
        <Field label="Certificate name" error={errors.name}>
          <input className="field" value={v.name} onChange={on("name")} placeholder="CompTIA Security+" autoFocus />
        </Field>
        <Field label="Issued by" error={errors.organization}>
          <input className="field" value={v.organization} onChange={on("organization")} placeholder="Organization" />
        </Field>
        <div className="grid gap-8 sm:grid-cols-2">
          <Field label="Issue date">
            <input type="date" className="field" value={v.issueDate} onChange={on("issueDate")} />
          </Field>
          <Field label="Status">
            <select className="field" value={v.status} onChange={on("status")}>
              {CERT_STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <Field label="Credential ID (optional)">
            <input className="field" value={v.credentialId} onChange={on("credentialId")} />
          </Field>
          <Field label="Verification link (optional)" error={errors.credentialUrl}>
            <input className="field" value={v.credentialUrl} onChange={on("credentialUrl")} placeholder="https://..." />
          </Field>
        </div>
        <Field label="What it covers (optional)">
          <textarea className="field" rows={4} value={v.description} onChange={on("description")} />
        </Field>
      </div>

      <div className="flex items-center gap-3 border-t border-fg/15 px-8 py-5">
        <button type="submit" disabled={saving} className="pill pill-solid">{saving ? "Saving..." : initial ? "Save changes" : "Add certificate"}</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 text-fg/60 hover:text-fg">Cancel</button>
      </div>
    </form>
  );
}
