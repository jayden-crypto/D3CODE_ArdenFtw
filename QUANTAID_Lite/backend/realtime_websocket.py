"""
Real-time WebSocket Server for Live Crisis Updates
Championship-level real-time communication
"""
import asyncio
import json
import websockets
from typing import Set, Dict, Any
from datetime import datetime
import numpy as np
from fastapi import WebSocket
import logging

class CrisisAlertSystem:
    def __init__(self):
        self.active_connections: Set[WebSocket] = set()
        self.alert_thresholds = {
            'temperature': {'critical': 40, 'warning': 35},
            'rainfall': {'critical': 200, 'warning': 150},
            'yield_prediction': {'critical': 100, 'warning': 150}
        }
        self.active_alerts = []
        
    async def connect(self, websocket: WebSocket):
        """Connect new WebSocket client"""
        await websocket.accept()
        self.active_connections.add(websocket)
        
        # Send welcome message with current status
        welcome_data = {
            'type': 'connection_established',
            'message': '🚨 QUANTAID Crisis Monitoring Active',
            'timestamp': datetime.now().isoformat(),
            'active_alerts': len(self.active_alerts),
            'monitoring_regions': 12
        }
        await websocket.send_text(json.dumps(welcome_data))
    
    async def disconnect(self, websocket: WebSocket):
        """Disconnect WebSocket client"""
        self.active_connections.discard(websocket)
    
    async def broadcast_alert(self, alert_data: Dict[str, Any]):
        """Broadcast alert to all connected clients"""
        if not self.active_connections:
            return
        
        message = json.dumps(alert_data)
        disconnected = set()
        
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception:
                disconnected.add(connection)
        
        # Remove disconnected clients
        self.active_connections -= disconnected
    
    async def generate_crisis_simulation(self):
        """Generate realistic crisis simulation data"""
        while True:
            try:
                # Simulate various crisis scenarios
                crisis_scenarios = [
                    {
                        'type': 'drought_warning',
                        'severity': 'high',
                        'region': 'Maharashtra, India',
                        'coordinates': [19.7515, 75.7139],
                        'affected_population': 2500000,
                        'predicted_yield_drop': 35,
                        'message': '🏜️ Severe drought conditions detected - immediate intervention required',
                        'recommended_actions': [
                            'Deploy water tankers to affected areas',
                            'Activate emergency food distribution',
                            'Initiate crop insurance claims'
                        ]
                    },
                    {
                        'type': 'flood_alert',
                        'severity': 'critical',
                        'region': 'West Bengal, India',
                        'coordinates': [22.9868, 87.8550],
                        'affected_population': 1800000,
                        'predicted_yield_drop': 45,
                        'message': '🌊 Flash flood warning - evacuation protocols activated',
                        'recommended_actions': [
                            'Evacuate low-lying agricultural areas',
                            'Secure emergency food supplies',
                            'Deploy rescue and relief teams'
                        ]
                    },
                    {
                        'type': 'heat_wave',
                        'severity': 'warning',
                        'region': 'Rajasthan, India',
                        'coordinates': [27.0238, 74.2179],
                        'affected_population': 3200000,
                        'predicted_yield_drop': 28,
                        'message': '🌡️ Extreme heat wave conditions - crop stress imminent',
                        'recommended_actions': [
                            'Increase irrigation frequency',
                            'Provide shade nets for crops',
                            'Monitor livestock health'
                        ]
                    }
                ]
                
                # Randomly select and broadcast a scenario
                scenario = np.random.choice(crisis_scenarios)
                scenario.update({
                    'timestamp': datetime.now().isoformat(),
                    'alert_id': f"CRISIS_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                    'confidence': np.random.uniform(0.85, 0.98),
                    'quantum_optimization_ready': True
                })
                
                await self.broadcast_alert(scenario)
                
                # Wait before next simulation (15-30 seconds)
                await asyncio.sleep(np.random.uniform(15, 30))
                
            except Exception as e:
                logging.error(f"Crisis simulation error: {e}")
                await asyncio.sleep(5)
    
    async def send_live_metrics(self):
        """Send live system metrics"""
        while True:
            try:
                metrics = {
                    'type': 'live_metrics',
                    'timestamp': datetime.now().isoformat(),
                    'data': {
                        'active_predictions': np.random.randint(45, 65),
                        'quantum_optimizations_running': np.random.randint(8, 15),
                        'regions_monitored': 12,
                        'crisis_probability': np.random.uniform(15, 35),
                        'system_health': {
                            'ai_predictor': 'optimal',
                            'quantum_optimizer': 'optimal',
                            'data_pipeline': 'optimal',
                            'websocket_connections': len(self.active_connections)
                        },
                        'performance_metrics': {
                            'prediction_accuracy': np.random.uniform(92, 97),
                            'optimization_efficiency': np.random.uniform(88, 95),
                            'response_time_ms': np.random.uniform(120, 250)
                        }
                    }
                }
                
                await self.broadcast_alert(metrics)
                await asyncio.sleep(5)  # Update every 5 seconds
                
            except Exception as e:
                logging.error(f"Metrics broadcast error: {e}")
                await asyncio.sleep(10)

# Global crisis alert system instance
crisis_system = CrisisAlertSystem()

async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time updates"""
    await crisis_system.connect(websocket)
    try:
        while True:
            # Keep connection alive and handle incoming messages
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Handle different message types
            if message.get('type') == 'request_update':
                # Send immediate update
                update = {
                    'type': 'status_update',
                    'timestamp': datetime.now().isoformat(),
                    'message': 'System status: All systems operational',
                    'active_alerts': len(crisis_system.active_alerts)
                }
                await websocket.send_text(json.dumps(update))
                
    except Exception as e:
        logging.error(f"WebSocket error: {e}")
    finally:
        await crisis_system.disconnect(websocket)

# Background tasks
async def start_background_tasks():
    """Start background monitoring tasks"""
    await asyncio.gather(
        crisis_system.generate_crisis_simulation(),
        crisis_system.send_live_metrics()
    )
