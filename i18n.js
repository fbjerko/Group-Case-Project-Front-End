import i18next from 'i18next';

i18next
    .init({
        interpolation: {
            // React already does escaping
            escapeValue: false,
        },
        lng: 'no', // 'en' | 'es'
        // Using simple hardcoded resources for simple example
        resources: {
            en: {
                translation: {
                    age: { label: 'Age', },
                    home: { label: 'Home', },
                    name: { label: 'Name', },
                },
            },
            no: {
                translation: {
                    age: { label: 'Alder', },
                    home: { label: 'Hjem', },
                    name: { label: 'Navn', },
                },
            },
        },
    })

export default i18next