import type { DiagramKey } from "@/lib/content";

const STROKE = "var(--accent)";
const STROKE_MUTED = "var(--fg-subtle)";

const COMMON = {
  width: 120,
  height: 56,
  fill: "none" as const,
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Fashion() {
  // Embedding-driven recommender: a centroid item with vector neighbors radiating
  return (
    <svg viewBox="0 0 120 56" aria-hidden {...COMMON}>
      <circle cx="60" cy="28" r="4" fill={STROKE} stroke="none" />
      {[
        [20, 14],
        [16, 32],
        [28, 48],
        [54, 8],
        [70, 50],
        [96, 14],
        [104, 36],
        [88, 50],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1="60" y1="28" x2={x} y2={y} stroke={STROKE_MUTED} opacity={0.5} />
          <circle cx={x} cy={y} r="2.2" fill="none" stroke={STROKE} />
        </g>
      ))}
    </svg>
  );
}

function ContentEditing() {
  // Linear capture-edit-export pipeline with one AI-assist branch
  return (
    <svg viewBox="0 0 120 56" aria-hidden {...COMMON}>
      {[12, 36, 60, 84, 108].map((x) => (
        <circle key={x} cx={x} cy="36" r="3" fill={STROKE} stroke="none" />
      ))}
      <line x1="12" y1="36" x2="108" y2="36" stroke={STROKE} />
      {/* AI assist branch */}
      <path d="M 60 36 Q 60 14, 84 14" stroke={STROKE_MUTED} fill="none" />
      <rect x="74" y="6" width="20" height="14" rx="2" stroke={STROKE_MUTED} fill="none" />
      <line x1="78" y1="13" x2="90" y2="13" stroke={STROKE_MUTED} opacity={0.7} />
      <line x1="78" y1="16" x2="86" y2="16" stroke={STROKE_MUTED} opacity={0.5} />
    </svg>
  );
}

function Logistics() {
  // City graph: nodes (pickup/dropoff) with routing edges
  return (
    <svg viewBox="0 0 120 56" aria-hidden {...COMMON}>
      {/* edges */}
      <path d="M 14 14 L 40 28 L 64 12 L 90 30 L 108 18" stroke={STROKE} fill="none" />
      <path d="M 14 14 L 28 44 L 64 12" stroke={STROKE_MUTED} opacity={0.5} fill="none" />
      <path d="M 40 28 L 60 46 L 90 30" stroke={STROKE_MUTED} opacity={0.5} fill="none" />
      <path d="M 90 30 L 108 18" stroke={STROKE} fill="none" />
      {/* nodes */}
      {[
        [14, 14],
        [40, 28],
        [64, 12],
        [90, 30],
        [108, 18],
        [28, 44],
        [60, 46],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="2.5"
          fill={i === 0 || i === 4 ? STROKE : "var(--bg)"}
          stroke={STROKE}
        />
      ))}
    </svg>
  );
}

function Pharma() {
  // Audit-trail stack: layered horizontal bars with verification marks
  return (
    <svg viewBox="0 0 120 56" aria-hidden {...COMMON}>
      {[10, 22, 34, 46].map((y, i) => (
        <g key={y}>
          <rect x="14" y={y - 4} width="72" height="8" rx="1.5" stroke={STROKE_MUTED} fill="none" opacity={0.7} />
          {/* check mark */}
          <path
            d={`M 96 ${y - 1} L 100 ${y + 2} L 106 ${y - 3}`}
            stroke={STROKE}
            fill="none"
            opacity={i === 3 ? 1 : 0.55}
          />
        </g>
      ))}
    </svg>
  );
}

function ERP() {
  // Vertical SaaS modules: nested rectangles + grid (spreadsheet → system)
  return (
    <svg viewBox="0 0 120 56" aria-hidden {...COMMON}>
      <rect x="8" y="8" width="48" height="40" rx="2" stroke={STROKE_MUTED} fill="none" />
      {/* grid lines inside left block */}
      <line x1="8" y1="22" x2="56" y2="22" stroke={STROKE_MUTED} opacity={0.45} />
      <line x1="8" y1="36" x2="56" y2="36" stroke={STROKE_MUTED} opacity={0.45} />
      <line x1="24" y1="8" x2="24" y2="48" stroke={STROKE_MUTED} opacity={0.45} />
      <line x1="40" y1="8" x2="40" y2="48" stroke={STROKE_MUTED} opacity={0.45} />
      {/* arrow */}
      <line x1="60" y1="28" x2="74" y2="28" stroke={STROKE} />
      <path d="M 70 24 L 74 28 L 70 32" stroke={STROKE} fill="none" />
      {/* destination: structured modules */}
      <rect x="78" y="10" width="34" height="12" rx="2" stroke={STROKE} fill="none" />
      <rect x="78" y="24" width="34" height="10" rx="2" stroke={STROKE} fill="none" />
      <rect x="78" y="36" width="34" height="10" rx="2" stroke={STROKE} fill="none" />
    </svg>
  );
}

function EdTech() {
  // Funnel narrowing → completion star
  return (
    <svg viewBox="0 0 120 56" aria-hidden {...COMMON}>
      <path
        d="M 10 10 L 90 10 L 76 28 L 90 46 L 10 46 L 24 28 Z"
        stroke={STROKE_MUTED}
        fill="none"
        opacity={0.6}
      />
      {/* path through */}
      <path d="M 10 28 L 24 28 L 76 28 L 100 28" stroke={STROKE} fill="none" strokeDasharray="2 3" />
      {/* completion mark */}
      <circle cx="106" cy="28" r="5" fill="none" stroke={STROKE} />
      <path d="M 103 28 L 105.5 30.5 L 109 26.5" stroke={STROKE} fill="none" />
    </svg>
  );
}

const MAP: Record<DiagramKey, () => React.JSX.Element> = {
  fashion: Fashion,
  "content-editing": ContentEditing,
  logistics: Logistics,
  pharma: Pharma,
  erp: ERP,
  edtech: EdTech,
};

export function DomainDiagram({
  kind,
  className = "",
}: {
  kind: DiagramKey;
  className?: string;
}) {
  const Cmp = MAP[kind] ?? Fashion;
  return (
    <div className={className} aria-hidden>
      <Cmp />
    </div>
  );
}
