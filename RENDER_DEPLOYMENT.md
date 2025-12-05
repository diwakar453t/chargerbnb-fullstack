# ChargerBNB - Render Backend Deployment Guide

## Step-by-Step Instructions

### 1. Create Render Account & New Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Choose **"Deploy from Git repository"**
4. Connect your GitHub account and select the `charger` repository
5. Or use **"Public Git repository"** if not on GitHub yet

### 2. Configure Web Service

**Basic Settings:**
- **Name**: `chargerbnb-api` (or your choice)
- **Region**: Choose closest to India (Singapore recommended)
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend`
- **Runtime**: `Docker`
- **Instance Type**: `Free` (or Starter $7/month for no sleep)

**Build & Deploy:**
- **Docker Command**: (auto-detected from Dockerfile)
- Render will use the Dockerfile we created

### 3. Add PostgreSQL Database

1. In the same Render dashboard
2. Click **"New +"** → **"PostgreSQL"**
3. Settings:
   - **Name**: `chargerbnb-db`
   - **Database**: `chargerbnb`
   - **User**: `chargerbnb_user` (auto-created)
   - **Region**: Same as web service
   - **Instance Type**: `Free` (1GB, 90 days)
4. Click **"Create Database"**
5. **IMPORTANT**: Copy the **"Internal Database URL"** - you'll need this!

### 4. Link Database to Web Service

1. Go back to your Web Service (`chargerbnb-api`)
2. Click **"Environment"** tab
3. Add Environment Variables:

```
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://chargerbnb.netlify.app
DATABASE_URL=<paste-internal-database-url-here>
JWT_SECRET=369dc0c7c08d5f81bd5e210ca5db5392f9fa4b624bc3aa0f979dc270ec179c8a
JWT_REFRESH_SECRET=bbde343bf43db79cb1b27d36f358d1feff107c5f4fc22a0b0242be3869c20d59
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
```

**Where to get DATABASE_URL:**
- Go to your PostgreSQL database page
- Find "Connections" section
- Copy **"Internal Database URL"** (e.g., `postgresql://chargerbnb_user:...@dpg-...`)

### 5. Deploy!

1. Click **"Create Web Service"** (if new) or **"Manual Deploy"**
2. Render will:
   - Pull your code
   - Build Docker image
   - Start the container
   - Assign a URL: `https://chargerbnb-api.onrender.com`

**Build Process** (watch the logs):
```
==> Building...
==> Installing dependencies
==> Building TypeScript
==> Starting application
✅ PostgreSQL connected successfully
✅ Database models verified
🚀 Server running on port 5000
```

### 6. Verify Backend is Live

Once deployed, test these endpoints:

**Health Check:**
```bash
curl https://chargerbnb-api.onrender.com/health
```
Expected: `{"status":"healthy"}`

**Public Chargers:**
```bash
curl https://chargerbnb-api.onrender.com/api/chargers/public
```
Expected: `[]` or list of chargers

### 7. Get Your Backend URL

- Your backend API will be at: `https://chargerbnb-api-XXXXX.onrender.com`
  (Render assigns a unique URL)
- **Copy this URL** - we'll need it for the frontend!

---

## Important Notes

### ⚠️ Free Tier Limitations

**What Happens:**
- Free services **sleep after 15 minutes** of inactivity
- First request after sleep: **30-60 second cold start**
- After that: Normal speed

**Solutions:**
1. **Keep Warm** (free): Use a cron job to ping every 14 minutes
2. **Upgrade** ($7/month): No sleep, instant responses

### Database Persistence

✅ **Data is safe!** PostgreSQL free tier includes:
- 1GB storage
- 90-day retention
- Automatic backups
- Even if web service sleeps, data persists

---

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify Dockerfile is in `backend/` directory
- Ensure `package.json` has `build` script

### "Database connection failed"
- Verify `DATABASE_URL` is set correctly
- Use **Internal Database URL** not External
- Check database is in same region

### "Application failed to start"
- Check environment variables are all set
- Verify `PORT=5000` matches server.ts
- Look for errors in deploy logs

---

## Next Steps After Deploy

1. ✅ Get backend URL from Render
2. ✅ Update frontend `.env.production` with actual URL
3. ✅ Redeploy frontend to Netlify
4. ✅ Test full application end-to-end

---

## Quick Reference

### Your URLs (Update after deployment)
- **Backend API**: `https://chargerbnb-api-XXXXX.onrender.com`
- **Frontend**: `https://chargerbnb.netlify.app`(or custom domain)
- **Database**: Internal (not publicly accessible)

### Important Env Vars
```
DATABASE_URL=postgresql://...  (from Render PostgreSQL)
CORS_ORIGIN=https://chargerbnb.netlify.app
JWT_SECRET=369dc0c7c08d5f81bd5e210ca5db5392f9fa4b624bc3aa0f979dc270ec179c8a
JWT_REFRESH_SECRET=bbde343bf43db79cb1b27d36f358d1feff107c5f4fc22a0b0242be3869c20d59
```

Ready to deploy! 🚀
