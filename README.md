# SeedPlanter - Gardening Application

Seedplanter is a gardening application giving planters an all in one solution to journal, garden, and keep track of their plants

## Screenshots

<p align="center">
  <img src="https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/6f95472e-46bc-4001-836f-0a95151e3889" alt="Image 1" width="200"/>
  <img src="https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/a72cfeab-bb9f-4f67-9474-be4b04339da3" alt="Image 2" width="200"/>
  <img src="https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/3873f216-2e05-446d-ae3d-65d6437d1515" alt="Image 3" width="200"/>
  <img src="https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/58a6ee53-1e76-4c7d-9a23-18ef6e20a88a" alt="Image 4" width="200"/>
  <img src="https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/a704905e-17c4-49c1-8aaf-a751a700eaf6" alt="Image 5" width="200"/>
  <img src="https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/0e077756-8cd3-45d4-8ed3-357d1e5f05be" alt="Image 6" width="200"/>
  <img src="https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/1cff81f9-424c-46d4-ac9e-2e044d4821b0" alt="Image 7" width="200"/>
  <img src="https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/190bca39-e3d7-4839-8aaf-5c491e69cba7" alt="Image 8" width="200"/>
  <img src="https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/ea275e73-b653-435e-af06-c647b820b13f" alt="Image 9" width="200"/>
  <img src="https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/dabddd34-f806-4e91-bfd1-eb8828d04fac" alt="Image 10" width="200"/>
  <img src="https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/af0dbca5-2e4f-4f87-8989-44bb682bb79d" alt="Image 11" width="200"/>
</p>





## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.\
Download [expo go](https://docs.expo.dev/get-started/installation/)

```bash
cd Frontend
npm install
cd ../Backend
npm install
```
## Run

In order to run our application, you need to have expo and node installed.\
In the backend directory run the following commands
```bash
cd Backend
npm run devStart
cd ../Frontend
npx expo start
```

## Frontend .env Example:

Add a .env in the following format in the /Frontend.
Use EXPO_PUBLIC so that expo can read env variables.

`EXPO_PUBLIC_PORT="3000"`\
`EXPO_PUBLIC_IP="http://10.0.0.12"` (your IPv4)\
`EXPO_PUBlIC_DEPLOYMENT="deployment.url"`\
`EXPO_PUBLIC_LOCALHOST="http://localhost"`

example usage (no imports needed):

`const PORT = process.env.EXPO_PUBLIC_PORT;`

## Backend .env Example:

Add a .env in the following format in /Backend folder.

`PLANTDB_URL="mongodb+srv://user.your/mongo/url"`\
`OPENAI_API_KEY=""`\
`OPENAI_ORG_KEY=""`\
`JWT_SECRET="secret"`\
`PORT="3000"`<br>
`IP="http://10.0.0.12"` (your IPv4)\
`DEPLOYMENT="deployment.url"`\
`LOCALHOST="http://localhost"`

example usage:

`require("dotenv").config();`<br>
`const PORT process.env.PORT`




