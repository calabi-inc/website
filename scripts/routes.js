// Every route the app serves, with the meta its direct-load HTML carries. generate-meta.js writes dist/<route>/index.html
// from this table after the build (GitHub Pages serves files, not routes: without these files a pasted link to /docs or
// /rtsm-eval returned the 404 page); check-routes.js fails the build when App.jsx serves a route that is not listed here.
// Titles and descriptions mirror each page's <SEO> call; keep them in step when a page's SEO text changes.
export const SITE_URL = 'https://www.calabi.com';
export const DEFAULT_IMAGE = '/og/og-home.jpg';

export const ROUTES = {
    '/': {
        title: 'Calabi — Perception that remembers, for physical AI',
        description: 'Calabi builds the perception pipeline and semantic map that give robots and agents a persistent, queryable picture of a space, and the evaluation that tells a team what their perception actually did on site.',
    },
    '/technology': {
        title: 'Technology: the RTSM engine | Calabi',
        description: 'RTSM turns RGB-D camera streams into a persistent, queryable 3D world state: the architecture, the benchmarks, the capture app, and the layers planned above the perception layer.',
    },
    '/rtsm-eval': {
        title: 'rtsm-eval — Perception evaluation on your recordings | Calabi',
        description: 'rtsm-eval reports what your perception stack did on a recording your robot made: what it found, what it kept seeing, where it lost track and why. No labels needed. Numbers you can regress against.',
        image: '/og/og-rtsm-eval.jpg',
    },
    '/docs': {
        title: 'Documentation | Calabi',
        description: "Build with deterministic confidence. Integrate Real-Time Semantic Mapping (RTSM) into your robotics stack using Calabi's open infrastructure.",
    },
    '/blog': {
        title: 'Research and writing | Calabi',
        description: "Deep dives into RTSM, World Models, and the future of robotics. Read about the engineering and research behind Calabi's open infrastructure.",
    },
    '/agentic-workflow': {
        title: 'Agentic Workflow | Calabi',
        description: "Bridge semantic intent to physical execution. Calabi's RTSM acts as the shared source of truth, enabling agents to query, plan, and act in the real world.",
    },
    '/retail-warehouse': {
        title: 'Retail & Warehouse | Calabi',
        description: 'The Persistent Inventory. Single-frame detection loses track. RTSM maintains object identity and history across time and viewpoints, ensuring zero lost item gaps.',
    },
    '/real-to-sim': {
        title: 'Real-to-Sim Pipelines | Calabi',
        description: 'Automatic Digital Twins. Building simulation environments manually is slow. RTSM scans spaces to build semantic state graphs for instant simulation.',
    },
    '/ar-xr-overlay': {
        title: 'AR/XR Overlay | Calabi',
        description: 'The World’s Metadata. AR needs semantics anchored to geometry. RTSM serves queryable semantic tags tied to world coordinates.',
    },
    '/about': {
        title: 'About Calabi | Calabi',
        description: 'Calabi builds the memory layer for physical AI: an open-source semantic mapping engine, a perception evaluation on your own recordings, and a capture app. A small company; every claim printed with its rule.',
    },
    '/terms': {
        title: 'Terms of Service | Calabi',
        description: "These Terms of Service govern your access to and use of Calabi's website and services.",
    },
    '/connect': {
        title: 'Connect | Calabi',
        description: 'Collaborate on the Standard, or talk to us about a perception evaluation on your own recordings.',
    },
    '/privacy': {
        title: 'Privacy Policy | Calabi',
        description: 'This Privacy Policy explains how Calabi collects, uses, and shares information about you when you visit our website.',
    },
};
