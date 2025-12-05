# ChargerBNB - React + Express.js Version

A modern full-stack EV charging station marketplace built with React (TypeScript) and Express.js.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for modern UI components
- **Framer Motion** for animations
- **React Router** for navigation
- **React Hot Toast** for notifications
- **Google Maps API** integration
- **Responsive Design** with mobile-first approach

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** (Sequelize ORM) for relational data
- **MongoDB** (Mongoose) for analytics and logs
- **JWT 2.0** authentication (access + refresh tokens)
- **Multer** for file uploads
- **Express Validator** for input validation

### Infrastructure
- **Docker** & Docker Compose
- **Nginx** for frontend serving
- Health checks for all services

## 📋 Prerequisites

- Node.js 20+
- Docker & Docker Compose
- PostgreSQL (if running without Docker)
- MongoDB (if running without Docker)

## 🏃 Quick Start

### Using Docker (Recommended)

1. **Clone and navigate:**
   ```bash
   cd charger
   ```

2. **Set environment variables:**
   ```bash
   cp backend-express/.env.example backend-express/.env
   cp frontend-react/.env.example frontend-react/.env
   ```

3. **Update `.env` files with your API keys**

4. **Start all services:**
   ```bash
   docker-compose -f docker-compose-new.yml up -d
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - PostgreSQL: localhost:5432
   - MongoDB: localhost:27017

### Manual Setup

#### Backend Setup

```bash
cd backend-express
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

#### Frontend Setup

```bash
cd frontend-react
npm install
cp .env.example .env
# Edit .env with your API URL and Google Maps key
npm start
```

## 🔑 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
POSTGRES_URL=postgresql://user:pass@localhost:5432/chargerbnb
MONGODB_URI=mongodb://localhost:27017/chargerbnb
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## 📁 Project Structure

```
charger/
├── backend-express/
│   ├── src/
│   │   ├── config/         # Database configs
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth middleware
│   │   └── server.ts       # Entry point
│   └── Dockerfile
├── frontend-react/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── hooks/          # Custom hooks
│   │   └── App.tsx         # Main app
│   └── Dockerfile
└── docker-compose-new.yml
```

## 🎨 Features

- ✅ Modern, futuristic UI/UX with Material-UI
- ✅ Responsive design (mobile-first)
- ✅ JWT 2.0 authentication (access + refresh tokens)
- ✅ Google Maps integration for charger locations
- ✅ Geolocation-based charger search
- ✅ File upload for images and documents
- ✅ Real-time notifications
- ✅ Smooth animations with Framer Motion
- ✅ PostgreSQL + MongoDB dual database setup

## 🔐 Security

- JWT 2.0 with refresh token rotation
- Password hashing with bcrypt
- Input validation with express-validator
- CORS configuration
- File upload validation
- SQL injection prevention (Sequelize)
- XSS prevention (React)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - User/Host registration
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Chargers
- `GET /api/chargers/public` - Get all approved chargers
- `GET /api/chargers/public?latitude=&longitude=&radiusKm=` - Get nearby chargers
- `GET /api/chargers/public/:id` - Get charger details
- `POST /api/chargers` - Create charger (Host only)
- `GET /api/chargers/my-chargers` - Get my chargers

### File Upload
- `POST /api/upload/image` - Upload image
- `POST /api/upload/document` - Upload document

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/hosts` - Get all hosts
- `PUT /api/admin/chargers/:id/approve` - Approve charger

## 🛠️ Development

### Backend
```bash
cd backend-express
npm run dev    # Development with hot reload
npm run build  # Build for production
npm start      # Run production build
```

### Frontend
```bash
cd frontend-react
npm start      # Development server
npm run build  # Production build
npm test       # Run tests
```

## 🐳 Docker Commands

```bash
# Start services
docker-compose -f docker-compose-new.yml up -d

# View logs
docker-compose -f docker-compose-new.yml logs -f

# Stop services
docker-compose -f docker-compose-new.yml down

# Rebuild
docker-compose -f docker-compose-new.yml up -d --build
```

## 📝 Notes

- Google Maps API key is required for map functionality
- Configure Razorpay keys for payment integration
- Set up email SMTP for notifications
- Use environment variables for all secrets
- Run migrations in production for database setup

## 📄 License

MIT License

