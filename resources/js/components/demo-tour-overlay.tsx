import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { SharedData } from '@/types';
import { 
    X, 
    ChevronRight, 
    ChevronLeft, 
    Info, 
    LogOut,
    Sparkles,
    MousePointer2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

interface TourStep {
    title: string;
    content: string;
    target?: string; // Optional selector to highlight (future enhancement)
}

const personaTours: Record<string, TourStep[]> = {
    secretaria: [
        {
            title: "Bem-vindo à Secretaria!",
            content: "Aqui você tem o controle total da escola. Gerencie usuários, turmas e matrículas de forma centralizada."
        },
        {
            title: "Gestão de Alunos",
            content: "Na aba 'Administrativo' você pode gerenciar Pré-Matrículas e a enturmação dos alunos em lote."
        },
        {
            title: "Supervisão Pedagógica",
            content: "Acompanhe e aprove os planos de aula enviados pelos professores no menu 'Acadêmico'."
        }
    ],
    professor: [
        {
            title: "Olá, Professor!",
            content: "Este é seu espaço de trabalho. Tudo o que você precisa para gerenciar suas turmas está aqui."
        },
        {
            title: "Diário de Classe",
            content: "Em 'Minhas Turmas', você pode lançar frequências, avaliações e acompanhar o desempenho dos alunos."
        },
        {
            title: "Planejamento Ágil",
            content: "Crie planos de aula alinhados à BNCC e envie para a coordenação em poucos cliques."
        }
    ],
    aluno: [
        {
            title: "Portal do Aluno",
            content: "Acompanhe seu progresso escolar de forma clara e rápida."
        },
        {
            title: "Notas e Frequência",
            content: "Veja seu boletim atualizado e seu histórico de presença no menu 'Acadêmico'."
        },
        {
            title: "Documentos e Horários",
            content: "Baixe documentos escolares e confira seu horário de aulas a qualquer momento."
        }
    ],
    admin: [
        {
            title: "Painel de Administração",
            content: "Acesso total a todas as funcionalidades do EDU, desde a estrutura curricular até as configurações do sistema."
        },
        {
            title: "Relatórios Estratégicos",
            content: "Visualize o desempenho global da escola e tome decisões baseadas em dados reais."
        },
        {
            title: "Configurações Globais",
            content: "Personalize o sistema, gerencie anos letivos e configure integrações como a Gamificação."
        }
    ]
};

export function DemoTourOverlay() {
    const { auth } = usePage<SharedData>().props;
    const isDemo = auth.is_demo;
    const persona = auth.demo_persona || 'admin';
    
    const [isVisible, setIsVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    const tourSteps = personaTours[persona] || personaTours.admin;

    useEffect(() => {
        if (isDemo && !hasStarted) {
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [isDemo, hasStarted]);

    if (!isDemo) return null;

    const nextStep = () => {
        if (currentStep < tourSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsVisible(false);
            setHasStarted(true);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <>
            {/* Top Banner */}
            <div className="fixed top-0 left-0 right-0 z-[60] h-10 bg-indigo-600 text-white flex items-center justify-between px-4 text-xs font-medium shadow-md">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    <span>MODO DEMONSTRAÇÃO ATIVO: Perfil {persona.charAt(0).toUpperCase() + persona.slice(1)}</span>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setIsVisible(true)}
                        className="hover:underline flex items-center gap-1"
                    >
                        <Info className="h-3 w-3" /> Guia
                    </button>
                    <Link 
                        href="/demo/logout" 
                        method="post" 
                        as="button"
                        className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                    >
                        <LogOut className="h-3 w-3" /> Sair da Demo
                    </Link>
                </div>
            </div>

            <AnimatePresence>
                {isVisible && (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-indigo-100"
                        >
                            <div className="bg-indigo-600 p-6 text-white relative">
                                <button 
                                    onClick={() => setIsVisible(false)}
                                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <MousePointer2 className="h-5 w-5" />
                                    </div>
                                    <span className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Passo {currentStep + 1} de {tourSteps.length}</span>
                                </div>
                                <h3 className="text-2xl font-bold">{tourSteps[currentStep].title}</h3>
                            </div>
                            
                            <div className="p-8">
                                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                    {tourSteps[currentStep].content}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1">
                                        {tourSteps.map((_, idx) => (
                                            <div 
                                                key={idx}
                                                className={`h-1.5 rounded-full transition-all ${idx === currentStep ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-200'}`}
                                            />
                                        ))}
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        {currentStep > 0 && (
                                            <Button variant="outline" onClick={prevStep}>
                                                <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
                                            </Button>
                                        )}
                                        <Button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700">
                                            {currentStep === tourSteps.length - 1 ? 'Começar' : 'Próximo'} 
                                            {currentStep !== tourSteps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                                <p className="text-xs text-slate-400 italic">
                                    Dica: Sinta-se à vontade para criar, editar ou excluir qualquer dado. Nada será salvo permanentemente.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* In-page markers (optional placeholder) */}
            <style dangerouslySetInnerHTML={{ __html: `
                ${isDemo ? `
                    body { padding-top: 40px !important; }
                    [data-slot="sidebar"] > .fixed { top: 40px !important; height: calc(100svh - 40px) !important; }
                    [data-sidebar="sidebar"][data-mobile="true"] { top: 40px !important; height: calc(100svh - 40px) !important; }
                ` : ''}
                .demo-highlight {
                    outline: 3px solid #4f46e5;
                    outline-offset: 4px;
                    border-radius: 4px;
                    animation: pulse-border 2s infinite;
                }
                @keyframes pulse-border {
                    0% { outline-color: rgba(79, 70, 229, 0.4); }
                    50% { outline-color: rgba(79, 70, 229, 1); }
                    100% { outline-color: rgba(79, 70, 229, 0.4); }
                }
            `}} />
        </>
    );
}
