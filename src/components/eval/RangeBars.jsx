import { useState } from 'react';
import { fmtInt, fmtPct } from './classes';

// Re-observation of likely-visible sightings by range: one bar per run-derived bucket with its cluster-bootstrap interval;
// a bucket below the support rule is grey and never the worst slice. Click a bar to read its numbers.
export const RangeBars = ({ buckets, worst, support }) => {
    const defaultIdx = Math.max(0, buckets.findIndex((b) => worst && b.bin === worst.bin));
    const [sel, setSel] = useState(defaultIdx);
    const W = 520, H = 180, L = 38, R = 8, T = 14, B = 40;
    const n = buckets.length || 1;
    const slot = (W - L - R) / n;
    const bw = Math.min(40, slot * 0.66);
    const y = (v) => T + (H - T - B) * (1 - v / 100);
    const b = buckets[sel];

    return (
        <div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="re-observed share by range">
                {[0, 25, 50, 75, 100].map((v) => (
                    <g key={v}>
                        <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.06)" />
                        <text x={L - 6} y={y(v) + 4} textAnchor="end" fontSize="10" fill="#71717a" fontFamily="Geist Mono, monospace">{v}</text>
                    </g>
                ))}
                {buckets.map((bk, i) => {
                    const cx = L + slot * (i + 0.5);
                    const v = bk.rate ?? 0;
                    const isSel = i === sel;
                    const fill = !bk.supported ? '#3f3f46' : isSel ? '#34d399' : '#10b981';
                    return (
                        <g key={bk.bin} onClick={() => setSel(i)} style={{ cursor: 'pointer' }} role="button" aria-label={`${bk.bin}: ${fmtPct(bk.rate)} re-observed`} tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(i); } }}>
                            <rect x={cx - slot / 2} y={T} width={slot} height={H - T - B} fill="transparent" />
                            <rect x={cx - bw / 2} y={y(v)} width={bw} height={Math.max(0, H - B - y(v))} rx="3" fill={fill} opacity={isSel ? 1 : 0.85} />
                            {bk.ci_lo != null && bk.ci_hi != null && (
                                <g stroke="#e4e4e7" strokeWidth="1.2">
                                    <line x1={cx} x2={cx} y1={y(bk.ci_hi)} y2={y(bk.ci_lo)} />
                                    <line x1={cx - 4} x2={cx + 4} y1={y(bk.ci_hi)} y2={y(bk.ci_hi)} />
                                    <line x1={cx - 4} x2={cx + 4} y1={y(bk.ci_lo)} y2={y(bk.ci_lo)} />
                                </g>
                            )}
                            <text x={cx} y={y(v) - 5} textAnchor="middle" fontSize="10" fill="#d4d4d8" fontFamily="Geist Mono, monospace">{bk.rate == null ? '–' : Math.round(v)}</text>
                            <text x={cx} y={H - B + 14} textAnchor="middle" fontSize="9.5" fill="#a1a1aa" fontFamily="Geist Mono, monospace">{bk.bin.replace(' m', '')}</text>
                            <text x={cx} y={H - B + 26} textAnchor="middle" fontSize="9" fill="#71717a" fontFamily="Geist Mono, monospace">n={bk.visible}</text>
                            {worst && bk.bin === worst.bin && <text x={cx} y={H - 2} textAnchor="middle" fontSize="9" fill="#fbbf24" fontFamily="Geist Mono, monospace">worst slice</text>}
                        </g>
                    );
                })}
            </svg>
            {b && (
                <div className="mt-1 text-sm text-zinc-300 font-mono" aria-live="polite">
                    {b.bin}: {fmtPct(b.rate)} re-observed of {fmtInt(b.visible)} likely-visible sightings
                    {b.clusters != null && <> · {b.clusters} clusters</>}
                    {b.ci_lo != null && <> · 95 % interval {fmtPct(b.ci_lo)} to {fmtPct(b.ci_hi)}</>}
                    {!b.supported && <span className="text-zinc-500"> · below support, never named the worst slice</span>}
                </div>
            )}
            {support && (
                <div className="mt-2 text-[11px] text-zinc-500">
                    Support: {support.min_views} likely-visible sightings of {support.min_clusters} clusters per bucket; intervals from a {support.bootstrap}-sample bootstrap over clusters. Metres along the x axis.
                </div>
            )}
        </div>
    );
};
