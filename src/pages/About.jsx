import { Link } from 'react-router-dom';
import { ArrowRight, Eye, BarChart3, Smartphone, Equal, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';
import { InceptionBadge } from '../components/InceptionBadge';
import { RTSM_VERSION } from '../data/release';

const CONTACT = '/connect?interest=evaluation';

const BUILD = [
    { icon: Eye, color: 'text-indigo-400', name: 'RTSM', body: 'The semantic mapping engine: a persistent, queryable 3D world state from RGB-D streams. Open source under Apache 2.0, on PyPI.', to: '/technology' },
    { icon: BarChart3, color: 'text-emerald-400', name: 'rtsm-eval', body: 'Perception evaluation on a team’s own recordings, with no labels and every number printed next to the rule that produced it.', to: '/rtsm-eval' },
    { icon: Smartphone, color: 'text-cyan-400', name: 'Calabi Lens', body: 'An iPhone capture app that records RGB-D with pose and streams it into the engine.', to: '/#calabi-lens' },
];

const FACTS = [
    ['Founded', '2025'],
    ['Engine', `rtsm ${RTSM_VERSION}, open source on PyPI since December 2025`],
    ['Evaluation', 'one-to-one engagements on your recordings; on-premises when the data cannot leave'],
    ['Program', 'NVIDIA Inception member'],
    ['Research', 'spatial memory for embodied agents, tested on a physical robot and on public RGB-D datasets'],
];

export const About = () => {
    return (
        <section className="relative min-h-screen py-32 px-6 overflow-hidden bg-black text-zinc-300 font-sans selection:bg-emerald-500/20 selection:text-emerald-200">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--accent-glow,rgba(56,189,248,0.15)),_transparent_70%)] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.05),_transparent_70%)] pointer-events-none"></div>

            <SEO
                title="About Calabi"
                description="Calabi builds the memory layer for physical AI: an open-source semantic mapping engine, a perception evaluation on your own recordings, and a capture app. A small company; every claim printed with its rule."
            />

            <div className="max-w-5xl mx-auto relative z-10">
                <header className="mb-24 relative">
                    <div className="absolute -top-24 left-0">
                        <div className="text-2xl font-mono text-white uppercase tracking-[0.2em] animate-fade-in opacity-0">Company</div>
                    </div>
                    <div className="mt-12 md:mt-24">
                        <h1 className="text-5xl md:text-7xl font-heading font-medium text-white tracking-tighter mb-6 animate-fade-in opacity-0 [animation-delay:0.1s] leading-[1.1]">
                            Calabi builds <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-white to-zinc-400">perception that remembers.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-4xl leading-relaxed animate-fade-in opacity-0 [animation-delay:0.2s]">
                            A small company making robots and agents keep a trustworthy picture of the space they work in, and giving the people who build them the numbers to prove it.
                        </p>
                    </div>
                </header>

                {/* What we build */}
                <div className="mb-28 animate-fade-in opacity-0 [animation-delay:0.3s]">
                    <h2 className="text-3xl font-heading font-medium text-white mb-8">What we build</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {BUILD.map((b) => {
                            const Icon = b.icon;
                            return (
                                <div key={b.name} className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 flex flex-col">
                                    <div className="flex items-center gap-3 mb-3"><Icon className={`w-5 h-5 ${b.color}`} /><span className="text-white font-medium">{b.name}</span></div>
                                    <p className="text-zinc-400 text-sm leading-relaxed flex-1">{b.body}</p>
                                    {b.to.startsWith('/#')
                                        ? <a href={b.to} className="mt-4 inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300">More <ArrowRight className="w-3.5 h-3.5" /></a>
                                        : <Link to={b.to} className="mt-4 inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300">More <ArrowRight className="w-3.5 h-3.5" /></Link>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* How it works */}
                <div className="mb-28 animate-fade-in opacity-0 [animation-delay:0.4s]">
                    <h2 className="text-3xl font-heading font-medium text-white mb-3">How it works</h2>
                    <p className="text-zinc-400 max-w-3xl mb-8">Two kinds of knowledge, fused into one state a program can query. The semantics are probabilistic; the geometry is metric; the state says which is which.</p>
                    <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 w-full flex-1">
                                <div className="text-emerald-400 text-xs font-mono mb-2 uppercase tracking-wider">Visual language</div>
                                <h4 className="text-white font-medium mb-2">Open-vocabulary semantics</h4>
                                <p className="text-sm text-zinc-500">What is it? Detection and embeddings from the camera stream.</p>
                            </div>
                            <div className="flex-shrink-0"><div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold border border-white/5">+</div></div>
                            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 w-full flex-1">
                                <div className="text-cyan-400 text-xs font-mono mb-2 uppercase tracking-wider">Metric state</div>
                                <h4 className="text-white font-medium mb-2">Geometry and pose</h4>
                                <p className="text-sm text-zinc-500">Where is it? Depth and the pose stream, associated over time.</p>
                            </div>
                        </div>
                        <div className="mt-8 pt-10 border-t border-white/5 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#111] p-1.5 rounded-full border border-white/10 text-white"><Equal className="w-4 h-4" /></div>
                            <p className="text-center text-lg md:text-xl font-medium tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-white to-zinc-500">A world state you can query, evaluate and build on.</span>
                            </p>
                        </div>
                    </div>
                    <p className="mt-6 text-sm text-zinc-500">
                        The architecture, the benchmarks and the layers planned above perception are on the <Link to="/technology" className="text-emerald-400 hover:text-emerald-300">technology page</Link>.
                    </p>
                </div>

                {/* How we work */}
                <div className="mb-28 animate-fade-in opacity-0 [animation-delay:0.5s]">
                    <h2 className="text-3xl font-heading font-medium text-white mb-8">How we work</h2>
                    <div className="grid md:grid-cols-12 gap-10">
                        <div className="md:col-span-7 space-y-5 text-zinc-400 leading-relaxed">
                            <p>The engine is open source so that any team can run it, read it and extend it. The evaluation is paid work, done one-to-one: you send a recording, we send back the report and walk through it with your perception lead, on your machine when the data cannot leave your site.</p>
                            <p>We say what a number cannot show. The evaluation measures consistency, not accuracy; it never scores the recall of people; it prints the rule and the noise floor beside every delta. A verdict is advisory. Missing evidence never passes.</p>
                        </div>
                        <div className="md:col-span-5">
                            <dl className="rounded-2xl bg-zinc-900/40 border border-white/5 divide-y divide-white/5">
                                {FACTS.map(([k, v]) => (
                                    <div key={k} className="px-5 py-3 grid grid-cols-3 gap-3 text-sm">
                                        <dt className="text-zinc-500">{k}</dt>
                                        <dd className="col-span-2 text-zinc-300">{v}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Close */}
                <div className="rounded-3xl bg-zinc-900/30 border border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in opacity-0 [animation-delay:0.6s]">
                    <div>
                        <div className="flex items-center gap-2 text-white font-medium mb-2"><ShieldCheck className="w-5 h-5 text-emerald-400" /> Talk to us</div>
                        <p className="text-zinc-400 text-sm max-w-xl">Send a recording for an evaluation, or join the hub if you are building on the engine.</p>
                        <div className="mt-5 flex flex-wrap gap-4">
                            <Link to={CONTACT} className="inline-flex items-center gap-2 rounded-full bg-white text-black font-medium px-6 py-3 text-sm hover:bg-zinc-200 transition-colors">Contact sales <ArrowRight className="w-4 h-4" /></Link>
                            <Link to="/connect" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-zinc-200 hover:bg-white/10 hover:border-white/30 transition-colors">Join the Hub</Link>
                        </div>
                    </div>
                    <InceptionBadge />
                </div>
            </div>
        </section>
    );
};
