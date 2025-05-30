# HireSphere Portal (Kibit Home Assignment)
[![Build status](https://ci.appveyor.com/api/projects/status/e1xehleqr7yn7do9/branch/main?svg=true)](https://ci.appveyor.com/project/Sholtee/hiresphere/branch/main)
![AppVeyor tests](https://img.shields.io/appveyor/tests/sholtee/hiresphere/main)

## Prerequisites
- Node.js v22.12.0+
- npm

## Folder structure
```
root
│
└───artifacts [test ouputs]
│
└───docs [related documents]
│
└───public [static assets that are served as-is (not processed by Vite)]
│   │
│   └───resources [i18n]
│
└───scripts [Vite plugins & Fake-API]
│   │
│   └───fake-api
│
└───src [sources root]
│   │
│   └───assets [assets that might be embedded]
│   │
│   └───components [Vue components]
│   │   │
│   │   └───views [pages of the app]
│   │   │
│   │   └───widgets [generic components]
│   │
│   └───scripts [non component-specific JS files]
│   │
│   └───styles [non component-specific SASS styles]
│
└───tests [E2E tests]
```

## Setting up the environment
- install [Node.js](https://nodejs.org/dist/v22.12.0/node-v22.12.0-x64.msi )
- `npm install` (this will install the fake API dependencies as well)

## Adding custom test data
- delete the `./scripts/fake-api/fakeapi.db` file if exists
- edit the [test-data.sql](https://github.com/Sholtee/hiresphere/blob/main/scripts/fake-api/test-data.sql)
- start the debug server

## Running the debug server
- `npm run serve` (this will execute the linter checks as well as starts the fake API)

## Running the E2E tests
- `npm run cypress:open` (this will start the fake API and feeds [Cypress](https://www.cypress.io/) with the **production** assets)