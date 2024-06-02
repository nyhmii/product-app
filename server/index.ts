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

// Log Redis connection success
redisClient.on('ready', () => {
  console.log('Connected to Redis');
});

// Log Redis connection errors
redisClient.on('error', (err) => {
  console.log('Redis Client Error:', err);
});

// MongoDB connection
mongoose.connect(MONGODB_URI);

// Check if connection is successful
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
productApp.use(cors());
productApp.use(express.json());

// Mount product routes
productApp.use('/api/products', productRoutes);

// Serve static files from the React build directory
productApp.use(express.static(path.join(__dirname, 'client', 'build')));

// Handle requests to any other route by serving the client's index.html
productApp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Error handling middleware
productApp.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
productApp.listen(PORT, () => console.log(`Server running on port ${PORT}`));
