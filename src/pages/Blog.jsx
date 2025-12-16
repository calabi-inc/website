import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';

export const Blog = () => {
    return (
        <section className="relative min-h-screen py-32 px-6 overflow-hidden bg-black text-zinc-300 font-sans selection:bg-purple-500/20 selection:text-purple-200">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--accent-glow,rgba(168,85,247,0.15)),_transparent_70%)] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.05),_transparent_70%)] pointer-events-none"></div>

            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.05),_transparent_70%)] pointer-events-none"></div>

            <SEO
                title="Blog"
                description="Deep dives into RTSM, World Models, and the future of robotics. Read about the engineering and research behind Calabi's open infrastructure."
            />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <header className="mb-24 relative">
                    <div className="absolute -top-24 left-0">
                        <div className="text-2xl font-mono text-white uppercase tracking-[0.2em] animate-fade-in opacity-0">
                            Blog
                        </div>
                    </div>

                    <div className="mt-12 md:mt-24">
                        <h1 className="text-5xl md:text-7xl font-heading font-medium text-white tracking-tighter mb-6 animate-fade-in opacity-0 [animation-delay:0.1s] leading-[1.1]">
                            Engineering & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-purple-400">Research.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-4xl leading-relaxed animate-fade-in opacity-0 [animation-delay:0.2s]">
                            Building the memory layer for embodied AI and physical applications. <br className="hidden md:block" />
                            Deep dives into RTSM, World Models, and the future of robotics.
                        </p>
                    </div>
                </header>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in opacity-0 [animation-delay:0.3s]">
                    <BlogCard
                        slug="hippocampus-argument"
                        title="The Hippocampus Argument: Why Explicit Memory Matters in a Latent World"
                        excerpt="In the race to Embodied AGI, a dangerous orthodoxy has taken hold: “The best representation is no representation.” We disagree. Explicit memory is the key to robustness."
                        date="Dec 14, 2025"
                        tags={['RTSM', 'AGI', 'World Models']}
                        image="/assets/hippocampus_banner.png"
                        featured
                    />
                    <BlogCard
                        slug="what-is-rtsm"
                        title="What is Real-Time Spatio-Semantic Memory (RTSM)?"
                        excerpt="A queryable world state layer for embodied AI. Why SLAM isn't enough, and how we built a system that remembers 'that's a coffee mug' even when you turn the lights off."
                        date="Dec 8, 2025"
                        tags={['RTSM Core', 'Spatial AI', 'Engineering']}
                    />
                    <BlogCard
                        slug="compute-aware-selection"
                        title="Compute-Aware Selection: How RTSM Turns 30Hz Sensor Firehose into Bounded State Updates"
                        excerpt="The dangerous inefficiency of processing every frame. How we use novelty, stability, and time-decays to drop 90% of frames without losing data."
                        date="Dec 15, 2025"
                        tags={['RTSM Internals', 'Performance', 'Engineering']}
                    />
                    <BlogCard
                        slug="stability-scoring"
                        title="How Stability Scoring Separates Signal from Noise"
                        excerpt="Run FastSAM on any frame and you get noise. How RTSM uses stability scoring to separate signal from noise without any explicit noise model."
                        date="Dec 15, 2025"
                        tags={['RTSM Internals', 'Robustness', 'Algorithms']}
                    />
                    <BlogCard
                        slug="view-bins"
                        title="View Bins and Multi-Angle Evidence: Why Single-Viewpoint Detection Isn't Enough"
                        excerpt="Why seeing isn't believing. How we use epipolar geometry and view bins to filter out reflections, shadows, and SLAM ghosts."
                        date="Dec 15, 2025"
                        tags={['RTSM Internals', 'Robustness', 'Algorithms']}
                    />
                </div>
            </div>
        </section>
    );
};

const BlogCard = ({ slug, title, excerpt, date, tags, image, featured }) => (
    <Link
        to={`/blog/${slug}`}
        className={`group block relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/30 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 ${featured ? 'md:col-span-2' : ''}`}
    >
        {image ? (
            <>
                <div className="aspect-[2/1] w-full overflow-hidden relative">
                    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 flex items-center gap-1">
                        <span className="text-xs font-medium text-white">{date}</span>
                    </div>
                </div>
                <div className="p-8 relative -mt-12 z-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map(tag => (
                            <span key={tag} className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-purple-200 border border-white/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-heading font-medium text-white mb-4 group-hover:text-purple-400 transition-colors">
                        {title}
                    </h2>
                    <p className="text-zinc-400 leading-relaxed mb-6 max-w-2xl">
                        {excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-white font-medium text-sm">
                        Read Article <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                </div>
            </>
        ) : (
            <div className="p-8 h-full flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-wrap gap-2">
                            {tags.map(tag => (
                                <span key={tag} className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-purple-200 border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="text-xs text-zinc-500 font-mono">{date}</div>
                    </div>

                    <h2 className="text-xl font-heading font-medium text-white mb-4 group-hover:text-purple-400 transition-colors">
                        {title}
                    </h2>
                    <p className="text-zinc-400 leading-relaxed text-sm mb-6">
                        {excerpt}
                    </p>
                </div>

                <div className="flex items-center gap-2 text-white font-medium text-sm pt-4 border-t border-white/5">
                    Read Article <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
            </div>
        )}
    </Link>
);
