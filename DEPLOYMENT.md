# MVEMS Deployment Guide

## 1. Local Production Test (Docker)
Ensure you have Docker and Docker Compose installed.

```bash
# Set required secrets
export JWT_SECRET=your_secure_secret

# Build and start services
docker-compose up --build
```

## 2. VPS Deployment (Manual Docker)
1.  **Server Setup**: Install Docker and Docker Compose on your VPS.
2.  **Clone Repo**: `git clone <repo_url>`
3.  **Config**: Create a `.env` file in the root based on `.env.example`.
4.  **Launch**: `docker-compose up -d`
5.  **SSL/Reverse Proxy**: Use Nginx with Certbot (Let's Encrypt).

## 3. Managed Platforms
### Frontend (Vercel)
-   Connect your GitHub repo.
-   Set `Root Directory` to `frontend`.
-   Environment Variable: `NEXT_PUBLIC_API_URL` (points to your backend Vercel URL).

### Backend (Vercel)
-   Connect the same GitHub repo as a second Vercel project.
-   Set `Root Directory` to `backend`.
-   Keep the included `backend/vercel.json`.
-   Environment Variables:
    -   `JWT_SECRET`: secure random string.
    -   `CORS_ORIGIN`: frontend Vercel URL, for example `https://your-frontend.vercel.app`.
    -   `DATABASE_URL`: optional for demo login/dashboard preview; required for persistent users/events.
    -   `REDIS_URL`: optional.
-   Test the deployed API at `/health`.

Demo admin login for dashboard preview:
-   Email: `admin@mvems.com`
-   Password: `Admin@123`

## 4. Production Database Setup
-   **Migrations**: Always run `npm run db:migrate:prod` during deployment.
-   **Backups**: Use `pg_dump` for regular backups or managed DB backup services.

## 5. Security Checklist
- [ ] Change all default passwords (Postgres, Redis).
- [ ] Ensure `NODE_ENV=production` is set everywhere.
- [ ] Verify SSL is active (HTTPS).
- [ ] Restrict CORS to your frontend domain.
