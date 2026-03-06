import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, Info, Search } from 'lucide-react';
import kantoMap from '../assets/maps/kanto.png';
import johtoMap from '../assets/maps/johto.png';
import hoennMap from '../assets/maps/hoenn.png';
import kalosMap from '../assets/maps/kalos.png';
import unoveMap from '../assets/maps/unnova.png';

const REGION_DATA = {
    kanto: {
        name: "Kanto",
        accent: "text-poke-red",
        border: "border-poke-red/30",
        bg: "bg-poke-red/10",
        map: kantoMap,
        locations: [
            { id: 1, name: "Pallet Town", top: "78%", left: "22%", desc: "Where it all begins. A quiet town with a famous laboratory." },
            { id: 2, name: "Viridian City", top: "68%", left: "22%", desc: "A beautiful green city that is enveloped in nature." },
            { id: 3, name: "Pewter City", top: "48%", left: "22%", desc: "An ancient stone city nestled between rugged mountains." },
            { id: 4, name: "Cerulean City", top: "38%", left: "48%", desc: "A seaside city that is surrounded by gentle floral scents." },
            { id: 5, name: "Vermilion City", top: "68%", left: "48%", desc: "A port city that is popular for its beautiful sunsets." },
            { id: 6, name: "Lavender Town", top: "48%", left: "68%", desc: "A noble town that is dedicated to the spirits of Pokémon." },
            { id: 7, name: "Celadon City", top: "48%", left: "42%", desc: "The city of rainbow dreams. It is always filled with light." },
            { id: 8, name: "Saffron City", top: "48%", left: "55%", desc: "The golden city of commerce. It is a major hub of traffic." },
            { id: 9, name: "Fuchsia City", top: "78%", left: "55%", desc: "A historic city that is famous for its Safari Zone." },
            { id: 10, name: "Cinnabar Island", top: "88%", left: "22%", desc: "A fiery town that is situated on a volcanic island." }
        ]
    },
    johto: {
        name: "Johto",
        accent: "text-poke-yellow",
        border: "border-poke-yellow/30",
        bg: "bg-poke-yellow/10",
        map: johtoMap,
        locations: [
            { id: 11, name: "New Bark Town", top: "78%", left: "78%", desc: "The Town Where Winds of a New Beginning Blow." },
            { id: 12, name: "Cherrygrove City", top: "78%", left: "65%", desc: "The City of Fragrant Flowers." },
            { id: 13, name: "Violet City", top: "68%", left: "55%", desc: "The City of Nostalgic Scents." },
            { id: 14, name: "Azalea Town", top: "88%", left: "45%", desc: "Where People and Pokémon Live in Happy Harmony." },
            { id: 15, name: "Goldenrod City", top: "68%", left: "40%", desc: "The Festive City of Opulence." },
            { id: 16, name: "Ecruteak City", top: "48%", left: "45%", desc: "A Historical City Where the Past Meets the Present." },
            { id: 17, name: "Olivine City", top: "58%", left: "30%", desc: "The Port with the Smell of Tide." },
            { id: 18, name: "Cianwood City", top: "58%", left: "15%", desc: "A Port Surrounded by Rough Seas." },
            { id: 19, name: "Blackthorn City", top: "38%", left: "65%", desc: "A Quiet Mountain Retreat." },
            { id: 20, name: "Mt. Silver", top: "48%", left: "78%", desc: "The ultimate challenge awaits here." }
        ]
    },
    hoenn: {
        name: "Hoenn",
        accent: "text-poke-blue",
        border: "border-poke-blue/30",
        bg: "bg-poke-blue/10",
        map: hoennMap,
        locations: [
            { id: 21, name: "Littleroot Town", top: "85%", left: "35%", desc: "A town that can't be shaded any hue." },
            { id: 22, name: "Oldale Town", top: "75%", left: "35%", desc: "Where things start off small." },
            { id: 23, name: "Petalburg City", top: "75%", left: "20%", desc: "Where people mingle with nature." },
            { id: 24, name: "Rustboro City", top: "55%", left: "15%", desc: "The city probing the integration of nature and science." },
            { id: 25, name: "Dewford Town", top: "90%", left: "15%", desc: "A tiny island in the blue sea." },
            { id: 26, name: "Slateport City", top: "85%", left: "50%", desc: "The port where people and Pokémon cross paths." },
            { id: 27, name: "Mauville City", top: "65%", left: "50%", desc: "The bright and shiny city of fun." },
            { id: 28, name: "Lavaridge Town", top: "45%", left: "40%", desc: "The center of all of Hoenn's hot springs." },
            { id: 29, name: "Fortree City", top: "35%", left: "65%", desc: "The treetop city that frolics with nature." },
            { id: 30, name: "Lilycove City", top: "45%", left: "80%", desc: "Where the land ends and the sea begins." }
        ]
    },
    kalos: {
        name: "Kalos",
        accent: "text-pink-400",
        border: "border-pink-400/30",
        bg: "bg-pink-400/10",
        map: kalosMap,
        locations: [
            { id: 31, name: "Santalune City", top: "85%", left: "15%", desc: "A city where flowers bloom on the prairie." },
            { id: 32, name: "Aquacorde Town", top: "88%", left: "22%", desc: "A serene seaside town." },
            { id: 33, name: "Cyllage City", top: "75%", left: "25%", desc: "A city at the foot of a mountain of stones." },
            { id: 34, name: "Ambrette Town", top: "72%", left: "35%", desc: "A scientific town with ancient history." },
            { id: 35, name: "Camphrier Town", top: "62%", left: "28%", desc: "A town surrounded by rolling grassland." },
            { id: 36, name: "Lumiose City", top: "50%", left: "45%", desc: "The center of the Kalos region and hub of culture." },
            { id: 37, name: "Coumarine City", top: "45%", left: "65%", desc: "A beautiful city by the sea." },
            { id: 38, name: "Laverre City", top: "35%", left: "55%", desc: "A city that shimmers with fairy magic." },
            { id: 39, name: "Anistar City", top: "25%", left: "68%", desc: "A mystical city influenced by the stars above." },
            { id: 40, name: "Snowbelle City", top: "15%", left: "75%", desc: "A beautiful city covered in snow." }
        ]
    },
    unova: {
        name: "Unova",
        accent: "text-emerald-400",
        border: "border-emerald-400/30",
        bg: "bg-emerald-400/10",
        map: unoveMap,
        locations: [
            { id: 41, name: "Nuvema Town", top: "85%", left: "42%", desc: "A peaceful town where adventurers begin their journey." },
            { id: 42, name: "Accumula Town", top: "78%", left: "42%", desc: "A town that accumulates fond memories." },
            { id: 43, name: "Striaton City", top: "68%", left: "38%", desc: "A city with clear stripes of nature and civilization." },
            { id: 44, name: "Nacrene City", top: "58%", left: "35%", desc: "A city representing the beauty of nature." },
            { id: 45, name: "Castelia City", top: "48%", left: "48%", desc: "A magnificent metropolis of towering skyscrapers." },
            { id: 46, name: "Nimbasa City", top: "42%", left: "60%", desc: "A glittering city that never sleeps." },
            { id: 47, name: "Driftveil City", top: "50%", left: "25%", desc: "A city where the winds blow strong." },
            { id: 48, name: "Mistralton City", top: "32%", left: "55%", desc: "A city with a strong northerly wind." },
            { id: 49, name: "Icirrus City", top: "18%", left: "42%", desc: "A city buried under snow and ice." },
            { id: 50, name: "Opelucid City", top: "25%", left: "70%", desc: "A city where nature and technology coexist." }
        ]
    }
};

const JourneyPage = ({ onBack, region = 'kanto' }) => {
    const activeData = REGION_DATA[region] || REGION_DATA.kanto;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-24 pb-20 px-4 md:px-8 relative z-10"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <motion.button
                            whileHover={{ scale: 1.05, x: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onPointerDown={onBack}
                            className="mb-6 flex items-center gap-2 px-4 py-2 glass-morphism rounded-xl text-white font-pixel text-[10px] border border-white/10 hover:border-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> BACK TO PORTFOLIO
                        </motion.button>
                        <h1 className="text-4xl md:text-6xl font-pixel text-white uppercase tracking-tighter">
                            {activeData.name} <span className={activeData.accent}>Region</span>
                        </h1>
                        <p className="text-gray-400 font-pixel text-[10px] mt-2 tracking-widest uppercase">
                            EXPLORATION MODE ACTIVE // DISCOVERING {activeData.name}
                        </p>
                    </div>

                    <div className="glass-morphism px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${activeData.bg.replace('/10', '')}`} />
                        <span className="font-pixel text-[10px] text-white">SYNCING WITH REGIONAL POKÉDEX...</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left: Interactive Map Container */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="relative aspect-[4/3] glass-morphism rounded-[2.5rem] border-4 border-white/10 overflow-hidden group shadow-2xl">
                            <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                                <div className="p-3 glass-morphism rounded-xl border border-white/10">
                                    <MapPin className={`w-5 h-5 ${activeData.accent}`} />
                                </div>
                                <span className="font-pixel text-xs text-white uppercase drop-shadow-md">
                                    {activeData.name} Map Detail
                                </span>
                            </div>

                            {/* Region Legend */}
                            <div className="absolute top-6 right-6 z-20 glass-morphism p-4 rounded-2xl border border-white/10">
                                <h4 className="font-pixel text-[8px] text-poke-yellow mb-3 uppercase tracking-tighter">Region Legend</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-poke-red shadow-[0_0_5px_#ff0000]" />
                                        <span className="text-[7px] font-pixel text-gray-400 uppercase">Major Cities</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Search className="w-2 h-2 text-poke-blue" />
                                        <span className="text-[7px] font-pixel text-gray-400 uppercase">Pokemon Spots</span>
                                    </div>
                                </div>
                            </div>

                            {/* Interactive Map Surface */}
                            <div className={`absolute inset-0 pixelated bg-black/40`}>
                                <img
                                    src={activeData.map}
                                    alt={`${activeData.name} Map Detail`}
                                    className={`w-full h-full object-contain opacity-100 brightness-[1.1] transition-all duration-1000`}
                                />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />

                                {activeData.locations.map((loc) => (
                                    <motion.div
                                        key={loc.id}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.2 }}
                                        style={{ top: loc.top, left: loc.left }}
                                        className="absolute z-30 group/pin cursor-pointer"
                                    >
                                        <div className="relative">
                                            <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse ${region === 'kanto' ? 'bg-poke-red shadow-[0_0_15px_#ff0000]' :
                                                region === 'johto' ? 'bg-poke-yellow shadow-[0_0_15px_#ffe500]' :
                                                region === 'hoenn' ? 'bg-poke-blue shadow-[0_0_15px_#00c3ff]' :
                                                region === 'kalos' ? 'bg-pink-400 shadow-[0_0_15px_#ec4899]' :
                                                    'bg-emerald-400 shadow-[0_0_15px_#10b981]'
                                                }`} />

                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 opacity-0 group-hover/pin:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover/pin:translate-y-0">
                                                <div className="glass-morphism p-3 rounded-xl border border-white/20 shadow-2xl">
                                                    <h5 className="font-pixel text-[10px] text-white uppercase mb-1">{loc.name}</h5>
                                                    <p className="font-sans text-[9px] text-gray-400 leading-tight">{loc.desc}</p>
                                                </div>
                                                <div className="w-3 h-3 glass-morphism rotate-45 border-r border-b border-white/20 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>


                        </div>
                    </div>

                    {/* Right: Region Data/Stats */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="glass-morphism rounded-[2.5rem] border-2 border-white/10 p-8 flex-1">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                    <Info className="w-5 h-5 text-poke-blue" />
                                </div>
                                <h3 className="font-pixel text-sm text-white uppercase">Journey Log</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/20 transition-all">
                                    <h4 className="font-pixel text-[8px] text-gray-500 uppercase mb-3">Quick Tip</h4>
                                    <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors">
                                        The {activeData.name} region map helps you visualize your progress as a trainer in this part of the world.
                                    </p>
                                </div>

                                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                    <h4 className="font-pixel text-[8px] text-gray-500 uppercase mb-4">Regional Data</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-pixel text-[10px] text-white uppercase">Discovered Cities</span>
                                            <span className={`font-pixel text-lg ${activeData.accent}`}>10 <span className="text-gray-700">/ 10</span></span>
                                        </div>
                                        <div className="h-2 bg-black/40 rounded-full border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                className={`h-full rounded-full ${activeData.bg.replace('/10', '')}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-6 glass-morphism rounded-2xl border border-white/10 text-center relative overflow-hidden group">
                                <div className="relative z-10">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="w-12 h-12 border-2 border-dashed border-white/20 rounded-full mx-auto mb-4 flex items-center justify-center"
                                    >
                                        <div className="w-2 h-2 bg-poke-red rounded-full animate-ping" />
                                    </motion.div>
                                    <p className="font-pixel text-[8px] text-gray-500 uppercase leading-relaxed">
                                        Syncing with Pokedex...<br />
                                        Signal Strength: 100%
                                    </p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-poke-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default JourneyPage;
