import { Link } from 'react-router-dom';
import { ArrowRight, Microscope, Code2 } from 'lucide-react';

export const CTA = () => {
    return (
        <section className="py-32 px-6 relative overflow-hidden bg-black">
            {/* Subtle gradient at the top to blend with previous section if needed */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tighter text-white mb-6">Build the future with us.</h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Join the developer program or research network to extend RTSM, publish reproducible benchmarks, and build grounded applications on top of a queryable world state.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {/* Evaluator Program */}
                    <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                                <Microscope className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl text-white font-medium">Evaluator Program</h3>
                        </div>
                        <p className="text-zinc-400 leading-relaxed text-sm">
                            Run RTSM on your sensor stack (lab, sim, or real space) and help define the benchmark suite.
                        </p>
                    </div>

                    {/* Developer Program */}
                    <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                                <Code2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl text-white font-medium">Developer Program</h3>
                        </div>
                        <p className="text-zinc-400 leading-relaxed text-sm">
                            Contribute modules, integrations, and reference apps known as "Agents" (YOLO‑World, ARKit ingest, simulator exports).
                        </p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Link to="/connect" className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-zinc-200 transition-all">
                        Join the Network
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

            </div>
        </section>
    );
};
