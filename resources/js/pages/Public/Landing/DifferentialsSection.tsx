import { motion } from 'framer-motion';
import { Palette, Smartphone, BookOpen, BarChart3, Rocket, Check } from 'lucide-react';

const differentials = [
    { icon: <Palette className="w-5 h-5" />, text: 'White-label — a plataforma com a cara da sua escola' },
    { icon: <Smartphone className="w-5 h-5" />, text: 'Multi-plataforma — funciona em qualquer dispositivo' },
    { icon: <BookOpen className="w-5 h-5" />, text: 'BNCC integrada ao planejamento pedagógico' },
    { icon: <BarChart3 className="w-5 h-5" />, text: 'Dados em tempo real para decisões inteligentes' },
    { icon: <Rocket className="w-5 h-5" />, text: 'Implementação em menos de 48 horas' },
];

export default function DifferentialsSection() {
    return (
        <section className="py-24 md:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
                    {/* Text side */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                        className="flex-1"
                    >
                        <span className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-4 block">
                            Por que o EDU?
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Tecnologia que se adapta à{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
                                sua realidade
                            </span>
                        </h2>
                        <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                            Diferente de soluções genéricas, o EDU foi construído por quem entende
                            o dia a dia de uma escola brasileira. Cada funcionalidade resolve uma dor real.
                        </p>
                        <div className="space-y-5">
                            {differentials.map((diff, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                                        {diff.icon}
                                    </div>
                                    <span className="text-slate-700 font-medium">{diff.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Visual side — mockup dashboard */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 w-full"
                    >
                        <div className="relative">
                            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-2xl border border-slate-700">
                                {/* Fake browser chrome */}
                                <div className="flex items-center gap-2 mb-5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                    <div className="flex-1 ml-3 h-7 rounded-lg bg-slate-700/50 flex items-center px-3">
                                        <span className="text-xs text-slate-500">edu.suaescola.com.br/admin</span>
                                    </div>
                                </div>
                                {/* Dashboard mockup content */}
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {[
                                        { label: 'Alunos', value: '1.247', color: 'from-sky-500/20 to-sky-600/20 text-sky-400' },
                                        { label: 'Frequência', value: '94.2%', color: 'from-emerald-500/20 to-emerald-600/20 text-emerald-400' },
                                        { label: 'Aprovação', value: '97.8%', color: 'from-violet-500/20 to-violet-600/20 text-violet-400' },
                                    ].map((stat, i) => (
                                        <div key={i} className={`rounded-xl bg-gradient-to-br ${stat.color} p-4`}>
                                            <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
                                            <div className="text-xl font-bold">{stat.value}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-xl bg-slate-800/80 p-4 h-28">
                                        <div className="text-xs text-slate-400 mb-3">Frequência Semanal</div>
                                        <div className="flex items-end gap-1 h-14">
                                            {[65, 80, 72, 90, 85, 95, 88].map((h, i) => (
                                                <div key={i} className="flex-1 bg-sky-500/40 rounded-t" style={{ height: `${h}%` }} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="rounded-xl bg-slate-800/80 p-4 h-28">
                                        <div className="text-xs text-slate-400 mb-3">Mensagens Hoje</div>
                                        <div className="space-y-2">
                                            {['Turma 5A — Aviso reunião', 'Prof. Ana — Notas lançadas'].map((msg, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                                                    <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                                                    <span className="truncate">{msg}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Glow effect behind */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 rounded-3xl blur-2xl -z-10" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
