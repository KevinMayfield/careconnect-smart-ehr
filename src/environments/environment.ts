// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  keycloak: {
    RootUrl: 'http://localhost:8080/auth',
    authServerUrl: 'http://localhost:8080/auth',
    realm : 'ReferenceImplementations',
    client_secret : '8d9bad99-5478-49d7-936b-3724af6b3f72',
    client_id : 'smart-ehr'
  },
  oauth2 : {
    eprUrl : 'http://127.0.0.1:9090/careconnect-gateway-secure/STU3',
    client_id : 'nhs-smart-ehr',
    client_secret : 'APa5oCe6SHhty_or2q34WpNcq0-X957n6p48TkAJw14YCtmZeQil60XvCfuByIPd8DlXyusxAGxp5_Z5UKlgZJU',
    cookie_domain : 'localhost'
  },
    login : 'http://localhost:4200',
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
          name: 'Developer App 1',
          image: 'https://content.hspconsortium.org/images/my-web-app/logo/my.png',
          url: 'http://localhost:4202/launch',
          notes: 'Launches SMART on FHIR App on http://localhost:4202/launch',
            source : 'You'
        },
        {
            name: 'Developer App 2',
            image: 'https://content.hspconsortium.org/images/my-web-app/logo/my.png',
            url: 'http://127.0.0.1:4000/child-measurements/launch',
            notes: 'Launches SMART on FHIR App on http://127.0.0.1:4000/child-measurements/launch',
            source : 'You'
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
