"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

interface Message { role: "user" | "assistant"; content: string; }

const STARTERS = [
  "What are your strongest skills?",
  "Tell me about your projects",
  "How do you approach MLOps?",
  "Are you available to hire?",
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey — I'm your AI Second Brain 🧠. Ask me anything about the projects, architecture decisions, or technical background." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text?: string) {
    const content = (text || input).trim();
    if (!content || loading) return;

    const updated: Message[] = [...messages, { role: "user", content }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages([...updated, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...updated, { role: "assistant", content: "Connection error. Please retry." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Trigger */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(253,112,36,0.4)] pulse-orange transition-all ${open ? "opacity-0 pointer-events-none scale-75" : "opacity-100"}`}
        aria-label="Open AI Assistant"
      >
        <Bot size={24} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed bottom-6 right-6 z-[60] w-full max-w-sm flex flex-col overflow-hidden rounded-2xl border shadow-2xl"
            style={{ 
              backgroundColor: "var(--bg-surface)", 
              borderColor: "var(--border)",
              backdropFilter: "var(--glass-blur)",
              height: "520px" 
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center border"
                  style={{ backgroundColor: "var(--orange-dim)", borderColor: "var(--border-hover)" }}
                >
                  <Bot size={16} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>AI Second Brain</p>
                  <p className="mono text-[10px] flex items-center gap-1" style={{ color: "var(--green)" }}>
                    <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ backgroundColor: "var(--green)" }} /> RAG Active
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
                style={{ color: "var(--fg-muted)" }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                    msg.role === "assistant"
                      ? "bg-orange-500/10 border-orange-500/20"
                      : "bg-blue-500/10 border-blue-500/20"
                  }`}>
                    {msg.role === "assistant"
                      ? <Bot size={14} className="text-orange-400" />
                      : <User size={14} className="text-blue-400" />}
                  </div>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed border ${
                    msg.role === "assistant"
                      ? "bg-white/4"
                      : "bg-orange-500/10"
                  }`} style={{ color: "var(--fg)", borderColor: "var(--border)" }}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center border"
                    style={{ backgroundColor: "var(--orange-dim)", borderColor: "var(--border-hover)" }}
                  >
                    <Bot size={14} className="text-orange-400" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl flex gap-1 items-center bg-white/4 border" style={{ borderColor: "var(--border)" }}>
                    {[0, 0.2, 0.4].map((d) => (
                      <motion.div
                        key={d}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: "var(--orange)" }}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: d }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick starters — shown only at start */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex gap-2 flex-wrap">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="mono text-[10px] border px-3 py-1.5 rounded-full transition-colors"
                    style={{ borderColor: "var(--border-hover)", color: "var(--orange)", backgroundColor: "var(--orange-dim)" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
              <form
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="flex gap-3 items-center border rounded-xl px-4 py-2 bg-white/4"
                style={{ borderColor: "var(--border)" }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent text-sm focus:outline-none mono"
                  style={{ color: "var(--fg)" }}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-500 hover:bg-orange-400 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0 shadow-lg"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
