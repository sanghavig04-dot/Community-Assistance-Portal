import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import requestRoutes from './routes/requestRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// create uploads folder if not exists
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

// ✅ root route (for testing)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

// ✅ connect DB first, then start server
connectDB().then(() => {
  app.use('/uploads', express.static('uploads'));
  app.use('/api/auth', authRoutes);
  app.use('/api/requests', requestRoutes);

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("DB connection failed:", err);
});
