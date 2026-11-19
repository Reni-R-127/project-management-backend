import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import { connectDB } from './config/db.js';
try {
  await connectDB();
  const userId = process.env.ADMIN_USER_ID || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin@123';
  const existing = await User.findOne({userId});
  if (existing) console.log(`Admin '${userId}' already exists. No changes made.`);
  else { await User.create({userId,passwordHash:await bcrypt.hash(password,12),role:'admin'}); console.log(`Admin '${userId}' created.`); }
} catch(e) { console.error(e); process.exitCode=1; } finally { await mongoose.disconnect(); }
