import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Brain, 
  Zap, 
  Globe, 
  AlertTriangle, 
  TrendingUp, 
  Activity,
  Target,
  Cpu,
  BarChart3,
  MapPin,
  Clock,
  Shield
} from 'lucide-react';

const ChampionshipDashboard = () => {
  const [metrics, setMetrics] = useState({
    predictionsToday: 0,
    quantumOptimizations: 0,
    crisisAlertsActive: 0,
    regionsMonitored: 12,
    systemHealth: 98.7,
    quantumAdvantage: 23.4
  });

  const [liveAlerts, setLiveAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        predictionsToday: prev.predictionsToday + Math.floor(Math.random() * 3),
        quantumOptimizations: prev.quantumOptimizations + Math.floor(Math.random() * 2),
        systemHealth: 98.7 + (Math.random() - 0.5) * 0.6
      }));
    }, 3000);

    // Simulate crisis alerts
    const alertInterval = setInterval(() => {
      const alerts = [
        { id: 1, region: "Maharashtra", type: "Drought Warning", severity: "high", time: "2 min ago" },
        { id: 2, region: "West Bengal", type: "Flood Alert", severity: "critical", time: "5 min ago" },
        { id: 3, region: "Rajasthan", type: "Heat Wave", severity: "warning", time: "8 min ago" }
      ];
      setLiveAlerts(alerts);
    }, 5000);

    setTimeout(() => setIsLoading(false), 1500);

    return () => {
      clearInterval(interval);
      clearInterval(alertInterval);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-2">🚀 QUANTAID Lite</h2>
          <p className="text-gray-300">Initializing quantum systems...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            QUANTAID LITE
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            AI + Quantum + Data Ecosystems • Real-time Global Crisis Prediction
          </p>
          <div className="flex justify-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 font-semibold">ALL SYSTEMS OPTIMAL</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-500/20 px-4 py-2 rounded-full">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-semibold">QUANTUM READY</span>
            </div>
          </div>
        </motion.div>

        {/* Real-time Metrics Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Brain className="w-8 h-8 text-blue-400" />}
            title="AI Predictions Today"
            value={metrics.predictionsToday}
            change="+23%"
            color="blue"
          />
          <MetricCard
            icon={<Zap className="w-8 h-8 text-purple-400" />}
            title="Quantum Optimizations"
            value={metrics.quantumOptimizations}
            change="+34%"
            color="purple"
          />
          <MetricCard
            icon={<AlertTriangle className="w-8 h-8 text-red-400" />}
            title="Active Crisis Alerts"
            value={metrics.crisisAlertsActive}
            change="CRITICAL"
            color="red"
          />
          <MetricCard
            icon={<Globe className="w-8 h-8 text-green-400" />}
            title="Regions Monitored"
            value={metrics.regionsMonitored}
            change="GLOBAL"
            color="green"
          />
        </motion.div>

        {/* Advanced Analytics Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* System Performance */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-400" />
                <span>System Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">AI Accuracy</span>
                  <span className="text-green-400 font-bold">96.8%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '96.8%' }} />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Quantum Advantage</span>
                  <span className="text-purple-400 font-bold">{metrics.quantumAdvantage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-purple-400 h-2 rounded-full" style={{ width: `${metrics.quantumAdvantage}%` }} />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300">System Health</span>
                  <span className="text-blue-400 font-bold">{metrics.systemHealth.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${metrics.systemHealth}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Crisis Alerts */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-400" />
                <span>Live Crisis Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <AnimatePresence>
                  {liveAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-3 rounded-lg border-l-4 ${
                        alert.severity === 'critical' ? 'bg-red-500/20 border-red-500' :
                        alert.severity === 'high' ? 'bg-orange-500/20 border-orange-500' :
                        'bg-yellow-500/20 border-yellow-500'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{alert.region}</p>
                          <p className="text-gray-300 text-sm">{alert.type}</p>
                        </div>
                        <span className="text-xs text-gray-400">{alert.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          {/* Quantum Circuit Status */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-400" />
                <span>Quantum Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto mb-3 relative"
                  >
                    <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full" />
                    <div className="absolute inset-2 border-4 border-purple-400 border-t-transparent rounded-full" />
                  </motion.div>
                  <p className="text-purple-400 font-bold">QAOA Circuit Active</p>
                  <p className="text-gray-400 text-sm">6 qubits • 98.7% fidelity</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Gate Depth</span>
                    <span className="text-purple-400">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Quantum Volume</span>
                    <span className="text-purple-400">64</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Optimization Time</span>
                    <span className="text-purple-400">0.23s</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex justify-center space-x-4">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg">
            🧠 Run AI Prediction
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 text-lg">
            ⚛️ Quantum Optimize
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 text-lg">
            🌍 Crisis Monitor
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

const MetricCard = ({ icon, title, value, change, color }) => {
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    red: "from-red-500/20 to-red-600/20 border-red-500/30",
    green: "from-green-500/20 to-green-600/20 border-green-500/30"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-sm rounded-xl p-6 cursor-pointer`}
    >
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className={`text-${color}-400 text-sm font-semibold`}>{change}</span>
      </div>
      <h3 className="text-gray-300 text-sm font-medium mb-2">{title}</h3>
      <motion.p
        key={value}
        initial={{ scale: 1.2, color: `rgb(var(--${color}-400))` }}
        animate={{ scale: 1, color: "white" }}
        className="text-3xl font-bold text-white"
      >
        {value}
      </motion.p>
    </motion.div>
  );
};

export default ChampionshipDashboard;
