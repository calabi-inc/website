import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTopBtn } from './components/ScrollToTopBtn';
import ScrollToTop from './components/ScrollToTop';

import { UIProvider } from './contexts/UIContext';
import { WipModal } from './components/WipModal';

// Each page is its own chunk: a visitor to /rtsm-eval does not download the home page's 3D hero libraries.
// The pages use named exports, so the loader hands React.lazy a {default} it can render.
const page = (load, name) => lazy(() => load().then((m) => ({ default: m[name] })));
const Home = page(() => import('./pages/Home'), 'Home');
const Docs = page(() => import('./pages/Docs'), 'Docs');
const Blog = page(() => import('./pages/Blog'), 'Blog');
const About = page(() => import('./pages/About'), 'About');
const AgenticWorkflow = page(() => import('./pages/AgenticWorkflow'), 'AgenticWorkflow');
const Terms = page(() => import('./pages/Terms'), 'Terms');
const Privacy = page(() => import('./pages/Privacy'), 'Privacy');
const BlogPost = page(() => import('./pages/BlogPost'), 'BlogPost');
const RetailWarehouse = page(() => import('./pages/RetailWarehouse'), 'RetailWarehouse');
const RealToSim = page(() => import('./pages/RealToSim'), 'RealToSim');
const ArXrOverlay = page(() => import('./pages/ArXrOverlay'), 'ArXrOverlay');
const Connect = page(() => import('./pages/Connect'), 'Connect');
const RtsmEval = page(() => import('./pages/RtsmEval'), 'RtsmEval');
const Technology = page(() => import('./pages/Technology'), 'Technology');

function App() {
    return (
        <UIProvider>
            <div className="min-h-screen selection:bg-cyan-500/20 selection:text-cyan-200">
                <Navbar />
                <Suspense fallback={<div className="min-h-screen bg-[#050505]" aria-hidden="true" />}>
                    <Routes>
                        {/* The front page is the company page; the engine page it replaced is /technology. To swap back, exchange the two elements. */}
                        <Route path="/" element={<Home />} />
                        <Route path="/technology" element={<Technology />} />

                        <Route path="/rtsm-eval" element={<RtsmEval />} />
                        <Route path="/product" element={<Navigate to="/rtsm-eval" replace />} />

                        <Route path="/docs" element={<Docs />} />
                        <Route path="/blog" element={<Blog />} />

                        <Route path="/agentic-workflow" element={<AgenticWorkflow />} />
                        <Route path="/retail-warehouse" element={<RetailWarehouse />} />
                        <Route path="/real-to-sim" element={<RealToSim />} />
                        <Route path="/ar-xr-overlay" element={<ArXrOverlay />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/connect" element={<Connect />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                    </Routes>
                </Suspense>
                <ScrollToTopBtn />
                <ScrollToTop />
                <Footer />
                <WipModal />
            </div>
        </UIProvider>
    );
}

export default App;
