import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

// The free first step of an rtsm-eval engagement: a 30-second sample from the recorder a team would use,
// checked within a business day. Its own page; contact sales stays at /connect?interest=evaluation.
const INTEREST = 'Pre-flight check (rtsm-eval)';

export const Preflight = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        sample_link: '',
        message: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://formspree.io/f/mqarndoe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ ...formData, interest: INTEREST, _subject: 'Pre-flight check (rtsm-eval)' }),
            });
            if (response.ok) {
                setSubmitted(true);
            } else {
                console.error('Submission failed');
                alert('There was a problem sending the sample link. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was a problem sending the sample link. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const field = 'w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-600';

    if (submitted) {
        return (
            <div className="bg-[#050505] min-h-screen text-zinc-300 font-sans antialiased selection:bg-indigo-500/20 selection:text-white flex flex-col">
                <SEO title="Pre-flight check" description="Sample received." />
                <div className="flex-1 flex items-center justify-center px-6 pt-20">
                    <div className="max-w-md w-full text-center">
                        <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Sample received.</h2>
                        <p className="text-zinc-400 mb-8">
                            You will hear back within a business day: whether the recording can be processed, the topics and rates found, and what the first page would and would not be able to say. The sample is deleted after the check.
                        </p>
                        <Link to="/rtsm-eval" className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
                            Back to rtsm-eval <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#050505] min-h-screen text-zinc-300 font-sans antialiased overflow-x-hidden selection:bg-indigo-500/20 selection:text-white">
            <SEO
                title="Pre-flight check"
                description="Send a 30-second sample from your robot's recorder. Within a business day we say whether it can be processed and what the first report would say. Free, no commitment."
            />
            <section className="pt-32 pb-20 px-6 relative">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--accent-glow,rgba(56,189,248,0.15)),_transparent_70%)] pointer-events-none"></div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-12 md:mt-24">
                    <div className="space-y-12 animate-fade-in opacity-0 [animation-delay:0.1s]">
                        <div className="relative">
                            <div className="absolute -top-24 left-0">
                                <div className="text-2xl font-mono text-white uppercase tracking-[0.2em] animate-fade-in opacity-0">Pre-flight check</div>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-heading font-medium text-white tracking-tighter mb-6 leading-[1.1]">
                                Send a 30-second <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-white to-zinc-400">sample first.</span>
                            </h1>
                            <div className="h-1 w-20 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full mt-4"></div>
                        </div>

                        <p className="text-zinc-400 leading-relaxed">
                            Before anyone moves a recording or books a call, we check a sample from the recorder you would use and say what the first report could say about it. The check is free and commits you to nothing.
                        </p>

                        <div className="space-y-8">
                            <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500">
                                <h3 className="text-xl text-white font-medium mb-3">What to send</h3>
                                <ul className="text-zinc-400 leading-relaxed space-y-2 list-disc pl-5">
                                    <li>A link to a 30-second sample from the recorder you would use: a ROS 1 bag, rosbag2 or MCAP with RGB, depth and pose, or a Calabi Lens recording. A sample is tens of megabytes; a bucket, a drive or a transfer link is fine.</li>
                                    <li>The camera and the robot, in one line.</li>
                                    <li>If you know them, which topics carry RGB, depth and pose. If not, the check finds them.</li>
                                </ul>
                            </div>

                            <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-500">
                                <h3 className="text-xl text-white font-medium mb-3">What you get, within a business day</h3>
                                <ul className="text-zinc-400 leading-relaxed space-y-2 list-disc pl-5">
                                    <li>Whether the recording can be processed, and if not, what is missing.</li>
                                    <li>The topics and rates found, and what the first page would and would not be able to say about it.</li>
                                    <li>The next step if you want one: the full recording, or the container on your machine.</li>
                                </ul>
                            </div>

                            <p className="text-sm text-zinc-500">
                                The sample is deleted after the check. Questions about scope or an engagement go to <Link to="/connect?interest=evaluation" className="text-zinc-300 hover:text-white underline underline-offset-4">contact sales</Link>.
                            </p>
                        </div>
                    </div>

                    <div className="bg-zinc-900/30 p-8 md:p-10 rounded-3xl border border-white/5 animate-fade-in opacity-0 [animation-delay:0.3s]">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-zinc-300">Name</label>
                                    <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className={field} placeholder="Jane Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email</label>
                                    <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className={field} placeholder="jane@example.com" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="organization" className="text-sm font-medium text-zinc-300">Organization</label>
                                <input id="organization" name="organization" type="text" required value={formData.organization} onChange={handleChange} className={field} placeholder="Acme Robotics" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="sample_link" className="text-sm font-medium text-zinc-300">Link to the 30-second sample</label>
                                <input id="sample_link" name="sample_link" type="url" required value={formData.sample_link} onChange={handleChange} className={field} placeholder="https://… (a bucket, a drive or a transfer link)" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-zinc-300">Camera, robot, and the topics if you know them</label>
                                <textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={4} className={field} placeholder="e.g. RealSense D435i on an AMR; /camera/color/image_raw, /camera/aligned_depth_to_color/image_raw, TF map→camera" />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send the sample link
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                            <p className="text-xs text-zinc-500 text-center">Free. No commitment. An answer within a business day.</p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};
