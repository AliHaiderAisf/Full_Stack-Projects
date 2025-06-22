import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

//Routes
import authRoutes from './routes/authRoutes.js';
import statRoutes from './routes/statRoutes.js';

const app = express();


// Middleware
app.use(cors());
app.use(express.json());






//Routes
app.use('/api/auth', authRoutes);
app.use('/api/stats', statRoutes);

dotenv.config();



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ DB connection failed:', err.message);
  process.exit(1);
});