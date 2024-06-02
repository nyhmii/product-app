"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const RedisClient_1 = require("../utils/RedisClient");
const router = express_1.default.Router();
// Read all products (including caching)
router.get('/', async (req, res, next) => {
    try {
        const cachedProducts = await RedisClient_1.redisClient.get('products');
        if (cachedProducts) {
            return res.json(JSON.parse(cachedProducts));
        }
        const products = await Product_1.default.find();
        await RedisClient_1.redisClient.set('products', JSON.stringify(products));
        res.json(products);
    }
    catch (error) {
        next(error); // Pass the error to the next middleware (global error handler)
    }
});
// Create a new product
router.post('/', async (req, res, next) => {
    const { name, price, description } = req.body;
    try {
        const product = new Product_1.default({ name, price, description });
        await product.save();
        res.status(201).json(product);
    }
    catch (error) {
        next(error); // Pass the error to the next middleware (global error handler)
    }
});
// Read a single product by ID
router.get('/:id', async (req, res, next) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        next(error); // Pass the error to the next middleware (global error handler)
    }
});
// Update a product by ID
router.put('/:id', async (req, res, next) => {
    const { name, price, description } = req.body;
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            await product.save();
            res.json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        next(error); // Pass the error to the next middleware (global error handler)
    }
});
// Delete a product by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (product) {
            await product.deleteOne(); // Use delete method instead of remove
            res.json({ message: 'Product removed' });
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        next(error); // Pass the error to the next middleware (global error handler)
    }
});
exports.default = router;
