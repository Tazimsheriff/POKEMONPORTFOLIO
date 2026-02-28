import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, Info, Search } from 'lucide-react';
import kantoMap from '../KANTO.PNG';

const locations = [
    { id: 1, name: "Pallet Town", top: "78%", left: "22%", desc: "Where it all begins. A quiet town with a famous laboratory." },
    { id: 2, name: "Viridian City", top: "62%", left: "22%", desc: "The gateway to the Indigo Plateau." },
    { id: 3, name: "Pewter City", top: "42%", left: "22%", desc: "A stone-cold city featuring the first Gym." },
    { id: 4, name: "Cerulean City", top: "32%", left: "48%", desc: "A city surrounded by water." },
    { id: 5, name: "Vermilion City", top: "58%", left: "48%", desc: "A bustling port city." },
    { id: 6, name: "Lavender Town", top: "42%", left: "75%", desc: "A spooky town known for the Pokemon Tower." },
    { id: 7, name: "Celadon City", top: "42%", left: "42%", desc: "The city of rainbow dreams and big department stores." },
    { id: 8, name: "Fuchsia City", top: "75%", left: "48%", desc: "Home to the Safari Zone." },
    { id: 9, name: "Saffron City", top: "48%", left: "55%", desc: "The central hub of Kanto." },
    { id: 10, name: "Cinnabar Island", top: "88%", left: "22%", desc: "A volcanic island known for its laboratory." },
];

const JourneyPage = ({ onBack }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen pt-24 pb-12 px-6 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <motion.button
                        whileHover={{ scale: 1.05, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBack}
                        className="flex items-center gap-2 px-6 py-3 glass-morphism rounded-xl text-white font-pixel text-[10px] border-2 border-white/10 hover:border-poke-red transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> BACK TO PORTFOLIO
                    </motion.button>

                    <div className="text-right">
                        <h1 className="text-2xl md:text-4xl font-pixel text-white mb-2 uppercase tracking-tighter shadow-black drop-shadow-lg">
                            KANTO <span className="text-poke-red">REGION</span>
                        </h1>
                        <p className="text-poke-yellow font-pixel text-[10px] tracking-widest bg-black/40 px-3 py-1 rounded inline-block">
                            EXPLORATION MODE ACTIVE
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Main Map View */}
                    <div className="lg:col-span-8 relative aspect-[4/3] glass-morphism rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl group">
                        {/* Map Legend/Overlay */}
                        <div className="absolute top-6 left-6 z-20 glass-morphism p-4 rounded-2xl border-2 border-white/10 max-w-[200px]">
                            <h3 className="font-pixel text-[8px] mb-3 text-poke-yellow">REGION LEGEND</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-3 h-3 text-poke-red" />
                                    <span className="font-pixel text-[6px] text-white">MAJOR CITIES</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Search className="w-3 h-3 text-poke-blue" />
                                    <span className="font-pixel text-[6px] text-white">POKEMON SPOTS</span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Map Surface */}
                        <div className="absolute inset-0 pixelated bg-black/40">
                            <img
                                src={kantoMap}
                                alt="Kanto Map Detail"
                                className="w-full h-full object-contain opacity-100 brightness-[1.1] group-hover:brightness-125 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />

                            {locations.map((loc) => (
                                <motion.div
                                    key={loc.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 + loc.id * 0.05, type: 'spring' }}
                                    style={{ top: loc.top, left: loc.left }}
                                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center group/pin"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2, y: -5 }}
                                        className="bg-poke-red p-2 rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,0,0,0.5)] cursor-pointer"
                                    >
                                        <MapPin className="w-4 h-4 text-white" />
                                    </motion.div>

                                    <div className="mt-2 px-3 py-1 bg-black/80 backdrop-blur-sm border border-white/20 rounded font-pixel text-[6px] text-white opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        {loc.name.toUpperCase()}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Professor Oak Message */}
                        <div className="absolute bottom-6 left-6 right-6 z-20 glass-morphism p-6 rounded-2xl border-2 border-red-500/30 flex gap-6 items-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border-2 border-white/20 shrink-0 flex items-center justify-center overflow-hidden">
                                <div className="text-white/30 font-pixel text-xs">OAK</div>
                            </div>
                            <div>
                                <h4 className="font-pixel text-xs text-poke-yellow mb-1 uppercase">PROF. OAK</h4>
                                <p className="font-sans text-sm text-gray-300 leading-snug">
                                    "Welcome to the Kanto map! Hover over the red pins to rediscover the landmarks of our region."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Side Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="glass-morphism p-8 rounded-3xl border-2 border-white/10">
                            <h3 className="font-pixel text-sm mb-6 flex items-center gap-3">
                                <Info className="w-5 h-5 text-poke-blue" />
                                JOURNEY LOG
                            </h3>
                            <div className="space-y-6">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-poke-yellow transition-colors group cursor-default">
                                    <span className="text-[8px] font-pixel text-gray-500 block mb-2">QUICK TIP</span>
                                    <p className="text-xs text-gray-300 font-sans group-hover:text-white transition-colors">
                                        The Kanto region map background helps you visualize the journey from Pallet Town to the Indigo Plateau.
                                    </p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <span className="text-[8px] font-pixel text-gray-500 block mb-2">REGIONAL DATA</span>
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-pixel text-white">DISCOVERED CITIES</span>
                                        <span className="text-lg font-pixel text-poke-red italic">10 / 10</span>
                                    </div>
                                    <div className="mt-4 h-2 bg-black/40 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            className="h-full bg-gradient-to-r from-poke-red to-poke-yellow"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-morphism p-6 rounded-3xl border-2 border-white/10 bg-poke-blue/5">
                            <p className="text-[8px] font-pixel text-center text-poke-blue/70 animate-pulse uppercase">
                                Syncing with Pokedex...
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decor Specific to this view */}
            <div className="fixed top-1/4 right-0 w-96 h-96 bg-poke-blue/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="fixed bottom-1/4 left-0 w-96 h-96 bg-poke-red/10 rounded-full blur-[150px] pointer-events-none" />
        </motion.div>
    );
};

export default JourneyPage;
