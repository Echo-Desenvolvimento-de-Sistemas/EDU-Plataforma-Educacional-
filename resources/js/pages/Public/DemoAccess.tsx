import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    GraduationCap,
    Users,
    BookOpen,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    ShieldCheck,
    Phone,
    Mail,
    Building,
    User
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import LandingHeader from './Landing/LandingHeader';
import LandingFooter from './Landing/LandingFooter';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DemoAccess() {
    const [selectedPersona, setSelectedPersona] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        whatsapp: '',
        institution: '',
        role: '',
        persona: '',
    });

    const personas = [
        {
            id: 'secretaria',
            title: 'Secretaria Escolar',
            description: 'Gestão administrativa, controle de matrículas e emissão de documentos oficiais da instituição.',
            icon: Users,
            color: '#8b5cf6',
            bgClass: 'bg-violet-600',
            image: '/images/demo/secretaria.png',
            path: '/demo/login/secretaria'
        },
        {
            id: 'professor',
            title: 'Professor Titular',
            description: 'Acesso ao diário de classe, planejamento BNCC, controle de frequência e lançamento de notas.',
            icon: BookOpen,
            color: '#f59e0b',
            bgClass: 'bg-[#e9a18a]',
            image: '/images/demo/professor.jpg',
            path: '/demo/login/professor'
        },
        {
            id: 'aluno',
            title: 'Aluno / Responsável',
            description: 'Visualização de boletim online, histórico de frequência, cronograma e materiais didáticos.',
            icon: GraduationCap,
            color: '#a855f7',
            bgClass: 'bg-[#9889c1]',
            image: '/images/demo/aluno.jpg',
            path: '/demo/login/aluno'
        },
        {
            id: 'admin',
            title: 'Direção e Admin',
            description: 'Visão estratégica completa da instituição com relatórios analíticos e configurações globais.',
            icon: ShieldCheck,
            color: '#10b981',
            bgClass: 'bg-[#2d4e35]',
            image: '/images/demo/admin.jpg',
            path: '/demo/login/admin'
        }
    ];

    const handleAcessarClick = (persona: any) => {
        setSelectedPersona(persona);
        setData('persona', persona.id);
        setIsModalOpen(true);
    };

    const handleSubmitLead = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            // Using a standard fetch/axios instead of Inertia post 
            // so we can control the redirect behavior (opening in a new tab)
            const response = await fetch('/demo/lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsModalOpen(false);
                // Open the demo in a new tab
                window.open(`/demo/login/${data.persona}`, '_blank');
            } else {
                const result = await response.json();
                console.error('Submission failed:', result);
            }
        } catch (error) {
            console.error('Error submitting lead:', error);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 selection:bg-sky-500/20 selection:text-sky-900 flex flex-col">
            <Head title="Acesso à Demonstração - EDU" />

            <LandingHeader />

            <main className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    
                    {/* Header Text */}
                    <div className="text-center space-y-6 mb-20">
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-slate-200 px-4 py-1.5 text-sm font-semibold text-sky-600 mb-2"
                        >
                            <Sparkles className="h-4 w-4" />
                            Ambiente de Demonstração Interativo
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black tracking-tight text-slate-900"
                        >
                            Escolha um <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Perfil de Acesso</span>
                        </motion.h1>
                    </div>

                    {/* Persona Card Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {personas.map((persona, index) => (
                            <motion.div
                                key={persona.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div 
                                    className="relative h-[540px] w-full rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2 border border-slate-200"
                                    style={{ backgroundColor: persona.bgClass.startsWith('bg-[') ? persona.bgClass.match(/\[(.*?)\]/)?.[1] : undefined }}
                                >
                                    <div className={`absolute inset-0 ${persona.bgClass.startsWith('bg-') ? persona.bgClass : ''}`} />
                                    
                                    <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
                                        <img 
                                            src={persona.image} 
                                            alt={persona.title}
                                            className="w-full h-full object-cover object-top transition-all duration-700 grayscale brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-110 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                                    </div>

                                    <div className="absolute inset-x-4 bottom-4 z-20 bg-white/80 backdrop-blur-2xl rounded-[32px] p-8 border border-white/40 shadow-xl flex flex-col">
                                        <div className="space-y-1 mb-4">
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">
                                                {persona.title}
                                            </h3>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest opacity-80 flex items-center gap-1.5">
                                                <persona.icon className="h-3 w-3" /> Perfil {persona.id}
                                            </p>
                                        </div>
                                        
                                        <p className="text-sm text-slate-600 font-medium leading-snug mb-8 line-clamp-3 min-h-[4.5rem]">
                                            {persona.description}
                                        </p>

                                        <div className="mt-auto">
                                            <Button 
                                                onClick={() => handleAcessarClick(persona)}
                                                className="w-full bg-slate-900 text-white hover:bg-sky-600 h-12 rounded-2xl font-black text-sm shadow-lg transition-all active:scale-95"
                                            >
                                                Liberar Acesso
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Lead Capture Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[440px] rounded-[24px] border-none shadow-2xl p-0 overflow-hidden bg-white text-slate-900">
                    <div className="bg-violet-50 p-6 text-slate-900 relative border-b border-violet-100">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-200/20 blur-3xl rounded-full -mr-16 -mt-16" />
                        
                        <DialogHeader className="relative z-10 text-left">
                            <div className="inline-flex items-center gap-2 rounded-full bg-violet-600/10 px-2.5 py-1 text-[9px] font-bold text-violet-600 mb-3 w-fit border border-violet-200/50 uppercase tracking-tight">
                                <ShieldCheck className="h-3 w-3" />
                                Ambiente Seguro
                            </div>
                            <DialogTitle className="text-2xl font-black tracking-tight leading-tight mb-1 text-slate-900">
                                Quase pronto!
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 text-sm font-medium leading-tight">
                                Libere o acesso ao perfil <span className="text-violet-600 font-bold">{selectedPersona?.title}</span>.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <form onSubmit={handleSubmitLead} className="p-6 space-y-4 bg-white">
                        <div className="grid grid-cols-1 gap-4">
                            {/* Nome */}
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</Label>
                                <div className="relative group">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                    <Input 
                                        id="name" 
                                        placeholder="Seu nome" 
                                        className="pl-10 h-11 rounded-xl border-slate-100 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:ring-sky-500 text-sm transition-all"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                                </div>
                            </div>

                            {/* Email e Whats */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <Label htmlFor="email" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                        <Input 
                                            id="email" 
                                            type="email"
                                            placeholder="seu@email.com" 
                                            className="pl-10 h-11 rounded-xl border-slate-100 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:ring-sky-500 text-sm transition-all"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="whatsapp" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp</Label>
                                    <div className="relative group">
                                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                        <Input 
                                            id="whatsapp" 
                                            placeholder="(00) 00000-0000" 
                                            className="pl-10 h-11 rounded-xl border-slate-100 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:ring-sky-500 text-sm transition-all"
                                            value={data.whatsapp}
                                            onChange={e => setData('whatsapp', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Instituição */}
                            <div className="space-y-1.5">
                                <Label htmlFor="institution" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Instituição / Escola</Label>
                                <div className="relative group">
                                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                    <Input 
                                        id="institution" 
                                        placeholder="Nome da escola" 
                                        className="pl-10 h-11 rounded-xl border-slate-100 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:ring-sky-500 text-sm transition-all"
                                        value={data.institution}
                                        onChange={e => setData('institution', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="w-full bg-slate-900 hover:bg-sky-600 text-white h-12 rounded-xl font-black text-base shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 group"
                            >
                                {processing ? (
                                    <Sparkles className="h-5 w-5 animate-pulse" />
                                ) : (
                                    <>
                                        Começar Agora
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </div>

                        <p className="text-[10px] text-center text-slate-400 font-medium leading-tight max-w-[240px] mx-auto">
                            Acesso imediato ao ambiente sandbox isolado.
                        </p>
                    </form>
                </DialogContent>
            </Dialog>

            <LandingFooter />
        </div>
    );
}
