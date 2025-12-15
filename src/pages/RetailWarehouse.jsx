import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Map, EyeOff, History, Barcode, ShieldCheck, Search, ScanLine, AlertTriangle, Database } from 'lucide-react';
import { SEO } from '../components/SEO';
import warehouseBg from '../assets/warehouse_vision.png';

export const RetailWarehouse = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            id: 'detect',
            icon: Package,
            label: "Detection",
            code: 'rtsm.detect_objects(frame_id=1024)\n// Found: Item #8821 (Cereal Box)',
            desc: "System identifies an object in the camera frame.",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/50",
            status: "DETECTED"
        },
        {
            id: 'track',
            icon: Map,
            label: "Tracking",
            code: 'rtsm.update_pose(id="#8821", x=10.5, y=2.1)',
            desc: "Object movement is tracked in real-time.",
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
            border: "border-indigo-500/50",
            status: "TRACKING"
        },
        {
            id: 'occlude',
            icon: EyeOff,
            label: "Occlusion Event",
            code: 'event.log("Item #8821 occluded by Forklift")',
            desc: "Item is temporarily hidden from view.",
            color: "text-red-400",
            bg: "bg-red-500/10",
            border: "border-red-500/50",
            status: "OCCLUDED"
        },
        {
            id: 'query_history',
            icon: History,
            label: "History Query",
            code: 'rtsm.get_last_known_pose("#8821")\n// Returns: { x: 10.5, y: 2.1, t: -5s }',
            desc: "System retrieves the last valid state despite occlusion.",
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/50",
            status: "RECOVERING"
        },
        {
            id: 'reid',
            icon: Barcode,
            label: "Re-identification",
            code: 'rtsm.confirm_identity(new_detection, "#8821")',
            desc: "Object is re-acquired and matched to its history.",
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/50",
            status: "CONFIRMED"
        },
        {
            id: 'audit',
            icon: ShieldCheck,
            label: "Audit Trail",
            code: 'audit.log_movement("#8821", start, end)',
            desc: "Complete history is saved for inventory compliance.",
            color: "text-violet-400",
            bg: "bg-violet-500/10",
            border: "border-violet-500/50",
            status: "LOGGED"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % (steps.length + 2));
        }, 3000); // Slower timing for better visual processing
        return () => clearInterval(timer);
    }, [steps.length]);

    const activeStep = steps[currentStep] || steps[steps.length - 1];
    const isPause = currentStep >= steps.length;

    // Visual State Logic
    const getBoxState = () => {
        if (activeStep.id === 'detect') return { x: 30, y: 60, opacity: 1, border: 'solid', color: '#60A5FA' }; // Blue
        if (activeStep.id === 'track') return { x: 45, y: 60, opacity: 1, border: 'solid', color: '#818CF8' }; // Indigo
        if (activeStep.id === 'occlude') return { x: 55, y: 60, opacity: 0.5, border: 'dashed', color: '#F87171' }; // Red
        if (activeStep.id === 'query_history') return { x: 55, y: 60, opacity: 0.8, border: 'dotted', color: '#FBBF24' }; // Amber
        if (activeStep.id === 'reid') return { x: 70, y: 60, opacity: 1, border: 'solid', color: '#34D399' }; // Green
        if (activeStep.id === 'audit') return { x: 70, y: 60, opacity: 1, border: 'solid', color: '#A78BFA' }; // Violet
        return { x: 30, y: 60, opacity: 0, border: 'solid', color: 'transparent' };
    };

    const boxState = getBoxState();

    return (
        <section className="relative min-h-screen py-32 px-6 overflow-hidden bg-black text-zinc-300 font-sans selection:bg-blue-500/20 selection:text-blue-200">
            <SEO
                title="Retail & Warehouse"
                description="The Persistent Inventory. Single-frame detection loses track. RTSM maintains object identity and history across time and viewpoints, ensuring zero lost item gaps."
            />
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--accent-glow,rgba(59,130,246,0.15)),_transparent_70%)] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.05),_transparent_70%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <header className="mb-16 md:mb-24 relative">
                    <div className="absolute -top-24 left-0">
                        <div className="text-2xl font-mono text-white uppercase tracking-[0.2em] animate-fade-in opacity-0">
                            Retail & Warehouse
                        </div>
                    </div>

                    <div className="text-center mt-12 md:mt-24 md:text-left">
                        <h1 className="text-5xl md:text-7xl font-heading font-medium text-white tracking-tighter mb-6 animate-fade-in opacity-0 [animation-delay:0.1s] leading-[1.1]">
                            The Persistent <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400">Inventory.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-4xl leading-relaxed animate-fade-in opacity-0 [animation-delay:0.2s]">
                            Single-frame detection loses track. <br className="hidden md:block" />
                            RTSM maintains object identity and history across time and viewpoints, ensuring zero "lost item" gaps.
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-fade-in opacity-0 [animation-delay:0.3s]">

                    {/* Left Column: Visual Storytelling (Combined View) */}
                    <div className="lg:col-span-12 relative group">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505] aspect-video lg:aspect-[21/9]">
                            {/* Background Image */}
                            <img
                                src={warehouseBg}
                                alt="Warehouse Vision"
                                className="absolute inset-0 w-full h-full object-cover opacity-60"
                            />

                            {/* Scanning Effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-scan pointer-events-none" />

                            {/* Horizontal Step Bar (Overlay) */}
                            <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/90 via-black/60 to-transparent p-4 md:p-6">
                                <div className="flex justify-between items-start max-w-5xl mx-auto relative">
                                    {/* Connecting Line */}
                                    <div className="absolute top-3 left-0 right-0 h-px bg-white/10 -z-10" />

                                    {steps.map((step, index) => {
                                        const isActive = index === currentStep;
                                        const isPast = index < currentStep || isPause;

                                        return (
                                            <div key={step.id} className="flex flex-col items-center gap-2 group/step cursor-default relative">
                                                {/* Icon Bubble */}
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

                                                {/* Label */}
                                                <div className={`text-[10px] uppercase font-mono tracking-wider transition-colors duration-300 ${isActive ? 'text-white font-bold' : 'text-zinc-600'}`}>
                                                    <span className="hidden md:block">{step.label}</span>
                                                </div>

                                                {/* Active Indicator Dot */}
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

                            {/* Active Description Overlay (Bottom Center) */}
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

                            {/* HUD Stats (Top Right - Compact) */}
                            <div className="absolute top-24 right-4 flex flex-col items-end gap-1 z-20">
                                <div className={`text-[10px] font-mono font-bold px-2 py-1 rounded bg-black/50 border border-white/10 ${activeStep.color}`}>
                                    STATUS: {activeStep.status}
                                </div>
                                <div className="text-[10px] font-mono text-zinc-400 px-2 py-1 rounded bg-black/50 border border-white/10">
                                    ID: #8821
                                </div>
                            </div>

                            {/* Interactive Overlays (Box & Stuff) */}
                            <div className="absolute inset-0 z-10">
                                {/* The "Box" being tracked */}
                                {(!isPause) && (
                                    <motion.div
                                        className="absolute w-16 h-16 md:w-24 md:h-24 border-2 flex items-start justify-start p-1 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                                        animate={{
                                            left: `${boxState.x}%`,
                                            top: `${boxState.y}%`,
                                            borderColor: boxState.color,
                                            borderStyle: boxState.border,
                                            opacity: boxState.opacity
                                        }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                    >
                                        <motion.div
                                            className="bg-black/90 text-[9px] px-1 py-0.5 font-mono text-white -mt-5 -ml-0.5 whitespace-nowrap border border-white/20"
                                            animate={{ opacity: boxState.opacity }}
                                        >
                                            #{activeStep.id === 'reid' ? 'CONFIRMED' : '8821'}
                                        </motion.div>

                                        {/* Step-specific additional markers */}
                                        {activeStep.id === 'occlude' && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute -right-12 -top-8 text-red-500 flex flex-col items-center"
                                            >
                                                <AlertTriangle className="w-8 h-8 fill-red-500/20" />
                                                <span className="text-[10px] font-bold bg-black/80 px-1 mt-1 border border-red-500/50 rounded">LOST</span>
                                            </motion.div>
                                        )}

                                        {activeStep.id === 'query_history' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute -right-24 top-0 text-amber-500 w-32"
                                            >
                                                <div className="flex items-center gap-1 bg-black/90 p-1 border border-amber-500/30 text-[9px] font-mono font-bold rounded">
                                                    <Database className="w-3 h-3" /> RECOVERING
                                                </div>
                                            </motion.div>
                                        )}

                                        {activeStep.id === 'reid' && (
                                            <motion.div
                                                initial={{ scale: 1.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="absolute inset-0 border-2 border-green-400 opacity-50 animate-ping"
                                            />
                                        )}
                                    </motion.div>
                                )}

                                {/* Occlusion Obstacle (Simulated) */}
                                {activeStep.id === 'occlude' && (
                                    <motion.div
                                        initial={{ x: 200, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -200, opacity: 0 }}
                                        transition={{ duration: 1 }}
                                        className="absolute top-[55%] left-[58%] w-24 h-24 bg-zinc-900/90 border border-zinc-700 backdrop-blur-md flex items-center justify-center rounded-lg shadow-2xl"
                                    >
                                        <div className="text-zinc-600 font-mono text-[10px] text-center p-2">
                                            // BLOCKED
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Terminal (Now compacted below or overlay? Let's simply put it below nicely) */}
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Minimap Stats */}
                            <div className="flex gap-4">
                                <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex-1">
                                    <div className="text-[10px] uppercase text-zinc-500 mb-1">Confidence</div>
                                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-blue-500"
                                            animate={{ width: activeStep.id === 'occlude' ? '30%' : (activeStep.id === 'query_history' ? '60%' : '98%') }}
                                        />
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex-1">
                                    <div className="text-[10px] uppercase text-zinc-500 mb-1">System Latency</div>
                                    <div className="text-xs font-mono text-zinc-300">12ms</div>
                                </div>
                            </div>

                            {/* Log Line (Mini Terminal) */}
                            <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-3 overflow-hidden flex items-center">
                                <span className="text-zinc-500 mr-2">$</span>
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
