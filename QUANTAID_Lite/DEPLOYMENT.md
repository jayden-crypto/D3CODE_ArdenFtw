# QUANTAID Lite - Vercel Deployment Guide

This guide will help you deploy the QUANTAID Lite application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Git installed on your local machine
3. Node.js and npm (for local development)
4. Python 3.9+ (for local development)

## Deployment Steps

### 1. Push to GitHub

First, make sure all your changes are committed and pushed to your GitHub repository.

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." > "Project"
3. Import your GitHub repository
4. In the project settings:
   - Set the root directory to the project root (where `vercel.json` is located)
   - Set the build command to: `cd frontend && npm install && npm run build`
   - Set the output directory to: `frontend/build`
   - Add environment variables (see below)

### 3. Environment Variables

Add these environment variables in your Vercel project settings:

```
NODE_ENV=production
REACT_APP_API_URL=/api
```

### 4. Deploy

Click "Deploy" and wait for the deployment to complete. Vercel will provide you with a public URL for your application.

## Local Development

To run the application locally:

1. Start the backend:
   ```bash
   cd backend
   python -m uvicorn main:app --reload
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Project Structure

- `/api` - Serverless API endpoints
- `/backend` - Backend FastAPI application
- `/frontend` - React frontend application
- `vercel.json` - Vercel configuration
- `requirements-vercel.txt` - Python dependencies for Vercel

## Troubleshooting

- If you get 404 errors, make sure the API routes in `vercel.json` are correct
- Check the Vercel deployment logs for build errors
- Make sure all environment variables are set correctly

## Support

For any issues, please open an issue in the GitHub repository.
