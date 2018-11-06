import i18next from 'i18next';


i18next
    .init({
        interpolation: {
            // React already does escaping
            escapeValue: false,
        },
        lng: 'no', // 'en' | 'es'

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
                    MATCHES: "Matches",                
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

                
                },
            },
            no: {
                translation: {
                    PLAYERS: "Spillere",
                    TEAMS: "Lag",
                    MANAGERS: "Trenere",
                    MANAGER: "Trener",
                    MATCHES: "Kamper",
                    MATCH: "Kamp",
                    STADIUMS: "Stadiums",
                    LOCATION: "Plassering",
                    NAME: "Navn",
                    TEAM: "Lag",
                    LOG_IN: "Logg inn",
                    REGISTER: "Registrer",
                    MATCHES: "Kamper",
                },
            },
        },
    })

export default i18next