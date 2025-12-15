import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Box, Layers, Share2, PlayCircle, FileJson } from 'lucide-react';
import { SEO } from '../components/SEO';
import carReal from '../assets/car_factory_real.png';
import carSim from '../assets/car_factory_sim.png';

export const RealToSim = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            id: 'scan',
            icon: Scan,
            label: "Environment Scan",
            code: 'rtsm.ingest_stream(camera_feed)',
            desc: "Ingest raw visual data from the physical environment.",
            color: "text-pink-400",
            bg: "bg-pink-500/10",
            border: "border-pink-500/50",
            status: "SCANNING...",
            progress: 15,
            laserBg: "via-pink-400",
            laserText: "text-pink-300",
            laserShadow: "shadow-[0_0_20px_rgba(244,114,182,0.8)]",
            stat: "CAM: 4K 60FPS"
        },
        {
            id: 'geometry',
            icon: Box,
            label: "Geometric Reconstruction",
            code: 'mesh = rtsm.build_mesh(voxel_size=0.02)',
            desc: "Construct high-fidelity 3D geometry from sensor data.",
            color: "text-rose-400",
            bg: "bg-rose-500/10",
            border: "border-rose-500/50",
            status: "MESHING",
            progress: 40,
            laserBg: "via-rose-400",
            laserText: "text-rose-300",
            laserShadow: "shadow-[0_0_20px_rgba(251,113,133,0.8)]",
            stat: "MESH: 1.2M POLYS"
        },
        {
            id: 'semantics',
            icon: Layers,
            label: "Semantic Segmentation",
            code: 'rtsm.label_objects(classes=["shelf", "robot", "pallet"])',
            desc: "Identify and classify objects within the geometry.",
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/50",
            status: "CLASSIFYING",
            progress: 70,
            laserBg: "via-purple-400",
            laserText: "text-purple-300",
            laserShadow: "shadow-[0_0_20px_rgba(192,132,252,0.8)]",
            stat: "OBJS: 14 DETECTED"
        },
        {
            id: 'graph',
            icon: Share2,
            label: "State Graph",
            code: 'graph = rtsm.build_scene_graph()',
            desc: "Link objects and geometry into a queryable graph.",
            color: "text-violet-400",
            bg: "bg-violet-500/10",
            border: "border-violet-500/50",
            status: "CONNECTING",
            progress: 100,
            laserBg: "via-violet-400",
            laserText: "text-violet-300",
            laserShadow: "shadow-[0_0_20px_rgba(167,139,250,0.8)]",
            stat: "NODES: 428 LINKED"
        },
        {
            id: 'export',
            icon: FileJson,
            label: "Asset Export",
            code: 'rtsm.export(format="usd", target="isaac_sim")',
            desc: "Generate simulation-ready assets (USD, URDF).",
            color: "text-fuchsia-400",
            bg: "bg-fuchsia-500/10",
            border: "border-fuchsia-500/50",
            status: "EXPORTING",
            progress: 100,
            laserBg: "via-fuchsia-400",
            laserText: "text-fuchsia-300",
            laserShadow: "shadow-[0_0_20px_rgba(232,121,249,0.8)]",
            stat: "FILES: 28 EXPORTED"
        },
        {
            id: 'simulate',
            icon: PlayCircle,
            label: "Simulation Loop",
            code: 'sim.load_scene("warehouse_v2.usd")',
            desc: "Run training and validation in the digital twin.",
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/50",
            status: "RUNNING",
            progress: 100,
            laserBg: "via-cyan-400",
            laserText: "text-cyan-300",
            laserShadow: "shadow-[0_0_20px_rgba(34,211,238,0.8)]",
            stat: "SIM: 240FPS"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % (steps.length + 2));
        }, 3000);
        return () => clearInterval(timer);
    }, [steps.length]);

    const activeStep = steps[currentStep] || steps[steps.length - 1];
    const isPause = currentStep >= steps.length;
    const scanProgress = isPause ? 100 : activeStep.progress;

    // Defined objects for semantics visualization with percentages based on image composition
    const sceneObjects = [
        { id: 'robot_l', label: 'ROBOT_ARM_L', x: 22, y: 40, w: 12, h: 30 },
        { id: 'car', label: 'CHASSIS_04', x: 42, y: 50, w: 16, h: 25 },
        { id: 'robot_r', label: 'ROBOT_ARM_R', x: 66, y: 40, w: 12, h: 30 },
    ];

    return (
        <section className="relative min-h-screen py-32 px-6 overflow-hidden bg-black text-zinc-300 font-sans selection:bg-pink-500/20 selection:text-pink-200">
            <SEO
                title="Real-to-Sim Pipelines"
                description="Automatic Digital Twins. Building simulation environments manually is slow. RTSM scans spaces to build semantic state graphs for instant simulation."
            />
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--accent-glow,rgba(236,72,153,0.15)),_transparent_70%)] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.05),_transparent_70%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <header className="mb-16 md:mb-24 relative">
                    <div className="absolute -top-24 left-0">
                        <div className="text-2xl font-mono text-white uppercase tracking-[0.2em] animate-fade-in opacity-0">
                            Real-to-Sim
                        </div>
                    </div>

                    <div className="text-center mt-12 md:mt-24 md:text-left">
                        <h1 className="text-5xl md:text-7xl font-heading font-medium text-white tracking-tighter mb-6 animate-fade-in opacity-0 [animation-delay:0.1s] leading-[1.1]">
                            Automatic <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-white to-pink-400">Digital Twins.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-4xl leading-relaxed animate-fade-in opacity-0 [animation-delay:0.2s]">
                            Building simulation environments manually is slow. <br className="hidden md:block" />
                            RTSM scans spaces to build semantic state graphs, exporting maps and assets for instant simulation.
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-fade-in opacity-0 [animation-delay:0.3s]">

                    {/* Main Visual Storytelling Area */}
                    <div className="lg:col-span-12 relative group">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505] aspect-video lg:aspect-[21/9]">

                            {/* Base "Real" Image */}
                            <img
                                src={carReal}
                                alt="Real Factory"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Overlay "Sim" Image with Sliding Reveal */}
                            <motion.div
                                className="absolute inset-0 w-full h-full"
                                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                animate={{ clipPath: `inset(0 ${100 - scanProgress}% 0 0)` }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            >
                                <img
                                    src={carSim}
                                    alt="Sim Factory"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />

                                {/* Inner Shadow at reveal edge for depth */}
                                <div className="absolute inset-0 shadow-[inset_-20px_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
                            </motion.div>

                            {/* Scanning Laser Line (Synced with clipPath animation) */}
                            <motion.div
                                initial={{ left: '0%' }}
                                animate={{ left: `${scanProgress}%` }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent ${activeStep.laserBg} to-transparent ${activeStep.laserShadow} z-20`}
                            >
                                <div className={`absolute top-1/2 -right-4 text-[10px] font-mono ${activeStep.laserText} -rotate-90 origin-bottom-left`} style={{ transformOrigin: '0% 50%' }}>{activeStep.status}</div>
                            </motion.div>

                            {/* Horizontal Step Bar Overlay */}
                            <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/90 via-black/60 to-transparent p-4 md:p-6">
                                <div className="flex justify-between items-start max-w-5xl mx-auto relative">
                                    <div className="absolute top-3 left-0 right-0 h-px bg-white/10 -z-10" />

                                    {steps.map((step, index) => {
                                        const isActive = index === currentStep;
                                        const isPast = index < currentStep || isPause;

                                        return (
                                            <div key={step.id} className="flex flex-col items-center gap-2 group/step cursor-default relative">
                                                <div
                                                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border transition-all duration-500 z-10
                                                    ${isActive
                                                            ? `${step.bg} ${step.border} ${step.color} scale-110 shadow-[0_0_15px_-3px_currentColor]`
                                                            : isPast
                                                                ? 'bg-zinc-900 border-zinc-700 text-zinc-500'
                                                                : 'bg-black border-zinc-800 text-zinc-700'
                                                        }`}
                                                >
                                                    <step.icon className="w-3 h-3 md:w-4 md:h-4" />
                                                </div>
                                                <div className={`text-[10px] uppercase font-mono tracking-wider transition-colors duration-300 ${isActive ? 'text-white font-bold' : 'text-zinc-600'}`}>
                                                    <span className="hidden md:block">{step.label.split(' ')[0]}</span>
                                                </div>
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="active-step-dot"
                                                        className={`absolute -bottom-4 w-1 h-1 rounded-full ${step.color.replace('text-', 'bg-')}`}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Active Description Overlay */}
                            <div className="absolute bottom-8 left-0 right-0 z-30 px-6 pointer-events-none">
                                <div className="max-w-3xl mx-auto text-center">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeStep.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 inline-block pointer-events-auto"
                                        >
                                            <h3 className={`text-sm md:text-base font-bold font-mono mb-1 ${activeStep.color}`}>
                                                {activeStep.label}
                                            </h3>
                                            <p className="text-xs md:text-sm text-zinc-300 max-w-lg mx-auto">
                                                {activeStep.desc}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* HUD Stats */}
                            <div className="absolute top-24 right-4 flex flex-col items-end gap-1 z-20">
                                <div className={`text-[10px] font-mono font-bold px-2 py-1 rounded bg-black/50 border border-white/10 ${activeStep.color}`}>
                                    STATUS: {activeStep.status}
                                </div>
                                <div className="text-[10px] font-mono text-zinc-400 px-2 py-1 rounded bg-black/50 border border-white/10">
                                    {activeStep.stat}
                                </div>
                            </div>

                            {/* Dynamic Simulation Overlays - Bounding Boxes & Graph */}
                            <div className="absolute inset-0 z-10 pointer-events-none">
                                {sceneObjects.map((obj) => (
                                    <AnimatePresence key={obj.id}>
                                        {/* Show BBox if: currentStep is semantics/graph/export/simulate AND scan line has passed closely */}
                                        {['semantics', 'graph', 'export', 'simulate'].some(s => s === activeStep.id) && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ delay: 0.5 }} // Wait for scan sweep
                                                className="absolute border border-purple-400/50 bg-purple-500/10 backdrop-blur-[1px] flex flex-col items-start"
                                                style={{ left: `${obj.x}%`, top: `${obj.y}%`, width: `${obj.w}%`, height: `${obj.h}%` }}
                                            >
                                                {/* Label */}
                                                <div className="text-[9px] font-mono bg-purple-500/80 text-white px-1 -mt-4 ml-0">
                                                    {obj.label}
                                                </div>

                                                {/* Graph Node Dot */}
                                                {['graph', 'export', 'simulate'].some(s => s === activeStep.id) && (
                                                    <motion.div
                                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-violet-400 rounded-full shadow-[0_0_10px_currentColor] -translate-x-1/2 -translate-y-1/2"
                                                    />
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                ))}

                                {/* Graph Connections */}
                                {['graph', 'export', 'simulate'].some(s => s === activeStep.id) && (
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60">
                                        <motion.line
                                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                            transition={{ duration: 1 }}
                                            x1="28%" y1="55%" x2="50%" y2="62.5%" // Robot L to Car Center
                                            stroke="#A78BFA" strokeWidth="1" strokeDasharray="4,4"
                                        />
                                        <motion.line
                                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            x1="72%" y1="55%" x2="50%" y2="62.5%" // Robot R to Car Center
                                            stroke="#A78BFA" strokeWidth="1" strokeDasharray="4,4"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>

                        {/* Bottom Grid: Stats & Terminal */}
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Stats Panel */}
                            <div className="flex gap-4">
                                <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex-1">
                                    <div className="text-[10px] uppercase text-zinc-500 mb-1">Voxel Resolution</div>
                                    <div className="text-xs font-mono text-zinc-300 flex items-center gap-2">
                                        <Box className="w-3 h-3 text-rose-400" />
                                        2.0 cm
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex-1">
                                    <div className="text-[10px] uppercase text-zinc-500 mb-1">Asset Format</div>
                                    <div className="text-xs font-mono text-zinc-300 flex items-center gap-2">
                                        <FileJson className="w-3 h-3 text-fuchsia-400" />
                                        USD / URDF
                                    </div>
                                </div>
                            </div>

                            {/* Live Logic Log */}
                            <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-3 overflow-hidden flex items-center">
                                <span className="text-zinc-500 mr-2 flex-shrink-0">$</span>
                                <AnimatePresence mode="wait">
                                    <motion.code
                                        key={activeStep.id}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="font-mono text-xs text-zinc-300 truncate"
                                    >
                                        {activeStep.code.split('\n')[0]}
                                    </motion.code>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
