import Project from '../models/Project.js';
import Employee from '../models/Employee.js';
export async function stats(req,res) {
  const [totalProjects, totalEmployees, groups] = await Promise.all([Project.countDocuments(), Employee.countDocuments({active:true}), Project.aggregate([{$group:{_id:'$status',count:{$sum:1}}}])]);
  const byStatus = Object.fromEntries(groups.map(g=>[g._id,g.count]));
  const recentProjects = await Project.find().populate('employees','name employeeId').sort({updatedAt:-1}).limit(5);
  res.json({totalProjects,totalEmployees,byStatus,recentProjects});
}
