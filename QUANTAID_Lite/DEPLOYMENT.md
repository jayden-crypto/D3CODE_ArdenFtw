# QUANTAID Lite - Complete Deployment Guide

## Table of Contents
1. [Vercel Deployment](#vercel-deployment)
2. [Environment Variables](#environment-variables)
3. [Testing the Deployment](#testing-the-deployment)
4. [Troubleshooting](#troubleshooting)
5. [Local Development Setup](#local-development)

## Vercel Deployment

### Step 1: Initial Setup
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Connect your GitHub account if not already connected
4. Find and select your `D3CODE_ArdenFtw` repository
5. Click "Import"

### Step 2: Configure Project
1. **Project Name**: `quantaid-lite` (or your preferred name)
2. **Framework Preset**: Select "Create React App"
3. **Root Directory**: (leave as default)
4. **Build & Development Settings**:
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/build`
   - Install Command: `cd frontend && npm install`

### Step 3: Environment Variables
Click "Add" under Environment Variables and add:

```
NODE_ENV = production
REACT_APP_API_URL = /api
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for the build to complete (5-10 minutes)
3. Your app will be available at: `https://your-project.vercel.app`

## Environment Variables

### Required for Production
```
NODE_ENV=production
REACT_APP_API_URL=/api
```

### For Local Development (`.env.local`)
```
REACT_APP_API_URL=http://localhost:8000
```

## Testing the Deployment

### API Endpoints to Test
1. Health Check: `https://your-project.vercel.app/api/health`
2. Climate Data: `https://your-project.vercel.app/api/data/climate`
3. Crop Data: `https://your-project.vercel.app/api/data/crops`

### Frontend Testing
1. Open your deployed URL
2. Check console for errors (Right-click → Inspect → Console)
3. Test all major features

## Troubleshooting

### Common Issues
1. **Build Fails**
   - Check build logs in Vercel
   - Ensure all dependencies are in `frontend/package.json`
   - Verify Node.js version (use 16.x or 18.x)

2. **API Returns 404**
   - Check if API routes exist in `/api` directory
   - Verify `vercel.json` routing

3. **CORS Errors**
   - Ensure CORS is properly configured in `api/index.py`
   - Check if frontend is making requests to correct URL

## Local Development

### Backend
```bash
cd backend
python -m uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

The application will be available at `http://localhost:3000`

## Updating the Deployment
1. Push changes to your GitHub repository
2. Vercel will automatically redeploy if you enabled automatic deployments
3. Monitor the deployment in the Vercel dashboard

## Need Help?
For any issues, please check the [GitHub Issues](https://github.com/yourusername/D3CODE_ArdenFtw/issues) or create a new issue.
