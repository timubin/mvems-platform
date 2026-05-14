# MVEMS

Multivendor Event Management System with a Next.js frontend and NestJS backend.

## Demo Login

Use this account after deployment to open the dashboard:

- Email: `admin@mvems.com`
- Password: `Admin@123`

## Vercel Setup

Create two Vercel projects from the same GitHub repository.

### Backend

- Root Directory: `backend`
- Framework Preset: Other
- Environment Variables:
  - `JWT_SECRET`: any long secure random string
  - `CORS_ORIGIN`: your frontend Vercel URL, for example `https://your-frontend.vercel.app`
  - `DATABASE_URL`: optional for demo mode; required for real registration/data
  - `REDIS_URL`: optional

After deploy, test `https://your-backend.vercel.app/health`.

### Frontend

- Root Directory: `frontend`
- Framework Preset: Next.js
- Environment Variables:
  - `NEXT_PUBLIC_API_URL`: your backend Vercel URL, for example `https://your-backend.vercel.app`

Then open `https://your-frontend.vercel.app/login` and sign in with the demo account above.
