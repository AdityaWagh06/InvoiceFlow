# Ledgerly AI - Invoice and ERP Automation

This repository contains the frontend (Next.js 14) and backend (FastAPI) for the Ledgerly AI platform.

## Structure
- frontend: Next.js 14 App Router + Tailwind CSS
- backend: FastAPI + Celery + PostgreSQL + Supabase

## Frontend setup
1. Copy frontend/.env.example to frontend/.env.local and fill values.
2. Install dependencies: npm install
3. Run development server: npm run dev

## Backend setup
1. Copy backend/.env.example to backend/.env and fill values.
2. Create a virtual environment and install dependencies: pip install -r requirements.txt
3. Run the API: uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

## Celery worker
1. Start Redis and update backend/.env.
2. Run Celery worker: celery -A app.tasks.celery_app.celery_app worker --loglevel=info
