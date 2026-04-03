const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async ()=>{
  try {
    const totalUsers = await prisma.user.count();
    const totalComplaints = await prisma.complaint.count();
    const pending = await prisma.complaint.count({ where: { status:'PENDING' } });
    const zoneStats = await prisma.complaint.groupBy({ by:['departmentId'], _count:{ id:true }, orderBy:{ _count:{ id:'desc' } }, take:5 });
    console.log({ totalUsers, totalComplaints, pending, zoneStats });
  } catch(e) { console.error('ERR', e); } finally { await prisma.$disconnect(); }
})();