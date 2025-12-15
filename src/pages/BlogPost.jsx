
import { useParams } from 'react-router-dom';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import hippocampusBanner from '../assets/hippocampus_banner.png';
import { SEO } from '../components/SEO';

export const BlogPost = () => {
    const { slug } = useParams();

    // Mapping slugs to content.
    const posts = {
        'what-is-rtsm': {
            title: "What is Real-Time Spatio-Semantic Memory (RTSM)?",
            date: "Dec 8, 2025",
            author: "Calabi Research",
            readTime: "5 min read",
            tags: ['RTSM Core', 'Spatial AI', 'Engineering'],
            content: `
                <p class="lead text-xl text-white mb-8 leading-relaxed font-light">
                    <strong class="block text-purple-400 mb-4 font-medium">A queryable world state layer for embodied AI.</strong>
                    SLAM answers “where am I?” and object detection answers “what is that?” But embodied AI needs something else:
                    “Where did I last see that thing, what state was it in, and do I still trust that belief?”
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    That missing piece is what RTSM (Real-Time Spatio-Semantic Memory) is designed to provide.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The amnesia problem
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Most robots live in constant rediscovery. Every frame is treated like a fresh world: boxes are drawn, labels are assigned, and then the moment an object leaves view, it effectively disappears from the robot’s usable knowledge.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Humans don’t work like that. If you leave the kitchen, you still remember the mug is on the counter. Robots need that kind of persistence—not as a vague latent belief, but as explicit state that downstream systems can query.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    RTSM aims to be that layer: a persistent, queryable world state built from continuous perception.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Beyond point clouds
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Dense maps and point clouds are great for navigation and collision avoidance. But they’re poor substrates for reasoning.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    A point cloud doesn’t know it contains a chair. It only encodes geometry. Reasoning systems—whether classical planners or LLM agents—need objects, identities, and state over time.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    RTSM adds a semantic layer on top of geometry by attaching open-vocabulary embeddings (e.g., VLM/CLIP) to 3D object hypotheses, turning raw sensor streams into a map of things, not just points.
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 font-mono text-sm text-purple-200">
                    <div class="mb-2">find("red toolbox")</div>
                    <div class="mb-2">get_object(id="SD#1253")</div>
                    <div>where_was("pallet", last_seen < 10min)</div>
                </div>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    How RTSM works (high level)
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    In our current prototype, RTSM is built by combining:
                </p>
                <ul class="list-none pl-0 mb-6 text-zinc-400 space-y-4">
                    <li class="flex items-start gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                        <span>SLAM backends (RTAB-Map / ORB-SLAM3) for metric pose + geometry</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span>Segmentation (FastSAM) to propose object regions</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span>Embeddings (CLIP ViT-B/32) to index semantics and enable retrieval</span>
                    </li>
                </ul>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Then RTSM maintains an object-centric state store with:
                </p>
                <ul class="list-none pl-0 mb-6 text-zinc-400 space-y-4">
                    <li class="flex items-start gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                        <span>Object identity</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span>Pose (SE3)</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span>Observation count / last seen timestamp</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span>Semantic embedding + provenance</span>
                    </li>
                </ul>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The real-time challenge: building the index without blowing the GPU
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Open-vocabulary inference is expensive. If you embed every pixel of every frame, you’ll collapse under compute.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    So RTSM uses compute-aware selection: it tries to spend heavy compute only when it changes the world state meaningfully.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Instead of “process everything,” it prioritizes:
                </p>
                <ul class="list-none pl-0 mb-6 text-zinc-400 space-y-4">
                    <li class="flex items-start gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                        <span>Visual novelty (new regions / appearance changes)</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span>Geometric stability (enough parallax / confidence to place it in 3D)</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span>Temporal value (e.g., time-since-visit, state uncertainty)</span>
                    </li>
                </ul>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The goal is simple: turn continuous sensor firehose into a bounded-rate stream of state updates—so the memory is usable on edge hardware.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                     <span class="w-8 h-px bg-purple-500/50"></span>
                    What RTSM is (and isn’t)
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong>RTSM is:</strong> a state + memory layer that makes perception persistent and queryable.<br/>
                    <strong>RTSM is not:</strong> a full autonomy stack or a replacement for planning/control.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Think of RTSM as the shared source of truth between perception and downstream intelligence.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                     <span class="w-8 h-px bg-purple-500/50"></span>
                    What’s next
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    We’re extending the pipeline with:
                </p>
                <ul class="list-none pl-0 mb-6 text-zinc-400 space-y-4">
                    <li class="flex items-start gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                        <span>YOLO-World for open-vocabulary detection (complementing segmentation)</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span>Mobile ingest: RTAB-Map with ARKit odometry (iPhone), so RTSM can be built from lightweight capture workflows</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span>A reproducible benchmark suite (latency, persistence accuracy, ID stability)</span>
                    </li>
                </ul>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                     <span class="w-8 h-px bg-purple-500/50"></span>
                    Get involved
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    If you’re building embodied agents or world models and you need a grounded state layer:
                </p>
                <ul class="list-none pl-0 mb-6 text-zinc-400 space-y-4">
                    <li class="flex items-start gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                        <span>Join the evaluator/developer program</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span>Run RTSM on your sensor stack (lab/sim/real space)</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span>Help define what “persistent world state” should mean in practice</span>
                    </li>
                </ul>
            `
        },
        'compute-aware-selection': {
            title: "Compute-Aware Selection: How RTSM Turns 30Hz Sensor Firehose into Bounded State Updates",
            date: "Dec 15, 2025",
            author: "Calabi Research",
            readTime: "7 min read",
            tags: ['RTSM Internals', 'Performance', 'Engineering'],
            content: `
                <p class="lead text-xl text-white mb-8 leading-relaxed font-light">
                    <strong class="block text-purple-400 mb-4 font-medium">The Problem: Drowning in Data</strong>
                    A modern RGB-D camera streams 30 frames per second. Each frame could trigger expensive neural network inference — FastSAM for segmentation (~12ms), CLIP for embeddings (~15ms per batch). 
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Running the full perception pipeline on every frame would consume 100% of GPU time and still fall behind. But here's the insight: most consecutive frames are redundant. A camera pointed at the same scene from the same angle produces nearly identical observations. 
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The expensive part isn't seeing — it's knowing <em>when</em> to look. RTSM's IngestGate and SweepPolicy implement a compute-aware selection system that achieves real-time performance by processing only the frames that matter.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The Three Signals
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    RTSM decides whether to process a frame based on three complementary signals:
                </p>

                <h3 class="text-2xl font-heading font-medium text-white mt-12 mb-6">1. Novelty: Has Something Changed?</h3>
                
                <h4 class="text-xl font-medium text-white mt-8 mb-4">Parallax Detection</h4>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The primary novelty signal is sideways camera motion. Moving forward toward an object changes little about what you see. Moving sideways reveals new surfaces, occlusions, and geometry.
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># sweep_policy.py:103-112
def baseline_perp(self, last_pos, cam_pos, fwd_unit):
    """Sideways motion magnitude relative to forward direction."""
    f = normalize(fwd_unit)
    delta = cam_pos - last_pos
    proj = delta @ f  # forward component
    perp = delta - proj * f  # perpendicular component
    return norm(perp)</code></pre>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The threshold is depth-aware: distant objects need more camera motion to reveal new information:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 font-mono text-sm text-purple-200">
                    <div class="mb-2">effective_threshold = max(min_baseline_m, k_depth * Z)</div>
                    <div class="text-zinc-500"># At 2m depth: max(0.08, 0.005*2) = 0.08m (8cm sideways motion)</div>
                </div>

                <h4 class="text-xl font-medium text-white mt-8 mb-4">Look-Cell Novelty</h4>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The secondary signal tracks where the camera center-ray hits. Each (spatial_cell, view_bin) pair maintains an LRU cache of the last 8 "look-cells" — the spatial cells targeted by the frame's center pixel.
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># sweep_policy.py:168-171
look_is_new = False
if look_cell is not None:
    look_is_new = not sweep_cache.look_cell_recent(cell, vbin, look_cell)</code></pre>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    If the camera is now looking at a spatial cell it hasn't recently examined from this viewpoint, that's novelty worth processing.
                </p>

                <h3 class="text-2xl font-heading font-medium text-white mt-12 mb-6">2. Stability: Is the World Consistent?</h3>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Objects earn stability through consistent re-observation. Each match updates stability based on three factors:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># working_memory.py:401-407
cos_n = (cos_sim - 0.5) / 0.5          # appearance similarity [0,1]
dist_n = 1.0 - dist_m / gate           # spatial proximity [0,1]  
quality_n = depth_quality              # depth validity [0,1]

gain = 0.6 * cos_n + 0.3 * dist_n + 0.1 * quality_n

# Logistic growth toward 1.0
stability = stability + k * gain * (1.0 - stability)</code></pre>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The weighting (60% appearance, 30% proximity, 10% depth quality) prioritizes visual consistency — an object that looks the same across frames is stable, even if depth is noisy.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong>Decay on Missing Observations</strong><br/>
                    Objects not seen in a frame decay exponentially:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># working_memory.py:445
decay = miss_decay ** (dt_s * 30.0)  # per-frame at 30fps
for obj in objects:
    obj.stability *= decay</code></pre>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    With <code>miss_decay=0.5</code>, an object loses half its stability after 1 second of non-observation. This naturally garbage-collects transient detections without explicit deletion logic.
                </p>

                <h3 class="text-2xl font-heading font-medium text-white mt-12 mb-6">3. Time-Since-Visit: The Backstop</h3>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Even with no novelty, regions eventually need re-checking. The sweep policy tracks when each (cell, view_bin) was last processed:
                </p>
                 <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># sweep_cache.py:113-119
def cell_view_age(self, cell, vbin, now):
    key = (cell, vbin)
    t = self.swept_view_ts.get(key)
    if t is None:
        return float("inf")  # Never seen → infinite age
    return now - t</code></pre>
                </div>
                <div class="overflow-x-auto mb-8">
                    <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-4 border-b border-white/10 font-medium">Parameter</th>
                                <th class="p-4 border-b border-white/10 font-medium">Default</th>
                                <th class="p-4 border-b border-white/10 font-medium">Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-white/5">
                                <td class="p-4 font-mono text-purple-300">ttl_s</td>
                                <td class="p-4">4.0s</td>
                                <td class="p-4">Soft cadence — process if also novel</td>
                            </tr>
                             <tr>
                                <td class="p-4 font-mono text-purple-300">hard_max_s</td>
                                <td class="p-4">20.0s</td>
                                <td class="p-4">Hard backstop — process regardless</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The Decision Cascade
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The IngestGate orchestrates these signals into a multi-stage filter:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-center font-mono text-sm leading-loose text-zinc-300">
                    <div>30Hz Input</div>
                    <div>↓</div>
                    <div class="border border-white/20 inline-block px-4 py-2 rounded mb-2">Keyframe?</div> <span class="text-purple-400">──Yes──→ ACCEPT (always)</span>
                    <div>↓ No</div>
                    <div class="border border-white/20 inline-block px-4 py-2 rounded mb-2">Within grace window?<br/><span class="text-xs text-zinc-500">(non_kf_grace_s=0.03)</span></div> <span class="text-zinc-500">──Yes──→ SKIP</span>
                     <div>↓ No</div>
                    <div class="border border-white/20 inline-block px-4 py-2 rounded mb-2">Near recent keyframe?<br/><span class="text-xs text-zinc-500">(dup_window_ns)</span></div> <span class="text-zinc-500">──Yes──→ SKIP</span>
                     <div>↓ No</div>
                    <div class="border border-white/20 inline-block px-4 py-2 rounded text-left">
                        <div>SweepPolicy.decide()</div>
                        <div>• age >= hard_max? <span class="text-purple-400">──Yes──→ ACCEPT</span></div>
                        <div>• parallax >= thresh? <span class="text-purple-400">──Yes──→ ACCEPT</span></div>
                        <div>• age >= ttl + novel? <span class="text-purple-400">──Yes──→ ACCEPT</span></div>
                        <div>• otherwise <span class="text-zinc-500">──────→ SKIP</span></div>
                    </div>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The decision is returned with a reason tag for debugging and telemetry:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300">@dataclass
class SweepDecision:
    do_sweep: bool
    reason: str           # "parallax", "ttl+novelty", "hard_max_s", "skip"
    age_s: float
    baseline_perp_m: float
    min_required_baseline_m: float
    look_is_new: bool</code></pre>
                </div>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    What Gets Processed vs Skipped
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Here's a concrete example. A user walks through a room at ~0.5 m/s while looking around:
                </p>
                 <div class="overflow-x-auto mb-8">
                    <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-3 border-b border-white/10 font-medium">Time</th>
                                <th class="p-3 border-b border-white/10 font-medium">Frame</th>
                                <th class="p-3 border-b border-white/10 font-medium">Parallax</th>
                                <th class="p-3 border-b border-white/10 font-medium">Look-Cell</th>
                                <th class="p-3 border-b border-white/10 font-medium">Age</th>
                                <th class="p-3 border-b border-white/10 font-medium">Decision</th>
                            </tr>
                        </thead>
                        <tbody class="font-mono text-xs">
                            <tr class="border-b border-white/5 bg-purple-500/10">
                                <td class="p-3">0ms</td>
                                <td class="p-3">KF</td>
                                <td class="p-3">—</td>
                                <td class="p-3">—</td>
                                <td class="p-3">0s</td>
                                <td class="p-3 text-purple-300">ACCEPT</td>
                            </tr>
                            <tr class="border-b border-white/5">
                                <td class="p-3">33ms</td>
                                <td class="p-3">Non-KF</td>
                                <td class="p-3">0.02m</td>
                                <td class="p-3">same</td>
                                <td class="p-3">0.03s</td>
                                <td class="p-3 text-zinc-600">SKIP</td>
                            </tr>
                            <tr class="border-b border-white/5">
                                <td class="p-3">66ms</td>
                                <td class="p-3">Non-KF</td>
                                <td class="p-3">0.02m</td>
                                <td class="p-3">same</td>
                                <td class="p-3">0.07s</td>
                                <td class="p-3 text-zinc-600">SKIP</td>
                            </tr>
                            <tr class="border-b border-white/5">
                                <td class="p-3">133ms</td>
                                <td class="p-3">Non-KF</td>
                                <td class="p-3">0.09m</td>
                                <td class="p-3">same</td>
                                <td class="p-3">0.13s</td>
                                <td class="p-3 text-purple-300">ACCEPT (parallax)</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">166ms</td>
                                <td class="p-3">Non-KF</td>
                                <td class="p-3">0.02m</td>
                                <td class="p-3 text-purple-300">new</td>
                                <td class="p-3">0.03s</td>
                                <td class="p-3 text-purple-300">ACCEPT (look_new)</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">200ms</td>
                                <td class="p-3">Non-KF</td>
                                <td class="p-3">0.02m</td>
                                <td class="p-3">same</td>
                                <td class="p-3">0.03s</td>
                                <td class="p-3 text-zinc-600">SKIP</td>
                            </tr>
                            <tr>
                                <td class="p-3">4000ms</td>
                                <td class="p-3">Non-KF</td>
                                <td class="p-3">0.01m</td>
                                <td class="p-3">same</td>
                                <td class="p-3">4.0s</td>
                                <td class="p-3 text-purple-300">ACCEPT (ttl)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Result: From 120 frames in 4 seconds, only ~8-12 trigger full pipeline processing. That's a 10-15× reduction in compute while capturing all meaningful scene changes.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The Spatial Bookkeeping
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The <code>SweepCache</code> maintains per-<code>(cell, vbin)</code> state efficiently:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300">class SweepCache:
    swept_view_ts: Dict[Tuple[Cell, VBin], float]      # last sweep timestamp
    last_cam_pos: Dict[Tuple[Cell, VBin], np.ndarray]  # for parallax calc
    recent_look_cells: Dict[Tuple[Cell, VBin], Deque[Cell]]  # LRU of 8</code></pre>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The grid discretization is coarse enough to be memory-efficient (25cm cells, 12 yaw bins × 5 pitch bins = 60 view bins per cell) while fine enough to track meaningful viewpoint changes. After each accepted sweep, bookkeeping updates the cache:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300">def record_after_sweep(self, sweep_cache, *, cell, vbin, cam_pos, look_cell):
    sweep_cache.mark_cell_view_swept(cell, vbin)  # reset age
    sweep_cache.set_last_cam_pos(cell, vbin, cam_pos)  # for next parallax
    if look_cell:
        sweep_cache.remember_look_cell(cell, vbin, look_cell)  # LRU update</code></pre>
                </div>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Tuning the Knobs
                </h2>
                <div class="overflow-x-auto mb-8">
                    <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-3 border-b border-white/10 font-medium">Parameter</th>
                                <th class="p-3 border-b border-white/10 font-medium">Default</th>
                                <th class="p-3 border-b border-white/10 font-medium">Effect of Increase</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-white/5">
                                <td class="p-3 font-mono text-purple-300">ttl_s</td>
                                <td class="p-3">4.0s</td>
                                <td class="p-3">Less frequent forced re-sweeps</td>
                            </tr>
                            <tr class="border-b border-white/5">
                                <td class="p-3 font-mono text-purple-300">hard_max_s</td>
                                <td class="p-3">20.0s</td>
                                <td class="p-3">Longer maximum staleness allowed</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3 font-mono text-purple-300">min_baseline_m</td>
                                <td class="p-3">0.08m</td>
                                <td class="p-3">Requires more camera motion</td>
                            </tr>
                            <tr class="border-b border-white/5">
                                <td class="p-3 font-mono text-purple-300">k_depth</td>
                                <td class="p-3">0.005</td>
                                <td class="p-3">Depth-scales parallax threshold more aggressively</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    For static cameras (surveillance, fixed robots): increase <code>ttl_s</code> and <code>hard_max_s</code>, rely on look-cell novelty. For fast-moving robots: decrease <code>min_baseline_m</code> to catch rapid viewpoint changes. For compute-constrained devices: increase <code>ttl_s</code> and <code>min_baseline_m</code> to reduce processing rate.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The Payoff
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    This compute-aware selection achieves:
                </p>
                 <ul class="list-none pl-0 mb-6 text-zinc-400 space-y-4">
                    <li class="flex items-start gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                        <span><strong class="text-white">Bounded CPU/GPU usage</strong> — Processing 3-8 frames/second instead of 30</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span><strong class="text-white">No information loss</strong> — Novelty-triggered processing catches all meaningful changes</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span><strong class="text-white">Graceful degradation</strong> — Time-based backstops ensure eventual coverage</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span><strong class="text-white">Tunable tradeoffs</strong> — Parameters adapt to hardware and application needs</span>
                    </li>
                </ul>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The key insight: not all frames are created equal. By tracking what we've seen, from where, and how recently, RTSM focuses expensive computation where it matters — turning a 30Hz firehose into a bounded stream of meaningful state updates.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-sm italic border-t border-white/10 pt-4 mt-8">
                    This post is part of a series on RTSM internals. Next: <a href="/blog/stability-scoring" class="text-purple-400 hover:text-purple-300">How Stability Scoring Separates Signal from Noise.</a>
                </p>
            `
        },
        'stability-scoring': {
            title: "How Stability Scoring Separates Signal from Noise",
            date: "Dec 15, 2025",
            author: "Calabi Research",
            readTime: "8 min read",
            tags: ['RTSM Internals', 'Robustness', 'Algorithms'],
            content: `
                 <p class="lead text-xl text-white mb-8 leading-relaxed font-light">
                    <strong class="block text-purple-400 mb-4 font-medium">The Problem: Everything Looks Like an Object</strong>
                    Run FastSAM on any RGB frame and you'll get dozens of masks. Some are real objects — mugs, chairs, backpacks. Others are noise: specular reflections, segmentation artifacts, SLAM reconstruction ghosts, shadows that confuse the model. 
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    A single frame can't tell them apart. But time can. RTSM's stability scoring system exploits a simple truth: real objects persist. They appear frame after frame, from different angles, with consistent visual features. Noise flickers, drifts, and vanishes. By tracking evidence accumulation over time, RTSM separates the signal from the noise without any explicit noise model.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The Lifecycle of an Object
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Every detected mask begins life as a <strong>proto-object</strong> — a tentative hypothesis that something real exists at that location. Proto-objects must earn their way into confirmed status:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-center font-mono text-sm leading-loose text-zinc-300">
                    <div>Observation → Proto-Object → Confirmed → Long-Term Memory</div>
                    <div class="text-zinc-500">↓</div>
                     <div class="text-zinc-500">[expires if not re-observed]</div>
                    <div class="text-zinc-500">↓</div>
                    <div class="text-red-400">DELETED</div>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The gate between proto and confirmed is <strong>stability</strong> — a scalar confidence score in <code>[0, 1]</code> that accumulates through consistent re-observation and decays rapidly when evidence stops arriving.
                </p>

                <h3 class="text-2xl font-heading font-medium text-white mt-12 mb-6">Starting Skeptical</h3>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    New proto-objects begin with <code>stability = 0.25</code>:
                </p>
                 <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># working_memory.py
o = ObjectState(
    stability=0.25,    # Deliberately low — must prove itself
    hits=1,            # One observation so far
    confirmed=False,   # Proto status
    ...
)</code></pre>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    This isn't arbitrary. At 0.25, an object needs multiple high-quality matches to reach the promotion threshold of 0.55. A single lucky detection can't shortcut its way into confirmed status.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Earning Stability: The Gain Formula
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    When a new observation matches an existing object, stability increases. But not all matches are equal. The gain depends on three factors:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># working_memory.py
cos_n = (cos_sim - 0.5) / 0.5      # Appearance similarity [0,1]
dist_n = 1.0 - dist_m / gate       # Spatial proximity [0,1]
quality_n = depth_quality          # Depth validity [0,1]

gain = 0.6 * cos_n + 0.3 * dist_n + 0.1 * quality_n</code></pre>
                </div>
                 <div class="overflow-x-auto mb-8">
                    <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-3 border-b border-white/10 font-medium">Factor</th>
                                <th class="p-3 border-b border-white/10 font-medium">Weight</th>
                                <th class="p-3 border-b border-white/10 font-medium">What it measures</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-white/5">
                                <td class="p-3 font-medium text-purple-300">Cosine similarity</td>
                                <td class="p-3">60%</td>
                                <td class="p-3">Does it look like the same object?</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3 font-medium text-purple-300">Distance</td>
                                <td class="p-3">30%</td>
                                <td class="p-3">Is it where we expected?</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3 font-medium text-purple-300">Depth quality</td>
                                <td class="p-3">10%</td>
                                <td class="p-3">Can we trust the 3D position?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                   Appearance dominates because CLIP embeddings are the strongest signal. An object that looks the same across frames is probably the same object, even if depth is noisy. The stability update uses logistic growth — fast gains early, diminishing returns near 1.0:
                </p>
                 <div class="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 font-mono text-sm text-purple-200">
                    new_stability = stability + k * gain * (1 - stability)
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    With <code>k = 0.45</code>, here's how stability accumulates for high-quality matches:
                </p>
                <div class="overflow-x-auto mb-8">
                    <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-3 border-b border-white/10 font-medium">Match #</th>
                                <th class="p-3 border-b border-white/10 font-medium">Stability Before</th>
                                <th class="p-3 border-b border-white/10 font-medium">Gain</th>
                                <th class="p-3 border-b border-white/10 font-medium">Stability After</th>
                            </tr>
                        </thead>
                        <tbody class="font-mono text-xs">
                             <tr class="border-b border-white/5">
                                <td class="p-3">1 (creation)</td>
                                <td class="p-3">—</td>
                                <td class="p-3">—</td>
                                <td class="p-3 text-purple-300">0.25</td>
                            </tr>
                            <tr class="border-b border-white/5">
                                <td class="p-3">2</td>
                                <td class="p-3">0.25</td>
                                <td class="p-3">0.73</td>
                                <td class="p-3 text-purple-300">0.50</td>
                            </tr>
                            <tr class="border-b border-white/5">
                                <td class="p-3">3</td>
                                <td class="p-3">0.50</td>
                                <td class="p-3">0.65</td>
                                <td class="p-3 text-purple-300">0.65</td>
                            </tr>
                            <tr class="border-b border-white/5">
                                <td class="p-3">4</td>
                                <td class="p-3">0.65</td>
                                <td class="p-3">0.60</td>
                                <td class="p-3 text-purple-300">0.74</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Three good matches and you're past the promotion threshold. That's about 100ms at 30Hz — fast enough for real-time, slow enough to filter noise.
                </p>


                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Losing Stability: Exponential Decay
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Here's where the system gets aggressive. Every frame where an object isn't observed, it loses stability:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># working_memory.py
decay = miss_decay ** (dt_s * 30.0)  # 0.5 per frame at 30fps
for obj in objects:
    obj.stability *= decay</code></pre>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    With <code>miss_decay = 0.5</code>, stability halves every frame. The collapse is brutal:
                </p>
                 <div class="overflow-x-auto mb-8">
                    <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-3 border-b border-white/10 font-medium">Frames Missed</th>
                                <th class="p-3 border-b border-white/10 font-medium">Time (at 30fps)</th>
                                <th class="p-3 border-b border-white/10 font-medium">Stability</th>
                            </tr>
                        </thead>
                         <tbody class="font-mono text-xs">
                             <tr class="border-b border-white/5">
                                <td class="p-3">0</td>
                                <td class="p-3">0ms</td>
                                <td class="p-3 text-purple-300">0.70</td>
                            </tr>
                            <tr class="border-b border-white/5">
                                <td class="p-3">1</td>
                                <td class="p-3">33ms</td>
                                <td class="p-3 text-purple-300">0.35</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">2</td>
                                <td class="p-3">67ms</td>
                                <td class="p-3 text-purple-300">0.18</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">3</td>
                                <td class="p-3">100ms</td>
                                <td class="p-3 text-purple-300">0.09</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">4</td>
                                <td class="p-3">133ms</td>
                                <td class="p-3 text-purple-300">0.04</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">5</td>
                                <td class="p-3">167ms</td>
                                <td class="p-3 text-purple-300">0.02</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Five frames — 167 milliseconds — and a healthy object is near zero. This seems harsh, but it's intentional. RTSM assumes frame-to-frame consistency. If something was there and now it's not, either:
                </p>
                 <ul class="list-none pl-0 mb-6 text-zinc-400 space-y-4">
                    <li class="flex items-start gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                        <span>It moved (the observation will match at a new location)</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span>It's occluded (temporary — stability will recover when visible again)</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span>It was never real (good riddance)</span>
                    </li>
                </ul>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Real objects survive because they keep getting re-observed. Noise doesn't.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The Promotion Gate
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Proto-objects become confirmed when they pass three checks:
                </p>
                 <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># working_memory.py
if (hits >= 2 and 
    stability >= 0.55 and 
    len(view_bins) >= 1):
    confirmed = True</code></pre>
                </div>
                 <div class="overflow-x-auto mb-8">
                    <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-3 border-b border-white/10 font-medium">Criterion</th>
                                <th class="p-3 border-b border-white/10 font-medium">Default</th>
                                <th class="p-3 border-b border-white/10 font-medium">Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
                             <tr class="border-b border-white/5">
                                <td class="p-3 font-mono text-purple-300">hits >= 2</td>
                                <td class="p-3">2</td>
                                <td class="p-3">Seen more than once</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3 font-mono text-purple-300">stability >= 0.55</td>
                                <td class="p-3">0.55</td>
                                <td class="p-3">Accumulated enough evidence</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3 font-mono text-purple-300">view_bins >= 1</td>
                                <td class="p-3">1</td>
                                <td class="p-3">Observed from at least one viewing angle</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The view bins requirement deserves explanation. RTSM discretizes viewing directions into 60 bins (12 azimuth × 5 elevation). Each observation records which bin it came from. Requiring multiple view bins ensures the object has been seen from different angles — not just the same viewpoint repeated. For stationary cameras, <code>require_view_bins = 1</code> allows single-angle confirmation. For mobile robots, you might increase this to require true multi-view triangulation.
                </p>

                <h3 class="text-2xl font-heading font-medium text-white mt-12 mb-6">Proto Expiry: The Final Filter</h3>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Even if a proto-object never reaches promotion, it doesn't live forever. After 10 seconds without observation, it's garbage collected:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># working_memory.py
true_deadline = o.last_seen_mono + proto_ttl_s  # 10 seconds
if true_deadline <= now:
    del self._map[oid]  # Gone</code></pre>
                </div>
                 <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Each match resets the deadline. So a flickering artifact that appears every 5 seconds will keep getting new 10-second leases — but it will never accumulate enough stability to promote, and eventually the flickering stops.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Putting It Together: Two Scenarios
                </h2>
                
                <h4 class="text-xl font-medium text-white mt-8 mb-4">Scenario 1: Segmentation Artifact</h4>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">A SLAM reconstruction ghost appears in the corner of the frame.</p>
                <div class="overflow-x-auto mb-8">
                     <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-3 border-b border-white/10 font-medium">Frame</th>
                                <th class="p-3 border-b border-white/10 font-medium">Event</th>
                                <th class="p-3 border-b border-white/10 font-medium">Stability</th>
                                <th class="p-3 border-b border-white/10 font-medium">Outcome</th>
                            </tr>
                        </thead>
                         <tbody class="font-mono text-xs">
                             <tr class="border-b border-white/5">
                                <td class="p-3">0</td>
                                <td class="p-3">Detected, proto created</td>
                                <td class="p-3 text-purple-300">0.25</td>
                                <td class="p-3">—</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">1</td>
                                <td class="p-3">Not observed</td>
                                <td class="p-3 text-purple-300">0.125</td>
                                <td class="p-3 text-zinc-500">Decay</td>
                            </tr>
                            <tr class="border-b border-white/5">
                                <td class="p-3">2</td>
                                <td class="p-3">Not observed</td>
                                <td class="p-3 text-purple-300">0.063</td>
                                <td class="p-3 text-zinc-500">Decay</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">3</td>
                                <td class="p-3">Not observed</td>
                                <td class="p-3 text-purple-300">0.031</td>
                                <td class="p-3 text-zinc-500">Decay</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">...</td>
                                <td class="p-3">Continues flickering</td>
                                <td class="p-3 text-purple-300">~0</td>
                                <td class="p-3 text-zinc-500">Never promotes</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">300</td>
                                <td class="p-3">10s elapsed</td>
                                <td class="p-3">—</td>
                                <td class="p-3 text-red-400">Deleted</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h4 class="text-xl font-medium text-white mt-8 mb-4">Scenario 2: Real Object (Coffee Mug)</h4>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">A mug is placed on a table in view of the camera.</p>
                <div class="overflow-x-auto mb-8">
                     <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-3 border-b border-white/10 font-medium">Frame</th>
                                <th class="p-3 border-b border-white/10 font-medium">Event</th>
                                <th class="p-3 border-b border-white/10 font-medium">Stability</th>
                                <th class="p-3 border-b border-white/10 font-medium">Hits</th>
                                <th class="p-3 border-b border-white/10 font-medium">View Bins</th>
                            </tr>
                        </thead>
                         <tbody class="font-mono text-xs">
                             <tr class="border-b border-white/5">
                                <td class="p-3">0</td>
                                <td class="p-3">Detected, proto created</td>
                                <td class="p-3 text-purple-300">0.25</td>
                                <td class="p-3">1</td>
                                <td class="p-3">{0}</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">1</td>
                                <td class="p-3">Matched (cos=0.94, dist=3cm)</td>
                                <td class="p-3 text-purple-300">0.50</td>
                                <td class="p-3">2</td>
                                <td class="p-3">{0, 2}</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">2</td>
                                <td class="p-3">Matched (cos=0.92, dist=5cm)</td>
                                <td class="p-3 text-purple-300">0.65</td>
                                <td class="p-3">3</td>
                                <td class="p-3">{0, 2}</td>
                            </tr>
                             <tr class="border-b border-white/5 bg-purple-500/10">
                                <td class="p-3">2</td>
                                <td class="p-3 text-purple-200 font-bold">Promoted</td>
                                <td class="p-3 text-purple-200">0.65</td>
                                <td class="p-3 text-purple-200">3</td>
                                <td class="p-3 text-purple-200">{0, 2}</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">3-30</td>
                                <td class="p-3">Continuous observation</td>
                                <td class="p-3 text-purple-300">→ 0.95</td>
                                <td class="p-3">30</td>
                                <td class="p-3">{0, 2, 4, 6}</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">60</td>
                                <td class="p-3">Upserted to LTM</td>
                                <td class="p-3 text-purple-300">0.97</td>
                                <td class="p-3">60</td>
                                <td class="p-3">4 bins</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The Association Gate
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Stability only increases when observations successfully match existing objects. The matching itself is heavily gated:
                </p>
                 <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># association.py - simplified
for candidate in observations:
    nearby = index.nearby_ids(candidate.position, rings=1)
    
    for oid in nearby:
        # Gate 1: 3D distance
        if distance(candidate, object) > 0.5m:
            continue
            
        # Gate 2: Reprojection error
        if pixel_error(candidate, object) > 60px:
            continue
            
        # Gate 3: Embedding similarity
        if cosine(candidate.embedding, object.embedding) < 0.90:
            continue
            
        # Passed all gates → update stability
        match(candidate, object)</code></pre>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The <code>0.90</code> cosine threshold is strict. Random masks won't accidentally match real objects. This prevents stability from being "poisoned" by false matches.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Spatial Pruning: The Emergency Brake
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    What if a pathological scene generates hundreds of proto-objects in the same location? The proximity index has a per-cell capacity limit:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># proximity_index.py
if len(cell_members) > per_cell_cap:  # Default: 64
    # Evict lowest-ranked objects
    victims = sorted(cell_members, key=rank)[:overflow]
    for v in victims:
        remove(v)

def rank(oid):
    # Prefer to evict: unconfirmed, then low stability, then oldest
    return (0 if not confirmed else 1, stability, last_seen)</code></pre>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Proto-objects with low stability are evicted first. Confirmed objects are protected. This prevents runaway memory growth from noisy scenes.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Why This Works
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The stability system encodes a simple epistemological principle: confidence requires consistent evidence across time and viewpoint.
                </p>
                 <div class="overflow-x-auto mb-8">
                     <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-3 border-b border-white/10 font-medium">Property</th>
                                <th class="p-3 border-b border-white/10 font-medium">How stability encodes it</th>
                            </tr>
                        </thead>
                         <tbody class="font-mono text-xs">
                             <tr class="border-b border-white/5">
                                <td class="p-3 font-medium text-purple-300">Persistence</td>
                                <td class="p-3">Decay punishes absence; gain rewards presence</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3 font-medium text-purple-300">Consistency</td>
                                <td class="p-3">High cosine similarity required for gain</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3 font-medium text-purple-300">Multi-view</td>
                                <td class="p-3">View bins track angular coverage</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3 font-medium text-purple-300">Temporal extent</td>
                                <td class="p-3">Hits count total observations</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Noise fails on all counts. It appears sporadically, looks different each time, comes from one angle, and doesn't persist. Real objects pass all tests naturally.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Tuning for Your Domain
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The defaults work well for handheld AR and mobile robots. For other scenarios:
                </p>
                <div class="grid md:grid-cols-2 gap-4 mb-8">
                    <div class="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h4 class="text-white font-medium mb-4">Stationary surveillance camera</h4>
                         <pre><code class="text-xs font-mono text-zinc-300">object:
  miss_decay: 0.8        # Slower decay
  require_view_bins: 1   # Single viewpoint
  proto_ttl_s: 30.0      # Longer window</code></pre>
                    </div>
                     <div class="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h4 class="text-white font-medium mb-4">Fast-moving drone</h4>
                         <pre><code class="text-xs font-mono text-zinc-300">object:
  miss_decay: 0.3        # Aggressive decay
  stab_k: 0.6            # Faster stability
  proto_ttl_s: 5.0       # Shorter memory</code></pre>
                    </div>
                    <div class="bg-white/5 border border-white/10 rounded-xl p-6 md:col-span-2">
                        <h4 class="text-white font-medium mb-4">High-precision robotics</h4>
                         <pre><code class="text-xs font-mono text-zinc-300">assoc:
  cos_min: 0.95          # Stricter appearance
  gate_dist_base_m: 0.2  # Tighter spatial gate
object:
  stability_promote: 0.7 # Higher bar
  require_view_bins: 3   # Multi-angle required</code></pre>
                    </div>
                </div>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Key Takeaways
                </h2>
                 <ul class="list-none pl-0 mb-6 text-zinc-400 space-y-4">
                    <li class="flex items-start gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                        <span><strong class="text-white">Start skeptical</strong> — Proto-objects begin at 0.25 stability and must earn promotion</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span><strong class="text-white">Reward consistency</strong> — Matching observations increase stability based on appearance, position, and depth quality</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span><strong class="text-white">Punish absence</strong> — Stability halves every missed frame, collapsing noise rapidly</span>
                    </li>
                     <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span><strong class="text-white">Gate promotion</strong> — Objects need hits, stability, AND view diversity to confirm</span>
                    </li>
                     <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span><strong class="text-white">Expire stragglers</strong> — Protos die after 10 seconds without observation</span>
                    </li>
                     <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span><strong class="text-white">Protect confirmed</strong> — Spatial pruning evicts low-stability protos first</span>
                    </li>
                </ul>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The result: a self-cleaning memory that naturally converges on real, persistent objects while continuously shedding the noise that plagues any perception system.
                </p>
                 <p class="mb-6 text-zinc-400 leading-relaxed font-light text-sm italic border-t border-white/10 pt-4 mt-8">
                    Next in the series: <a href="/blog/view-bins" class="text-purple-400 hover:text-purple-300">View Bins and Multi-Angle Evidence: Why Single-Viewpoint Detection Isn't Enough</a>
                </p>
            `
        },
        'view-bins': {
            title: "View Bins and Multi-Angle Evidence: Why Single-Viewpoint Detection Isn't Enough",
            date: "Dec 15, 2025",
            author: "Calabi Research",
            readTime: "7 min read",
            tags: ['RTSM Internals', 'Robustness', 'Algorithms'],
            content: `
                 <p class="lead text-xl text-white mb-8 leading-relaxed font-light">
                    <strong class="block text-purple-400 mb-4 font-medium">The Problem: Seeing Isn't Believing</strong>
                    You point a camera at a scene. FastSAM detects 47 masks. CLIP encodes them. The association system matches some to known objects, creates protos for others. Stability scores climb. But here's the catch: 5 of those detections are reflections in a glass cabinet. 3 are shadows that happen to have object-like shapes. 2 are segmentation artifacts from a glossy countertop. 
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    They all look like objects from this angle. They have consistent embeddings frame-to-frame. They pass the stability threshold. But they're not real. The solution: require evidence from multiple viewing angles. Real objects look like objects from every direction. Reflections, shadows, and artifacts typically don't.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The Geometry of Viewing
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    When you observe an object, there's a direction vector from the camera to the object. RTSM discretizes this direction into <strong>view bins</strong> — a coarse grid over the sphere of possible viewing angles.
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># working_memory.py
def _view_bin_id(view_dir_cam, AZ_BINS, EL_BINS):
    v = normalize(view_dir_cam)
    x, y, z = v[0], v[1], v[2]
    
    # Azimuth: horizontal angle around forward axis
    az = atan2(x, z)  # [-π, π]
    az_i = floor((az + π) / (2π) * AZ_BINS)
    
    # Elevation: vertical angle from horizontal
    el = atan2(-y, hypot(x, z))  # [-π/2, π/2]
    el_i = floor((el + π/2) / π * EL_BINS)
    
    return el_i * AZ_BINS + az_i</code></pre>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    With the default configuration of 12 azimuth bins and 5 elevation bins, you get 60 possible view bins — each covering roughly 30° horizontally and 36° vertically.
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-center font-mono text-xs leading-loose text-zinc-300">
                     <p class="mb-2">Azimuth bins (12) (around the object)</p>
                     <p>←─────────────────────→</p>
                    <div class="grid grid-cols-[auto_1fr] gap-4 items-center">
                        <div style="writing-mode: vertical-rl; transform: rotate(180deg);" class="h-24 text-center">Elevation bins (5)</div>
                        <div class="border border-white/20 rounded p-4">
                             <div class="flex border-b border-white/20 mb-2 pb-2">
                                <div class="flex-1">0</div><div class="flex-1">1</div><div class="flex-1">2</div><div class="flex-1">3</div><div class="flex-1">4</div> <span class="ml-2 text-zinc-500">← Looking up</span>
                            </div>
                             <div class="flex border-b border-white/20 mb-2 pb-2">
                                <div class="flex-1">...</div><div class="flex-1">...</div><div class="flex-1">...</div><div class="flex-1">...</div><div class="flex-1">...</div> <span class="ml-2 text-zinc-500">← Level</span>
                            </div>
                             <div class="flex">
                                <div class="flex-1">...</div><div class="flex-1">...</div><div class="flex-1">...</div><div class="flex-1">...</div><div class="flex-1">...</div> <span class="ml-2 text-zinc-500">← Looking down</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Each bin represents a cone of viewing directions. When you observe an object, RTSM records which bin the observation came from.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Per-Bin Embedding Storage
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Each object maintains a dictionary mapping view bins to embeddings:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300">@dataclass
class ObjectState:
    view_bins: Dict[int, Emb]  # bin_id → mean embedding for that angle
    emb_mean: Emb              # global mean across all observations
    emb_gallery: np.ndarray    # recent embeddings (temporal diversity)</code></pre>
                </div>
                 <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    When a new observation arrives:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># working_memory.py
bin_id = _view_bin_id(obs.view_dir_cam, az_bins, el_bins)
if bin_id is not None:
    prev = object.view_bins.get(bin_id)
    if prev is None:
        object.view_bins[bin_id] = embedding  # First observation from this angle
    else:
        object.view_bins[bin_id] = l2norm(0.5 * prev + 0.5 * embedding)  # Running mean</code></pre>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The 50/50 running mean keeps each bin's embedding adaptive while preventing single noisy observations from dominating.
                </p>

                <h3 class="text-2xl font-heading font-medium text-white mt-12 mb-6">Three Storage Systems, Three Purposes</h3>
                <div class="overflow-x-auto mb-8">
                     <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-3 border-b border-white/10 font-medium">Storage</th>
                                <th class="p-3 border-b border-white/10 font-medium">What it captures</th>
                                <th class="p-3 border-b border-white/10 font-medium">Update rule</th>
                                <th class="p-3 border-b border-white/10 font-medium">Memory</th>
                            </tr>
                        </thead>
                         <tbody class="font-mono text-xs">
                             <tr class="border-b border-white/5">
                                <td class="p-3 font-medium text-purple-300">emb_mean</td>
                                <td class="p-3">Overall appearance</td>
                                <td class="p-3">Running mean of all observations</td>
                                <td class="p-3">2KB</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3 font-medium text-purple-300">emb_gallery</td>
                                <td class="p-3">Temporal diversity</td>
                                <td class="p-3">FIFO buffer of last 6 embeddings</td>
                                <td class="p-3">~6KB</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3 font-medium text-purple-300">view_bins</td>
                                <td class="p-3">Angular diversity</td>
                                <td class="p-3">Per-bin running mean</td>
                                <td class="p-3">~2-20KB typical</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Why all three? <strong>emb_mean</strong> is fast for association. <strong>emb_gallery</strong> captures how appearance varies over time (lighting). <strong>view_bins</strong> captures how appearance varies over angle (front vs side).
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The View Diversity Gate
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    View bins aren't just for storage — they're a gate for promotion:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 overflow-x-auto">
                    <pre><code class="text-sm font-mono text-zinc-300"># working_memory.py
if (hits >= 2 and 
    stability >= 0.55 and 
    len(view_bins) >= require_view_bins):
    confirmed = True</code></pre>
                </div>
                 <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The <code>require_view_bins</code> parameter (default: 1, originally 2) enforces that an object must be observed from at least N distinct angular bins before it can be promoted. Why this matters:
                </p>
                <div class="overflow-x-auto mb-8">
                     <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-3 border-b border-white/10 font-medium">Scenario</th>
                                <th class="p-3 border-b border-white/10 font-medium">Hits</th>
                                <th class="p-3 border-b border-white/10 font-medium">Stability</th>
                                <th class="p-3 border-b border-white/10 font-medium">View Bins</th>
                                <th class="p-3 border-b border-white/10 font-medium">Outcome</th>
                            </tr>
                        </thead>
                         <tbody class="font-mono text-xs">
                             <tr class="border-b border-white/5">
                                <td class="p-3">Real mug, walked around</td>
                                <td class="p-3">15</td>
                                <td class="p-3 text-purple-300">0.82</td>
                                <td class="p-3 text-purple-300">4</td>
                                <td class="p-3 text-purple-300">✓ Promoted</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">Reflection in glass</td>
                                <td class="p-3">10</td>
                                <td class="p-3 text-purple-300">0.71</td>
                                <td class="p-3 text-zinc-500">1</td>
                                <td class="p-3 text-zinc-500">✗ Stuck as proto</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">Shadow on floor</td>
                                <td class="p-3">8</td>
                                <td class="p-3 text-purple-300">0.65</td>
                                <td class="p-3 text-zinc-500">1</td>
                                <td class="p-3 text-zinc-500">✗ Stuck as proto</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">Segmentation artifact</td>
                                <td class="p-3">3</td>
                                <td class="p-3 text-purple-300">0.45</td>
                                <td class="p-3 text-zinc-500">1</td>
                                <td class="p-3 text-zinc-500">✗ Never reaches stability</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Why Multi-View Defeats Common Failure Modes
                </h2>
                <div class="space-y-8 mb-12">
                     <div>
                        <h4 class="text-xl font-medium text-white mb-4">1. Mirror Reflections</h4>
                        <p class="mb-4 text-zinc-400 leading-relaxed font-light">A mirror creates a virtual image that appears at a specific location — but only when viewed from angles where the reflection geometry works out.</p>
                        <ul class="list-none pl-0 mb-4 text-zinc-400 space-y-2 text-sm font-mono bg-white/5 p-4 rounded-lg">
                            <li>Camera A → sees "object" in mirror at position P</li>
                            <li>Camera B → sees nothing at position P (wrong reflection angle)</li>
                            <li>Camera C → sees nothing at position P</li>
                            <li class="pt-2 text-purple-300">Result: 1 view bin populated → fails multi-view gate</li>
                        </ul>
                    </div>
                     <div>
                        <h4 class="text-xl font-medium text-white mb-4">2. Specular Highlights</h4>
                        <p class="mb-4 text-zinc-400 leading-relaxed font-light">Shiny surfaces produce bright spots that segmentation models sometimes interpret as objects. But highlights are view-dependent.</p>
                        <ul class="list-none pl-0 mb-4 text-zinc-400 space-y-2 text-sm font-mono bg-white/5 p-4 rounded-lg">
                            <li>Frame 1: Highlight at position P, bin 3 → proto created</li>
                            <li>Frame 2: Camera moved 10°, highlight gone → stability decays</li>
                            <li>Frame 3: Different highlight at position Q → new proto (not matched)</li>
                            <li class="pt-2 text-purple-300">Result: Neither proto accumulates multi-view evidence</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-xl font-medium text-white mb-4">3. SLAM Reconstruction Artifacts</h4>
                        <p class="mb-4 text-zinc-400 leading-relaxed font-light">Visual SLAM sometimes hallucinates geometry in poor texture areas. These ghosts tend to appear from specific viewpoints.</p>
                        <ul class="list-none pl-0 mb-4 text-zinc-400 space-y-2 text-sm font-mono bg-white/5 p-4 rounded-lg">
                            <li>SLAM ghost at position P:</li>
                            <li>- Visible from camera positions A, A', A'' (similar angle)</li>
                            <li>- Invisible from camera positions B, C, D (different angles)</li>
                             <li class="pt-2 text-purple-300">Result: All observations fall in same view bin → single bin populated</li>
                        </ul>
                    </div>
                </div>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The Math: How Different is "Different"?
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    With 12 azimuth bins covering 360°, each bin spans 30°. For a typical indoor exploration scenario:
                </p>
                <div class="overflow-x-auto mb-8">
                     <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-3 border-b border-white/10 font-medium">Motion</th>
                                <th class="p-3 border-b border-white/10 font-medium">Angular Change</th>
                                <th class="p-3 border-b border-white/10 font-medium">Bins Visited</th>
                            </tr>
                        </thead>
                         <tbody class="font-mono text-xs">
                             <tr class="border-b border-white/5">
                                <td class="p-3">Standing still, looking around</td>
                                <td class="p-3">0° (same position)</td>
                                <td class="p-3">1</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">Sidestep 0.5m at 2m range</td>
                                <td class="p-3">~14°</td>
                                <td class="p-3">1 (borderline)</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">Sidestep 1m at 2m range</td>
                                <td class="p-3">~27°</td>
                                <td class="p-3">1-2</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">Walk quarter circle at 2m</td>
                                <td class="p-3">90°</td>
                                <td class="p-3">3-4</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">Walk half circle at 2m</td>
                                <td class="p-3">180°</td>
                                <td class="p-3">5-7</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The implication: To populate 2+ view bins, you need to move at least 30° around the object. This isn't onerous for mobile robots, but it does require some exploration.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    View Bins vs. Hit Count
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Why not just require more hits? Consider two objects:
                </p>
                <div class="grid md:grid-cols-2 gap-8 mb-8">
                     <div class="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h4 class="text-white font-medium mb-4">Object A</h4>
                        <p class="text-sm text-zinc-400 mb-2">20 hits, same angle (stationary camera)</p>
                        <div class="font-mono text-xs text-zinc-300 space-y-1">
                            <div>hits = 20</div>
                            <div class="text-purple-300">stability = 0.95</div>
                            <div class="text-zinc-500">view_bins = {3: emb} (1 bin)</div>
                        </div>
                    </div>
                     <div class="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h4 class="text-white font-medium mb-4">Object B</h4>
                        <p class="text-sm text-zinc-400 mb-2">6 hits, diff angles (robot walking)</p>
                         <div class="font-mono text-xs text-zinc-300 space-y-1">
                            <div>hits = 6</div>
                            <div>stability = 0.72</div>
                            <div class="text-purple-300">view_bins = {1, 3, 5, 7} (4 bins)</div>
                        </div>
                    </div>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    All 20 observations of Object A are correlated — they share the same failure modes. Object B has less hits but more diversity. <strong>View diversity is evidence decorrelation.</strong> If 4 different viewing angles agree, it's real.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Key Takeaways
                </h2>
                 <ul class="list-none pl-0 mb-6 text-zinc-400 space-y-4">
                    <li class="flex items-start gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                        <span><strong class="text-white">View bins discretize viewing directions</strong> into a 60-cell grid (12 azimuth × 5 elevation)</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span><strong class="text-white">Promotion requires view diversity</strong> — objects must be seen from N distinct bins (default: 1-2)</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span><strong class="text-white">LTM upsert has a higher bar</strong> — persistent storage requires 2+ view bins</span>
                    </li>
                     <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span><strong class="text-white">Multi-view defeats common artifacts</strong> — reflections, highlights, and SLAM ghosts typically fail the diversity test</span>
                    </li>
                     <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                         <span><strong class="text-white">Configuration allows tradeoffs</strong> — stationary cameras can relax requirements; mobile robots can tighten them</span>
                    </li>
                </ul>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The cost is requiring some camera motion to confirm objects. The benefit is dramatically reduced false positives. For spatial computing systems that need to maintain accurate, persistent maps of the world, this tradeoff is almost always worth it.
                </p>
                 <p class="mb-6 text-zinc-400 leading-relaxed font-light text-sm italic border-t border-white/10 pt-4 mt-8">
                    This concludes the RTSM Internals series. For more details, see the <a href="/#infrastructure-stack" class="text-purple-400 hover:text-purple-300">Architecture Overview</a> and <a href="https://calabi-inc.github.io/rtsm/concepts/memory-model/" class="text-purple-400 hover:text-purple-300">Memory Model</a> documentation.
                </p>
            `
        },
        'hippocampus-argument': {
            title: "The Hippocampus Argument: Why Explicit Memory Matters in a Latent World",
            date: "Dec 14, 2025",
            author: "Calabi Research",
            readTime: "6 min read",
            tags: ['RTSM', 'AGI', 'World Models'],
            image: hippocampusBanner,
            content: `
                <p class="lead text-xl text-white mb-8 leading-relaxed">
                    In the race to Embodied AGI, a dangerous orthodoxy has taken hold: “The best representation is no representation.”
                </p>

                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The argument goes that if we just scale end-to-end Transformers (Pixels → Torques) on enough data, a world model will naturally emerge inside the weights. No maps, no object IDs, no explicit state—just a massive, implicit latent vector.
                </p>
                
                 <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    We disagree. And we aren't alone.
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    As Yann LeCun has repeatedly argued, today's auto-regressive LLM approaches are insufficient for physical intelligence because they lack an internal "World Model"—a persistent simulation of reality that allows for planning and reasoning before acting.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    We argue that General Purpose Robotics is impossible without an Explicit Spatio-Semantic Memory. Biology didn't evolve a black box; it evolved a Hippocampus. If we want robots to be collaborative, safe, and capable of long-horizon reasoning, we need to stop treating memory as a side effect of computation and start treating it as an architectural pillar.
                </p>

                 <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The Latent Amnesia Problem
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Current "State of the Art" robotic foundation models have a fatal flaw: They live in the Now.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Because they rely on sliding-window contexts of raw tokens, they lack a persistent, queryable database of the world. When an object leaves the camera frame, it doesn't just disappear from view—it disappears from existence.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    To solve this, researchers try to stuff more context into the window. But context is not memory. Context is a buffer; Memory is an index.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Gary Marcus describes this as the "Robustness Gap"—systems that work 80% of the time but fail catastrophically because they lack a deep, structured understanding of what they are looking at. Without an explicit state, the model is just matching patterns, not reasoning about permanence.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The Biological Argument: Place Cells & Grid Cells
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    If the "End-to-End" hypothesis were true, evolution would have favored a massive, unstructured visual cortex connected directly to the motor cortex. That is not what happened.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Instead, nature evolved the Hippocampus—a distinct brain region dedicated to maintaining a cognitive map. The discovery of Place Cells (O'Keefe, 1971) and Grid Cells (Moser & Moser, 2005) proved that the brain maintains an Explicit Coordinate System.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    This isn't just biology; it's optimal control theory discovered by evolution. Even DeepMind found that when they trained agents to navigate complex mazes, the neural networks spontaneously developed artificial Grid Cells (Banino et al., Nature 2018). The network needed a coordinate system to solve the problem.
                </p>
                <blockquote class="border-l-2 border-purple-500 pl-6 my-10 italic text-white text-xl font-light">
                    "To be an expert in any domain requires having a good reference frame, a good map."
                    <footer class="text-sm mt-4 text-zinc-500 font-sans not-italic">— Jeff Hawkins, A Thousand Brains</footer>
                </blockquote>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The brain is hybrid:
                </p>
                <ul class="list-none pl-0 mb-6 text-zinc-400 space-y-4">
                    <li class="flex items-start gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                        <span><strong class="text-white">Visual Cortex:</strong> High-dimensional, latent, probabilistic (Like CLIP/FastSAM).</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                        <span><strong class="text-white">Hippocampus:</strong> Low-dimensional, explicit, geometric (Like RTSM).</span>
                    </li>
                </ul>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The Hippocampus acts as the "Grounding Anchor" for the chaotic signals of the cortex. Without it, the brain hallucinates.
                </p>

                 <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The Engineering Argument: The "USB Port" of Skills
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Beyond biology, there is a practical reason we need explicit state: Transferability.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Imagine we train a robot to "Fold a T-Shirt" using an End-to-End model. That skill is locked inside the weights of that specific neural net, tied to that specific camera hardware. Change the camera angle? The skill breaks. Upgrade the robot arm? The skill breaks. Want to share the skill with a different robot? Impossible.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    To build an "App Store for Robotics"—where I can download a skill like <code>make_coffee</code> and run it on my hardware—we need a common protocol.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    We cannot standardize "Latent Vectors" (they are mathematically opaque). We can standardize "World State."
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    If we agree that the world consists of Objects with ID, Pose, and Semantics (the RTSM output), then we can train agents that target that representation. The skill becomes portable.
                </p>

                 <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Introducing RTSM: The Artificial Hippocampus
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    This is why we built RTSM (Real-Time Spatio-Semantic Memory). RTSM is not just a 3D mapping tool. It is an architectural bet on Hybrid AI.
                </p>
                 <ul class="list-none pl-0 mb-6 text-zinc-400 space-y-4">
                    <li class="flex items-start gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                        <span>It uses deep learning (FastSAM, CLIP) to understand the <em>what</em>.</span>
                    </li>
                    <li class="flex items-start gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5 flex-shrink-0"></span>
                        <span>It uses explicit geometry (SLAM, Raycasting) to understand the <em>where</em>.</span>
                    </li>
                </ul>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    It provides the "Ground Truth" stability that allows downstream agents to hallucinate less and plan better.
                </p>

                 <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The Road Ahead
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    We are building Calabi to be the hub for this new architecture. We are providing the Spine (RTSM), and inviting the community to help us build the Brain (World Models) and the Verbs (Action Tokens).
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The future of AI isn't just about bigger models. It's about better grounding.
                </p>
            `
        }
    };

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

    // Default image if none provided in post content
    const ogImage = post.title.includes("Hippocampus") ? hippocampusBanner : undefined;

    return (
        <div className="min-h-screen bg-[#050505] selection:bg-purple-500/20 selection:text-white font-sans">
            <SEO
                title={post.title}
                description={getExcerpt(post.content)}
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
                        <div className="flex gap-2 mb-8">
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
                            <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
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
