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
                    login: "Login",
                    home: { label: 'Home', },
                    name: { label: 'Name', },
                },
            },
            no: {
                translation: {
                    login :"Logg inn",
                    home: { label: 'Hjem', },
                    name: { label: 'Navn', },
                },
            },
        },
    })

export default i18next