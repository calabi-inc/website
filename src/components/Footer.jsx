import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Youtube } from 'lucide-react';
import logo from '../assets/white_logo_with_company_name.svg';
import { InceptionBadge } from './InceptionBadge';

const COLUMNS = [
    { title: 'Products', links: [['RTSM engine', '/technology'], ['rtsm-eval', '/rtsm-eval'], ['Sample report', '/rtsm-eval#sample'], ['Calabi Lens', '/#calabi-lens']] },
    { title: 'Solutions', links: [['Retail & Warehouse', '/retail-warehouse'], ['Agentic Workflow', '/agentic-workflow'], ['Real-to-Sim', '/real-to-sim'], ['AR/XR Overlay', '/ar-xr-overlay']] },
    { title: 'Resources', links: [['Documentation', '/docs'], ['API Reference', 'https://calabi-inc.github.io/rtsm/api/rest-api/'], ['Research', '/blog'], ['Architecture', '/technology#system-architecture-overview']] },
    { title: 'Company', links: [['About', '/about'], ['Contact sales', '/connect?interest=evaluation'], ['Join the Hub', '/connect']] },
];

const FooterLink = ({ label, to }) => {
    const cls = 'hover:text-white transition-colors';
    if (to.startsWith('http')) return <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>{label}</a>;
    if (to.startsWith('/#')) return <a href={to} className={cls}>{label}</a>;
    return <Link to={to} className={cls}>{label}</Link>;
};

export const Footer = () => {

    return (
        <footer className="border-t border-white/5 bg-black py-16 px-6 text-sm">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-12">
                <div className="col-span-2">
                    <Link to="/" className="flex items-center gap-2 mb-6">
                        <img src={logo} alt="Calabi" className="h-6 w-auto opacity-90 hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
                        Perception that remembers, for physical AI. <br />
                        An open-source semantic mapping engine and a perception evaluation on your own recordings.
                    </p>
                    <div className="flex gap-4 text-zinc-500 mt-6">
                        <a href="https://github.com/calabi-inc/rtsm" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                        <a href="https://linkedin.com/company/calabi-inc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        <Link to="/connect" aria-label="Contact" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></Link>
                        <a href="https://www.youtube.com/@calabi-inc" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
                    </div>
                </div>

                {COLUMNS.map((c) => (
                    <div key={c.title}>
                        <h4 className="text-white font-medium mb-4">{c.title}</h4>
                        <ul className="space-y-3 text-zinc-500">
                            {c.links.map(([label, to]) => <li key={label}><FooterLink label={label} to={to} /></li>)}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
                <p>&copy; {new Date().getFullYear()} Calabi Inc. All rights reserved.</p>
                <InceptionBadge />
                <div className="flex gap-6">
                    <Link to="/privacy" className="hover:text-zinc-400">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-zinc-400">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};
