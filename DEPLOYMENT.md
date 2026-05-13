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
-   Environment Variable: `NEXT_PUBLIC_API_URL` (points to your backend).

### Backend (Railway / Render / Render)
-   Connect your GitHub repo.
-   Set `Root Directory` to `backend`.
-   Use the `Dockerfile` or `npm run start:prod`.
-   Provision a PostgreSQL and Redis instance.

## 4. Production Database Setup
-   **Migrations**: Always run `npm run db:migrate:prod` during deployment.
-   **Backups**: Use `pg_dump` for regular backups or managed DB backup services.

## 5. Security Checklist
- [ ] Change all default passwords (Postgres, Redis).
- [ ] Ensure `NODE_ENV=production` is set everywhere.
- [ ] Verify SSL is active (HTTPS).
- [ ] Restrict CORS to your frontend domain.
