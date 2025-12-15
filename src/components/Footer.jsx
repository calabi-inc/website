import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Youtube } from 'lucide-react';
import logo from '../assets/white_logo_with_company_name.svg';
import { useUI } from '../contexts/UIContext';

export const Footer = () => {
    const { openWip } = useUI();

    return (
        <footer className="border-t border-white/5 bg-black py-16 px-6 text-sm">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
                <div className="col-span-2 md:col-span-1">
                    <Link to="/" className="flex items-center gap-2 mb-6">
                        <img src={logo} alt="Calabi" className="h-6 w-auto opacity-90 hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
                        Grounding Intelligence in the Real World. <br />
                        Open infrastructure for collaborative embodied AI.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-medium mb-4">Developers</h4>
                    <ul className="space-y-3 text-zinc-500">
                        <li><a href="/#stack-detail-perception" className="hover:text-white transition-colors">RTSM</a></li>
                        <li><a href="/#system-architecture-overview" className="hover:text-white transition-colors">System Overview</a></li>
                        <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                        <li><a href="https://calabi-inc.github.io/rtsm/api/rest-api/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">API Reference</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-medium mb-4">Company</h4>
                    <ul className="space-y-3 text-zinc-500">
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>

                        <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>

                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-medium mb-4">Connect</h4>
                    <div className="flex gap-4 text-zinc-500">
                        <button onClick={openWip} className="hover:text-white transition-colors" aria-label="X (Twitter)">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </button>
                        <button onClick={openWip} className="hover:text-white transition-colors" aria-label="Discord">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                        </button>
                        <a href="https://github.com/calabi-inc/rtsm" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        <Link to="/connect" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></Link>
                        <a href="https://www.youtube.com/@calabi-inc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600">
                <p>&copy; {new Date().getFullYear()} Calabi Inc. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link to="/privacy" className="hover:text-zinc-400">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-zinc-400">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};
