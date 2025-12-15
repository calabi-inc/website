import { motion } from 'framer-motion';

export const Button = ({ children, primary = false, onClick, className = '' }) => {
    const baseClass = "px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 border backdrop-blur-sm relative overflow-hidden group";

    // Primary: Cyan glow, white text, subtle gradient background
    const primaryClass = "border-[#00f0ff]/50 text-white shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20";

    // Secondary: Subtle white/gray border, hover glow
    const secondaryClass = "border-white/10 text-gray-300 hover:text-white hover:border-white/30 bg-white/5 hover:bg-white/10";

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`${baseClass} ${primary ? primaryClass : secondaryClass} ${className}`}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
            {primary && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f0ff]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />}
        </motion.button>
    );
};
