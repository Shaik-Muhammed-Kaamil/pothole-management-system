import express from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

const router = express.Router();

// M10: Login endpoint for Citizens, Officers, and Admins
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user in the DB
    const user = await prisma.user.findUnique({ where: { email } });

    // 2. Check if user exists and password matches (For B.Tech demo, we use plain text; for industry, use bcrypt)
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Create a JWT token including the user's ROLE
    const token = jwt.sign(
      { userId: user.id, role: user.role, deptId: user.deptId },
      process.env.JWT_SECRET!,
      { expiresIn: '8h' }
    );

    // 4. Send back the token and user info
    res.json({
      token,
      user: { id: user.id, name: user.name, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;