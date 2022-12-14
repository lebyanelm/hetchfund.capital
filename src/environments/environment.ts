// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // TEST: BACKEND SERVICES
  accounts: 'http://localhost:4000/accounts',
  translator: 'http://localhost:4001/translator',
  payments: 'http://localhost:4002/payments',
  farmhouse: 'http://localhost:4003/farmhouse',
  media_resources: 'http://localhost:4004/media-resources',

  // YOCO KEY
  YOCO_PUBLIC_KEY: 'pk_test_611663c4bVOW3qD3ffd4',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
