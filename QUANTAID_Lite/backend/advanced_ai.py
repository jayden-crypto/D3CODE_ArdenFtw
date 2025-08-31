"""
Advanced AI Predictor with Ensemble Methods and Real-time Data
Championship-level ML implementation for hackathon winning
"""
import requests
import json
import math
import random
from datetime import datetime, timedelta
from typing import Dict, List, Any, Tuple
import asyncio

class AdvancedAIPredictor:
    def __init__(self):
        self.models = {
            'random_forest': RandomForestRegressor(n_estimators=100, random_state=42),
            'gradient_boost': GradientBoostingRegressor(n_estimators=100, random_state=42),
            'linear': LinearRegression()
        }
        self.scaler = StandardScaler()
        self.is_trained = False
        self.feature_importance = {}
        self.model_weights = {}
        self.api_key = None  # Will be set from environment or config
        
    def generate_advanced_training_data(self, samples=1000) -> Tuple[np.ndarray, np.ndarray]:
        """Generate sophisticated synthetic training data with realistic patterns"""
        np.random.seed(42)
        
        # Generate features: temperature, rainfall, humidity, soil_ph, elevation, season
        temperature = np.random.normal(25, 8, samples)  # Celsius
        rainfall = np.random.exponential(50, samples)   # mm/month
        humidity = np.random.normal(65, 15, samples)    # %
        soil_ph = np.random.normal(6.5, 1, samples)    # pH
        elevation = np.random.exponential(200, samples) # meters
        season = np.random.randint(1, 5, samples)       # 1-4 seasons
        
        # Create realistic yield relationships
        base_yield = 200
        temp_effect = -2 * np.abs(temperature - 24)  # Optimal at 24°C
        rain_effect = 0.8 * np.minimum(rainfall, 100) - 0.1 * np.maximum(rainfall - 100, 0)
        humidity_effect = 0.5 * (humidity - 50) / 10
        ph_effect = -10 * np.abs(soil_ph - 6.8)
        elevation_effect = -0.1 * elevation
        season_effect = np.where(season == 2, 20, np.where(season == 3, 15, 0))  # Spring/Summer bonus
        
        # Add climate change and extreme weather effects
        extreme_heat = np.where(temperature > 35, -50, 0)
        drought = np.where(rainfall < 20, -30, 0)
        flood = np.where(rainfall > 200, -40, 0)
        
        yield_tonnes = (base_yield + temp_effect + rain_effect + humidity_effect + 
                       ph_effect + elevation_effect + season_effect + 
                       extreme_heat + drought + flood + np.random.normal(0, 15, samples))
        
        # Ensure realistic bounds
        yield_tonnes = np.maximum(yield_tonnes, 50)  # Minimum viable yield
        yield_tonnes = np.minimum(yield_tonnes, 400) # Maximum possible yield
        
        features = np.column_stack([temperature, rainfall, humidity, soil_ph, elevation, season])
        return features, yield_tonnes
    
    def train_ensemble(self):
        """Train ensemble of models with cross-validation"""
        print("🧠 Training advanced AI ensemble...")
        
        X, y = self.generate_advanced_training_data(2000)
        X_scaled = self.scaler.fit_transform(X)
        
        # Train each model and calculate weights based on performance
        model_scores = {}
        for name, model in self.models.items():
            scores = cross_val_score(model, X_scaled, y, cv=5, scoring='neg_mean_squared_error')
            model_scores[name] = -scores.mean()
            model.fit(X_scaled, y)
            print(f"✅ {name.title()}: RMSE = {model_scores[name]:.2f}")
        
        # Calculate ensemble weights (inverse of error)
        total_inverse_error = sum(1/score for score in model_scores.values())
        self.model_weights = {name: (1/score)/total_inverse_error 
                             for name, score in model_scores.items()}
        
        # Feature importance from Random Forest
        self.feature_importance = {
            'temperature': self.models['random_forest'].feature_importances_[0],
            'rainfall': self.models['random_forest'].feature_importances_[1],
            'humidity': self.models['random_forest'].feature_importances_[2],
            'soil_ph': self.models['random_forest'].feature_importances_[3],
            'elevation': self.models['random_forest'].feature_importances_[4],
            'season': self.models['random_forest'].feature_importances_[5]
        }
        
        self.is_trained = True
        print(f"🎯 Ensemble trained! Weights: {self.model_weights}")
        return True
    
    async def get_real_weather_data(self, lat: float, lon: float) -> Dict[str, Any]:
        """Fetch real-time weather data from OpenWeatherMap API"""
        if not self.api_key:
            # Return mock data if no API key
            return {
                'temperature': 26.5,
                'humidity': 68,
                'rainfall_forecast': 45.2,
                'pressure': 1013.25,
                'wind_speed': 3.2,
                'uv_index': 6.8
            }
        
        try:
            url = f"http://api.openweathermap.org/data/2.5/weather"
            params = {
                'lat': lat,
                'lon': lon,
                'appid': self.api_key,
                'units': 'metric'
            }
            
            response = requests.get(url, params=params, timeout=5)
            if response.status_code == 200:
                data = response.json()
                return {
                    'temperature': data['main']['temp'],
                    'humidity': data['main']['humidity'],
                    'pressure': data['main']['pressure'],
                    'wind_speed': data['wind']['speed'],
                    'rainfall_forecast': data.get('rain', {}).get('1h', 0) * 24 * 30  # Convert to monthly
                }
        except Exception as e:
            print(f"⚠️  Weather API error: {e}")
        
        # Fallback to enhanced synthetic data
        return {
            'temperature': 25 + np.random.normal(0, 3),
            'humidity': 65 + np.random.normal(0, 10),
            'rainfall_forecast': max(0, np.random.exponential(50)),
            'pressure': 1013 + np.random.normal(0, 20),
            'wind_speed': max(0, np.random.exponential(2))
        }
    
    def predict_advanced(self, temperature: float, rainfall: float, 
                        humidity: float = 65, soil_ph: float = 6.5, 
                        elevation: float = 100, season: int = 2,
                        lat: float = None, lon: float = None) -> Dict[str, Any]:
        """Advanced ensemble prediction with confidence intervals"""
        if not self.is_trained:
            self.train_ensemble()
        
        # Prepare features
        features = np.array([[temperature, rainfall, humidity, soil_ph, elevation, season]])
        features_scaled = self.scaler.transform(features)
        
        # Ensemble prediction
        predictions = {}
        for name, model in self.models.items():
            pred = model.predict(features_scaled)[0]
            predictions[name] = pred
        
        # Weighted ensemble
        ensemble_pred = sum(pred * self.model_weights[name] 
                           for name, pred in predictions.items())
        
        # Calculate prediction intervals using model variance
        pred_std = np.std(list(predictions.values()))
        confidence_interval = {
            'lower': ensemble_pred - 1.96 * pred_std,
            'upper': ensemble_pred + 1.96 * pred_std
        }
        
        # Risk assessment with multiple factors
        risk_factors = []
        risk_score = 0
        
        if temperature > 32:
            risk_factors.append("🌡️ Extreme heat stress")
            risk_score += 30
        if temperature < 15:
            risk_factors.append("🥶 Cold stress")
            risk_score += 25
        if rainfall < 30:
            risk_factors.append("🏜️ Drought conditions")
            risk_score += 40
        if rainfall > 150:
            risk_factors.append("🌊 Flood risk")
            risk_score += 35
        if humidity > 85:
            risk_factors.append("🦠 Disease pressure")
            risk_score += 20
        if soil_ph < 5.5 or soil_ph > 8:
            risk_factors.append("⚗️ Soil pH imbalance")
            risk_score += 15
        
        # Climate change adaptation recommendations
        recommendations = []
        if ensemble_pred < 150:
            recommendations.extend([
                "🌱 Consider drought-resistant crop varieties",
                "💧 Implement precision irrigation systems",
                "🛡️ Apply soil conservation techniques"
            ])
        elif ensemble_pred > 300:
            recommendations.extend([
                "📈 Optimize harvesting timing",
                "🏪 Secure storage and distribution channels",
                "💰 Consider crop insurance options"
            ])
        
        # Add seasonal recommendations
        season_advice = {
            1: "❄️ Winter: Focus on soil preparation and planning",
            2: "🌸 Spring: Optimal planting and fertilization",
            3: "☀️ Summer: Monitor irrigation and pest control",
            4: "🍂 Autumn: Harvest optimization and storage"
        }
        recommendations.append(season_advice.get(season, ""))
        
        return {
            'predicted_yield': round(ensemble_pred, 2),
            'confidence_interval': confidence_interval,
            'individual_predictions': predictions,
            'model_weights': self.model_weights,
            'confidence_score': max(0.6, 1 - (pred_std / ensemble_pred)),
            'risk_score': min(100, risk_score),
            'risk_level': 'high' if risk_score > 50 else 'medium' if risk_score > 25 else 'low',
            'risk_factors': risk_factors,
            'recommendations': recommendations,
            'feature_importance': self.feature_importance,
            'prediction_timestamp': datetime.now().isoformat(),
            'model_version': '2.0_ensemble'
        }
    
    def get_crisis_prediction(self, region_data: List[Dict]) -> Dict[str, Any]:
        """Predict regional crisis probability with advanced analytics"""
        crisis_indicators = {
            'regions_at_risk': [],
            'total_affected_population': 0,
            'crisis_probability': 0,
            'severity_distribution': {'low': 0, 'medium': 0, 'high': 0, 'critical': 0},
            'recommended_actions': [],
            'resource_requirements': {}
        }
        
        for region in region_data:
            prediction = self.predict_advanced(
                temperature=region.get('temperature', 25),
                rainfall=region.get('rainfall', 50),
                humidity=region.get('humidity', 65),
                soil_ph=region.get('soil_ph', 6.5),
                elevation=region.get('elevation', 100),
                season=region.get('season', 2)
            )
            
            if prediction['predicted_yield'] < 180:
                crisis_indicators['regions_at_risk'].append({
                    'name': region.get('name', 'Unknown'),
                    'predicted_yield': prediction['predicted_yield'],
                    'risk_level': prediction['risk_level'],
                    'population': region.get('population', 1000000)
                })
                crisis_indicators['total_affected_population'] += region.get('population', 1000000)
        
        # Calculate overall crisis probability
        if crisis_indicators['regions_at_risk']:
            crisis_indicators['crisis_probability'] = min(100, 
                len(crisis_indicators['regions_at_risk']) * 15 + 
                sum(r['population'] for r in crisis_indicators['regions_at_risk']) / 10000000
            )
        
        return crisis_indicators
