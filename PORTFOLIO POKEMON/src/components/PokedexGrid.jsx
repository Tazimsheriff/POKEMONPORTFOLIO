import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, Info, X } from 'lucide-react';

const projects = [
    {
        id: 1,
        name: "AI Neural Engine",
        type: ["Psychic", "Steel"],
        desc: "A neural networking project that mimics brain synaptic activity for efficient data processing.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
        stats: { complexity: 95, speed: 80, impact: 90 },
        tech: ["Python", "TensorFlow", "React"],
        github: "#",
        live: "#"
    },
    {
        id: 2,
        name: "Cyber Guard",
        type: ["Dark", "Ghost"],
        desc: "Real-time threat detection system with stealth-based architectural monitoring.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
        stats: { complexity: 88, speed: 92, impact: 85 },
        tech: ["Node.js", "Docker", "Go"],
        github: "#",
        live: "#"
    },
    {
        id: 3,
        name: "Flame Backend",
        type: ["Fire"],
        desc: "High-performance server architecture optimized for rapid scalability and concurrent traffic.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
        stats: { complexity: 75, speed: 98, impact: 82 },
        tech: ["FastAPI", "Redis", "AWS"],
        github: "#",
        live: "#"
    },
    {
        id: 4,
        name: "Aqua Stream",
        type: ["Water", "Ice"],
        desc: "Real-time data visualization platform with fluid transitions and crystal-clear analytics.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
        stats: { complexity: 82, speed: 75, impact: 88 },
        tech: ["Next.js", "D3.js", "GraphQL"],
        github: "#",
        live: "#"
    },
    {
        id: 5,
        name: "Firewall Core",
        type: ["Fire", "Fighting"],
        desc: "Robust security infrastructure designed to withstand intense traffic heat and brute-force attacks.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/392.png", // Infernape
        stats: { complexity: 85, speed: 90, impact: 88 },
        tech: ["Rust", "eBPF", "Linux"],
        github: "#",
        live: "#"
    },
    {
        id: 6,
        name: "Quick UI Kit",
        type: ["Electric"],
        desc: "A lightning-fast UI library focused on accessibility and high-voltage performance.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", // Pikachu
        stats: { complexity: 70, speed: 100, impact: 85 },
        tech: ["React", "Vanilla CSS", "Vite"],
        github: "#",
        live: "#"
    },
    {
        id: 7,
        name: "Blaze Runner",
        type: ["Fire", "Fighting"],
        desc: "High-speed automation runner that burns through CI/CD pipelines with unparalleled efficiency.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png", // Blaziken
        stats: { complexity: 80, speed: 95, impact: 90 },
        tech: ["GitHub Actions", "Shell", "Docker"],
        github: "#",
        live: "#"
    },
    {
        id: 8,
        name: "Depth Scaler",
        type: ["Water"],
        desc: "Database scaling solution that navigates deep data structures with predatory precision.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/160.png", // Feraligatr
        stats: { complexity: 92, speed: 78, impact: 95 },
        tech: ["PostgreSQL", "Kafka", "Redis"],
        github: "#",
        live: "#"
    }
];

const TypeBadge = ({ type }) => {
    const typeColors = {
        Psychic: 'bg-type-psychic',
        Steel: 'bg-type-steel',
        Dark: 'bg-type-dark',
        Ghost: 'bg-type-ghost',
        Fire: 'bg-type-fire',
        Water: 'bg-type-water',
        Ice: 'bg-type-ice',
        Fighting: 'bg-type-fighting'
    };

    return (
        <span className={`${typeColors[type] || 'bg-gray-500'} text-white text-[8px] font-pixel px-2 py-0.5 rounded uppercase border border-white/20`}>
            {type}
        </span>
    );
};

const ProjectCard = ({ project, onClick }) => (
    <motion.div
        layoutId={`card-${project.id}`}
        onClick={() => onClick(project)}
        whileHover={{ y: -10 }}
        className="group relative glass-morphism border-2 border-white/5 rounded-2xl p-6 cursor-pointer hover:border-poke-red transition-colors overflow-hidden"
    >
        <div className="absolute top-2 right-4 text-white/10 font-pixel text-2xl group-hover:text-poke-red/20 transition-colors">
            #00{project.id}
        </div>

        <div className="relative z-10 flex flex-col items-center">
            <motion.img
                layoutId={`img-${project.id}`}
                src={project.image}
                alt={project.name}
                className="w-32 h-32 object-contain mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            />

            <h3 className="text-sm font-pixel text-center mb-3 group-hover:text-poke-yellow transition-colors">{project.name}</h3>

            <div className="flex gap-2 mb-4">
                {project.type.map(t => <TypeBadge key={t} type={t} />)}
            </div>

            <div className="flex gap-4">
                <button className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors">
                    <Info className="w-4 h-4" />
                </button>
            </div>
        </div>

        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
    </motion.div>
);

const PokedexGrid = () => {
    const [selected, setSelected] = useState(null);

    return (
        <section id="pokedex" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="text-2xl font-pixel mb-4 flex items-center gap-4">
                        <span className="w-12 h-1 bg-poke-red inline-block" />
                        PROJECT POKÉDEX
                    </h2>
                    <p className="text-gray-400 font-sans">Click on an entry to see detailed stats and tech stack.</p>
                </div>
                <div className="flex bg-[#1a1a1a] p-1 rounded-lg border border-white/10 font-pixel text-[10px]">
                    <button className="px-4 py-2 bg-poke-red rounded shadow-lg">ALL</button>
                    <button className="px-4 py-2 text-gray-500 hover:text-white transition-colors">AI</button>
                    <button className="px-4 py-2 text-gray-500 hover:text-white transition-colors">WEB</button>
                    <button className="px-4 py-2 text-gray-500 hover:text-white transition-colors">CYBER</button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map(p => (
                    <ProjectCard key={p.id} project={p} onClick={setSelected} />
                ))}
            </div>

            <AnimatePresence>
                {selected && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelected(null)}
                            className="absolute inset-0"
                        />

                        <motion.div
                            layoutId={`card-${selected.id}`}
                            className="relative w-full max-w-4xl glass-morphism border-4 border-white/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-6 right-6 p-2 bg-black/40 hover:bg-poke-red rounded-full transition-colors z-20"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="grid md:grid-cols-2">
                                {/* Left: Visuals */}
                                <div className="bg-[#2a2a2a] p-12 flex flex-col items-center justify-center relative">
                                    <motion.img
                                        layoutId={`img-${selected.id}`}
                                        src={selected.image}
                                        className="w-64 h-64 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                    />
                                    <div className="mt-8 flex gap-3">
                                        {selected.type.map(t => <TypeBadge key={t} type={t} />)}
                                    </div>
                                    <div className="absolute bottom-6 left-6 font-pixel text-4xl text-white/5 uppercase">
                                        V. 1.0.0
                                    </div>
                                </div>

                                {/* Right: Info */}
                                <div className="p-8 md:p-12 pb-24 relative">
                                    <h3 className="text-2xl font-pixel mb-6">{selected.name}</h3>
                                    <p className="text-gray-400 mb-8 leading-relaxed">
                                        {selected.desc}
                                    </p>

                                    <div className="space-y-6 mb-12">
                                        {Object.entries(selected.stats).map(([key, val]) => (
                                            <div key={key}>
                                                <div className="flex justify-between text-[10px] font-pixel mb-2 uppercase">
                                                    <span className="text-gray-500">{key}</span>
                                                    <span>{val}%</span>
                                                </div>
                                                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${val}%` }}
                                                        className="h-full bg-poke-red"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {selected.tech.map(t => (
                                            <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 absolute bottom-8 left-8 right-8">
                                        <a href={selected.github} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors font-pixel text-[10px]">
                                            <Github className="w-4 h-4" /> GITHUB
                                        </a>
                                        <a href={selected.live} className="flex-1 flex items-center justify-center gap-2 py-3 bg-poke-red hover:bg-red-600 rounded-xl transition-colors font-pixel text-[10px]">
                                            <ExternalLink className="w-4 h-4" /> LIVE DEMO
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PokedexGrid;
