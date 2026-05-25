# market_basket_analysis

A Full Stack Market Basket Analysis Web Application built using:

React.js
Node.js
Express.js
MySQL
Apriori Algorithm
Bootstrap
JWT Authentication

# This project allows users to:

✅ Signup & Login
✅ Upload CSV Transaction Dataset
✅ Generate Apriori Association Rules
✅ View Rule History
✅ Visualize Market Basket Insights
✅ Manage Profile & Settings
✅ Dark/Light Theme Support
✅ Download Generated Rules

# Features

* Authentication System
* Dashboard
* Dataset Upload
* Apriori Analysis
* Visualization Module
* Rule History
* Settings Module
* Profile Module

# Modules Included

* User Authentication Module
* Dashboard Module
* Dataset Upload Module
* Apriori Analysis Module
* Rule History Module
* Visualization Module
* Settings Module
* Profile Management Module

# Frontend Technologies

React.js
React Router DOM
Axios
Bootstrap
Chart.js
CSS

# Backend Technologies

Node.js
Express.js
MySQL
JWT
bcryptjs
multer
csv-parser

# Project Structure

* Backend Structure

backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── utils/
├── server.js
├── package.json
└── .env

* Frontend Structure

frontend/
│
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js

# Installation Steps
1. Clone Repository
git clone <repository-link>

* Backend Setup

2. Move to Backend Folder
    cd backend

3. Install Backend Dependencies
    npm install
    npm install express mysql2 cors dotenv bcryptjs jsonwebtoken multer csv-parser nodemon
4. Start Backend Server
    npm run dev

Backend runs on:

http://localhost:5000
* Frontend Setup

5. Open New Terminal

Move to frontend folder:

cd frontend

6. Install Frontend Dependencies
npm install
npm install axios react-router-dom bootstrap chart.js react-chartjs-2

7. Run Frontend
npm run dev

Frontend runs on:

http://localhost:5173

# How to Use

Step 1:Open application in browser.
Step 2:Signup or Login to continue.
Step 3:Upload CSV dataset file.
Step 4:Generate Apriori rules.
Step 5:
View:
Association Rules
Visualizations
Rule History
CSV Dataset Format

* Example:

Milk,Bread,Butter
Bread,Butter,Jam
Milk,Bread
Eggs,Milk,Bread
Tea,Biscuits
