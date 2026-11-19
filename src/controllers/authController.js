import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function login(req, res) {
  const { userId, password } = req.body;
  if (!userId || !password) return res.status(400).json({ message: 'User ID and password are required' });
  const user = await User.findOne({ userId: userId.trim() });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ message: 'Invalid user ID or password' });
  const token = jwt.sign({ id: user._id, userId: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
  res.json({ token, user: { userId: user.userId, role: user.role } });
}
export async function me(req, res) { res.json({ user: { userId: req.user.userId, role: req.user.role } }); }
