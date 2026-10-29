// The trust block: can the recording be trusted? Each check against its declared threshold, printed beside the value.
const PILL = {
    pass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    warn: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    fail: 'bg-red-500/10 border-red-500/30 text-red-400',
    info: 'bg-zinc-700/30 border-zinc-600/30 text-zinc-400',
};

export const StatePill = ({ state, children }) => (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-mono uppercase tracking-wider ${PILL[state] || PILL.info}`}>
        {children ?? state}
    </span>
);

export const TrustList = ({ trust }) => (
    <div>
        <div className="flex items-center gap-3 mb-3">
            <StatePill state={trust.state} />
            <span className="text-sm text-zinc-400">{trust.n_warn || 0} warn, {trust.n_fail || 0} fail · thresholds printed beside every value</span>
        </div>
        <ul className="divide-y divide-white/5">
            {trust.items.map((it) => (
                <li key={it.name} className="py-2 grid grid-cols-[auto_1fr] gap-x-3 items-start">
                    <StatePill state={it.state} />
                    <div>
                        <div className="text-sm text-zinc-200">{it.name}</div>
                        <div className="text-xs text-zinc-400 font-mono">{it.value}</div>
                        {it.threshold && <div className="text-[11px] text-zinc-600">{it.threshold}</div>}
                    </div>
                </li>
            ))}
        </ul>
    </div>
);
