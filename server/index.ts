import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import { redisClient } from './utils/RedisClient';
import path from 'path';
import cors from 'cors';

dotenv.config();

const productApp = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

redisClient.connect();

redisClient.on('ready', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

mongoose.connect(MONGODB_URI) //{ useNewUrlParser: true, useUnifiedTopology: true }
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

productApp.use(cors());
productApp.use(express.json());

// Serve static files
productApp.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// API routes
productApp.use('/api/products', productRoutes);

// Handle client-side routing for SPA
productApp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
});

productApp.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

productApp.listen(PORT, () => console.log(`Server running on port ${PORT}`));
