import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Brain, 
  Atom, 
  Database, 
  TrendingUp, 
  AlertTriangle, 
  Globe, 
  Zap,
  Activity,
  CloudRain,
  Thermometer
} from 'lucide-react';
import { apiService } from '../services/api';
import { formatNumber, getRiskColor } from '../lib/utils';
import CrisisPredictor from './CrisisPredictor';
import QuantumOptimizer from './QuantumOptimizer';
import DataExplorer from './DataExplorer';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      // Fallback data for demo
      setDashboardData({
        summary: {
          avg_temperature: 24.5,
          avg_yield: 285.7,
          total_regions: 12,
          active_predictions: 45,
          quantum_optimizations: 23
        },
        recent_predictions: [
          { region: "Asia-Pacific", yield: 285.4, risk: "medium" },
          { region: "Europe", yield: 312.8, risk: "low" },
          { region: "North America", yield: 298.2, risk: "low" },
          { region: "Africa", yield: 201.5, risk: "high" }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, trend, color = "blue" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className={`h-4 w-4 text-${color}-600`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {trend && (
            <p className="text-xs text-muted-foreground">
              <span className={`text-${trend > 0 ? 'green' : 'red'}-600`}>
                {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
              </span>
              {' '}from last month
            </p>
          )}
        </CardContent>
        <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-${color}-400 to-${color}-600`} />
      </Card>
    </motion.div>
  );

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <Button
      variant={active ? "default" : "outline"}
      onClick={() => onClick(id)}
      className="flex items-center gap-2"
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-white rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="h-96 bg-white rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🌍 QUANTAID Lite
              </h1>
              <p className="text-gray-600 mt-1">
                AI + Quantum + Data Ecosystems for Crisis Resilience
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                System Online
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Overview Stats */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Global Temperature"
                value={`${dashboardData?.summary?.avg_temperature || 24.5}°C`}
                icon={Thermometer}
                trend={2.1}
                color="red"
              />
              <StatCard
                title="Average Yield"
                value={`${dashboardData?.summary?.avg_yield || 285.7}T`}
                icon={TrendingUp}
                trend={-1.2}
                color="green"
              />
              <StatCard
                title="Active Predictions"
                value={dashboardData?.summary?.active_predictions || 45}
                icon={Brain}
                trend={8.3}
                color="blue"
              />
              <StatCard
                title="Quantum Optimizations"
                value={dashboardData?.summary?.quantum_optimizations || 23}
                icon={Atom}
                trend={15.7}
                color="purple"
              />
            </div>

            {/* Recent Predictions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Regional Crisis Assessment
                </CardTitle>
                <CardDescription>
                  Latest AI predictions for food security by region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.recent_predictions?.map((prediction, index) => (
                    <motion.div
                      key={prediction.region}
                      className="flex items-center justify-between p-4 rounded-lg border"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          prediction.risk === 'high' ? 'bg-red-500' :
                          prediction.risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <span className="font-medium">{prediction.region}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          {prediction.yield}T yield
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(prediction.risk)}`}>
                          {prediction.risk} risk
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <TabButton
            id="overview"
            label="Overview"
            icon={Activity}
            active={activeTab === 'overview'}
            onClick={setActiveTab}
          />
          <TabButton
            id="predictor"
            label="Crisis Predictor"
            icon={Brain}
            active={activeTab === 'predictor'}
            onClick={setActiveTab}
          />
          <TabButton
            id="optimizer"
            label="Quantum Optimizer"
            icon={Atom}
            active={activeTab === 'optimizer'}
            onClick={setActiveTab}
          />
          <TabButton
            id="data"
            label="Data Explorer"
            icon={Database}
            active={activeTab === 'data'}
            onClick={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'predictor' && <CrisisPredictor />}
          {activeTab === 'optimizer' && <QuantumOptimizer />}
          {activeTab === 'data' && <DataExplorer />}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
