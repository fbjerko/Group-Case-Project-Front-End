import i18next from 'i18next';
import lngDetect from 'i18next-browser-languagedetector';


i18next
    .use(lngDetect)
    .init({
        debug:true,
        detection:{
            // order and from where user language should be detected
            order: ['localStorage','cookie','querystring', 'navigator', 'htmlTag', 'path', 'subdomain'],

            // keys or params to lookup language from
            lookupQuerystring: 'lng',
            lookupCookie: 'lng',
            lookupLocalStorage: 'lng',
            lookupFromPathIndex: 0,
            lookupFromSubdomainIndex: 0,

            // cache user language on
            caches: ['cookie','localStorage'],
            excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

            // optional expire and domain for set cookie
            cookieMinutes: 10,
            cookieDomain: 'football-manager'


            // optional htmlTag with lang attribute, the default is:
            //htmlTag: document.documentElement
        },
        interpolation: {
            // React already does escaping
            escapeValue: false,
        },
        //lng: 'no', // 'en' | 'es'
        fallbackLng: [ 'en' ],
        resources: {
            en: {
                translation: {

                    PLAYERS: "Players",
                    TEAMS: "Teams",
                    MANAGERS: "Managers",
                    MANAGER: "Manager",
                    MATCHES: "Matches",
                    MATCH: "Match",
                    STADIUMS: "Stadiums",
                    LOCATION: "Location",
                    NAME: "Name",
                    TEAM: "Team",
                    LOG_IN: "Log in",
                    REGISTER: "Register",
                    GENERAL: "General",
                    ADDRESS: "Address",
                    GOAL_TYPES: "Goal types",
                    PERSONS: "Persons",
                    PERSON: "Person",
                    OWNERS: "Owners",
                    OWNER: "Owner",
                    RET_GENERAL: "Return to General",
                    SEASONS: "Seasons",
                    SEASON: "Season",
                    USERS: "Users",
                    ASSOCIATION: "Associaion",
                    ASSOCIATIONS: "Associations",
                    CREATE: "Create",
                    BACK: "Back",
                    EMAIL: "Email",
                    PASS: "Password",
                    REP_PASS: "Repeat Password",
                    USERNAME: "Username",
                    ENTER: "Enter",
                    EDIT_ACC: "Edit account",
                    LOADING: "Loading...",
                    POSTAL_CODE: "Postal code",
                    NEW: "new",
                    CITY: "City",
                    OPTIONAL: "Valgfritt",
                    COUNTRY: "Country",
                    SUBMIT: "Submit",
                    DESC: "Description",
                    CONTACT: "Contact",
                    DETAIL: "Detail",
                    TYPE: "Type",
                    GOAL: "Goal",
                    DATE: "Date",
                    FIRST: "First",
                    LAST: "Last",
                    OF_BIRTH: "of birth",
                    NUMBER: "Number",
                    POSITION: "Position",
                    START: "Start",
                    END: "End",
                    EDIT: "Edit",
                    DELETE: "Delete",
                    USER: "User",
                    AUTH: "Authenticating",
                    FAIL: "failed",
                    FILL_USER: "Fill out user information",
                    CREATING_USER: "Creating user",
                    CREATING_FAILED: "Failed creating user!",
                    USER_CREATED: "User created",

                },
            },
            no: {
                translation: {
                    PLAYERS: "Spillere",
                    TEAMS: "Lag",
                    MANAGERS: "Trenere",
                    MANAGER: "Trener",
                    MATCH: "Kamp",
                    STADIUMS: "Stadiums",
                    LOCATION: "Lokasjon",
                    NAME: "Navn",
                    TEAM: "Lag",
                    LOG_IN: "Logg inn",
                    REGISTER: "Registrer",
                    MATCHES: "Kamper",
                    GENERAL: "Generelt",
                    ADDRESS: "Addresse",
                    GOAL_TYPES: "Mål type",
                    PERSONS: "Personer",
                    PERSON: "Person",
                    OWNERS: "Eiere",
                    OWNER: "Eier",
                    RET_GENERAL: "Tilbake til generelt",
                    SEASONS: "Sesonger",
                    SEASON: "Sesong",
                    USERS: "Brukere",
                    ASSOCIATION: "Forbund",
                    ASSOCIATIONS: "Forbund",
                    CREATE: "Opprett",
                    BACK: "Tilbake",
                    EMAIL: "Epost",
                    PASS: "Passord",
                    REP_PASS: "Gjenta Passord",
                    USERNAME: "Brukernavn",
                    ENTER: "Skriv inn",
                    EDIT_ACC: "Rediger konto",
                    LOADING: "Laster...",
                    POSTAL_CODE: "Post nummer",
                    NEW: "Ny",
                    CITY: "By",
                    OPTIONAL: "Valgfritt",
                    COUNTRY: "Land",
                    SUBMIT: "Send inn",
                    DESC: "Beskrivelse",
                    CONTACT: "Kontakt",
                    DETAIL: "Detalj",
                    TYPE: "Type",
                    GOAL: "Mål",
                    DATE: "Dato",
                    FIRST: "For",
                    LAST: "Etter",
                    DATE_OF_BIRTH: "Fødselsdato",
                    NUMBER: "Nummer",
                    POSITION: "Posisjon",
                    START: "Start",
                    END: "Slutt",
                    EDIT: "Endre",
                    DELETE: "Slett",
                    USER: "Bruker",
                    AUTH: "Autentisering",
                    FAIL: "feilet",
                    FILL_USER: "Fyll ut bruker information",
                    CREATING_USER: "Oppretter bruker",
                    CREATING_FAILED: "Oppretting feilet",
                    USER_CREATED: "Bruker opprettet",

                },
            },
        }

    });

export default i18next;