#!/bin/bash

echo "🛑 Stopping ChargerBNB..."

# Kill backend process
pkill -f "npm run dev" || pkill -f "ts-node.*server.ts" || true

# Stop databases
cd "$(dirname "$0")"
docker-compose -f docker-compose-new.yml stop postgres mongodb

echo "✅ All services stopped"

