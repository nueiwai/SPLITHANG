import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose, { set } from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoutes.js';
import contactsRoutes from './routes/ContactRoutes.js';
import setupSocket from './socket.js';
import messagesRoutes from './routes/MessagesRoutes.js';
import groupRoutes from './routes/GroupRoutes.js';


// hosting
import path from 'path';
import { fileURLToPath } from 'url';

// resolve path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

// use frontend build folder
app.use( path.join(__dirname, '../frontend/dist'));

// render client for any route
app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// load environment variables
dotenv.config();

// environment Variables
const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;


// for different front-end and back-end server
app.use(cors({
  origin:[process.env.ORIGIN],
  methods:['GET','POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

// handle preflight request
app.options('*', cors({
  origin: [process.env.ORIGIN],
  methods: ['GET','POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));


// cookie parser
app.use(cookieParser());

// enable json data in request body
app.use(express.json());

// file upload path
app.use("/uploads/files", express.static("uploads/files"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts",contactsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/groups", groupRoutes);

// server configuration
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);

// socket.io
setupSocket(server);

// database connection
async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log('DB connected');
  } catch (error) {
    console.log(error);
    console.log('DB connection failed');
  }
}

connectDB();
