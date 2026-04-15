import { Smartphone, Wifi, Radio, ScanLine, Settings, Activity } from 'lucide-react';

export const CalabiLens = () => {
    return (
        <section id="calabi-lens" className="py-24 px-6 bg-black relative overflow-hidden scroll-mt-32">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
                        <Smartphone className="w-3.5 h-3.5" />
                        Mobile Sensor Input
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-medium text-white mb-4">
                        Calabi Lens
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Turn your iPhone into a real-time 3D sensor. Stream RGB, LiDAR depth, and 6-DoF pose to RTSM over Wi-Fi.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Phone Screenshots — side by side */}
                    <div className="flex justify-center items-end gap-4 md:gap-6">
                        {/* Connected / streaming view */}
                        <div className="relative">
                            <div className="w-[180px] md:w-[240px] rounded-[2rem] border-[5px] border-zinc-700 bg-black overflow-hidden shadow-2xl shadow-cyan-900/20">
                                <img
                                    src="/assets/calabi-lens/connected.jpeg"
                                    alt="Calabi Lens connected and streaming"
                                    className="w-full"
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono whitespace-nowrap">
                                Streaming
                            </div>
                        </div>
                        {/* Settings view */}
                        <div className="relative">
                            <div className="w-[180px] md:w-[240px] rounded-[2rem] border-[5px] border-zinc-700 bg-black overflow-hidden shadow-2xl shadow-cyan-900/10">
                                <img
                                    src="/assets/calabi-lens/settings.jpeg"
                                    alt="Calabi Lens streaming settings"
                                    className="w-full"
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-zinc-700/60 border border-zinc-600/40 text-zinc-400 text-[10px] font-mono whitespace-nowrap">
                                Settings
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-6">
                        {[
                            {
                                icon: <Radio className="w-5 h-5 text-cyan-400" />,
                                title: "Real-time WebSocket streaming",
                                desc: "RGB frames, LiDAR depth maps, and camera poses streamed at up to 20 Hz over local Wi-Fi."
                            },
                            {
                                icon: <ScanLine className="w-5 h-5 text-cyan-400" />,
                                title: "On-device SLAM",
                                desc: "Optional RTAB-Map integration with loop closure detection and pose graph optimization."
                            },
                            {
                                icon: <Activity className="w-5 h-5 text-cyan-400" />,
                                title: "H.264 hardware encoding",
                                desc: "VideoToolbox-accelerated compression for low-latency streaming at ~2ms per frame."
                            },
                            {
                                icon: <Settings className="w-5 h-5 text-cyan-400" />,
                                title: "Fully configurable",
                                desc: "Capture rate, RGB format, depth encoding, pose format, and confidence maps — all adjustable."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-cyan-500/20 transition-colors group">
                                <div className="p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors h-fit">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}

                        <a
                            href="https://github.com/calabi-inc/rtsm-arkit-client"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors mt-2"
                        >
                            View on GitHub
                            <span className="text-xs">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
