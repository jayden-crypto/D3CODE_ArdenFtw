from http.server import BaseHTTPRequestHandler
import json
from backend.championship_ai import ChampionshipAI

ai_predictor = ChampionshipAI()

def predict_yield(event):
    try:
        # Parse the request body
        body = json.loads(event.get('body', '{}'))
        
        # Call the prediction function
        result = ai_predictor.predict(
            temperature=body.get('temperature', 0),
            rainfall=body.get('rainfall', 0),
            crop_type=body.get('crop_type', 'wheat'),
            region=body.get('region', 'global')
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': json.dumps({
                'success': True,
                'data': result,
                'model': 'ChampionshipAI',
                'version': '1.0.0'
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'success': False,
                'error': str(e)
            })
        }

def handler(event, context):
    if event['httpMethod'] == 'POST':
        return predict_yield(event)
    
    return {
        'statusCode': 405,
        'body': json.dumps({'error': 'Method not allowed'})
    }
