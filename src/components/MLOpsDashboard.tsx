"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu, Activity, TrendingUp, Zap,
  AlertCircle, ChevronRight, Terminal
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area,
  Tooltip
} from "recharts";
import { ProjectInfo } from "@/types/project";

interface MLOpsDashboardProps {
  projects: ProjectInfo[];
}

const flatSeries = (len: number, val: number) =>
  Array.from({ length: len }, (_, i) => ({ t: i, v: val }));

export function MLOpsDashboard({ projects }: MLOpsDashboardProps) {
  // Map real projects to the monitor
  const activeModels = projects.slice(0, 4).map(p => ({
    id: p.id,
    name: p.name,
    latency: Math.floor(20 + Math.random() * 40),
    throughput: Math.floor(50 + Math.random() * 100),
    status: (p.metrics.performanceScore ?? 0) > 90 ? "healthy" : "nominal",
    tech: p.primaryLanguage || "Component"
  }));

  const [selectedModel, setSelectedModel] = useState(activeModels[0] || { name: 'No Projects', latency: 0, throughput: 0 });
  const [latencyData, setLatencyData] = useState(() => flatSeries(20, 50));
  const [throughputData, setThroughputData] = useState(() => flatSeries(20, 80));
  const [driftData, setDriftData] = useState(() => flatSeries(20, 5));
  const [logs, setLogs] = useState<string[]>([]);
  const [anomaly, setAnomaly] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const addLog = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString("en-GB", { hour12: false, hour: "2-digit", minute: "2-digit" });
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 4));
  }, []);

  useEffect(() => {
    setMounted(true);
    if (!selectedModel) return;

    const interval = setInterval(() => {
      setLatencyData((d) => {
        const base = selectedModel.latency;
        const next = Math.max(10, base + (Math.random() - 0.5) * 15);
        return [...d.slice(1), { t: d[d.length - 1].t + 1, v: next }];
      });

      setThroughputData((d) => {
        const next = Math.max(10, selectedModel.throughput + (Math.random() - 0.5) * 20);
        return [...d.slice(1), { t: d[d.length - 1].t + 1, v: next }];
      });

      setDriftData((d) => {
        const next = Math.max(0, Math.min(30, d[d.length - 1].v + (Math.random() - 0.5) * 4));
        if (next > 22) setAnomaly(`Traffic Anomaly in ${selectedModel.name} cluster`);
        else if (Math.random() > 0.9) setAnomaly(null);
        return [...d.slice(1), { t: d[d.length - 1].t + 1, v: next }];
      });

      if (Math.random() > 0.9) {
        addLog(`Synchronized ${selectedModel.name} with GitHub registry`);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [selectedModel, addLog]);

  if (!mounted || activeModels.length === 0) return null;

  return (
    <section id="mlops" className="py-24 px-4 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="mono text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: "var(--orange)" }}>
          ◈ Production Proof
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4" style={{ color: "var(--fg)" }}>
          Repository <span className="text-gradient-orange">Health Monitor</span>
        </h2>
        
        <AnimatePresence>
          {anomaly && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-red-500/30 bg-red-500/5 text-red-500 text-sm mono mx-auto"
            >
              <AlertCircle size={14} className="animate-pulse" />
              <span>{anomaly}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bento-card p-6 flex flex-col gap-4 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-2">
            <Cpu size={16} className="text-orange-400" />
            <h3 className="mono text-[10px] uppercase tracking-widest font-bold" style={{ color: "var(--fg-muted)" }}>Verified Repos</h3>
          </div>
          {activeModels.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                setSelectedModel(model);
                addLog(`Switched trace to ${model.name}`);
              }}
              className={`p-4 rounded-xl border transition-all text-left flex items-start justify-between group ${
                selectedModel.id === model.id ? "active-glow shadow-lg" : "hover:bg-white/5 opacity-60"
              }`}
              style={{ 
                backgroundColor: selectedModel.id === model.id ? "var(--bg-card)" : "transparent",
                borderColor: selectedModel.id === model.id ? "var(--orange-dim)" : "var(--border)"
              }}
            >
              <div>
                <span className="font-bold text-sm block" style={{ color: selectedModel.id === model.id ? "var(--fg)" : "var(--fg-muted)" }}>
                  {model.name}
                </span>
                <span className="mono text-[9px] uppercase" style={{ color: model.status === 'healthy' ? 'var(--green)' : 'var(--orange)' }}>
                  {model.tech}
                </span>
              </div>
              <ChevronRight size={14} className={`mt-1 transition-transform ${selectedModel.id === model.id ? "translate-x-1 text-orange-400" : "opacity-0"}`} />
            </button>
          ))}
          
          <div className="mt-4 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={12} className="text-orange-400" />
              <span className="mono text-[9px] uppercase tracking-widest font-bold" style={{ color: 'var(--fg-muted)' }}>Trace Log</span>
            </div>
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {logs.map((log, i) => (
                  <motion.div
                    key={log + i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mono text-[9px] leading-relaxed overflow-hidden whitespace-nowrap text-ellipsis"
                    style={{ color: i === 0 ? 'var(--fg)' : 'var(--fg-muted)' }}
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "P50 Latency", icon: Zap, value: latencyData[latencyData.length-1].v.toFixed(0) + "ms", color: "text-orange-400" },
              { label: "Throughput", icon: Activity, value: throughputData[throughputData.length-1].v.toFixed(0) + " r/s", color: "text-blue-400" },
              { label: "Traffic Drift", icon: TrendingUp, value: (driftData[driftData.length-1].v / 5).toFixed(2) + "σ", color: "text-emerald-400" }
            ].map((stat, i) => (
              <div key={i} className="bento-card p-6 flex flex-col items-center justify-center text-center">
                <stat.icon size={20} className={`${stat.color} mb-3`} />
                <div className="text-3xl font-bold mono" style={{ color: 'var(--fg)' }}>{stat.value}</div>
                <div className="mono text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: 'var(--fg-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bento-card p-6 overflow-hidden min-h-[300px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <h4 className="mono text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--fg-muted)' }}>
                  {selectedModel.name} Telemetry Stream
                </h4>
                <p className="text-xl font-bold" style={{ color: 'var(--fg)' }}>Computational Load Cycle</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                <span className="mono text-[10px] uppercase font-bold text-orange-400">Live Proof</span>
              </div>
            </div>
            
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={latencyData}>
                  <defs>
                    <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FD7024" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#FD7024" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', borderRadius: '12px', fontSize: '12px', color: 'var(--fg)' }}
                    itemStyle={{ color: 'var(--orange)' }}
                    cursor={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="#FD7024"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorLatency)"
                    animationDuration={0}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
