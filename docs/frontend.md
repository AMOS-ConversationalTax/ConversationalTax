# Getting Started - Frontend

## TL;DR
- Clone repository and open /frontend
- `npm i && npm run start`

## Getting Sarted

### General
- Clone the repository.
- Open a terminal and navigate into the /frontend folder
- Run `npm i` and grab a cup of coffee. (You need to re-run this command everytime the dependencies inside the package.json have been changed.)

### Development with Expo
'Expo is a free and complete workflow for creating next-generation apps for iOS and Android'. By using Expo we don't need any kind of third party build tools, e.g. for iOS you would need XCode. 
- Begin the local development with `npm run start`. (You may need an expo account)
- Open the Expo App on your mobile phone and click on the project under "Recently in development"
- Inside VS Code, open frontend/components/Logo.tsx and change the size of the image. After a short delay you should also see the changes on your phone.
- Furthermore, you may also use an Android simulator. (Not tested yet)

### Testing & Linting
Before you push your changes into the repository, you may want to run the tests with `npm run test` as well as the linting with `npm run lint`. (You can see a list of all npm run X commands inside the package.json)

## TODO
- We need to create a set of relevant Lint-Rules. For example, sorting the imports alphabeticaly is not practical! 
