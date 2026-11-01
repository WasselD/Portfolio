"use client";

import { createContext, useContext, useState } from "react";

const IntroContext = createContext({ done: true, setDone: () => {} });

export function IntroProvider({ children }) {
  const [done, setDone] = useState(false);
  return <IntroContext.Provider value={{ done, setDone }}>{children}</IntroContext.Provider>;
}

export const useIntro = () => useContext(IntroContext);
