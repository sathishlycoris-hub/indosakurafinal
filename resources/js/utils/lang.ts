export const getLangValue = (
  lang: "en" | "ja",
  en?: string | null,
  ja?: string | null
) => {
  if (lang === "ja") return ja ?? en ?? "";
  return en ?? ja ?? "";
};