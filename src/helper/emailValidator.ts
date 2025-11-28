export const ALLOWED_PROVIDERS = [
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "yahoo.com",
  "icloud.com",
  "me.com",
  "protonmail.com",
  "aol.com",
];

export function getEmailDomain(email: string) {
  return email.split("@")[1]?.toLowerCase();
}

export function isAllowedEmail(email: string) {
  const domain = getEmailDomain(email);
  if (!domain) return false;
  return ALLOWED_PROVIDERS.includes(domain);
}
