import { useState } from 'react';
import { CLASSES, fmtInt, fmtPct } from './classes';

// "Who owns the loss": every sighting of a confirmed object in view, as a stacked bar in the report's classes.
// Hover or focus a segment to read its count; the detail line under the bar is the tooltip (it also works on touch).
export const OwnershipBar = ({ ownership }) => {
    const o = ownership;
    const total = o.views || 1;
    const segments = CLASSES.map((c) => ({ ...c, n: o[c.key] || 0 }));
    const [active, setActive] = useState(null);
    const detail = active ?? segments[0];

    return (
        <div>
            <div className="flex w-full h-8 rounded-lg overflow-hidden border border-white/10" role="list" aria-label="sightings by attribution">
                {segments.map((s) => {
                    const w = (100 * s.n) / total;
                    if (!s.n) return null;
                    return (
                        <button
                            key={s.key}
                            type="button"
                            role="listitem"
                            aria-label={`${s.label}: ${s.n} sightings, ${fmtPct(w)}`}
                            style={{ width: `${w}%`, backgroundColor: s.color }}
                            className={`relative h-full transition-opacity ${active && active.key !== s.key ? 'opacity-60' : 'opacity-100'} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70`}
                            onMouseEnter={() => setActive(s)}
                            onFocus={() => setActive(s)}
                            onClick={() => setActive(s)}
                        >
                            {w > 9 && <span className="absolute inset-0 flex items-center justify-center text-[11px] font-mono text-white/90">{Math.round(w)} %</span>}
                        </button>
                    );
                })}
            </div>
            <div className="mt-2 text-sm text-zinc-300 font-mono min-h-[1.5rem]" aria-live="polite">
                <span className="inline-block w-2.5 h-2.5 rounded-sm mr-2 align-middle" style={{ backgroundColor: detail.color }} />
                {detail.label} · {fmtInt(detail.n)} sightings · {fmtPct((100 * detail.n) / total)}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-500">
                {segments.filter((s) => s.n).map((s) => (
                    <span key={s.key} className="inline-flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-sm" style={{ backgroundColor: s.color }} />
                        {s.label} {fmtInt(s.n)}
                    </span>
                ))}
            </div>
        </div>
    );
};
