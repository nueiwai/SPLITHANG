import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoutes.js';
import contactsRoutes from './routes/ContactRoutes.js';

dotenv.config();

// environment Variables
const app = express();
const PORT = process.env.PORT || 3001;
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

// routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts",contactsRoutes);

// server configuration
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);


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
