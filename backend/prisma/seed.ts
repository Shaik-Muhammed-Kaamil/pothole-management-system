import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create an Admin for yourself
  await prisma.user.upsert({
    where: { email: 'admin@pothole.com' },
    update: {},
    create: {
      email: 'admin@pothole.com',
      name: 'System Admin',
      password: 'password123', // In a real app, hash this!
      role: "ADMIN",
    },
  });

  // Create a Department & an Officer
  const dept = await prisma.department.create({
    data: {
      name: 'Central Zone Works',
      zone: 'Central',
      contactEmail: 'central@city.gov',
    },
  });

  await prisma.user.create({
    data: {
      email: 'officer@city.gov',
      name: 'Officer Raj',
      password: 'password123',
      role: "OFFICER",
      deptId: dept.id,
    },
  });

  console.log('Seeding finished: Admin and Officer created.');
}

main().catch(e => console.error(e)).finally(async () => await prisma.$disconnect());