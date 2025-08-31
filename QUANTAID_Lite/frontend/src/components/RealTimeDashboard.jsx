import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Bell, 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  Globe,
  Brain,
  Atom,
  Users,
  Clock,
  CheckCircle,
  X,
  Zap,
  Heart,
  Shield,
  Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const RealTimeDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [systemMetrics, setSystemMetrics] = useState({
    ai_accuracy: 94.2,
    quantum_efficiency: 87.5,
    active_predictions: 156,
    crisis_alerts: 8,
    response_time: 2.3,
    uptime: 99.8
  });
  const [liveData, setLiveData] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  // Generate live alerts
  const generateAlert = () => {
    const alertTypes = [
      {
        type: 'crisis',
        icon: AlertTriangle,
        color: 'red',
        messages: [
          'Drought conditions worsening in Horn of Africa',
          'Flood risk elevated in Bangladesh Delta',
          'Food security declining in Sahel region',
          'Hurricane approaching Central America'
        ]
      },
      {
        type: 'prediction',
        icon: Brain,
        color: 'blue',
        messages: [
          'AI model detected yield anomaly in wheat belt',
          'Ensemble prediction confidence increased to 96%',
          'New climate pattern identified affecting corn production',
          'Risk assessment updated for 3 regions'
        ]
      },
      {
        type: 'quantum',
        icon: Atom,
        color: 'purple',
        messages: [
          'Quantum optimization completed for resource allocation',
          'QAOA algorithm achieved 18% efficiency gain',
          'Route optimization reduced delivery time by 25%',
          'Quantum circuit depth optimized for faster execution'
        ]
      },
      {
        type: 'system',
        icon: Activity,
        color: 'green',
        messages: [
          'Real-time data sync completed successfully',
          'Model training completed with improved accuracy',
          'System performance optimized',
          'New data sources integrated'
        ]
      }
    ];

    const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];

    return {
      id: Date.now() + Math.random(),
      type: randomType.type,
      icon: randomType.icon,
      color: randomType.color,
      message: randomMessage,
      timestamp: new Date(),
      severity: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      read: false
    };
  };

  // Generate live metrics data
  const generateMetricsData = () => {
    const now = new Date();
    return {
      timestamp: now.toLocaleTimeString(),
      ai_predictions: Math.floor(Math.random() * 20) + 80,
      quantum_operations: Math.floor(Math.random() * 15) + 25,
      crisis_score: Math.floor(Math.random() * 30) + 40,
      response_efficiency: Math.floor(Math.random() * 20) + 75
    };
  };

  useEffect(() => {
    // Add initial alerts
    const initialAlerts = Array.from({ length: 3 }, () => generateAlert());
    setAlerts(initialAlerts);

    // Generate initial live data
    const initialData = Array.from({ length: 10 }, (_, i) => ({
      ...generateMetricsData(),
      timestamp: new Date(Date.now() - (9 - i) * 60000).toLocaleTimeString()
    }));
    setLiveData(initialData);

    // Set up real-time updates
    const alertInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new alert
        const newAlert = generateAlert();
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep last 10 alerts
      }
    }, 3000);

    const metricsInterval = setInterval(() => {
      const newData = generateMetricsData();
      setLiveData(prev => [...prev.slice(-9), newData]); // Keep last 10 data points
      
      // Update system metrics
      setSystemMetrics(prev => ({
        ...prev,
        ai_accuracy: Math.max(90, Math.min(99, prev.ai_accuracy + (Math.random() - 0.5) * 2)),
        quantum_efficiency: Math.max(80, Math.min(95, prev.quantum_efficiency + (Math.random() - 0.5) * 3)),
        active_predictions: Math.max(100, Math.min(200, prev.active_predictions + Math.floor((Math.random() - 0.5) * 10))),
        crisis_alerts: Math.max(0, Math.min(20, prev.crisis_alerts + Math.floor((Math.random() - 0.5) * 2))),
        response_time: Math.max(1, Math.min(5, prev.response_time + (Math.random() - 0.5) * 0.5))
      }));
    }, 2000);

    // Simulate connection status
    const connectionInterval = setInterval(() => {
      setIsConnected(Math.random() > 0.1); // 90% uptime
    }, 10000);

    return () => {
      clearInterval(alertInterval);
      clearInterval(metricsInterval);
      clearInterval(connectionInterval);
    };
  }, []);

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const markAsRead = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
  };

  const getAlertColor = (type, severity) => {
    const colors = {
      crisis: severity === 'high' ? 'bg-red-500' : severity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500',
      prediction: 'bg-blue-500',
      quantum: 'bg-purple-500',
      system: 'bg-green-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800 border-gray-200';
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
            ⚡ Real-Time Crisis Command Center
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="text-sm font-medium">{isConnected ? 'LIVE' : 'DISCONNECTED'}</span>
            </div>
            <p className="text-xl text-gray-300">
              Advanced AI monitoring and quantum-optimized response coordination
            </p>
          </div>
        </motion.div>

        {/* System Metrics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          <MetricCard
            icon={<Brain className="w-5 h-5 text-blue-400" />}
            label="AI Accuracy"
            value={`${systemMetrics.ai_accuracy.toFixed(1)}%`}
            trend={+0.3}
            color="blue"
          />
          <MetricCard
            icon={<Atom className="w-5 h-5 text-purple-400" />}
            label="Quantum Efficiency"
            value={`${systemMetrics.quantum_efficiency.toFixed(1)}%`}
            trend={+1.2}
            color="purple"
          />
          <MetricCard
            icon={<Target className="w-5 h-5 text-green-400" />}
            label="Active Predictions"
            value={systemMetrics.active_predictions}
            trend={+5}
            color="green"
          />
          <MetricCard
            icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
            label="Crisis Alerts"
            value={systemMetrics.crisis_alerts}
            trend={-2}
            color="red"
          />
          <MetricCard
            icon={<Clock className="w-5 h-5 text-yellow-400" />}
            label="Response Time"
            value={`${systemMetrics.response_time.toFixed(1)}s`}
            trend={-0.2}
            color="yellow"
          />
          <MetricCard
            icon={<Shield className="w-5 h-5 text-cyan-400" />}
            label="System Uptime"
            value={`${systemMetrics.uptime.toFixed(1)}%`}
            trend={+0.1}
            color="cyan"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Alerts Feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-yellow-400" />
                  <span>Live Crisis Alerts</span>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    {alerts.filter(alert => !alert.read).length} NEW
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time notifications from AI monitoring systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {alerts.map((alert) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        className={`p-4 rounded-lg border ${
                          alert.read 
                            ? 'bg-slate-700/30 border-slate-600' 
                            : 'bg-slate-700/50 border-slate-500'
                        } cursor-pointer hover:bg-slate-700/70 transition-colors`}
                        onClick={() => markAsRead(alert.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full ${getAlertColor(alert.type, alert.severity)}`}>
                            <alert.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <Badge className={getSeverityBadge(alert.severity)}>
                                {alert.severity.toUpperCase()}
                              </Badge>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dismissAlert(alert.id);
                                }}
                                className="text-gray-400 hover:text-white"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <p className={`text-sm ${alert.read ? 'text-gray-400' : 'text-gray-200'}`}>
                              {alert.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {alert.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {alerts.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>All systems operating normally</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Live Performance Charts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            {/* Real-time Metrics Chart */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span>System Performance</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Live metrics from AI and quantum systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={liveData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="timestamp" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="ai_predictions" 
                      stackId="1"
                      stroke="#3B82F6" 
                      fill="#3B82F6"
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="quantum_operations" 
                      stackId="1"
                      stroke="#8B5CF6" 
                      fill="#8B5CF6"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Crisis Response Efficiency */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span>Response Efficiency</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={liveData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="timestamp" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="response_efficiency" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <span>Emergency Response Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Deploy Emergency Aid
                </Button>
                <Button className="bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30">
                  <Brain className="w-4 h-4 mr-2" />
                  Run AI Analysis
                </Button>
                <Button className="bg-purple-500/20 border-purple-500/30 text-purple-400 hover:bg-purple-500/30">
                  <Atom className="w-4 h-4 mr-2" />
                  Optimize Resources
                </Button>
                <Button className="bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30">
                  <Heart className="w-4 h-4 mr-2" />
                  Coordinate Relief
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, trend, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500/20 border-blue-500/30',
    purple: 'bg-purple-500/20 border-purple-500/30',
    green: 'bg-green-500/20 border-green-500/30',
    red: 'bg-red-500/20 border-red-500/30',
    yellow: 'bg-yellow-500/20 border-yellow-500/30',
    cyan: 'bg-cyan-500/20 border-cyan-500/30'
  };

  return (
    <Card className={`${colorClasses[color]} backdrop-blur-sm`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          {icon}
          <div className={`text-xs px-2 py-1 rounded-full ${
            trend > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {trend > 0 ? '+' : ''}{trend}
          </div>
        </div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-gray-400">{label}</div>
      </CardContent>
    </Card>
  );
};

export default RealTimeDashboard;
