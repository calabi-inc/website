import { useState, useEffect } from 'react';
import { Eye, Database, Code, Activity, Layers, Terminal, Cpu, Zap, Box, Play, Monitor, Network, HardDrive, Cpu as GpuIcon, BoxSelect, Brain, Scan } from 'lucide-react';
import { InteractiveVisual } from './InteractiveVisual';

export const InfrastructureStack = () => {
    const [activeLayer, setActiveLayer] = useState('perception');

    useEffect(() => {
        // Handle back/forward navigation
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#stack-detail-')) {
                const layer = hash.replace('#stack-detail-', '');
                if (['perception', 'intelligence', 'action', 'tooling'].includes(layer)) {
                    setActiveLayer(layer);
                    document.getElementById('infrastructure-stack')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        };

        // Handle initial deep link
        const initialHash = window.location.hash;
        if (initialHash.startsWith('#stack-detail-')) {
            const layer = initialHash.replace('#stack-detail-', '');
            if (['perception', 'intelligence', 'action', 'tooling'].includes(layer)) {
                setActiveLayer(layer);
                // Only scroll on initial load
                setTimeout(() => {
                    document.getElementById('infrastructure-stack')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <section id="infrastructure-stack" className="py-24 bg-black relative overflow-hidden scroll-mt-32">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-20 text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-medium text-white mb-6">
                        The Infrastructure Stack
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        A modular architecture for embodied intelligence. From raw sensor fusion to high-level reasoning.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Visual Stack Navigation (Left Column) */}
                    <div className="lg:col-span-4 sticky top-32 space-y-4">
                        <StackButton
                            id="perception"
                            active={activeLayer}
                            onClick={setActiveLayer}
                            title="Perception Layer"
                            subtitle="RTSM Core"
                            icon={<Eye className="w-5 h-5" />}
                            color="indigo"
                        />
                        <StackButton
                            id="intelligence"
                            active={activeLayer}
                            onClick={setActiveLayer}
                            title="Intelligence Layer"
                            subtitle="World Models"
                            icon={<Brain className="w-5 h-5" />}
                            color="purple"
                        />
                        <StackButton
                            id="action"
                            active={activeLayer}
                            onClick={setActiveLayer}
                            title="Action Layer"
                            subtitle="Intent Tokens"
                            icon={<Zap className="w-5 h-5" />}
                            color="emerald"
                        />
                        <StackButton
                            id="tooling"
                            active={activeLayer}
                            onClick={setActiveLayer}
                            title="Tooling"
                            subtitle="The Visualizer"
                            icon={<Scan className="w-5 h-5" />}
                            color="cyan"
                        />

                        <div className="mt-8 p-6 rounded-2xl bg-zinc-900/40 border border-white/5 text-sm text-zinc-500">
                            <p className="mb-2 font-medium text-zinc-400">Architectural Note:</p>
                            Components are loosely coupled via ZeroMQ/gRPC/ROS2, allowing partial adoption (e.g., use RTSM with your own Planner).
                        </div>
                    </div>

                    {/* Content Display (Right Column) */}
                    <div className="lg:col-span-8 min-h-[1200px]">
                        {activeLayer === 'perception' && <PerceptionContent />}
                        {activeLayer === 'tooling' && <ToolingContent />}
                        {activeLayer === 'intelligence' && <IntelligenceContent />}
                        {activeLayer === 'action' && <ActionContent />}
                    </div>
                </div>
            </div>
        </section>
    );
};

const StackButton = ({ id, active, onClick, title, subtitle, icon, color }) => {
    const isActive = active === id;

    // Color mappings for active state
    const colorStyles = {
        indigo: 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400 shadow-indigo-500/20',
        purple: 'border-purple-500/50 bg-purple-500/10 text-purple-400 shadow-purple-500/20',
        emerald: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-emerald-500/20',
        cyan: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400 shadow-cyan-500/20',
    };

    return (
        <button
            type="button"
            onClick={() => onClick(id)}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 group relative overflow-hidden
                ${isActive
                    ? `${colorStyles[color || 'indigo']} shadow-lg`
                    : 'border-white/5 bg-zinc-900/30 hover:bg-zinc-800/50 hover:border-white/10 text-zinc-400'
                }`}
        >
            <div className={`p-2 rounded-lg ${isActive ? 'bg-white/10' : 'bg-black/40 group-hover:bg-black/60'} transition-colors`}>
                {icon}
            </div>
            <div>
                <div className={`font-medium ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>{title}</div>
                <div className="text-xs opacity-70">{subtitle}</div>
            </div>
            {isActive && (
                <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-l-full bg-current opacity-50`}></div>
            )}
        </button>
    );
};

const SectionHeader = ({ title, status, role, color }) => (
    <div className="flex border-b border-white/5 pb-8 mb-8 items-start justify-between flex-wrap gap-4">
        <div>
            <h3 className="text-3xl font-heading font-medium text-white mb-2">{title}</h3>
            <div className={`inline-flex items-center text-sm font-medium px-2.5 py-1 rounded-full border bg-${color || 'indigo'}-500/10 border-${color || 'indigo'}-500/20 text-${color || 'indigo'}-400`}>
                {role}
            </div>
        </div>
        <div className="text-right">
            <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Status</div>
            <div className="text-zinc-300 font-mono text-sm">{status}</div>
        </div>
    </div>
);

const PerceptionContent = () => (
    <div className="animate-fade-in">
        <SectionHeader
            title="RTSM Perception Layer"
            role="“The Eyes + Hippocampus”"
            status="Alpha · Open Source"
            color="indigo"
        />

        <div className="space-y-12">
            {/* What it does */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white flex items-center gap-2">
                        <BoxSelect className="w-5 h-5 text-indigo-400" />
                        What it does
                    </h4>
                    <ul className="space-y-3 text-zinc-400 text-sm leading-relaxed">
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2"></span>
                            Converts raw sensor streams into a spatio‑semantic graph.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2"></span>
                            Maintains a persistent, queryable world state.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2"></span>
                            Tracks objects across time and viewpoint changes.
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-indigo-400" />
                        Key Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {["RTAB-Map / ORB-SLAM3", "CLIP Embeddings (ViT-B/32)", "FastSAM Segmentation"].map(tag => (
                            <span key={tag} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-4 text-xs text-indigo-300 mt-4">
                        <strong className="block mb-1 text-indigo-200">Near-term Upgrades:</strong>
                        YOLO-World for open-vocabulary detection & Mobile ingest (ARKit).
                    </div>
                </div>
            </div>

            {/* Why RTSM Section */}
            <div id="why-rtsm" className="scroll-mt-32 space-y-8 py-8 border-t border-dashed border-white/5 border-b border-white/5 mb-4">
                <div className="border-l-2 border-indigo-500 pl-6">
                    <h4 className="text-xl font-medium text-white mb-2">
                        Why RTSM?
                        <span className="text-zinc-500 text-base font-normal ml-3">(vs. standard SLAM or single-frame detection)</span>
                    </h4>
                    <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
                        RTSM is designed as an object‑centric memory layer: it preserves semantics and geometry over time, under compute constraints.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        {
                            title: "Compute‑aware selection",
                            desc: "Scores regions and processes only high‑value candidates, respecting edge latency budgets.",
                            icon: <Activity className="w-5 h-5 text-indigo-400" />
                        },
                        {
                            title: "Intelligent sweep policy",
                            desc: "Uses time‑since‑visit, parallax, and novelty to reduce redundant processing in static areas.",
                            icon: <Scan className="w-5 h-5 text-indigo-400" />
                        },
                        {
                            title: "Geometry‑first association",
                            desc: "Matches by 3D distance + reprojection before visual similarity to reduce ID switching.",
                            icon: <BoxSelect className="w-5 h-5 text-indigo-400" />
                        },
                        {
                            title: "Working‑memory promotion",
                            desc: "Objects start as hypotheses; only stable multi‑view confirmations become durable memory.",
                            icon: <Brain className="w-5 h-5 text-indigo-400" />
                        },
                        {
                            title: "Bounded proximity index",
                            desc: "Spatial grid with strict capacity rules for bounded‑time lookups as maps grow.",
                            icon: <Layers className="w-5 h-5 text-indigo-400" />
                        },
                        {
                            title: "Integrated vector search",
                            desc: "Attach OCR / labels / embeddings to objects; query space with natural language.",
                            icon: <Database className="w-5 h-5 text-indigo-400" />
                        }
                    ].map((feature, i) => (
                        <div key={i} className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-indigo-500/30 transition-colors group">
                            <div className="mb-3 p-2 w-fit rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                                {feature.icon}
                            </div>
                            <h5 className="text-zinc-200 font-medium text-sm mb-2">{feature.title}</h5>
                            <p className="text-zinc-500 text-xs leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Code / Schema */}
            <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden">
                <div className="flex border-b border-white/5">
                    <div className="px-4 py-2 text-xs font-mono text-zinc-500 border-r border-white/5">Example Query</div>
                    <div className="px-4 py-2 text-xs font-mono text-zinc-500">RTSM State Schema</div>
                </div>
                <div className="p-6 font-mono text-sm space-y-6">
                    <div>
                        <div className="text-zinc-500 mb-2"># Find object by semantic query</div>
                        <div className="text-indigo-300">get_object<span className="text-zinc-400">(</span>semantic="red mug"<span className="text-zinc-400">)</span> <span className="text-purple-400">→</span> <span className="text-zinc-300">{`{id, pose, confidence, last_seen, history}`}</span></div>
                    </div>
                    <div>
                        <div className="text-zinc-500 mb-2"># Core State Object (v0.1)</div>
                        <div className="text-zinc-400 text-xs leading-relaxed opacity-80">
                            object_id, pose(SE3), bbox3d, class_label?, clip_embedding, last_seen_ts, obs_count, provenance(keyframe_id)
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance & Requirements */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h4 className="text-lg font-medium text-white flex items-center gap-2">
                        <Zap className="w-5 h-5 text-indigo-400" />
                        Performance
                    </h4>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-zinc-900/30 border border-white/5">
                            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Smart Throttling</div>
                            <div className="text-zinc-300 text-sm">Intelligent keyframe gating reduces 30Hz raw streams → ~7Hz state updates.</div>
                        </div>
                        <div className="p-4 rounded-xl bg-zinc-900/30 border border-white/5">
                            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Latency Target</div>
                            <div className="text-zinc-300 text-sm">&lt;30ms end‑to‑end (RGB‑D → queryable state) on RTX‑class GPUs.</div>
                        </div>
                        <div className="p-4 rounded-xl bg-zinc-900/30 border border-white/5">
                            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Scalability</div>
                            <div className="text-zinc-300 text-sm">Decoupled ZeroMQ ingest for distributed sensing.</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h4 className="text-lg font-medium text-white flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-indigo-400" />
                        System Requirements
                    </h4>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center text-sm p-3 rounded-lg bg-zinc-900/20 border border-white/5">
                            <span className="text-zinc-400 flex items-center gap-2"><GpuIcon className="w-4 h-4" /> Hardware</span>
                            <span className="text-white text-right">RTX 30-series+ (6GB+)<br /><span className="text-zinc-500 text-xs">RealSense D435i Rec.</span></span>
                        </li>
                        <li className="flex justify-between items-center text-sm p-3 rounded-lg bg-zinc-900/20 border border-white/5">
                            <span className="text-zinc-400 flex items-center gap-2"><Code className="w-4 h-4" /> Software</span>
                            <span className="text-white">Python 3.10+, PyTorch<br /><span className="text-zinc-500 text-xs">ROS 2 (Optional)</span></span>
                        </li>
                        <li className="flex justify-between items-center text-sm p-3 rounded-lg bg-zinc-900/20 border border-white/5">
                            <span className="text-zinc-400 flex items-center gap-2"><Network className="w-4 h-4" /> Interfaces</span>
                            <span className="text-white">ZeroMQ, REST, WebSocket</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

const ToolingContent = () => (
    <div className="animate-fade-in">
        <SectionHeader
            title="The Visualizer"
            role="“The Debugger”"
            status="Live Prototype · Web-based"
            color="cyan"
        />
        <div className="space-y-8">
            <h2 className="text-2xl font-medium text-white">See the world through the machine’s eyes.</h2>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5">
                    <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-cyan-400" /> What it does
                    </h4>
                    <ul className="space-y-2 text-zinc-400 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-cyan-500 mt-2"></span>
                            Inspect live state: point clouds, object IDs, semantic labels.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-cyan-500 mt-2"></span>
                            Diagnose failure modes: drift, duplicates, occlusions.
                        </li>
                    </ul>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5">
                    <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                        <Box className="w-4 h-4 text-cyan-400" /> Roadmap
                    </h4>
                    <p className="text-zinc-400 text-sm">
                        Adding overlays for plan visualization (world‑model predictions) and execution traces (intent tokens).
                    </p>
                </div>
            </div>

            {/* Mock visualizer preview */}
            {/* Visualizer Component */}
            <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-cyan-900/10">
                <InteractiveVisual />
            </div>
        </div>
    </div>
);

const IntelligenceContent = () => (
    <div className="animate-fade-in">
        <SectionHeader
            title="World Models"
            role="“The Prediction Engine”"
            status="Research"
            color="purple"
        />
        <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/10 to-transparent border border-purple-500/10 mb-8">
            <h3 className="text-xl text-white font-medium mb-4">Goal: Imagination for Agents</h3>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Agents can “imagine” futures using a grounded state representation—then validate them against geometry and constraints.
            </p>
            <div className="flex items-center gap-4 text-sm font-mono text-purple-300 bg-purple-500/5 p-4 rounded-xl border border-purple-500/10">
                <span>Sᵗ</span>
                <span className="text-zinc-600">→</span>
                <span>Sᵗ⁺¹</span>
                <span className="text-zinc-500 ml-auto italic">Physically consistent transitions</span>
            </div>
        </div>

        <div className="space-y-4">
            <h4 className="text-white font-medium">Research Direction</h4>
            <ul className="space-y-3 text-zinc-400 text-sm">
                <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-lg bg-zinc-900 flex items-center justify-center text-xs font-bold border border-white/10">1</span>
                    Train state-space models over RTSM histories.
                </li>
                <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-lg bg-zinc-900 flex items-center justify-center text-xs font-bold border border-white/10">2</span>
                    Use geometric constraints to prune hallucinations.
                </li>
            </ul>
        </div>
    </div>
);

const ActionContent = () => (
    <div className="animate-fade-in">
        <SectionHeader
            title="Intent Tokens"
            role="“The Skill Protocol”"
            status="Research Roadmap"
            color="emerald"
        />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
                <h4 className="text-white font-medium mb-4">Concept</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    A universal vocabulary of actions that can be downloaded, composed, audited, and mapped onto different robot embodiments.
                </p>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">[P_APPROACH]</span>
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">[P_GRASP]</span>
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">[P_RETRACT]</span>
                </div>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 flex flex-col justify-center">
                <h4 className="text-white font-medium mb-2">The Goal</h4>
                <p className="text-zinc-400 text-sm">
                    Make skills portable across hardware—like software packages for motion.
                </p>
            </div>
        </div>
    </div>
);
