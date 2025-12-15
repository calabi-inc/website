import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Brain, Zap, Scan, ArrowUp } from 'lucide-react';

export const StackAnimation = () => {
    return (
        <section id="system-architecture-overview" className="py-24 bg-black relative overflow-hidden flex justify-center items-center min-h-[600px]">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-heading font-medium text-white mb-4">
                        System Architecture Overview
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        From Chaos to Control
                    </p>
                </motion.div>

                <div className="relative w-full max-w-lg mx-auto h-[400px] flex flex-col justify-end items-center gap-4">

                    {/* 3. Action Layer (Output) */}
                    <StackLayer
                        id="stack-action"
                        delay={0.6}
                        color="emerald"
                        icon={<Zap className="w-5 h-5 text-emerald-400" />}
                        label="Action"
                        subLabel="Intent Tokens"
                    >
                        <IntentTokenCycler />
                    </StackLayer>

                    {/* Connector: Intelligence -> Action (Up) */}
                    <ConnectionLine color="emerald" delay={0.5} direction="up" />

                    {/* 2. Intelligence Layer (Process) */}
                    <StackLayer
                        id="stack-intelligence"
                        delay={0.4}
                        color="purple"
                        icon={<Brain className="w-5 h-5 text-purple-400" />}
                        label="Intelligence"
                        subLabel="World Models"
                    >
                        {/* Internal Pulsing Effect */}
                        <motion.div
                            className="absolute inset-0 bg-purple-500/20 blur-xl rounded-xl"
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </StackLayer>

                    {/* Connector: Perception -> Intelligence (Up) */}
                    <ConnectionLine color="purple" delay={0.3} direction="up" />

                    {/* 1. Perception Layer (Base) */}
                    <StackLayer
                        id="stack-perception"
                        delay={0.2}
                        color="indigo"
                        icon={<Eye className="w-5 h-5 text-indigo-400" />}
                        label="Perception"
                        subLabel="RTSM Graph"
                    >
                        {/* Grid/Graph Effect */}
                        <div className="absolute inset-2 grid grid-cols-4 gap-1 opacity-30">
                            {[...Array(16)].map((_, i) => (
                                <div key={i} className="bg-indigo-400/50 rounded-[1px]"></div>
                            ))}
                        </div>
                    </StackLayer>


                    {/* 0. Sensor Input (Bottom) */}
                    <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full flex justify-center overflow-hidden h-24">
                        <SensorStream />
                    </div>

                    {/* Tooling (Sidebar/Visualizer) */}
                    <motion.div
                        id="stack-visualizer"
                        className="absolute right-[-140px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        <div className="h-32 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
                        <div className="p-3 rounded-lg bg-zinc-900/80 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)] mb-8">
                            <Scan className="w-5 h-5 text-cyan-400" />
                        </div>
                        <span className="text-[10px] font-mono text-cyan-500/70 tracking-widest uppercase rotate-90 origin-center">
                            Visualizer
                        </span>
                        <div className="h-32 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent mt-8"></div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
};

const StackLayer = ({ children, delay, color, icon, label, subLabel, id }) => {
    const borders = {
        emerald: 'border-emerald-500/30 hover:border-emerald-500/50',
        purple: 'border-purple-500/30 hover:border-purple-500/50',
        indigo: 'border-indigo-500/30 hover:border-indigo-500/50'
    };

    const glows = {
        emerald: 'shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)]',
        purple: 'shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)]',
        indigo: 'shadow-[0_0_30px_-5px_rgba(99,102,241,0.15)]',
    };

    const iconBgs = {
        emerald: 'bg-emerald-500/10',
        purple: 'bg-purple-500/10',
        indigo: 'bg-indigo-500/10',
    };

    return (
        <motion.div
            id={id}
            className={`
                relative w-64 h-20 rounded-2xl bg-zinc-900/60 backdrop-blur-md border ${borders[color]}
                flex items-center px-6 gap-4 z-10 ${glows[color]} transition-colors duration-500
            `}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02 }}
        >
            <div className={`p-2 rounded-lg ${iconBgs[color]}`}>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-white font-medium">{label}</span>
                <span className={`text-xs text-${color}-400 font-mono opacity-80`}>{subLabel}</span>
            </div>
            {children}
        </motion.div>
    );
};

const ConnectionLine = ({ color, delay, direction = 'down' }) => {
    // direction 'down': gradient to bottom, animate y [0, 32]
    // direction 'up': gradient to top, animate y [0, -32]

    const isUp = direction === 'up';

    const lineColors = {
        emerald: 'bg-emerald-500/30',
        purple: 'bg-purple-500/30',
        indigo: 'bg-indigo-500/30',
    };

    const gradientColors = {
        emerald: 'to-emerald-400',
        purple: 'to-purple-400',
        indigo: 'to-indigo-400',
    };

    return (
        <motion.div
            className="h-8 w-px relative overflow-hidden"
            initial={{ height: 0 }}
            whileInView={{ height: 32 }}
            transition={{ delay: delay + 0.3, duration: 0.4 }}
        >
            <div className={`absolute inset-0 ${lineColors[color]}`}></div>
            <motion.div
                className={`absolute ${isUp ? 'bottom-0' : 'top-0'} left-0 w-full h-1/2 bg-gradient-to-${isUp ? 't' : 'b'} from-transparent ${gradientColors[color]}`}
                animate={{ y: isUp ? [32, -32] : [-32, 32] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
        </motion.div>
    );
};

const SensorStream = () => {
    return (
        <div className="relative w-64 h-full">
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bottom-0 w-1 h-1 rounded-full bg-zinc-600"
                    style={{ left: `${10 + Math.random() * 80}%` }}
                    animate={{
                        y: [-20, -100],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.5, 0.5]
                    }}
                    transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "linear"
                    }}
                />
            ))}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
                Raw Sensor Data
            </div>
        </div>
    );
};

const IntentTokenCycler = () => {
    const tokens = ["[P_GRASP]", "[P_APPROACH]", "[P_NAVIGATE]", "[P_RETRACT]", "[P_SCAN]"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % tokens.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-max h-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="absolute"
                >
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 backdrop-blur-sm">
                        {tokens[index]}
                    </span>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
