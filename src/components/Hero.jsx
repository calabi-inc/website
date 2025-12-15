import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { Button } from './Button';
import { HeroAnimation } from './HeroAnimation';
import { useUI } from '../contexts/UIContext';

export const Hero = () => {
    const { openWip } = useUI();

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
            <div className="container mx-auto px-6 z-10 flex flex-col items-center text-center relative pt-10">

                {/* The Grounding Line */}
                <div className="mb-10 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-sm shadow-lg">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm text-zinc-300 tracking-wide">
                        First release: <span className="text-white font-medium">RTSM</span> — an open-source spatial memory engine.
                    </span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white mb-6 leading-[1.05] drop-shadow-2xl">
                    Grounding Intelligence <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-white to-emerald-200">
                        in the Real World.
                    </span>
                </h1>

                {/* Sub-headline */}
                <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mb-10 leading-relaxed font-light drop-shadow-md">
                    We’re building open infrastructure for collaborative embodied AI. From shared perception to portable skills, Calabi provides the protocols that turn raw sensor streams into verifiable world state.
                </p>



                {/* Primary CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full sm:w-auto">
                    <a href="https://github.com/calabi-inc/rtsm" target="_blank" rel="noopener noreferrer">
                        <Button primary className="w-full sm:w-auto px-8 py-3.5 text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/20">
                            Explore RTSM (v0.1)
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </a>
                    <Button onClick={openWip} className="w-full sm:w-auto px-8 py-3.5 text-base flex items-center justify-center gap-2 bg-black/60 border-white/10 hover:bg-zinc-900 text-zinc-300 hover:text-white">
                        Read the Roadmap
                        <FileText className="w-4 h-4" />
                    </Button>
                </div>

                {/* Badges / Ticker */}
                <div className="w-full max-w-5xl border-t border-zinc-800/50 pt-8 opacity-90">
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-zinc-500 font-mono tracking-widest uppercase">
                        <span className="text-emerald-400 font-medium cursor-default">RTSM v0.1</span>
                        <span className="text-zinc-800">•</span>
                        <span className="hover:text-zinc-300 transition-colors cursor-default">Queryable World State</span>
                        <span className="text-zinc-800">•</span>
                        <span className="hover:text-zinc-300 transition-colors cursor-default">SLAM + VLM Fusion</span>
                        <span className="text-zinc-800">•</span>
                        <span className="hover:text-zinc-300 transition-colors cursor-default">Open Source</span>
                    </div>
                </div>

            </div>
        </section>
    );
};
