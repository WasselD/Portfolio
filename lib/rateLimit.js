const COOLDOWN_KEY = "last_contact_submission";
const COOLDOWN_TIME_MS = 60 * 1000; 


export function checkRateLimit() {
  if (typeof window === "undefined") return { allowed: true };

  const lastSent = localStorage.getItem(COOLDOWN_KEY);
  if (!lastSent) return { allowed: true };

  const timePassed = Date.now() - parseInt(lastSent, 10);
  if (timePassed < COOLDOWN_TIME_MS) {
    const remainingSeconds = Math.ceil((COOLDOWN_TIME_MS - timePassed) / 1000);
    return {
      allowed: false,
      message: `Veuillez patienter ${remainingSeconds} secondes avant d'envoyer un autre message.`,
    };
  }

  return { allowed: true };
}


export function recordSubmission() {
  if (typeof window !== "undefined") {
    localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
  }
}