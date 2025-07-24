import express from 'express';
import { addProduct, updateProductQuantity, getProducts } from '../controllers/productController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';
const router = express.Router();

// POST /products
router.post('/products', authenticateJWT, addProduct);

// PUT /products/:id/quantity
router.put('/products/:id/quantity', authenticateJWT, updateProductQuantity);

// GET /products
router.get('/products', authenticateJWT, getProducts);

export default router; 