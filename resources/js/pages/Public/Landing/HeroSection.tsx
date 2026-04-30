import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowDown, GraduationCap, School, Users, Zap } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-sky-100/60 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-3xl" />
                <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-sky-300 opacity-40" />
                <div className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-orange-300 opacity-50" />
                <div className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-indigo-300 opacity-30" />
            </div>

            <div className="container mx-auto px-6 relative z-10 pt-28 pb-16">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-100 border border-sky-200 text-sky-700 text-sm font-semibold mb-10"
                    >
                        <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
                        <span>Acesso Antecipado Disponível</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        A gestão que sua escola{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">
                            sempre sonhou
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Reduza custos, elimine a burocracia e aumente o engajamento dos alunos em uma única plataforma inteligente e gamificada.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <Link href="/demo-access">
                            <Button
                                size="lg"
                                className="h-14 px-10 text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                Testar grátis
                            </Button>
                        </Link>
                        <a href="#problemas">
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-10 text-base border-slate-200 bg-white/80 hover:bg-white text-slate-700 rounded-full font-bold backdrop-blur-sm cursor-pointer"
                            >
                                Ver como funciona
                            </Button>
                        </a>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm"
                    >
                        {[
                            { icon: <Zap className="w-5 h-5" />, text: 'Tecnologia de Ponta' },
                            { icon: <Users className="w-5 h-5" />, text: 'Foco no Engajamento' },
                            { icon: <GraduationCap className="w-5 h-5" />, text: 'Sucesso do Aluno' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 font-medium">
                                <span className="text-sky-400">{item.icon}</span>
                                {item.text}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400">
                <span className="text-xs uppercase tracking-widest font-semibold">Descubra</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                    <ArrowDown className="w-5 h-5" />
                </motion.div>
            </div>
        </section>
    );
}
