from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Add backend to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.main import app
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

# Create a FastAPI instance for Vercel
vercel_app = FastAPI()

# Add CORS middleware
vercel_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the original app's routes
vercel_app.mount("", app)

# Vercel Serverless Function handler
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({
            'status': 'ok',
            'message': 'QUANTAID Lite API is running on Vercel',
            'endpoints': [
                '/api/predict - AI prediction endpoint',
                '/api/optimize - Quantum optimization endpoint',
                '/api/data/climate - Climate data',
                '/api/data/crops - Crop data',
                '/api/dashboard - Dashboard data',
                '/api/status - System status'
            ]
        }).encode())

# For local testing
if __name__ == "__main__":
    uvicorn.run("api.index:vercel_app", host="0.0.0.0", port=3000, reload=True)
