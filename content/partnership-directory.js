export const PARTNERSHIP_CATEGORIES = ["education", "mobility", "technology", "trade", "business"];

export const PARTNERSHIP_STATUSES = {
  enquiry: { fr: "Prise de contact", en: "Initial enquiry" },
  discussion: { fr: "Échanges en cours", en: "Discussions in progress" },
  confirmed: { fr: "Collaboration confirmée", en: "Confirmed collaboration" },
};

/**
 * Editorial directory, deliberately empty until explicit approval is recorded.
 * Each future entry requires: id, category, status, name, summary {fr,en},
 * agreementValidated, publicationApproved. These flags record human validation;
 * they must never be inferred from an application, platform signup or discussion.
 * Optional logo: {src, width, height, publicationApproved}; use an authorised
 * local official asset only. Do not add placeholder organisations or logos.
 */
export const PARTNERSHIP_DIRECTORY = [];

export function getApprovedPartners(directory = PARTNERSHIP_DIRECTORY) {
  return directory.filter(partner =>
    PARTNERSHIP_CATEGORIES.includes(partner.category)
    && partner.status === "confirmed"
    && partner.agreementValidated === true
    && partner.publicationApproved === true
    && typeof partner.name === "string" && partner.name.trim()
    && partner.summary?.fr && partner.summary?.en
  ).map(partner => ({
    ...partner,
    logo: partner.logo?.publicationApproved === true
      && /^\/(?!\/)/.test(partner.logo.src || "")
      && partner.logo.width > 0 && partner.logo.height > 0
      ? partner.logo : null,
  }));
}
