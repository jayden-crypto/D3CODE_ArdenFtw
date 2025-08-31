from http.server import BaseHTTPRequestHandler
import json
from backend.championship_quantum import ChampionshipQuantumOptimizer

optimizer = ChampionshipQuantumOptimizer()

def optimize_resources(event):
    try:
        # Parse the request body
        body = json.loads(event.get('body', '{}'))
        
        # Call the optimization function
        result = optimizer.optimize(
            resources=body.get('resources', []),
            constraints=body.get('constraints', {}),
            objective=body.get('objective', 'minimize_cost')
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
                'model': 'ChampionshipQuantum',
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
        return optimize_resources(event)
    
    return {
        'statusCode': 405,
        'body': json.dumps({'error': 'Method not allowed'})
    }
