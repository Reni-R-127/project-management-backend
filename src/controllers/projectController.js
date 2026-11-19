import Project from '../models/Project.js';
const populate = { path: 'employees', select: 'name employeeId email role department' };
const cleanProjectInput = (body) => { const data = { ...body }; for (const key of ['startDate', 'dueDate']) if (data[key] === '') data[key] = null; return data; };
export async function listProjects(req,res) {
  const { search, status, type } = req.query; const filter = {};
  if (status && status !== 'All') filter.status = status;
  if (type && type !== 'All') filter.type = type;
  if (search) filter.$or = [{ name: new RegExp(search, 'i') }, { projectCode: new RegExp(search, 'i') }];
  const projects = await Project.find(filter).populate(populate).sort({ updatedAt: -1 }); res.json(projects);
}
export async function getProject(req,res) { const p = await Project.findById(req.params.id).populate(populate); if(!p) return res.status(404).json({message:'Project not found'}); res.json(p); }
export async function createProject(req,res) { try { const p = await Project.create(cleanProjectInput(req.body)); await p.populate(populate); res.status(201).json(p); } catch(e) { if(e.code===11000) return res.status(409).json({message:'Project code already exists'}); throw e; } }
export async function updateProject(req,res) { try { const p = await Project.findByIdAndUpdate(req.params.id, cleanProjectInput(req.body), {new:true,runValidators:true}).populate(populate); if(!p) return res.status(404).json({message:'Project not found'}); res.json(p); } catch(e) { if(e.code===11000) return res.status(409).json({message:'Project code already exists'}); throw e; } }
export async function deleteProject(req,res) { const p = await Project.findByIdAndDelete(req.params.id); if(!p) return res.status(404).json({message:'Project not found'}); res.json({message:'Project deleted'}); }
