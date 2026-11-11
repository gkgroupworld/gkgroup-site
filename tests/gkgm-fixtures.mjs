import { PROJECT_TYPES } from "../content/gkgm-project.js";
import { projectFields } from "../lib/gkgm-project.js";

export { PROJECT_TYPES };
export function sample(type = "work", locale = "fr") {
  const values = { type, locale, consent: "yes", fax: "" };
  for (const field of projectFields(type)) values[field.id] = field.choices?.[0].id || (field.type === "number" ? "3" : "Synthetic answer");
  return { ...values, name: "Synthetic QA", email: "synthetic@example.test", whatsapp: "+22890000001", destination: type === "d2" ? "Portugal" : "Synthetic destination", description: "Entirely synthetic project description for local tests only." };
}
