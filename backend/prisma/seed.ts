import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Super Admin if not exists
  const adminEmail = 'admin@mvems.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: hashedPassword,
        fullName: 'System Administrator',
        role: Role.SUPER_ADMIN,
      },
    });
    console.log('Super Admin created: admin@mvems.com / Admin@123');
  } else {
    console.log('Super Admin already exists.');
  }

  // Create Demo Events
  const eventsCount = await prisma.event.count();
  if (eventsCount === 0) {
    const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (admin) {
      // Event 1: Global Tech Summit
      const event1 = await prisma.event.create({
        data: {
          organizerId: admin.id,
          title: 'Global Tech Summit 2026',
          slug: 'global-tech-summit-2026',
          description: 'The largest gathering of tech innovators in the world. Join us for 3 days of intensive learning, networking, and product showcases.',
          status: 'PUBLISHED',
          startDatetime: new Date('2026-09-15T10:00:00Z'),
          endDatetime: new Date('2026-09-17T18:00:00Z'),
          venueName: 'Silicon Valley Convention Center',
          capacity: 5000,
          tickets: {
            create: [
              { name: 'General Admission', price: 299, type: 'PAID', capacity: 4000, saleStart: new Date(), saleEnd: new Date('2026-09-15T00:00:00Z') },
              { name: 'VIP Experience', price: 899, type: 'PAID', capacity: 500, saleStart: new Date(), saleEnd: new Date('2026-09-15T00:00:00Z') },
              { name: 'Student Pass', price: 99, type: 'PAID', capacity: 500, saleStart: new Date(), saleEnd: new Date('2026-09-15T00:00:00Z') }
            ]
          },
          sessions: {
            create: [
              { title: 'Opening Keynote: Future of Web3', startTime: new Date('2026-09-15T10:00:00Z'), endTime: new Date('2026-09-15T11:00:00Z'), locationRoom: 'Main Hall' },
              { title: 'Advanced NestJS Patterns', startTime: new Date('2026-09-15T13:00:00Z'), endTime: new Date('2026-09-15T14:30:00Z'), locationRoom: 'Room 204' }
            ]
          },
          speakers: {
            create: [
              { name: 'Sarah Drasner', title: 'VP of Engineering', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
              { name: 'Addy Osmani', title: 'Engineering Manager at Google', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' }
            ]
          }
        },
      });

      // Event 2: AI Expo
      await prisma.event.create({
        data: {
          organizerId: admin.id,
          title: 'AI & Future Expo',
          slug: 'ai-future-expo',
          description: 'Explore the next frontier of Artificial Intelligence. Live demos of generative AI, robotics, and neural networks.',
          status: 'PUBLISHED',
          startDatetime: new Date('2026-11-20T09:00:00Z'),
          endDatetime: new Date('2026-11-22T17:00:00Z'),
          venueName: 'Tokyo International Forum',
          capacity: 3000,
          tickets: {
            create: [
              { name: 'Standard Pass', price: 150, type: 'PAID', capacity: 2500, saleStart: new Date(), saleEnd: new Date('2026-11-20T00:00:00Z') },
              { name: 'Workshop Bundle', price: 450, type: 'PAID', capacity: 500, saleStart: new Date(), saleEnd: new Date('2026-11-20T00:00:00Z') }
            ]
          }
        },
      });

      console.log('Demo events with tickets, sessions, and speakers created.');
    }
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
