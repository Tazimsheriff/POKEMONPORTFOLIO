import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Zap, Flame, Droplets, Target, Shield } from 'lucide-react';

const SKILL_DATA = {
    'React': {
        logic: 85,
        speed: 92,
        security: 78,
        creativity: 88,
        color: 'type-fire',
        icon: Flame
    },
    'Node': {
        logic: 90,
        speed: 85,
        security: 95,
        creativity: 70,
        color: 'type-water',
        icon: Droplets
    },
    'Python': {
        logic: 95,
        speed: 80,
        security: 85,
        creativity: 90,
        color: 'type-electric',
        icon: Zap
    }
};

const StarterIcon = ({ icon: Icon, label, color, active, onClick }) => (
    <motion.div
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className={`flex flex-col items-center p-3 rounded-xl border-2 transition-colors cursor-pointer ${active ? `border-${color} bg-${color}/10` : 'border-white/10 hover:border-white/30'
            }`}
    >
        <Icon className={`w-8 h-8 ${active ? `text-${color}` : 'text-gray-500'}`} />
        <span className="text-[10px] font-pixel mt-2 uppercase">{label}</span>
    </motion.div>
);

const StatBar = ({ label, value, color, icon: Icon }) => (
    <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-pixel uppercase">{label}</span>
            </div>
            <span className="text-xs font-pixel">{value}/100</span>
        </div>
        <div className="h-4 bg-black/50 border-2 border-white/20 rounded-full overflow-hidden p-0.5">
            <motion.div
                key={value} // Force animation on value change
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full bg-gradient-to-r ${color}`}
            />
        </div>
    </div>
);

const TrainerCard = ({ onStartJourney, onStartCatching, region = 'kanto' }) => {
    const [activeSkill, setActiveSkill] = useState('React');
    const stats = SKILL_DATA[activeSkill];

    const accentColor = region === 'johto' ? 'text-poke-yellow' : region === 'hoenn' ? 'text-poke-blue' : 'text-poke-red';
    const bgColor = region === 'johto' ? 'bg-poke-yellow' : region === 'hoenn' ? 'bg-poke-blue' : 'bg-poke-red';
    const borderColor = region === 'johto' ? 'border-[#b3a125]' : region === 'hoenn' ? 'border-[#3b4cca]' : 'border-[#800000]';
    const hoverBg = region === 'johto' ? 'hover:bg-[#ffe500]' : region === 'hoenn' ? 'hover:bg-[#4a5de8]' : 'hover:bg-[#cc0000]';

    return (
        <section id="home" className="min-h-screen flex items-center justify-center p-6 pt-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative w-full max-w-4xl glass-morphism border-4 border-white/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
                {/* Card Header Decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-poke-red via-poke-yellow to-poke-blue" />

                <div className="grid md:grid-cols-12 gap-8 p-8 md:p-12">
                    {/* Left: Avatar & XP */}
                    <div className="md:col-span-4 flex flex-col items-center border-r-2 border-white/5 pr-8">
                        <div className="relative mb-6">
                            <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden border-4 border-white/20 shadow-xl">
                                <User className="w-32 h-32 text-white/50" />
                            </div>
                            <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 ${bgColor} px-4 py-1 rounded-full border-2 border-white font-pixel text-[10px] shadow-lg`}>
                                LVL. 25
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="flex justify-between items-end mb-2">
                                <span className={`font-pixel text-[10px] ${region === 'hoenn' ? 'text-poke-blue' : 'text-poke-yellow'}`}>XP PROGRESS</span>
                                <span className="text-xs text-gray-400">7,500 / 10,000</span>
                            </div>
                            <div className="h-3 bg-black/40 rounded-full border border-white/10 p-[1px]">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '75%' }}
                                    className={`h-full ${region === 'hoenn' ? 'bg-poke-blue' : 'bg-poke-yellow'} rounded-full shadow-[0_0_10px_rgba(255,222,0,0.5)]`}
                                />
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-3 gap-2 w-full">
                            {Object.entries(SKILL_DATA).map(([name, data]) => (
                                <StarterIcon
                                    key={name}
                                    icon={data.icon}
                                    label={name}
                                    color={data.color}
                                    active={activeSkill === name}
                                    onClick={() => setActiveSkill(name)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Info & Stats */}
                    <div className="md:col-span-8">
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-5xl mb-4 text-white uppercase tracking-tighter">
                                Tazim <span className={accentColor}>Sheriff</span>
                            </h1>
                            <p className={`${region === 'hoenn' ? 'text-poke-blue bg-poke-blue/10 border-poke-blue/30' : 'text-poke-yellow bg-poke-yellow/10 border-poke-yellow/30'} font-pixel text-xs tracking-widest inline-block px-3 py-1 rounded border`}>
                                FULL STACK DEVELOPER // AI ENTHUSIAST
                            </p>
                            <p className="mt-6 text-gray-400 leading-relaxed text-lg">
                                Building digital experiences that feel like a critical hit.
                                Passionate about turning complex code into seamless user journeys.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-8">
                            <StatBar icon={Target} label="Logic" value={stats.logic} color="from-blue-500 to-cyan-400" />
                            <StatBar icon={Zap} label="Speed" value={stats.speed} color="from-yellow-400 to-orange-500" />
                            <StatBar icon={Shield} label="Security" value={stats.security} color="from-green-500 to-emerald-400" />
                            <StatBar icon={Flame} label="Creativity" value={stats.creativity} color="from-red-500 to-pink-500" />
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    const el = document.getElementById('pokedex');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`px-6 py-3 ${bgColor} text-white font-pixel text-[8px] md:text-[10px] rounded-lg border-b-4 ${borderColor} ${hoverBg} transition-colors`}
                            >
                                VIEW POKEDEX
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onStartJourney && onStartJourney()}
                                className="px-6 py-3 bg-white text-black font-pixel text-[8px] md:text-[10px] rounded-lg border-b-4 border-gray-300 hover:bg-gray-100 transition-colors"
                            >
                                START JOURNEY
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onStartCatching && onStartCatching()}
                                className={`px-6 py-3 ${region === 'kanto' ? 'bg-poke-yellow border-[#b3a125] hover:bg-[#ffe500]' : 'bg-white border-gray-300 hover:bg-gray-100'} text-black font-pixel text-[8px] md:text-[10px] rounded-lg border-b-4 transition-colors`}
                            >
                                CATCH 'EM ALL
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default TrainerCard;
