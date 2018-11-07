import i18nextConfig from 'i18next';
import lngDetect from 'i18next-browser-languagedetector';


i18nextConfig
    .use(lngDetect)
    .init({
        debug:false,
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
            //escapeValue: false,
        },
        //lng: 'no', // 'en' | 'es'
        resources: {
            en: {
                translation: {
                    login: "Login",
                    home: { label: 'home', },
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
        }

    });

export default i18nextConfig;