
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

const SALES_INTEREST = 'Perception evaluation (rtsm-eval)';

export const Connect = () => {
    const [params] = useSearchParams();
    // /connect?interest=evaluation is the contact-sales entry for rtsm-eval: same form, same inbox, different copy.
    const sales = params.get('interest') === 'evaluation';
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        interest: sales ? SALES_INTEREST : 'Research collaboration',
        message: ''
    });

    // The page stays mounted when only the query changes, so the preselection follows the link, not the first render.
    useEffect(() => {
        if (sales) {
            setFormData((f) => ({ ...f, interest: SALES_INTEREST }));
        }
    }, [sales]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("https://formspree.io/f/mqarndoe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                console.error("Submission failed");
                alert("There was a problem submitting your form. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There was a problem submitting your form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (submitted) {
        return (
            <div className="bg-[#050505] min-h-screen text-zinc-300 font-sans antialiased selection:bg-indigo-500/20 selection:text-white flex flex-col">
                <div className="flex-1 flex items-center justify-center px-6 pt-20">
                    <div className="max-w-md w-full text-center">
                        <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
                        <p className="text-zinc-400 mb-8">
                            {sales
                                ? 'Thanks. We will reply with the concierge checklist and a slot within two working days.'
                                : "Thanks for reaching out. We're excited to collaborate with you on the next generation of robotics protocols."}
                        </p>
                        <Button onClick={() => window.location.href = '/'}>Return Home</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#050505] min-h-screen text-zinc-300 font-sans antialiased overflow-x-hidden selection:bg-indigo-500/20 selection:text-white">
            {sales ? (
                <SEO
                    title="Contact sales"
                    description="Send a recording your robot made and get a perception evaluation report on it. Engagements are one-to-one; no price list."
                />
            ) : (
                <SEO
                    title="Connect"
                    description="Collaborate on the Standard. Help us design the protocols for the next century of robotics."
                />
            )}
            <section className="pt-32 pb-20 px-6 relative">
                {/* Background Decorations - mimicking About page style */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--accent-glow,rgba(56,189,248,0.15)),_transparent_70%)] pointer-events-none"></div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-12 md:mt-24">

                    {/* Left Column: Content */}
                    <div className="space-y-12 animate-fade-in opacity-0 [animation-delay:0.1s]">
                        <div className="relative">
                            <div className="absolute -top-24 left-0">
                                <div className="text-2xl font-mono text-white uppercase tracking-[0.2em] animate-fade-in opacity-0">
                                    {sales ? 'Contact sales' : 'Connect'}
                                </div>
                            </div>
                            {sales ? (
                                <h1 className="text-5xl md:text-6xl font-heading font-medium text-white tracking-tighter mb-6 leading-[1.1]">
                                    Evaluate your perception stack <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-white to-zinc-400">on your own recordings.</span>
                                </h1>
                            ) : (
                                <h1 className="text-5xl md:text-6xl font-heading font-medium text-white tracking-tighter mb-6 leading-[1.1]">
                                    Collaborate on <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-white to-zinc-400">the Standard.</span>
                                </h1>
                            )}
                            <div className="h-1 w-20 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full mt-4"></div>
                        </div>

                        {sales ? (
                            <div className="space-y-8">
                                <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500">
                                    <h3 className="text-xl text-white font-medium mb-3">What to send</h3>
                                    <ul className="text-zinc-400 leading-relaxed space-y-2 list-disc pl-5">
                                        <li>A 1 to 5 minute RGB-D recording with pose: a ROS 1 bag, rosbag2 or MCAP, or a Calabi Lens recording.</li>
                                        <li>Which detector and configuration you run.</li>
                                        <li>Which machine it runs on.</li>
                                    </ul>
                                </div>

                                <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-500">
                                    <h3 className="text-xl text-white font-medium mb-3">What you get</h3>
                                    <ul className="text-zinc-400 leading-relaxed space-y-2 list-disc pl-5">
                                        <li>The health report on your recording within the week.</li>
                                        <li>The gate store to regress against, and the exports your team's tools read.</li>
                                        <li>An on-premises run where nothing leaves your machine, when that is required.</li>
                                    </ul>
                                </div>

                                <p className="text-sm text-zinc-500">Engagements are scoped one-to-one; there is no price list.</p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500">
                                    <h3 className="text-xl text-white font-medium mb-2">For contributors</h3>
                                    <p className="text-zinc-400 leading-relaxed">
                                        Help us design the protocols for the next century of robotics.
                                    </p>
                                </div>

                                <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-500">
                                    <h3 className="text-xl text-white font-medium mb-2">For research partners</h3>
                                    <p className="text-zinc-400 leading-relaxed">
                                        Exploring world models? If you need a spatial memory backbone, let’s compare notes.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-zinc-900/30 p-8 md:p-10 rounded-3xl border border-white/5 animate-fade-in opacity-0 [animation-delay:0.3s]">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-zinc-300">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-600"
                                    placeholder="Jane Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-600"
                                    placeholder="jane@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="organization" className="text-sm font-medium text-zinc-300">Organization</label>
                                <input
                                    type="text"
                                    id="organization"
                                    name="organization"
                                    required
                                    value={formData.organization}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-600"
                                    placeholder="Acme Robotics"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="interest" className="text-sm font-medium text-zinc-300">Interest</label>
                                <div className="relative">
                                    <select
                                        id="interest"
                                        name="interest"
                                        value={formData.interest}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value={SALES_INTEREST}>{SALES_INTEREST}</option>
                                        <option value="Research collaboration">Research collaboration</option>
                                        <option value="Design partnership">Design partnership</option>
                                        <option value="Open‑source contribution">Open‑source contribution</option>
                                        <option value="Early access / demo">Early access / demo</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                        <ArrowRight className="w-4 h-4 rotate-90" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-zinc-300">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-600 resize-none"
                                    placeholder={sales ? 'What does your robot look at, and what has been going wrong?' : "Tell us how you'd like to collaborate..."}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};
