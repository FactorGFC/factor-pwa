// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  // para mi fiel /////
  APP_ID: '',
  APP_SECRET: '',
  URL_MIFIEL: '',
  // para mi fiel /////
  URL_SERVICIOS: 'https://dev.devfactorgfc.com/api/v1',
 // SECRET_KEY: '71e141d3a016ffd6bd94558a5bb80b15',
  SECRET_KEY: '93302eef21f513a83748e5104874bb7d',
  CLIENTE: 'FACTORGFCGLOBAL',
  firebase: {
    apiKey: 'AIzaSyDYG3emwtZxKZP_hyzL0vv4nOtzs80wDbM',
    authDomain: 'devfactoring.firebaseapp.com',
    databaseURL: 'https://devfactoring.firebaseio.com',
    projectId: 'devfactoring',
    storageBucket: 'devfactoring.appspot.com',
    messagingSenderId: '22228535082',
    appId: '1:22228535082:web:fa11da5b84bbee3b5a0053',
    measurementId: 'G-9H98G93ZF2'
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
