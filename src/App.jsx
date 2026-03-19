import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PokeballLoader from './components/PokeballLoader';
import TrainerCard from './components/TrainerCard';
import PokedexGrid from './components/PokedexGrid';
import MoveList from './components/MoveList';
import { GymBadges, PokemonCenter } from './components/Achievements';
import { Volume2, VolumeX, Menu, X, ArrowUp } from 'lucide-react';
import kantoMap from './assets/maps/kanto.png';
import johtoMap from './assets/maps/johto.png';
import hoennMap from './assets/maps/hoenn.png';
import kalosMap from './assets/maps/kalos.png';
import unoveMap from './assets/maps/unnova.png';
import JourneyPage from './components/JourneyPage';
import CatchGame from './components/CatchGame';
import FlyMenu from './components/FlyMenu';

function App() {
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [view, setView] = useState('home');
  const [region, setRegion] = useState('kanto');
  const [isTravelling, setIsTravelling] = useState(false);

  const travelTo = (newRegion) => {
    if (newRegion === region) return;
    setIsTravelling(true);
    setTimeout(() => {
      setRegion(newRegion);
      setTimeout(() => {
        setIsTravelling(false);
      }, 1000);
    }, 1000);
  };
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId;
    const handleMouseMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setCursorPos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
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
              <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none" style={{ willChange: 'contents' }}>
                <img
                  src={region === 'johto' ? johtoMap : region === 'hoenn' ? hoennMap : region === 'kalos' ? kalosMap : region === 'unova' ? unoveMap : kantoMap}
                  alt="Region Map"
                  style={{
                    transition: 'opacity 0.8s ease, transform 0.8s ease',
                    opacity: view === 'journey' ? 0.6 : 0.4,
                    transform: view === 'journey' ? 'scale(1.1)' : 'scale(1.05)',
                    filter: view === 'journey' ? 'brightness(0.8)' : 'brightness(0.6)',
                  }}
                  className="w-full h-full object-cover pixelated"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-overlay" />
                <div className="absolute inset-0 bg-vignette" />
              </div>

              {/* Retro Scanline Overlay */}
              <div className="scanlines" />

              {/* Navbar */}
              <nav className="fixed top-0 left-0 w-full z-50 p-3 sm:p-6 flex justify-between items-center backdrop-blur-sm bg-black/10">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-poke-red rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                  </div>
                  <span className="font-pixel text-[7px] sm:text-[10px] tracking-widest hidden sm:block uppercase">Trainer Portfolio</span>
                </div>

                <div className="flex items-center gap-3 sm:gap-6">
                  <button
                    onClick={() => setMuted(!muted)}
                    className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors touch-opacity"
                  >
                    {muted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-poke-yellow" />}
                  </button>
                  <button
                    onClick={() => setShowNav(!showNav)}
                    className="p-2 bg-poke-red rounded-lg text-white hover:bg-red-600 transition-colors touch-opacity"
                  >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
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
                        { name: 'Catch', id: 'catching' },
                        { name: 'Contact', id: 'contact' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setShowNav(false);
                            if (item.id === 'catching') {
                              setView('catching');
                              return;
                            }
                            if (view !== 'home') setView('home');
                            setTimeout(() => {
                              const el = document.getElementById(item.id);
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
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
                      <TrainerCard
                        onStartJourney={() => setView('journey')}
                        onStartCatching={() => setView('catching')}
                        region={region}
                      />
                      <PokedexGrid region={region} />
                      <MoveList region={region} />
                      <GymBadges region={region} />
                      <PokemonCenter region={region} />
                    </motion.div>
                  ) : view === 'journey' ? (
                    <JourneyPage key="journey" onBack={() => setView('home')} region={region} />
                  ) : (
                    <CatchGame key="catching" onBack={() => setView('home')} region={region} />
                  )}
                </AnimatePresence>
              </main>

              <FlyMenu currentRegion={region} onTravel={travelTo} />

              <AnimatePresence>
                {isTravelling && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-lg flex flex-col items-center justify-center overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-poke-blue/20 rounded-full blur-3xl animate-pulse" />
                      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-poke-red/20 rounded-full blur-3xl animate-pulse" />
                    </div>

                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="relative mb-12"
                    >
                      <div className="w-48 h-48 rounded-full bg-white/5 border-4 border-white/10 flex items-center justify-center p-8">
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${region === 'kanto' ? 149 :
                              region === 'johto' ? 249 :
                                region === 'kalos' ? 716 :
                                  region === 'unova' ? 644 :
                                    384
                            }.png`}
                          alt="Legendary"
                          className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                        />
                      </div>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-poke-red px-6 py-2 rounded-full border-2 border-white shadow-xl">
                        <span className="font-pixel text-[10px] text-white">FLYING...</span>
                      </div>
                    </motion.div>

                    <h2 className="font-pixel text-2xl md:text-3xl text-white uppercase tracking-tighter mb-4 animate-pulse">
                      Travelling to <span className={
                        region === 'johto' ? 'text-poke-yellow' :
                          region === 'hoenn' ? 'text-poke-blue' :
                            region === 'kalos' ? 'text-pink-400' :
                              region === 'unova' ? 'text-emerald-400' :
                                'text-poke-red'
                      }>{region.toUpperCase()}...</span>
                    </h2>
                    <p className="font-pixel text-[8px] text-gray-500 uppercase tracking-widest">Hold on tight, Trainer!</p>
                  </motion.div>
                )}
              </AnimatePresence>

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
