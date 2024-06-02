import express from 'express';
import Product, { IProduct } from '../models/Product';
import { redisClient } from '../utils/RedisClient';

const router = express.Router();

// Read all products (including caching)
router.get('/', async (req, res, next) => {
  try {
    const cachedProducts = await redisClient.get('products');
    if (cachedProducts) {
      return res.json(JSON.parse(cachedProducts));
    }

    const products = await Product.find();
    await redisClient.set('products', JSON.stringify(products));
    res.json(products);
  } catch (error) {
    next(error); // Pass the error to the next middleware (global error handler)
  }
});

// Create a new product
router.post('/', async (req, res, next) => {
  const { name, price, description } = req.body;

  try {
    const product = new Product({ name, price, description });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error); // Pass the error to the next middleware (global error handler)
  }
});

// Read a single product by ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware (global error handler)
  }
});

// Update a product by ID
router.put('/:id', async (req, res, next) => {
  const { name, price, description } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware (global error handler)
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne(); // Use delete method instead of remove
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware (global error handler)
  }
});


export default router;
