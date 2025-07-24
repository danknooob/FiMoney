import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register new user
export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'User with this email already exists.' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) { next(err); }
};

// Login user (by email)
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials.' });
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '2h' });
    res.json({ access_token: token });
  } catch (err) { next(err); }
}; 