import Employee from '../models/Employee.js';
import Project from '../models/Project.js';
export async function listEmployees(req,res) { const employees = await Employee.find().sort({name:1}); res.json(employees); }
export async function createEmployee(req,res) { try { const e = await Employee.create(req.body); res.status(201).json(e); } catch(err) { if(err.code===11000) return res.status(409).json({message:'Employee ID already exists'}); throw err; } }
export async function updateEmployee(req,res) { try { const e = await Employee.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators:true}); if(!e) return res.status(404).json({message:'Employee not found'}); res.json(e); } catch(err) { if(err.code===11000) return res.status(409).json({message:'Employee ID already exists'}); throw err; } }
export async function deleteEmployee(req,res) { const e = await Employee.findByIdAndDelete(req.params.id); if(!e) return res.status(404).json({message:'Employee not found'}); await Project.updateMany({employees:e._id}, {$pull:{employees:e._id}}); res.json({message:'Employee deleted and project assignments updated'}); }
