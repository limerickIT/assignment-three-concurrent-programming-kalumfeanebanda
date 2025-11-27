import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enIE from "./en-IE.json";
import frFR from "./fr-FR.json";
import esES from "./es-ES.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            "en-IE": { translation: enIE },
            "fr-FR": { translation: frFR },
            "es-ES": { translation: esES }
        },
        lng: "en-IE",
        fallbackLng: "en-IE",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
