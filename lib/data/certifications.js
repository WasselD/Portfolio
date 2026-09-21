// Seed content. Once you connect Supabase and click "Import current content"
// in /admin, the database becomes the source of truth and this file is only
// the first-paint fallback.
export const CERTIFICATIONS = [
  {
    id: "cert-security-plus",
    name: "CompTIA Security+ 701",
    organization: "GoMyCode",
    issueDate: "2026-02-22",
    credentialId: "31771772437191634",
    credentialUrl: "https://diploma.gomycode.app/?id=31771772437191634",
    status: "Active",
    description:
      "Cybersecurity fundamentals, network security, risk management, threat detection, identity and access management, cryptography, and security operations.",
    sortOrder: 1,
  },
  {
    id: "cert-cpps",
    name: "Phishing Prevention Specialist (CPPS)",
    organization: "Hack & Fix",
    issueDate: "2025-12-03",
    credentialId: "2883-4066-2921-3301",
    credentialUrl: "https://academy.hackandfix.com/cert-verify/?id=2883-4066-2921-3301",
    status: "Active",
    description:
      "Identifying, analyzing, and preventing phishing attacks: social engineering techniques, malicious emails, and security practices that protect users and organizations.",
    sortOrder: 2,
  },
  {
    id: "cert-cofps",
    name: "Certified Online Fraud Prevention Specialist (COFPS)",
    organization: "Hack & Fix",
    issueDate: "2026-08-03",
    credentialId: "1657-5248-1531-2768",
    credentialUrl:
      "https://academy.hackandfix.com/courses-archive/certified-online-fraud-prevention-specialist",
    status: "Active",
    description:
      "Online fraud prevention: common fraud patterns, social engineering tactics, scam detection, fraud indicators, and practices that prevent financial and cyber fraud.",
    sortOrder: 3,
  },
  {
    id: "cert-bootcamp",
    name: "Software Development Bootcamp with AI Skills",
    organization: "GoMyCode",
    issueDate: "2026-09-08",
    credentialId: "31788869697420982",
    credentialUrl: "https://diploma.gomycode.app/?id=31788869697420982",
    status: "Active",
    description:
      "A professional bootcamp focused on full-stack software development and practical AI skills.",
    sortOrder: 4,
  },
];

export const CERT_STATUSES = ["Active", "In Progress", "Expired"];
