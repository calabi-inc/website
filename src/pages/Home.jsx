import { Hero } from '../components/Hero';
import { InfrastructureStack } from '../components/InfrastructureStack';
import { StackAnimation } from '../components/StackAnimation';
import { DemoVideo } from '../components/DemoVideo';
import { Benchmarks } from '../components/Benchmarks';
import { CalabiLens } from '../components/CalabiLens';
import { CTA } from '../components/CTA';
import { SEO } from '../components/SEO';

export const Home = () => {
    return (
        <div className="bg-[#050505] min-h-screen text-zinc-300 font-sans antialiased overflow-x-hidden selection:bg-indigo-500/20 selection:text-white">
            <SEO />

            <Hero />
            <DemoVideo />
            <Benchmarks />
            <CalabiLens />
            <StackAnimation />
            <InfrastructureStack />
            <CTA />

        </div>
    );
};
