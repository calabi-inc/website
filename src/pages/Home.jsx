import { Link } from 'react-router-dom';
import { ArrowRight, Eye, BarChart3, Smartphone, Box, LayoutDashboard, Layers, Glasses, FileText, Building2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { HeroAnimation } from '../components/HeroAnimation';
import { DemoVideo } from '../components/DemoVideo';
import { Benchmarks } from '../components/Benchmarks';
import { CalabiLens } from '../components/CalabiLens';
import { EvalReportPanel } from '../components/eval/EvalReportPanel';
import { InceptionBadge } from '../components/InceptionBadge';
import { posts } from '../data/blogPosts';
import { RTSM_VERSION } from '../data/release';

// The company-oriented front page (2026-10-29). The engine-oriented page it replaced lives on at /technology;
// to swap back, point "/" at Technology and "/technology" at this page in App.jsx.

const CONTACT = '/connect?interest=evaluation';

const FACTS = [
    'Open source, Apache 2.0',
    `rtsm ${RTSM_VERSION} on PyPI`,
    'NVIDIA Inception member',
    'Evaluated on public RGB-D datasets',
    'Tested on Jetson Orin Nano',
];

const PROBLEMS = [
    { title: 'Every frame, then nothing.', body: 'A detector answers "what is in this image". A robot needs "where is the thing I saw a minute ago, and is it still there". Without memory every frame starts from zero, and the fleet never learns the site.' },
    { title: 'Failures nobody can see.', body: 'On a real site there are no labels, so a perception stack is judged by replays and complaints. Which part failed, the detector, the association or the sensor, stays a guess.' },
    { title: 'Benchmarks that do not transfer.', body: 'A score on a public dataset says little about your warehouse at three metres in low light. The numbers that matter are measured on your own recordings, with the rule that produced each one printed beside it.' },
];

const PRODUCTS = [
    { icon: Eye, color: 'text-indigo-400', name: 'RTSM', kind: 'Semantic mapping engine', to: '/technology', cta: 'How it works',
      body: 'Turns RGB-D streams into a persistent, queryable 3D world state: objects with identity, position and history, open-vocabulary labels, served over REST and MCP. Open source, on PyPI.' },
    { icon: BarChart3, color: 'text-emerald-400', name: 'rtsm-eval', kind: 'Perception evaluation', to: '/rtsm-eval', cta: 'See the sample report',
      body: 'A report on what your perception stack did on a recording your robot made: what it found, what it kept seeing, where it lost track and which part lost it. No labels. Numbers you can regress against.' },
    { icon: Smartphone, color: 'text-cyan-400', name: 'Calabi Lens', kind: 'Capture', to: '/#calabi-lens', cta: 'About Lens',
      body: 'An iPhone app that records RGB-D with pose and streams it into the engine, so a space can be captured and evaluated before a robot is on it.' },
];

const INDUSTRIES = [
    { icon: Box, color: 'text-blue-400', title: 'Retail and warehouse', body: 'Persistent inventory: an object keeps its identity across time and viewpoints.', to: '/retail-warehouse' },
    { icon: LayoutDashboard, color: 'text-orange-400', title: 'Agentic workflows', body: 'A shared world state that language agents query, plan on and act in.', to: '/agentic-workflow' },
    { icon: Layers, color: 'text-pink-400', title: 'Real-to-sim', body: 'Scan a space into a semantic state graph a simulator can load.', to: '/real-to-sim' },
    { icon: Glasses, color: 'text-yellow-400', title: 'AR and XR', body: 'Semantic tags anchored to world coordinates, served to an overlay.', to: '/ar-xr-overlay' },
];

const latestPosts = Object.entries(posts)
    .map(([slug, p]) => ({ slug, ...p }))
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, 3);

const SectionHead = ({ eyebrow, title, lead }) => (
    <div className="max-w-3xl mb-10">
        {eyebrow && <div className="text-xs font-mono text-emerald-400 uppercase tracking-[0.2em] mb-3">{eyebrow}</div>}
        <h2 className="text-3xl md:text-4xl font-heading font-medium text-white tracking-tight mb-3">{title}</h2>
        {lead && <p className="text-zinc-400 leading-relaxed">{lead}</p>}
    </div>
);

const ContactButton = ({ className = '' }) => (
    <Link to={CONTACT} className={`inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium px-6 py-3 text-sm hover:bg-zinc-200 transition-colors ${className}`}>
        Contact sales <ArrowRight className="w-4 h-4" />
    </Link>
);

export const Home = () => {
    return (
        <div className="bg-[#050505] min-h-screen text-zinc-300 font-sans antialiased overflow-x-hidden selection:bg-indigo-500/20 selection:text-white">
            <SEO
                title="Perception that remembers, for physical AI"
                description="Calabi builds the perception pipeline and semantic map that give robots and agents a persistent, queryable picture of a space, and the evaluation that tells a team what their perception actually did on site."
                keywords="physical AI, robot perception, semantic mapping, spatial memory, perception evaluation, RTSM, rtsm-eval"
            />

            {/* Hero */}
            <section className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <HeroAnimation />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none" />
                </div>
                <div className="container mx-auto px-6 z-10 flex flex-col items-center text-center relative pt-32 md:pt-24">
                    <div className="text-sm font-mono text-emerald-400 uppercase tracking-[0.2em] mb-8 animate-fade-in opacity-0">Physical AI · perception and memory</div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white mb-6 leading-[1.05] drop-shadow-2xl animate-fade-in opacity-0 [animation-delay:0.1s]">
                        Perception that remembers, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-white to-emerald-200">for physical AI.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mb-10 leading-relaxed font-light drop-shadow-md animate-fade-in opacity-0 [animation-delay:0.2s]">
                        Calabi builds the perception pipeline and the semantic map that give robots and agents a persistent, queryable picture of a space, and the evaluation that tells a team what their perception actually did on site.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto animate-fade-in opacity-0 [animation-delay:0.3s]">
                        <ContactButton className="w-full sm:w-auto px-8 py-3.5 text-base" />
                        <Link to="/technology" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/60 px-8 py-3.5 text-base text-zinc-200 hover:bg-zinc-900 hover:border-white/30 transition-colors">
                            See the engine
                        </Link>
                    </div>
                    <div className="w-full max-w-5xl border-t border-zinc-800/50 pt-8 opacity-90">
                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-zinc-500 font-mono tracking-widest uppercase">
                            {FACTS.map((f, i) => (
                                <span key={f} className="contents">
                                    {i > 0 && <span className="text-zinc-800">•</span>}
                                    <span className={i === 0 ? 'text-emerald-400' : ''}>{f}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* The problem */}
            <section id="why" className="py-24 px-6 scroll-mt-32">
                <div className="max-w-6xl mx-auto">
                    <SectionHead eyebrow="The problem" title="Robots see every frame and remember none of it." lead="Physical AI is judged on the floor, not on a leaderboard. Three things go wrong before a team can even argue about models." />
                    <div className="grid md:grid-cols-3 gap-6">
                        {PROBLEMS.map((p) => (
                            <div key={p.title} className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 hover:border-white/10 transition-colors">
                                <h3 className="text-white font-medium mb-2">{p.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{p.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products */}
            <section id="products" className="py-24 px-6 scroll-mt-32 bg-black">
                <div className="max-w-6xl mx-auto">
                    <SectionHead eyebrow="What we build" title="A map that remembers, and the numbers to trust it." lead="One engine, one evaluation, one way to capture a space. Each stands alone; together they close the loop from recording to a number you can act on." />
                    <div className="grid md:grid-cols-3 gap-6">
                        {PRODUCTS.map((p) => {
                            const Icon = p.icon;
                            return (
                                <div key={p.name} className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 flex flex-col hover:border-white/10 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Icon className={`w-5 h-5 ${p.color}`} />
                                        <div>
                                            <div className="text-white font-medium leading-tight">{p.name}</div>
                                            <div className="text-[11px] uppercase tracking-wider text-zinc-500">{p.kind}</div>
                                        </div>
                                    </div>
                                    <p className="text-zinc-400 text-sm leading-relaxed flex-1">{p.body}</p>
                                    {p.to.startsWith('/#') ? (
                                        <a href={p.to} className="mt-5 inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300">{p.cta} <ArrowRight className="w-3.5 h-3.5" /></a>
                                    ) : (
                                        <Link to={p.to} className="mt-5 inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300">{p.cta} <ArrowRight className="w-3.5 h-3.5" /></Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Evidence */}
            <DemoVideo />
            <Benchmarks />

            <section id="sample" className="py-24 px-6 scroll-mt-32 bg-black">
                <div className="max-w-6xl mx-auto">
                    <SectionHead eyebrow="Evidence" title="The evaluation, on a public recording." lead="The real report, produced by the same code a customer receives, on a public RGB-D recording of an office. Hover and click; the full page opens in a new tab." />
                    <EvalReportPanel />
                    <div className="mt-6">
                        <Link to="/rtsm-eval" className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300">What rtsm-eval measures, and what it does not claim <ArrowRight className="w-3.5 h-3.5" /></Link>
                    </div>
                </div>
            </section>

            <CalabiLens />

            {/* Where it runs */}
            <section id="industries" className="py-24 px-6 scroll-mt-32">
                <div className="max-w-6xl mx-auto">
                    <SectionHead eyebrow="Where it runs" title="The same world state, four jobs." />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {INDUSTRIES.map((s) => {
                            const Icon = s.icon;
                            return (
                                <Link key={s.title} to={s.to} className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 hover:border-white/10 hover:bg-zinc-900/60 transition-colors group">
                                    <Icon className={`w-5 h-5 ${s.color} mb-3`} />
                                    <div className="text-white font-medium mb-1 group-hover:text-emerald-200 transition-colors">{s.title}</div>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{s.body}</p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Research and writing */}
            <section id="research" className="py-24 px-6 scroll-mt-32 bg-black">
                <div className="max-w-6xl mx-auto">
                    <SectionHead eyebrow="Research and writing" title="How we think about memory, selection and evaluation." lead="Our methods are written down and run on real robots and public recordings. The engineering notes are the public part." />
                    <div className="grid md:grid-cols-3 gap-6">
                        {latestPosts.map((p) => (
                            <Link key={p.slug} to={`/blog/${p.slug}`} className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 hover:border-white/10 hover:bg-zinc-900/60 transition-colors flex flex-col">
                                <FileText className="w-5 h-5 text-purple-400 mb-3" />
                                <div className="text-white font-medium leading-snug mb-2 flex-1">{p.title}</div>
                                <div className="text-[11px] font-mono text-zinc-500">{p.date} · {p.readTime}</div>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-6">
                        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300">All writing <ArrowRight className="w-3.5 h-3.5" /></Link>
                    </div>
                </div>
            </section>

            {/* Company */}
            <section id="company" className="py-24 px-6 scroll-mt-32">
                <div className="max-w-6xl mx-auto rounded-3xl bg-zinc-900/30 border border-white/5 p-8 md:p-12 grid lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Building2 className="w-5 h-5 text-zinc-400" />
                            <h2 className="text-2xl md:text-3xl font-heading font-medium text-white">Calabi</h2>
                        </div>
                        <p className="text-zinc-400 leading-relaxed mb-6">
                            A small company building the memory layer for physical AI. The engine is open source so that any team can run it; the evaluation is a one-to-one engagement on your own recordings; everything we claim is printed with the rule that produced it.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <ContactButton />
                            <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-zinc-200 hover:bg-white/10 hover:border-white/30 transition-colors">About the company</Link>
                        </div>
                    </div>
                    <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
                        <InceptionBadge />
                        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Member of the NVIDIA Inception program</span>
                    </div>
                </div>
            </section>
        </div>
    );
};
