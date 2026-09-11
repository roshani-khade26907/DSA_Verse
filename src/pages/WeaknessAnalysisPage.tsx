import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  PieChart as PieIcon 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';

export const WeaknessAnalysisPage: React.FC = () => {

  const topicAccuracyData = [
    { topic: 'Arrays', accuracy: 90, status: 'Strong', color: '#10b981' },
    { topic: 'Searching', accuracy: 76, status: 'Good', color: '#3b82f6' },
    { topic: 'Sorting', accuracy: 61, status: 'Improve', color: '#f59e0b' },
    { topic: 'Recursion', accuracy: 42, status: 'Weak', color: '#f43f5e' },
    { topic: 'Linked Lists', accuracy: 50, status: 'In Progress', color: '#8b5cf6' },
    { topic: 'Stacks & Queues', accuracy: 35, status: 'Weak', color: '#f43f5e' }
  ];

  const pieData = [
    { name: 'Strong (90%+)', value: 1, fill: '#10b981' },
    { name: 'Good (70-89%)', value: 1, fill: '#3b82f6' },
    { name: 'Improve (50-69%)', value: 2, fill: '#f59e0b' },
    { name: 'Weak (<50%)', value: 2, fill: '#f43f5e' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-teal-500/15">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-teal-400" />
            Your DSA Performance & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Data-driven weakness detection and readiness tracking.
          </p>
        </div>

        <Link
          to="/recommendations"
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-600/30 transition-all flex items-center space-x-1.5 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>View Next-Step Recommendations</span>
        </Link>
      </div>

      {/* Prominent Weakness Recommendation Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-slate-900 border border-rose-500/40 glass-panel shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
            <AlertTriangle className="w-6 h-6 animate-bounce" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center">
              Critical Weakness Identified
            </div>
            <h2 className="text-xl font-extrabold text-white">
              Recursion Accuracy is Low (42%)
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              "Your recursion accuracy is low. Revise the call stack concept and solve 3 Easy problems before moving forward to Trees & Backtracking."
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <Link
            to="/learn/recursion"
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all flex items-center space-x-1.5"
          >
            <span>Revise Recursion</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Grid: Charts + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recharts Bar Chart: Topic Accuracy */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-teal-400" /> Topic Accuracy (%)
            </h3>
            <span className="text-xs font-mono text-slate-400">Target: &gt;75%</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicAccuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="topic" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(139,92,246,0.3)', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="accuracy" radius={[8, 8, 0, 0]}>
                  {topicAccuracyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Distribution Chart */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center">
              <PieIcon className="w-4 h-4 mr-2 text-emerald-400" /> Mastery Distribution
            </h3>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(139,92,246,0.3)', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Topic Accuracy Table */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 glass-panel space-y-4">
        <h3 className="text-base font-bold text-white">Topic Performance Summary</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Topic</th>
                <th className="py-3.5 px-4">Accuracy</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {topicAccuracyData.map((row) => (
                <tr key={row.topic} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-white">{row.topic}</td>
                  <td className="py-4 px-4 font-mono font-semibold" style={{ color: row.color }}>
                    {row.accuracy}%
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full font-semibold text-[11px] border ${
                      row.status === 'Strong' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      row.status === 'Good' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                      row.status === 'Improve' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      to={`/learn/${row.topic.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
                    >
                      Practice Topic â†’
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

