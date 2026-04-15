import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Youtube } from 'lucide-react';
import logo from '../assets/white_logo_with_company_name.svg';

export const Footer = () => {

    return (
        <footer className="border-t border-white/5 bg-black py-16 px-6 text-sm">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
                <div className="col-span-2 md:col-span-1">
                    <Link to="/" className="flex items-center gap-2 mb-6">
                        <img src={logo} alt="Calabi" className="h-6 w-auto opacity-90 hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
                        Spatial Memory for Robots and AI Agents. <br />
                        Open-source infrastructure for embodied AI.
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
                        <a href="https://github.com/calabi-inc/rtsm" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                        <a href="https://linkedin.com/company/calabi-inc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
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
