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
            url: 'https://purple.testlab.nhs.uk/cardiac/launch.html?iss=http://localhost:9090/careconnect-gateway-secure/STU3&launch=',
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
            name: 'Developer App 1',
            image: 'https://content.hspconsortium.org/images/my-web-app/logo/my.png',
            url: 'http://localhost:4202/launch',
            notes: 'Launches SMART on FHIR App on http://localhost:4202/launch',
            source : 'You'
        },
        {
            name: 'Developer App 2',
            image: 'https://content.hspconsortium.org/images/my-web-app/logo/my.png',
            url: 'http://localhost:4000/child-measurements/launch',
            notes: 'Launches SMART on FHIR App on http://localhost:4000/child-measurements/launch',
            source : 'You'
        }
    ]

};
