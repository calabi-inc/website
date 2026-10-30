import { CLASSES, fmtInt, fmtPct } from './classes';

const BY_KEY = Object.fromEntries(CLASSES.map((c) => [c.key, c]));
// Each side wears the colour of its leading class: the detector side that of "no detection near it", the association side that of "split into a new id".
const PARTS = [
    { key: 'reobserved', name: 're-observed', color: BY_KEY.reobserved.color, ink: '#09090b' },
    { key: 'detector_side', name: 'detector side', color: BY_KEY.no_detection.color, ink: '#ffffff' },
    { key: 'association_side', name: 'association side', color: BY_KEY.split.color, ink: '#ffffff' },
    { key: 'hidden', name: 'likely hidden', color: BY_KEY.hidden.color, ink: '#ffffff' },
];

const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

const row = (name, n, parts, o) => {
    const segs = parts.map((p) => ({ ...p, n: o[p.key] || 0 })).filter((p) => p.n > 0);
    const tot = Math.max(1, segs.reduce((a, s) => a + s.n, 0));
    return { name, n, segs: segs.map((s) => ({ ...s, pct: (100 * s.n) / tot })) };
};

const GRID = 'grid grid-cols-1 sm:grid-cols-[190px_minmax(0,1fr)] gap-x-3';

// The loss funnel: three 100 % rows, each the zoom of one part of the row above (the bracket between them marks the part). Row 1 is every
// sighting of a confirmed object in view, row 2 the likely visible ones with the hidden banded out, row 3 the unexplained ones split between
// the two sides. The same breakdown as one sentence is the figure's accessible label; a share is printed inside a segment that has room for it
// (a container query on the segment, so it follows the real width, not a share threshold).
export const LossFunnel = ({ ownership: o }) => {
    const reob = o.reobserved || 0;
    const det = o.detector_side || 0;
    const assoc = o.association_side || 0;
    const hid = o.hidden || 0;
    const tot1 = Math.max(1, reob + det + assoc + hid);
    const tot2 = reob + det + assoc;
    const tot3 = det + assoc;
    const rows = [row('sightings of confirmed objects in view', o.views, PARTS, o)];
    const zooms = [];
    if (tot2 > 0) {
        rows.push(row('likely visible', o.visible, PARTS.slice(0, 3), o));
        zooms.push([0, (100 * tot2) / tot1]);
    }
    if (tot3 > 0) {
        rows.push(row('unexplained', o.unexplained, PARTS.slice(1, 3), o));
        zooms.push([(100 * reob) / tot2, 100]);
    }
    const [lead, trail] = [['association side', o.association_side_share ?? 0], ['detector side', o.detector_side_share ?? 0]].sort((a, b) => b[1] - a[1]);
    const text =
        `Of ${fmtInt(o.views)} sightings of confirmed objects in view, ${fmtPct(o.hidden_share)} were likely hidden. Of the ${fmtInt(o.visible)} likely visible, ${fmtPct(o.reobserved_of_visible)} were re-observed.` +
        (tot3 > 0 ? ` The ${fmtInt(o.unexplained)} unexplained split ${fmtPct(o.detector_side_share)} detector side and ${fmtPct(o.association_side_share)} association side: ${o.verdict}.` : ` ${cap(o.verdict)}.`);

    return (
        <figure className="m-0 min-w-0" aria-label={text}>
            <p className="text-sm text-zinc-200 font-medium leading-relaxed mb-3">
                {fmtPct(o.reobserved_of_visible)} of likely-visible sightings re-observed. {cap(o.verdict)}.
            </p>
            {rows.map((r, i) => (
                <div key={r.name}>
                    {i > 0 && (
                        <div className={GRID}>
                            <div className="hidden sm:block" />
                            <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="block w-full h-2.5" aria-hidden="true">
                                <polygon points={`${zooms[i - 1][0].toFixed(2)},0 ${zooms[i - 1][1].toFixed(2)},0 100,10 0,10`} fill="rgba(255,255,255,0.1)" />
                            </svg>
                        </div>
                    )}
                    <div className={`${GRID} gap-y-0.5 items-center ${i > 0 ? 'mt-0.5' : ''}`}>
                        <div className="text-xs text-zinc-400 sm:text-right leading-tight">
                            <b className="text-zinc-100 font-semibold font-mono">{fmtInt(r.n)}</b> {r.name}
                        </div>
                        <div className="flex gap-0.5 h-[22px] rounded overflow-hidden" role="list" aria-label={`${r.name}: ${fmtInt(r.n)}`}>
                            {r.segs.map((s) => (
                                <div
                                    key={s.key}
                                    role="listitem"
                                    title={`${s.name}: ${fmtInt(s.n)} of ${fmtInt(r.n)} (${fmtPct(s.pct)})`}
                                    style={{ width: `${s.pct}%`, backgroundColor: s.color, color: s.ink }}
                                    className="@container h-full min-w-0 flex items-center justify-center font-mono text-[11px] font-semibold"
                                >
                                    <span className="hidden @min-[56px]:inline whitespace-nowrap">{fmtPct(s.pct)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-500">
                {PARTS.filter((p) => (o[p.key] || 0) > 0).map((p) => (
                    <span key={p.key} className="inline-flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-sm" style={{ backgroundColor: p.color }} />
                        {p.name}{p.key === 'hidden' ? ' (banded out)' : ''} {fmtInt(o[p.key])}
                    </span>
                ))}
            </div>
            <figcaption className="mt-2 text-sm text-zinc-300">
                <b className="text-zinc-100">{cap(o.verdict)}.</b>
                {tot3 > 0 && (
                    <span className="text-zinc-500 text-xs">
                        {' '}{lead[0]} {fmtPct(lead[1])} against {trail[0]} {fmtPct(trail[1])}: a gap of {(o.gap_pp ?? lead[1] - trail[1]).toFixed(1)} pp; a side needs more than {Number(o.margin).toFixed(1)} pp.
                    </span>
                )}
            </figcaption>
        </figure>
    );
};
