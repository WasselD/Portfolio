"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PROJECTS } from "@/lib/data/projects";
import { CERTIFICATIONS } from "@/lib/data/certifications";
import { loadPublicContent, bySort } from "@/lib/content";

const seed = {
  projects: [...PROJECTS].sort(bySort),
  certifications: [...CERTIFICATIONS].sort(bySort),
};

const ContentContext = createContext(seed);

/**
 * The static HTML ships with the seed content (fast first paint, good SEO).
 * After hydration we swap in whatever the admin has published.
 */
export function ContentProvider({ children }) {
  const [content, setContent] = useState(seed);

  useEffect(() => {
    let alive = true;
    loadPublicContent()
      .then((r) => {
        if (!alive) return;
        setContent({
          projects: r.projects || seed.projects,
          certifications: r.certifications || seed.certifications,
        });
      })
      .catch(() => {
        /* offline or misconfigured: keep the seed content */
      });
    return () => {
      alive = false;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
