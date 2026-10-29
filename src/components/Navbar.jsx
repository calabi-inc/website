import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, ArrowRight, ChevronDown, Eye, BarChart3, Smartphone, PlayCircle, Box, LayoutDashboard, Layers, Glasses, Building2, Mail, Users, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/white_logo_with_company_name.svg';

import { useUI } from '../contexts/UIContext';

const CONTACT_SALES = '/connect?interest=evaluation';

// Three dropdowns (Products, Solutions, Company) plus Research and Docs. The engine's architecture and roadmap sit under
// Products as one link to /technology; the "/#..." anchors that remain point at sections of the front page.
const MENUS = {
    products: {
        label: 'Products',
        items: [
            { icon: Eye, color: 'text-indigo-400', title: 'RTSM engine', desc: 'Semantic mapping, open source', href: '/technology' },
            { icon: BarChart3, color: 'text-emerald-400', title: 'rtsm-eval', desc: 'Evaluation on your recordings', href: '/rtsm-eval' },
            { icon: PlayCircle, color: 'text-cyan-400', title: 'Sample report', desc: 'On a public recording', href: '/rtsm-eval#sample' },
            { icon: Smartphone, color: 'text-cyan-400', title: 'Calabi Lens', desc: 'iPhone capture', href: '/#calabi-lens', scroll: ['calabi-lens'] },
        ],
    },
    solutions: {
        label: 'Solutions',
        items: [
            { icon: Box, color: 'text-blue-400', title: 'Retail & Warehouse', desc: 'Persistent inventory', href: '/retail-warehouse' },
            { icon: LayoutDashboard, color: 'text-orange-400', title: 'Agentic Workflow', desc: 'Agents on a shared world state', href: '/agentic-workflow' },
            { icon: Layers, color: 'text-pink-400', title: 'Real-to-Sim', desc: 'Scans a simulator can load', href: '/real-to-sim' },
            { icon: Glasses, color: 'text-yellow-400', title: 'AR/XR Overlay', desc: 'Semantics anchored to geometry', href: '/ar-xr-overlay' },
        ],
    },
    company: {
        label: 'Company',
        items: [
            { icon: Building2, color: 'text-zinc-300', title: 'About', desc: 'What we build and how we work', href: '/about' },
            { icon: Mail, color: 'text-amber-400', title: 'Contact sales', desc: 'One-to-one engagements', href: CONTACT_SALES },
            { icon: Users, color: 'text-purple-400', title: 'Join the Hub', desc: 'Contributors and research partners', href: '/connect' },
        ],
    },
};

export const Navbar = () => {
    const { openWip } = useUI();
    const [open, setOpen] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(null);
    const location = useLocation();

    const isHome = location.pathname === '/';

    const closeMenus = () => {
        setOpen(null);
        setIsMobileMenuOpen(false);
    };

    // Anchors on the front page scroll in place when the visitor is already there; elsewhere the "/#hash" link navigates.
    const handleScroll = (e, targetId, hash) => {
        closeMenus();
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
    };

    const onClickFor = (item) => (item.scroll ? (e) => handleScroll(e, item.scroll[0], item.scroll[1]) : closeMenus);

    const dropdown = {
        initial: { opacity: 0, y: 10, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 10, scale: 0.95 },
        transition: { duration: 0.2 },
    };

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 animate-fade-in pointer-events-none">
            <nav className="flex w-full max-w-5xl items-center justify-between rounded-full border border-white/5 bg-[#050505]/80 p-2 pl-6 shadow-2xl backdrop-blur-xl ring-1 ring-white/5 pointer-events-auto relative z-50">
                <Link to="/" className="flex items-center gap-2 group">
                    <img src={logo} alt="Calabi" className="h-5 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
                </Link>

                <div className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-400">
                    {Object.entries(MENUS).map(([key, menu]) => (
                        <div
                            key={key}
                            className="relative"
                            onMouseEnter={() => setOpen(key)}
                            onMouseLeave={() => setOpen((o) => (o === key ? null : o))}
                        >
                            <button className={`flex items-center gap-1 hover:text-white transition-colors py-2 ${open === key ? 'text-white' : ''}`}>
                                {menu.label}
                                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${open === key ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {open === key && (
                                    <motion.div {...dropdown} className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[300px]">
                                        <div className="bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 ring-1 ring-white/5 flex flex-col gap-1">
                                            {menu.items.map((item) => (
                                                <MenuLink key={item.title} icon={<item.icon className={`w-4 h-4 ${item.color}`} />} title={item.title} desc={item.desc} href={item.href} onClick={onClickFor(item)} />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    <NavLink to="/blog">Research</NavLink>
                    <NavLink to="/docs">Docs</NavLink>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-3">
                        <a href="https://github.com/calabi-inc/rtsm" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-neutral-400 hover:text-white transition-colors px-2">
                            <Github className="w-4 h-4" />
                        </a>
                        <Link
                            to={CONTACT_SALES}
                            className="group relative flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-neutral-800"
                            style={{
                                '--border-gradient': 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                                '--border-radius-before': '9999px'
                            }}
                        >
                            <span>Contact sales</span>
                            <ArrowRight className="w-3 h-3 opacity-50 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    <button
                        className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[calc(100%+12px)] max-w-sm w-full mx-6 bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 ring-1 ring-white/5 pointer-events-auto"
                    >
                        <div className="flex flex-col gap-4">
                            <MobileNavLink to="/" onClick={closeMenus}>Home</MobileNavLink>

                            {Object.entries(MENUS).map(([key, menu]) => (
                                <div key={key} className="border-b border-white/5 pb-4">
                                    <button
                                        onClick={() => setMobileOpen((o) => (o === key ? null : key))}
                                        className="flex w-full items-center justify-between py-2 text-sm font-medium text-zinc-400 hover:text-white"
                                    >
                                        {menu.label}
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileOpen === key ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {mobileOpen === key && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden pt-2"
                                            >
                                                <div className="pl-2 border-l border-white/10 space-y-2">
                                                    {menu.items.map((item) => (
                                                        <Link key={item.title} to={item.href} onClick={onClickFor(item)} className="block text-xs text-zinc-500 hover:text-white py-1">{item.title}</Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            <MobileNavLink to="/blog" onClick={closeMenus}>Research</MobileNavLink>
                            <MobileNavLink to="/docs" onClick={closeMenus}>Docs</MobileNavLink>

                            <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                                <a href="https://github.com/calabi-inc/rtsm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors">
                                    <Github className="w-4 h-4" /> <span>Check out the code</span>
                                </a>
                                <Link
                                    to={CONTACT_SALES}
                                    onClick={closeMenus}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-xs font-medium text-white transition-all hover:bg-neutral-800 border border-white/10"
                                >
                                    <span>Contact sales</span>
                                    <ArrowRight className="w-3 h-3 opacity-50" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const NavLink = ({ to, children }) => (
    <Link to={to} className="hover:text-white transition-colors">
        {children}
    </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
    <Link to={to} onClick={onClick} className="block text-sm font-medium text-zinc-400 hover:text-white transition-colors py-2">
        {children}
    </Link>
);

const MenuLink = ({ icon, title, desc, href, onClick }) => (
    <Link
        to={href}
        onClick={onClick}
        className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group/item"
    >
        <div className="mt-0.5 group-hover/item:scale-110 transition-transform duration-300">{icon}</div>
        <div>
            <div className="text-sm font-medium text-zinc-200 group-hover/item:text-white transition-colors">{title}</div>
            <div className="text-[10px] text-zinc-500 group-hover/item:text-zinc-400 transition-colors font-mono">{desc}</div>
        </div>
    </Link>
);
