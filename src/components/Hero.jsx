import React from 'react';
import { ArrowRight, Terminal, Github } from 'lucide-react';
import { Button } from './Button';
import { HeroAnimation } from './HeroAnimation';

export const Hero = () => {

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black">

            {/* --- Hero Animation Background --- */}
            {/* Ensure it is deep black, no overlays other than fading edges */}
            <div className="absolute inset-0 z-0">
                <HeroAnimation />
                {/* Fade edges to pure black at top/bottom for section transition */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none" />
            </div>

            {/* --- Main Content --- */}
            <div className="container mx-auto px-6 z-10 flex flex-col items-center text-center relative pt-32 md:pt-10">

                {/* The Grounding Line */}
                <div className="mb-10 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-sm shadow-lg">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm text-zinc-300 tracking-wide">
                        <span className="text-white font-medium">RTSM</span> is live on PyPI — <span className="text-emerald-400 font-medium">try it now</span>
                    </span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white mb-6 leading-[1.05] drop-shadow-2xl">
                    Spatial Memory for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-white to-emerald-200">
                        Robots and Agents.
                    </span>
                </h1>

                {/* Sub-headline */}
                <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mb-8 leading-relaxed font-light drop-shadow-md">
                    RTSM turns RGB-D camera streams into a persistent, queryable 3D world state. Track objects across time. Search by natural language. Query from any agent via REST or MCP.
                </p>

                {/* Pip Install Block */}
                <div className="mb-10 w-full max-w-lg">
                    <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 font-mono text-sm text-left backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-zinc-500 mb-2 text-xs">
                            <Terminal className="w-3.5 h-3.5" />
                            <span>Terminal</span>
                        </div>
                        <code className="text-emerald-400">pip install rtsm[gpu] && rtsm demo</code>
                    </div>
                </div>

                {/* Primary CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full sm:w-auto">
                    <a href="https://calabi-inc.github.io/rtsm/getting-started/quick-start/" target="_blank" rel="noopener noreferrer">
                        <Button primary className="w-full sm:w-auto px-8 py-3.5 text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/20">
                            Get Started
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

                {/* Badges / Ticker */}
                <div className="w-full max-w-5xl border-t border-zinc-800/50 pt-8 opacity-90">
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-zinc-500 font-mono tracking-widest uppercase">
                        <span className="text-emerald-400 font-medium cursor-default">RTSM v0.1</span>
                        <span className="text-zinc-800">•</span>
                        <span className="hover:text-zinc-300 transition-colors cursor-default">pip install rtsm</span>
                        <span className="text-zinc-800">•</span>
                        <span className="hover:text-zinc-300 transition-colors cursor-default">Apache 2.0</span>
                        <span className="text-zinc-800">•</span>
                        <span className="hover:text-zinc-300 transition-colors cursor-default">5 Backends</span>
                        <span className="text-zinc-800">•</span>
                        <span className="hover:text-zinc-300 transition-colors cursor-default">MCP + REST API</span>
                    </div>
                </div>

            </div>
        </section>
    );
};
