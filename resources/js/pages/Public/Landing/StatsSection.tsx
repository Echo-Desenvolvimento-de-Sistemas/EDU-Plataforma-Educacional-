import { motion } from 'framer-motion';
import { Users, GraduationCap, Building2, Globe } from 'lucide-react';

const stats = [
    { icon: <Building2 className="w-8 h-8" />, value: '150+', label: 'Escolas Parceiras', color: 'text-sky-600' },
    { icon: <Users className="w-8 h-8" />, value: '45k+', label: 'Alunos Ativos', color: 'text-indigo-600' },
    { icon: <GraduationCap className="w-8 h-8" />, value: '2.5k+', label: 'Professores', color: 'text-violet-600' },
    { icon: <Globe className="w-8 h-8" />, value: '12', label: 'Estados Atendidos', color: 'text-emerald-600' },
];

export default function StatsSection() {
    return (
        <section className="py-20 bg-slate-900 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className={`mb-4 flex justify-center ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                {stat.value}
                            </div>
                            <div className="text-slate-400 font-medium uppercase tracking-widest text-xs">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
