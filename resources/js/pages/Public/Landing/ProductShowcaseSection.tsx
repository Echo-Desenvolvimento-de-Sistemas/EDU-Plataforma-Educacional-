import { motion } from 'framer-motion';
import {
    LayoutDashboard, FileText, GraduationCap, Users,
    MessageSquare, Trophy, ArrowRight,
} from 'lucide-react';

const modules = [
    {
        icon: <LayoutDashboard className="w-7 h-7" />,
        title: 'Painel Administrativo',
        desc: 'Dashboard em tempo real com métricas financeiras, acadêmicas e de frequência. Visão 360° da sua instituição.',
        color: 'from-sky-500 to-sky-600',
    },
    {
        icon: <FileText className="w-7 h-7" />,
        title: 'Secretaria Digital',
        desc: 'Matrículas, pré-matrículas, documentos e relatórios automatizados. Geração de fichas e boletins em PDF.',
        color: 'from-indigo-500 to-indigo-600',
    },
    {
        icon: <GraduationCap className="w-7 h-7" />,
        title: 'Portal do Professor',
        desc: 'Chamada online, lançamento de notas, banco de questões e planejamento pedagógico alinhado à BNCC.',
        color: 'from-violet-500 to-violet-600',
    },
    {
        icon: <Users className="w-7 h-7" />,
        title: 'Portal Aluno & Família',
        desc: 'Boletins online, agenda de aulas, histórico de frequência e comunicação direta com a escola.',
        color: 'from-teal-500 to-teal-600',
    },
    {
        icon: <MessageSquare className="w-7 h-7" />,
        title: 'Agenda Digital',
        desc: 'Substitua os grupos de WhatsApp por canais oficiais com confirmação de leitura e segregação por turma.',
        color: 'from-emerald-500 to-emerald-600',
    },
    {
        icon: <Trophy className="w-7 h-7" />,
        title: 'Gamificação',
        desc: 'Sistema de EduCoins, rankings e recompensas que motivam alunos e reduzem a evasão escolar.',
        color: 'from-amber-500 to-amber-600',
    },
];

export default function ProductShowcaseSection() {
    return (
        <section id="funcionalidades" className="py-24 md:py-32 bg-gradient-to-b from-sky-50/50 to-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-bold uppercase tracking-widest text-sky-500 mb-4 block">
                        Tudo em um só lugar
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Uma plataforma completa para{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
                            toda a escola
                        </span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        6 módulos integrados que cobrem desde a administração até o engajamento dos alunos.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {modules.map((mod, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group relative p-7 rounded-2xl bg-white border border-slate-100 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 cursor-pointer"
                        >
                            <div className={`mb-5 p-3 rounded-xl bg-gradient-to-br ${mod.color} w-fit text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                                {mod.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{mod.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-4">{mod.desc}</p>
                            <a href="#detalhes" className="flex items-center gap-1 text-sky-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <span>Saiba mais</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
