import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';

import { Docs } from './pages/Docs';
import { Blog } from './pages/Blog';
import { About } from './pages/About';

import { AgenticWorkflow } from './pages/AgenticWorkflow';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { BlogPost } from './pages/BlogPost';
import { RetailWarehouse } from './pages/RetailWarehouse';
import { RealToSim } from './pages/RealToSim';
import { ArXrOverlay } from './pages/ArXrOverlay';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTopBtn } from './components/ScrollToTopBtn';
import ScrollToTop from './components/ScrollToTop';

import { UIProvider } from './contexts/UIContext';
import { WipModal } from './components/WipModal';
import { Connect } from './pages/Connect';

function App() {
    return (
        <UIProvider>
            <div className="min-h-screen selection:bg-cyan-500/20 selection:text-cyan-200">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />

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
                <ScrollToTopBtn />
                <ScrollToTop />
                <Footer />
                <WipModal />
            </div>
        </UIProvider>
    );
}

export default App;
