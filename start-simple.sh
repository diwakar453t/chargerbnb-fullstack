#!/bin/bash

echo "🚀 Starting ChargerBNB (Simple Mode - No Docker)"
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if PostgreSQL is running locally
if command -v psql &> /dev/null; then
    echo -e "${BLUE}📦 Checking PostgreSQL...${NC}"
    if psql -U postgres -c "SELECT 1" &> /dev/null; then
        echo -e "${GREEN}✅ PostgreSQL is running locally${NC}"
    else
        echo -e "${YELLOW}⚠️  PostgreSQL not accessible. Please start PostgreSQL or use Docker.${NC}"
        echo "   To use Docker: docker-compose -f docker-compose-new.yml up -d postgres mongodb"
    fi
else
    echo -e "${YELLOW}⚠️  PostgreSQL not found. Using Docker or install PostgreSQL.${NC}"
fi

# Start backend
echo -e "${BLUE}🔧 Starting Express.js backend...${NC}"
cd "$(dirname "$0")/backend-express"

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

mkdir -p uploads

# Start backend in background
echo -e "${GREEN}✅ Starting backend on http://localhost:5000${NC}"
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!

sleep 3

# Start frontend
echo -e "${BLUE}🎨 Starting React frontend...${NC}"
cd ../frontend-react

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  🎉 ChargerBNB is starting!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  Frontend: ${BLUE}http://localhost:3000${NC}"
echo -e "  Backend:  ${BLUE}http://localhost:5000${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping services...${NC}"
    kill $BACKEND_PID 2>/dev/null
    echo -e "${GREEN}✅ Services stopped${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

npm start

