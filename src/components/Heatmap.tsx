import React, { useState } from 'react';
import { Flame } from 'lucide-react';

interface HeatmapProps {
  streak?: number;
}

export const Heatmap: React.FC<HeatmapProps> = ({ streak = 5 }) => {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  // Generate 52 weeks x 7 days of realistic mock data
  const generateData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days: { date: string; count: number; level: number }[] = [];
    
    // Seed pseudo-random heat pattern
    for (let i = 0; i < 364; i++) {
      // higher activity in recent 60 days
      const isRecent = i > 300;
      const rand = Math.random();
      let level = 0;
      let count = 0;
      if (rand > 0.65 || (isRecent && rand > 0.3)) {
        count = Math.floor(Math.random() * 5) + 1;
        if (count === 1) level = 1;
        else if (count <= 2) level = 2;
        else if (count <= 4) level = 3;
        else level = 4;
      }
      days.push({
        date: `Day ${i + 1}`,
        count,
        level
      });
    }
    return { months, days };
  };

  const { months, days } = generateData();
  const totalSubmissions = days.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="w-full bg-slate-900/80 border border-teal-500/20 rounded-2xl p-5 glass-panel relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Flame className="w-5 h-5 fill-amber-500/20" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center">
              Coding Activity Heatmap
              <span className="ml-2 text-xs font-mono text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                {streak} Day Streak ðŸ”¥
              </span>
            </h3>
            <p className="text-xs text-slate-400">{totalSubmissions} problems & submissions in the last year</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-1">
            <span>Less</span>
            <div className="flex items-center space-x-1 mx-1">
              <span className="w-3 h-3 rounded-sm heatmap-0 border border-slate-800"></span>
              <span className="w-3 h-3 rounded-sm heatmap-1"></span>
              <span className="w-3 h-3 rounded-sm heatmap-2"></span>
              <span className="w-3 h-3 rounded-sm heatmap-3"></span>
              <span className="w-3 h-3 rounded-sm heatmap-4"></span>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid Container */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[680px]">
          
          {/* Months header */}
          <div className="flex text-[10px] font-mono text-slate-400 mb-1.5 ml-6 justify-between">
            {months.map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>

          <div className="flex items-start">
            {/* Days of week labels */}
            <div className="flex flex-col text-[9px] font-mono text-slate-400 mr-2 space-y-1 justify-around pt-0.5">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* 52 Columns Grid */}
            <div className="grid grid-flow-col grid-rows-7 gap-1">
              {days.map((day, idx) => (
                <div
                  key={idx}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({
                      text: `${day.count} submission${day.count !== 1 ? 's' : ''}`,
                      x: rect.left,
                      y: rect.top - 30
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  className={`w-3 h-3 rounded-[2px] transition-all hover:scale-125 cursor-pointer ${
                    day.level === 0 ? 'heatmap-0 border border-slate-800/80 hover:border-teal-400' :
                    day.level === 1 ? 'heatmap-1' :
                    day.level === 2 ? 'heatmap-2' :
                    day.level === 3 ? 'heatmap-3' : 'heatmap-4'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Floating Tooltip */}
      {tooltip && (
        <div
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
          className="fixed z-50 px-2 py-1 bg-slate-950 border border-teal-500/40 text-teal-200 text-[11px] font-mono rounded shadow-xl pointer-events-none -translate-x-1/2"
        >
          {tooltip.text}
        </div>
      )}

    </div>
  );
};

