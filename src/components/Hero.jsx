import React from 'react';
import { ArrowRight, Terminal, Github } from 'lucide-react';
import { Button } from './Button';
import { HeroAnimation } from './HeroAnimation';
import { RTSM_VERSION } from '../data/release';

const FACTS = [`RTSM v${RTSM_VERSION}`, 'pip install rtsm', 'Apache 2.0', '5 backends', 'MCP + REST API'];

// The engine page's hero in the product-page layout (eyebrow, left-aligned headline, the install line, the facts strip), with
// the particle scene in a framed panel beside the copy. The front page keeps the full-screen, centred scene, so the two pages
// read differently at first sight: that one is the company, this one is the open-source engine.
export const Hero = () => (
    <section className="pt-40 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.12),_transparent_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
                <div className="text-sm font-mono text-emerald-400 uppercase tracking-[0.2em] mb-6 animate-fade-in opacity-0">Engine · RTSM · open source</div>
                <h1 className="text-5xl md:text-6xl font-medium text-white tracking-tighter mb-6 leading-[1.05] animate-fade-in opacity-0 [animation-delay:0.1s]">
                    Spatial memory for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-white to-emerald-200">robots and agents.</span>
                </h1>
                <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed animate-fade-in opacity-0 [animation-delay:0.2s]">
                    RTSM turns RGB-D camera streams into a persistent, queryable 3D world state. Track objects across time. Search by natural language. Query from any agent via REST or MCP.
                </p>
                <div className="mt-8 max-w-lg animate-fade-in opacity-0 [animation-delay:0.25s]">
                    <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 font-mono text-sm text-left">
                        <div className="flex items-center gap-2 text-zinc-500 mb-2 text-xs">
                            <Terminal className="w-3.5 h-3.5" />
                            <span>Terminal</span>
                        </div>
                        <code className="text-emerald-400">pip install rtsm[gpu] && rtsm demo</code>
                    </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in opacity-0 [animation-delay:0.3s]">
                    <a href="https://calabi-inc.github.io/rtsm/getting-started/quick-start/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button primary className="w-full sm:w-auto px-8 py-3.5 text-base flex items-center justify-center gap-2">
                            Get started
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </a>
                    <a href="https://github.com/calabi-inc/rtsm" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button className="w-full px-8 py-3.5 text-base flex items-center justify-center gap-2 bg-black/60 border-white/10 hover:bg-zinc-900 text-zinc-300 hover:text-white">
                            View on GitHub
                            <Github className="w-4 h-4" />
                        </Button>
                    </a>
                </div>
                <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] md:text-xs text-zinc-500 font-mono tracking-widest uppercase border-t border-zinc-800/60 pt-6">
                    {FACTS.map((f, i) => (
                        <span key={f} className="contents">
                            {i > 0 && <span className="text-zinc-800">•</span>}
                            <span className={i === 0 ? 'text-emerald-400' : ''}>{f}</span>
                        </span>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-5 animate-fade-in opacity-0 [animation-delay:0.2s]">
                <div className="relative h-[320px] sm:h-[400px] lg:h-[520px] rounded-3xl overflow-hidden border border-white/10 bg-black">
                    <HeroAnimation />
                    <div className="absolute inset-x-0 bottom-0 px-5 py-3 text-[11px] font-mono text-zinc-500 uppercase tracking-widest bg-gradient-to-t from-black/80 to-transparent">
                        RGB-D frames in, a queryable world state out
                    </div>
                </div>
            </div>
        </div>
    </section>
);
