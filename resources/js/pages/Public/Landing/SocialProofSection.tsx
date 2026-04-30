import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, Quote, School, Users, Award, ThumbsUp } from 'lucide-react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return <span ref={ref}>{count.toLocaleString('pt-BR')}{suffix}</span>;
}

const stats = [
    { icon: <School className="w-6 h-6" />, value: 200, suffix: '+', label: 'Escolas Ativas' },
    { icon: <Users className="w-6 h-6" />, value: 50000, suffix: '+', label: 'Alunos Impactados' },
    { icon: <ThumbsUp className="w-6 h-6" />, value: 98, suffix: '%', label: 'Satisfação' },
    { icon: <Award className="w-6 h-6" />, value: 4, suffix: '.9★', label: 'Avaliação Média' },
];

const testimonials = [
    {
        name: 'Maria Helena Costa',
        role: 'Diretora — Colégio São Francisco',
        text: 'O EDU transformou nossa gestão. Reduzimos em 70% o tempo gasto com burocracia e os pais finalmente têm acesso em tempo real às informações dos filhos.',
    },
    {
        name: 'Carlos Eduardo Santos',
        role: 'Coordenador Pedagógico — Instituto Educar',
        text: 'A integração com a BNCC e o acompanhamento pedagógico em tempo real nos permite tomar decisões baseadas em dados. Nunca foi tão fácil acompanhar o desempenho dos alunos.',
    },
    {
        name: 'Ana Paula Ferreira',
        role: 'Gestora — Rede Semear Educação',
        text: 'Implementamos o EDU em 5 unidades em menos de uma semana. A equipe de suporte é excepcional e o sistema é intuitivo. Os professores adoraram.',
    },
];

export default function SocialProofSection() {
    return (
        <section className="py-24 md:py-32 bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 mb-4">
                                {stat.icon}
                            </div>
                            <div className="text-3xl md:text-4xl font-extrabold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                {stat.suffix === '.9★' ? (
                                    <span>4.9<Star className="w-5 h-5 inline fill-yellow-400 text-yellow-400 ml-1 -mt-1" /></span>
                                ) : (
                                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                )}
                            </div>
                            <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonials */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-sm font-bold uppercase tracking-widest text-sky-400 mb-4 block">
                        Quem usa, recomenda
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Histórias reais de quem já transformou sua escola
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
                        >
                            <Quote className="w-8 h-8 text-sky-500/30 mb-4" />
                            <p className="text-slate-300 leading-relaxed mb-6 text-sm">"{t.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                    {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">{t.name}</div>
                                    <div className="text-xs text-slate-400">{t.role}</div>
                                </div>
                            </div>
                            <div className="flex gap-0.5 mt-4">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
