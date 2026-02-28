import { motion } from 'framer-motion';
import { Target, Zap, Waves, Flame, Ghost, Shield, Bug, Brain } from 'lucide-react';

const skills = [
    { name: "React / Next.js", type: "Electric", icon: Zap, power: 95, color: "text-type-electric", bg: "bg-type-electric" },
    { name: "Node.js / Express", type: "Fire", icon: Flame, power: 88, color: "text-type-fire", bg: "bg-type-fire" },
    { name: "Python / AI", type: "Psychic", icon: Brain, power: 82, color: "text-type-psychic", bg: "bg-type-psychic" },
    { name: "Tailwind / CSS", type: "Water", icon: Waves, power: 92, color: "text-type-water", bg: "bg-type-water" },
    { name: "Cybersecurity", type: "Ghost", icon: Ghost, power: 75, color: "text-type-ghost", bg: "bg-type-ghost" },
    { name: "DevOps / Docker", type: "Steel", icon: Shield, power: 80, color: "text-white", bg: "bg-type-steel" },
    { name: "Unit Testing", type: "Bug", icon: Bug, power: 70, color: "text-type-bug", bg: "bg-type-bug" },
    { name: "UI/UX Design", type: "Fairy", icon: Target, power: 85, color: "text-type-fairy", bg: "bg-type-fairy" },
];

const SkillCard = ({ skill, index }) => (
    <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group relative glass-morphism border-2 border-white/5 rounded-xl p-4 md:p-6 hover:border-poke-yellow transition-all cursor-crosshair overflow-hidden"
    >
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-white/5 group-hover:${skill.bg} group-hover:text-black transition-colors`}>
                    <skill.icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-pixel text-[10px] md:text-xs text-white uppercase group-hover:text-poke-yellow transition-colors">
                        {skill.name}
                    </h3>
                    <span className={`text-[8px] font-pixel uppercase ${skill.color}`}>TYPE / {skill.type}</span>
                </div>
            </div>
            <div className="text-right">
                <span className="font-pixel text-[8px] text-gray-500 uppercase block mb-1">POWER</span>
                <span className="font-pixel text-sm text-white">{skill.power}</span>
            </div>
        </div>

        <div className="h-2 bg-black/50 border border-white/10 rounded-full overflow-hidden p-[1px]">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.power}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                className={`h-full rounded-full ${skill.bg} shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
            />
        </div>

        {/* Hover highlight line */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-poke-yellow scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </motion.div>
);

const MoveList = () => {
    return (
        <section id="moves" className="py-24 px-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-poke-red/5 rounded-full blur-[100px] -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-poke-blue/5 rounded-full blur-[120px] translate-x-1/4" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16">
                    <h2 className="text-2xl font-pixel mb-6 flex items-center gap-4">
                        <span className="w-12 h-1 bg-poke-yellow inline-block" />
                        MOVE LIST (SKILLS)
                    </h2>
                    <p className="text-gray-400 max-w-2xl font-sans">
                        A versatile set of moves refined over years of training across different regions of technology.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((s, i) => (
                        <SkillCard key={s.name} skill={s} index={i} />
                    ))}
                </div>

                <div className="mt-20 p-8 border-4 border-dashed border-white/5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 glass-morphism">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-poke-red rounded-full flex items-center justify-center animate-bounce shadow-[0_0_20px_rgba(255,0,0,0.3)]">
                            <Zap className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h4 className="font-pixel text-sm mb-2 text-poke-yellow">HIDDEN ABILITY</h4>
                            <p className="text-gray-400 text-sm font-sans uppercase tracking-widest">Rapid Learning & Problem Solving</p>
                        </div>
                    </div>
                    <div className="font-pixel text-[10px] text-gray-500 italic">
                        "It's super effective!"
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MoveList;
