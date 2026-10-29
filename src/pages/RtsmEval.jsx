import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, FileText, GitCompare, Map, GitBranch, Share2, Terminal, ShieldAlert, HelpCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { EvalReportPanel } from '../components/eval/EvalReportPanel';
import { evalSample } from '../data/evalSample';

const CONTACT = '/connect?interest=evaluation';

const PROBLEMS = [
    { title: "Benchmarks score someone else's data.", body: 'mAP and tracking scores need labels. On your site there are none, so "it works" rests on watching a replay and a feeling about the week.' },
    { title: 'A complaint does not say which part failed.', body: '"It lost the pallet" can be the detector, the association, the pose, the depth, or the recording itself. The report attributes every sighting of a known object to one of those, and says when it cannot.' },
    { title: 'Regressions hide in the margin.', body: 'A model swap, a driver update or a new site moves numbers by a few points. Without a measured floor you cannot tell a change from noise; the report prints the spread over repeats beside every delta.' },
    { title: 'A screenshot is not evidence.', body: 'Reviews, customers and safety assessments ask for numbers with their rules. Every figure carries its threshold, its support and what it cannot see.' },
];

const STEPS = [
    { n: '1', title: 'Record', body: 'A few minutes of RGB-D with pose: a ROS 1 bag, rosbag2, a bare MCAP, or a Calabi Lens recording from an iPhone.' },
    { n: '2', title: 'Run', body: 'Three repeats through the engine, on your machine in a container when the data cannot leave your site, or on ours.' },
    { n: '3', title: 'Read', body: 'The report, the gate store to regress against, and the exports your tools read.' },
];

const TYPES = [
    { icon: FileText, color: 'text-emerald-400', title: 'Single-recording health report', when: 'A new site, a new sensor, a first look.', give: 'One recording.',
      get: 'The trust block (can the recording be trusted), who owns the loss, the triage queue of loss episodes with the frame to open, conditions (range, viewing angle, speed, turn rate, image quality), continuity, the playback explorer.' },
    { icon: GitCompare, color: 'text-indigo-400', title: 'A/B comparison on one recording', when: 'A model, config, platform or engine version change.', give: 'The same recording run twice.',
      get: 'Every metric as a delta with the floor on both sides, the shared-opportunity identity numbers, the objects that moved or relabelled, an advisory verdict against a declared policy (PASS / WATCH / HOLD / INCONCLUSIVE).' },
    { icon: Map, color: 'text-cyan-400', title: 'Same venue, different stack', when: 'Two recordings of one site in one world frame (an AMR’s persistent map).', give: 'Two recordings and the shared map.',
      get: 'Per-object deltas on the site map, merged-into and split-from notes, the same metric table. Refused when the frames are not shared, so nothing is aligned by guesswork.' },
    { icon: GitBranch, color: 'text-amber-400', title: 'Regression gate and fleet ledger', when: 'CI on a self-hosted GPU runner; many sites over weeks.', give: 'A store you own.',
      get: 'Four gated metrics against the last accepted run with the spread and the allowance printed, a junit file and an exit code; the ledger of every gated run across sites with trends per week and outliers.' },
    { icon: Share2, color: 'text-pink-400', title: 'Exports your tools read', when: 'When the report has to leave the page.', give: 'The same run.',
      get: 'The triage queue as Foxglove events and an MCAP sidecar; a label-next COCO dataset for FiftyOne; the detector-disagreement queue for two detectors on one recording; event windows anchored to your own events; the latency sheet for a timing run on the target; the safety-evidence sheet that opens with what it is not.' },
];

const LIMITS = [
    'Consistency, not accuracy: an object the detector never found is invisible to the report.',
    'No recall of people: the human-class row is how consistently objects the detector called a person were re-observed, never whether people were detected.',
    'A detector and the depth sensor failing the same way on the same frame would pass.',
    'Numbers are from one platform and one engine version; the provenance block names them.',
    'A policy verdict is advisory; missing evidence never passes.',
    'Nothing here says what the robot did with its perception.',
];

const FAQ = [
    { q: 'Do we have to use RTSM in production?', a: "No. The evaluation uses RTSM as the measuring instrument. Your detector's output can feed it as a recorded detections topic; the live ROS 2 source takes one too." },
    { q: 'Which formats?', a: 'ROS 1 bags, rosbag2, bare MCAP, and Calabi Lens recordings from an iPhone.' },
    { q: 'Is it a benchmark score like HOTA or mAP?', a: "No. Those score a tracker or detector against human labels on a benchmark. This scores your pipeline's consistency against itself on your own unlabelled recording. Teams that have run benchmarks ask on day one where the ground truth is; the answer is on the page: there is none, and the report says what that means." },
    { q: 'What leaves our machine?', a: 'In the on-premises route, nothing: the container runs on your hardware and the report is a self-contained HTML file. In the hosted route, the recording you send and nothing else.' },
];

const ContactButton = ({ className = '' }) => (
    <Link to={CONTACT} className={`inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium px-6 py-3 text-sm hover:bg-zinc-200 transition-colors ${className}`}>
        Contact sales <ArrowRight className="w-4 h-4" />
    </Link>
);

export const RtsmEval = () => {
    const { hash } = useLocation();
    // This page is a lazy chunk: ScrollToTop's one retry can fire before it mounts, so a deep link is honoured here as well.
    useEffect(() => {
        if (!hash) return;
        const id = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        return () => cancelAnimationFrame(id);
    }, [hash]);
    return (
        <div className="bg-[#050505] min-h-screen text-zinc-300 font-sans antialiased overflow-x-hidden selection:bg-indigo-500/20 selection:text-white">
            <SEO
                title="rtsm-eval — Perception evaluation on your recordings"
                description="rtsm-eval reports what your perception stack did on a recording your robot made: what it found, what it kept seeing, where it lost track and why. No labels needed. Numbers you can regress against."
                image="/og/og-rtsm-eval.jpg"
                keywords="perception evaluation, robot perception testing, detector regression, RGB-D recording evaluation, perception consistency, rtsm-eval"
            />

            {/* Hero */}
            <section className="pt-40 pb-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--accent-glow,rgba(56,189,248,0.15)),_transparent_70%)] pointer-events-none"></div>
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-sm font-mono text-emerald-400 uppercase tracking-[0.2em] mb-6 animate-fade-in opacity-0">Product · rtsm-eval</div>
                    <h1 className="text-5xl md:text-7xl font-heading font-medium text-white tracking-tighter mb-6 leading-[1.05] animate-fade-in opacity-0 [animation-delay:0.1s]">
                        Perception evaluation <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-white to-emerald-200">on your own recordings.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed animate-fade-in opacity-0 [animation-delay:0.2s]">
                        A report that says what your perception stack did on a recording your robot made: what it found, what it kept seeing, where it lost track, and which part of the stack lost it. No labels. Numbers with the rule that produced them printed next to them.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in opacity-0 [animation-delay:0.3s]">
                        <ContactButton />
                        <a href="#sample" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-zinc-200 hover:bg-white/10 hover:border-white/30 transition-colors">
                            See the sample report
                        </a>
                    </div>
                    <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] md:text-xs text-zinc-500 font-mono tracking-widest uppercase border-t border-zinc-800/60 pt-6">
                        <span>{evalSample.source.product}</span><span className="text-zinc-800">•</span>
                        <span>reads rtsm 0.3.1 ledgers</span><span className="text-zinc-800">•</span>
                        <span>ROS 1 bag</span><span className="text-zinc-800">•</span>
                        <span>rosbag2</span><span className="text-zinc-800">•</span>
                        <span>MCAP</span><span className="text-zinc-800">•</span>
                        <span>Calabi Lens</span>
                    </div>
                </div>
            </section>

            {/* The problem */}
            <section id="why" className="py-20 px-6 scroll-mt-32">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-heading font-medium text-white mb-10">Why evaluate perception on the floor</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {PROBLEMS.map((p) => (
                            <div key={p.title} className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 hover:border-white/10 transition-colors">
                                <h3 className="text-white font-medium mb-2">{p.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{p.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What it is */}
            <section id="what" className="py-20 px-6 scroll-mt-32 bg-black">
                <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-7">
                        <h2 className="text-3xl md:text-4xl font-heading font-medium text-white mb-6">What rtsm-eval measures</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            rtsm-eval runs your recording through RTSM, the open-source spatial memory, and uses the memory as the instrument: it stores what your detector found and re-observes it from every later frame and pose. The report is about consistency, not accuracy: how often a known object in view is re-observed, and when it is not, whether the loss sits on the detector side (nothing detected near it, or detected and then filtered) or the association side (split into a new id, merged into a neighbour), with likely-hidden sightings banded out first. It never says a label is right, never scores recall of people, and never claims what the robot did with its perception.
                        </p>
                    </div>
                    <div className="lg:col-span-5 space-y-4">
                        {STEPS.map((s) => (
                            <div key={s.n} className="flex gap-4 rounded-2xl bg-zinc-900/40 border border-white/5 p-5">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-sm shrink-0">{s.n}</div>
                                <div>
                                    <div className="text-white font-medium mb-1">{s.title}</div>
                                    <div className="text-zinc-400 text-sm leading-relaxed">{s.body}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Report types */}
            <section id="report-types" className="py-20 px-6 scroll-mt-32">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-heading font-medium text-white mb-3">One recording, one question at a time.</h2>
                    <p className="text-zinc-400 mb-10 max-w-3xl">Each report answers one question with the same engine, the same rules and the same words.</p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {TYPES.map((t) => {
                            const Icon = t.icon;
                            return (
                                <div key={t.title} className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 hover:border-white/10 transition-colors flex flex-col">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Icon className={`w-5 h-5 ${t.color}`} />
                                        <h3 className="text-white font-medium">{t.title}</h3>
                                    </div>
                                    <dl className="text-sm space-y-2 text-zinc-400">
                                        <div><dt className="inline text-zinc-500 uppercase text-[10px] tracking-wider mr-2">when</dt><dd className="inline">{t.when}</dd></div>
                                        <div><dt className="inline text-zinc-500 uppercase text-[10px] tracking-wider mr-2">you give</dt><dd className="inline">{t.give}</dd></div>
                                        <div><dt className="inline text-zinc-500 uppercase text-[10px] tracking-wider mr-2">you get</dt><dd className="inline">{t.get}</dd></div>
                                    </dl>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Sample */}
            <section id="sample" className="py-20 px-6 scroll-mt-32 bg-black">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-heading font-medium text-white mb-3">The report, on a public recording.</h2>
                    <p className="text-zinc-400 mb-8 max-w-3xl">Below is the real thing on a public RGB-D recording of an office, produced by the same code a customer receives. Hover and click; open the full page for playback.</p>
                    <EvalReportPanel />
                    <p className="mt-4 text-[11px] text-zinc-500 leading-relaxed">
                        Sample recordings: {evalSample.source.recording}; the A/B tab uses {evalSample.source.ab_recording}. Dataset: {evalSample.source.citation}. Numbers from {evalSample.source.engine} and {evalSample.source.product} on {evalSample.source.platform}; every figure is copied from the run's own records and rounded once.
                    </p>
                </div>
            </section>

            {/* Limits */}
            <section id="limits" className="py-20 px-6 scroll-mt-32">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <ShieldAlert className="w-5 h-5 text-amber-400" />
                        <h2 className="text-2xl md:text-3xl font-heading font-medium text-white">What it does not claim</h2>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-x-10 gap-y-3 text-sm text-zinc-400">
                        {LIMITS.map((l) => <li key={l} className="flex gap-3"><span className="text-zinc-600 mt-[2px]">—</span><span>{l}</span></li>)}
                    </ul>
                </div>
            </section>

            {/* Engagement */}
            <section id="engagement" className="py-20 px-6 scroll-mt-32 bg-black">
                <div className="max-w-5xl mx-auto rounded-3xl bg-zinc-900/30 border border-white/5 p-8 md:p-12 grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8">
                        <h2 className="text-2xl md:text-3xl font-heading font-medium text-white mb-4">How an engagement runs</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Engagements are one-to-one. You send a recording and tell us what the robot is supposed to see; we send back the report and walk through it with your perception lead. If the data cannot leave your site, the container recipe runs it on your machine. There is no price list: scope depends on the recordings and the questions.
                        </p>
                    </div>
                    <div className="lg:col-span-4 flex lg:justify-end"><ContactButton /></div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-20 px-6 scroll-mt-32">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <HelpCircle className="w-5 h-5 text-indigo-400" />
                        <h2 className="text-2xl md:text-3xl font-heading font-medium text-white">Questions teams ask first</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {FAQ.map((f) => (
                            <div key={f.q} className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6">
                                <h3 className="text-white font-medium mb-2">{f.q}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{f.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 bg-black">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tighter text-white mb-6">Send us a recording.</h2>
                    <ContactButton className="px-8 py-3.5 text-base" />
                    <p className="mt-8 text-xs text-zinc-500 font-mono inline-flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5" /> Open-source engine:
                        <a href="https://calabi-inc.github.io/rtsm/getting-started/quick-start/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">pip install rtsm</a>
                    </p>
                </div>
            </section>
        </div>
    );
};
