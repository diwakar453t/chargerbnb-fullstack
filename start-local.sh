#!/bin/bash

echo "🚀 Starting ChargerBNB Locally..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Docker is not running. Starting Docker services...${NC}"
    echo "Please start Docker Desktop and run this script again."
    exit 1
fi

# Start databases
echo -e "${BLUE}📦 Starting PostgreSQL and MongoDB...${NC}"
cd "$(dirname "$0")"
docker-compose -f docker-compose-new.yml up -d postgres mongodb

# Wait for databases to be ready
echo -e "${BLUE}⏳ Waiting for databases to be ready...${NC}"
sleep 5

# Check if databases are running
if docker ps | grep -q "chargerbnb-postgres" && docker ps | grep -q "chargerbnb-mongodb"; then
    echo -e "${GREEN}✅ Databases are running!${NC}"
else
    echo -e "${YELLOW}⚠️  Databases might not be ready. Continuing anyway...${NC}"
fi

# Start backend
echo -e "${BLUE}🔧 Starting Express.js backend...${NC}"
cd backend-express
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

# Create uploads directory
mkdir -p uploads

# Start backend in background
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"
echo "   Backend logs: tail -f backend.log"

# Wait for backend to start
sleep 3

# Start frontend
echo -e "${BLUE}🎨 Starting React frontend...${NC}"
cd ../frontend-react
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start frontend
echo ""
echo -e "${GREEN}✅ Starting frontend development server...${NC}"
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  🎉 ChargerBNB is starting!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  Frontend: ${BLUE}http://localhost:3000${NC}"
echo -e "  Backend:  ${BLUE}http://localhost:5000${NC}"
echo -e "  Health:   ${BLUE}http://localhost:5000/health${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping services...${NC}"
    kill $BACKEND_PID 2>/dev/null
    cd ..
    docker-compose -f docker-compose-new.yml stop postgres mongodb
    echo -e "${GREEN}✅ All services stopped${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start frontend (this will block)
npm start

