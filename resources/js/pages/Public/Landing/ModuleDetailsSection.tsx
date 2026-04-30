import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, FileText, GraduationCap, Users,
    MessageSquare, Trophy, CheckCircle2, ShieldCheck, Zap
} from 'lucide-react';

type ModuleColor = 'indigo' | 'violet' | 'teal' | 'emerald' | 'amber' | 'sky';

interface ModuleDetail {
    id: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    image: string;
    color: ModuleColor;
}

const moduleDetails: ModuleDetail[] = [
    {
        id: 'secretaria',
        icon: <FileText className="w-6 h-6" />,
        title: 'Secretaria Digital',
        subtitle: 'Automatize 90% da sua burocracia',
        description: 'Gerencie todo o ciclo de vida do aluno em um único lugar, desde a pré-matrícula online até a emissão de certificados.',
        features: [
            'Matrículas e rematrículas 100% online',
            'Emissão automatizada de boletins e históricos',
            'Gestão de documentos digitais com validação por QR Code',
            'Relatórios do Censo Escolar exportáveis',
            'Controle de turmas e ensalamento inteligente'
        ],
        image: '/images/showcase/secretaria.jpg',
        color: 'indigo'
    },
    {
        id: 'professor',
        icon: <GraduationCap className="w-6 h-6" />,
        title: 'Portal do Professor',
        subtitle: 'Foco no ensino, não no papel',
        description: 'Ferramentas desenhadas para reduzir o tempo gasto com tarefas administrativas e aumentar a qualidade pedagógica.',
        features: [
            'Planejamento de aula integrado à BNCC',
            'Lançamento de notas e frequências via App',
            'Banco de questões com geração de provas aleatórias',
            'Diário de classe digital com assinatura eletrônica',
            'Visualização do desempenho da turma em tempo real'
        ],
        image: '/images/showcase/professor.jpg',
        color: 'violet'
    },
    {
        id: 'aluno',
        icon: <Users className="w-6 h-6" />,
        title: 'Aluno & Família',
        subtitle: 'Conectando a escola ao lar',
        description: 'Uma experiência mobile completa para que pais e alunos acompanhem cada passo da jornada educacional.',
        features: [
            'Acesso imediato a notas e faltas',
            'Mural de avisos e agenda de eventos',
            'Visualização de conteúdos e tarefas de casa',
            'Download de boletos e histórico financeiro',
            'Timeline de aprendizado e conquistas'
        ],
        image: '/images/showcase/aluno.jpg',
        color: 'teal'
    },
    {
        id: 'agenda',
        icon: <MessageSquare className="w-6 h-6" />,
        title: 'Agenda Digital',
        subtitle: 'Comunicação segura e oficial',
        description: 'Substitua o caos dos grupos de WhatsApp por um canal profissional, seguro e com métricas de leitura.',
        features: [
            'Canais de comunicação por turma ou individuais',
            'Confirmação de leitura para comunicados importantes',
            'Envio de fotos, vídeos e documentos',
            'Segregação total entre vida pessoal e profissional',
            'Autorizações de saída assinadas digitalmente'
        ],
        image: '/images/showcase/agenda.png',
        color: 'emerald'
    },
    {
        id: 'gamificacao',
        icon: <Trophy className="w-6 h-6" />,
        title: 'Gamificação',
        subtitle: 'Engajamento que gera resultados',
        description: 'Transforme o aprendizado em uma jornada épica com o sistema de EduCoins e conquistas.',
        features: [
            'Economia interna com EduCoins (Moeda Escolar)',
            'Ranking de mérito e comportamento',
            'Loja de recompensas pedagógicas',
            'Medalhas por desempenho e assiduidade',
            'Redução comprovada da evasão escolar'
        ],
        image: '/images/showcase/gamificacao.png',
        color: 'amber'
    },
    {
        id: 'gestao',
        icon: <LayoutDashboard className="w-6 h-6" />,
        title: 'Gestão & BI',
        subtitle: 'Dados que viram decisões',
        description: 'Dashboards executivos para diretores e mantenedores terem controle total sobre a saúde da escola.',
        features: [
            'KPIs financeiros (Inadimplência, Receita)',
            'Métricas de evasão e retenção',
            'Análise de desempenho por disciplina e professor',
            'Visão consolidada de múltiplas unidades',
            'Relatórios personalizados para reuniões de conselho'
        ],
        image: '/images/showcase/gestao.png',
        color: 'sky'
    }
];

const colorConfig = {
    indigo: {
        active: 'bg-indigo-700 text-white shadow-indigo-500/25',
        badge: 'bg-indigo-100 text-indigo-700',
        text: 'text-indigo-600',
        glow: 'bg-indigo-500/10'
    },
    violet: {
        active: 'bg-violet-700 text-white shadow-violet-500/25',
        badge: 'bg-violet-100 text-violet-700',
        text: 'text-violet-600',
        glow: 'bg-violet-500/10'
    },
    teal: {
        active: 'bg-teal-700 text-white shadow-teal-500/25',
        badge: 'bg-teal-100 text-teal-700',
        text: 'text-teal-600',
        glow: 'bg-teal-500/10'
    },
    emerald: {
        active: 'bg-emerald-700 text-white shadow-emerald-500/25',
        badge: 'bg-emerald-100 text-emerald-700',
        text: 'text-emerald-600',
        glow: 'bg-emerald-500/10'
    },
    amber: {
        active: 'bg-amber-600 text-white shadow-amber-500/25',
        badge: 'bg-amber-100 text-amber-700',
        text: 'text-amber-600',
        glow: 'bg-amber-500/10'
    },
    sky: {
        active: 'bg-sky-600 text-white shadow-sky-500/25',
        badge: 'bg-sky-100 text-sky-700',
        text: 'text-sky-600',
        glow: 'bg-sky-500/10'
    }
};

export default function ModuleDetailsSection() {
    const [activeTab, setActiveTab] = useState<ModuleDetail>(moduleDetails[0]);

    return (
        <section id="detalhes" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Explore cada <span className="text-indigo-600">detalhe</span> da plataforma
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Uma solução modular que cresce com a sua necessidade. Escolha um módulo abaixo para ver como ele funciona.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {moduleDetails.map((mod) => (
                        <button
                            key={mod.id}
                            onClick={() => setActiveTab(mod)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 transform active:scale-95 shadow-sm ${
                                activeTab.id === mod.id
                                    ? colorConfig[mod.color].active
                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                            }`}
                        >
                            <div className={activeTab.id === mod.id ? 'text-white' : 'text-slate-400'}>
                                {mod.icon}
                            </div>
                            <span>{mod.title}</span>
                        </button>
                    ))}
                </div>

                <div className="max-w-6xl mx-auto bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-2xl shadow-slate-200/50">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col lg:flex-row min-h-[600px]"
                        >
                            <div className="flex-1 p-8 lg:p-16">
                                <div className={`inline-flex items-center px-4 py-2 rounded-full ${colorConfig[activeTab.color].badge} text-sm font-bold mb-6`}>
                                    {activeTab.subtitle}
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                                    {activeTab.title}
                                </h3>
                                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                                    {activeTab.description}
                                </p>

                                <div className="space-y-4">
                                    {activeTab.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className={colorConfig[activeTab.color].text}>
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                            <span className="text-slate-700 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 flex flex-wrap gap-6">
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-tighter">
                                        <ShieldCheck className="w-4 h-4" />
                                        Segurança de dados (LGPD)
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-tighter">
                                        <Zap className="w-4 h-4" />
                                        Performance Extrema
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 bg-slate-200/20 flex items-center justify-center p-8 lg:p-12 border-l border-slate-200/40 relative overflow-hidden">
                                {/* Abstract Visual representation */}
                                <div className={`absolute top-0 right-0 w-80 h-80 ${colorConfig[activeTab.color].glow} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
                                <div className={`absolute bottom-0 left-0 w-80 h-80 ${colorConfig[activeTab.color].glow} rounded-full blur-3xl translate-y-1/2 -translate-x-1/2`} />
                                
                                <div className="relative z-10 w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden bg-white group">
                                    <motion.img
                                        key={activeTab.image}
                                        src={activeTab.image}
                                        alt={activeTab.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-900">
                                            Interface Real do Sistema
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
