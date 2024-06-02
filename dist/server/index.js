"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const RedisClient_1 = require("./utils/RedisClient");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
dotenv.config();
const productApp = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
RedisClient_1.redisClient.connect();
// Log Redis connection success
RedisClient_1.redisClient.on('ready', () => {
    console.log('Connected to Redis');
});
// Log Redis connection errors
RedisClient_1.redisClient.on('error', (err) => {
    console.log('Redis Client Error:', err);
});
// MongoDB connection
mongoose_1.default.connect(MONGODB_URI, {
// Remove useUnifiedTopology option
});
// Check if connection is successful
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB');
});
productApp.use((0, cors_1.default)());
productApp.use(express_1.default.json());
productApp.use('/api/products', productRoutes_1.default);
// Serve static files from the React build directory
productApp.use(express_1.default.static(path_1.default.join(__dirname, 'client', 'build')));
// Handle requests to any other route by serving the client's index.html
productApp.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'client', 'build', 'index.html'));
});
productApp.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});
productApp.listen(PORT, () => console.log(`Server running on port ${PORT}`));
