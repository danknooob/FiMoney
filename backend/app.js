// app.js - Main entry for Inventory Management Tool (unique, modular)
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger.json');
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import { errorHandler } from './middleware/errorHandler.js';
import { limiter } from './middleware/rateLimiter.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(limiter); // Apply rate limiting globally

// API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/', productRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'Inventory API running', timestamp: Date.now() }));

// Error handler
app.use(errorHandler);

// Connect DB and start server
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/finventory';

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Inventory API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err);
  }); 