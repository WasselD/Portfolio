"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PROJECTS } from "@/lib/data/projects";
import { CERTIFICATIONS } from "@/lib/data/certifications";
import { loadPublicContent, bySort } from "@/lib/content";

const seed = {
  projects: [...PROJECTS].sort(bySort),
  certifications: [...CERTIFICATIONS].sort(bySort),
};
const cvCertificationNames = new Set(seed.certifications.map((cert) => cert.name));

const ContentContext = createContext(seed);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(seed);

  useEffect(() => {
    let alive = true;
    loadPublicContent()
      .then((r) => {
        if (!alive) return;
        setContent({
          projects: r.projects || seed.projects,
          certifications: r.certifications?.filter((cert) => cvCertificationNames.has(cert.name)).length
            ? r.certifications.filter((cert) => cvCertificationNames.has(cert.name))
            : seed.certifications,
        });
      })
      .catch(() => {
      });
    return () => {
      alive = false;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
