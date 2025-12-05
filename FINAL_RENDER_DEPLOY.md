# Final Step: Deploy Backend to Render

## Your Progress So Far ✅
- ✅ PostgreSQL Database created on Render
- ✅ Code pushed to GitHub: https://github.com/diwakar453t/chargerbnb-fullstack
- ✅ Frontend live at: https://chargerbnb-ev.netlify.app

## Now: Create Web Service on Render (2 minutes)

### Step 1: Create New Web Service

1. Go to **https://dashboard.render.com**
2. Click **"New +"** → **"Web Service"**
3. Click **"Build and deploy from a Git repository"**
4. Click **"Connect account"** → **GitHub**
5. Find and select: **`chargerbnb-fullstack`**
6. Click **"Connect"**

### Step 2: Configure Service

Fill in these settings:

**Basic Info:**
- **Name**: `chargerbnb-api` (or your choice)
- **Region**: **Singapore** (same as database)
- **Branch**: `main`
- **Root Directory**: `backend`

**Build Settings:**
- **Runtime**: **Docker**
- Render will auto-detect the Dockerfile

**Instance Type:**
- **Plan**: **Free** ⚠️ Select FREE tier

### Step 3: Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these ONE BY ONE:

```
NODE_ENV=production
```

```
PORT=5000
```

```
CORS_ORIGIN=https://chargerbnb-ev.netlify.app
```

```
DATABASE_URL=postgresql://chargerbnb_user:NuDBqBYqoSqY8Z5p8JCNCvVKynLxZlss@dpg-d4pg6bggjchc73af1kqg-a/chargerbnb
```

```
JWT_SECRET=369dc0c7c08d5f81bd5e210ca5db5392f9fa4b624bc3aa0f979dc270ec179c8a
```

```
JWT_REFRESH_SECRET=bbde343bf43db79cb1b27d36f358d1feff107c5f4fc22a0b0242be3869c20d59
```

```
JWT_EXPIRES_IN=24h
```

```
JWT_REFRESH_EXPIRES_IN=7d
```

### Step 4: Deploy!

1. Click **"Create Web Service"**
2. Render will start building (takes 3-5 minutes)
3. Watch the build logs

**You'll see:**
```
==> Building Docker image
==> Installing dependencies
==> Building TypeScript
==> Starting application
✅ PostgreSQL connected successfully
🚀 Server running on port 5000
```

### Step 5: Get Your Backend URL

Once deployed (look for green "Live" badge):

1. Your backend URL will be shown at the top
2. It looks like: `https://chargerbnb-api.onrender.com`
3. **COPY THIS URL!**

### Step 6: Test Backend

Click the URL or run:
```bash
curl https://YOUR-BACKEND-URL.onrender.com/health
```

Should return: `{"status":"healthy"}`

---

## What to Do After Backend is Live

**Paste the backend URL here in chat!**

I'll then:
1. Update frontend to use the real backend URL
2. Redeploy frontend
3. Test the full application
4. Celebrate! 🎉

---

## Troubleshooting

**Build fails?**
- Check build logs in Render dashboard
- Verify Dockerfile is in `backend/` directory

**"Cannot connect to database"?**
- Verify DATABASE_URL is correct
- Check database is in same region (Singapore)

**Service shows "Deploy failed"?**
- Check environment variables are all set
- Verify PORT=5000 matches server.ts

---

## Go ahead and create the Web Service!

Once you see the green "Live" badge, paste the backend URL here! 🚀
