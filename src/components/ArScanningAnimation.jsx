import React, { useEffect, useState } from 'react';
import { Scan, Car, Coffee, Info, Glasses } from 'lucide-react';
import streetViewImg from '../assets/street_view_ar_base.png';

export const ArScanningAnimation = () => {
    // Phases:
    // 0: Blur (No Glasses / Default Vision)
    // 1: Clear (Glasses On / Focus)
    // 2: Scan (HUD Initialize)
    // 3: Detect (Boxes appear)
    // 4: Tag (Semantics appear)
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const cycle = () => {
            setPhase(0);
            setTimeout(() => setPhase(1), 2000); // Clear view
            setTimeout(() => setPhase(2), 3500); // Start Scan
            setTimeout(() => setPhase(3), 5000); // Show Boxes
            setTimeout(() => setPhase(4), 6000); // Show Tags
        };
        cycle();
        const interval = setInterval(cycle, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[400px] bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-yellow-500/5 group">

            {/* Background Image Layer */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={streetViewImg}
                    alt="Street View"
                    className={`w-full h-full object-cover transition-all duration-[1500ms] ease-out scale-105
                        ${phase === 0 ? 'blur-[8px] opacity-80' : 'blur-0 opacity-100'}
                    `}
                />
            </div>

            {/* Glasses/Vignette Effect */}
            <div className={`absolute inset-0 bg-black/20 pointer-events-none transition-opacity duration-1000 ${phase === 0 ? 'opacity-50' : 'opacity-0'}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/40 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-3">
                        <Glasses className="w-5 h-5 text-white/50" />
                        <span className="text-white/50 text-sm font-medium">Vision Augmentation Inactive</span>
                    </div>
                </div>
            </div>

            {/* RTSM HUD Overlay Container */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>

                {/* HUD Corners */}
                <div className="absolute inset-4 border border-white/10 rounded-[2rem] opacity-50"></div>
                <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-yellow-500/50 rounded-tl-xl"></div>
                <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-yellow-500/50 rounded-tr-xl"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-yellow-500/50 rounded-bl-xl"></div>
                <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-yellow-500/50 rounded-br-xl"></div>

                {/* Status Bar */}
                <div className="absolute top-8 left-0 w-full flex justify-center">
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${phase >= 3 ? 'bg-emerald-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                        <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider">
                            {phase === 2 ? 'SCANNING ENVIRONMENT' : phase >= 3 ? 'RTSM CONNECTED' : 'INITIALIZING'}
                        </span>
                        {phase >= 3 && <span className="text-[10px] font-mono text-emerald-500 pl-2 border-l border-white/10">12ms LATENCY</span>}
                    </div>
                </div>

                {/* Scanning Beam */}
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-yellow-500/10 to-transparent transform transition-transform duration-[2000ms] ease-linear 
                    ${phase === 2 ? 'translate-y-[100%]' : 'translate-y-[-100%]'}
                `}>
                    <div className="absolute bottom-0 w-full h-[1px] bg-yellow-400/50 shadow-[0_0_20px_rgba(250,204,21,0.5)]"></div>
                </div>

                {/* ---------------- OBJECTS ---------------- */}

                {/* 1. The Car (Center Bottom) */}
                <div className={`absolute left-[50%] top-[65%] -translate-x-1/2 -translate-y-1/2 w-[40%] h-[30%] transition-all duration-500 ease-out 
                    ${phase >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                `}>
                    {/* Bounding Box */}
                    <div className="absolute inset-0 border border-yellow-400/50 bg-yellow-400/5 rounded-lg">
                        {/* Corner markers */}
                        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-yellow-400"></div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-yellow-400"></div>
                    </div>

                    {/* Tag */}
                    <div className={`absolute -top-14 left-1/2 -translate-x-1/2 bg-black/80 border border-yellow-500/30 backdrop-blur-md rounded-lg p-2.5 flex flex-col gap-1 transition-all duration-300 delay-100
                        ${phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                    `}>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <Car className="w-3.5 h-3.5 text-yellow-400" />
                            <span className="text-xs font-bold text-white">Sports Sedan</span>
                            <span className="text-[10px] text-zinc-400 bg-white/10 px-1 rounded">ID: 482</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[98%]"></div>
                        </div>
                    </div>
                </div>

                {/* 2. The Coffee Shop (Right) */}
                <div className={`absolute right-[5%] top-[40%] w-[35%] h-[40%] transition-all duration-500 delay-100 ease-out 
                    ${phase >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                `}>
                    {/* Bounding Box */}
                    <div className="absolute inset-0 border border-blue-400/50 bg-blue-400/5 rounded-lg">
                        <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-blue-400"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-blue-400"></div>
                    </div>

                    {/* Tag */}
                    <div className={`absolute -left-6 top-1/2 -translate-x-full -translate-y-1/2 bg-black/80 border border-blue-500/30 backdrop-blur-md rounded-lg p-2.5 transition-all duration-300 delay-200
                         ${phase >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
                    `}>
                        <div className="flex items-center gap-2 whitespace-nowrap mb-1">
                            <Coffee className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs font-bold text-white">Aurora Coffee</span>
                        </div>
                        <div className="text-[10px] text-zinc-400 font-mono">
                            <div>Status: <span className="text-emerald-400">OPEN</span></div>
                            <div>Rating: 4.8 ★</div>
                        </div>
                        {/* Connector Line */}
                        <div className="absolute top-1/2 -right-4 w-4 h-[1px] bg-blue-500/50"></div>
                        <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 bg-blue-400 rounded-full -translate-y-1/2"></div>
                    </div>
                </div>

                {/* 3. Information Point (Left - e.g. Light or Building) */}
                <div className={`absolute left-[10%] top-[20%] w-[10%] h-[50%] transition-all duration-500 delay-75 ease-out 
                    ${phase >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                `}>
                    {/* Bounding Box */}
                    <div className="absolute inset-0 border border-zinc-500/50 bg-white/5 rounded-lg border-dashed"></div>

                    {/* Tag */}
                    <div className={`absolute left-full top-0 ml-4 bg-black/80 border border-white/20 backdrop-blur-md rounded-lg p-2 transition-all duration-300 delay-300
                         ${phase >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                    `}>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <Info className="w-3 h-3 text-zinc-400" />
                            <span className="text-[10px] font-mono text-zinc-300">Infra_Light_03</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
