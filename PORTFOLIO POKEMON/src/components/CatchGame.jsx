import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trophy, ArrowLeft, RefreshCcw, X, CheckCircle2 } from 'lucide-react';

const MILESTONES = [5, 20, 50, 100];

const REGION_CONFIG = {
    kanto: {
        range: [1, 151],
        color: 'poke-red',
        accent: 'text-poke-red',
        name: 'Kanto'
    },
    johto: {
        range: [152, 251],
        color: 'poke-yellow',
        accent: 'text-poke-yellow',
        name: 'Johto'
    },
    hoenn: {
        range: [252, 386],
        color: 'poke-blue',
        accent: 'text-poke-blue',
        name: 'Hoenn'
    }
};

const CatchGame = ({ onBack, region = 'kanto' }) => {
    const config = REGION_CONFIG[region];
    const [searchTerm, setSearchTerm] = useState("");
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Persistent state unique to each region
    const [caughtIds, setCaughtIds] = useState(() => {
        const saved = localStorage.getItem(`caught_pokemon_${region}`);
        return saved ? JSON.parse(saved) : [];
    });

    const [lastCaught, setLastCaught] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const searchRef = useRef(null);

    // Fetch region-specific pokemon names from PokeAPI
    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${config.range[1] - config.range[0] + 1}&offset=${config.range[0] - 1}`);
                const data = await response.json();
                const formatted = data.results.map((p, index) => ({
                    id: config.range[0] + index,
                    name: p.name
                }));
                setPokemonData(formatted);
            } catch (err) {
                console.error("Failed to fetch Pokémon data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPokemon();

        // Reset caught IDs state when region changes
        const saved = localStorage.getItem(`caught_pokemon_${region}`);
        setCaughtIds(saved ? JSON.parse(saved) : []);
    }, [region, config.range]);

    useEffect(() => {
        localStorage.setItem(`caught_pokemon_${region}`, JSON.stringify(caughtIds));
    }, [caughtIds, region]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase().trim();
        setSearchTerm(value);

        const found = pokemonData.find(p => p.name === value && !caughtIds.includes(p.id));
        if (found) {
            setCaughtIds(prev => [...prev, found.id]);
            setLastCaught(found);
            setSearchTerm("");
            setTimeout(() => setLastCaught(null), 3000);
        }
    };

    const resetGame = () => {
        if (window.confirm(`Are you sure you want to reset your ${config.name} progress?`)) {
            setCaughtIds([]);
            localStorage.removeItem(`caught_pokemon_${region}`);
        }
    };

    const totalInRegion = pokemonData.length || 1;
    const progress = (caughtIds.length / totalInRegion) * 100;

    return (
        <div className={`min-h-screen pt-24 pb-20 px-4 md:px-8 relative z-10 selection:bg-${config.color} selection:text-white`}>
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-12 text-center">
                    <motion.button
                        whileHover={{ scale: 1.05, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBack}
                        className="self-start mb-8 flex items-center gap-2 px-4 py-2 glass-morphism rounded-xl text-white font-pixel text-[10px] border border-white/10 hover:border-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> EXIT GAME
                    </motion.button>

                    <h1 className="text-3xl md:text-5xl font-pixel text-white mb-4 uppercase tracking-tighter shadow-glow">
                        Catch <span className={config.accent}>{config.name}</span> Pokémon
                    </h1>
                    <p className="text-gray-400 font-sans max-w-xl text-lg mb-8">
                        Explore the {config.name} region and catch them all by searching their names.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowHint(!showHint)}
                        className={`px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-pixel text-[10px] ${config.accent} transition-all mb-12`}
                    >
                        {showHint ? "HIDE HINT" : "START WITH A HINT"}
                    </motion.button>

                    {/* Search Bar */}
                    <div className="relative w-full max-w-2xl group">
                        <div className={`absolute inset-0 opacity-20 blur-2xl rounded-full transition-opacity group-focus-within:opacity-40 bg-${config.color}`} />
                        <div className="relative glass-morphism border-2 border-white/10 rounded-2xl p-1 flex items-center focus-within:border-white transition-all">
                            <Search className="w-6 h-6 ml-4 text-gray-500" />
                            <input
                                ref={searchRef}
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Who's that Pokémon?"
                                className="flex-1 bg-transparent border-none outline-none p-4 font-pixel text-sm text-white placeholder:text-gray-600 uppercase"
                                autoFocus
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm("")} className="p-2 hover:text-white mr-2">
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Progress Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-morphism rounded-[2rem] p-8 md:p-12 mb-16 border-2 border-white/10 relative overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center border-2 border-white/20 shadow-xl bg-white/5`}>
                            <div className="relative">
                                <RefreshCcw className={`w-12 h-12 ${config.accent} animate-spin-slow`} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Trophy className="w-6 h-6 text-poke-yellow" />
                                </div>
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-pixel mb-2">
                                {caughtIds.length}/{totalInRegion}
                            </h2>
                            <p className="font-pixel text-[10px] text-gray-500 uppercase tracking-widest">{config.name} POKÉDEX</p>
                        </div>
                        <button
                            onClick={resetGame}
                            className="md:ml-auto p-3 hover:bg-white/5 rounded-xl text-gray-600 hover:text-white transition-all flex items-center gap-2"
                        >
                            <RefreshCcw className="w-4 h-4" />
                            <span className="font-pixel text-[8px]">RESET REGION</span>
                        </button>
                    </div>

                    {/* Milestone Bar */}
                    <div className="relative mt-12 mb-8 px-4">
                        <div className="h-4 bg-black/40 rounded-full border-2 border-white/10 p-1 overflow-hidden">
                            <motion.div
                                className={`h-full rounded-full relative ${region === 'kanto' ? 'bg-poke-red' :
                                    region === 'johto' ? 'bg-poke-yellow' : 'bg-poke-blue'
                                    }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: "spring", bounce: 0, duration: 1 }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff]" />
                            </motion.div>
                        </div>

                        {/* Adjusted Milestone markers for region size */}
                        {MILESTONES.map(m => {
                            const milestoneProgress = (m / totalInRegion) * 100;
                            if (m > totalInRegion) return null;
                            return (
                                <div
                                    key={m}
                                    style={{ left: `${milestoneProgress}%` }}
                                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                                >
                                    <div className={`w-2 h-2 rounded-full border border-white/20 ${caughtIds.length >= m ? 'bg-white shadow-[0_0_10px_#fff]' : 'bg-black/40'}`} />
                                    <div className={`mt-4 px-3 py-1 rounded-lg border text-[8px] font-pixel transition-all ${caughtIds.length >= m
                                        ? 'bg-white/20 border-white text-white'
                                        : 'bg-black/20 border-white/5 text-gray-600'
                                        }`}>
                                        {caughtIds.length >= m ? <CheckCircle2 className="w-3 h-3 inline mr-1" /> : "🔒"} {m}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Grid Section */}
                {loading ? (
                    <div className="flex flex-col items-center gap-4 py-20">
                        <RefreshCcw className="w-12 h-12 text-gray-600 animate-spin" />
                        <p className="font-pixel text-[10px] text-gray-500">SYNCING POKÉDEX DATA...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 px-2">
                        {pokemonData.map(p => {
                            const isCaught = caughtIds.includes(p.id);
                            return (
                                <motion.div
                                    key={p.id}
                                    className={`aspect-square glass-morphism rounded-2xl p-2 md:p-4 flex flex-col items-center justify-center relative group transition-all duration-500 ${isCaught ? 'bg-white/5 border-white/20' : 'bg-black/20 border-white/5'
                                        }`}
                                >
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                                        alt={p.name}
                                        className={`w-full h-full object-contain transition-all duration-700 ${isCaught
                                            ? 'opacity-100 scale-100'
                                            : 'opacity-10 brightness-0 scale-90 pointer-events-none blur-[1px]'
                                            }`}
                                    />
                                    {isCaught && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="absolute bottom-1 right-1 bg-white/20 backdrop-blur-md rounded-full p-1 border border-white/20"
                                        >
                                            <CheckCircle2 className={`w-3 h-3 ${config.accent}`} />
                                        </motion.div>
                                    )}
                                    <div className={`mt-2 font-pixel text-[6px] md:text-[8px] text-center uppercase truncate w-full ${isCaught ? 'text-white' : 'text-gray-700'
                                        }`}>
                                        {isCaught ? p.name : `???`}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Toasts */}
            <AnimatePresence>
                {lastCaught && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 glass-morphism border-2 border-white/20 rounded-2xl p-6 flex items-center gap-6 z-[200] shadow-2xl"
                    >
                        <div className="w-16 h-16 bg-white/10 rounded-xl p-2">
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${lastCaught.id}.png`}
                                alt={lastCaught.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div>
                            <h4 className={`font-pixel ${config.accent} text-sm mb-1 uppercase tracking-widest`}>GOTCHA!</h4>
                            <p className="font-pixel text-[10px] text-white uppercase">{lastCaught.name} WAS CAUGHT!</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CatchGame;
