# 🚀 Local Setup Guide - ChargerBNB

Quick guide to run ChargerBNB on your local machine.

## Prerequisites

- Node.js 20+ installed
- Docker Desktop installed and running
- npm or yarn package manager

## Quick Start (Easiest Method)

### Option 1: Using the Start Script (Recommended)

```bash
cd /Users/diwakarpatel/Desktop/charger
./start-local.sh
```

This script will:
- ✅ Start PostgreSQL and MongoDB in Docker
- ✅ Install dependencies (if needed)
- ✅ Start the Express.js backend
- ✅ Start the React frontend
- ✅ Open the app in your browser

**To stop everything:**
```bash
./stop-local.sh
```

### Option 2: Manual Start

#### Step 1: Start Databases

```bash
cd /Users/diwakarpatel/Desktop/charger
docker-compose -f docker-compose-new.yml up -d postgres mongodb
```

Wait 5-10 seconds for databases to initialize.

#### Step 2: Start Backend

Open a new terminal:

```bash
cd /Users/diwakarpatel/Desktop/charger/backend-express
npm install  # First time only
npm run dev
```

Backend will run on: **http://localhost:5000**

#### Step 3: Start Frontend

Open another new terminal:

```bash
cd /Users/diwakarpatel/Desktop/charger/frontend-react
npm install  # First time only
npm start
```

Frontend will run on: **http://localhost:3000**

The browser should automatically open to http://localhost:3000

## Verify Everything is Running

1. **Frontend**: http://localhost:3000 (should show ChargerBNB homepage)
2. **Backend API**: http://localhost:5000/health (should return `{"status":"OK"}`)
3. **PostgreSQL**: Check with `docker ps | grep postgres`
4. **MongoDB**: Check with `docker ps | grep mongodb`

## Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use:

**Backend (port 5000):**
- Edit `backend-express/.env` and change `PORT=5000` to another port
- Update `frontend-react/.env` with the new backend URL

**Frontend (port 3000):**
- React will automatically ask to use a different port
- Or set `PORT=3001` in terminal: `PORT=3001 npm start`

### Database Connection Issues

**PostgreSQL not connecting:**
```bash
# Check if PostgreSQL container is running
docker ps | grep postgres

# Check logs
docker logs chargerbnb-postgres

# Restart PostgreSQL
docker-compose -f docker-compose-new.yml restart postgres
```

**MongoDB not connecting:**
```bash
# Check if MongoDB container is running
docker ps | grep mongodb

# Check logs
docker logs chargerbnb-mongodb

# Restart MongoDB
docker-compose -f docker-compose-new.yml restart mongodb
```

### Backend Errors

**Module not found:**
```bash
cd backend-express
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
cd backend-express
npm run build
```

### Frontend Errors

**Module not found:**
```bash
cd frontend-react
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
cd frontend-react
npm run build
```

## Environment Variables

### Backend (.env)
Located at: `backend-express/.env`

Key variables:
- `PORT=5000` - Backend port
- `POSTGRES_URL` - PostgreSQL connection string
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret (already set)

### Frontend (.env)
Located at: `frontend-react/.env`

Key variables:
- `REACT_APP_API_URL=http://localhost:5000/api` - Backend API URL
- `REACT_APP_GOOGLE_MAPS_API_KEY` - Add your Google Maps API key (optional)

## First Time Setup

1. **Install dependencies:**
   ```bash
   cd backend-express && npm install
   cd ../frontend-react && npm install
   ```

2. **Create database tables:**
   The backend will auto-create tables on first run. If you see errors, you can manually sync:
   ```bash
   # In backend-express directory, uncomment sync in src/config/postgres.ts
   ```

3. **Test the setup:**
   - Visit http://localhost:3000
   - Try signing up a new user
   - Check backend logs for any errors

## Stopping Services

**Using script:**
```bash
./stop-local.sh
```

**Manual:**
- Press `Ctrl+C` in terminal running frontend
- Press `Ctrl+C` in terminal running backend
- Stop databases: `docker-compose -f docker-compose-new.yml stop`

## Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health
- **PostgreSQL**: localhost:5432
- **MongoDB**: localhost:27017

## Next Steps

1. **Sign up** as a user or host
2. **Add a charger** (if signed up as host)
3. **Browse chargers** on the homepage
4. **View charger details** with Google Maps

## Need Help?

- Check backend logs: `tail -f backend.log` (if using start script)
- Check Docker logs: `docker logs chargerbnb-postgres` or `docker logs chargerbnb-mongodb`
- Check browser console for frontend errors

Enjoy building with ChargerBNB! 🚀⚡

