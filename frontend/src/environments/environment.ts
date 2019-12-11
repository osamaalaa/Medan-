// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  hmr: false,
  INVENTORY_API_URL:"http://localhost:9004",
  WORKFLOW_API_URL:"http://localhost:8001",
  TEMASYS:{
    appKey:"64147a97-e7d1-4599-9e08-cdb6ce57366e",
    secret:"sywzpryfuefaj"
  }
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
