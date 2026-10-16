import { COMMON_FIELDS, DESCRIPTION_FIELD, PROJECT_TYPES, FORM_NAME } from "../content/gkgm-project.js";

export function projectFields(type) {
  return [...COMMON_FIELDS, ...(PROJECT_TYPES.find(item => item.id === type)?.fields || []), DESCRIPTION_FIELD];
}

export function validateProject(values) {
  const errors = {};
  const project = PROJECT_TYPES.find(item => item.id === values.type);
  if (!project) return { type: "requiredError" };
  for (const field of projectFields(values.type)) {
    const value = typeof values[field.id] === "string" ? values[field.id].trim() : "";
    if (!value && !field.optional) errors[field.id] = "requiredError";
    if (value.length > (field.max || 400)) errors[field.id] = "tooLong";
    if (value && field.choices && !field.choices.some(choice => choice.id === value)) errors[field.id] = "requiredError";
    if (value && field.type === "number" && (!/^\d{1,2}$/.test(value) || Number(value) > 80)) errors[field.id] = "numberError";
  }
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "emailError";
  if (values.whatsapp && !/^\+[1-9]\d{6,14}$/.test(values.whatsapp.replace(/[\s().-]/g, ""))) errors.whatsapp = "phoneError";
  if (values.description?.trim().length < 30) errors.description = "descriptionError";
  if (values.type === "d2" && values.destination !== "Portugal") errors.destination = "requiredError";
  if (values.consent !== "yes") errors.consent = "consentError";
  return errors;
}

export function validatedPayload(values) {
  const allowed = new Set(["type", "locale", "consent", "fax", "form-name", ...projectFields(values.type).map(field => field.id)]);
  // Reject hidden/inactive fields and attachments rather than collecting unnecessary data.
  if (Object.keys(values).some(key => !allowed.has(key)) || Object.values(values).some(value => typeof value !== "string")) return null;
  const payload = { "form-name": FORM_NAME, locale: values.locale, type: values.type, consent: values.consent, fax: "" };
  for (const field of projectFields(values.type)) if (values[field.id]?.trim()) payload[field.id] = values[field.id].trim();
  return payload;
}
