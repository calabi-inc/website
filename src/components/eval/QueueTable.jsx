import { useState } from 'react';
import { CLASS_BY_LABEL, fmtInt } from './classes';

// The triage queue: loss episodes of confirmed objects, ranked by unexplained frames then by the camera's closest approach.
// Click a row to see the episode's cause mix.
export const QueueTable = ({ queue }) => {
    const [open, setOpen] = useState(0);
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-[11px] uppercase tracking-wider text-zinc-500 border-b border-white/5">
                        <th className="text-left py-2 pr-3 font-medium">#</th>
                        <th className="text-left py-2 pr-3 font-medium">object</th>
                        <th className="text-left py-2 pr-3 font-medium">cause</th>
                        <th className="text-right py-2 pr-3 font-medium">unexplained</th>
                        <th className="text-right py-2 pr-3 font-medium">closest</th>
                        <th className="text-right py-2 font-medium">frame</th>
                    </tr>
                </thead>
                <tbody>
                    {queue.map((e, i) => {
                        const cls = CLASS_BY_LABEL[e.cause];
                        const isOpen = open === i;
                        return [
                            <tr key={`r${i}`} onClick={() => setOpen(isOpen ? -1 : i)} className={`cursor-pointer border-b border-white/5 ${isOpen ? 'bg-white/[0.04]' : 'hover:bg-white/[0.03]'}`}>
                                <td className="py-2 pr-3 font-mono text-zinc-500">{e.rank}</td>
                                <td className="py-2 pr-3 text-zinc-200">{e.label} <span className="font-mono text-zinc-500 text-xs">{e.cluster}</span></td>
                                <td className="py-2 pr-3"><span className="inline-block w-2 h-2 rounded-sm mr-2 align-middle" style={{ backgroundColor: cls?.color || '#71717a' }} />{e.cause}</td>
                                <td className="py-2 pr-3 text-right font-mono text-white">{fmtInt(e.unexplained)} <span className="text-zinc-500">/ {fmtInt(e.frames)}</span></td>
                                <td className="py-2 pr-3 text-right font-mono text-zinc-300">{e.closest_m != null ? `${e.closest_m} m` : '–'}</td>
                                <td className="py-2 text-right font-mono text-zinc-400">{e.frame_seq ?? '–'}</td>
                            </tr>,
                            isOpen && (
                                <tr key={`m${i}`} className="border-b border-white/5">
                                    <td colSpan={6} className="py-2 pb-3">
                                        <div className="text-[11px] text-zinc-500 mb-1">cause mix over the episode's {fmtInt(e.frames)} frames, from {e.t_start} s</div>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-300">
                                            {Object.entries(e.mix).sort((a, b) => b[1] - a[1]).map(([label, n]) => (
                                                <span key={label} className="inline-flex items-center gap-1.5">
                                                    <span className="inline-block w-2 h-2 rounded-sm" style={{ backgroundColor: CLASS_BY_LABEL[label]?.color || '#71717a' }} />
                                                    {label} <span className="font-mono text-white">{n}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ),
                        ];
                    })}
                </tbody>
            </table>
        </div>
    );
};
