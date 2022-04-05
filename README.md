# Overview

Express-Boilerplate is a basic application from where a developer can start a new service. It showcase all (or almost all) of the features or say best practices that we can use in an API.
# Technology Stack
 * [Node.js](https://nodejs.org) server.
 * [MongoDB](https://docs.mongodb.com/) database.
 * [mongoose](http://mongoosejs.com/) Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box for MongoDB.
 * [TypeScript](https://www.typescriptlang.org/docs/home.html)
 * [Express](https://expressjs.com/) node.js framework for building REST APIs
 * [Jest](https://jestjs.io/docs/en/getting-started) Jest is used to test Javascript frameworks
 * [Supertest](https://www.npmjs.com/package/supertest) provide a high-level abstraction for testing HTTP
# Getting Started - Setup
This section is for getting started with service on your development environment.
1. **Clone the repository**
  ```
  git clone <link>
  ```
2. **Install all the packages**
  ```
  npm install
   ``` 
  It will prompt for your github access token in order to install our inbuilt package.
3. **Change  envsample to .env** 
  - Put all your constant, credentials, and path etc here.
# Key Features
1. **User Module** This module is based on the user data with CRUD operation and user data is stored in MongoDB Collection.
  * `Crud Operation:` User Module contain total 5 API's 
  - GET(List) : It is used to fetch all the user data from the collection.
  - GET(byId) : It is used to fetch a particular user data from the collection.
  - POST : It is used to create a new user data in the collection.
  - PUT : It is used to update the previous user data in the collection.
  - DELETE : It is used to delete the existing user data from the collection.
  * `Registration and Login` It is used to register the new user and than login through the same credenatials.
  - POST : It is used to Register the new user using email and passoword in the collection.
  - POST : It is used to login and get the token using the register user email and password.
  * `Redis` Redis is an open-source (BSD licensed), in-memory data structure store used as a database, and cache.
  - SetRedis Value : It is used to set the Redis value in the cache memory.
  - GetRedis Value : It is used to get the Redis value in the cache memory.
2. **ToDO Module** This module is based on the ToDO list with CRUD operation and list is stored in MongoDB collection.  
  * `CRUD Operation:` ToDo Module contain total 5 API's.
3. **InBuilt Package** We have two custom npm package which is response-handler and logger.
  - Response-handler :It is a basic inbuilt package used to handle the informative messages. It handle all (or almost all) of the responses. 
  - logger : It is a basic inbuilt package used to handle the system logs. It handle all (or almost all) of the logs. 
4. **Swagger** Swagger UI to generate interactive API documentation that lets your users try out the API calls directly in the browser.
# Running the app
 ```
 npm run start
  ```
# Testing
We use unit tests with [Jest](https://github.com/facebook/jest) in this project.

- To run tests
  ```
  npm run test
  ```
- To run test in watch mode
  ```
  npm run test:w
  ```  
# Linting
We also use [Eslint](https://github.com/eslint/eslint) with Typescript Standard Style.
- To run lint:
  ```
  npm run lint
  ```
- To fix the error automatically
  ```
  npm run lint:fix
  ```
# CI Integration
  - TODO
### Guidelines - must be followed strictly
  - Developer must enable pre-commit and pre-push hooks
  ```
  npx husky add .husky/pre-commit "npm run lint"
  ```
  ```
  npx husky add .husky/pre-push "npm run lint"
  ```
  - Developer must commit his tasks at the end of the day, even if the task has not been completed
  - Developer must create a pull request at the end of day, even if the task has not been completed, with a SUFFIX in subject name as `[WIP]:` e.g 
  `[WIP]: Setup of Jest with first unit test`
### IDE
Our preferred IDE is `VSCODE`
Please enable following plugins for your editor:
- **EditorConfig:** To enable reading of .editorconfig file for consistent coding convention.
- **Eslint:** For linting errors
close
