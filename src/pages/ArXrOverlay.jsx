import React from 'react';
import { AlertTriangle, Layers, CheckCircle2 } from 'lucide-react';
import { ArScanningAnimation } from '../components/ArScanningAnimation';
import { SEO } from '../components/SEO';

export const ArXrOverlay = () => {


    return (
        <section className="relative min-h-screen py-32 px-6 overflow-hidden bg-black text-zinc-300 font-sans selection:bg-yellow-500/20 selection:text-yellow-200">
            <SEO
                title="AR/XR Overlay"
                description="The World’s Metadata. AR needs semantics anchored to geometry. RTSM serves queryable semantic tags tied to world coordinates."
            />
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--accent-glow,rgba(234,179,8,0.15)),_transparent_70%)] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.05),_transparent_70%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">



                <header className="mb-24 relative">
                    <div className="absolute -top-24 left-0">
                        <div className="text-2xl font-mono text-white uppercase tracking-[0.2em] animate-fade-in opacity-0">
                            AR/XR Overlay
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-16 mt-12 md:mt-24 items-center">
                        <div className="flex-1 text-center lg:text-left">
                            <h1 className="text-5xl md:text-7xl font-heading font-medium text-white tracking-tighter mb-6 animate-fade-in opacity-0 [animation-delay:0.1s] leading-[1.1]">
                                The World’s <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-white to-yellow-400">Metadata.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-4xl leading-relaxed animate-fade-in opacity-0 [animation-delay:0.2s]">
                                AR needs semantics anchored to geometry. <br className="hidden md:block" />
                                RTSM serves queryable semantic tags tied to world coordinates, keeping overlays consistent across viewpoints.
                            </p>
                        </div>

                        <div className="flex-1 w-full max-w-lg animate-fade-in opacity-0 [animation-delay:0.3s]">
                            <ArScanningAnimation />
                        </div>
                    </div>

                    {/* Refactored Content Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent animate-fade-in opacity-0 [animation-delay:0.2s]" />

                        {/* Problem Card */}
                        <div className="group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:bg-zinc-900/60 transition-all duration-500 hover:border-red-500/20 animate-fade-in opacity-0 [animation-delay:0.3s]">
                            <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                            <div className="relative z-10">
                                <div className="bg-zinc-950 w-16 h-16 rounded-2xl border border-white/5 flex items-center justify-center mb-8 shadow-2xl shadow-black/50 group-hover:scale-105 transition-transform duration-500 group-hover:border-red-500/20 group-hover:shadow-red-900/20">
                                    <AlertTriangle className="w-6 h-6 text-red-500/70 group-hover:text-red-400 transition-colors" />
                                </div>
                                <h3 className="text-lg text-white font-medium mb-3 tracking-wide">The Disconnect</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                                    Traditional AR floats in a semantic void. Without understanding geometry, overlays <span className="text-zinc-300">drift and detach</span> from the real world.
                                </p>
                            </div>
                        </div>

                        {/* Approach Card */}
                        <div className="group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:bg-zinc-900/60 transition-all duration-500 hover:border-yellow-500/20 animate-fade-in opacity-0 [animation-delay:0.4s]">
                            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                            <div className="relative z-10">
                                <div className="bg-zinc-950 w-16 h-16 rounded-2xl border border-white/5 flex items-center justify-center mb-8 shadow-2xl shadow-black/50 group-hover:scale-105 transition-transform duration-500 group-hover:border-yellow-500/20 group-hover:shadow-yellow-900/20">
                                    <Layers className="w-6 h-6 text-yellow-500/70 group-hover:text-yellow-400 transition-colors" />
                                </div>
                                <h3 className="text-lg text-white font-medium mb-3 tracking-wide">Semantic Anchoring</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                                    RTSM fuses <span className="text-yellow-200/80">queryable meaning</span> with world coordinates. We don't just track points; we lock identity to geometry.
                                </p>
                            </div>
                        </div>

                        {/* Outcome Card */}
                        <div className="group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:bg-zinc-900/60 transition-all duration-500 hover:border-emerald-500/20 animate-fade-in opacity-0 [animation-delay:0.5s]">
                            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                            <div className="relative z-10">
                                <div className="bg-zinc-950 w-16 h-16 rounded-2xl border border-white/5 flex items-center justify-center mb-8 shadow-2xl shadow-black/50 group-hover:scale-105 transition-transform duration-500 group-hover:border-emerald-500/20 group-hover:shadow-emerald-900/20">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-500/70 group-hover:text-emerald-400 transition-colors" />
                                </div>
                                <h3 className="text-lg text-white font-medium mb-3 tracking-wide">Stable Reality</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                                    Annotations that stick. Ask <span className="text-zinc-300">"what is this?"</span> and get an instant, persistent answer that stays true across time.
                                </p>
                            </div>
                        </div>
                    </div>
                </header>



            </div>
        </section>
    );
};
