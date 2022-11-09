# Coding Challenge for Full Stack Engineers

## Requirements
- React 
- Any state management library. Redux is preferred, but no penalty for using other state management libraries. No props drilling
- MongoDB or Firestore database
- Node.JS
- Express.JS

You have 14 days upon receiving this test to complete and submit it back to us

## Instructions
The purpose of this code challenge is to build an admin dashboard with authentication protection and the ability to add new products.

1. Clone this repository and create your own GitHub repository.
2. Push your git repository to GitHub.
3. Initialize a new React project and Node.JS project. 
4. The website should make API calls to the Node.JS app and not interact with the database directly.
5. Create the login page with the following features: 
   - Text inputs for email and password.
   - Submit button.
   - Show an error message for incorrect credentials.
   - Make the page responsive for mobile and desktop devices.
   - Redirect to the admin dashboard page (to be built in the next step) for correct credentials.
6. Build the admin dashboard page:
   - Show a list of products (the products should be fetched from a database). Each product has the following data: SKU, title and image.
   - Add the option to add a new product (should be added to the database as well).
   - Add the option to edit an existing product (should be edited in the database as well).
   - Add the option to remove an existing product (should be removed from the database as well).
   - Add a logout button that redirects to the login page. 
   - Make the page responsive for mobile and desktop devices.
7. When you are done, send us the link to your GitHub repository with a clear readme file and also deploy it on a small server such as Heroku/Vercel and send us the link to test

## Bonus
Bonus points for adding a search bar in the admin dashboard to search for products. 

## Design

![Design](https://raw.githubusercontent.com/Tingkai911/Coding-Challenge-for-Full-Stack-Engineers/dev/mighty%20jax.drawio.png)

## Environment Variables
```text
NODE_ENV=development
PORT=8080
TEST_PASSWORD=
JWT_SECRET=
MONGO_URI=
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
```

## Running in Local
Backend only (with nodemon):
```text
npm run server
```
Backend only (without nodemon):
```text
npm run start
```
Frontend only:
```text
npm run client
```
Both backend and frontend:
```text
npm run dev
```
Seed/Import data in DB:
```text
npm run data:import
```
Delete data in DB:
```text
npm run data:destroy
```

## Build and Deploy
Step 1: Download Dependencies (backend and frontend respectively) and build react scripts
```text
npm install && npm install --prefix frontend && npm run build --prefix frontend
```
Step 2: Start the application
```text
node backend/server.js
```