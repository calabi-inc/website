import { Play } from 'lucide-react';
import { useState, useRef } from 'react';

export const DemoVideo = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <section className="py-24 px-6 bg-black relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-heading font-medium text-white mb-4">
                        See it in action
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        RTSM building a persistent 3D world state from RGB-D streams in real time.
                    </p>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-900/10 bg-[#050505] aspect-video group">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        poster="/assets/rtsm-demo-poster.jpg"
                        preload="none"
                        controls={isPlaying}
                        muted
                        playsInline
                        onEnded={() => setIsPlaying(false)}
                    >
                        <source src="/assets/rtsm-demo.mp4" type="video/mp4" />
                    </video>

                    {!isPlaying && (
                        <button
                            onClick={handlePlay}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors cursor-pointer"
                            aria-label="Play demo video"
                        >
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                                <Play className="w-8 h-8 text-white ml-1" fill="white" />
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};
