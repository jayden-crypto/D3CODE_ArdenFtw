from http.server import BaseHTTPRequestHandler
import json
from backend.data_pipeline import DataPipeline

data_pipeline = DataPipeline()

def get_climate_data(event):
    try:
        # Call the data pipeline to get climate data
        climate_data = data_pipeline.get_climate_data()
        
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
                'data': climate_data,
                'source': 'NOAA Climate Data',
                'last_updated': '2025-08-31T13:45:00Z'
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
        return get_climate_data(event)
    
    return {
        'statusCode': 405,
        'body': json.dumps({'error': 'Method not allowed'})
    }
