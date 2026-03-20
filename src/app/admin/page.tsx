"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, GitFork, Clock, CheckCircle2, Circle,
  RefreshCw, Save, LogOut, Layers, Eye, Search,
  Github, ToggleLeft, ToggleRight, ExternalLink,
} from "lucide-react";
import { GithubRepository } from "@/types/project";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "1d ago";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [repos, setRepos] = useState<GithubRepository[]>([]);
  const [featured, setFeatured] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [noToken, setNoToken] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [reposRes, featuredRes] = await Promise.all([
        fetch("/api/admin/repos"),
        fetch("/api/admin/featured"),
      ]);

      if (reposRes.status === 503) {
        setNoToken(true);
      } else {
        const reposData = await reposRes.json();
        setRepos(reposData.repos || []);
      }

      const featuredData = await featuredRes.json();
      setFeatured(new Set(featuredData.featured || []));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  function toggleFeatured(id: string) {
    setFeatured((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/featured", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: Array.from(featured) }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const filteredRepos = repos.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ─── Login Gate ───────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          <div className="glass-card rounded-2xl p-8 shadow-2xl border border-neutral-800">
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Layers size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Admin Dashboard</h1>
              <p className="text-sm text-neutral-500 mt-1">Project OS Control Panel</p>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-widest">
                  Passphrase
                </label>
                <input
                  id="admin-password"
                  type="password"
                  className={`w-full bg-neutral-900 border ${passwordError ? "border-red-500" : "border-neutral-800"} rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors font-mono`}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  autoFocus
                />
                {passwordError && (
                  <p className="text-red-400 text-xs mt-2 font-mono">Incorrect passphrase.</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
              >
                Enter OS
              </button>
            </form>
            <p className="text-[11px] text-neutral-600 text-center mt-6 font-mono">
              Default password: <span className="text-neutral-400">admin123</span><br />
              Set <code>NEXT_PUBLIC_ADMIN_PASSWORD</code> in .env.local to change.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Main Dashboard ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-neutral-900 bg-black/80 backdrop-blur-md px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <Layers size={16} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm leading-tight">Project OS</h1>
            <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">Admin Panel</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-1 max-w-sm mx-auto">
          <div className="relative w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Filter repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-neutral-900"
          >
            <Eye size={14} /> Preview
          </a>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-neutral-900"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              saved
                ? "bg-green-600 text-white"
                : "bg-white text-black hover:bg-neutral-200"
            }`}
          >
            {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saving ? "Saving..." : saved ? "Saved!" : "Save Selection"}
          </button>
          <button
            onClick={() => setAuthed(false)}
            className="text-neutral-600 hover:text-white transition-colors p-2 rounded-lg hover:bg-neutral-900"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Total Repos</p>
              <p className="text-2xl font-bold text-white">{repos.length}</p>
            </div>
            <Github size={24} className="text-neutral-700" />
          </div>
          <div className="glass-card rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Featured</p>
              <p className="text-2xl font-bold text-green-400">{featured.size}</p>
            </div>
            <Eye size={24} className="text-neutral-700" />
          </div>
          <div className="glass-card rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Hidden</p>
              <p className="text-2xl font-bold text-neutral-400">{repos.length - featured.size}</p>
            </div>
            <ToggleLeft size={24} className="text-neutral-700" />
          </div>
        </div>

        {/* No Token Warning */}
        {noToken && (
          <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-xl text-yellow-400 text-sm flex items-start gap-3">
            <span className="text-yellow-500 mt-0.5">⚠</span>
            <div>
              <p className="font-semibold mb-1">No GITHUB_TOKEN detected</p>
              <p className="text-yellow-400/70 text-xs">
                Add <code className="bg-black/30 px-1 py-0.5 rounded">GITHUB_TOKEN=your_token</code> to your{" "}
                <code className="bg-black/30 px-1 py-0.5 rounded">.env.local</code> file to load real repositories.
                Your portfolio will use mock projects until then.
              </p>
            </div>
          </div>
        )}

        {/* Repo Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-neutral-500">
            <RefreshCw size={24} className="animate-spin mr-3" /> Loading repositories...
          </div>
        ) : noToken ? (
          <div className="text-center py-24 text-neutral-500">
            <Github size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium text-neutral-400 mb-2">No repositories to display</p>
            <p className="text-sm">Add your GitHub token to manage real repositories.</p>
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="text-center py-24 text-neutral-500">
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">No repositories match your query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredRepos.map((repo, i) => {
                const isFeatured = featured.has(repo.id);
                return (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`relative rounded-2xl border transition-all cursor-pointer group ${
                      isFeatured
                        ? "bg-neutral-900 border-green-700/50 shadow-[0_0_20px_rgba(74,222,128,0.08)]"
                        : "glass-card border-neutral-800/50 hover:border-neutral-700"
                    }`}
                    onClick={() => toggleFeatured(repo.id)}
                  >
                    {/* Featured Badge */}
                    {isFeatured && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 rounded-full px-2 py-1 text-[10px] font-semibold text-green-400 uppercase tracking-widest">
                        <Eye size={10} /> Featured
                      </div>
                    )}

                    <div className="p-5">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0 relative overflow-hidden">
                          {repo.primaryLanguage?.color && (
                            <div className="absolute inset-0 opacity-20" style={{ backgroundColor: repo.primaryLanguage.color }} />
                          )}
                          <span className="font-bold text-white text-base relative z-10">
                            {repo.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white truncate text-sm">{repo.name}</p>
                          <p className="text-xs text-neutral-500 line-clamp-2 mt-0.5 leading-relaxed">
                            {repo.description || "No description"}
                          </p>
                        </div>
                      </div>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {repo.repositoryTopics?.nodes.slice(0, 3).map(({ topic }) => (
                          <span
                            key={topic.name}
                            className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium text-neutral-400 bg-neutral-800/60 rounded border border-neutral-800"
                          >
                            {topic.name}
                          </span>
                        ))}
                        {repo.primaryLanguage && (
                          <span
                            className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded border flex items-center gap-1"
                            style={{
                              color: repo.primaryLanguage.color || "#aaa",
                              borderColor: (repo.primaryLanguage.color || "#aaa") + "40",
                              backgroundColor: (repo.primaryLanguage.color || "#aaa") + "10",
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color || "#aaa" }} />
                            {repo.primaryLanguage.name}
                          </span>
                        )}
                      </div>

                      {/* Metrics */}
                      <div className="flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-800/50 pt-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5 text-yellow-500">
                            <Star size={12} fill="currentColor" /> {repo.stargazerCount}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <GitFork size={12} /> {repo.forkCount}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} /> {timeAgo(repo.pushedAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={repo.url}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="text-neutral-600 hover:text-white transition-colors"
                          >
                            <ExternalLink size={14} />
                          </a>
                          {isFeatured ? (
                            <CheckCircle2 size={18} className="text-green-500" />
                          ) : (
                            <Circle size={18} className="text-neutral-700 group-hover:text-neutral-500 transition-colors" />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
