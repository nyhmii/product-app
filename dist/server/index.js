"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose")); //I noticed that this might be depreciated
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const RedisClient_1 = require("./utils/RedisClient");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
//my consts with defaults
const productApp = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'defaultdb';
RedisClient_1.redisClient.connect();
RedisClient_1.redisClient.on('ready', () => {
    console.log('Connected to Redis');
});
RedisClient_1.redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});
mongoose_1.default.connect(`${MONGODB_URI}/${MONGODB_DB_NAME}`)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
productApp.use((0, cors_1.default)());
productApp.use(express_1.default.json());
// Serve static files
productApp.use(express_1.default.static(path_1.default.join(__dirname, '..', 'client', 'public')));
// API routes
productApp.use('/api/products', productRoutes_1.default);
// Handle client-side routing for SPA
productApp.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'client', 'public', 'index.html'));
});
productApp.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});
productApp.listen(PORT, () => console.log(`Server running on port ${PORT}`));
