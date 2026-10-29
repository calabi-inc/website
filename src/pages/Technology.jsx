import { Network, Layers, Activity } from 'lucide-react';
import { Hero } from '../components/Hero';
import { InfrastructureStack } from '../components/InfrastructureStack';
import { StackAnimation } from '../components/StackAnimation';
import { DemoVideo } from '../components/DemoVideo';
import { Benchmarks } from '../components/Benchmarks';
import { CalabiLens } from '../components/CalabiLens';
import { CTA } from '../components/CTA';
import { SEO } from '../components/SEO';

// The engine page: the composition that was the front page until 2026-10-29, kept whole so the two can be swapped
// back in App.jsx. The architecture and the roadmap layers (planned, not shipped) live here, not on the front page.

const LONGER_VIEW = [
    { icon: Network, color: 'text-cyan-400', title: 'Shared perception', body: 'One world state several robots and agents read and write.' },
    { icon: Layers, color: 'text-purple-400', title: 'Portable skills', body: 'Behaviour described against the state, not against one robot.' },
    { icon: Activity, color: 'text-emerald-400', title: 'Collaborative autonomy', body: 'Fleets that coordinate on what they know, with the uncertainty explicit.' },
];

export const Technology = () => {
    return (
        <div className="bg-[#050505] min-h-screen text-zinc-300 font-sans antialiased overflow-x-hidden selection:bg-indigo-500/20 selection:text-white">
            <SEO
                title="Technology: the RTSM engine"
                description="RTSM turns RGB-D camera streams into a persistent, queryable 3D world state: the architecture, the benchmarks, the capture app, and the layers planned above the perception layer."
            />

            <Hero />
            <DemoVideo />
            <Benchmarks />
            <CalabiLens />
            <StackAnimation />
            <InfrastructureStack />

            <section id="longer-view" className="py-20 px-6 scroll-mt-32">
                <div className="max-w-5xl mx-auto">
                    <div className="text-xs font-mono text-emerald-400 uppercase tracking-[0.2em] mb-3">The longer view</div>
                    <h2 className="text-3xl font-heading font-medium text-white tracking-tight mb-3">Where the stack is going.</h2>
                    <p className="text-zinc-400 max-w-3xl mb-8">The perception layer is shipped. The layers above it are design work, named here so the direction is on record, and kept off the front page until they are real.</p>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {LONGER_VIEW.map((v) => {
                            const Icon = v.icon;
                            return (
                                <div key={v.title} className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6">
                                    <Icon className={`w-5 h-5 ${v.color} mb-3`} />
                                    <div className="text-white font-medium mb-1">{v.title}</div>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{v.body}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <CTA />
        </div>
    );
};
