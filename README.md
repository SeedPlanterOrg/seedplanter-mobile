# SeedPlanter - Gardening Application

Seedplanter is a gardening application made by 4 UML students. Giving gardeners an all in one solution to journal, garden, and keep track of their plants

## Screenshots

![Image](https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/bb94a975-07f8-419c-879f-ec642ba769bc)
![Image](https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/ffffd3b1-d006-42d2-9a35-491ac2536e39)
![Image](https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/f9245b17-873c-44d9-acb6-a52f4c2279f6)
![Image](https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/8d35e7d9-cc3d-4987-b652-42e649a88da8)
![Image](https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/701842e5-2463-48e4-a1a1-d47ca40c7648)
![Image](https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/12339876-0050-4511-aa57-2894ec5a4e47)
![Image](https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/e0d4691d-016e-40f0-84f4-b7328a66ac89)
![Image](https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/f3f94668-9dcd-48ed-a2ea-0ad68400f90d)
![Image](https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/90d79703-2ec3-4825-8c0b-fec36523c4af)
![Image](https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/a0e5a381-1d7b-4209-8954-7b376760d712)
![Image](https://github.com/SeedPlanterOrg/seedplanter-mobile/assets/67339817/8c681d2a-826e-42c9-b024-b9a7eeab7c3b)



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

## Protecting Sensitive Information on GitHub
It is important that we do not expose privileged information on GitHub by way hard coded strings containing important information such as:  
* API keys   
* User names and passwords
* and anything else in our code that would allow user to gain access to sensitive information 
<br />
Due to this we will be using a `.env` files to create environmental variables.
`.env` files are files we add to the `.gitignore` files, that contain all our sensitive hardcoded texts. In the file we create environmental variables and assign them to out text. Then in the code only the environmental variables appear, not our strings. When we push changes to GitHub the .env file will be ignored.\
Use `require("dotenv").config();` to use environmental variables created in the `.env`.

See the following (https://codeburst.io/how-to-easily-set-up-node-environment-variables-in-your-js-application-d06740f9b9bd)

for more information

## License

[MIT](https://choosealicense.com/licenses/mit/)


