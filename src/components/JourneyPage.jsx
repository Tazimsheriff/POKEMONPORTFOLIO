import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowLeft, X, Briefcase, Heart, BookOpen, Code2, ChevronRight } from 'lucide-react';
import kantoMap from '../assets/maps/kanto.png';
import johtoMap from '../assets/maps/johto.png';
import hoennMap from '../assets/maps/hoenn.png';
import kalosMap from '../assets/maps/kalos.png';
import unoveMap from '../assets/maps/unnova.png';
import { EXPERIENCE_DATA, TYPE_COLORS } from '../data/experiences';

// ── Map images per region ────────────────────────────────────────────────────
const REGION_MAPS = {
    kanto:  { map: kantoMap,  accent: 'text-poke-red',     border: 'border-poke-red/40',    pill: 'bg-poke-red' },
    johto:  { map: johtoMap,  accent: 'text-poke-yellow',  border: 'border-poke-yellow/40', pill: 'bg-poke-yellow' },
    hoenn:  { map: hoennMap,  accent: 'text-poke-blue',    border: 'border-poke-blue/40',   pill: 'bg-poke-blue' },
    kalos:  { map: kalosMap,  accent: 'text-pink-400',     border: 'border-pink-400/40',    pill: 'bg-pink-400' },
    unova:  { map: unoveMap,  accent: 'text-emerald-400',  border: 'border-emerald-400/40', pill: 'bg-emerald-400' },
};

// ── Type icon helper ─────────────────────────────────────────────────────────
const TYPE_ICONS = {
    work:      <Briefcase className="w-3.5 h-3.5" />,
    volunteer: <Heart className="w-3.5 h-3.5" />,
    education: <BookOpen className="w-3.5 h-3.5" />,
    project:   <Code2 className="w-3.5 h-3.5" />,
};
const TYPE_LABELS = {
    work: 'Work', volunteer: 'Volunteer', education: 'Education', project: 'Project',
};

// ── Experience Detail Modal ──────────────────────────────────────────────────
const ExperienceModal = memo(({ exp, onClose }) => {
    if (!exp) return null;
    const colors = TYPE_COLORS[exp.type] || TYPE_COLORS.work;
    return (
        <AnimatePresence>
            <motion.div
                key="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[500] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    key="modal-card"
                    initial={{ scale: 0.85, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0, y: 30 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                    className="relative w-full max-w-lg glass-morphism rounded-3xl border border-white/15 p-8 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 transition-colors"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>

                    {/* Badge + Type */}
                    <div className="flex items-center gap-3 mb-5">
                        <span className="text-4xl leading-none">{exp.badge}</span>
                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-pixel uppercase tracking-wider ${colors.tag}`}>
                            {TYPE_ICONS[exp.type]} {TYPE_LABELS[exp.type]}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-pixel text-xl text-white uppercase leading-tight mb-1">
                        {exp.name}
                    </h2>
                    <p className={`font-pixel text-[11px] uppercase tracking-widest mb-1 ${colors.label}`}>
                        {exp.org}
                    </p>
                    <p className="font-pixel text-[10px] text-gray-500 uppercase mb-6">
                        {exp.date}
                    </p>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        {exp.details}
                    </p>

                    {/* Skills */}
                    {exp.skills?.length > 0 && (
                        <div>
                            <p className="font-pixel text-[8px] text-gray-500 uppercase mb-3 tracking-widest">
                                Skills Used
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {exp.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 rounded-lg text-[10px] font-pixel bg-white/5 border border-white/10 text-gray-300 uppercase"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
});
ExperienceModal.displayName = 'ExperienceModal';

// ── Map Pin (memoized to avoid re-render) ───────────────────────────────────
const ExperiencePin = memo(({ exp, onSelect }) => {
    const colors = TYPE_COLORS[exp.type] || TYPE_COLORS.work;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            style={{ top: exp.top, left: exp.left }}
            className="absolute z-30 hover:z-50 group/pin cursor-pointer"
            onClick={() => onSelect(exp)}
        >
            <div className="relative">
                {/* Pulsing outer ring */}
                <div className={`absolute -inset-1.5 rounded-full opacity-40 animate-ping ${colors.dot}`} />
                <div className="absolute -inset-3 rounded-full bg-white/0 group-hover/pin:bg-white/10 transition-colors duration-200" />

                {/* Pin dot — larger, solid background */}
                <div className={`w-8 h-8 rounded-full border-2 border-white ${colors.dot} ${colors.glow} transition-transform duration-200 group-hover/pin:scale-125 flex items-center justify-center text-base shadow-lg`}>
                    <span>{exp.badge}</span>
                </div>

                {/* Gym number badge */}
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black border border-white/30 rounded-full flex items-center justify-center">
                    <span className="font-pixel text-[7px] text-white">{exp.id.replace(/\D/g,'')}</span>
                </div>

                {/* Tooltip on hover — z-[60] ensures it renders above all other pins */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-52 z-[60] opacity-0 group-hover/pin:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-black/90 border border-white/30 p-3 rounded-xl shadow-2xl">
                        <h5 className="font-pixel text-[10px] text-white uppercase mb-1 leading-tight">{exp.name}</h5>
                        <p className={`font-pixel text-[8px] uppercase tracking-wide ${colors.label} mb-1.5`}>{exp.org}</p>
                        <p className="font-pixel text-[8px] text-gray-500 mb-1.5">{exp.date}</p>
                        <p className="font-sans text-[9px] text-gray-300 leading-tight">{exp.desc}</p>
                        <div className={`mt-2 pt-2 border-t border-white/10 flex items-center gap-1 font-pixel text-[8px] uppercase ${colors.label}`}>
                            <ChevronRight className="w-3 h-3" /> Tap to view details
                        </div>
                    </div>
                    <div className="w-2.5 h-2.5 bg-black/90 border-r border-b border-white/30 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
                </div>
            </div>
        </motion.div>
    );
});
ExperiencePin.displayName = 'ExperiencePin';

// ── Experience List (right sidebar) ─────────────────────────────────────────
const ExperienceList = memo(({ experiences, onSelect }) => (
    <div className="space-y-3">
        {experiences.map((exp) => {
            const colors = TYPE_COLORS[exp.type] || TYPE_COLORS.work;
            return (
                <motion.button
                    key={exp.id}
                    whileHover={{ x: 4 }}
                    onClick={() => onSelect(exp)}
                    className="w-full text-left p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors group"
                >
                    <div className="flex items-start gap-3">
                        <span className="text-2xl leading-none mt-0.5">{exp.badge}</span>
                        <div className="flex-1 min-w-0">
                            <p className="font-pixel text-[10px] text-white uppercase leading-tight truncate">{exp.name}</p>
                            <p className={`font-pixel text-[8px] uppercase tracking-wide mt-0.5 ${colors.label}`}>{exp.org}</p>
                            <p className="font-pixel text-[8px] text-gray-600 mt-0.5">{exp.date}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors mt-1 flex-shrink-0" />
                    </div>
                </motion.button>
            );
        })}
    </div>
));
ExperienceList.displayName = 'ExperienceList';

// ── Legend ────────────────────────────────────────────────────────────────────
const Legend = () => (
    <div className="glass-morphism p-4 rounded-2xl border border-white/10">
        <h4 className="font-pixel text-[8px] text-poke-yellow mb-3 uppercase tracking-wider">Legend</h4>
        <div className="space-y-1.5">
            {Object.entries(TYPE_COLORS).map(([type, c]) => (
                <div key={type} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
                    <span className="text-[8px] font-pixel text-gray-400 uppercase">{TYPE_LABELS[type]}</span>
                </div>
            ))}
        </div>
    </div>
);

// ── Main JourneyPage ─────────────────────────────────────────────────────────
const JourneyPage = ({ onBack, region = 'kanto' }) => {
    const [selectedExp, setSelectedExp] = useState(null);
    const regionMeta = REGION_MAPS[region] || REGION_MAPS.kanto;
    const regionData = EXPERIENCE_DATA[region] || EXPERIENCE_DATA.kanto;

    const handleSelect = useCallback((exp) => setSelectedExp(exp), []);
    const handleClose  = useCallback(() => setSelectedExp(null),  []);

    return (
        <>
            {/* Experience Detail Modal */}
            {selectedExp && <ExperienceModal exp={selectedExp} onClose={handleClose} />}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen pt-24 pb-20 px-4 md:px-8 relative z-10"
            >
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                        <div>
                            <motion.button
                                whileHover={{ x: -4 }}
                                whileTap={{ scale: 0.95 }}
                                onPointerDown={onBack}
                                className="mb-5 flex items-center gap-2 px-4 py-2 glass-morphism rounded-xl text-white font-pixel text-[10px] border border-white/10 hover:border-white/40 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" /> BACK TO PORTFOLIO
                            </motion.button>
                            <h1 className={`text-4xl md:text-6xl font-pixel text-white uppercase tracking-tighter`}>
                                {region.charAt(0).toUpperCase() + region.slice(1)}{' '}
                                <span className={regionMeta.accent}>Journey</span>
                            </h1>
                            <p className="text-gray-400 font-pixel text-[10px] mt-2 tracking-widest uppercase">
                                {regionData.eraLabel} · {regionData.eraSubtitle}
                            </p>
                        </div>

                        <div className="glass-morphism px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-3">
                            <MapPin className={`w-4 h-4 ${regionMeta.accent}`} />
                            <span className="font-pixel text-[10px] text-white uppercase">
                                {regionData.experiences?.length ?? 0} Experiences Logged
                            </span>
                        </div>
                    </div>

                    {/* Body Grid */}
                    <div className="grid lg:grid-cols-12 gap-8">

                        {/* Left: Map with pins */}
                        <div className="lg:col-span-8">
                            <div className="relative aspect-[4/3] glass-morphism rounded-[2.5rem] border-2 border-white/10 overflow-hidden shadow-2xl">

                                {/* Legend overlay */}
                                <div className="absolute top-4 right-4 z-20">
                                    <Legend />
                                </div>

                                {/* Region label */}
                                <div className="absolute top-4 left-4 z-20 glass-morphism px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                                    <MapPin className={`w-4 h-4 ${regionMeta.accent}`} />
                                    <span className="font-pixel text-[9px] text-white uppercase">
                                        {region.charAt(0).toUpperCase() + region.slice(1)} Region
                                    </span>
                                </div>

                                {/* Map image + overlays */}
                                <div className="absolute inset-0 bg-[#0a1220]" />
                                <img
                                    src={regionMeta.map}
                                    alt={`${region} map`}
                                    className="absolute inset-0 w-full h-full object-contain brightness-110 opacity-95"
                                    loading="lazy"
                                />
                                {/* Very subtle vignette only — keeps map bright but pins still pop */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />

                                {/* Experience pins */}
                                {regionData.experiences?.map((exp) => (
                                    <ExperiencePin key={exp.id} exp={exp} onSelect={handleSelect} />
                                ))}
                            </div>

                            {/* Hint */}
                            <p className="font-pixel text-[9px] text-gray-600 uppercase tracking-widest text-center mt-4">
                                ↑ Click any pin to view experience details
                            </p>
                        </div>

                        {/* Right: Experience list sidebar */}
                        <div className="lg:col-span-4 flex flex-col gap-4">
                            <div className="glass-morphism rounded-[2.5rem] border border-white/10 p-6 flex-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-2.5 h-2.5 rounded-full ${regionMeta.pill}`} />
                                    <h3 className="font-pixel text-sm text-white uppercase tracking-wider">
                                        Journey Log
                                    </h3>
                                </div>

                                {regionData.experiences?.length > 0 ? (
                                    <ExperienceList
                                        experiences={regionData.experiences}
                                        onSelect={handleSelect}
                                    />
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="font-pixel text-[9px] text-gray-600 uppercase">
                                            No experiences logged<br/>in this region yet.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Quick stat */}
                            <div className="glass-morphism rounded-2xl border border-white/10 p-5">
                                <p className="font-pixel text-[8px] text-gray-500 uppercase mb-3">Experience Breakdown</p>
                                <div className="space-y-2">
                                    {Object.entries(TYPE_COLORS).map(([type, c]) => {
                                        const count = regionData.experiences?.filter(e => e.type === type).length ?? 0;
                                        if (count === 0) return null;
                                        return (
                                            <div key={type} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                                                    <span className="font-pixel text-[9px] text-gray-400 uppercase">{TYPE_LABELS[type]}</span>
                                                </div>
                                                <span className={`font-pixel text-sm ${c.label}`}>{count}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default JourneyPage;
