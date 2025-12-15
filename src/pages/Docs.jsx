import React from 'react';
import { Terminal, Book, Code, FileText, GraduationCap, MessageSquare, Users } from 'lucide-react';
import { Button } from '../components/Button';
import { useUI } from '../contexts/UIContext';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const Docs = () => {
    const { openWip } = useUI();

    return (
        <section className="relative min-h-screen py-32 px-6 overflow-hidden bg-black text-zinc-300 font-sans selection:bg-emerald-500/20 selection:text-emerald-200">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--accent-glow,rgba(56,189,248,0.15)),_transparent_70%)] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.05),_transparent_70%)] pointer-events-none"></div>

            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.05),_transparent_70%)] pointer-events-none"></div>

            <SEO
                title="Documentation"
                description="Build with deterministic confidence. Integrate Real-Time Semantic Mapping (RTSM) into your robotics stack using Calabi's open infrastructure."
            />

            <div className="max-w-5xl mx-auto relative z-10">

                {/* Header */}
                <header className="mb-24 relative">
                    <div className="text-2xl font-mono text-white uppercase tracking-[0.2em] animate-fade-in opacity-0 mb-8">
                        Documentation
                    </div>
                    <div className="mt-12 md:mt-24">
                        <h1 className="text-5xl md:text-7xl font-heading font-medium text-white tracking-tighter mb-6 animate-fade-in opacity-0 [animation-delay:0.1s] leading-[1.1]">
                            Build with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-purple-400">Deterministic Confidence.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-4xl leading-relaxed animate-fade-in opacity-0 [animation-delay:0.2s]">
                            Integrate Real-Time Semantic Mapping into your robotics stack. <br className="hidden md:block" />
                            From rapid prototyping to production deployment.
                        </p>
                    </div>
                </header>

                {/* Documentation Section */}
                <div className="mb-32 animate-fade-in opacity-0 [animation-delay:0.3s]">
                    <div className="grid md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-4 sticky top-32">
                            <h2 className="text-3xl font-heading font-medium text-white mb-2 flex items-center gap-3">
                                <Book className="w-6 h-6 text-indigo-400" />
                                Resources
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500/50 to-transparent rounded-full mt-4"></div>
                        </div>

                        <div className="md:col-span-8 grid gap-6">
                            <DocCard
                                icon={<Terminal className="w-6 h-6 text-emerald-400" />}
                                title="Quickstart Guide"
                                desc="Run rtsm-core on a sample ROS 2 bag file in under 5 minutes. Get up and running immediately."
                                href="https://calabi-inc.github.io/rtsm/getting-started/quick-start/"
                            />
                            <DocCard
                                icon={<Code className="w-6 h-6 text-blue-400" />}
                                title="API Reference"
                                desc="Complete specification for gRPC and ZeroMQ interfaces. Deep dive into the protocols."
                                href="https://calabi-inc.github.io/rtsm/api/rest-api/"
                            />
                            <DocCard
                                icon={<GraduationCap className="w-6 h-6 text-purple-400" />}
                                title="Core Concepts"
                                desc="Understanding Working Memory, Proximity Index, and Embeddings. Learn the theory behind RTSM."
                                to="/#why-rtsm"
                            />
                            <DocCard
                                icon={<FileText className="w-6 h-6 text-pink-400" />}
                                title="Example Projects"
                                desc="Reference implementations for Python and C++. See real-world usage patterns."
                                onClick={openWip}
                            />
                        </div>
                    </div>
                </div>

                {/* Community Section */}
                <div className="animate-fade-in opacity-0 [animation-delay:0.4s]">
                    <div className="grid md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-4 sticky top-32">
                            <h2 className="text-3xl font-heading font-medium text-white mb-2 flex items-center gap-3">
                                <MessageSquare className="w-6 h-6 text-emerald-400" />
                                Community
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full mt-4"></div>
                        </div>
                        <div className="md:col-span-8">
                            <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Users className="w-24 h-24 text-emerald-500" />
                                </div>
                                <h3 className="text-xl text-white font-medium mb-4">Join the Research</h3>
                                <p className="mb-8 text-zinc-400 leading-relaxed max-w-lg">
                                    We are a research-first open source platform. We welcome your feedback, contributions, and ideas as we define the standards for semantic mapping.
                                </p>
                                <Button primary onClick={() => window.open('https://github.com/calabi-inc/rtsm', '_blank')}>
                                    Join the Community
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

const DocCard = ({ icon, title, desc, href, to, onClick }) => {
    const content = (
        <div className="flex items-start gap-6 relative z-10 h-full">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex-shrink-0 group-hover:border-white/10 transition-colors">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="text-xl text-white font-medium mb-2 group-hover:text-emerald-400 transition-colors">{title}</h3>
                <p className="text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{desc}</p>
            </div>
        </div>
    );

    const className = "block p-6 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-white/10 hover:bg-zinc-900/60 transition-all duration-300 w-full text-left group relative overflow-hidden";
    const highlight = <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>;

    if (href) {
        return (
            <a href={href} className={className} target="_blank" rel="noopener noreferrer">
                {highlight}
                {content}
            </a>
        );
    }

    if (to) {
        return (
            <Link to={to} className={className}>
                {highlight}
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={className}>
            {highlight}
            {content}
        </button>
    );
};
