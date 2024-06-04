import express from 'express';
import Product from '../models/Product';
import { redisClient } from '../utils/RedisClient';

const router = express.Router();

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
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { name, price, description } = req.body;
  try {
    const product = new Product({ name, price, description });
    await product.save();
    
    // Invalidate the cache after adding a new product
    await redisClient.del('products');

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

//still need to use/ incase I don't Use a search function
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
});

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
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      // Invalidate the cache after deleting a product
      await redisClient.del('products');
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
