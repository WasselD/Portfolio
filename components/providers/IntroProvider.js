"use client";

import { createContext, useContext, useState } from "react";

// Tells the hero when the preloader curtain has lifted, so its entrance plays on cue.
const IntroContext = createContext({ done: true, setDone: () => {} });

export function IntroProvider({ children }) {
  const [done, setDone] = useState(false);
  return <IntroContext.Provider value={{ done, setDone }}>{children}</IntroContext.Provider>;
}

export const useIntro = () => useContext(IntroContext);
