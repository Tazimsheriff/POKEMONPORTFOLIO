import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Wind, Waves, Compass } from 'lucide-react';

const regions = [
    {
        id: 'kanto',
        name: 'Kanto',
        icon: Compass,
        color: 'bg-poke-red',
        accent: 'text-poke-red',
        desc: 'The original 151. Where it all began.'
    },
    {
        id: 'johto',
        name: 'Johto',
        icon: Wind,
        color: 'bg-poke-yellow',
        accent: 'text-poke-yellow',
        desc: '100 new species. New horizons await.'
    },
    {
        id: 'hoenn',
        name: 'Hoenn',
        icon: Waves,
        color: 'bg-poke-blue',
        accent: 'text-poke-blue',
        desc: 'Land and Sea. The ultimate exploration.'
    }
];

const FlyMenu = ({ currentRegion, onTravel }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-10 right-10 z-[1000]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-20 right-0 w-72 glass-morphism border-2 border-white/20 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        {/* Background glow */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="font-pixel text-[10px] text-gray-500 mb-6 uppercase tracking-widest">Select Destination</h3>

                            <div className="flex flex-col gap-3">
                                {regions.map((r) => (
                                    <button
                                        key={r.id}
                                        onClick={() => {
                                            onTravel(r.id);
                                            setIsOpen(false);
                                        }}
                                        className={`group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${currentRegion === r.id
                                                ? 'bg-white/10 border-white/30 cursor-default'
                                                : 'bg-black/20 border-white/5 hover:border-white/20 hover:bg-white/5'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${r.color} border border-white/20`}>
                                            <r.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <div className={`font-pixel text-[10px] uppercase ${currentRegion === r.id ? r.accent : 'text-white'}`}>
                                                {r.name}
                                            </div>
                                            <div className="text-[8px] text-gray-500 font-pixel mt-1 leading-tight">
                                                {r.desc}
                                            </div>
                                        </div>
                                        {currentRegion === r.id && (
                                            <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button (Pokeball style) */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full glass-morphism border-4 border-white/30 flex items-center justify-center shadow-2xl relative group overflow-hidden ${isOpen ? 'rotate-180 bg-poke-red' : 'bg-black/40'
                    } transition-all duration-500`}
            >
                <div className={`absolute inset-0 bg-gradient-to-br from-white/20 to-transparent transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} />

                {/* Pokeball Design */}
                <div className="relative w-12 h-12 rounded-full border-2 border-white/20 flex flex-col overflow-hidden shadow-inner">
                    <div className={`h-1/2 w-full transition-colors duration-500 ${isOpen ? 'bg-poke-red' : 'bg-white/10'}`} />
                    <div className="h-[2px] w-full bg-white/40" />
                    <div className="h-1/2 w-full bg-black/10" />

                    {/* Inner button */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-black/20 shadow-lg flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-gray-200" />
                    </div>
                </div>

                {/* Badge/Label */}
                <div className="absolute -top-2 -right-2 bg-poke-blue text-white font-pixel text-[6px] px-2 py-1 rounded-full border border-white/20 shadow-lg group-hover:animate-bounce">
                    FLY
                </div>
            </motion.button>
        </div>
    );
};

export default FlyMenu;
