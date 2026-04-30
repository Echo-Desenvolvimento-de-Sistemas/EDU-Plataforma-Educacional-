import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
    {
        name: 'Essencial',
        price: 'R$ 0,99',
        unit: '/aluno/mês',
        desc: 'Para escolas que querem começar a digitalizar a gestão.',
        features: [
            'Painel Administrativo',
            'Secretaria Digital',
            'Portal do Professor',
            'Chamada Online',
            'Lançamento de Notas',
            'Suporte por email',
        ],
        cta: 'Começar Agora',
        highlight: false,
    },
    {
        name: 'Profissional',
        price: 'R$ 2,99',
        unit: '/aluno/mês',
        desc: 'Para escolas que querem a gestão completa + comunicação.',
        features: [
            'Tudo do Essencial',
            'Agenda Digital (Chat)',
            'Portal do Aluno & Família',
            'Gamificação (EduCoins)',
            'Planejamento Pedagógico BNCC',
            'Relatórios avançados',
            'White-label (sua marca)',
            'Suporte prioritário',
        ],
        cta: 'Escolher Profissional',
        highlight: true,
        badge: 'Mais Popular',
    },
    {
        name: 'Enterprise',
        price: 'Sob consulta',
        unit: '',
        desc: 'Para redes de ensino e grandes instituições.',
        features: [
            'Tudo do Profissional',
            'API de integração',
            'Multi-unidades',
            'SLA dedicado',
            'Implantação assistida',
            'Gerente de conta exclusivo',
        ],
        cta: 'Falar com Consultor',
        highlight: false,
    },
];

export default function PricingSection() {
    return (
        <section id="precos" className="py-24 md:py-32 bg-gradient-to-b from-sky-50/50 to-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-4 block">
                        Planos e Preços
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Condições especiais de{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">
                            Lançamento
                        </span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Planos flexíveis para escolas de todos os tamanhos. Sem taxa de adesão, sem fidelidade.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className={`relative rounded-2xl p-8 border transition-shadow duration-300 ${
                                plan.highlight
                                    ? 'bg-gradient-to-b from-indigo-600 to-blue-700 border-indigo-400 text-white shadow-2xl shadow-indigo-500/20 scale-105'
                                    : 'bg-white border-slate-200 text-slate-900 hover:shadow-lg'
                            }`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange-500 text-white text-xs font-bold shadow-lg">
                                    {plan.badge}
                                </div>
                            )}
                            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                            <p className={`text-sm mb-6 ${plan.highlight ? 'text-indigo-100' : 'text-slate-500'}`}>{plan.desc}</p>
                            <div className="mb-8">
                                <span className="text-4xl font-extrabold">{plan.price}</span>
                                {plan.unit && <span className={`text-sm ml-1 ${plan.highlight ? 'text-indigo-200' : 'text-slate-400'}`}>{plan.unit}</span>}
                            </div>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feat, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm">
                                        <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? 'text-indigo-200' : 'text-indigo-500'}`} />
                                        <span className={plan.highlight ? 'text-white' : 'text-slate-600'}>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/demo-access" className="block">
                                <Button
                                    className={`w-full h-12 rounded-full font-bold cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                                        plan.highlight
                                            ? 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg'
                                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20'
                                    }`}
                                >
                                    {plan.cta}
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
