import React, { useState, useEffect } from 'react';
import { MISSION_DATA } from './data';
import { Recommendation } from './types';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Plane, 
  Helicopter, 
  Fuel, 
  Clock, 
  ShieldAlert, 
  MapPin, 
  ChevronLeft,
  BarChart3,
  Terminal,
  Wind,
  Mountain,
  Gauge,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

// --- Shared Components ---

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const isGo = status === 'GO';
  const colorClass = isGo ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  const Icon = isGo ? CheckCircle2 : AlertTriangle;

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{status.replace('_', ' ')}</span>
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode; sub?: string }> = ({ label, value, icon, sub }) => (
  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col gap-1">
    <div className="flex justify-between items-start mb-1">
      <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">{label}</span>
      <div className="text-slate-500">{icon}</div>
    </div>
    <div className="text-xl font-mono font-bold text-slate-100">{value}</div>
    {sub && <div className="text-xs text-slate-500">{sub}</div>}
  </div>
);

// --- Step 1: Selection View ---

interface SelectionViewProps {
  onSelect: (coa: Recommendation) => void;
}

const SelectionView: React.FC<SelectionViewProps> = ({ onSelect }) => {
  const [hoveredCoa, setHoveredCoa] = useState<string | null>(null);

  // Prepare data for comparison chart
  const comparisonData = MISSION_DATA.recommendations.map(r => ({
    name: r.name.split(' ')[0],
    Payload: r.summary_global.total_payload_delivered_kg,
    Fuel: r.summary_global.total_fuel_burn_kg,
    Time: r.summary_global.total_mission_time_min,
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {MISSION_DATA.recommendations.map((coa, idx) => {
          const isHovered = hoveredCoa === coa.name;
          
          return (
            <div 
              key={coa.name}
              className={`
                group relative bg-slate-800/40 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden
                ${isHovered ? 'border-sky-500/50 bg-slate-800/80 shadow-2xl shadow-sky-900/20 transform -translate-y-1' : 'border-slate-700/50 hover:border-slate-600'}
              `}
              onMouseEnter={() => setHoveredCoa(coa.name)}
              onMouseLeave={() => setHoveredCoa(null)}
              onClick={() => onSelect(coa)}
            >
              {/* Card Header */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="bg-slate-900/50 text-slate-400 font-mono text-xs px-2 py-1 rounded border border-slate-700">
                    OPTION {idx + 1}
                  </div>
                  <StatusBadge status={coa.summary_global.operational_status} />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-100 mb-1 group-hover:text-sky-400 transition-colors">
                    {coa.name}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-2 min-h-[40px]">
                    {coa.detail}
                  </p>
                </div>

                {/* Mini Metrics */}
                <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-700/50">
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-1">PAYLOAD</div>
                    <div className="font-mono font-bold text-slate-200">{coa.summary_global.total_payload_delivered_kg}kg</div>
                  </div>
                  <div className="text-center border-l border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-1">RISK</div>
                    <div className={`font-mono font-bold ${coa.summary_global.total_risk_index < 0.25 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {coa.summary_global.total_risk_index}
                    </div>
                  </div>
                  <div className="text-center border-l border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-1">SCORE</div>
                    <div className="font-mono font-bold text-sky-400">{coa.score_breakdown.final_score}</div>
                  </div>
                </div>

                {/* Radar Chart Small */}
                <div className="h-32 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={coa.score_breakdown.components}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <Radar
                        name="Score"
                        dataKey="value"
                        stroke="#0ea5e9"
                        fill="#0ea5e9"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="pt-2 flex items-center text-sky-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Section */}
      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" /> Comparative Analysis
        </h4>
        <div className="h-64 w-full">
           <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" tick={{fontSize: 12}} />
              <YAxis yAxisId="left" orientation="left" stroke="#64748b" tick={{fontSize: 12}} />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                itemStyle={{ color: '#f1f5f9' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar yAxisId="left" dataKey="Payload" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Payload (kg)" />
              <Bar yAxisId="left" dataKey="Fuel" fill="#64748b" radius={[4, 4, 0, 0]} name="Fuel (kg)" />
              <Bar yAxisId="right" dataKey="Time" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Time (min)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// --- Step 2: Detail View ---

interface DetailViewProps {
  coa: Recommendation;
  onBack: () => void;
  onValidate: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ coa, onBack, onValidate }) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Selection
        </button>
        <div className="flex gap-2">
          <StatusBadge status={coa.summary_global.operational_status} />
          <div className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-mono border border-slate-700">
            {coa.summary_global.objective}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{coa.name}</h2>
            <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">{coa.detail}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-4xl font-mono font-bold text-sky-400">{coa.score_breakdown.final_score}</div>
            <div className="text-sm text-slate-500 uppercase tracking-wide">Composite Score</div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard 
              label="Total Payload" 
              value={`${coa.summary_global.total_payload_delivered_kg} kg`} 
              icon={<Plane className="w-5 h-5" />} 
            />
            <MetricCard 
              label="Fuel Burn" 
              value={`${coa.summary_global.total_fuel_burn_kg} kg`} 
              icon={<Fuel className="w-5 h-5" />} 
            />
            <MetricCard 
              label="Mission Time" 
              value={`${coa.summary_global.total_mission_time_min} min`} 
              icon={<Clock className="w-5 h-5" />} 
            />
            <MetricCard 
              label="Risk Index" 
              value={coa.summary_global.total_risk_index} 
              icon={<ShieldAlert className="w-5 h-5" />} 
              sub={`Threat: ${coa.tactical_layer.threat_level}`}
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Aircraft Allocation */}
          <div className="bg-slate-900/40 rounded-xl p-6 border border-slate-800/60">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Plane className="w-4 h-4 text-sky-400" /> Fleet Allocation
            </h3>
            <div className="space-y-4">
              {coa.aircraft_allocation.map((ac, idx) => (
                <div key={idx} className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/50">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      {ac.aircraft_type.includes('Caracal') ? <Helicopter className="w-5 h-5 text-emerald-400" /> : <Plane className="w-5 h-5 text-sky-400" />}
                      <span className="font-semibold text-slate-200">{ac.aircraft_type}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">QTY: {ac.quantity_used}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Route</span>
                      <span className="text-slate-200 font-mono text-xs">{ac.route_sequence.join(' → ')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Payload</span>
                      <span className="text-slate-200 font-mono">{ac.payload_carried_kg} kg</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gates & Environmental */}
          <div className="space-y-6">
            
            {/* Hard Gates */}
            <div className="bg-slate-900/40 rounded-xl p-6 border border-slate-800/60">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Hard Gates
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(coa.hard_gate_summary).map(([key, val]) => {
                  if (key === 'hard_gate_overall_status') return null;
                  return (
                    <div key={key} className="flex items-center justify-between bg-slate-800/50 px-3 py-2 rounded border border-slate-700/30">
                      <span className="text-xs text-slate-400 capitalize">{key.replace('_check', '').replace('_', ' ')}</span>
                      <span className={`text-xs font-bold font-mono ${(val as string).includes('PASS') ? 'text-emerald-400' : 'text-red-400'}`}>{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Environmental */}
            <div className="bg-slate-900/40 rounded-xl p-6 border border-slate-800/60">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Wind className="w-4 h-4 text-sky-400" /> Environment
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500">Density Altitude</div>
                  <div className="font-mono text-slate-200">{coa.environmental_conditions.max_density_altitude_ft} ft</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Visibility</div>
                  <div className="font-mono text-slate-200">{coa.environmental_conditions.visibility_km} km</div>
                </div>
                 <div>
                  <div className="text-xs text-slate-500">Temp Range</div>
                  <div className="font-mono text-slate-200">{coa.environmental_conditions.temperature_range_c}°C</div>
                </div>
                 <div>
                  <div className="text-xs text-slate-500">Wind</div>
                  <div className="font-mono text-slate-200">{coa.environmental_conditions.avg_wind_kts} kts</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-8 pt-8 border-t border-slate-700/50 flex justify-end">
          <button 
            onClick={onValidate}
            className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg shadow-sky-900/20"
          >
            Run Pre-Flight Simulation <Terminal className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

// --- Step 3: Simulation/Validation View ---

const SimulationView: React.FC<{ coa: Recommendation; onReset: () => void }> = ({ coa, onReset }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const steps = [
      "Initializing tactical simulation environment...",
      "Loading terrain data for TIMIKA - ILAGA - SINAK...",
      `Validating payload mass: ${coa.summary_global.total_payload_delivered_kg}kg against density altitude...`,
      "Checking fuel reserves against worst-case wind vectors...",
      "Verifying airspace deconfliction...",
      "Simulating thermal limits on H225M Caracal...",
      "Simulation Complete. Mission Green."
    ];

    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setLogs(prev => [...prev, steps[currentStep]]);
        setProgress(((currentStep + 1) / steps.length) * 100);
        currentStep++;
      } else {
        setComplete(true);
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [coa]);

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-3">
          <Terminal className="w-6 h-6 text-sky-400" /> 
          Pre-Flight Simulation
        </h2>
        <p className="text-slate-400">Validating operational parameters for {coa.name}</p>
      </div>

      <div className="bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm p-6 shadow-2xl relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-sky-900 w-full">
          <div 
            className="h-full bg-sky-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-3 min-h-[300px]">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-3 animate-in fade-in slide-in-from-left-2">
              <span className="text-slate-600 select-none">{new Date().toISOString().split('T')[1].slice(0,8)}</span>
              <span className={i === logs.length - 1 && !complete ? 'text-sky-400' : 'text-emerald-500'}>
                 {i === logs.length - 1 && !complete ? '>' : '✓'} {log}
              </span>
            </div>
          ))}
          {!complete && (
            <div className="animate-pulse text-sky-400">_</div>
          )}
        </div>
      </div>

      {complete && (
        <div className="flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-4">
           <button 
            onClick={onReset}
            className="px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Select Different COA
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-emerald-900/20 flex items-center gap-2">
            <Plane className="w-5 h-5" /> EXECUTE MISSION
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main App Container ---

const App: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedCoa, setSelectedCoa] = useState<Recommendation | null>(null);

  const handleSelect = (coa: Recommendation) => {
    setSelectedCoa(coa);
    setStep(2);
  };

  const handleValidate = () => {
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedCoa(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-sky-500/30">
      
      {/* Top Bar */}
      <header className="bg-slate-950/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-sky-600 p-1.5 rounded">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold tracking-tight">AEROBRIDGE</h1>
              <div className="text-[10px] text-sky-400 font-mono tracking-widest uppercase">Mission Planner v2.1</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
             <MapPin className="w-3 h-3 text-emerald-500" />
             <span>{MISSION_DATA.mission_brief.origin}</span>
             <span className="text-slate-600">→</span>
             <span>{MISSION_DATA.mission_brief.target_points.length} TARGETS</span>
          </div>
        </div>
      </header>

      {/* Progress Stepper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
             {[1, 2, 3].map((s) => (
               <div key={s} className="flex items-center gap-2">
                 <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300
                    ${step === s ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 
                      step > s ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500 border border-slate-700'}
                 `}>
                   {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                 </div>
                 {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-emerald-500/50' : 'bg-slate-800'}`} />}
               </div>
             ))}
          </div>
        </div>

        {/* Views */}
        <main>
          {step === 1 && <SelectionView onSelect={handleSelect} />}
          {step === 2 && selectedCoa && (
            <DetailView 
              coa={selectedCoa} 
              onBack={() => setStep(1)} 
              onValidate={handleValidate} 
            />
          )}
          {step === 3 && selectedCoa && (
            <SimulationView coa={selectedCoa} onReset={handleReset} />
          )}
        </main>
      </div>

    </div>
  );
};

export default App;