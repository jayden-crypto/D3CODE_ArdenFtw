import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';
import ChampionshipDashboard from './components/ChampionshipDashboard';
import AdvancedAIPredictor from './components/AdvancedAIPredictor';
import QuantumOptimizer from './components/QuantumOptimizer';
import WorldMap from './components/WorldMap';
import RealTimeDashboard from './components/RealTimeDashboard';
import { Button } from './components/ui/button';
import { 
  Home, 
  Brain, 
  Atom, 
  Globe, 
  Activity, 
  Trophy,
  Menu,
  X
} from 'lucide-react';
import './index.css';

function App() {
  const [activeView, setActiveView] = useState('championship');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navigationItems = [
    { id: 'championship', label: 'Main Dashboard', icon: Activity, component: ChampionshipDashboard },
    { id: 'realtime', label: 'Real-Time Command Center', icon: Activity, component: RealTimeDashboard },
    { id: 'ai', label: 'AI Predictor', icon: Brain, component: AdvancedAIPredictor },
    { id: 'quantum', label: 'Quantum Optimizer', icon: Atom, component: QuantumOptimizer },
    { id: 'worldmap', label: 'Global Crisis Map', icon: Globe, component: WorldMap },
    { id: 'classic', label: 'Classic Dashboard', icon: Home, component: Dashboard }
  ];

  const ActiveComponent = navigationItems.find(item => item.id === activeView)?.component || ChampionshipDashboard;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          variant="outline"
          size="sm"
          className="bg-slate-800/80 border-slate-600 text-white backdrop-blur-sm"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || isDesktop) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-64 bg-slate-900/95 backdrop-blur-sm border-r border-slate-700 z-40 lg:relative lg:w-64 lg:flex-shrink-0"
          >
            <div className="p-6">
              {/* Logo */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  QUANTAID Lite
                </h1>
                <p className="text-sm text-gray-400 mt-1">Championship Edition</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      setSidebarOpen(false);
                    }}
                    variant={activeView === item.id ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start text-left text-sm ${
                      activeView === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    <span className="truncate">{item.label}</span>
                  </Button>
                ))}
              </nav>

              {/* Status Indicator */}
              <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">SYSTEM ONLINE</span>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>AI Models: Active</div>
                  <div>Quantum Circuits: Ready</div>
                  <div>Real-time Data: Streaming</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-screen overflow-y-auto"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
