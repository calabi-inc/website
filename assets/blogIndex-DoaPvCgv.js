const i={"what-is-rtsm":{title:"What is Real-Time Spatio-Semantic Memory (RTSM)?",date:"Dec 8, 2025",author:"Calabi Research",readTime:"5 min read",tags:["RTSM Core","Spatial AI","Engineering"],excerpt:"A queryable world state layer for embodied AI. Why SLAM isn't enough, and how we built a system that remembers 'that's a coffee mug' even when you turn the lights off.",content:`
                <p class="lead text-xl text-white mb-8 leading-relaxed font-light">
                    <strong class="block text-purple-400 mb-4 font-medium">A queryable world state layer for embodied AI.</strong>
                    SLAM answers “where am I?” and object detection answers “what is that?” But embodied AI needs something else:
                    “Where did I last see that thing, what state was it in, and do I still trust that belief?
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
                    Instead of “process everything,” it prioritizes:
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
                         <span>Help define what “persistent world state” should mean in practice</span>
                    </li>
                </ul>
            `},"compute-aware-selection":{title:"Compute-Aware Selection: How RTSM Turns 30Hz Sensor Firehose into Bounded State Updates",date:"Dec 15, 2025",author:"Calabi Research",readTime:"7 min read",tags:["RTSM Internals","Performance","Engineering"],excerpt:"The dangerous inefficiency of processing every frame. How we use novelty, stability, and time-decays to drop 90% of frames without losing data.",content:`
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
                    Result: From 120 frames in 4 seconds, only ~8-12 trigger full pipeline processing. That's a 10-15Ã— reduction in compute while capturing all meaningful scene changes.
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
                    The grid discretization is coarse enough to be memory-efficient (25cm cells, 12 yaw bins Ã— 5 pitch bins = 60 view bins per cell) while fine enough to track meaningful viewpoint changes. After each accepted sweep, bookkeeping updates the cache:
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
            `},"stability-scoring":{title:"How Stability Scoring Separates Signal from Noise",date:"Dec 15, 2025",author:"Calabi Research",readTime:"8 min read",tags:["RTSM Internals","Robustness","Algorithms"],excerpt:"Run FastSAM on any frame and you get noise. How RTSM uses stability scoring to separate signal from noise without any explicit noise model.",content:`
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
                    The view bins requirement deserves explanation. RTSM discretizes viewing directions into 60 bins (12 azimuth Ã— 5 elevation). Each observation records which bin it came from. Requiring multiple view bins ensures the object has been seen from different angles — not just the same viewpoint repeated. For stationary cameras, <code>require_view_bins = 1</code> allows single-angle confirmation. For mobile robots, you might increase this to require true multi-view triangulation.
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
            `},"view-bins":{title:"View Bins and Multi-Angle Evidence: Why Single-Viewpoint Detection Isn't Enough",date:"Dec 15, 2025",author:"Calabi Research",readTime:"7 min read",tags:["RTSM Internals","Robustness","Algorithms"],excerpt:"Why seeing isn't believing. How we use epipolar geometry and view bins to filter out reflections, shadows, and SLAM ghosts.",content:`
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
    az = atan2(x, z)  # [-Ï€, Ï€]
    az_i = floor((az + Ï€) / (2Ï€) * AZ_BINS)
    
    # Elevation: vertical angle from horizontal
    el = atan2(-y, hypot(x, z))  # [-Ï€/2, Ï€/2]
    el_i = floor((el + Ï€/2) / Ï€ * EL_BINS)
    
    return el_i * AZ_BINS + az_i</code></pre>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    With the default configuration of 12 azimuth bins and 5 elevation bins, you get 60 possible view bins — each covering roughly 30Â° horizontally and 36Â° vertically.
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-center font-mono text-xs leading-loose text-zinc-300">
                     <p class="mb-2">Azimuth bins (12) (around the object)</p>
                     <p>←─────────────────────→</p>
                    <div class="grid grid-cols-[auto_1fr] gap-4 items-center">
                        <div style="writing-mode: vertical-rl; transform: rotate(180deg);" class="h-24 text-center">Elevation bins (5)</div>
                        <div class="border border-white/20 rounded p-4">
                             <div class="flex border-b border-white/20 mb-2 pb-2">
                                <div class="flex-1">0</div><div class="flex-1">1</div><div class="flex-1">2</div><div class="flex-1">3</div><div class="flex-1">4</div> <span class="ml-2 text-zinc-500">← Looking up</span>
                            </div>
                             <div class="flex border-b border-white/20 mb-2 pb-2">
                                <div class="flex-1">...</div><div class="flex-1">...</div><div class="flex-1">...</div><div class="flex-1">...</div><div class="flex-1">...</div> <span class="ml-2 text-zinc-500">← Level</span>
                            </div>
                             <div class="flex">
                                <div class="flex-1">...</div><div class="flex-1">...</div><div class="flex-1">...</div><div class="flex-1">...</div><div class="flex-1">...</div> <span class="ml-2 text-zinc-500">← Looking down</span>
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
                            <li>Frame 2: Camera moved 10Â°, highlight gone → stability decays</li>
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
                    With 12 azimuth bins covering 360Â°, each bin spans 30Â°. For a typical indoor exploration scenario:
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
                                <td class="p-3">0Â° (same position)</td>
                                <td class="p-3">1</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">Sidestep 0.5m at 2m range</td>
                                <td class="p-3">~14Â°</td>
                                <td class="p-3">1 (borderline)</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">Sidestep 1m at 2m range</td>
                                <td class="p-3">~27Â°</td>
                                <td class="p-3">1-2</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">Walk quarter circle at 2m</td>
                                <td class="p-3">90Â°</td>
                                <td class="p-3">3-4</td>
                            </tr>
                             <tr class="border-b border-white/5">
                                <td class="p-3">Walk half circle at 2m</td>
                                <td class="p-3">180Â°</td>
                                <td class="p-3">5-7</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The implication: To populate 2+ view bins, you need to move at least 30Â° around the object. This isn't onerous for mobile robots, but it does require some exploration.
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
                        <span><strong class="text-white">View bins discretize viewing directions</strong> into a 60-cell grid (12 azimuth Ã— 5 elevation)</span>
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
            `},"hippocampus-argument":{title:"The Hippocampus Argument: Why Explicit Memory Matters in a Latent World",date:"Dec 14, 2025",author:"Calabi Research",readTime:"6 min read",tags:["RTSM","AGI","World Models"],excerpt:"In the race to Embodied AGI, a dangerous orthodoxy has taken hold: “The best representation is no representation.” We disagree. Explicit memory is the key to robustness.",image:"/assets/hippocampus_banner.png",content:`
                <p class="lead text-xl text-white mb-8 leading-relaxed">
                    In the race to Embodied AGI, a dangerous orthodoxy has taken hold: “The best representation is no representation.”
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
            `},"depth-residual-not-a-drift-meter":{title:"A depth residual is not a drift meter",date:"Nov 17, 2026",author:"Calabi Research",readTime:"10 min read",tags:["rtsm-eval","Evaluation","Localization"],excerpt:"We injected known pose errors into a public recording to find out what the depth residual on our own report can detect. A drift of 0.2 m per minute did not move it; a 100 ms clock offset did. What the page says now, and why.",image:"/assets/blog/post1-trend-vs-injected-drift.png",series:{name:"Pose health",part:1,total:7},content:`
                <p class="lead text-xl text-white mb-8 leading-relaxed font-light">
                    <strong class="block text-purple-400 mb-4 font-medium">A number on our own report said less than its label implied. Here is the test that showed it, and what the page says now.</strong>
                    Our <a href="/eval-sample/" target="_blank" rel="noopener">sample report</a> is a perception health report rendered from a public RGB-D recording. Until the end of October its localization tile read "Localization 0.122 m", and the line under it read "drift −0.0028 m/min". One reader of the page put it to us, in effect: that value is not an independently established localization error, and that slope is not measured trajectory drift. Call the first a geometric-consistency statistic, call the second the trend of a depth residual, and if you want to warn about SLAM drift, inject known drift and known timestamp offsets and show that your diagnostics tell them apart.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    They were right. This post is the test, with the numbers that came out of it and the two labels we changed because of it. It is the first of seven posts on pose health: what a map can honestly say about the poses it was built from, what it cannot, and how to check.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    What the two numbers compute
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The report's engine keeps a memory of objects with a stored 3D position each. Every time the camera looks at a stored object again, the report compares two depths at the pixel where the stored position projects: the depth the sensor measured there, and the depth of the stored position in the camera's frame. The difference, observed minus stored, is the <strong>depth gap</strong> of that sighting.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The tile's value was the 95th percentile of the absolute gap over re-observed sightings. The "drift" line was the least-squares slope of the signed gap against time, in metres per minute, with a second slope against the camera's path length and a detector for level shifts between windowed medians. No reference trajectory is involved anywhere. The trust block at the top of the same page already listed "trajectory error: not measured". The headline said something else, and the headline is what people read.
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                    <p class="text-zinc-300 leading-relaxed font-light">
                        The sample page makes the case stronger than the critique knew. Its pose stream is the recording's motion-capture ground truth: eight tracking cameras at 100 Hz, the pose chain the engine read from the recording's own transform tree. There is no estimator in the loop to drift. Whatever the slope on that page was measuring, it was not pose drift.
                    </p>
                </div>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The test
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    We made nine copies of the recording, an 87-second hand-held loop around an office (TUM RGB-D, sequence fr3 long office household). In each copy one thing changed: the moving transform between the world and the camera, which is where a localization system's output lives. Every other message was written back byte for byte, and a hash over all of them, source against copy, proved it. Each copy was then read back the way the engine reads it, interpolating the pose at every image stamp, and the measured error at five stamps was compared with the injected one.
                </p>
                <div class="overflow-x-auto mb-8">
                    <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-4 border-b border-white/10 font-medium">Copy</th>
                                <th class="p-4 border-b border-white/10 font-medium">Injected error</th>
                                <th class="p-4 border-b border-white/10 font-medium">Size by the end of the recording</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-white/5"><td class="p-4 font-mono text-purple-300">identity</td><td class="p-4">nothing: the rewrite's own check</td><td class="p-4">0</td></tr>
                            <tr class="border-b border-white/5"><td class="p-4 font-mono text-purple-300">drift 0.02, 0.05, 0.2</td><td class="p-4">position drift growing linearly with time along one world axis, in m per minute</td><td class="p-4">2.9, 7.3, 29 cm</td></tr>
                            <tr class="border-b border-white/5"><td class="p-4 font-mono text-purple-300">step</td><td class="p-4">a 5 cm jump at t = 40 s</td><td class="p-4">5 cm</td></tr>
                            <tr class="border-b border-white/5"><td class="p-4 font-mono text-purple-300">scale</td><td class="p-4">the displacement from the start scaled by 1 + 0.002 per second</td><td class="p-4">peaks at 40 cm mid-loop, 13 cm at the end</td></tr>
                            <tr><td class="p-4 font-mono text-purple-300">lag 30, 60, 100 ms</td><td class="p-4">pose stamps late: the pose used for each image is the pose from that long before</td><td class="p-4">8, 16, 26 mm at the median speed; 0.3 to 1.1° at the median turn rate</td></tr>
                        </tbody>
                    </table>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    All nine went through the product's own pipeline with the configuration of the published sample: the same engine release, the same detector and segmenter, three repeats each (the identity copy once), and the original recording once more as the control. The engine is deterministic on this input; every repeat of every copy produced the same numbers, so there is no run-to-run noise to argue about. The only floor that matters is how far the numbers move under injections that are not drift.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    What came back
                </h2>
                <div class="overflow-x-auto mb-8">
                    <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-4 border-b border-white/10 font-medium">Copy</th>
                                <th class="p-4 border-b border-white/10 font-medium">Trend of the gap, m/min</th>
                                <th class="p-4 border-b border-white/10 font-medium">Gap p95, m</th>
                                <th class="p-4 border-b border-white/10 font-medium">Re-observed share</th>
                                <th class="p-4 border-b border-white/10 font-medium">Association residual, px (median)</th>
                            </tr>
                        </thead>
                        <tbody class="font-mono text-xs">
                            <tr class="border-b border-white/5"><td class="p-4 text-zinc-200">control (mocap poses)</td><td class="p-4">−0.0028</td><td class="p-4">0.122</td><td class="p-4">61.0 %</td><td class="p-4">3.7</td></tr>
                            <tr class="border-b border-white/5"><td class="p-4 text-zinc-200">drift 0.02 m/min</td><td class="p-4">−0.0040</td><td class="p-4">0.125</td><td class="p-4">60.5 %</td><td class="p-4">3.7</td></tr>
                            <tr class="border-b border-white/5"><td class="p-4 text-zinc-200">drift 0.05 m/min</td><td class="p-4">−0.0050</td><td class="p-4">0.122</td><td class="p-4">59.3 %</td><td class="p-4">3.8</td></tr>
                            <tr class="border-b border-white/5"><td class="p-4 text-zinc-200">drift 0.2 m/min</td><td class="p-4">−0.0033</td><td class="p-4">0.127</td><td class="p-4">59.6 %</td><td class="p-4">3.9</td></tr>
                            <tr class="border-b border-white/5"><td class="p-4 text-zinc-200">step 5 cm at 40 s</td><td class="p-4">−0.0047</td><td class="p-4">0.124</td><td class="p-4">58.4 %</td><td class="p-4">3.8</td></tr>
                            <tr class="border-b border-white/5"><td class="p-4 text-zinc-200">scale 1 + 0.002/s</td><td class="p-4">+0.0166</td><td class="p-4">0.141</td><td class="p-4">58.8 %</td><td class="p-4">7.8</td></tr>
                            <tr class="border-b border-white/5"><td class="p-4 text-zinc-200">lag 30 ms</td><td class="p-4">−0.0008</td><td class="p-4">0.111</td><td class="p-4">62.3 %</td><td class="p-4">5.1</td></tr>
                            <tr class="border-b border-white/5"><td class="p-4 text-zinc-200">lag 60 ms</td><td class="p-4">−0.0047</td><td class="p-4">0.112</td><td class="p-4">61.0 %</td><td class="p-4">7.5</td></tr>
                            <tr><td class="p-4 text-zinc-200">lag 100 ms</td><td class="p-4">−0.0066</td><td class="p-4">0.125</td><td class="p-4">60.8 %</td><td class="p-4">10.5</td></tr>
                        </tbody>
                    </table>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The figure at the top of this post plots the trend against the injected drift: the four points sit between −0.0028 and −0.0050 m per minute with no order, and the dashed line is the most a drift along this axis could move the trend on this recording, given how the memory works (next section). A drift of 0.2 m per minute puts the camera 29 cm off by the end of the loop and moves the page's number by 0.0005 m per minute, a quarter of a percent of the injected rate.
                </p>
                <figure class="mb-10">
                    <img src="/assets/blog/post1-gap-over-time.png" alt="Three panels of the signed depth gap over time: the control, the 0.2 m per minute drift and the 100 ms lag look alike, each with its windowed median hugging the control's." class="w-full rounded-xl border border-white/10" loading="lazy" />
                    <figcaption class="mt-3 text-sm text-zinc-500">The gap over the recording for the control, the largest drift and the largest lag. The windowed medians of the perturbed copies sit on the control's.</figcaption>
                </figure>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Four things stand out.
                </p>
                <ul class="list-disc pl-6 mb-8 space-y-3 text-zinc-400 font-light text-lg">
                    <li><strong class="text-white">Drift: nothing usable.</strong> The three rates move the trend by −0.0012, −0.0022 and −0.0005 m per minute. Not monotone in the rate, and all inside the span that non-drift injections produce. The slope against path length behaves the same way.</li>
                    <li><strong class="text-white">The step: not found.</strong> The level-shift detector reports the same shift as the control, at 69.7 s with nothing injected. That shift is a property of the scene and the camera's path, not of the pose. The injected 5 cm jump is a 5 to 8 mm blip in the one-second medians for about five seconds, under the recording's own swings of ±20 to 28 mm.</li>
                    <li><strong class="text-white">Scale: the one injection the trend reacts to, uselessly.</strong> The trend flips sign to +0.0166 and the p95 grows by 19 mm, while the injected error peaks at 40 cm mid-loop and shrinks to 13 cm by the end. Nothing in the +0.0166 tells a reader a rate, a magnitude or a time.</li>
                    <li><strong class="text-white">A clock offset moves the trend more than any drift.</strong> The 100 ms lag shifts it by −0.0038. Read as "drift", a stamp lag would have been reported as a drift larger than a real drift of 0.2 m per minute.</li>
                </ul>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Why the residual cannot hold drift
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    A pose error enters the gap of a sighting as the difference between the error now and the error at the moment the object's stored position was last set, projected on the camera's optical axis. Two facts about the engine shrink that difference to almost nothing.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong class="text-white">The memory follows the pose.</strong> On a keyframe match the working memory replaces the stored position by 90 to 99 % with the new measurement. The reference point for a sighting is therefore the object's last keyframe sighting, not its first. On this recording a re-observed sighting's position had been set a median 0.97 s earlier. A drift of 0.2 m per minute moves the camera 3.3 mm per second, so the gap can only ever hold a few millimetres of it, and a step is absorbed at the next keyframe.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong class="text-white">The projection cancels.</strong> A drift along one world axis enters the gap through the dot product of that axis with the optical axis. The camera looks in every direction around the desks over this loop, so the signed contributions largely cancel; the mean factor is −0.15. Put together, the most a drift of rate r could move the trend here is about −0.009 × r: −0.0018 m per minute for the largest injected rate. The measured points sit below that line, with no order.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    None of this is a defect of the memory. Re-placing positions on every keyframe is what keeps object identities stable while the pose stream does whatever it does; the second post in this series is about that trade. It does mean the memory cannot accumulate pose drift into its positions, and so cannot report it.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    What does see a pose problem
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Two quantities in the run's ledgers moved the way the injections did, and neither was on the page.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong class="text-white">The association's own residual.</strong> When the engine re-identifies a stored object, it records how far, in pixels, the projection of the stored position landed from the detection it matched. Its median is 3.7 px on the control and 3.7 to 3.9 px under every drift and the step. Under the lags it climbs to 5.1, 7.5 and 10.5 px, in order, and it correlates with the camera's turn rate only under a lag: the orientation part of a stamp lag misplaces the projection most while the camera turns. The scale error raises the residual too, to 7.8 px, without the turn dependence. A rising residual that follows the turns is a lag; one that does not is a geometric error of the stored positions.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong class="text-white">The gap against the camera's velocity.</strong> A stamp lag makes the gap proportional to minus the change of the camera's approach velocity since the position was set, with the lag as the constant. Regressing one on the other gives −28 ms on the control, then −14, +18 and +43 ms under 30, 60 and 100 ms. The null is not zero, so the number is usable only as a difference against a known-good run of the same rig, never as an absolute lag. The fourth post in the series works through both quantities.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Association also moves before the gap does. The share of likely-visible sightings that the memory re-observed falls by 0.5 to 2.6 points under the drifts and the step while the gap's trend changes by thousandths; under the scale error, stored positions project where nothing is detected and the losses shift to the detector side. Where a pose error shows first in an object memory is in matching, not in depth.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    What the page says now
                </h2>
                <ul class="list-disc pl-6 mb-8 space-y-3 text-zinc-400 font-light text-lg">
                    <li>The tile is <strong class="text-white">Geometric consistency</strong>, and its value is named for what it is: the depth-gap p95 on re-observed views.</li>
                    <li>The slope is printed as the <strong class="text-white">trend of the residual</strong>, in every place it appears, and the level-shift detector as a level shift of the residual.</li>
                    <li>The section states the horizon of the check: stored positions are re-placed on every keyframe match, so the gap holds about one keyframe interval of pose error, and a trend of it is not a measured pose drift.</li>
                    <li>The trust block's not-measured list carries <strong class="text-white">pose drift</strong> next to the trajectory error it always carried.</li>
                </ul>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The claim the number supports is "this interval deserves a look at pose health", and only when the residual departs from the recording's own baseline by more than the baseline's own variation. The claim it does not support is "SLAM is drifting here". The only route to a drift number is a reference trajectory, and the seventh post in this series is about what that measurement is and how it will reach the report as an optional input.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    What this test does not show
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    One recording, one engine configuration, one drift axis. The projection factor of −0.15 belongs to this loop; a drift along a direction the camera faces for long stretches would show more, and a corridor sweep less again once the memory re-places its objects. The keyframe-interval argument does not depend on the scene. The lag regression's non-zero null is unexplained: either the regressor carries a geometric bias on this scene, or this recording's image stamps sit a few tens of milliseconds behind its motion capture. The data were not designed to decide that, and we did not.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The perturbation tool, the per-copy manifests and the full tables are in our evaluation records; ask if you want them.
                </p>

                <div class="mt-12 pt-6 border-t border-white/5 text-sm text-zinc-500 leading-relaxed">
                    <p class="mb-2"><strong class="text-zinc-400">Data.</strong> TUM RGB-D SLAM Dataset and Benchmark, sequence freiburg3 long office household, CC BY 4.0: J. Sturm, N. Engelhard, F. Endres, W. Burgard and D. Cremers, "A Benchmark for the Evaluation of RGB-D SLAM Systems", 2012. <a href="https://cvg.cit.tum.de/data/datasets/rgbd-dataset" target="_blank" rel="noopener">Dataset page</a>.</p>
                    <p class="mb-2"><strong class="text-zinc-400">Further reading.</strong> Z. Zhang and D. Scaramuzza, "A Tutorial on Quantitative Trajectory Evaluation for Visual(-Inertial) Odometry", 2018, <a href="https://doi.org/10.1109/IROS.2018.8593941" target="_blank" rel="noopener">doi:10.1109/IROS.2018.8593941</a>, on what a trajectory error is. T. Qin and S. Shen, "Online Temporal Calibration for Monocular Visual-Inertial Systems", 2018, <a href="https://arxiv.org/abs/1808.00692" target="_blank" rel="noopener">arXiv:1808.00692</a>, on why stamp offsets are a fact of real rigs.</p>
                </div>
            `},"objects-follow-the-pose":{title:"Objects that follow the pose",date:"Dec 1, 2026",author:"Calabi Research",readTime:"5 min read",tags:["RTSM Internals","Robustness","Localization"],excerpt:"An object memory has to decide what to do when the pose stream and the stored positions disagree. Ours moves the objects: what that buys, what it costs, and why it means the memory cannot report drift.",series:{name:"Pose health",part:2,total:7},content:`
                <p class="lead text-xl text-white mb-8 leading-relaxed font-light">
                    <strong class="block text-purple-400 mb-4 font-medium">An object memory has to decide what to do when the pose stream and the stored positions disagree. Ours moves the objects. Here is why, and what it costs.</strong>
                    The first post in this series showed that the depth residual on our report cannot measure pose drift: an injected drift of 0.2 metres per minute left it where it was. The reason is a design choice, not an accident, and it is worth stating on its own because every object map makes the same choice one way or the other, usually without saying so.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The rule
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    When the engine re-identifies a stored object on a keyframe, it replaces the stored position by 90 to 99 % with the position measured in that frame. Between keyframes the weight is 1 to 10 %. That is the whole rule. Its consequence is that a stored position is, at any moment, where the pose stream last placed the object on a keyframe, about one keyframe interval ago. On the recording behind our sample report that interval has a median of 0.97 s: 83 keyframes in 87 seconds.
                </p>
                <figure class="mb-10">
                    <svg viewBox="0 0 760 300" class="w-full rounded-xl border border-white/10 bg-zinc-950" role="img" aria-label="A rising line shows the pose error growing with time. A step line follows it, jumping up to the rising line at every keyframe and staying flat in between. The small triangles between the two lines are all the depth residual can see: one keyframe interval of drift.">
                        <defs>
                            <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#52525b"/></marker>
                        </defs>
                        <line x1="60" y1="250" x2="720" y2="250" stroke="#3f3f46" stroke-width="1.2" marker-end="url(#arr)"/>
                        <line x1="60" y1="250" x2="60" y2="40" stroke="#3f3f46" stroke-width="1.2" marker-end="url(#arr)"/>
                        <text x="690" y="272" fill="#a1a1aa" font-size="12" text-anchor="end">time</text>
                        <text x="66" y="52" fill="#a1a1aa" font-size="12">position error</text>
                        <g fill="#3b82f6" fill-opacity="0.35">
                            <polygon points="140,250 140,250 240,224 240,250"/>
                            <polygon points="240,224 340,198 340,224"/>
                            <polygon points="340,198 440,172 440,198"/>
                            <polygon points="440,172 540,146 540,172"/>
                            <polygon points="540,146 640,120 640,146"/>
                        </g>
                        <polyline points="140,250 240,250 240,224 340,224 340,198 440,198 440,172 540,172 540,146 640,146 640,120 700,120" fill="none" stroke="#a78bfa" stroke-width="2.5"/>
                        <line x1="140" y1="250" x2="700" y2="104" stroke="#e4e4e7" stroke-width="2"/>
                        <g stroke="#52525b" stroke-dasharray="3 3">
                            <line x1="240" y1="250" x2="240" y2="60"/><line x1="340" y1="250" x2="340" y2="60"/><line x1="440" y1="250" x2="440" y2="60"/><line x1="540" y1="250" x2="540" y2="60"/><line x1="640" y1="250" x2="640" y2="60"/>
                        </g>
                        <g fill="#71717a" font-size="11" text-anchor="middle">
                            <text x="240" y="76">keyframe</text><text x="340" y="76">keyframe</text><text x="440" y="76">keyframe</text><text x="540" y="76">keyframe</text><text x="640" y="76">keyframe</text>
                        </g>
                        <text x="700" y="98" fill="#e4e4e7" font-size="12" text-anchor="end">pose error (drift)</text>
                        <text x="700" y="140" fill="#a78bfa" font-size="12" text-anchor="end">error carried by the stored position</text>
                        <text x="390" y="238" fill="#60a5fa" font-size="12" text-anchor="middle">what the depth residual can see</text>
                    </svg>
                    <figcaption class="mt-3 text-sm text-zinc-500">The stored position is re-placed at every keyframe, so it carries the pose error of the last keyframe. The residual between the live sensor and the stored position only ever holds the growth since then.</figcaption>
                </figure>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    What the rule buys
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong class="text-white">Identities survive the pose stream.</strong> An object that was seen a minute ago and is seen again now is matched where the current pose says it should be, because its stored position has been moving with the pose all along. The alternative, positions frozen where the pose placed them when first seen, drifts away from the current frame of reference at the rate of the localization error and eventually projects into empty space, where the association creates a second copy. A study of semantic localization on a driving dataset shows the failure in numbers: built with ground-truth poses the reference map held 374 cars, built with a visual SLAM's estimated poses the same drive produced 437, and the authors attribute the difference to drift in the pose estimates making previously seen objects look like new instances to the mapping module.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong class="text-white">No deferred correction.</strong> Systems that keep positions anchored to past poses need a second mechanism to repair the map when the localization is corrected at a loop closure. Dense mapping does this by re-integrating stored frames with their corrected poses; one exploration system from 2022 describes exactly that, a real-time re-integration that rectifies the map's distortion once a loop closure corrects the drifted localization, with pruning to keep it affordable. A memory that follows the pose has nothing to re-integrate: when the pose jumps, every object jumps with it on its next sighting.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong class="text-white">The map stays usable while localization is imperfect.</strong> Object-map localization work treats recent objects as more trustworthy than old ones for the same reason; one pipeline for global localization against a reference object map adds guided relocalization specifically to counter the drift of odometry after the initial fix. Following the pose at every keyframe is the same instinct applied continuously.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    What it costs
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong class="text-white">The memory cannot report drift.</strong> Because stored positions carry the pose error of their last keyframe, the comparison between a stored position and the live sensor only ever holds the error accumulated since then, about a second's worth. That is why the residual's trend did not move under a drift of 0.2 metres per minute: the error it could hold was a few millimetres, and the projection on the optical axis cancelled most of that. The depth residual is a consistency check at the scale of one keyframe interval. It is not, and cannot be made into, a drift meter.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong class="text-white">A pose error shows up in matching first.</strong> In the injected-error test the re-observed share of likely-visible sightings fell by 0.5 to 2.6 points under the drifts and the step, while the depth trend changed by thousandths. Under a growing scale error, stored positions projected where nothing was detected and the losses moved from the association side to the detector side of the report. A reader of the ownership block would see that shift and, without knowing the cause, be told the detector is losing objects. The honest reading is that the detector is fine and the positions are wrong.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong class="text-white">A stamp lag looks like a geometric error.</strong> With the pose composed at the image stamp, a late pose stream places every object slightly behind where the camera really was, and re-places it with the same bias. The association's reprojection residual grows with the lag (3.7 px on the control, 10.5 px at 100 ms) and the depth trend moves too, more than under any drift. Nothing in the depth gap alone says which of the two it is.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The honest frame
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    An object memory that follows the pose is a consumer of localization, not a monitor of it. What it can say about the poses it was built from is limited to what the association sees: residuals between projected positions and detections, duplicates created next to known objects, ids that split. Those are real signals. The duplicates and the splits are on our report today; the residual is still in the ledgers, and the fourth post in this series shows how it separates a clock offset from a geometric error. A number that deserves the name drift needs something the memory does not have: a reference the pose stream can be compared against, or an estimator that reports on itself. The next post is about the second of those, and the last post about the first.
                </p>

                <div class="mt-12 pt-6 border-t border-white/5 text-sm text-zinc-500 leading-relaxed">
                    <p class="mb-2"><strong class="text-zinc-400">Sources.</strong> The engine's rule is in rtsm's working memory (<code>update_object</code>: weight 0.9 to 0.99 on a keyframe match, 0.01 to 0.1 otherwise); the keyframe statistics and the injected-error numbers are from the test in the first post of this series. Object duplication under drift: "View-Invariant Localization using Semantic Objects in Changing Environments", 2022, <a href="https://arxiv.org/abs/2209.14426" target="_blank" rel="noopener">arXiv:2209.14426</a>, section on the vehicle map (374 against 437 cars). Re-integration after loop closure: Y. Zhang, B. Zhou, L. Wang and S. Shen, "Exploration with Global Consistency Using Real-Time Re-integration and Active Loop Closure", 2022, <a href="https://arxiv.org/abs/2204.02693" target="_blank" rel="noopener">arXiv:2204.02693</a>. Guided relocalization against drift: J. Ankenbauer, P. C. Lusk, A. Thomas and J. P. How, "Global Localization in Unstructured Environments using Semantic Object Maps Built from Various Viewpoints", 2023, <a href="https://arxiv.org/abs/2303.04658" target="_blank" rel="noopener">arXiv:2303.04658</a>.</p>
                </div>
            `},"who-tells-you-the-robot-is-lost":{title:"Who tells you the robot is lost?",date:"Dec 15, 2026",author:"Calabi Research",readTime:"6 min read",tags:["Localization","Fleet operations","Evaluation"],excerpt:"Tracking states, rejected loop closures, particle spread, a health tracker on feature quality: the signals deployed localization systems keep about their own health, what each one means, and what none of them can say.",series:{name:"Pose health",part:3,total:7},content:`
                <p class="lead text-xl text-white mb-8 leading-relaxed font-light">
                    <strong class="block text-purple-400 mb-4 font-medium">Every estimator knows something about its own health. Little of it reaches the people who run the robots.</strong>
                    A fleet does not ask what its robots' trajectory error is; there is no reference trajectory on a warehouse floor to compute one against. It asks whether a robot's pose is trustworthy right now, and when it stopped being so. This post is about the signals that exist for that question inside the localization systems people actually deploy, what each one means, and what none of them can say.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Visual SLAM: a tracking state and a match count
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    ORB-SLAM3, the reference feature-based system, keeps an explicit notion of being lost. Its visual-inertial mode enters a "visually lost" state when fewer than 15 map points are tracked in the current frame, and recovers in two stages: a short-term stage in which the body state is propagated from the IMU and map points are searched in a wide image window around their predicted positions, and, after five seconds without recovery, a long-term stage in which a new map is started, to be merged with the old one when a place is recognised again. The state is a count crossing a threshold. The count is honest about one thing, the system's ability to see its own map, and silent about how good the pose was while the count held.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Graph SLAM: a loop closure the optimiser refuses
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    RTAB-Map, the open-source library behind a large share of indoor robots, exposes health at a different point: not in the tracker but in the graph. After a loop closure is added and the graph re-optimised, the library checks each link's change. If a link's transform moved by more than a set factor of its own translational variance (the parameter is RGBD/OptimizeMaxError, default 1), all loop-closure and proximity links added by the new node are rejected and the graph is kept as if no closure had happened. In practice the rejections surface as log lines with a reason: not enough inliers, too large a rotation. Those lines are a health signal nobody plots. A robot that keeps proposing closures the optimiser keeps refusing is a robot whose odometry and whose map disagree, and the disagreement has a timestamp.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    A depth camera's SDK: three enums and a confidence
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The ZED SDK's positional tracking reports an overall tracking state (OK, OFF, FPS_TOO_LOW, SEARCHING_FLOOR_PLANE, UNAVAILABLE), an odometry status for the frame-to-frame step (OK, UNAVAILABLE, INSUFFICIENT_FEATURES), a spatial-memory status that reports loop closures and relocalisations, and a confidence value on every pose. Two of those are worth a fleet's attention and are usually thrown away: INSUFFICIENT_FEATURES, which names the cause of a tracking failure rather than its fact, and the spatial-memory status, which says when the pose was corrected and therefore when every object placed before the correction may have moved.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Particle filters: spread, covariance and a classifier trained on the fleet
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    For the laser-scanner localization that most AMRs run against a prior map, the common proxy for health is the spread of the particle cloud or the covariance of the pose estimate. It is a proxy with a known failure: an estimator that has converged on the wrong hypothesis after a bump or a kidnapping is confident and wrong. One answer from the fleet side is to stop trusting any single statistic. A 2022 thesis from METU describes a Localization Performance Analyzer that extracts a set of features from a robot's sensors and its pose belief, feeds them to a neural network trained on data from multiple robots, and predicts whether the robot is lost or localized; it was built to recover a fleet of industrial AMRs from localization divergence and validated on data from AMRs working in the same facility. The lesson generalises: the labels came from the fleet's own history of being lost, not from a reference trajectory.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Store-scale visual-inertial SLAM: a health tracker on feature quality
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    At the scale of a grocery store, 1 700 to 3 700 square metres and an hour of walking, visual-inertial SLAM fails for ordinary reasons: motion blur, blank walls, a hand over the lens. Amazon's 2024 system for mapping such stores adds a health tracker that judges the quality of visual feature tracking, discards the measurements it judges faulty, and merges mapping sessions so that a failure does not cost the whole map. The authors report lower error than the visual-inertial packages they compared against, which on those recordings often produced badly wrong trajectories or lost track. The health tracker is the interesting part for this series: it is a runtime judgement of the estimator's inputs, made without ground truth, acted on automatically.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    What all of these have in common
                </h2>
                <ul class="list-disc pl-6 mb-8 space-y-3 text-zinc-400 font-light text-lg">
                    <li>They are introspective. Each one is computed from what the estimator can see of itself: counts of features, residuals of an optimisation, the spread of a belief. None needs a reference, which is why they exist in deployed systems at all.</li>
                    <li>They say "unhealthy", never "how far off". A tracking state, a rejected loop closure, a low confidence: each marks a moment, none bounds an error. Bounding the error is a different discipline with its own vocabulary, and the fifth post in this series is about it.</li>
                    <li>They can be confidently wrong. A converged particle filter on the wrong hypothesis, a visual tracker with many matches on distant points, an optimiser that accepted a plausible but false closure: the signal reads healthy while the pose is not.</li>
                    <li>They are rarely logged next to the data they explain. The log line exists; the recording exists; aligning the two after an incident is the work nobody budgeted for.</li>
                </ul>
                <figure class="mb-10">
                    <svg viewBox="0 0 760 230" class="w-full rounded-xl border border-white/10 bg-zinc-950" role="img" aria-label="Three rungs. Bottom: the estimator's own state, computed from its inputs, says healthy or not. Middle: consistency residuals between the map and the live sensor say whether the map agrees with what is seen. Top: an integrity bound says how far off the pose may be, and needs a reference or an error model.">
                        <g font-size="12">
                            <rect x="40" y="150" width="680" height="56" rx="10" fill="#18181b" stroke="#3f3f46"/>
                            <text x="60" y="173" fill="#e4e4e7" font-weight="600">The estimator's own state</text>
                            <text x="60" y="192" fill="#a1a1aa">tracking lost, loop closure rejected, low confidence, particle spread: computed from the estimator's inputs; says healthy or not</text>
                            <rect x="40" y="86" width="680" height="56" rx="10" fill="#18181b" stroke="#6d28d9"/>
                            <text x="60" y="109" fill="#e4e4e7" font-weight="600">Map against sensor</text>
                            <text x="60" y="128" fill="#a1a1aa">consistency residuals between stored positions and live measurements: says whether the map agrees with what is seen now</text>
                            <rect x="40" y="22" width="680" height="56" rx="10" fill="#18181b" stroke="#3b82f6"/>
                            <text x="60" y="45" fill="#e4e4e7" font-weight="600">Integrity</text>
                            <text x="60" y="64" fill="#a1a1aa">a bound on the pose error at a stated risk: needs a reference trajectory or a validated error model; the only rung that says how far off</text>
                        </g>
                    </svg>
                    <figcaption class="mt-3 text-sm text-zinc-500">Three kinds of pose-health signal. Deployed systems live on the bottom rung; a map that checks itself against the sensor adds the middle one; the top rung is where a drift number would come from.</figcaption>
                </figure>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    What a map adds, and what a fleet should log
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    A map that remembers objects can add the middle rung: residuals between what it stored and what the sensor shows now. Our report prints one of them, the depth gap between a stored position and the live depth at its pixel, and its ledgers carry a second, the reprojection residual of each re-identification; the first post in this series was about how little the first one can say about drift and how much the second one says about a clock offset. Residuals of that kind are a different axis from the estimator's state. The estimator can be healthy while the map disagrees with the sensor, because the map was built from poses that were wrong at the time, and the map can agree with the sensor while the estimator reports trouble, because the trouble is recent.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The practical advice is unglamorous. Log the estimator's state, its confidence, and every loop-closure acceptance or rejection, time-aligned with the recording the perception stack consumed. Log the map's residuals beside them. When something goes wrong on the floor, the question "was the pose good at 14:32:07" then has an answer with a source, instead of a replay and an argument. That is what a perception report is for.
                </p>

                <div class="mt-12 pt-6 border-t border-white/5 text-sm text-zinc-500 leading-relaxed">
                    <p class="mb-2"><strong class="text-zinc-400">Sources.</strong> C. Campos, R. Elvira, J. J. Gómez Rodríguez, J. M. M. Montiel and J. D. Tardós, "ORB-SLAM3: An Accurate Open-Source Library for Visual, Visual-Inertial and Multi-Map SLAM", 2020, <a href="https://arxiv.org/abs/2007.11898" target="_blank" rel="noopener">arXiv:2007.11898</a> (the visually lost state and its two stages). M. Labbé and F. Michaud, "RTAB-Map as an Open-Source Lidar and Visual SLAM Library for Large-Scale and Long-Term Online Operation", <a href="https://arxiv.org/abs/2403.06341" target="_blank" rel="noopener">arXiv:2403.06341</a> (RGBD/OptimizeMaxError). Stereolabs, <a href="https://docs.stereolabs.com/docs/development/zed-sdk/modules/positional-tracking/status-monitoring" target="_blank" rel="noopener">Positional Tracking Status</a>. U. S. Bingöl, "Localization Performance Estimation with Multi Sensor Fusion", M.Sc. thesis, METU, 2022, <a href="https://open.metu.edu.tr/handle/11511/97342" target="_blank" rel="noopener">hdl.handle.net/11511/97342</a>. S. Rahman, R. DiPietro, D. Kedarisetti and V. Kulathumani, "Large-scale indoor mapping with failure detection and recovery in SLAM", 2024, <a href="https://www.amazon.science/publications/large-scale-indoor-mapping-with-failure-detection-and-recovery-in-slam" target="_blank" rel="noopener">amazon.science</a>.</p>
                </div>
            `},"clock-offset-looks-like-drift":{title:"A 100 ms clock offset looks like drift until you check the turns",date:"Jan 12, 2027",author:"Calabi Research",readTime:"6 min read",tags:["Sensors","Localization","rtsm-eval"],excerpt:"A late pose stream produces errors that look like geometry. Where stamp offsets come from, what they do to an object memory, and the two measurements that tell a lag apart from a geometric error.",image:"/assets/blog/post4-reprojection-residual.png",series:{name:"Pose health",part:4,total:7},content:`
                <p class="lead text-xl text-white mb-8 leading-relaxed font-light">
                    <strong class="block text-purple-400 mb-4 font-medium">Timestamps are a sensor too. A late pose stream produces errors that look like geometry, and the fix is in the stamps, not in the map.</strong>
                    In the injected-error test behind this series, a pose stream stamped 100 ms late moved our report's depth trend more than a real position drift of 0.2 metres per minute did. Had the trend still been labelled "drift", a clock offset would have been reported as the larger drift. This post is about where such offsets come from, what they do to an object memory, and the two measurements that tell a lag apart from a geometric error.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Where an offset comes from
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    A measurement has a true instant, the middle of a camera's exposure or the moment an IMU sampled, and a stamp, which is whatever number the driver wrote into the message. The two differ whenever the stamp is taken on the host at arrival: transport, buffering and the driver's own processing all sit between them, and they vary from frame to frame. The manual of one visual-inertial sensor head describes three ways its device can stamp. It may stamp with its own clock, which starts at zero on power-up and drifts against the host's; those stamps can be translated into host time, which leaves a constant offset that a calibration has to find; or the device clock can be disciplined to the host over the network with PTP, after which the raw stamps are usable for fusion directly. The same manual puts the rest plainly: its cameras are stamped at mid-exposure on the same internal clock as its IMU, so on their own they need no further action, and anything else fused with them needs synchronising first.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The estimators that fuse cameras with inertial sensors learned to live with the residual offset. The authors of VINS-Mono observed that triggering and transmission delays leave the sensors temporally misaligned, that the misalignment "dramatically influences" the fusion, and that the offset can be estimated online by making it a variable of the same optimisation that estimates the camera and IMU states and the feature positions. Later work generalised the idea so that the offset lives in the residual itself and can be used with different optimisation-based front ends. The point for this post is not the method. It is that a well-built estimator treats the clock offset as a state to be estimated, because it is always there.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    What a lag does to an object memory
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Suppose the pose stream is correct but late by a lag, and the engine composes the pose at each image stamp, as ours does. Every image is then paired with the pose from one lag earlier. The error has two parts:
                </p>
                <ul class="list-disc pl-6 mb-8 space-y-3 text-zinc-400 font-light text-lg">
                    <li><strong class="text-white">A position error of minus the camera's velocity times the lag.</strong> At the sample recording's median speed of 0.26 m/s that is 8, 16 and 26 mm for 30, 60 and 100 ms. It is small, it is stationary, and the stored positions were placed with the same error, so the depth residual between them and the live sensor sees only the change of the camera's velocity since each position was set.</li>
                    <li><strong class="text-white">An orientation error of minus the turn rate times the lag.</strong> At the median turn rate of 11° per second that is 0.3 to 1.1°, and during a fast turn of a radian per second a 100 ms lag swings the projected pixel by about 54 pixels on this camera. The observed depth is then read off the object, on the background or on an occluder, and the gap scatters without a sign.</li>
                </ul>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Neither part grows with time. That is the signature that separates a lag from a drift on paper: a drift accumulates, a lag does not. On the page's depth trend the two were indistinguishable anyway, the 100 ms lag and the 0.05 m per minute drift changing it by −0.0038 and −0.0022 in the same direction. Two other quantities, both in the run's ledgers and neither on the page yet, do separate them.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The association's residual follows the turns
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    When the engine re-identifies a stored object it records the pixel distance between the stored position's projection and the detection it matched. Under the lags that residual grows in order, a median of 3.7 px on the control and 5.1, 7.5 and 10.5 px at 30, 60 and 100 ms, while every drift and the 5 cm step leave it at 3.7 to 3.9 px. More telling than its size is what it correlates with. Its rank correlation with the camera's turn rate is 0.15 on the control, 0.23 to 0.24 under every lag, 0.13 to 0.17 under the drifts and the step, and 0.06 under a growing scale error, whose residual is large (about 8 px) but indifferent to turning. A residual that rises and follows the turns is a lag. A residual that rises without following them is a geometric error of the stored positions.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The figure at the top of this post shows both: the residual's distribution per injected error on the left, its median climbing from 3.7 px on the control to 10.5 px under the 100 ms lag while staying near 3.8 px under the drifts and the step, and on the right its rank correlation with the turn rate, raised under every lag and nowhere else.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The depth gap against the camera's velocity
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The position part of a lag makes the signed depth gap proportional to minus the change of the camera's approach velocity since the object's position was last set, with the lag as the constant of proportionality. Regressing the gap on that velocity change, robustly, gives a lag estimate per run: −28 ms on the control, then −14, +18 and +43 ms under 30, 60 and 100 ms. The response is monotone and the two larger lags fall outside the control's confidence interval; the drifts, the step and the scale error stay inside it. The sensitivity is 0.5 to 0.7 of the injected lag rather than one, because the stored positions were placed with a lagged pose too and only the velocity change since then shows.
                </p>
                <figure class="mb-10">
                    <img src="/assets/blog/post4-lag-regression.png" alt="Three scatter panels of the signed depth gap against the change of the camera's approach velocity: flat on the control, tilting progressively under 60 and 100 ms of lag, with lag estimates of −28, +18 and +43 ms." class="w-full rounded-xl border border-white/10" loading="lazy" />
                    <figcaption class="mt-3 text-sm text-zinc-500">The gap against the camera's velocity change for the control and two lags. The slope of the fitted line is the lag estimate; the control's non-zero slope is the caveat in the next paragraph.</figcaption>
                </figure>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The caveat is the control's −28 ms. A recording with motion-capture poses should read zero, and it does not. Either the regressor carries a geometric bias on this scene, or the recording's own image stamps sit a few tens of milliseconds behind its motion capture, which nothing in the recording rules out. The test cannot decide which, so the estimate is honest only as a difference against a known-good run of the same rig, never as an absolute lag. That is also how it will appear in the report.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    What to do on a real rig
                </h2>
                <ul class="list-disc pl-6 mb-8 space-y-3 text-zinc-400 font-light text-lg">
                    <li><strong class="text-white">Stamp at the sensor, not at the host.</strong> Hardware triggers, mid-exposure stamps and a PTP-disciplined device clock remove the variable part of the offset. A constant residual is a calibration problem; a variable one is a fusion problem.</li>
                    <li><strong class="text-white">Keep the raw sample stamps of the pose stream.</strong> An engine that composes the pose at the image stamp cannot see a lag in the stream; the lag is zero by construction on its side. The stamps of the pose samples, kept beside the image stamps, are what makes it measurable later.</li>
                    <li><strong class="text-white">Watch the association residual, not only the depth.</strong> A rising reprojection residual that follows the turns is the cheapest lag detector available, and it comes from data the engine already writes.</li>
                    <li><strong class="text-white">Compare against your own good run.</strong> Both measurements above have a non-zero null that belongs to the rig and the scene. Report them as a difference from the last run you trusted, with the interval.</li>
                </ul>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Our report lists the pose-image stamp offset as not measured, because it is. The two quantities in this post are the plan for changing that, as differences against a known-good run, never as absolute lags. If a page ever says "drift" to you, check the stamps first.
                </p>

                <div class="mt-12 pt-6 border-t border-white/5 text-sm text-zinc-500 leading-relaxed">
                    <p class="mb-2"><strong class="text-zinc-400">Sources.</strong> T. Qin and S. Shen, "Online Temporal Calibration for Monocular Visual-Inertial Systems", 2018, <a href="https://arxiv.org/abs/1808.00692" target="_blank" rel="noopener">arXiv:1808.00692</a>. "Universal Online Temporal Calibration for Optimization-based Visual-Inertial Navigation Systems", 2025, <a href="https://arxiv.org/abs/2501.01788" target="_blank" rel="noopener">arXiv:2501.01788</a>. Sevensense Robotics, Core Research manual, <a href="https://github.com/sevensense-robotics/core_research_manual/blob/master/pages/time_synchronization.md" target="_blank" rel="noopener">Time synchronization</a>. The lag numbers are from the injected-error test described in the first post of this series, on the TUM RGB-D fr3 long office household sequence (CC BY 4.0).</p>
                </div>
            `},"integrity-not-accuracy":{title:"Integrity, not accuracy",date:"Jan 26, 2027",author:"Calabi Research",readTime:"5 min read",tags:["Localization","Safety","Evaluation"],excerpt:"Aviation answered 'can I trust this position?' decades before robotics asked it, and the answer was never an accuracy number. Alert limits, protection levels, and what they ask of a perception report.",series:{name:"Pose health",part:5,total:7},content:`
                <p class="lead text-xl text-white mb-8 leading-relaxed font-light">
                    <strong class="block text-purple-400 mb-4 font-medium">Aviation answered "can I trust this position?" decades before robotics asked it. The answer was never an accuracy number.</strong>
                    Earlier posts in this series were about what a map and an estimator can say about pose health from the inside: consistency residuals, tracking states, rejected loop closures. None of them bounds an error. The discipline that does bound errors grew up in satellite navigation, and its vocabulary is starting to reach map-based localization for robots. This post is about that vocabulary and what it asks of a perception report.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The definition
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The United States Federal Radionavigation Plan defines integrity as the measure of the trust that can be placed in the correctness of the information a positioning system supplies, and adds that it includes the system's ability to provide timely warnings when it should not be used. Two things are in that sentence. Trust, which is a statement about the probability that the position is wrong by more than some amount. And warnings, which is a statement about time: how long after the position goes bad the user is told. Accuracy, the average size of the error, is in neither.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The machinery built on that definition has a small vocabulary. An <strong class="text-white">alert limit</strong> is the error beyond which the operation is unsafe; it belongs to the operation, not to the sensor. A <strong class="text-white">protection level</strong> is an upper bound on the position error that the system computes about itself, valid at a stated <strong class="text-white">integrity risk</strong>, the probability that the true error exceeds the bound without warning. If the protection level is below the alert limit the system is available for the operation; if the true error exceeds the protection level the system is giving misleading information, and if it exceeds the alert limit as well, hazardously so. <strong class="text-white">Fault detection and exclusion</strong> is the process of finding the measurement that broke the assumptions and dropping it; in satellite receivers it uses the redundancy among satellites, and the receiver-autonomous version of it is what let aviation accept GPS for non-precision approaches.
                </p>
                <figure class="mb-10">
                    <svg viewBox="0 0 760 200" class="w-full rounded-xl border border-white/10 bg-zinc-950" role="img" aria-label="A horizontal axis of position error with three marks: the true error, unknown to the system; the protection level, the bound the system computes about itself; and the alert limit, set by the operation. The system is available when the protection level is below the alert limit, and misleading when the true error is above the protection level.">
                        <line x1="50" y1="110" x2="720" y2="110" stroke="#52525b" stroke-width="2"/>
                        <text x="52" y="150" fill="#a1a1aa" font-size="12">0</text>
                        <text x="720" y="150" fill="#a1a1aa" font-size="12" text-anchor="end">position error</text>
                        <rect x="50" y="98" width="370" height="24" fill="#3b82f6" fill-opacity="0.18"/>
                        <text x="235" y="86" fill="#93c5fd" font-size="12" text-anchor="middle">errors the bound covers</text>
                        <g>
                            <line x1="190" y1="96" x2="190" y2="124" stroke="#e4e4e7" stroke-width="2"/>
                            <text x="190" y="148" fill="#e4e4e7" font-size="12" text-anchor="middle">true error</text>
                            <text x="190" y="164" fill="#71717a" font-size="11" text-anchor="middle">unknown to the system</text>
                        </g>
                        <g>
                            <line x1="420" y1="90" x2="420" y2="130" stroke="#a78bfa" stroke-width="2.5"/>
                            <text x="420" y="148" fill="#a78bfa" font-size="12" text-anchor="middle">protection level</text>
                            <text x="420" y="164" fill="#71717a" font-size="11" text-anchor="middle">the bound the system computes, at a stated risk</text>
                        </g>
                        <g>
                            <line x1="600" y1="90" x2="600" y2="130" stroke="#f97316" stroke-width="2.5"/>
                            <text x="600" y="148" fill="#f97316" font-size="12" text-anchor="middle">alert limit</text>
                            <text x="600" y="164" fill="#71717a" font-size="11" text-anchor="middle">set by the operation</text>
                        </g>
                        <text x="510" y="60" fill="#a1a1aa" font-size="12" text-anchor="middle">protection level below the alert limit: available</text>
                        <text x="510" y="40" fill="#a1a1aa" font-size="12" text-anchor="middle">true error above the protection level: misleading</text>
                    </svg>
                    <figcaption class="mt-3 text-sm text-zinc-500">The three quantities of an integrity statement. Only one of them, the alert limit, is known for certain; the other two are what the system and the operator argue about.</figcaption>
                </figure>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Reaching maps and cameras
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The vocabulary transfers; the methods do not, because the error model that satellite receivers enjoy, a handful of ranges with known noise and a geometry that can be checked for consistency, has no equivalent for a camera matched against a map. A 2025 survey in <em>Sensors</em> that set out to extend the definitions of integrity and protection level to localization in general, SLAM included, counted the literature and found 73.3 % of the papers about satellite-based methods and 26.7 % about everything else, fusion, optimisation and SLAM, with few of those computing a protection level at all. Its authors point to robust modelling, which combines quantifying the error with qualifying it, as a promising route.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The clearest attempt to compute a protection level for a camera is a 2021 study that matches camera images against a LiDAR-built 3D map of an urban environment. It fits a Gaussian mixture to the position error using a learned model and outlier weighting, then finds the bound by a numerical search over the mixture, and validates on real urban drives against alert limits of 0.85 m laterally and 1.50 m along the road. What makes it integrity rather than accuracy work is the shape of the claim: not "our error is x", but "with this probability the error is below y, and here is the evidence that the bound held".
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    What this asks of a perception report
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    We do not compute protection levels; nobody can for an object memory without a validated error model, and the first post in this series was an example of what happens when a number is read as if it had one. What the integrity frame does give a report is a set of habits, and we have tried to build the report around them.
                </p>
                <ul class="list-disc pl-6 mb-8 space-y-3 text-zinc-400 font-light text-lg">
                    <li><strong class="text-white">A threshold beside every number.</strong> An integrity statement is a comparison, a bound against a limit. Our trust block prints the declared threshold next to each check and the verdict it produced, so the reader sees the limit, not only the value.</li>
                    <li><strong class="text-white">A printed list of what is not measured.</strong> The "timely warning" half of the definition includes warning that no answer exists. The report carries a not-measured list, and after the injected-error test it gained an entry for pose drift beside the one for trajectory error.</li>
                    <li><strong class="text-white">No claim without its evidence.</strong> A residual that was tested against injected faults can say what it detected and what it missed. A residual that was not tested is a number with a label, and a label is not a bound.</li>
                    <li><strong class="text-white">Separate the three rungs.</strong> The estimator's own state, the map's agreement with the sensor, and an error bound are different kinds of statement. A report should not let the first two wear the third's clothes, which is what "Localization 0.122 m" did.</li>
                </ul>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The hard part is unchanged. A protection level for a visual map needs an error distribution validated against ground truth, which means a reference trajectory somewhere in the development loop even if never on the floor. That is the subject of the last post in this series. Until a report has that, its honest localization statement is a residual, a threshold, and the sentence "this interval deserves a look".
                </p>

                <div class="mt-12 pt-6 border-t border-white/5 text-sm text-zinc-500 leading-relaxed">
                    <p class="mb-2"><strong class="text-zinc-400">Sources.</strong> E. Maharmeh, Z. Alsayed and F. Nashashibi, "A Comprehensive Survey on the Integrity of Localization Systems", <em>Sensors</em> 25(2):358, 2025, <a href="https://doi.org/10.3390/s25020358" target="_blank" rel="noopener">doi:10.3390/s25020358</a> (the Federal Radionavigation Plan definition, the 73.3 % and 26.7 % counts, the protection-level definition). "Data-Driven Protection Levels for Camera and 3D Map-based Safe Urban Localization", 2021, <a href="https://arxiv.org/abs/2101.06379" target="_blank" rel="noopener">arXiv:2101.06379</a> (the camera-against-LiDAR-map protection levels and the alert limits used in its experiments).</p>
                </div>
            `},"break-it-on-purpose":{title:"Break it on purpose",date:"Feb 9, 2027",author:"Calabi Research",readTime:"6 min read",tags:["Evaluation","Methods","rtsm-eval"],excerpt:"A health metric that has never seen a known fault is a label. The tools that exist for injecting faults into robot perception, how we did it so the result could be trusted, and a six-row checklist.",series:{name:"Pose health",part:6,total:7},content:`
                <p class="lead text-xl text-white mb-8 leading-relaxed font-light">
                    <strong class="block text-purple-400 mb-4 font-medium">A health metric that has never seen a known fault is a label. The way to find out what it detects is to break the input on purpose, by a known amount, and read the metric.</strong>
                    The first post in this series reported such a test on our own report: nine copies of a public recording with injected pose errors, and a depth residual that turned out not to measure drift. This post is about the method: what exists for it in robotics, how we did it so that the result could be trusted, and a checklist for anyone who wants to put a number on a page and call it a diagnostic.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    The idea
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    A diagnostic is a claim of the form "when this fault happens, that number moves". Without labels the claim cannot be checked on recordings as they come, because nobody knows which recordings carry the fault. It can be checked by making the fault happen: take a recording, change exactly one thing in it by a known amount, run the unchanged system, and compare what the number did with what the claim predicted. Software testing calls the pattern metamorphic testing, a known transformation of the input with a predicted effect on the output. Robotics has been building tools for the input side of it for a while.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    What exists
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong class="text-white">Perturbation benchmarks for SLAM.</strong> The most systematic work is a 2024 pipeline for RGB-D SLAM robustness, published in two versions, that defines a taxonomy of perturbations, 16 kinds of image corruption, 4 of depth corruption, 3 of trajectory perturbation and the misalignment between sensor streams, composes them procedurally on clean simulated scenes, and evaluates SLAM systems on the result, neural and non-neural alike. Its finding is the one every such study finds: a system's accuracy on the clean benchmark says little about its behaviour under sensor and motion perturbations.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong class="text-white">Scenario tooling.</strong> Scenario Execution for Robotics, a 2024 library from Intel Labs, describes experiments in a scenario language with behaviour trees, runs them against several simulators or a real robot from the same description, and sweeps parameter ranges; its examples include a node that adds noise to or drops a share of a laser scan's returns. It is the automated-driving habit of scenario-based testing brought to ROS 2.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong class="text-white">Middleware fault injection.</strong> Between a sensor and its consumers, a ROS 2 node can corrupt, drop or delay messages per topic from a configuration file. Community frameworks exist for exactly this (one, published in 2026, proxies topics and services, applies faults from YAML scenarios such as odometry bias, scan dropout and command delay, and checks expected outcomes with assertions), and research systems use the same device to evaluate their own tooling, intercepting sensor topics and injecting corruption, drops and delays at configured rates. For cameras specifically, tools such as CamFITool apply image faults to stored libraries or to live streams at chosen rates.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    <strong class="text-white">The gap.</strong> Nearly all of this perturbs the input and measures the system's output error, a trajectory error against ground truth, a map quality score. Very little of it measures whether a diagnostic noticed. For a report whose job is to tell an engineer which part of a stack failed, that is the question, and it changes what the experiment has to look like.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    How we did it
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The recording was a public RGB-D sequence with motion-capture poses in its own transform tree. The tool copied the recording and rewrote one thing: the moving transform between the world and the camera. Position drift at three rates, a step, a growing scale error and three stamp lags, one per copy, plus an identity copy that changed nothing. Four properties made the result trustworthy, and they are the part worth copying.
                </p>
                <ul class="list-disc pl-6 mb-8 space-y-3 text-zinc-400 font-light text-lg">
                    <li><strong class="text-white">Byte-exact everything else.</strong> Every message other than the rewritten transform was written back unchanged, and one hash over all of them in order, source against copy, proved it for each copy. The identity copy proved the serialisation round trip itself.</li>
                    <li><strong class="text-white">Verified at the consumer.</strong> The engine composes the pose at each image stamp by interpolating between transform samples. The verifier did the same, on the source and on the copy, at several stamps, and compared the difference with the injected error. The first version of the verifier compared against the ideal formula and flagged two copies by a few micrometres at the first frame; the copies were right and the verifier was idealised. That is what a verifier is for.</li>
                    <li><strong class="text-white">The product's own pipeline, unchanged.</strong> Each copy went through the same command a customer runs, with the same engine release and configuration as the published sample, three repeats of each perturbed copy and one of the identity copy. The numbers read back were the report's own, computed by the report's own code.</li>
                    <li><strong class="text-white">A measured null.</strong> The unperturbed recording ran again as the control, and every number's spread over the repeats was recorded. On this engine the spread was exactly zero, which left one floor to quote: how far the numbers moved under injections that were not the fault in question.</li>
                </ul>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    A checklist for any health metric
                </h2>
                <div class="overflow-x-auto mb-8">
                    <table class="w-full text-left text-sm text-zinc-400 border-collapse border border-white/10">
                        <thead>
                            <tr class="bg-white/5 text-white">
                                <th class="p-4 border-b border-white/10 font-medium">Check</th>
                                <th class="p-4 border-b border-white/10 font-medium">Question it answers</th>
                                <th class="p-4 border-b border-white/10 font-medium">What it showed on our depth trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-white/5"><td class="p-4 font-mono text-purple-300">null</td><td class="p-4">How much does the metric vary with nothing injected?</td><td class="p-4">windowed medians swing ±0.03 m; the level-shift detector fires at 69.7 s on the clean recording</td></tr>
                            <tr class="border-b border-white/5"><td class="p-4 font-mono text-purple-300">ladder</td><td class="p-4">Is the response monotone in the size of the fault, and where is the floor?</td><td class="p-4">0.02, 0.05, 0.2 m/min moved it by −0.0012, −0.0022, −0.0005: not monotone, no floor to quote</td></tr>
                            <tr class="border-b border-white/5"><td class="p-4 font-mono text-purple-300">confounders</td><td class="p-4">How much do faults that are not the one claimed move the metric?</td><td class="p-4">a 100 ms lag moved it more than any drift; a scale error flipped its sign</td></tr>
                            <tr class="border-b border-white/5"><td class="p-4 font-mono text-purple-300">separability</td><td class="p-4">Is there a quantity that responds to one fault and not the others?</td><td class="p-4">the association's reprojection residual rises with the lag and follows the turns only then</td></tr>
                            <tr class="border-b border-white/5"><td class="p-4 font-mono text-purple-300">ceiling</td><td class="p-4">From the mechanism, how much could the metric move at all?</td><td class="p-4">the memory re-places positions every keyframe: at most −0.009 × the drift rate here, below the null's variation</td></tr>
                            <tr><td class="p-4 font-mono text-purple-300">provenance</td><td class="p-4">Did the perturbation change only what it claims?</td><td class="p-4">one hash per copy over every untouched message; the identity copy as the round-trip proof</td></tr>
                        </tbody>
                    </table>
                </div>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The ceiling check is the one most often skipped and the one that would have saved us the label. If the mechanism says a metric cannot move more than the null varies, no amount of data will make it a detector, and the honest move is to rename it before the ladder is even run.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Publish the misses
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The table a test like this produces has a column for what was injected and a column for what was recovered, and the rows where the second column did not move are the useful ones. They are what a reader needs to know what the page can and cannot see, and they are what makes the rows that did move believable. Our table is in the first post of this series, misses included. A perception report should be held to the same standard it holds a perception stack to: say what the number measures, print what it does not, show the test.
                </p>

                <div class="mt-12 pt-6 border-t border-white/5 text-sm text-zinc-500 leading-relaxed">
                    <p class="mb-2"><strong class="text-zinc-400">Sources.</strong> X. Xu et al., "Customizable Perturbation Synthesis for Robust SLAM Benchmarking", 2024, <a href="https://arxiv.org/abs/2402.08125" target="_blank" rel="noopener">arXiv:2402.08125</a>, and its extended version "From Perfect to Noisy World Simulation: Customizable Embodied Multi-modal Perturbations for SLAM Robustness Benchmarking", 2024, <a href="https://arxiv.org/abs/2406.16850" target="_blank" rel="noopener">arXiv:2406.16850</a> (the taxonomy and the Noisy-Replica benchmark). F. Pasch, F. Mirus, Y. Zhang and K.-U. Scholl, "Scenario Execution for Robotics", 2024, <a href="https://arxiv.org/abs/2409.07080" target="_blank" rel="noopener">arXiv:2409.07080</a>. ros2_fault_injection, "C++ fault injection framework for ROS 2 topics, services, and assertions", Open Robotics Discourse, 2026, <a href="https://discourse.openrobotics.org/t/ros2-fault-injection-c-fault-injection-framework-for-ros-2-topics-services-and-assertions/57998" target="_blank" rel="noopener">discourse.openrobotics.org</a>. "ROS Help Desk: GenAI Powered, User-Centric Framework for ROS Error Diagnosis and Debugging", 2025, <a href="https://arxiv.org/abs/2507.07846" target="_blank" rel="noopener">arXiv:2507.07846</a> (its fault-injection node). CamFITool, <a href="https://github.com/inomuh/camfitool" target="_blank" rel="noopener">github.com/inomuh/camfitool</a>. The injected-error test is described in the first post of this series.</p>
                </div>
            `},"ate-rpe-and-the-missing-reference":{title:"What ATE and RPE measure, and why a map cannot report drift",date:"Feb 23, 2027",author:"Calabi Research",readTime:"4 min read",tags:["Evaluation","Localization","Methods"],excerpt:"Two numbers summarise a trajectory's quality, and both need a second trajectory to exist. What they are, why a single pose stream cannot produce them, and how a reference will reach the report.",series:{name:"Pose health",part:7,total:7},content:`
                <p class="lead text-xl text-white mb-8 leading-relaxed font-light">
                    <strong class="block text-purple-400 mb-4 font-medium">Two numbers summarise the quality of a trajectory. Both need a second trajectory to exist.</strong>
                    This series began with a slope on our report that had been labelled "drift" and could not measure it. The measurement that can is older than the report, has two standard forms, and needs something a map on a robot does not have. This last post is about what those two numbers are, why a single pose stream cannot produce them, and how a reference will reach the report when a customer has one.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Two trajectories, aligned first
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    A trajectory error compares an estimated trajectory with a reference one, pose by pose, after associating the two by timestamp. Before any difference can be taken the two have to be put in one frame, and how much freedom the alignment is allowed depends on what the sensor could observe. The tutorial on quantitative trajectory evaluation that most of the field cites makes that the first decision: a stereo or depth camera observes scale, so a rigid transform aligns the trajectories; a single camera does not, so the alignment must include a scale; a visual-inertial system observes gravity, so only the heading and the position are free. Choosing a looser alignment than the sensor justifies hides error; choosing a tighter one invents it.
                </p>
                <figure class="mb-10">
                    <svg viewBox="0 0 760 260" class="w-full rounded-xl border border-white/10 bg-zinc-950" role="img" aria-label="Two trajectories drawn as curves, a reference and an estimate that diverges from it. Short vertical links between matching poses are the absolute trajectory error. A bracket over a short segment of both curves marks the relative pose error over an interval: the difference between how far each trajectory moved in that interval.">
                        <path d="M60,200 C160,120 260,210 360,140 S560,80 700,110" fill="none" stroke="#e4e4e7" stroke-width="2.5"/>
                        <path d="M60,200 C160,126 260,222 360,160 S560,112 700,154" fill="none" stroke="#a78bfa" stroke-width="2.5" stroke-dasharray="6 4"/>
                        <g stroke="#3b82f6" stroke-width="1.5">
                            <line x1="200" y1="158" x2="200" y2="165"/><line x1="300" y1="186" x2="300" y2="198"/><line x1="400" y1="131" x2="400" y2="151"/><line x1="500" y1="108" x2="500" y2="136"/><line x1="600" y1="99" x2="600" y2="135"/><line x1="680" y1="106" x2="680" y2="148"/>
                        </g>
                        <text x="600" y="190" fill="#60a5fa" font-size="12">absolute trajectory error: pose against pose, after alignment</text>
                        <path d="M420,60 L420,50 L520,50 L520,60" fill="none" stroke="#f97316" stroke-width="1.5"/>
                        <text x="470" y="42" fill="#f97316" font-size="12" text-anchor="middle">relative pose error over an interval</text>
                        <text x="470" y="78" fill="#71717a" font-size="11" text-anchor="middle">how far each trajectory moved, compared</text>
                        <text x="72" y="236" fill="#e4e4e7" font-size="12">reference</text>
                        <text x="160" y="236" fill="#a78bfa" font-size="12">estimate</text>
                    </svg>
                    <figcaption class="mt-3 text-sm text-zinc-500">The two standard trajectory errors. One compares poses after a global alignment; the other compares motion over short intervals and needs no global alignment at all.</figcaption>
                </figure>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Absolute trajectory error
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    After alignment, the absolute trajectory error is the set of position differences between matched poses, almost always summarised as their root mean square. It was defined for RGB-D SLAM evaluation in 2012 together with the dataset behind this series' test, and the evaluation scripts that came with that dataset fixed the convention. It is a global measure: an estimate that drifts early and then tracks perfectly carries the early error through every later pose, and a few badly wrong poses dominate the root mean square. A 2022 critique makes that last point its title, showing that in the presence of a handful of outliers the absolute error stops reflecting how accurate the rest of the trajectory is, and proposes a variant built on geometric medians and winsorised distances that does.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Relative pose error, which is what drift means
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    The relative pose error compares motion rather than position: over an interval, a second or a hundred metres, how much the estimate moved against how much the reference moved. Averaged over all intervals of that length it is a drift rate, metres of error per second or per metre travelled, and because it looks only at the change inside each interval it needs no global alignment. When a datasheet or a publication says "drift", this is the number it means, and it always comes with the interval it was computed over. The same estimator can show small relative error over one second and large error over a hundred metres; both are true, and neither is the other.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    Why a map cannot produce either
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Both numbers are differences between two trajectories. A map built on a robot has one, the estimator's, and the comparisons a map can make are between itself and the sensor, which is what the earlier posts in this series were about. A consistency residual can say that the map and the live depth disagree by so much at this moment; it cannot say that the pose is off by so much, because the stored positions were placed by the same pose. The datasets that report trajectory errors could do so because someone put a motion-capture system around the scene: for the recording behind our sample, eight tracking cameras at 100 Hz. A warehouse has no such thing, and a report should not pretend otherwise. Ours prints "trajectory error: not measured", and after the injected-error test, "pose drift: not measured" beside it.
                </p>

                <h2 class="text-3xl font-heading font-medium text-white mt-16 mb-8 group flex items-center gap-4">
                    <span class="w-8 h-px bg-purple-500/50"></span>
                    How a reference will reach the report
                </h2>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Some customers do have a reference for some recordings: a motion-capture volume in the lab, a surveyed track, a total station, or simply a second, independent localization system running alongside the one under test. The plan is an optional reference-pose input to the report: a ground-truth file in the dataset convention or a second pose topic in the recording. With it, the report will align the two trajectories using the transform the sensor justifies, print the absolute error and the relative error over one-second and ten-second windows beside the consistency residual, and state the alignment it used. If the reference is itself an estimator, the page will say so, because then the number is a cross-check between two opinions and not a measurement against the truth.
                </p>
                <p class="mb-6 text-zinc-400 leading-relaxed font-light text-lg">
                    Until a recording carries a reference, the localization section says what it can: a residual, a threshold, and the sentence "this interval deserves a look". If a vendor shows you a drift number, the three questions that make it a measurement are: against what reference, aligned how, and over what interval.
                </p>

                <div class="mt-12 pt-6 border-t border-white/5 text-sm text-zinc-500 leading-relaxed">
                    <p class="mb-2"><strong class="text-zinc-400">Sources.</strong> J. Sturm, N. Engelhard, F. Endres, W. Burgard and D. Cremers, "A Benchmark for the Evaluation of RGB-D SLAM Systems", 2012, and the <a href="https://cvg.cit.tum.de/data/datasets/rgbd-dataset" target="_blank" rel="noopener">TUM RGB-D dataset page</a> (the absolute and relative error definitions, the evaluation tools, the motion-capture ground truth). Z. Zhang and D. Scaramuzza, "A Tutorial on Quantitative Trajectory Evaluation for Visual(-Inertial) Odometry", 2018, <a href="https://doi.org/10.1109/IROS.2018.8593941" target="_blank" rel="noopener">doi:10.1109/IROS.2018.8593941</a> (the alignment by sensing modality). S. H. Lee and J. Civera, "What's Wrong with the Absolute Trajectory Error?", 2022, <a href="https://arxiv.org/abs/2212.05376" target="_blank" rel="noopener">arXiv:2212.05376</a>.</p>
                </div>
            `}},r={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11},a=t=>{const e=/^([A-Z][a-z]{2}) (\d{1,2}), (\d{4})$/.exec(String(t).trim());return e?new Date(Number(e[3]),r[e[1]],Number(e[2])):new Date(NaN)},n=(t,e=new Date)=>a(t.date)<=e,o=()=>Object.entries(i).map(([t,e])=>({slug:t,...e})),l=(t=new Date)=>o().filter(e=>n(e,t)).sort((e,s)=>a(s.date)-a(e.date)),d=(t=new Date)=>{const e=new Set;return l(t).filter(s=>s.series?e.has(s.series.name)?!1:(e.add(s.series.name),!0):!0)},h=t=>o().filter(e=>e.series&&e.series.name===t).sort((e,s)=>e.series.part-s.series.part);export{i as a,n as i,d as l,l as p,h as s};
