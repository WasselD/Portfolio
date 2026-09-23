export function sanitizeInput(str) {
  if (typeof str !== "string") return "";
  return str
    .trim()
    .replace(/[<>]/g, "") 
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export const contactValidation = {
  name: {
    required: "Le nom est requis",
    minLength: { value: 2, message: "Le nom est trop court" },
    maxLength: { value: 80, message: "Le nom ne doit pas dépasser 80 caractères" },
  },
  email: {
    required: "L'adresse email est requise",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Veuillez entrer une adresse email valide",
    },
    maxLength: { value: 100, message: "L'email est trop long" },
  },
  subject: {
    required: "Le sujet est requis",
    minLength: { value: 3, message: "Le sujet est trop court" },
    maxLength: { value: 120, message: "Le sujet ne doit pas dépasser 120 caractères" },
  },
  message: {
    required: "Le message est requis",
    minLength: { value: 10, message: "Le message doit contenir au moins 10 caractères" },
    maxLength: { value: 2000, message: "Le message ne doit pas dépasser 2000 caractères" },
  },
};

export const adminLoginValidation = {
  email: {
    required: "L'adresse email est requise",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Veuillez entrer une adresse email valide",
    },
  },
  password: {
    required: "Le mot de passe est requis",
    minLength: { value: 6, message: "Le mot de passe doit contenir au moins 6 caractères" },
  },
};

export function validateAdminLogin(data) {
  const errors = {};
  const cleanEmail = sanitizeInput(data.email);
  const cleanPassword = data.password ? data.password.trim() : "";

  // Validation Email
  if (!cleanEmail) {
    errors.email = adminLoginValidation.email.required;
  } else if (!adminLoginValidation.email.pattern.value.test(cleanEmail)) {
    errors.email = adminLoginValidation.email.pattern.message;
  }

  // Validation Password
  if (!cleanPassword) {
    errors.password = adminLoginValidation.password.required;
  } else if (cleanPassword.length < adminLoginValidation.password.minLength.value) {
    errors.password = adminLoginValidation.password.minLength.message;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedValues: {
      email: cleanEmail,
      password: cleanPassword,
    },
  };
}