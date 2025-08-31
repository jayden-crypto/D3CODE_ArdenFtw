from http.server import BaseHTTPRequestHandler
import json

def handler(request):
    if request.method == 'GET':
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Hello from Vercel Python Serverless Function!'}),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        }
    
    return {
        'statusCode': 405,
        'body': json.dumps({'error': 'Method not allowed'}),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    }
