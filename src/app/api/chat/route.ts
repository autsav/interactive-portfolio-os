import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Grounded CV/Bio context — RAG mock (replace with actual Supabase pgvector in prod)
const SYSTEM_CONTEXT = `
You are the AI Second Brain assistant for autsav's portfolio website — an interactive operating system for their projects.

Here is their core CV and project context (RAG grounded knowledge):

## Professional Profile
- Senior AI Systems Architect & Full-Stack Developer
- 5+ years shipping production ML systems at scale
- Expertise: LLMs, RAG pipelines, MLOps, distributed systems, Next.js, Python, Rust

## Key Projects
1. **AuraOS** — Open-source generative UI layer. Built a real-time token streaming pipeline achieving sub-50ms latency. Powered by LLMs with dynamic component rendering. 10k+ users.
2. **EchoEngine** — Distributed text-to-speech pipeline in Rust. Zero-copy memory management, adaptive bitrate streaming, 2.5k+ concurrent sessions.
3. **NexusDB** — In-memory vector database for edge computing. HNSW index, JIT compiled query plans, hot-standby replication. 15k+ production deployments.

## Technical Philosophy
- Reduce hallucinations through strict RAG grounding and source attribution
- Privacy-preserving AI: federated learning, on-device inference where possible
- Case study thinking: challenge → architectural trade-offs → measurable impact metrics
- Performance-first: every system targets <50ms P99 latency

## Measurable Impact
- Reduced inference latency by 40% through adaptive token routing
- 10x throughput gains via distributed K8s inference clusters
- 99.9% uptime across globally distributed edge deployments
- Shipped 50+ production ML models across NLP, CV, and audio domains

## Contact & Links
- GitHub: https://github.com/autsav
- Twitter: https://twitter.com/autsav

Always answer concisely, technically accurately, and ground your answers in the above context.
If asked something outside this context, say: "I don't have data on that in my knowledge base — check the GitHub directly."
Keep responses under 120 words. Be direct, confident, and slightly technical.
`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // Graceful mock response when no API key
    const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
    let reply = "I'm the AI Second Brain — but my OpenAI key isn't configured yet. Add `OPENAI_API_KEY` to `.env.local` to activate me!";

    if (lastMsg.includes("project") || lastMsg.includes("aura") || lastMsg.includes("nexus")) {
      reply = "AuraOS is the flagship project — a generative UI layer with sub-50ms streaming latency serving 10k+ users. NexusDB is a vector database achieving 15k+ edge deployments. Click any project card to explore interactively!";
    } else if (lastMsg.includes("skill") || lastMsg.includes("tech") || lastMsg.includes("stack")) {
      reply = "Core stack: Next.js, TypeScript, Python, Rust, LangChain, Supabase pgvector, Docker/K8s, and Three.js. Specializing in production AI systems with measurable latency and throughput targets.";
    } else if (lastMsg.includes("contact") || lastMsg.includes("hire") || lastMsg.includes("email")) {
      reply = "Available for senior roles and high-impact consulting. GitHub: github.com/autsav — or use the contact links in the navigation bar.";
    }

    return NextResponse.json({ reply });
  }

  try {
    const res = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_CONTEXT },
          ...messages.slice(-6), // Keep last 6 turns for context
        ],
        max_tokens: 200,
        temperature: 0.5,
      }),
    });

    if (!res.ok) throw new Error("OpenAI error");

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "No response generated.";
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ reply: "System error — please try again." }, { status: 500 });
  }
}
