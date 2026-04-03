// import express from 'express';
// import cors from 'cors';

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.get('/health', (_req, res) => {
//   res.json({ status: 'ok' });
// });

// const PORT = Number(process.env.PORT ?? 4000);
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import authRoutes from './routes/auth';


const app = express();
const prisma = new PrismaClient(); // Your connection to the DB
const PORT = process.env.PORT || 5000;

// ... other middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Basic test route for Person 3
app.get('/api/health', (req, res) => {
  res.json({ message: "Pothole System Backend is Running!" });
});

// Admin overview route
app.get('/api/admin/overview', async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalComplaints = await prisma.complaint.count();
    const pending = await prisma.complaint.count({ where: { status: 'PENDING' } });
    const inProgress = await prisma.complaint.count({ where: { status: 'IN_PROGRESS' } });
    const resolved = await prisma.complaint.count({ where: { status: 'RESOLVED' } });
    const rejected = await prisma.complaint.count({ where: { status: 'REJECTED' } });

    // SLA Breaches: complaints not resolved and past SLA deadline
    const slaBreaches = await prisma.complaint.count({
      where: {
        status: { not: 'RESOLVED' },
        slaDeadline: { lt: new Date() }
      }
    });

    // Simple zone stats: just fetch departments
    const departments = await prisma.department.findMany();
    const zoneStats = departments.map((d) => ({
      id: d.id,
      zone: d.zone,
    }));

    res.json({ totalUsers, totalComplaints, pending, inProgress, resolved, rejected, slaBreaches, zoneStats });
  } catch (error) {
    console.error('Admin overview error:', error);
    res.status(500).json({ message: 'Could not fetch admin overview.', error: String(error) });
  }
});

// Officer assigned complaints route
app.get('/api/officer/assigned', async (req, res) => {
  try {
    const userId = Number(req.query.userId);
    if (!userId) {
      return res.status(400).json({ message: 'userId query is required' });
    }

    // Find officer and department mapping
    const officer = await prisma.user.findUnique({ where: { id: userId } });
    if (!officer || officer.role !== 'OFFICER') {
      return res.status(404).json({ message: 'Officer not found' });
    }

    const assigned = await prisma.complaint.findMany({ where: { deptId: officer.deptId || undefined }, orderBy: { createdAt: 'desc' }, take: 20 });

    res.json({ assigned });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not fetch assigned complaints.' });
  }
});

// FUTURE: You will add your Auth Middleware and Admin routes here
// app.use('/api/admin', adminMiddleware, adminRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});