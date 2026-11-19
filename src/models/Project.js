import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  projectCode: { type: String, required: true, unique: true, trim: true, uppercase: true },
  description: { type: String, default: '' },
  type: { type: String, required: true, default: 'Web Development' },
  status: { type: String, enum: ['Not Started','Pending','Ongoing','On Hold','Completed','Delayed','Error / Blocked','Cancelled'], default: 'Pending' },
  priority: { type: String, enum: ['Low','Medium','High','Critical'], default: 'Medium' },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
  startDate: { type: Date, default: null },
  dueDate: { type: Date, default: null },
  progress: { type: Number, min: 0, max: 100, default: 0 },
  notes: { type: String, default: '' }
}, { timestamps: true });
export default mongoose.model('Project', projectSchema);
