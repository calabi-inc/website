import { useParams } from 'react-router-dom';
import { Calendar, ArrowLeft, ArrowRight, Clock, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

import { posts } from '../data/blogPosts.js';
import { isPublished, seriesOf } from '../data/blogIndex';

export const BlogPost = () => {
    const { slug } = useParams();

    const post = posts[slug];

    // Helper to strip HTML tags for description
    const getExcerpt = (htmlContent) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        return tempDiv.textContent.substring(0, 160) + "...";
    };

    if (!post) {
        return (
            <div className="min-h-screen pt-32 px-6 flex items-center justify-center text-white bg-black">
                Post not found. <Link to="/blog" className="text-purple-400 ml-2">Back to Blog</Link>
            </div>
        );
    }

    // A post whose date has not arrived is listed in its series with that date and is not served before it.
    if (!isPublished(post)) {
        return (
            <div className="min-h-screen pt-32 px-6 flex items-center justify-center text-white bg-black">
                This post goes live on {post.date}. <Link to="/blog" className="text-purple-400 ml-2">Back to Blog</Link>
            </div>
        );
    }

    // The series this post belongs to, if any: its parts in order, the neighbours that are already published.
    const parts = post.series ? seriesOf(post.series.name) : [];
    const index = parts.findIndex((p) => p.slug === slug);
    const prev = index > 0 ? parts.slice(0, index).reverse().find((p) => isPublished(p)) : null;
    const next = index >= 0 ? parts.slice(index + 1).find((p) => isPublished(p)) : null;

    // Default image if none provided in post content
    const ogImage = post.image;

    return (
        <div className="min-h-screen bg-[#050505] selection:bg-purple-500/20 selection:text-white font-sans">
            <SEO
                title={post.title}
                description={post.excerpt || getExcerpt(post.content)}
                image={ogImage}
                article={true}
            />
            {/* Background Decorations */}
            <div className="fixed top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--accent-glow,rgba(168,85,247,0.15)),_transparent_70%)] pointer-events-none"></div>
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.05),_transparent_70%)] pointer-events-none"></div>

            <article className="pt-32 pb-32 px-6 relative z-10">
                <div className="max-w-3xl mx-auto">
                    {/* Back Link */}
                    <div className="mb-12 animate-fade-in opacity-0">
                        <Link to="/blog" className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Blog
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="mb-12 animate-fade-in opacity-0 [animation-delay:0.1s]">
                        <div className="flex flex-wrap gap-2 mb-8">
                            {post.series && (
                                <span className="text-xs font-medium px-2 py-1 rounded-md bg-purple-500/15 text-purple-200 border border-purple-400/20">
                                    {post.series.name}, part {post.series.part} of {post.series.total}
                                </span>
                            )}
                            {post.tags.map(tag => (
                                <span key={tag} className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-purple-200 border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-white mb-8 leading-[1.1] tracking-tight">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 border-b border-white/5 pb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">
                                    C
                                </div>
                                <span className="text-zinc-300">{post.author}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </div>
                            <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    {post.image && (
                        <div className="mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/5 animate-fade-in opacity-0 [animation-delay:0.2s]">
                            <img src={post.image} alt="" className="w-full h-auto object-cover" />
                        </div>
                    )}

                    {/* Content */}
                    <div
                        className="animate-fade-in opacity-0 [animation-delay:0.3s] prose prose-invert prose-lg max-w-none
                        prose-headings:font-heading prose-headings:font-medium prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:font-light
                        prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-a:no-underline hover:prose-a:underline
                        prose-code:text-purple-200 prose-code:bg-purple-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                        prose-strong:text-white prose-strong:font-medium"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Series navigation */}
                    {post.series && parts.length > 0 && (
                        <nav className="mt-16 rounded-3xl border border-white/5 bg-zinc-900/30 p-8" aria-label={`The ${post.series.name} series`}>
                            <div className="flex items-center gap-3 mb-4">
                                <Layers className="w-5 h-5 text-purple-400" aria-hidden="true" />
                                <h2 className="text-xl font-heading font-medium text-white m-0">Series: {post.series.name}</h2>
                            </div>
                            <ol className="space-y-2 mb-6">
                                {parts.map((p) => {
                                    const on = isPublished(p);
                                    const here = p.slug === slug;
                                    return (
                                        <li key={p.slug} className="flex items-start gap-4 text-sm">
                                            <span className="font-mono text-purple-300 w-6 shrink-0 pt-0.5">{String(p.series.part).padStart(2, '0')}</span>
                                            <div className="min-w-0">
                                                {here ? (
                                                    <span className="text-purple-200 font-medium" aria-current="page">{p.title}</span>
                                                ) : on ? (
                                                    <Link to={`/blog/${p.slug}`} className="text-white hover:text-purple-300 transition-colors font-medium">{p.title}</Link>
                                                ) : (
                                                    <span className="text-zinc-500 font-medium">{p.title}</span>
                                                )}
                                                <span className="ml-3 text-xs font-mono text-zinc-500">{on ? p.date : `coming ${p.date}`}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                            <div className="flex flex-wrap justify-between gap-4 text-sm border-t border-white/5 pt-6">
                                {prev ? (
                                    <Link to={`/blog/${prev.slug}`} className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> {prev.title}
                                    </Link>
                                ) : <span />}
                                {next ? (
                                    <Link to={`/blog/${next.slug}`} className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-right">
                                        {next.title} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                ) : <span />}
                            </div>
                        </nav>
                    )}

                    {/* Footer Share/Links (Optional, just spacing for now) */}
                    <div className="mt-24 pt-8 border-t border-white/5 flex justify-between items-center text-zinc-500 text-sm">
                        <p>Thanks for reading.</p>
                        <div className="flex gap-4">
                            {/* Social share placeholders could go here */}
                        </div>
                    </div>
                </div>
            </article>

        </div>
    );
};
