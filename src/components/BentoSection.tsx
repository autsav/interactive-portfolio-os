"use client";

import { motion } from "framer-motion";
import {
  Brain, Cpu, Globe, Zap, GitBranch, Server,
  TrendingUp, Shield, Code2, Database
} from "lucide-react";

const bentoItems = [
  {
    id: "ai-core",
    title: "AI Systems",
    subtitle: "LLMs · RAG · Agents",
    description: "Production-grade AI pipelines with LangChain, vector stores, and agentic orchestration across diverse model backends.",
    icon: Brain,
    color: "#FD7024",
    bg: "bg-orange-500/5",
    border: "border-orange-500/20",
    size: "col-span-2 row-span-2",
    accent: true,
  },
  {
    id: "infra",
    title: "Infra & MLOps",
    subtitle: "Docker · K8s · CI/CD",
    description: "Automated model deployment, drift detection, and real-time monitoring pipelines.",
    icon: Server,
    color: "#60A5FA",
    bg: "bg-blue-500/5",
    border: "border-blue-500/20",
    size: "col-span-1 row-span-1",
    accent: false,
  },
  {
    id: "perf",
    title: "Performance",
    subtitle: "< 50ms P99 latency",
    description: "Optimized token routing and quantized inference on edge hardware.",
    icon: Zap,
    color: "#FD7024",
    bg: "bg-orange-500/5",
    border: "border-orange-500/20",
    size: "col-span-1 row-span-1",
    accent: false,
  },
  {
    id: "fullstack",
    title: "Full-Stack Dev",
    subtitle: "Next.js · TypeScript",
    description: "End-to-end product engineering from system design to pixel-perfect UI.",
    icon: Code2,
    color: "#C084FC",
    bg: "bg-purple-500/5",
    border: "border-purple-500/20",
    size: "col-span-1 row-span-1",
    accent: false,
  },
  {
    id: "data",
    title: "Data Engineering",
    subtitle: "PostgreSQL · Spark",
    description: "Streaming pipelines, feature stores, and real-time data systems at scale.",
    icon: Database,
    color: "#34d399",
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/20",
    size: "col-span-1 row-span-1",
    accent: false,
  },
  {
    id: "security",
    title: "Ethical AI",
    subtitle: "Privacy · Governance",
    description: "Confidential computing, federated learning, and transparent model explainability.",
    icon: Shield,
    color: "#60A5FA",
    bg: "bg-blue-500/5",
    border: "border-blue-500/20",
    size: "col-span-1 row-span-1",
    accent: false,
  },
  {
    id: "scale",
    title: "Scale",
    subtitle: "Global Distribution",
    description: "CDN-first architectures deployed across 50+ regions.",
    icon: Globe,
    color: "#FD7024",
    bg: "bg-orange-500/5",
    border: "border-orange-500/20",
    size: "col-span-1 row-span-1",
    accent: false,
  },
];

const STATS = [
  { value: "40%", label: "Avg Latency Reduction" },
  { value: "10x", label: "Throughput Gains" },
  { value: "99.9%", label: "System Uptime" },
  { value: "50+", label: "Models Shipped" },
];

export function BentoSection() {
  return (
    <section id="bento" className="relative py-32 px-4 max-w-7xl mx-auto">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="mono text-xs tracking-[0.4em] text-orange-400/70 uppercase mb-4 block">
          ◈ Capability Matrix
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#F5ECD7] mb-4">
          Built to{" "}
          <span className="text-gradient-orange">Operate</span>
        </h2>
        <p className="text-[#5a5a6e] max-w-xl mx-auto text-lg">
          A senior systems architect who ships — from prototype to production, week 1.
        </p>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="bento-card px-6 py-5 text-center">
            <p className="text-3xl font-bold text-gradient-orange mb-1 mono">{stat.value}</p>
            <p className="text-xs text-[#5a5a6e] uppercase tracking-wider mono">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[8rem]">
        {bentoItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 80 }}
              whileHover={{ y: -4 }}
              className={`bento-card p-6 flex flex-col justify-between relative overflow-hidden group cursor-default
                ${item.size} ${item.bg} ${item.border} border`}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${item.color}08, transparent 70%)` }}
              />

              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: item.color + "15", border: `1px solid ${item.color}30` }}
                >
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-[#F5ECD7] text-lg leading-tight mb-1">{item.title}</h3>
                <p className="mono text-xs" style={{ color: item.color + "bb" }}>{item.subtitle}</p>
              </div>

              {item.accent && (
                <p className="text-[#5a5a6e] text-sm leading-relaxed mt-3">{item.description}</p>
              )}

              {/* Corner decoration */}
              <div
                className="absolute bottom-0 right-0 w-16 h-16 opacity-10"
                style={{
                  background: `radial-gradient(circle at 100% 100%, ${item.color}, transparent)`,
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
