import { prisma } from '../lib/prisma'; // Import the client you just made

// Module 9: Zone-wise stats for the Admin
export const getZoneStats = async () => {
  const stats = await prisma.complaint.groupBy({
    by: ['deptId'],
    _count: { id: true }
  });
  return stats;
};