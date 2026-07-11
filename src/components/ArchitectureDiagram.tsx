import { Diagram } from "@/data/projects";

interface Props {
  diagram: Diagram;
  /** Accessible description of what the diagram shows. */
  title: string;
  className?: string;
}

const NODE_W = 148;
const NODE_H = 52;
const COL_GAP = 210;
const ROW_GAP = 86;
const PAD = 14;

function nodeX(col: number) {
  return PAD + col * COL_GAP;
}
function nodeY(row: number) {
  return PAD + row * ROW_GAP;
}

/**
 * The site's signature element: a hand-built system schematic in the Blueprint
 * style. Pure SVG — no JS, no layout shift, scales to any width. Decorative
 * detail is aria-hidden; the whole figure carries a text description.
 */
export function ArchitectureDiagram({ diagram, title, className }: Props) {
  const { nodes, edges } = diagram;
  const maxCol = Math.max(...nodes.map((n) => n.col));
  const maxRow = Math.max(...nodes.map((n) => n.row));
  const width = PAD * 2 + maxCol * COL_GAP + NODE_W;
  const height = PAD * 2 + maxRow * ROW_GAP + NODE_H;

  const byId = new Map(nodes.map((n) => [n.id, n]));

  return (
    <figure className={className} role="group" aria-label={title}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        className="h-auto w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="var(--color-graphite)" />
          </marker>
        </defs>

        {/* edges (drawn under nodes) */}
        {edges.map((e, i) => {
          const a = byId.get(e.from);
          const b = byId.get(e.to);
          if (!a || !b) return null;
          const ax = nodeX(a.col) + NODE_W / 2;
          const ay = nodeY(a.row) + NODE_H / 2;
          const bx = nodeX(b.col) + NODE_W / 2;
          const by = nodeY(b.row) + NODE_H / 2;
          const mx = (ax + bx) / 2;
          const my = (ay + by) / 2;
          return (
            <g key={i}>
              <line
                x1={ax}
                y1={ay}
                x2={bx}
                y2={by}
                stroke="var(--color-line)"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
              {e.label && (
                <text
                  x={mx}
                  y={my - 5}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="10.5"
                  fill="var(--color-graphite)"
                  style={{ paintOrder: "stroke" }}
                  stroke="var(--color-paper)"
                  strokeWidth="4"
                >
                  {e.label}
                </text>
              )}
            </g>
          );
        })}

        {/* nodes */}
        {nodes.map((n) => {
          const x = nodeX(n.col);
          const y = nodeY(n.row);
          return (
            <g key={n.id}>
              <rect
                x={x}
                y={y}
                width={NODE_W}
                height={NODE_H}
                rx="8"
                fill="var(--color-surface)"
                stroke={n.accent ? "var(--color-blueprint)" : "var(--color-line)"}
                strokeWidth={n.accent ? "2" : "1.5"}
              />
              <text
                x={x + 14}
                y={y + (n.sub ? 22 : 30)}
                fontFamily="var(--font-display)"
                fontSize="14"
                fontWeight="600"
                fill="var(--color-ink)"
              >
                {n.label}
              </text>
              {n.sub && (
                <text
                  x={x + 14}
                  y={y + 38}
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                  fill="var(--color-graphite)"
                >
                  {n.sub}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  );
}
