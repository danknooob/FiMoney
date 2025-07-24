import Product from '../models/Product.js';

// Add product
export const addProduct = async (req, res, next) => {
  try {
    const { name, type, sku, image_url, description, quantity, price } = req.body;
    if (!name || !type || !sku || !image_url || !description || quantity == null || price == null) {
      return res.status(400).json({ error: 'All product fields are required.' });
    }
    const product = new Product({ name, type, sku, image_url, description, quantity, price });
    await product.save();
    res.status(201).json({ product_id: product._id, message: 'Product added.' });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.sku) {
      return res.status(409).json({ error: 'SKU already exists. Please use a unique SKU.' });
    }
    next(err);
  }
};

// Update product quantity
export const updateProductQuantity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    if (typeof quantity !== 'number' || quantity < 0) return res.status(400).json({ error: 'Quantity must be a non-negative number.' });
    const product = await Product.findByIdAndUpdate(id, { quantity }, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json({ message: 'Quantity updated.', quantity: product.quantity });
  } catch (err) { next(err); }
};

// Get products (paginated)
export const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit);
    res.json(products);
  } catch (err) { next(err); }
}; 