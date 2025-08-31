import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3,
  Thermometer,
  CloudRain,
  Droplets,
  FlaskConical,
  Mountain,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const AdvancedAIPredictor = () => {
  const [parameters, setParameters] = useState({
    temperature: 25,
    rainfall: 750,
    humidity: 65,
    soil_ph: 6.5,
    elevation: 100,
    season: 2
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionHistory, setPredictionHistory] = useState([]);

  const runPrediction = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parameters)
      });
      const result = await response.json();
      setPrediction(result);
      
      // Add to history
      setPredictionHistory(prev => [...prev.slice(-9), {
        timestamp: new Date().toLocaleTimeString(),
        yield: result.predicted_yield,
        confidence: result.confidence_score
      }]);
    } catch (error) {
      console.error('Prediction failed:', error);
    }
    setIsLoading(false);
  };

  const featureImportanceData = prediction ? Object.entries(prediction.feature_importance || {}).map(([key, value]) => ({
    feature: key.replace('_', ' ').toUpperCase(),
    importance: value * 100
  })) : [];

  const modelPerformanceData = prediction ? Object.entries(prediction.individual_models || {}).map(([model, yield_val]) => ({
    model: model.replace('_', ' ').toUpperCase(),
    yield: yield_val,
    ensemble: prediction.predicted_yield
  })) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            🧠 Advanced AI Ensemble Predictor
          </h1>
          <p className="text-xl text-gray-300">
            Multi-model ensemble with neural networks, random forests, and gradient boosting
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Parameters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <FlaskConical className="w-5 h-5 text-blue-400" />
                  <span>Environmental Parameters</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Adjust parameters to see AI predictions in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ParameterSlider
                  icon={<Thermometer className="w-4 h-4 text-red-400" />}
                  label="Temperature (°C)"
                  value={parameters.temperature}
                  min={0}
                  max={50}
                  step={0.5}
                  onChange={(value) => setParameters(prev => ({ ...prev, temperature: value[0] }))}
                />
                
                <ParameterSlider
                  icon={<CloudRain className="w-4 h-4 text-blue-400" />}
                  label="Rainfall (mm/month)"
                  value={parameters.rainfall}
                  min={0}
                  max={2000}
                  step={10}
                  onChange={(value) => setParameters(prev => ({ ...prev, rainfall: value[0] }))}
                />
                
                <ParameterSlider
                  icon={<Droplets className="w-4 h-4 text-cyan-400" />}
                  label="Humidity (%)"
                  value={parameters.humidity}
                  min={0}
                  max={100}
                  step={1}
                  onChange={(value) => setParameters(prev => ({ ...prev, humidity: value[0] }))}
                />
                
                <ParameterSlider
                  icon={<FlaskConical className="w-4 h-4 text-green-400" />}
                  label="Soil pH"
                  value={parameters.soil_ph}
                  min={3}
                  max={10}
                  step={0.1}
                  onChange={(value) => setParameters(prev => ({ ...prev, soil_ph: value[0] }))}
                />
                
                <ParameterSlider
                  icon={<Mountain className="w-4 h-4 text-gray-400" />}
                  label="Elevation (m)"
                  value={parameters.elevation}
                  min={0}
                  max={3000}
                  step={10}
                  onChange={(value) => setParameters(prev => ({ ...prev, elevation: value[0] }))}
                />
                
                <ParameterSlider
                  icon={<Calendar className="w-4 h-4 text-purple-400" />}
                  label="Season (1=Winter, 2=Spring, 3=Summer, 4=Autumn)"
                  value={parameters.season}
                  min={1}
                  max={4}
                  step={1}
                  onChange={(value) => setParameters(prev => ({ ...prev, season: value[0] }))}
                />

                <Button 
                  onClick={runPrediction}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-3 text-lg"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Brain className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? 'Processing...' : 'Run AI Prediction'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Prediction Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {prediction && (
              <>
                {/* Main Prediction */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span>Prediction Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2"
                      >
                        {prediction.predicted_yield.toFixed(1)}
                      </motion.div>
                      <p className="text-gray-300 text-lg">tonnes/hectare</p>
                      <p className="text-sm text-gray-400 mt-2">{prediction.advanced_analytics?.yield_percentile}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                        <p className="text-gray-400 text-sm">Confidence</p>
                        <p className="text-blue-400 font-bold text-xl">{(prediction.confidence_score * 100).toFixed(1)}%</p>
                      </div>
                      <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                        <p className="text-gray-400 text-sm">Risk Level</p>
                        <p className={`font-bold text-xl ${
                          prediction.risk_level === 'low' ? 'text-green-400' :
                          prediction.risk_level === 'medium' ? 'text-yellow-400' :
                          prediction.risk_level === 'high' ? 'text-orange-400' : 'text-red-400'
                        }`}>
                          {prediction.risk_level.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    {/* Confidence Interval */}
                    <div className="mb-4">
                      <p className="text-gray-400 text-sm mb-2">95% Confidence Interval</p>
                      <div className="bg-slate-700 rounded-full h-4 relative">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full"
                          style={{ 
                            width: `${((prediction.confidence_interval.upper_95 - prediction.confidence_interval.lower_95) / 400) * 100}%`,
                            marginLeft: `${(prediction.confidence_interval.lower_95 / 400) * 100}%`
                          }}
                        />
                        <div 
                          className="absolute top-0 w-1 h-4 bg-white"
                          style={{ left: `${(prediction.predicted_yield / 400) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{prediction.confidence_interval.lower_95.toFixed(0)}</span>
                        <span>{prediction.confidence_interval.upper_95.toFixed(0)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Factors & Recommendations */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      <span>Risk Analysis & Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {prediction.risk_factors?.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-red-400 font-semibold mb-2">Risk Factors:</h4>
                        <div className="space-y-2">
                          {prediction.risk_factors.map((risk, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center space-x-2 text-gray-300"
                            >
                              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                              <span className="text-sm">{risk}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-green-400 font-semibold mb-2">Recommendations:</h4>
                      <div className="space-y-2">
                        {prediction.recommendations?.slice(0, 5).map((rec, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-2 text-gray-300"
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </motion.div>
        </div>

        {/* Advanced Analytics */}
        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8"
          >
            {/* Feature Importance */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  <span>Feature Importance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={featureImportanceData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="feature" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <PolarRadiusAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                    <Radar
                      name="Importance"
                      dataKey="importance"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Model Performance */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-cyan-400" />
                  <span>Model Ensemble Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modelPerformanceData.map((model, index) => (
                    <div key={model.model} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">{model.model}</span>
                        <span className="text-white font-semibold">{model.yield.toFixed(1)}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(model.yield / 400) * 100}%` }}
                          transition={{ delay: index * 0.1, duration: 0.8 }}
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t border-slate-600 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-semibold">ENSEMBLE PREDICTION</span>
                      <span className="text-green-400 font-bold text-lg">{prediction.predicted_yield.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 mt-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(prediction.predicted_yield / 400) * 100}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Prediction History */}
        {predictionHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span>Prediction History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={predictionHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="timestamp" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="yield" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ParameterSlider = ({ icon, label, value, min, max, step, onChange }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {icon}
        <label className="text-gray-300 text-sm font-medium">{label}</label>
      </div>
      <span className="text-white font-semibold">{value}</span>
    </div>
    <Slider
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={onChange}
      className="w-full"
    />
  </div>
);

export default AdvancedAIPredictor;
