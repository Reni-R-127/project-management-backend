import mongoose from 'mongoose';
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  employeeId: { type: String, required: true, unique: true, trim: true },
  email: { type: String, trim: true, lowercase: true, default: '' },
  role: { type: String, trim: true, default: '' },
  department: { type: String, trim: true, default: '' },
  active: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('Employee', employeeSchema);
