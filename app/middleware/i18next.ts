import { unstable_createI18nextMiddleware } from "remix-i18next/middleware";
import en from "~/locales/en";
import es from "~/locales/es";
import pt_BR from "~/locales/pt_BR";

const languages = ["en", "es", "pt-BR"] as const;
export const supportedLanguages = [...languages];
export type Language = (typeof supportedLanguages)[number];
export const [i18nextMiddleware, getLocale, getInstance] =
  unstable_createI18nextMiddleware({
    detection: {
      supportedLanguages,
      fallbackLanguage: "en",
    },
    i18next: {
      resources: {
        en: { translation: en },
        es: { translation: es },
        "pt-BR": { translation: pt_BR },
      },
      // Other i18next options are available here
    },
  });
