## Mobile App Development II -- COMP.4631 Honor Statement
The practice of good ethical behavior is essential for maintaining good order in the classroom, providing an enriching learning experience for students, and training as a practicing computing professional upon graduation. This practice is manifested in the University's Academic Integrity policy. Students are expected to strictly avoid academic dishonesty and adhere to the Academic Integrity policy as outlined in the course catalog. Violations will be dealt with as outlined therein. All programming assignments in this class are to be done by the student alone unless otherwise specified. No outside help is permitted except the instructor and approved tutors.
     
I certify that the work submitted with this assignment is mine and was generated in a manner consistent with this document, the course academic policy on the course website on Blackboard, and the UMass Lowell academic code.

Date: 3/28/2021
Name: Dan Bergeron, Anthony Kitowicz, Erson Ramirez, Shivam Patel


# SeedPlanter - Gardening Application

Seedplanter is a gardening application made by 4 UML students. Giving gardeners an all in one solution to journal, garden, and keep track of their plants

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


