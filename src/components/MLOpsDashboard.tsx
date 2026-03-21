"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, AlertCircle, CheckCircle2, Cpu, TrendingDown, TrendingUp } from "lucide-react";

// Flat deterministic series used for SSR — no Math.random()
function flatSeries(count = 20, value = 50) {
  return Array.from({ length: count }, (_, i) => ({ t: i, v: value }));
}

// Random series only called on the client
function generateSeries(count = 20, base = 50, noise = 15) {
  return Array.from({ length: count }, (_, i) => ({
    t: i,
    v: Math.max(0, Math.min(100, base + (Math.random() - 0.5) * noise * 2)),
  }));
}

const MODELS = [
  { id: "gpt-4", name: "GPT-4o", latency: 47, p99: 88, drift: 0.03, status: "healthy" },
  { id: "claude", name: "Claude 3.5", latency: 38, p99: 71, drift: 0.01, status: "healthy" },
  { id: "local", name: "Mistral-7B", latency: 12, p99: 29, drift: 0.12, status: "warning" },
];

export function MLOpsDashboard() {
  // Initialise with flat/deterministic data so SSR and client match
  const [latencyData, setLatencyData] = useState(() => flatSeries(20, 45));
  const [throughputData, setThroughputData] = useState(() => flatSeries(20, 70));
  const [driftData, setDriftData] = useState(() => flatSeries(20, 5));
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [mounted, setMounted] = useState(false);
  const [anomaly, setAnomaly] = useState<string | null>(null);

  useEffect(() => {
    // Seed real random data after hydration
    setLatencyData(generateSeries(20, 45, 10));
    setThroughputData(generateSeries(20, 70, 15));
    setDriftData(generateSeries(20, 5, 3));
    setMounted(true);

    const interval = setInterval(() => {
      setLatencyData((d) => [
        ...d.slice(1),
        { t: d[d.length - 1].t + 1, v: Math.max(5, Math.min(100, d[d.length - 1].v + (Math.random() - 0.5) * 12)) },
      ]);
      setThroughputData((d) => [
        ...d.slice(1),
        { t: d[d.length - 1].t + 1, v: Math.max(20, Math.min(100, d[d.length - 1].v + (Math.random() - 0.5) * 15)) },
      ]);
      setDriftData((d) => {
        const next = Math.max(0, Math.min(30, d[d.length - 1].v + (Math.random() - 0.5) * 4));
        if (next > 18) setAnomaly("Concept Drift Detected in Feature Vector 0x4A");
        else if (Math.random() > 0.95) setAnomaly(null);
        return [...d.slice(1), { t: d[d.length - 1].t + 1, v: next }];
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Show placeholders until client has hydrated (avoids mismatched text)
  const currentLatency = mounted ? latencyData[latencyData.length - 1].v.toFixed(0) : "—";
  const currentThroughput = mounted ? throughputData[throughputData.length - 1].v.toFixed(0) : "—";
  const currentDrift = mounted ? driftData[driftData.length - 1].v.toFixed(2) : "—";

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="mono text-xs tracking-[0.4em] text-orange-400/70 uppercase mb-4 block">
          ◈ Live Telemetry
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#F5ECD7] mb-4">
          MLOps{" "}
          <span className="text-gradient-cool">Dashboard</span>
        </h2>
        <p className="max-w-xl mx-auto" style={{ color: "var(--fg-muted)" }}>
          Real-time model monitoring with sliding window feature engineering and automated drift detection.
        </p>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Model Selector Panel */}
        <div className="bento-card p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <Cpu size={16} className="text-orange-400" />
            <h3 className="mono text-xs uppercase tracking-widest text-[#5a5a6e]">Active Models</h3>
          </div>
          {MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className={`text-left p-4 rounded-xl border transition-all ${
                selectedModel.id === model.id
                  ? "border-orange-500/40 bg-orange-500/8"
                  : "border-white/5 hover:border-white/15 bg-white/2"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-[#F5ECD7]">{model.name}</span>
                {model.status === "healthy" ? (
                  <CheckCircle2 size={14} className="text-emerald-400" />
                ) : (
                  <AlertCircle size={14} className="text-yellow-400" />
                )}
              </div>
              <div className="mono text-[10px] text-[#5a5a6e] space-y-1">
                <div>Avg p50: <span className="text-blue-400">{model.latency}ms</span></div>
                <div>Drift: <span className={model.drift > 0.1 ? "text-yellow-400" : "text-emerald-400"}>{model.drift}</span></div>
              </div>
            </button>
          ))}
        </div>

        {/* Charts column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Latency P50", value: `${currentLatency}ms`, icon: Activity, trend: Number(currentLatency) < 50 ? "down" : "up", color: "text-orange-400" },
              { label: "Throughput", value: `${currentThroughput} req/s`, icon: TrendingUp, trend: "up", color: "text-blue-400" },
              { label: "Feature Drift", value: `${currentDrift}σ`, icon: TrendingDown, trend: Number(currentDrift) < 10 ? "down" : "up", color: "text-emerald-400" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bento-card p-4 text-center relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${stat.trend === "down" && stat.label === "Latency P50" ? "bg-emerald-400" : stat.trend === "up" ? "bg-emerald-400" : "bg-yellow-400"} pulse-orange`} />
                  </div>
                  <Icon size={16} className={`${stat.color} mx-auto mb-2`} />
                  <div className={`text-xl font-bold mono ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="mono text-[10px] text-[#5a5a6e] uppercase tracking-wider">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Latency Chart */}
          <div className="bento-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="mono text-xs uppercase tracking-widest text-[#5a5a6e]">Inference Latency — Sliding Window (1s)</h4>
              <span className="mono text-[10px] text-orange-400 border border-orange-400/30 px-2 py-0.5 rounded-full">LIVE</span>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={latencyData}>
                <XAxis dataKey="t" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: "#0c0c10", border: "1px solid rgba(253,112,36,0.2)", borderRadius: "8px", fontSize: "11px", fontFamily: "IBM Plex Mono" }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(v: any) => [`${Number(v).toFixed(1)}ms`, "Latency"]}
                  labelFormatter={() => ""}
                />
                <Line type="monotone" dataKey="v" stroke="#FD7024" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Throughput + Drift */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bento-card p-5">
              <h4 className="mono text-[10px] uppercase tracking-widest text-[#5a5a6e] mb-3">Request Throughput</h4>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={throughputData}>
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={[0, 100]} />
                  <Line type="monotone" dataKey="v" stroke="#60A5FA" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bento-card p-5">
              <h4 className="mono text-[10px] uppercase tracking-widest text-[#5a5a6e] mb-3">Feature Drift (σ)</h4>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={driftData}>
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={[0, 30]} />
                  <Line type="monotone" dataKey="v" stroke="#34d399" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
