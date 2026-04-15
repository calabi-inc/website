import { ArrowRight, Terminal, Github, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTA = () => {
    return (
        <section className="py-32 px-6 relative overflow-hidden bg-black">
            {/* Subtle gradient at the top to blend with previous section if needed */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tighter text-white mb-6">Get Started with RTSM</h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Install the package, run the demo, and connect your agents in minutes.
                    </p>
                </div>

                {/* Terminal Block */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 font-mono backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-zinc-500 mb-3 text-xs">
                            <Terminal className="w-4 h-4" />
                            <span>Terminal</span>
                        </div>
                        <code className="text-emerald-400 text-base">pip install rtsm[gpu,viz] && rtsm demo</code>
                    </div>
                </div>

                {/* Action Links */}
                <div className="grid sm:grid-cols-3 gap-4 mb-12">
                    <Link
                        to="/docs"
                        className="flex items-center justify-center gap-2 p-4 rounded-xl bg-zinc-900/40 border border-white/10 hover:border-white/20 hover:bg-zinc-900/60 transition-all text-zinc-300 hover:text-white group"
                    >
                        <BookOpen className="w-5 h-5 text-indigo-400" />
                        <span className="font-medium">Read the Docs</span>
                    </Link>
                    <a
                        href="https://github.com/calabi-inc/rtsm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 p-4 rounded-xl bg-zinc-900/40 border border-white/10 hover:border-white/20 hover:bg-zinc-900/60 transition-all text-zinc-300 hover:text-white group"
                    >
                        <Github className="w-5 h-5 text-emerald-400" />
                        <span className="font-medium">View on GitHub</span>
                    </a>
                    <a
                        href="https://github.com/calabi-inc/rtsm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 p-4 rounded-xl bg-zinc-900/40 border border-white/10 hover:border-white/20 hover:bg-zinc-900/60 transition-all text-zinc-300 hover:text-white group"
                    >
                        <Star className="w-5 h-5 text-amber-400" />
                        <span className="font-medium">Star on GitHub</span>
                    </a>
                </div>
            </div>
        </section>
    );
};
