# product-app

Overview:
Product-App is a basic NoSQL CRUD application for managing products. It allows you to add, update, and delete products. The backend is built using Node.js, Express, and MongoDB, while the frontend is created with React. Redis is used for caching to improve performance.


Table of Contents
    Installation
    Prerequisites
    Setup
    Usage
    Scripts
    Project Structure
    Dependencies

Installation:
Prerequisites:
Ensure you have the following installed on your local machine:

Node.js (v14.x or later)
Yarn (v1.22.x or later)
MongoDB
Redis

Setup:
    git clone https://github.com/#YourUser/product-app.git
    cd product-app

    server:
    cd server
    yarn install

    client:
    cd ../client
    yarn install

    Redis:
    On Windows (using WSL)
    sudo service redis-server start

    on https://app.redislabs.com/#/login
    Create an account or log into your account and create a free db.


Create a .env file in the server directory and add your environment variables
- touch server/.env or add a .env file

default:(you are welcome to use my redis server)
PORT=5000
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=ProductApp
REACT_APP_REDIS_HOST=redis-17813.c11.us-east-1-2.ec2.redns.redis-cloud.com
REACT_APP_REDIS_PORT=17813
REACT_APP_REDIS_PASSWORD=leF3hDWC2Am0vm38X9VOat42JgitPxwG

build and run the project:
cd ../
yarn start

Scripts
In the root directory, the following npm scripts are available:

    Main
    start: Concurrently starts the client and server.
    dev: Starts the server in development mode using ts-node-dev.
    client: Starts the client application.
    build: Compiles the TypeScript code.
    test: Runs tests for the client application.
    eject: Ejects the create-react-app configuration.
    
    Server
    Located in the server directory, it has its own package.json with these scripts:
    
    start: Starts the server in development mode using ts-node-dev.
    dev: Starts the server in development mode using ts-node-dev.
    build: Compiles the TypeScript code.
    client: Starts the client application.
    server: Starts the server in development mode using ts-node-dev.
    
    Client
    Located in the client directory, it has its own package.json with these scripts:
    
    start: Starts the client application.
    build: Builds the client application for production.

ex. yarn start or yarn dev

Project structure:


product-app/

├── client/

│   ├── public/

│   ├── src/

│   ├── package.json

│   └── ...

├── server/

│   ├── models/

│   ├── routes/

│   ├── utils/

│   ├── index.ts

│   ├── package.json

│   └── ...

├── package.json

└── ...



Dependencies:
Main Dependencies:

yarn add concurrently

yarn add body-parser express mongoose redis

yarn add @types/node @types/express @types/mongoose ts-node-dev typescript -D

yarn add @babel/plugin-proposal-private-property-in-object @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/jest @types/node @types/react @types/react-dom react react-dom react-scripts react-tabs typescript web-vitals



Dev Dependencies:

@types/cors: ^2.8.17

@types/dotenv: ^8.2.0

@types/express: ^4.17.21

@types/mongodb: ^4.0.7

@types/node: ^20.13.0

@types/react: ^18.3.3

@types/react-dom: ^18.3.0

@types/react-router-dom: ^5.3.3

ts-node-dev: ^2.0.0

typescript: ^5.4.5

concurrently: ^7.0.0



