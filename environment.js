/*****************************
* environment.js
* path: '/environment.js' (root of your project)
******************************/

import Constants from 'expo-constants'
import { Platform } from "react-native";

const localhost =
 Platform.OS === "ios" ? "localhost:8080" : "192.168.0.104:3333/api";

const ENV = {
 dev: {
   apiUrl: localhost,
   amplitudeApiKey: null,
 },
 staging: {
   apiUrl: "[your.staging.api.here]",
   amplitudeApiKey: "[Enter your key here]",
   // Add other keys you want here
 },
 prod: {
   apiUrl: "[your.production.api.here]",
   amplitudeApiKey: "[Enter your key here]",
   // Add other keys you want here
 }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
 // What is __DEV__ ?
 // This variable is set to true when react-native is running in Dev mode.
 // __DEV__ is true when run locally, but false when published.
 if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
   return ENV.dev;
 } else if (env === 'staging') {
   return ENV.staging;
 } else if (env === 'prod') {
   return ENV.prod;
 }
};

export default getEnvVars;