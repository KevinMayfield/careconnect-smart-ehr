// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  oauth2 : {
     eprUrl : 'https://purple.testlab.nhs.uk/ccri-smartonfhir/STU3',
     client_id : 'nhs-smart-ehr',
     client_secret : 'SMART_OAUTH2_CLIENT_SECRET',
     cookie_domain: 'purple.testlab.nhs.uk'
   },
    login : 'https://purple.testlab.nhs.uk/cat/login',
    apps: [
        {
            name: 'Cardiac',
            image: 'http://res.cloudinary.com/hvhxvnxtg/hrmkhyspg4vwptt5frzp',
            url: 'http://127.0.0.1:8000/launch.html?iss=http://localhost:9090/careconnect-gateway-secure/STU3&launch=',
            notes: 'The widely-used Reynolds Risk Score is used to estimate the 10-year cardiovascular risk of an individual. For patients and clinicians alike, this calculation is often reported in an esoteric, hard-to-read lab report.',
            source : 'Boston Children Hospital'
        },
        {
            name: 'Growth Chart',
            image: 'http://res.cloudinary.com/hvhxvnxtg/ywqghaezona4svfhiauq',
            url: 'http://127.0.0.1:8000/launch.html',
            notes: 'Interactive chart of childs growth over time',
            source : 'Boston Children Hospital'
        },
        {
            name: 'BP Centiles',
            image: 'http://res.cloudinary.com/hvhxvnxtg/jbhe0nfyl9tp5j4cueac',
            url: 'http://127.0.0.1:8000/launch.html',
            notes: 'BP Centiles app, includes a modern and responsive touch-friendly interface for tablets with light and dark themes.',
            source : 'Boston Children Hospital'
        },
        {
            name: 'QRisk',
            image: 'https://avatars2.githubusercontent.com/u/841981?s=200&v=4',
            url: 'https://54.201.252.26/csp/qrisk/launch.html',
            notes: 'QRisk by J2 Interactive',
            source : 'J2 Interactive'
        },
        {
            name: 'SMART on FHIR Developer App 1',
            image: 'https://content.hspconsortium.org/images/my-web-app/logo/my.png',
            url: 'http://localhost:4202/launch',
            notes: 'Launches SMART on FHIR App on http://localhost:4202/launch',
            source : 'SMART on FHIR Developers'
        },
        {
            name: 'SMART on FHIR Developer App 2',
            image: 'https://content.hspconsortium.org/images/my-web-app/logo/my.png',
            url: 'http://127.0.0.1:4000/child-measurements/launch',
            notes: 'Launches SMART on FHIR App on http://127.0.0.1:4000/child-measurements/launch',
            source : 'SMART on FHIR Developers'
        }
    ]

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
