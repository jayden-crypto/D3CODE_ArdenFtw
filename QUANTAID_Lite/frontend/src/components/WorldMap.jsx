import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Thermometer,
  CloudRain,
  Wheat,
  Heart,
  Zap,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

const WorldMap = () => {
  const [crisisHotspots, setCrisisHotspots] = useState([]);
  const [selectedCrisis, setSelectedCrisis] = useState(null);
  const [mapLayers, setMapLayers] = useState({
    temperature: true,
    rainfall: true,
    population: true,
    food_security: true
  });
  const [isLoading, setIsLoading] = useState(false);

  // Generate realistic crisis hotspots
  const generateCrisisHotspots = () => {
    const hotspots = [
      {
        id: 1,
        name: "Horn of Africa",
        country: "Somalia/Ethiopia",
        coordinates: { lat: 5.0, lng: 46.0 },
        severity: "critical",
        type: "drought",
        affected_population: 15000000,
        risk_score: 9.2,
        temperature_anomaly: +3.5,
        rainfall_deficit: -65,
        food_security_index: 2.1,
        predicted_yield: 0.3,
        resources_needed: {
          food: "50,000 tonnes",
          water: "2M liters/day",
          medical: "500 kits"
        },
        timeline: "Immediate action required",
        description: "Severe drought conditions affecting crop yields and livestock"
      },
      {
        id: 2,
        name: "Bangladesh Delta",
        country: "Bangladesh",
        coordinates: { lat: 23.7, lng: 90.4 },
        severity: "high",
        type: "flooding",
        affected_population: 8500000,
        risk_score: 8.1,
        temperature_anomaly: +1.2,
        rainfall_deficit: +180,
        food_security_index: 3.2,
        predicted_yield: 0.6,
        resources_needed: {
          shelter: "10,000 tents",
          water_purification: "200 units",
          medical: "300 kits"
        },
        timeline: "72 hours",
        description: "Monsoon flooding threatening rice production and displacement"
      },
      {
        id: 3,
        name: "Sahel Region",
        country: "Mali/Niger",
        coordinates: { lat: 16.0, lng: 0.0 },
        severity: "high",
        type: "desertification",
        affected_population: 12000000,
        risk_score: 7.8,
        temperature_anomaly: +2.8,
        rainfall_deficit: -45,
        food_security_index: 2.5,
        predicted_yield: 0.4,
        resources_needed: {
          food: "30,000 tonnes",
          seeds: "500 tonnes",
          water: "1.5M liters/day"
        },
        timeline: "1 week",
        description: "Advancing desertification reducing arable land and crop yields"
      },
      {
        id: 4,
        name: "Central America",
        country: "Guatemala/Honduras",
        coordinates: { lat: 15.0, lng: -90.0 },
        severity: "medium",
        type: "hurricane",
        affected_population: 3200000,
        risk_score: 6.5,
        temperature_anomaly: +0.8,
        rainfall_deficit: +220,
        food_security_index: 3.8,
        predicted_yield: 0.7,
        resources_needed: {
          emergency: "1,000 kits",
          reconstruction: "500 units",
          medical: "150 kits"
        },
        timeline: "2 weeks",
        description: "Hurricane season threatening coffee and corn production"
      },
      {
        id: 5,
        name: "Australian Outback",
        country: "Australia",
        coordinates: { lat: -25.0, lng: 135.0 },
        severity: "medium",
        type: "wildfire",
        affected_population: 500000,
        risk_score: 6.2,
        temperature_anomaly: +4.1,
        rainfall_deficit: -80,
        food_security_index: 4.2,
        predicted_yield: 0.5,
        resources_needed: {
          firefighting: "200 units",
          evacuation: "50 vehicles",
          medical: "100 kits"
        },
        timeline: "Immediate",
        description: "Extreme heat and drought conditions increasing wildfire risk"
      }
    ];

    setCrisisHotspots(hotspots);
  };

  useEffect(() => {
    generateCrisisHotspots();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    generateCrisisHotspots();
    setIsLoading(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'drought': return <Thermometer className="w-4 h-4" />;
      case 'flooding': return <CloudRain className="w-4 h-4" />;
      case 'desertification': return <Wheat className="w-4 h-4" />;
      case 'hurricane': return <Zap className="w-4 h-4" />;
      case 'wildfire': return <AlertTriangle className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const toggleLayer = (layer) => {
    setMapLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

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
            🌍 Global Crisis Monitoring System
          </h1>
          <p className="text-xl text-gray-300">
            Real-time visualization of global food security threats and resource allocation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* World Map Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span>Crisis Hotspots Map</span>
                  </CardTitle>
                  <Button
                    onClick={refreshData}
                    disabled={isLoading}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <CardDescription className="text-gray-400">
                  Interactive map showing real-time crisis locations and severity levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Map Layers Control */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Map Layers</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(mapLayers).map(([layer, enabled]) => (
                      <Button
                        key={layer}
                        variant="outline"
                        size="sm"
                        onClick={() => toggleLayer(layer)}
                        className={`${
                          enabled 
                            ? 'bg-blue-500/20 border-blue-400 text-blue-400' 
                            : 'border-slate-600 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {enabled ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                        {layer.replace('_', ' ').toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Simplified World Map with Crisis Points */}
                <div className="relative bg-slate-900 rounded-lg p-8 min-h-[400px] overflow-hidden">
                  {/* World Map Background */}
                  <svg
                    viewBox="0 0 800 400"
                    className="w-full h-full absolute inset-0 opacity-20"
                  >
                    {/* Simplified world continents */}
                    <path
                      d="M100 100 L200 80 L300 120 L250 180 L150 160 Z"
                      fill="#334155"
                      stroke="#475569"
                    />
                    <path
                      d="M350 90 L500 70 L600 110 L580 200 L400 180 Z"
                      fill="#334155"
                      stroke="#475569"
                    />
                    <path
                      d="M50 220 L180 200 L200 280 L120 300 Z"
                      fill="#334155"
                      stroke="#475569"
                    />
                    <path
                      d="M500 250 L650 230 L700 320 L550 340 Z"
                      fill="#334155"
                      stroke="#475569"
                    />
                  </svg>

                  {/* Crisis Hotspots */}
                  {crisisHotspots.map((crisis, index) => {
                    const x = ((crisis.coordinates.lng + 180) / 360) * 800;
                    const y = ((90 - crisis.coordinates.lat) / 180) * 400;
                    
                    return (
                      <motion.div
                        key={crisis.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{ left: `${(x / 800) * 100}%`, top: `${(y / 400) * 100}%` }}
                        onClick={() => setSelectedCrisis(crisis)}
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className={`w-6 h-6 rounded-full ${getSeverityColor(crisis.severity)} shadow-lg`}
                        />
                        <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${getSeverityBadge(crisis.severity)}`}>
                          {crisis.name}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 flex items-center justify-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Critical</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">High</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Medium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Low</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Crisis Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {selectedCrisis ? (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    {getTypeIcon(selectedCrisis.type)}
                    <span>{selectedCrisis.name}</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {selectedCrisis.country} • {selectedCrisis.timeline}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Severity Badge */}
                  <div className="flex items-center justify-between">
                    <Badge className={getSeverityBadge(selectedCrisis.severity)}>
                      {selectedCrisis.severity.toUpperCase()} RISK
                    </Badge>
                    <span className="text-2xl font-bold text-white">
                      {selectedCrisis.risk_score}/10
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm">
                    {selectedCrisis.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-400 text-xs">Affected</span>
                      </div>
                      <p className="text-white font-semibold">
                        {(selectedCrisis.affected_population / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Thermometer className="w-4 h-4 text-red-400" />
                        <span className="text-gray-400 text-xs">Temp Anomaly</span>
                      </div>
                      <p className="text-white font-semibold">
                        {selectedCrisis.temperature_anomaly > 0 ? '+' : ''}{selectedCrisis.temperature_anomaly}°C
                      </p>
                    </div>
                    
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <CloudRain className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-400 text-xs">Rainfall</span>
                      </div>
                      <p className="text-white font-semibold">
                        {selectedCrisis.rainfall_deficit > 0 ? '+' : ''}{selectedCrisis.rainfall_deficit}%
                      </p>
                    </div>
                    
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Wheat className="w-4 h-4 text-green-400" />
                        <span className="text-gray-400 text-xs">Yield</span>
                      </div>
                      <p className="text-white font-semibold">
                        {(selectedCrisis.predicted_yield * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>

                  {/* Resources Needed */}
                  <div>
                    <h4 className="text-white font-semibold mb-2">Resources Needed</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedCrisis.resources_needed).map(([type, amount]) => (
                        <div key={type} className="flex justify-between items-center text-sm">
                          <span className="text-gray-400 capitalize">{type.replace('_', ' ')}</span>
                          <span className="text-white font-medium">{amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    Deploy Emergency Response
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    Select a Crisis Hotspot
                  </h3>
                  <p className="text-sm text-gray-400">
                    Click on any crisis point on the map to view detailed information and response options
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Global Statistics */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span>Global Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Active Crises</span>
                    <span className="text-white font-bold">{crisisHotspots.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">People Affected</span>
                    <span className="text-white font-bold">
                      {(crisisHotspots.reduce((sum, crisis) => sum + crisis.affected_population, 0) / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Avg Risk Score</span>
                    <span className="text-white font-bold">
                      {(crisisHotspots.reduce((sum, crisis) => sum + crisis.risk_score, 0) / crisisHotspots.length).toFixed(1)}/10
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Critical Alerts</span>
                    <span className="text-red-400 font-bold">
                      {crisisHotspots.filter(crisis => crisis.severity === 'critical').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
