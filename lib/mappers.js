export const projectFromRow = (r) => ({
  id: r.id,
  title: r.title,
  description: r.description ?? "",
  category: r.category ?? "",
  technologies: r.technologies ?? [],
  features: r.features ?? [],
  github: r.github || null,
  demo: r.demo || null,
  image: r.image || null,
  date: r.date ?? "",
  frame: r.frame !== false, 
  sortOrder: r.sort_order ?? 0,
});

export const projectToRow = (p) => ({
  ...(p.id ? { id: p.id } : {}),
  title: p.title,
  description: p.description ?? "",
  category: p.category ?? "",
  technologies: p.technologies ?? [],
  features: p.features ?? [],
  github: p.github || null,
  demo: p.demo || null,
  image: p.image || null,
  date: p.date ?? "",
  frame: p.frame !== false,
  sort_order: p.sortOrder ?? 0,
});

export const certFromRow = (r) => ({
  id: r.id,
  name: r.name,
  organization: r.organization ?? "",
  issueDate: r.issue_date ?? "",
  credentialId: r.credential_id ?? "",
  credentialUrl: r.credential_url || null,
  status: r.status ?? "Active",
  description: r.description ?? "",
  sortOrder: r.sort_order ?? 0,
});

export const certToRow = (c) => ({
  ...(c.id ? { id: c.id } : {}),
  name: c.name,
  organization: c.organization ?? "",
  issue_date: c.issueDate ?? "",
  credential_id: c.credentialId ?? "",
  credential_url: c.credentialUrl || null,
  status: c.status ?? "Active",
  description: c.description ?? "",
  sort_order: c.sortOrder ?? 0,
});
