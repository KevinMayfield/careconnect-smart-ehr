// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  keycloak: {
    RootUrl: 'https://enterprisearchitecture-test.digital.nhs.uk/auth',
    authServerUrl: 'https://enterprisearchitecture-test.digital.nhs.uk/auth',
    realm : 'ReferenceImplementations',
    client_secret : 'KEYCLOAK_CLIENT_SECRET',
    client_id : 'ccri-cat'
  },
    login : 'LOGIN_URL',
  oauth2 : {
    eprUrl : 'https://purple.testlab.nhs.uk/smart-on-fhir-resource/STU3',
    client_id : 'nhs-smart-ehr',
    client_secret : 'SMART_OAUTH2_CLIENT_SECRET',
    cookie_domain: 'purple.testlab.nhs.uk'
  },
    apps: [
        {
            name: 'Cardiac',
            image: 'http://res.cloudinary.com/hvhxvnxtg/hrmkhyspg4vwptt5frzp',
            url: 'https://purple.testlab.nhs.uk/cardiac/launch.html',
            notes: 'The widely-used Reynolds Risk Score is used to estimate the 10-year cardiovascular risk of an individual. For patients and clinicians alike, this calculation is often reported in an esoteric, hard-to-read lab report.',
            source : 'Boston Children Hospital'
        },
        {
            name: 'Growth Chart',
            image: 'http://res.cloudinary.com/hvhxvnxtg/ywqghaezona4svfhiauq',
            url: 'https://purple.testlab.nhs.uk/gc/launch.html',
            notes: 'Interactive chart of childs growth over time',
            source : 'Boston Children Hospital'
        },
        {
            name: 'BP Centiles',
            image: 'http://res.cloudinary.com/hvhxvnxtg/jbhe0nfyl9tp5j4cueac',
            url: 'https://purple.testlab.nhs.uk/bp/launch.html',
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
