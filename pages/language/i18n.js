import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
// we init with resources
resources: {
en: {
translations: {
"PLAYERS": "Players",
"TEAMS": "Teams",
"MANAGERS": "Managers",
"MANAGER": "Manager",
"MATCHES": "Matches",
"MATCH": "Match",
"STADIUMS": "Stadiums",
"LOCATION": "Location",
"NAME": "Name",
"TEAM": "Team",
"LOG_IN": "Log in",
"REGISTER": "Register",
"MATCHES": "Matches",
"PLAYERS": "Players"
}
},
no: {
translations: {
"PLAYERS": "Spillere",
"TEAMS": "Lag",
"LOG_IN": "Logg inn",
"REGISTER": "Registrer"
}
}
},
fallbackLng: "en",
debug: true,

// have a common namespace used around the full app
ns: ["translations"],
defaultNS: "translations",

keySeparator: false, // we use content as keys

interpolation: {
escapeValue: false, // not needed for react!!
formatSeparator: ","
},

react: {
wait: false
}
});

export default i18n;
