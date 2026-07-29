"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-base"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.span
              initial={{ letterSpacing: "0.1em", opacity: 0.6 }}
              animate={{ letterSpacing: "0.35em", opacity: 1 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="font-display text-sm text-muted uppercase"
            >
              WD
            </motion.span>
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="h-full w-full bg-gradient-to-r from-primary via-accent to-primary"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
