
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Navigation, Box, RefreshCw, Database, ArrowDown } from 'lucide-react';

export const AgenticWorkflow = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            id: 'query',
            icon: Search,
            label: "Semantic Query",
            code: 'agent.query("Find SD#1253")',
            desc: "Agent requests location of a specific asset ID.",
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
            border: "border-indigo-500/20"
        },
        {
            id: 'identify',
            icon: Database,
            label: "RTSM Lookup",
            code: 'rtsm.identify("SD#1253")\n// Returns { id: "SD#1253", type: "pallet" }',
            desc: "RTSM queries the semantic layer to find the object.",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            id: 'localize',
            icon: MapPin,
            label: "Return Location",
            code: 'return { x: 12.4, y: 5.1, z: 0.0 }',
            desc: "RTSM returns precise 3D coordinates from the spatial index.",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            id: 'navigate',
            icon: Navigation,
            label: "Navigate",
            code: 'robot.go_to(12.4, 5.1)',
            desc: "Robot pathplans and moves to the target coordinates.",
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20"
        },
        {
            id: 'action',
            icon: Box,
            label: "Physical Action",
            code: 'robot.pick_up("SD#1253")',
            desc: "Robot executes the manipulation task.",
            color: "text-rose-400",
            bg: "bg-rose-500/10",
            border: "border-rose-500/20"
        },
        {
            id: 'update',
            icon: RefreshCw,
            label: "Dynamic Update",
            code: 'rtsm.update("SD#1253", "HELD")',
            desc: "Robot reports state change back to RTSM.",
            color: "text-violet-400",
            bg: "bg-violet-500/10",
            border: "border-violet-500/20"
        },
        {
            id: 'sync',
            icon: Database,
            label: "WMS Sync",
            code: 'wms.sync_state()',
            desc: "RTSM propagates the change to the Warehouse Management System.",
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/20"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % (steps.length + 2)); // Add pause at end
        }, 2200);
        return () => clearInterval(timer);
    }, [steps.length]);

    const activeStep = steps[currentStep] || steps[steps.length - 1]; // Handle pause state
    const isPause = currentStep >= steps.length;

    return (
        <section className="py-24 px-6 bg-black border-y border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Agentic Loop</h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Bridging semantic intent to physical action. RTSM acts as the shared source of truth between your agents and the physical world.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Visualization of steps */}
                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />

                        <div className="space-y-6">
                            {steps.map((step, index) => {
                                const isActive = index === currentStep; // Only exact match is "active" for animation
                                const isPast = index < currentStep || isPause;

                                return (
                                    <div key={step.id} className={`relative pl-20 transition-all duration-500 ${isActive || isPast ? 'opacity-100' : 'opacity-40'}`}>
                                        {/* Node Icon */}
                                        <div
                                            className={`absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-500 z-10 
                                            ${isActive
                                                    ? `${step.bg} ${step.border} ${step.color} scale-110 shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]`
                                                    : isPast
                                                        ? 'bg-zinc-900 border-white/10 text-zinc-500'
                                                        : 'bg-black border-white/5 text-zinc-700'
                                                }`}
                                        >
                                            <step.icon className="w-6 h-6" />
                                        </div>

                                        {/* Content */}
                                        <div className={`p-4 rounded-xl border transition-all duration-500 ${isActive ? 'bg-zinc-900/50 border-white/10' : 'border-transparent'}`}>
                                            <h3 className={`font-mono font-bold text-sm mb-1 ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                                                {step.label}
                                            </h3>
                                            <p className="text-zinc-500 text-sm">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Code / Terminal View */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50" />
                        <div className="relative bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                            {/* Terminal Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                </div>
                                <div className="text-xs font-mono text-zinc-500">agent_executor.py</div>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-6 font-mono text-sm h-[500px] overflow-hidden flex flex-col">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    {steps.map((step, index) => {
                                        if (index > currentStep && !isPause) return null;
                                        const isLast = index === currentStep;

                                        return (
                                            <motion.div
                                                key={step.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="mb-4"
                                            >
                                                <div className="flex gap-3 mb-1">
                                                    <span className="text-zinc-600 select-none">{index + 1}</span>
                                                    <span className={step.color}>
                                                        {index === 0 ? '>' : '$'}
                                                    </span>
                                                    <code className="text-zinc-300">
                                                        {step.code.split('\n').map((line, i) => (
                                                            <div key={i} className={i > 0 ? "mt-1 pl-4 text-zinc-500" : ""}>
                                                                {line}
                                                            </div>
                                                        ))}
                                                    </code>
                                                </div>
                                                {isLast && !isPause && (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="pl-8 text-zinc-500 text-xs italic mt-1"
                                                    >
                                                        Running...
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                    {isPause && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-4 pt-4 border-t border-white/10"
                                        >
                                            <span className="text-green-400">✓ Workflow completed successfully.</span>
                                            <div className="text-zinc-500 text-xs mt-2">Restarting loop...</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
