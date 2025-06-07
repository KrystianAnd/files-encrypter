#!/bin/bash

export SECRET_KEY="krystianandrzejak"
export DEBUG=1
export DJANGO_ALLOWED_HOST="localhost 127.0.0.1 [::1] 0.0.0.0"

echo "  Starting backend (Django)..."
cd backend/file_renamer
python3 manage.py runserver &
BACKEND_PID=$!

echo "  Starting frontend (Next.js)..."
cd ../../frontend/app_frontend
npm run dev &
FRONTEND_PID=$!

trap "echo ' Stopping...'; kill $BACKEND_PID $FRONTEND_PID" SIGINT

wait
