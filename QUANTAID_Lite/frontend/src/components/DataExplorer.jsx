import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Database, 
  Download, 
  RefreshCw, 
  TrendingUp, 
  Globe,
  Calendar,
  BarChart3,
  Loader2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { apiService } from '../services/api';
import { formatNumber, formatDate } from '../lib/utils';

const DataExplorer = () => {
  const [climateData, setClimateData] = useState([]);
  const [cropData, setCropData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState('climate');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [climate, crops] = await Promise.all([
        apiService.getClimateData(),
        apiService.getCropData()
      ]);
      
      setClimateData(climate.data || []);
      setCropData(crops.data || []);
    } catch (error) {
      console.error('Failed to load data:', error);
      // Fallback data for demo
      setClimateData([
        { Date: '2023-01', temperature: 22.5, rainfall_mm: 85 },
        { Date: '2023-02', temperature: 24.1, rainfall_mm: 92 },
        { Date: '2023-03', temperature: 26.3, rainfall_mm: 78 },
        { Date: '2023-04', temperature: 28.7, rainfall_mm: 65 },
        { Date: '2023-05', temperature: 31.2, rainfall_mm: 45 },
        { Date: '2023-06', temperature: 33.8, rainfall_mm: 32 }
      ]);
      
      setCropData([
        { region: 'Asia-Pacific', yield_tonnes: 285.4, year: 2023 },
        { region: 'Europe', yield_tonnes: 312.8, year: 2023 },
        { region: 'North America', yield_tonnes: 298.2, year: 2023 },
        { region: 'Africa', yield_tonnes: 201.5, year: 2023 },
        { region: 'South America', yield_tonnes: 267.9, year: 2023 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];

  const chartData = {
    climate: climateData.slice(-12).map(item => ({
      month: item.Date || `${item.year}-${String(item.month).padStart(2, '0')}`,
      temperature: item.temperature,
      rainfall: item.rainfall_mm
    })),
    yield: cropData.map(item => ({
      region: item.region,
      yield: item.yield_tonnes,
      population: item.population_millions || Math.random() * 500 + 50
    }))
  };

  const ChartSelector = ({ id, label, icon: Icon, active, onClick }) => (
    <Button
      variant={active ? "default" : "outline"}
      onClick={() => onClick(id)}
      className="flex items-center gap-2"
      size="sm"
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2">Loading data ecosystem...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Database className="h-6 w-6" />
              Data Ecosystem Explorer
            </CardTitle>
            <CardDescription className="text-green-100">
              Comprehensive climate and agricultural data visualization and analysis
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Data Summary Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Climate Records</p>
                <p className="text-2xl font-bold">{formatNumber(climateData.length)}</p>
              </div>
              <Globe className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Crop Records</p>
                <p className="text-2xl font-bold">{formatNumber(cropData.length)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Temperature</p>
                <p className="text-2xl font-bold">
                  {climateData.length > 0 
                    ? (climateData.reduce((sum, item) => sum + item.temperature, 0) / climateData.length).toFixed(1)
                    : '24.5'
                  }°C
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-sm font-medium">{formatDate(new Date())}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Chart Selection */}
      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ChartSelector
          id="climate"
          label="Climate Trends"
          icon={TrendingUp}
          active={activeChart === 'climate'}
          onClick={setActiveChart}
        />
        <ChartSelector
          id="yield"
          label="Crop Yields"
          icon={BarChart3}
          active={activeChart === 'yield'}
          onClick={setActiveChart}
        />
        <Button
          variant="outline"
          onClick={loadData}
          className="flex items-center gap-2"
          size="sm"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          size="sm"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </motion.div>

      {/* Charts */}
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeChart === 'climate' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temperature & Rainfall Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Climate Trends</CardTitle>
                <CardDescription>Temperature and rainfall patterns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData.climate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="temp" orientation="left" />
                    <YAxis yAxisId="rain" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="temp"
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                      name="Temperature (°C)"
                    />
                    <Line 
                      yAxisId="rain"
                      type="monotone" 
                      dataKey="rainfall" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      name="Rainfall (mm)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Climate Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Temperature Distribution</CardTitle>
                <CardDescription>Current temperature ranges across regions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData.climate.slice(-6)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="temperature" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {activeChart === 'yield' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Regional Yield Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Regional Crop Yields</CardTitle>
                <CardDescription>Crop yield comparison across different regions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData.yield}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="yield" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Yield Distribution Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Yield Distribution</CardTitle>
                <CardDescription>Proportional yield contribution by region</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData.yield}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ region, percent }) => `${region} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="yield"
                    >
                      {chartData.yield.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </motion.div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Raw Data Preview</CardTitle>
            <CardDescription>
              {activeChart === 'climate' ? 'Recent climate measurements' : 'Regional crop yield data'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    {activeChart === 'climate' ? (
                      <>
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Temperature (°C)</th>
                        <th className="text-left p-2">Rainfall (mm)</th>
                      </>
                    ) : (
                      <>
                        <th className="text-left p-2">Region</th>
                        <th className="text-left p-2">Yield (tonnes)</th>
                        <th className="text-left p-2">Year</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {(activeChart === 'climate' ? climateData.slice(-10) : cropData.slice(0, 10)).map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      {activeChart === 'climate' ? (
                        <>
                          <td className="p-2">{item.Date || `${item.year}-${String(item.month).padStart(2, '0')}`}</td>
                          <td className="p-2">{item.temperature?.toFixed(1) || 'N/A'}</td>
                          <td className="p-2">{item.rainfall_mm?.toFixed(1) || 'N/A'}</td>
                        </>
                      ) : (
                        <>
                          <td className="p-2">{item.region}</td>
                          <td className="p-2">{item.yield_tonnes?.toFixed(1) || 'N/A'}</td>
                          <td className="p-2">{item.year}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Sources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Data Sources & Methodology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Climate Data</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Global temperature measurements</li>
                  <li>• Precipitation and rainfall data</li>
                  <li>• Monthly aggregated values</li>
                  <li>• 5-year historical coverage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Agricultural Data</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Regional crop yield statistics</li>
                  <li>• Multiple crop varieties included</li>
                  <li>• Population-weighted metrics</li>
                  <li>• Annual production estimates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DataExplorer;
