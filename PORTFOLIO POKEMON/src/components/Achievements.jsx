import { motion } from 'framer-motion';
import { Award, Mail, MessageSquare, Send, Github, Linkedin, Twitter } from 'lucide-react';

const badges = [
    { name: "Boulder Badge", event: "Hackathon Winner", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/1.png" },
    { name: "Cascade Badge", event: "Open Source Contributor", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/2.png" },
    { name: "Thunder Badge", event: "AWS Certified", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/3.png" },
    { name: "Rainbow Badge", event: "Full Stack Mastery", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/4.png" },
    { name: "Soul Badge", event: "Cybersecurity Pro", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/5.png" },
    { name: "Marsh Badge", event: "UI/UX Design Award", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/6.png" },
    { name: "Volcano Badge", event: "Firebase Expert", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/7.png" },
    { name: "Earth Badge", event: "Computer Science Degree", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/8.png" },
];

export const GymBadges = () => (
    <section id="badges" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-pixel mb-16 flex items-center justify-center gap-4">
            <span className="w-12 h-1 bg-poke-gold inline-block" />
            GYM BADGES (ACHIEVEMENTS)
            <span className="w-12 h-1 bg-poke-gold inline-block" />
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8">
            {badges.map((b, i) => (
                <motion.div
                    key={b.name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, rotate: 5 }}
                    className="flex flex-col items-center group cursor-help"
                >
                    <div className="w-16 h-16 md:w-24 md:h-24 glass-morphism rounded-2xl border-4 border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] mb-4 flex items-center justify-center relative overflow-hidden group-hover:border-poke-gold transition-colors">
                        <img
                            src={b.image}
                            alt={b.name}
                            className="w-10 h-10 md:w-16 md:h-16 object-contain pixelated group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                        />
                        <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </div>
                    <span className="font-pixel text-[8px] md:text-[10px] text-center text-gray-400 group-hover:text-poke-yellow transition-colors uppercase leading-relaxed">
                        {b.name}
                        <br />
                        <span className="text-[6px] text-gray-600 group-hover:text-white transition-colors">{b.event}</span>
                    </span>
                </motion.div>
            ))}
        </div>
    </section>
);

export const PokemonCenter = () => (
    <section id="contact" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
            <div className="glass-morphism border-8 border-poke-red rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.15)]">
                {/* PC Header */}
                <div className="bg-poke-red p-6 flex items-center justify-between">
                    <div className="flex gap-4">
                        <div className="w-6 h-6 bg-white rounded-full animate-pulse shadow-[0_0_10px_#fff]" />
                        <div className="w-6 h-6 bg-white/30 rounded-full" />
                        <div className="w-6 h-6 bg-white/30 rounded-full" />
                    </div>
                    <h2 className="font-pixel text-xs md:text-sm text-white uppercase tracking-widest">
                        Pokémon Center / Contact Support
                    </h2>
                </div>

                <div className="p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Left: Message */}
                        <div>
                            <div className="mb-8">
                                <h3 className="font-pixel text-lg mb-6 text-poke-yellow">WELCOME!</h3>
                                <p className="text-gray-400 font-sans leading-relaxed">
                                    We can heal your project's bugs and restore its full potential.
                                    Leave a message and Nurse Joy (my inbox) will get back to you shortly.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-poke-red transition-colors">
                                        <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-pixel text-gray-600">GITHUB</div>
                                        <div className="text-sm font-pixel text-gray-300 group-hover:text-white">@tazim-codes</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-poke-blue transition-colors">
                                        <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-pixel text-gray-600">LINKEDIN</div>
                                        <div className="text-sm font-pixel text-gray-300 group-hover:text-white">tazim-sheriff</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="font-pixel text-[10px] text-gray-500 mb-2 block uppercase uppercase tracking-widest">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="TRAINER NAME"
                                    className="w-full bg-black/40 border-2 border-white/5 rounded-xl p-4 font-pixel text-xs focus:border-poke-yellow outline-none transition-colors text-white"
                                />
                            </div>
                            <div>
                                <label className="font-pixel text-[10px] text-gray-500 mb-2 block uppercase uppercase tracking-widest">Inquiry Type</label>
                                <select className="w-full bg-black/40 border-2 border-white/5 rounded-xl p-4 font-pixel text-xs focus:border-poke-yellow outline-none transition-colors text-white appearance-none">
                                    <option>NEW PROJECT JOURNEY</option>
                                    <option>BUG HEALING</option>
                                    <option>BATTLE REQUEST</option>
                                </select>
                            </div>
                            <div>
                                <label className="font-pixel text-[10px] text-gray-500 mb-2 block uppercase uppercase tracking-widest">Message</label>
                                <textarea
                                    rows="4"
                                    placeholder="WHAT'S ON YOUR MIND?"
                                    className="w-full bg-black/40 border-2 border-white/5 rounded-xl p-4 font-pixel text-xs focus:border-poke-yellow outline-none transition-colors text-white resize-none"
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-poke-yellow text-black font-pixel text-sm py-4 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,222,0,0.2)] hover:bg-yellow-400 transition-colors"
                            >
                                <Send className="w-5 h-5" /> SEND MESSAGE
                            </motion.button>
                        </form>
                    </div>
                </div>

                {/* PC Footer Decoration */}
                <div className="h-4 bg-white/5 border-t border-white/10" />
            </div>

            <div className="mt-12 text-center pointer-events-none opacity-20">
                <div className="text-[10px] font-pixel text-gray-400 mb-4 animate-bounce">SCROLLED TO THE END OF THE REGION</div>
                <div className="text-[8px] font-pixel text-gray-600 uppercase tracking-widest">Designed for the best trainers in the world</div>
            </div>
        </div>
    </section>
);
