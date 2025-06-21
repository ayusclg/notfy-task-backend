<h1>Notfy Task Backend</h1>

A task management API built with Node.js, TypeScript, MongoDB, BullMQ, Redis JWT authentication, and Cloudinary for image handling. It allows users to create tasks and receive smart email reminders exactly at the scheduled time, even if reminders are updated later.

<h1>Technologies Used</h1>

Node.js

TypeScript

Express

MongoDB & Mongoose

Redis & ioredis

JWT for authentication

BullMQ for job queue and scheduling

Cloudinary for image uploads

Nodemailer for sending emails

Multer for file handling

Nodemon and ts-node for development

Setup Instructions
Prerequisites
Node.js (v16 or later recommended)

MongoDB instance

Redis server

Cloudinary account (for image handling)

SMTP email service credentials (for sending emails)

<h1>Installation</h1>
Clone the repository:git clone https://github.com/ayusclg/notfy-task-backend.git

cd notfy-task-backend

Install dependencies:npm install






<h1>Environment Variables</h1>
Create a .env file in the root directory and add the following environment variables:
<li>PORT=3000</li>
<li>>MONGODB_URI=your_mongodb_connection_string</li>
<li>REDIS_URL=your_redis_connection_string</li>
<li>JWT_SECRET=your_jwt_secret</li>
<li>CLOUDINARY_CLOUD_NAME=your_cloud_name</li>
<li>CLOUDINARY_API_KEY=your_api_key</li>
<li>CLOUDINARY_API_SECRET=your_api_secret</li>
<li>EMAIL_USER=your_email_user</li>
<li>EMAIL_PASS=your_email_password </li>



<h1>Build the project</h1>
<li>Start the development server with automatic reload: <h3>npm run build</h3></li>
<li>Run the built project:<h3>npm run start</h3></li>



<h2>Other source files under src/ for routes, controllers, models, middlewares, and utilities</h2>

