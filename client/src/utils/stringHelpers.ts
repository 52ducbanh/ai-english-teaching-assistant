export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatPhonetic(phonetic: string): string {
  if (!phonetic) return "";
  const cleaned = phonetic.trim();
  if (cleaned.startsWith("/") && cleaned.endsWith("/")) return cleaned;
  return `/${cleaned}/`;
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

export function formatCount(count: number, unit = "mục"): string {
  return `${count} ${unit}`;
}
