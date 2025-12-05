# ⚡ Quick Start - ChargerBNB Local Hosting

## 🎯 Easiest Way to Start

### Step 1: Start Docker Desktop
Make sure Docker Desktop is running on your Mac.

### Step 2: Run the Start Script

```bash
cd /Users/diwakarpatel/Desktop/charger
./start-local.sh
```

That's it! The script will:
- ✅ Start PostgreSQL and MongoDB databases
- ✅ Install all dependencies
- ✅ Start the backend server
- ✅ Start the frontend server
- ✅ Open your browser automatically

## 🌐 Access Your Website

Once started, open your browser to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 🛑 To Stop Everything

Press `Ctrl+C` in the terminal, or run:
```bash
./stop-local.sh
```

## 📝 What You'll See

1. **Homepage** - Beautiful landing page with features
2. **Sign Up** - Create account as User or Host
3. **Login** - Access your dashboard
4. **Find Chargers** - Browse available charging stations
5. **View Details** - See charger info with Google Maps

## ⚠️ Troubleshooting

### Docker Not Running?
```bash
# Start Docker Desktop first, then:
docker-compose -f docker-compose-new.yml up -d postgres mongodb
./start-simple.sh
```

### Port Already in Use?
- Frontend will ask to use a different port (like 3001)
- Backend: Edit `backend-express/.env` and change `PORT=5000` to another port

### Database Connection Error?
Make sure Docker containers are running:
```bash
docker ps
```

You should see `chargerbnb-postgres` and `chargerbnb-mongodb` running.

## 🎨 Features Available

- ✅ User/Host registration and login
- ✅ Browse charging stations
- ✅ View charger details with maps
- ✅ Responsive design (works on mobile too!)
- ✅ Modern UI with animations

## 📚 Need More Help?

See `LOCAL-SETUP.md` for detailed instructions.

---

**Enjoy your local ChargerBNB! 🚀⚡**

