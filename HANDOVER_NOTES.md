# MVEMS Project Handover Document

This document outlines the current state of the Multivendor Event Management System (MVEMS) and provides a roadmap for the incoming developer to complete the implementation.

## Project Overview
MVEMS is an enterprise-grade platform designed to manage events, ticket sales, seat bookings, and vendor ecosystems.

## Tech Stack
- **Backend:** NestJS, Prisma ORM, PostgreSQL, Redis (Distributed Locking).
- **Frontend:** Next.js 15+ (App Router), Tailwind CSS, Lucide React, Axios, TanStack Query.

---

## 1. Completed Milestones

### Backend (Core Logic & Architecture)
- **Database Schema:** Full schema design for all 3 phases (MVP, Growth, Enterprise). Includes models for Users, Events, TicketTiers, Orders, Seats, Coupons, Reviews, Booths, Sessions, and Speakers.
- **Service Layer Implementation:**
    - `AuthService`: Basic register/login flows.
    - `EventService`: CRUD logic for events and public listings.
    - `SeatService`: Redis-based `SETNX` distributed locking for concurrent seat bookings.
    - `OrderService`: Advanced logic for ticket pricing, early bird discounts, coupon application, and tax calculations.
    - `PaymentService`: Boilerplate for Stripe Payment Intent and Webhook handling.
    - `NotificationService`: Logic for booking confirmations, abandoned cart reminders, and vendor alerts.
    - `ReviewService`: Verified attendee feedback and moderation system.
    - `VendorService`: Booth applications, venue map data, and lead retrieval system.
    - `AnalyticsService`: Dashboard metrics, CSV reporting, and platform revenue tracking.
- **Infrastructure:** CORS enabled, backend port configured to `3001`.

### Frontend (UI/UX Design)
The following pages are designed with a premium dark-themed, glassmorphism aesthetic:
- **Landing Page:** Hero section and core platform highlights.
- **Event Discovery:** Grid layout for browsing events (Mock data integrated).
- **Auth Pages:** Sleek Login/Signup UI.
- **Organizer Dashboard:** Statistical overview, navigation sidebar, and order tables.
- **Secure Checkout:** Order summary, coupon input, and payment form layout.
- **Vendor Hub:** Storefront profile and interactive booth application interface.

---

## 2. Pending Tasks (Immediate Roadmap)

The following tasks must be completed to bring the platform to production:

### A. Frontend-Backend Integration (Priority High)
- **API Client:** Set up a global Axios instance and TanStack Query (React Query) providers in the frontend.
- **Dynamic Data:** Replace current mock data in `Events`, `Dashboard`, and `Vendor` pages with actual API responses from the NestJS backend.

### B. Authentication & Security
- **Full JWT:** Implement the full sign/verify cycle for JSON Web Tokens in the backend.
- **Auth Context:** Create a React Context or Hook in the frontend to manage user sessions.
- **RBAC Guards:** Apply Role-Based Access Control (RBAC) decorators on backend controllers to protect sensitive endpoints.

### C. Database & Infrastructure
- **Migrations:** Configure the `DATABASE_URL` in `.env` and run `npx prisma db push` to generate tables.
- **Redis Connection:** Ensure a local or cloud Redis instance is connected for the `SeatService`.

### D. Third-Party Integrations
- **Payment Gateway:** Finalize the Stripe integration (or SSLCommerz) and handle real payment webhooks.
- **Cloud Storage:** Integrate AWS S3 or Cloudinary for event banners and user profile image uploads.
- **Email Service:** Connect `NotificationService` to a real provider like SendGrid, Mailgun, or Amazon SES.

### E. Real-Time Features
- **Socket.io:** Set up a WebSocket gateway in NestJS and connect it to the frontend for real-time seat status updates.

---

## 3. How to Run

### Backend
```bash
cd backend
npm install
# Set DATABASE_URL and REDIS_URL in .env
npx prisma generate
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

**Handover Note:** The logical foundation is 90% complete. The primary focus now should be on connecting the frontend components to the backend services and finalizing the security layer.
