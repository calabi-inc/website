import React from 'react';
import { ShieldCheck, BrainCircuit, Activity, Network, Eye, Layers, Equal } from 'lucide-react';
import { SEO } from '../components/SEO';

export const About = () => {
    return (
        <section className="relative min-h-screen py-32 px-6 overflow-hidden bg-black text-zinc-300 font-sans selection:bg-emerald-500/20 selection:text-emerald-200">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--accent-glow,rgba(56,189,248,0.15)),_transparent_70%)] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.05),_transparent_70%)] pointer-events-none"></div>

            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.05),_transparent_70%)] pointer-events-none"></div>

            <SEO
                title="About Us"
                description="We make uncertainty explicit, bounded, and testable. Calabi builds the open standard layer for shared perception, portable skills, and collaborative autonomy."
            />

            <div className="max-w-5xl mx-auto relative z-10">

                {/* Header */}
                <header className="mb-24 relative">
                    <div className="absolute -top-24 left-0">
                        <div className="text-2xl font-mono text-white uppercase tracking-[0.2em] animate-fade-in opacity-0">
                            About Calabi
                        </div>
                    </div>

                    <div className="mt-12 md:mt-24">
                        <h1 className="text-5xl md:text-7xl font-heading font-medium text-white tracking-tighter mb-6 animate-fade-in opacity-0 [animation-delay:0.1s] leading-[1.1]">
                            Certainty in a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-white to-zinc-400">Probabilistic World.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-4xl leading-relaxed animate-fade-in opacity-0 [animation-delay:0.2s]">
                            We don’t remove uncertainty — <br className="hidden md:block" />
                            we make it <span className="text-emerald-400/90 font-medium">explicit</span>, <span className="text-emerald-400/90 font-medium">bounded</span>, and <span className="text-emerald-400/90 font-medium">testable</span>.
                        </p>
                    </div>
                </header>

                {/* The Problem Section */}
                <div className="mb-32 animate-fade-in opacity-0 [animation-delay:0.3s]">
                    <div className="grid md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-4 sticky top-32">
                            <h2 className="text-3xl font-heading font-medium text-white mb-2 flex items-center gap-3">
                                <Activity className="w-6 h-6 text-red-400" />
                                The Problem
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-red-500/50 to-transparent rounded-full mt-4"></div>
                        </div>
                        <div className="md:col-span-8 space-y-8">
                            <p className="text-lg leading-relaxed">
                                Robots live in physics—not probabilities. Modern AI is powerful, but end‑to‑end models still produce uncertain outputs. In the physical world, a small error can become a collision.
                            </p>

                            <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-red-500/20 transition-all duration-500">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <ShieldCheck className="w-24 h-24 text-red-500" />
                                </div>
                                <h3 className="text-xl text-white font-medium mb-4">Black-box action is hard to verify.</h3>
                                <p className="mb-6 text-zinc-400">Without an explicit world representation, it’s difficult to:</p>
                                <ul className="space-y-3">
                                    {['write safety rules', 'audit decisions', 'recover from failure modes', 'coordinate multiple agents'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-zinc-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500/50"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Solution Section */}
                <div className="mb-32 animate-fade-in opacity-0 [animation-delay:0.4s]">
                    <div className="grid md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-4 sticky top-32">
                            <h2 className="text-3xl font-heading font-medium text-white mb-2 flex items-center gap-3">
                                <BrainCircuit className="w-6 h-6 text-emerald-400" />
                                The Solution
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full mt-4"></div>
                        </div>
                        <div className="md:col-span-8 space-y-8">
                            <p className="text-lg leading-relaxed">
                                We’re building a hybrid architecture for safe, scalable robotics. <strong className="text-white font-medium">RTSM</strong> is the anchor.
                            </p>

                            <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500">
                                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 w-full flex-1">
                                        <div className="text-emerald-400 text-xs font-mono mb-2 uppercase tracking-wider">Visual Language</div>
                                        <h4 className="text-white font-medium mb-2">Probabilistic Semantics</h4>
                                        <p className="text-sm text-zinc-500">
                                            VLM/LLM understanding of the scene <br />
                                            (What is it?)
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold shadow-lg border border-white/5">+</div>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 w-full flex-1">
                                        <div className="text-cyan-400 text-xs font-mono mb-2 uppercase tracking-wider">Metric State</div>
                                        <h4 className="text-white font-medium mb-2">Deterministic Geometry</h4>
                                        <p className="text-sm text-zinc-500">
                                            SLAM / Precise coordinates <br />
                                            (Where is it?)
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-10 border-t border-white/5 relative">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#111] p-1.5 rounded-full border border-white/10 text-white shadow-lg shadow-emerald-500/20">
                                        <Equal className="w-4 h-4" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg md:text-xl font-medium tracking-tight">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-white to-zinc-500">
                                                A world state you can query, validate, and build on.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-emerald-900/5 border border-emerald-500/10 p-8 rounded-3xl">
                                <h3 className="text-xl text-emerald-50 font-medium mb-4 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                    Safety via Fusion
                                </h3>
                                <p className="mb-6 text-zinc-400">When state is explicit, you can:</p>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {['Constrain actions with rules', 'Check geometry execution', 'Ground language in metrics'].map((item, i) => (
                                        <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 text-sm text-zinc-300">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Vision Section */}
                <div className="animate-fade-in opacity-0 [animation-delay:0.5s]">
                    <div className="grid md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-4 sticky top-32">
                            <h2 className="text-3xl font-heading font-medium text-white mb-2 flex items-center gap-3">
                                <Eye className="w-6 h-6 text-cyan-400" />
                                The Vision
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500/50 to-transparent rounded-full mt-4"></div>
                        </div>
                        <div className="md:col-span-8 space-y-8">
                            <p className="text-lg leading-relaxed">
                                We don’t claim to “solve the brain.” We solve the connection between <span className="text-white">perception</span>, <span className="text-white">reasoning</span>, and <span className="text-white">action</span>—so the community can build faster.
                            </p>

                            <div className="bg-gradient-to-b from-zinc-900/60 to-black border border-white/10 p-10 rounded-3xl text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--accent-glow),_transparent_70%)] opacity-30"></div>
                                <h3 className="text-2xl text-white font-medium mb-8 relative z-10">Calabi is building the open standard layer for:</h3>
                                <div className="grid sm:grid-cols-3 gap-6 relative z-10">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            <Network className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <span className="text-sm font-medium text-zinc-300">Shared Perception</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            <Layers className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <span className="text-sm font-medium text-zinc-300">Portable Skills</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            <Activity className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <span className="text-sm font-medium text-zinc-300">Collaborative Autonomy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
