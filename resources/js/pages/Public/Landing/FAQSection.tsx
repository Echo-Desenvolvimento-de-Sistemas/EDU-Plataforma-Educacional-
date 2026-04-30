import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: 'O EDU funciona para escolas de qualquer tamanho?',
        answer: 'Sim! Nossa arquitetura em nuvem é escalável e atende desde pequenas escolas de educação infantil até grandes redes de ensino fundamental e médio com múltiplas unidades.'
    },
    {
        question: 'Quanto tempo leva a implementação?',
        answer: 'O setup inicial e a importação de dados básicos levam menos de 48 horas. Oferecemos treinamento completo para a equipe administrativa e professores para garantir uma transição suave.'
    },
    {
        question: 'Os dados da minha escola estão seguros?',
        answer: 'Totalmente. Seguimos rigorosamente a LGPD (Lei Geral de Proteção de Dados). Utilizamos criptografia de ponta a ponta e servidores seguros com backups diários automáticos.'
    },
    {
        question: 'Posso usar o sistema no celular?',
        answer: 'Com certeza! O EDU é 100% responsivo e oferece aplicativos nativos para Alunos, Pais e Professores, facilitando o uso no dia a dia da sala de aula ou em casa.'
    },
    {
        question: 'Existe suporte técnico humanizado?',
        answer: 'Sim, nosso suporte é um de nossos maiores orgulhos. Oferecemos atendimento via chat em tempo real, WhatsApp e e-mail com especialistas que entendem de gestão escolar.'
    },
    {
        question: 'É possível personalizar o sistema com a marca da minha escola?',
        answer: 'Sim, oferecemos o serviço de White-label, onde a plataforma assume as cores, logotipo e identidade visual da sua instituição, fortalecendo sua marca perante a comunidade escolar.'
    }
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
                            <HelpCircle className="w-3 h-3" />
                            Dúvidas Comuns
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Perguntas <span className="text-indigo-600">Frequentes</span>
                        </h2>
                        <p className="text-slate-600">
                            Tudo o que você precisa saber sobre o EDU para transformar a gestão da sua escola.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:border-indigo-300"
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                >
                                    <span className="font-bold text-slate-800 pr-4">{faq.question}</span>
                                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${activeIndex === i ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        {activeIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {activeIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
