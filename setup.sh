#!/bin/bash

echo "🚀 Setting up Full-Stack Authentication App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running (optional check)
echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "✅ Dependencies installed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Make sure MongoDB is running (locally or update .env with cloud URI)"
echo "2. Configure backend/.env file with your settings"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start frontend: cd frontend && npm run dev"
echo ""
echo "🎉 Setup complete! Happy coding!"
