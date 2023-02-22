/*eslint-disable */
// //the linter generates an error about App.default.  Imported JSX component default must be in PascalCase or SCREAMING_SNAKE_CASE  react/jsx-pascal-case
// //However this is what React needs to render the app.
import React from 'react';
import { render } from 'react-dom';
//import { Api } from 'Utils/api';
//import * as Sentry from '@sentry/react';
//import { Integrations } from '@sentry/tracing';

// Sentry integration on production, staging, and qa
// if (window.location.hostname !== 'test.rocketplantech.com') {
//   Sentry.init({
//     dsn: 'https://cc9581db4cc94680a8ede2385b796888@o537211.ingest.sentry.io/5662701',
//     integrations: [new Integrations.BrowserTracing()],
//     environment: process.env.NODE_ENV === 'production' ? 'production' : 'qa',
//     // We recommend adjusting this value in production, or using tracesSampler
//     // for finer control
//     tracesSampleRate: 1.0,
//   });
// }
// Need to get the google api loaded
//const script = document.createElement(`script`);
//script.src = process.env.REACT_GOOGLE_API;
//document.body.appendChild(script);
//Add an event listener for the script tag.  This will ensure that the Google api is loaded before the app
//Make the callback async so we can use the await keyword, when importing the App component
//script.addEventListener(`load`, async () => {
  //We need to dynamically import the App component, after the google maps api has been loaded.
  //This prevents the error Uncaught ReferenceError: google is not defined.
  //Ie, in the maps.ts file, this error will occur if the api has not be instantiated
  //before the App component is rendered.
  //Api.csrfHeader().then(async (exists: boolean) => {
    //if (exists) {
      //Dynamically import the App component
(async() => {
      const App = await import('./app');
      render(<App.default />, document.getElementById('app'));
      return;
}
)();
    //}
    //Todo we need to create an error page with contact info for support
  //  alert('Please contact support.  The application cannot load.');
  //});
//});
