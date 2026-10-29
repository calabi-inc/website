import { fmtInt, fmtSigned, fmtVal } from './classes';
import { StatePill } from './TrustList';

const VERDICT = { PASS: 'pass', WATCH: 'warn', HOLD: 'fail', INCONCLUSIVE: 'info' };
const DIR = { better: 'text-emerald-400', worse: 'text-red-400' };

// Two runs of one recording: each metric as a delta (B minus A) with the floor beside it, and the advisory verdict.
export const DeltaTable = ({ ab }) => {
    const single = (ab.repeats?.a ?? 0) < 3 || (ab.repeats?.b ?? 0) < 3;
    return (
        <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
                <StatePill state={VERDICT[ab.verdict] || 'info'}>{ab.verdict}</StatePill>
                <span className="text-sm text-zinc-400">
                    A = <span className="font-mono text-zinc-200">{ab.a}</span>, B = <span className="font-mono text-zinc-200">{ab.b}</span> · {fmtInt(ab.frames_joined)} frames joined
                    {ab.objects && <> · objects {fmtInt(ab.objects.n_both)} in both, {fmtInt(ab.objects.n_only_a)} only A, {fmtInt(ab.objects.n_only_b)} only B</>}
                </span>
            </div>
            {single && <div className="text-xs text-amber-400/90 mb-3">One run per side: the floors are not established, so every change reads as changed.</div>}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-[11px] uppercase tracking-wider text-zinc-500 border-b border-white/5">
                            <th className="text-left py-2 pr-3 font-medium">metric</th>
                            <th className="text-right py-2 pr-3 font-medium">A</th>
                            <th className="text-right py-2 pr-3 font-medium">B</th>
                            <th className="text-right py-2 pr-3 font-medium">delta</th>
                            <th className="text-right py-2 pr-3 font-medium">floor</th>
                            <th className="text-left py-2 font-medium">reads</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ab.deltas.map((d) => (
                            <tr key={d.key} className="border-b border-white/5">
                                <td className="py-2 pr-3 text-zinc-200">{d.name}<div className="font-mono text-[10px] text-zinc-600">{d.key}</div></td>
                                <td className="py-2 pr-3 text-right font-mono text-zinc-300">{fmtVal(d.a, d.unit)}</td>
                                <td className="py-2 pr-3 text-right font-mono text-white">{fmtVal(d.b, d.unit)}</td>
                                <td className={`py-2 pr-3 text-right font-mono ${DIR[d.direction] || 'text-zinc-300'}`}>{fmtSigned(d.delta, d.unit)}</td>
                                <td className="py-2 pr-3 text-right font-mono text-zinc-500">{fmtSigned(d.floor, d.unit).replace('+', '')}</td>
                                <td className={`py-2 text-xs ${DIR[d.direction] || 'text-zinc-500'}`}>{d.verdict === 'within_floor' ? 'within the floor' : d.direction || 'changed'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {ab.caveats?.length > 0 && (
                <ul className="mt-3 space-y-1 text-[11px] text-zinc-500">
                    {ab.caveats.map((c) => <li key={c}>{c}</li>)}
                </ul>
            )}
            {ab.disclaimer && <p className="mt-3 text-[11px] text-zinc-500 italic">{ab.disclaimer}</p>}
        </div>
    );
};
