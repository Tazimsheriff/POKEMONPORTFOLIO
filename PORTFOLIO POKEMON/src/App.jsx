import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PokeballLoader from './components/PokeballLoader';
import TrainerCard from './components/TrainerCard';
import PokedexGrid from './components/PokedexGrid';
import MoveList from './components/MoveList';
import { GymBadges, PokemonCenter } from './components/Achievements';
import { Volume2, VolumeX, Menu, X, ArrowUp } from 'lucide-react';
import kantoMap from './KANTO.PNG';
import JourneyPage from './components/JourneyPage';

function App() {
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [view, setView] = useState('home');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-poke-red selection:text-white">
      {/* Background Layers - Deep Stack */}
      <div className="fixed inset-0 bg-[#0a0a0a] z-[-20]" />
      <div className="relative z-0">
        {/* Custom Cursor */}
        <motion.div
          className="fixed w-8 h-8 rounded-full border-2 border-poke-red pointer-events-none z-[99999] hidden md:block"
          animate={{ x: cursorPos.x - 16, y: cursorPos.y - 16 }}
          transition={{ type: "spring", damping: 25, stiffness: 400, mass: 0.5 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-poke-red rounded-full shadow-[0_0_10px_#ff0000]" />
        </motion.div>

        <AnimatePresence>
          {loading ? (
            <PokeballLoader onComplete={() => setLoading(false)} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative min-h-screen"
            >
              {/* Enhanced Background Map */}
              <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none">
                <img
                  src={kantoMap}
                  alt="Kanto Map"
                  className={`w-full h-full object-cover pixelated transition-all duration-1000 ${view === 'journey'
                      ? 'opacity-60 brightness-[0.8] scale-110'
                      : 'opacity-40 brightness-[0.6] scale-105'
                    }`}
                />
                <div className="absolute inset-0 bg-overlay" />
                <div className="absolute inset-0 bg-vignette" />
              </div>

              {/* Retro Scanline Overlay */}
              <div className="scanlines" />

              {/* Navbar */}
              <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-sm bg-black/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-poke-red rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                  <span className="font-pixel text-[10px] tracking-widest hidden sm:block uppercase">Trainer Portfolio</span>
                </div>

                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setMuted(!muted)}
                    className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-poke-yellow" />}
                  </button>
                  <button
                    onClick={() => setShowNav(!showNav)}
                    className="p-2 bg-poke-red rounded-lg text-white hover:bg-red-600 transition-colors"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </div>
              </nav>

              {/* Mobile Nav Overlay */}
              <AnimatePresence>
                {showNav && (
                  <motion.div
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-poke-dark/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
                  >
                    <button
                      onClick={() => setShowNav(false)}
                      className="absolute top-8 right-8 p-4 bg-white/5 rounded-full hover:bg-poke-red transition-colors"
                    >
                      <X className="w-8 h-8" />
                    </button>
                    <div className="flex flex-col items-center gap-6">
                      {[
                        { name: 'Home', id: 'home' },
                        { name: 'Pokedex', id: 'pokedex' },
                        { name: 'Moves', id: 'moves' },
                        { name: 'Badges', id: 'badges' },
                        { name: 'Contact', id: 'contact' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setShowNav(false);
                            const el = document.getElementById(item.id);
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="font-pixel text-xl md:text-3xl hover:text-poke-yellow transition-colors relative group"
                        >
                          <span className="relative z-10">{item.name.toUpperCase()}</span>
                          <motion.div className="absolute -bottom-1 left-0 w-0 h-1 bg-poke-red group-hover:w-full transition-all duration-300" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <main>
                <AnimatePresence mode="wait">
                  {view === 'home' ? (
                    <motion.div
                      key="home"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <TrainerCard onStartJourney={() => setView('journey')} />
                      <PokedexGrid />
                      <MoveList />
                      <GymBadges />
                      <PokemonCenter />
                    </motion.div>
                  ) : (
                    <JourneyPage key="journey" onBack={() => setView('home')} />
                  )}
                </AnimatePresence>
              </main>

              {/* Footer */}
              <footer className="py-12 border-t border-white/5 flex flex-col items-center gap-6">
                <div className="font-pixel text-[8px] text-gray-500 uppercase tracking-widest">
                  Thank you for playing! // 2024 Tazim Sheriff
                </div>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="p-4 bg-white/5 rounded-full hover:bg-poke-red group transition-colors"
                >
                  <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
                </button>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
