from http.server import BaseHTTPRequestHandler
import json
from backend.data_pipeline import DataPipeline
from backend.championship_ai import ChampionshipAI

# Initialize components
data_pipeline = DataPipeline()
ai_predictor = ChampionshipAI()

def get_dashboard_data(event):
    try:
        # Get data from various sources
        climate_data = data_pipeline.get_climate_data()
        crop_data = data_pipeline.get_crop_data()
        
        # Generate some predictions for the dashboard
        predictions = []
        for _ in range(3):
            predictions.append({
                'region': 'Global',
                'crop': 'Wheat',
                'yield_prediction': ai_predictor.predict(
                    temperature=25,
                    rainfall=100,
                    crop_type='wheat',
                    region='global'
                )
            })
        
        # Create dashboard response
        dashboard_data = {
            'metrics': {
                'total_crises': 12,
                'active_alerts': 5,
                'regions_monitored': 8,
                'prediction_accuracy': 0.92
            },
            'recent_activity': [
                {'id': 1, 'type': 'alert', 'message': 'Drought detected in region X', 'time': '2025-08-31T10:30:00Z'},
                {'id': 2, 'type': 'update', 'message': 'New climate data received', 'time': '2025-08-31T09:15:00Z'},
                {'id': 3, 'type': 'alert', 'message': 'Food shortage predicted in region Y', 'time': '2025-08-30T16:45:00Z'}
            ],
            'predictions': predictions,
            'last_updated': '2025-08-31T13:45:00Z'
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': json.dumps({
                'success': True,
                'data': dashboard_data
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
    if event['httpMethod'] == 'GET':
        return get_dashboard_data(event)
    
    return {
        'statusCode': 405,
        'body': json.dumps({'error': 'Method not allowed'})
    }
