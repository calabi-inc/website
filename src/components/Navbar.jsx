import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, ArrowRight, ChevronDown, Eye, Brain, Zap, Scan, LayoutDashboard, Box, Layers, Glasses } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/white_logo_with_company_name.svg';

import { useUI } from '../contexts/UIContext';

export const Navbar = () => {
    const { openWip } = useUI();
    const [isTechOpen, setIsTechOpen] = useState(false);
    const location = useLocation();

    // Helper to determine if we are on the home page for anchor links
    const isHome = location.pathname === '/';

    const handleScroll = (e, targetId, hash) => {
        setIsTechOpen(false);
        if (isHome) {
            e.preventDefault();
            if (hash) {
                window.location.hash = hash;
            }
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        // If not home, we let the default anchor behavior handle the navigation to /#hash
    };

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 animate-fade-in">
            <nav className="flex w-full max-w-5xl items-center justify-between rounded-full border border-white/5 bg-[#050505]/80 p-2 pl-6 shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
                <Link to="/" className="flex items-center gap-2 group">
                    <img src={logo} alt="Calabi" className="h-5 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
                </Link>

                <div className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-400">
                    <NavLink to="/">Home</NavLink>

                    {/* Technology Mega Menu */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsTechOpen(true)}
                        onMouseLeave={() => setIsTechOpen(false)}
                    >
                        <button
                            className={`flex items-center gap-1 hover:text-white transition-colors py-2 ${isTechOpen ? 'text-white' : ''}`}
                        >
                            Technology
                            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isTechOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isTechOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px]"
                                >
                                    <div className="bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-8 ring-1 ring-white/5">

                                        {/* Column 1: The Stack */}
                                        <div className="space-y-4">
                                            <h3 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest pl-2">The Stack</h3>
                                            <div className="flex flex-col gap-2">
                                                <MenuLink
                                                    icon={<Layers className="w-4 h-4 text-white" />}
                                                    title="System Overview"
                                                    desc="Architecture"
                                                    href="/#system-architecture-overview"
                                                    onClick={(e) => handleScroll(e, 'system-architecture-overview')}
                                                />
                                                <MenuLink
                                                    icon={<Eye className="w-4 h-4 text-indigo-400" />}
                                                    title="RTSM — Perception"
                                                    desc="Available Now"
                                                    href="/#stack-detail-perception"
                                                    onClick={(e) => handleScroll(e, 'infrastructure-stack', 'stack-detail-perception')}
                                                />
                                                <MenuLink
                                                    icon={<Brain className="w-4 h-4 text-purple-400" />}
                                                    title="World Models — Intelligence"
                                                    desc="Research"
                                                    href="/#stack-detail-intelligence"
                                                    onClick={(e) => handleScroll(e, 'infrastructure-stack', 'stack-detail-intelligence')}
                                                />
                                                <MenuLink
                                                    icon={<Zap className="w-4 h-4 text-emerald-400" />}
                                                    title="Intent Tokens — Action"
                                                    desc="Research"
                                                    href="/#stack-detail-action"
                                                    onClick={(e) => handleScroll(e, 'infrastructure-stack', 'stack-detail-action')}
                                                />
                                                <MenuLink
                                                    icon={<Scan className="w-4 h-4 text-cyan-400" />}
                                                    title="Visualizer — Tooling"
                                                    desc="Live Prototype"
                                                    href="/#stack-detail-tooling"
                                                    onClick={(e) => handleScroll(e, 'infrastructure-stack', 'stack-detail-tooling')}
                                                />
                                            </div>
                                        </div>

                                        {/* Column 2: Use Cases */}
                                        <div className="space-y-4 border-l border-white/5 pl-8">
                                            <h3 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest pl-2">RTSM Use Cases</h3>
                                            <div className="flex flex-col gap-2">
                                                <MenuLink
                                                    icon={<LayoutDashboard className="w-4 h-4 text-orange-400" />}
                                                    title="Agentic Workflow"
                                                    desc="LLMs in the Real World"
                                                    href="/agentic-workflow"
                                                />
                                                <MenuLink
                                                    icon={<Box className="w-4 h-4 text-blue-400" />}
                                                    title="Retail & Warehouse"
                                                    desc="Persistent Inventory"
                                                    href="/retail-warehouse"
                                                />
                                                <MenuLink
                                                    icon={<Layers className="w-4 h-4 text-pink-400" />}
                                                    title="Real-to-Sim Pipelines"
                                                    desc="Automatic Digital Twins"
                                                    href="/real-to-sim"
                                                />
                                                <MenuLink
                                                    icon={<Glasses className="w-4 h-4 text-yellow-400" />}
                                                    title="AR/XR Overlay"
                                                    desc="The World’s Metadata"
                                                    href="/ar-xr-overlay"
                                                />
                                                <div className="pl-2 pt-2 text-[10px] text-zinc-600 italic font-mono">
                                                    More coming soon...
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>


                    <NavLink to="/docs">Docs</NavLink>
                    <NavLink to="/blog">Blog</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>

                <div className="flex items-center gap-3">
                    <a href="https://github.com/calabi-inc/rtsm" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors px-2">
                        <Github className="w-4 h-4" />
                    </a>
                    <Link
                        to="/connect"
                        className="group relative flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-neutral-800"
                        style={{
                            '--border-gradient': 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                            '--border-radius-before': '9999px'
                        }}
                    >
                        <span>Join the Hub</span>
                        <ArrowRight className="w-3 h-3 opacity-50 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </nav>
        </div>
    );
};

const NavLink = ({ to, children }) => (
    <Link
        to={to}
        className="hover:text-white transition-colors"
    >
        {children}
    </Link>
);

const MenuLink = ({ icon, title, desc, href, onClick, disabled }) => {
    if (disabled) {
        return (
            <div className="flex items-start gap-3 p-2 rounded-lg opacity-50 cursor-not-allowed">
                <div className="mt-0.5">{icon}</div>
                <div>
                    <div className="text-sm font-medium text-zinc-400">{title}</div>
                    <div className="text-[10px] text-zinc-600 font-mono">{desc}</div>
                </div>
            </div>
        );
    }

    // Check if it's an anchor link for smooth scrolling
    const isAnchor = href.startsWith('/#');

    if (isAnchor) {
        return (
            <Link
                to={href.replace('/', '')} // Remove leading slash to make it relative to root (which includes basename) or just keep it?
                // Actually, if we use <Link to="/#hash"> with basename, it works.
                // But wait, <Link to="/#..."> is absolute path from router root. 
                // Router root is /website/. So it becomes /website/#...
                // Perfect.
                to={href}
                onClick={(e) => {
                    if (onClick) {
                        onClick(e);
                    }
                }}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group/item"
            >
                <div className="mt-0.5 group-hover/item:scale-110 transition-transform duration-300">{icon}</div>
                <div>
                    <div className="text-sm font-medium text-zinc-200 group-hover/item:text-white transition-colors">{title}</div>
                    <div className="text-[10px] text-zinc-500 group-hover/item:text-zinc-400 transition-colors font-mono">{desc}</div>
                </div>
            </Link>
        );
    }

    return (
        <Link
            to={href}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group/item"
        >
            <div className="mt-0.5 group-hover/item:scale-110 transition-transform duration-300">{icon}</div>
            <div>
                <div className="text-sm font-medium text-zinc-200 group-hover/item:text-white transition-colors">{title}</div>
                <div className="text-[10px] text-zinc-500 group-hover/item:text-zinc-400 transition-colors font-mono">{desc}</div>
            </div>
        </Link>
    );
};
