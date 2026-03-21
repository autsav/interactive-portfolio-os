"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Minimize2 } from "lucide-react";

interface Message { role: "user" | "assistant"; content: string; }

const STARTERS = [
  "What are your strongest skills?",
  "Tell me about AuraOS",
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
            className="fixed bottom-6 right-6 z-[60] w-full max-w-sm flex flex-col overflow-hidden rounded-2xl border border-orange-500/20 shadow-[0_0_60px_rgba(253,112,36,0.15)]"
            style={{ background: "rgba(10,10,14,0.97)", backdropFilter: "blur(20px)", height: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                  <Bot size={16} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F5ECD7]">AI Second Brain</p>
                  <p className="mono text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block pulse-orange" /> RAG Active
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-[#5a5a6e] hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    msg.role === "assistant"
                      ? "bg-orange-500/20 border border-orange-500/30"
                      : "bg-blue-500/20 border border-blue-500/30"
                  }`}>
                    {msg.role === "assistant"
                      ? <Bot size={14} className="text-orange-400" />
                      : <User size={14} className="text-blue-400" />}
                  </div>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-white/4 border border-white/6 text-[#c8bfaf]"
                      : "bg-orange-500/10 border border-orange-500/20 text-[#F5ECD7]"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-orange-500/20 border border-orange-500/30">
                    <Bot size={14} className="text-orange-400" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white/4 border border-white/6 flex gap-1 items-center">
                    {[0, 0.2, 0.4].map((d) => (
                      <motion.div
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-orange-400"
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
                    className="mono text-[10px] border border-orange-400/20 hover:border-orange-400/50 text-orange-400/70 hover:text-orange-400 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/5">
              <form
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="flex gap-3 items-center bg-white/4 border border-white/8 rounded-xl px-4 py-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, skills, availability..."
                  className="flex-1 bg-transparent text-sm text-[#F5ECD7] placeholder-[#5a5a6e] focus:outline-none mono"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-500 hover:bg-orange-400 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
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
