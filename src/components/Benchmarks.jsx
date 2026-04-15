import { Zap, Cpu, CheckCircle2 } from 'lucide-react';

const benchmarkData = [
    {
        backend: "FastSAM + YOLOE",
        configKey: "dual",
        license: "AGPL-3.0",
        meanLatency: "246 ms",
        p95Latency: "604 ms",
        objectsFound: 111,
        confirmed: 74,
        masksPerFrame: 25.7,
        vocabulary: "1200+ classes",
    },
    {
        backend: "GDINO + SAM2",
        configKey: "grounded_sam2",
        license: "Apache-2.0",
        meanLatency: "531 ms",
        p95Latency: "942 ms",
        objectsFound: 71,
        confirmed: 42,
        masksPerFrame: 11.3,
        vocabulary: "Open (text-prompted)",
    }
];

export const Benchmarks = () => {
    return (
        <section id="benchmarks" className="py-24 px-6 bg-black relative overflow-hidden scroll-mt-32">
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-heading font-medium text-white mb-4">
                        Real benchmarks
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Measured on RTX 5090 with 240-frame iPhone recording (75.8s). No cherry-picking.
                    </p>
                </div>

                {/* Hardware badge bar */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                    {[
                        { icon: <Cpu className="w-3.5 h-3.5" />, text: "RTX 5090 · 32GB VRAM" },
                        { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: "Python 3.12" },
                        { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: "SigLIP ViT-B-16" },
                    ].map((badge, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-white/10 text-zinc-400 text-xs font-mono">
                            {badge.icon}
                            {badge.text}
                        </span>
                    ))}
                </div>

                {/* Benchmark cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {benchmarkData.map((b, i) => (
                        <div key={i} className="rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden hover:border-white/10 transition-colors">
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                                <div>
                                    <h3 className="text-white font-medium">{b.backend}</h3>
                                    <span className="text-zinc-500 text-xs font-mono">{b.configKey}</span>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full border ${
                                    b.license === 'Apache-2.0'
                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                        : 'bg-zinc-700/30 border-zinc-600/30 text-zinc-400'
                                }`}>
                                    {b.license}
                                </span>
                            </div>

                            {/* Stats */}
                            <div className="p-6 grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Mean Latency</div>
                                    <div className="text-2xl font-mono text-white font-medium">{b.meanLatency}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">P95 Latency</div>
                                    <div className="text-2xl font-mono text-zinc-400">{b.p95Latency}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Objects Found</div>
                                    <div className="text-lg font-mono text-white">{b.objectsFound} <span className="text-emerald-400 text-sm">({b.confirmed} confirmed)</span></div>
                                </div>
                                <div>
                                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Masks/Frame</div>
                                    <div className="text-lg font-mono text-white">{b.masksPerFrame}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Vocabulary</div>
                                    <div className="text-sm text-zinc-300">{b.vocabulary}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-zinc-600 text-xs font-mono">
                    Report generated by scripts/benchmark_backends.py · Recording: session1 (240 frames, 75.8s)
                </p>
            </div>
        </section>
    );
};
