import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { evalSample } from '../../data/evalSample';
import { OwnershipBar } from './OwnershipBar';
import { RangeBars } from './RangeBars';
import { QueueTable } from './QueueTable';
import { TrustList, StatePill } from './TrustList';
import { DeltaTable } from './DeltaTable';
import { LedgerSpark } from './LedgerSpark';
import { fmtInt, fmtPct } from './classes';

const TABS = [
    { id: 'single', label: 'Single recording' },
    { id: 'ab', label: 'A/B comparison' },
    { id: 'gate', label: 'Gate & ledger' },
];

// The sample report as an interactive panel: real numbers from real runs (src/data/evalSample.js), no images, no fetch.
export const EvalReportPanel = () => {
    const d = evalSample;
    const tabs = TABS.filter((t) => (t.id === 'single' ? d.single : t.id === 'ab' ? d.ab : d.gate || d.ledger));
    const [tab, setTab] = useState(tabs[0]?.id || 'single');
    const o = d.single?.ownership;

    const onKey = (e) => {
        const i = tabs.findIndex((t) => t.id === tab);
        if (e.key === 'ArrowRight') setTab(tabs[(i + 1) % tabs.length].id);
        if (e.key === 'ArrowLeft') setTab(tabs[(i - 1 + tabs.length) % tabs.length].id);
    };

    return (
        <div className="rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden">
            <div className="px-5 pt-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
                <div role="tablist" aria-label="sample report" className="flex gap-1" onKeyDown={onKey}>
                    {tabs.map((t) => (
                        <button
                            key={t.id}
                            role="tab"
                            aria-selected={tab === t.id}
                            tabIndex={tab === t.id ? 0 : -1}
                            onClick={() => setTab(t.id)}
                            className={`px-3 py-2 text-xs font-medium rounded-t-lg border-b-2 transition-colors ${tab === t.id ? 'text-white border-emerald-400' : 'text-zinc-500 border-transparent hover:text-zinc-300'}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
                <div className="text-[11px] font-mono text-zinc-500 pb-2">
                    {d.source.engine} · {d.source.platform}
                </div>
            </div>

            <div className="p-5 md:p-6">
                {tab === 'single' && d.single && (
                    <div className="space-y-8 min-w-0">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <StatePill state={d.single.trust.state}>trust {d.single.trust.state}</StatePill>
                                <span className="text-xs font-mono text-zinc-500">{d.source.recording} · {fmtInt(d.source.processed_frames)} processed frames · {d.source.span_s} s</span>
                            </div>
                            <p className="text-sm text-zinc-300 leading-relaxed">
                                Of {fmtInt(o.visible)} likely-visible sightings of confirmed objects, {fmtPct(o.reobserved_of_visible)} were re-observed; the {fmtInt(o.unexplained)} unexplained split {fmtPct(o.detector_side_share)} detector side and {fmtPct(o.association_side_share)} association side (margin {fmtPct(o.margin, 0)}): {o.verdict}. {fmtInt(o.hidden)} sightings ({fmtPct(o.hidden_share)}) were likely hidden and are banded out.
                            </p>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="space-y-8 min-w-0">
                                <section>
                                    <h4 className="text-xs uppercase tracking-wider text-zinc-500 mb-3">Who owns the loss · {fmtInt(o.views)} sightings</h4>
                                    <OwnershipBar ownership={o} />
                                </section>
                                <section>
                                    <h4 className="text-xs uppercase tracking-wider text-zinc-500 mb-3">Triage queue · loss episodes, ranked</h4>
                                    <QueueTable queue={d.single.queue} />
                                </section>
                            </div>
                            <div className="space-y-8 min-w-0">
                                <section>
                                    <h4 className="text-xs uppercase tracking-wider text-zinc-500 mb-3">Conditions · re-observed by range</h4>
                                    <RangeBars buckets={d.single.by_range} worst={d.single.worst} support={d.single.support} />
                                </section>
                                <section>
                                    <h4 className="text-xs uppercase tracking-wider text-zinc-500 mb-3">Can the recording be trusted</h4>
                                    <TrustList trust={d.single.trust} />
                                </section>
                            </div>
                        </div>
                        <section className="border-t border-white/5 pt-4">
                            <h4 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">What this report cannot see</h4>
                            <ul className="text-xs text-zinc-400 space-y-1 list-disc pl-5">
                                <li>{fmtInt(d.single.coverage.sightings)} sightings of confirmed objects rest under the numbers; {fmtPct(d.single.coverage.depth_checked_share)} had valid depth under the object's pixel, where the depth sensor gave a second opinion on the detector.</li>
                                {d.single.coverage.cannot_see.map((s) => <li key={s}>{s}</li>)}
                            </ul>
                        </section>
                    </div>
                )}
                {tab === 'ab' && d.ab && (
                    <div className="space-y-3">
                        <div className="text-xs font-mono text-zinc-500">{d.source.ab_recording}</div>
                        <DeltaTable ab={d.ab} />
                    </div>
                )}
                {tab === 'gate' && (d.gate || d.ledger) && <LedgerSpark gate={d.gate} ledger={d.ledger} />}
            </div>

            <div className="px-5 md:px-6 py-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                <a href="/eval-sample/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300">
                    Open the full sample report <ExternalLink className="w-3.5 h-3.5" />
                    <span className="text-zinc-500 text-xs">one page, about 350 KB, no images</span>
                </a>
                <span className="text-[11px] text-zinc-600">generated {d.source.generated}</span>
            </div>
        </div>
    );
};
