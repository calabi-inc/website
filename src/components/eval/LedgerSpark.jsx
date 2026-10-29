import { fmtInt } from './classes';
import { StatePill } from './TrustList';

const Spark = ({ values, label, unit }) => {
    if (!values || values.length < 2) return null;
    const W = 240, H = 44, P = 4;
    const lo = Math.min(...values), hi = Math.max(...values);
    const span = hi - lo || 1;
    const pts = values.map((v, i) => `${P + ((W - 2 * P) * i) / (values.length - 1)},${H - P - ((H - 2 * P) * (v - lo)) / span}`).join(' ');
    return (
        <div className="flex items-center gap-3">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-60 h-11" role="img" aria-label={`${label}: ${values.join(', ')}`}>
                <polyline points={pts} fill="none" stroke="#10b981" strokeWidth="1.5" />
                {values.map((v, i) => <circle key={i} cx={P + ((W - 2 * P) * i) / (values.length - 1)} cy={H - P - ((H - 2 * P) * (v - lo)) / span} r="2.2" fill="#34d399" />)}
            </svg>
            <div className="text-xs text-zinc-400">
                <div className="text-zinc-200">{label}</div>
                <div className="font-mono">{values.map((v) => `${v}${unit}`).join(' · ')}</div>
            </div>
        </div>
    );
};

// The gate against the last accepted run, then the ledger of every gated run across sites.
export const LedgerSpark = ({ gate, ledger }) => (
    <div className="space-y-8">
        {gate && (
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <StatePill state={gate.state === 'PASS' ? 'pass' : gate.state === 'FAIL' ? 'fail' : 'info'}>{gate.state}</StatePill>
                    <span className="text-sm text-zinc-400">gate against the last accepted run{gate.baseline_recorded_at ? ` (recorded ${String(gate.baseline_recorded_at).slice(0, 10)})` : ''}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-[11px] uppercase tracking-wider text-zinc-500 border-b border-white/5">
                                <th className="text-left py-2 pr-3 font-medium">gated metric</th>
                                <th className="text-right py-2 pr-3 font-medium">green</th>
                                <th className="text-right py-2 pr-3 font-medium">now</th>
                                <th className="text-right py-2 pr-3 font-medium">delta</th>
                                <th className="text-right py-2 pr-3 font-medium">spread</th>
                                <th className="text-right py-2 pr-3 font-medium">allowance</th>
                                <th className="text-left py-2 font-medium">state</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gate.rows.map((r) => (
                                <tr key={r.name} className="border-b border-white/5">
                                    <td className="py-2 pr-3 text-zinc-200">{r.name}</td>
                                    <td className="py-2 pr-3 text-right font-mono text-zinc-300">{r.green_txt}</td>
                                    <td className="py-2 pr-3 text-right font-mono text-white">{r.now_txt}</td>
                                    <td className="py-2 pr-3 text-right font-mono text-zinc-300">{r.delta_txt}</td>
                                    <td className="py-2 pr-3 text-right font-mono text-zinc-500">{r.spread_txt}</td>
                                    <td className="py-2 pr-3 text-right font-mono text-zinc-500">{r.allowance_txt}</td>
                                    <td className="py-2"><StatePill state={r.state} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {gate.rule && <p className="mt-2 text-[11px] text-zinc-500">{gate.rule}</p>}
            </div>
        )}
        {ledger && (
            <div>
                <div className="text-sm text-zinc-400 mb-3">
                    Ledger: {fmtInt(ledger.records)} gated runs · {fmtInt(ledger.keys)} recording keys · {fmtInt(ledger.sites)} sites · {fmtInt(ledger.greens)} green · {fmtInt(ledger.outliers)} outliers
                </div>
                <div className="space-y-3">
                    <Spark values={ledger.series.values} label={`${ledger.series.site}${ledger.series.recording ? ` · ${ledger.series.recording}` : ''} · ${ledger.series.name}`} unit=" %" />
                    <Spark values={ledger.cost_series} label={`${ledger.series.site} · ${ledger.cost_name}`} unit=" ms" />
                </div>
                <p className="mt-3 text-[11px] text-zinc-500">
                    A series moves only when the engine, the configuration, the weights, the platform or the recording change, and the row says which. An outlier is a distance from the series' own median, not a verdict.
                </p>
            </div>
        )}
    </div>
);
