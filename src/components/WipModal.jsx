import { motion, AnimatePresence } from 'framer-motion';
import { X, HardHat } from 'lucide-react';
import { useUI } from '../contexts/UIContext';


export const WipModal = () => {
    const { isWipOpen, closeWip } = useUI();

    return (
        <AnimatePresence>
            {isWipOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeWip}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm z-[101] p-6"
                    >
                        <div className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
                            {/* Close Button */}
                            <button
                                onClick={closeWip}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8 text-center space-y-6">
                                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                                    <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-xl animate-pulse"></div>
                                    <HardHat className="w-16 h-16 text-yellow-500 relative z-10" />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                                        Work in Progress
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        We're paving the road to something great. Stay tuned for updates!
                                    </p>
                                </div>

                                <button
                                    onClick={closeWip}
                                    className="w-full py-2.5 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-colors"
                                >
                                    Got it
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
