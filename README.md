# Telegram Booking Backend

Simple Express.js API for handling carpet cleaning bookings and sending Telegram notifications.

## Deploy to Railway (Free)

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Upload this folder to the repo

```bash
cd telegram-backend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/carpet-booking-backend.git
git push -u origin main
```

### Step 2: Deploy on Railway

1. Go to **https://railway.app**
2. Sign up/Login with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your `carpet-booking-backend` repository
6. Railway will auto-detect Node.js and deploy

### Step 3: Add Environment Variables

1. In Railway dashboard, click your project
2. Go to **Variables** tab
3. Add these variables:
   - `TELEGRAM_BOT_TOKEN` = `8529927558:AAGrTuc-0_WDTlarNsDNwtytwYy7Cd1T2xo`
   - `TELEGRAM_CHAT_ID` = `-5067456597`
4. Railway will auto-redeploy

### Step 4: Get Your API URL

1. In Railway dashboard, click **"Settings"**
2. Under **"Domains"**, click **"Generate Domain"**
3. Copy the URL (e.g., `https://carpet-booking-backend-production.up.railway.app`)
4. Your API endpoint will be: `https://YOUR_URL/api/bookings`

## Test the API

```bash
curl -X POST https://YOUR_URL/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "01234567890",
    "service": "Domestic Carpet Cleaning",
    "date": "2024-12-01"
  }'
```

## Local Testing

```bash
npm install
TELEGRAM_BOT_TOKEN=your_token TELEGRAM_CHAT_ID=your_chat_id node server.js
```

## API Endpoint

**POST** `/api/bookings`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "01284530680",
  "service": "Domestic Carpet Cleaning",
  "date": "2024-12-01",
  "message": "Optional notes"
}
```

Response:
```json
{
  "success": true,
  "message": "Booking submitted!"
}
```
