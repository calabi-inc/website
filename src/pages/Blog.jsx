import { useMemo, useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { isPublished, publishedPosts, seriesOf } from '../data/blogIndex';

const SERIES = 'Pose health';

// The listing is built from src/data/blogPosts.js: every published post, newest first. Company and technical posts lead:
// a series occupies one card in the grid (its latest published part) and the rest of its parts live in a collapsed
// series block under the grid, with the dates of the ones still to come. The tag bar filters the grid; with a tag active
// every matching post is shown, series parts included.
export const Blog = () => {
    const posts = useMemo(() => publishedPosts(), []);
    const series = useMemo(() => seriesOf(SERIES), []);
    const tags = useMemo(() => [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) => a.localeCompare(b)), [posts]);
    const [tag, setTag] = useState(null);

    const latestPart = {};
    for (const p of posts) {
        if (p.series && !latestPart[p.series.name]) latestPart[p.series.name] = p.slug;
    }
    const inGrid = posts.filter((p) => !p.series || latestPart[p.series.name] === p.slug);
    const shown = tag ? posts.filter((p) => p.tags.includes(tag)) : inGrid;
    const featured = !tag ? (shown.find((p) => !p.series && p.image) || {}).slug : null;

    return (
        <section className="relative min-h-screen py-32 px-6 overflow-hidden bg-black text-zinc-300 font-sans selection:bg-purple-500/20 selection:text-purple-200">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--accent-glow,rgba(168,85,247,0.15)),_transparent_70%)] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.05),_transparent_70%)] pointer-events-none"></div>

            <SEO
                title="Research and writing"
                description="Deep dives into RTSM, World Models, and the future of robotics. Read about the engineering and research behind Calabi's open infrastructure."
            />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <header className="mb-20 relative">
                    <div className="absolute -top-24 left-0">
                        <div className="text-2xl font-mono text-white uppercase tracking-[0.2em] animate-fade-in opacity-0">
                            Research
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

                {/* Tag bar */}
                <div className="flex flex-wrap items-center gap-2 mb-8 animate-fade-in opacity-0 [animation-delay:0.3s]" role="group" aria-label="Filter posts by tag">
                    <TagChip label="All" active={tag === null} onClick={() => setTag(null)} />
                    {tags.map((t) => <TagChip key={t} label={t} active={tag === t} onClick={() => setTag(tag === t ? null : t)} />)}
                    <span className="ml-auto text-xs font-mono text-zinc-500">{shown.length} {shown.length === 1 ? 'post' : 'posts'}</span>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in opacity-0 [animation-delay:0.3s]">
                    {shown.map((p) => (
                        <BlogCard key={p.slug} slug={p.slug} title={p.title} excerpt={p.excerpt} date={p.date} tags={p.tags} image={p.image} series={p.series} featured={p.slug === featured} />
                    ))}
                </div>

                {series.length > 0 && <SeriesBlock name={SERIES} parts={series} />}
            </div>
        </section>
    );
};

const TagChip = ({ label, active, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${active ? 'bg-purple-500/20 border-purple-400/40 text-purple-100' : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:border-white/10'}`}
    >
        {label}
    </button>
);

// Collapsed by default: one line with the series' name, how many parts are out and when the next one comes, and the
// control to expand it. Expanded: the intro and every part in order, the published ones linked.
const SeriesBlock = ({ name, parts }) => {
    const [open, setOpen] = useState(false);
    const live = parts.filter((p) => isPublished(p));
    const next = parts.find((p) => !isPublished(p));
    const summary = `${live.length} of ${parts.length} parts published` + (next ? `, next on ${next.date}` : '');
    return (
        <section className="mt-16 rounded-2xl border border-white/5 bg-zinc-900/20 animate-fade-in opacity-0 [animation-delay:0.35s]" aria-labelledby="series-title">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-6 py-4">
                <div className="flex items-center gap-3 min-w-0">
                    <Layers className="w-4 h-4 text-purple-400 shrink-0" aria-hidden="true" />
                    <h2 id="series-title" className="text-base font-heading font-medium text-white m-0">Series: {name}</h2>
                </div>
                <span className="text-xs font-mono text-zinc-500">{summary}</span>
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    aria-expanded={open}
                    aria-controls="series-parts"
                    className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-white/5 bg-white/5 text-zinc-300 hover:text-white hover:border-white/10 transition-colors"
                >
                    {open ? 'Collapse' : 'Expand'}
                    {open ? <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" /> : <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />}
                </button>
            </div>
            {open && (
                <div id="series-parts" className="px-6 pb-6 border-t border-white/5 pt-5">
                    <p className="text-sm text-zinc-400 leading-relaxed mb-5 max-w-3xl">
                        What a map can honestly say about the poses it was built from, what it cannot, and how to check: seven posts that began with an outside critique of our own sample report, one every second Tuesday.
                    </p>
                    <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                        {parts.map((p) => {
                            const on = isPublished(p);
                            return (
                                <li key={p.slug} className="flex items-start gap-4 text-sm">
                                    <span className="font-mono text-purple-300 w-6 shrink-0 pt-0.5">{String(p.series.part).padStart(2, '0')}</span>
                                    <div className="min-w-0">
                                        {on ? (
                                            <Link to={`/blog/${p.slug}`} className="text-white hover:text-purple-300 transition-colors font-medium">{p.title}</Link>
                                        ) : (
                                            <span className="text-zinc-500 font-medium">{p.title}</span>
                                        )}
                                        <div className="text-xs font-mono text-zinc-500 mt-0.5">{on ? p.date : `coming ${p.date}`}</div>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            )}
        </section>
    );
};

const BlogCard = ({ slug, title, excerpt, date, tags, image, series, featured }) => (
    <Link
        to={`/blog/${slug}`}
        className={`group block relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/30 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 ${featured ? 'md:col-span-2' : ''}`}
    >
        {image && featured ? (
            <>
                <div className="aspect-[2/1] w-full overflow-hidden relative">
                    <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
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
                    <div className="flex justify-between items-start gap-4 mb-6">
                        <div className="flex flex-wrap gap-2">
                            {series && <span className="text-xs font-medium px-2 py-1 rounded-md bg-purple-500/15 text-purple-200 border border-purple-400/20">Series: {series.name}, part {series.part}</span>}
                            {tags.map(tag => (
                                <span key={tag} className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-purple-200 border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="text-xs text-zinc-500 font-mono whitespace-nowrap">{date}</div>
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
