export const DEMO_ADMIN_EMAIL = 'admin@mvems.com';
export const DEMO_ADMIN_PASSWORD = 'Admin@123';

export const DEMO_USER = {
  id: 'demo-admin-id',
  email: DEMO_ADMIN_EMAIL,
  fullName: 'Demo Administrator',
  role: 'SUPER_ADMIN',
};

export const DEMO_ACCESS_TOKEN = 'demo-offline-access-token';

export const DEMO_METRICS = {
  totalPlatformRevenue: 15750.5,
  totalEvents: 42,
  totalUsers: 1250,
};

export const DEMO_EVENTS = [
  {
    id: 'mock-1',
    title: 'Global Tech Summit 2026',
    slug: 'global-tech-summit-2026',
    description:
      'The largest gathering of tech innovators, product builders, and event leaders.',
    startDatetime: '2026-09-15T10:00:00Z',
    endDatetime: '2026-09-17T18:00:00Z',
    venueName: 'Silicon Valley Convention Center',
    capacity: 5000,
    category: 'Tech',
    coverImage:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    organizer: { fullName: 'MVEMS Platinum', businessName: 'MVEMS Corp' },
    tickets: [
      {
        id: 't1',
        name: 'General Admission',
        price: 299,
        type: 'PAID',
        capacity: 4000,
        soldCount: 1200,
      },
    ],
    sessions: [
      {
        id: 's1',
        title: 'Opening Keynote: Future of Web3',
        startTime: '2026-09-15T10:00:00Z',
        endTime: '2026-09-15T11:00:00Z',
        locationRoom: 'Main Hall',
      },
      {
        id: 's2',
        title: 'Advanced Event Automation',
        startTime: '2026-09-15T13:00:00Z',
        endTime: '2026-09-15T14:00:00Z',
        locationRoom: 'Room 204',
      },
    ],
    speakers: [
      {
        id: 'sp1',
        name: 'Sarah Drasner',
        title: 'VP of Engineering',
        avatarUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      },
    ],
  },
  {
    id: 'mock-2',
    title: 'AI & Future Expo',
    slug: 'ai-future-expo',
    description:
      'Explore the next frontier of AI with live demos, workshops, and product showcases.',
    startDatetime: '2026-11-20T09:00:00Z',
    endDatetime: '2026-11-22T17:00:00Z',
    venueName: 'Tokyo International Forum',
    capacity: 3000,
    category: 'AI',
    coverImage:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
    organizer: { fullName: 'Deep Tech Events', businessName: 'AI Global' },
    tickets: [
      {
        id: 't2',
        name: 'Standard Pass',
        price: 150,
        type: 'PAID',
        capacity: 2500,
        soldCount: 1800,
      },
    ],
    sessions: [
      {
        id: 's3',
        title: 'Generative AI: The New Era',
        startTime: '2026-11-20T10:00:00Z',
        endTime: '2026-11-20T11:00:00Z',
        locationRoom: 'Hall Zero',
      },
    ],
    speakers: [
      {
        id: 'sp2',
        name: 'Addy Osmani',
        title: 'Engineering Leader',
        avatarUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      },
    ],
  },
  {
    id: 'mock-3',
    title: 'Creator Economy Live',
    slug: 'creator-economy-live',
    description:
      'A full-day conference for creators, sponsors, vendors, and community builders.',
    startDatetime: '2026-12-08T11:00:00Z',
    endDatetime: '2026-12-08T20:00:00Z',
    venueName: 'Dhaka Innovation Hub',
    capacity: 1200,
    category: 'Business',
    coverImage:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80',
    organizer: { fullName: 'Tech Mummy Events', businessName: 'Tech Mummy' },
    tickets: [
      {
        id: 't3',
        name: 'Community Pass',
        price: 0,
        type: 'FREE',
        capacity: 1000,
        soldCount: 240,
      },
    ],
    sessions: [
      {
        id: 's4',
        title: 'Building Sponsor-ready Communities',
        startTime: '2026-12-08T12:00:00Z',
        endTime: '2026-12-08T13:00:00Z',
        locationRoom: 'Studio A',
      },
    ],
    speakers: [
      {
        id: 'sp3',
        name: 'Nadia Rahman',
        title: 'Community Strategist',
        avatarUrl:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
      },
    ],
  },
];

export const getDemoEvents = (search = '') => {
  const query = search.trim().toLowerCase();
  if (!query) return DEMO_EVENTS;

  return DEMO_EVENTS.filter((event) =>
    [event.title, event.description, event.category, event.venueName]
      .join(' ')
      .toLowerCase()
      .includes(query),
  );
};
