# Incident Management Web App Challenge

This document is a very brief summary on how to run the app, and how to deploy it. It assumes the app has been already preconfigured. It also assumes the reader has some familiarity with Angular and Firebase. Is not intended to be an exhaustive tutorial on how to generally create and run Angular apps that use Firebase as Backend and Hosting.

## How to run
Is a plain angular app. It only uses Client Side Rendering. So running it is straightforward:
1. Make sure to have npm installed
2. Run "npm install" inside the root folder of the project (the one containing "src" directory)
3. Run "npm start" to run locally
4. Run "ng build" to build the project. As you can see in angular.json file, output will go to "dist" folder, which is the default behaviour.

## How to deploy
1. Make sure to have Firebase CLI installed. You can install it with npm using `npm install -g firebase-tools`
1. Log in into your firebase account with command `firebase login`
1. To deploy your local copy, run `ng build`, and then `firebase deploy --only hosting`. Both firebase.json and angular.json are configured to (a) compile the app code into dist folder, and (b) deploy the code in that dist folder