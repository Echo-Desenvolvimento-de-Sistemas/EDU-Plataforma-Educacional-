import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/app-logo';
import {
    GraduationCap,
    BookOpen,
    Users,
    MessageSquare,
    CheckCircle2,
    ArrowRight,
    LayoutDashboard,
    Banknote,
    FileSignature,
    CalendarDays,
    Bell,
    Check,
    PieChart,
    ClipboardCheck,
    Smartphone,
    Trophy,
    Medal,
    Star
} from 'lucide-react';

export default function Landing() {
    return (
        <div className="min-h-screen font-sans bg-slate-50 text-slate-900">
            <Head>
                <title>EDU - Sistema de Gestão Escolar | Plataforma Completa</title>
                <meta name="description" content="Automatize a secretaria, facilite a rotina dos professores e traga a inovação para a sala de aula com o EDU." />
                {/* Schema Markup para Software */}
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "EDU Plataforma Educacional",
                        "operatingSystem": "Web",
                        "applicationCategory": "EducationalApplication",
                        "description": "Sistema de Gestão Escolar completo para automatizar sua secretaria, capacitar seus professores e conectar escola e família.",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "BRL"
                        }
                    }
                    `}
                </script>
            </Head>

            {/* Header */}
            <header className="w-full py-4 px-4 md:px-8 bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AppLogo className="h-10 max-w-[150px]" />
                    </div>

                    <nav className="hidden md:flex items-center gap-8 font-semibold text-slate-600">
                        <Link href="#funcionalidades" className="hover:text-indigo-600 transition-colors">Funcionalidades</Link>
                        <Link href="#modulos" className="hover:text-indigo-600 transition-colors">Módulos</Link>
                        <Link href="#planos" className="hover:text-indigo-600 transition-colors">Preços</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <button className="hidden md:block font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
                                Já sou cliente
                            </button>
                        </Link>
                        <Link href="/demo-access">
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 font-bold shadow-md hover:shadow-lg transition-all">
                                Acessar Demonstração
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main>
                {/* Hero Section */}
                <section className="pt-20 pb-32 relative overflow-visible">
                    {/* Background Decorators */}
                    <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-slate-50 to-slate-50 -z-20"></div>
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

                    <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-5xl">

                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-slate-200 text-indigo-700 font-bold mb-8 text-sm shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                            A plataforma definitiva para escolas inovadoras
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1] mb-8 text-slate-900 drop-shadow-sm">
                            Transforme a Gestão Escolar e Engaje Alunos em <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">uma Única Plataforma</span>
                        </h1>

                        <p className="text-xl md:text-2xl max-w-3xl mx-auto font-medium mb-12 text-slate-600 leading-relaxed">
                            Automatize a secretaria, facilite a rotina dos professores e traga a inovação para a sala de aula.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
                            <Link href="/demo-access">
                                <Button size="lg" className="h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1 transition-all w-full sm:w-auto">
                                    Acessar Sandbox
                                </Button>
                            </Link>
                            <Link href="#planos">
                                <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 rounded-full font-bold shadow-sm hover:shadow-md hover:-translate-y-1 transition-all w-full sm:w-auto">
                                    Agendar Demonstração
                                </Button>
                            </Link>
                        </div>

                        {/* Isometric Mockup Section (Bleeding out into the next section) */}
                        <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[600px] -mb-48 md:-mb-64 pointer-events-none z-30 perspective-[1000px]">

                            {/* Glow Behind Mockups */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-400/20 blur-[100px] rounded-full"></div>

                            {/* Laptop Mockup Placeholder */}
                            <div className="absolute top-0 left-[5%] md:left-[10%] w-[80%] md:w-[70%] aspect-[16/10] bg-slate-800 rounded-t-2xl shadow-2xl border-4 border-slate-700 flex flex-col overflow-hidden transform rotate-x-[15deg] rotate-y-[-10deg] rotate-z-[5deg] transition-transform duration-700 hover:rotate-x-[10deg] hover:rotate-y-[-5deg]">
                                {/* Browser Bar */}
                                <div className="w-full h-6 bg-slate-900 flex items-center px-4 gap-1.5 flex-shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                </div>
                                {/* Fake Admin Dashboard */}
                                <div className="flex-1 bg-slate-100 p-4 flex gap-4 opacity-90">
                                    <div className="w-1/4 h-full bg-white rounded-lg shadow-sm"></div>
                                    <div className="w-3/4 h-full flex flex-col gap-4">
                                        <div className="w-full h-1/3 bg-white rounded-lg shadow-sm"></div>
                                        <div className="w-full h-2/3 bg-white rounded-lg shadow-sm flex pt-8 px-4 gap-4">
                                            <div className="w-1/2 h-full bg-indigo-50 rounded-t-lg"></div>
                                            <div className="w-1/2 h-full bg-indigo-100 rounded-t-lg"></div>
                                        </div>
                                    </div>
                                </div>
                                {/* Laptop Base */}
                                <div className="absolute -bottom-8 left-[-5%] w-[110%] h-8 bg-slate-400 rounded-b-3xl"></div>
                            </div>

                            {/* Phone Mockup Placeholder */}
                            <div className="absolute bottom-10 right-[10%] md:right-[15%] w-[30%] md:w-[25%] aspect-[9/19] bg-slate-900 rounded-[3rem] shadow-2xl border-8 border-slate-800 overflow-hidden transform rotate-x-[15deg] rotate-y-[-20deg] rotate-z-[8deg] -translate-y-12 md:-translate-y-24 transition-transform duration-700 hover:rotate-x-[10deg] hover:rotate-y-[-15deg]">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-slate-800 rounded-b-xl z-10"></div>
                                {/* Fake Student Mobile App */}
                                <div className="w-full h-full bg-slate-50 flex flex-col pt-8 px-4 pb-4 gap-3 opacity-95">
                                    <div className="w-full h-24 bg-indigo-600 rounded-2xl flex flex-col items-center justify-center pt-2">
                                        <div className="w-10 h-10 bg-white/20 rounded-full mb-2"></div>
                                    </div>
                                    <div className="w-full h-16 bg-white rounded-xl shadow-sm border border-slate-100"></div>
                                    <div className="w-full h-16 bg-white rounded-xl shadow-sm border border-slate-100"></div>
                                    <div className="w-full flex-1 bg-white rounded-t-xl shadow-sm border-t border-slate-100 mt-2"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Interactive Showcase Section */}
                <section className="py-24 relative bg-slate-50 overflow-hidden flex flex-col items-center justify-center min-h-[800px] border-t border-slate-200">
                    {/* Small Top Badge */}
                    <div className="mb-12 bg-white px-6 py-2 rounded-full shadow-sm border border-slate-200 font-bold text-indigo-700 z-20">
                        Sistemas Interconectados
                    </div>

                    {/* Decorative Connections (SVG lines in background) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20" xmlns="http://www.w3.org/2000/svg">
                        <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="15%" y1="70%" x2="50%" y2="50%" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="85%" y1="70%" x2="50%" y2="50%" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>

                    {/* Floating Little Icons */}
                    <div className="absolute top-1/4 left-[15%] w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center z-10 transform -rotate-12 animate-pulse" style={{ animationDuration: '3s' }}>
                        <Bell className="text-indigo-400 h-6 w-6" />
                    </div>
                    <div className="absolute top-1/4 right-[15%] w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center z-10 transform rotate-12 animate-pulse" style={{ animationDuration: '4s' }}>
                        <CalendarDays className="text-blue-400 h-6 w-6" />
                    </div>
                    <div className="absolute bottom-1/4 left-[10%] w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center z-10 transform -rotate-6 animate-pulse" style={{ animationDuration: '3.5s' }}>
                        <Users className="text-orange-400 h-6 w-6" />
                    </div>
                    <div className="absolute bottom-1/4 right-[10%] w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center z-10 transform rotate-6 animate-pulse" style={{ animationDuration: '2.5s' }}>
                        <MessageSquare className="text-emerald-400 h-6 w-6" />
                    </div>

                    <div className="relative w-full max-w-5xl flex items-center justify-center h-[500px]">
                        {/* Radial Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[100px] -z-10"></div>

                        {/* Left Tilted Card (Background) */}
                        <div className="absolute left-[5%] md:left-[15%] top-10 transform -rotate-6 md:-rotate-12 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 w-80 p-6 z-10 hidden md:block opacity-90 hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-2 font-bold text-slate-700 mb-6">
                                <Users className="h-5 w-5 text-indigo-500" /> Quem deve participar?
                            </div>
                            <div className="space-y-4">
                                <div className="text-sm text-slate-500 mb-2">Turmas ou Alunos</div>
                                <div className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-sm text-slate-400 mb-4">
                                    Nome da turma ou aluno individual...
                                </div>
                                <div className="flex gap-2 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-orange-200 border-2 border-white ring-2 ring-transparent"></div>
                                    <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white ring-2 ring-transparent"></div>
                                    <div className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-white ring-2 ring-transparent"></div>
                                </div>

                                <div className="text-sm text-slate-500 mb-2">Permissões</div>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center"><CheckCircle2 className="h-4 w-4 text-white" /></div>
                                        <span className="text-sm text-slate-700 font-medium">Apenas alunos matriculados</span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <div className="w-5 h-5 border border-slate-300 rounded bg-white"></div>
                                        <span className="text-sm text-slate-600">Requerer aprovação prévia</span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <div className="w-5 h-5 border border-slate-300 rounded bg-white"></div>
                                        <span className="text-sm text-slate-600">Notificar pais e responsáveis</span>
                                    </label>
                                </div>

                                <div className="pt-4 flex justify-between gap-3">
                                    <Button className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm pointer-events-none">Próximo</Button>
                                    <Button variant="outline" className="w-1/2 pointer-events-none">Voltar</Button>
                                </div>
                            </div>
                        </div>

                        {/* Right Tilted Card (Background) */}
                        <div className="absolute right-[5%] md:right-[15%] top-16 transform rotate-6 md:rotate-12 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 w-80 p-6 z-10 hidden md:block opacity-90 hover:opacity-100 transition-opacity">
                            <div className="flex items-center justify-between mb-4">
                                <div className="font-bold text-slate-700 text-sm">Cronograma da Banca</div>
                            </div>
                            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                                Defina os horários em que os professores podem ser alocados. Conflitos de agenda aparecerão em vermelho no sistema.
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 w-full">
                                    <div className="w-32 bg-red-50 border border-red-100 rounded text-red-700 text-xs px-2 py-2 font-medium text-center">10:00 - 11:45 AM</div>
                                    <div className="flex-1 border text-xs text-slate-400 p-2 rounded bg-slate-50">Conflito Matemática</div>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="w-32 bg-white border border-slate-200 rounded text-slate-700 text-xs px-2 py-2 font-medium text-center">11:45 - 12:30 PM</div>
                                    <div className="flex-1 border border-slate-200 text-xs text-slate-400 p-2 rounded bg-white"></div>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="w-32 bg-indigo-50 border border-indigo-100 rounded text-indigo-700 text-xs px-2 py-2 font-medium text-center">14:00 - 15:45 PM</div>
                                    <div className="flex-1 border border-indigo-200 text-xs text-indigo-600 p-2 rounded bg-indigo-50/50 font-medium">Slot Disponível</div>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="w-32 bg-white border border-slate-200 rounded text-slate-700 text-xs px-2 py-2 font-medium text-center">16:00 - 17:00 PM</div>
                                    <div className="flex-1 border border-slate-200 text-xs text-slate-400 p-2 rounded bg-white"></div>
                                </div>
                            </div>
                        </div>

                        {/* Center Main Modal */}
                        <div className="relative bg-white rounded-[1.5rem] shadow-2xl shadow-slate-300/60 border border-slate-100 w-full max-w-2xl z-30 transform md:scale-110 flex flex-col pt-4 overflow-hidden -mt-8">
                            <div className="px-6 flex items-center justify-between border-b border-slate-100 pb-4 mb-1">
                                <h3 className="font-bold text-slate-800 text-lg">Nova Avaliação</h3>
                                <button className="text-slate-400 hover:text-slate-600 pointer-events-none">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>

                            <div className="flex flex-col md:flex-row h-full">
                                {/* Left Sidebar Steps */}
                                <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-100 p-6 flex flex-col gap-4">
                                    <div className="flex items-center gap-3 text-indigo-600 font-medium text-sm">
                                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs">1</div>
                                        Detalhes
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">2</div>
                                        Disponibilidade
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">3</div>
                                        Participantes
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">4</div>
                                        Notificações
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">5</div>
                                        Opções Extras
                                    </div>
                                </div>

                                {/* Form Area */}
                                <div className="w-full md:w-2/3 p-6 flex flex-col">
                                    <div className="space-y-5 flex-1">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1">Nome da Avaliação</label>
                                            <div className="w-full bg-indigo-50/50 border border-indigo-200 text-indigo-900 rounded-md p-2 text-sm flex items-center">
                                                Prova de Recuperação - 2º Bimestre <span className="inline-block w-[1px] h-4 bg-indigo-500 ml-1 animate-pulse"></span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label className="block text-xs font-semibold text-slate-600 mb-1">Duração</label>
                                                <div className="w-full bg-white border border-slate-200 text-slate-700 rounded-md p-2 text-sm flex justify-between items-center">
                                                    1 Hora
                                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-xs font-semibold text-slate-600 mb-1">Tipo de Aplicação</label>
                                                <div className="w-full bg-white border border-slate-200 text-slate-700 rounded-md p-2 text-sm flex justify-between items-center">
                                                    Presencial
                                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1">Disciplina (Opcional)</label>
                                            <div className="w-full bg-white border border-slate-200 text-slate-400 rounded-md p-2 text-sm">
                                                Selecione a matéria
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1">Instruções para os Alunos (Opcional)</label>
                                            <div className="w-full bg-white border border-slate-200 text-slate-400 rounded-md p-2 text-sm h-16">
                                                Conteúdo baseado nos capítulos 5 a 8...
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100">
                                        <Button variant="outline" className="px-6 pointer-events-none">Anterior</Button>
                                        <Button className="px-6 bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl pointer-events-none">Próximo</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Apresentação de Módulos (Visão por Perfil) */}
                <section id="modulos" className="py-24 bg-white border-t border-slate-200 overflow-hidden">
                    <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                        <div className="text-center mb-20">
                            <div className="text-indigo-600 font-bold tracking-wider uppercase mb-2">Plataforma Completa</div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Feito para cada parte da sua escola</h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Soluções específicas para resolver as dores reais da diretoria, dos professores e das famílias.
                            </p>
                        </div>

                        <div className="space-y-32">
                            {/* Perfil 1: Secretaria e Direção */}
                            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                                <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                                    <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-xl mb-6">
                                        <PieChart size={28} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Para a Secretaria e Direção</h3>
                                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                        Tenha visão estratégica em tempo real. Controle o faturamento, automatize a emissão de boletos e acabe com a papelada graças à nossa Secretaria Digital Automática.
                                    </p>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-center text-slate-700 font-medium">
                                            <div className="mr-3 p-1 bg-green-100 text-green-600 rounded-full"><Check size={14} strokeWidth={3} /></div>
                                            Dashboard de Receitas e Inadimplência
                                        </li>
                                        <li className="flex items-center text-slate-700 font-medium">
                                            <div className="mr-3 p-1 bg-green-100 text-green-600 rounded-full"><Check size={14} strokeWidth={3} /></div>
                                            Geração em lote de Históricos e Declarações
                                        </li>
                                        <li className="flex items-center text-slate-700 font-medium">
                                            <div className="mr-3 p-1 bg-green-100 text-green-600 rounded-full"><Check size={14} strokeWidth={3} /></div>
                                            Kanban Integrado para Fluxo de Matrículas
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full md:w-1/2 relative h-[400px]">
                                    {/* Abstract Background Blob */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-100/50 rounded-full blur-[60px] -z-10"></div>

                                    {/* Revenue Chart Card */}
                                    <div className="absolute top-10 right-4 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 transform rotate-3 hover:rotate-0 transition-transform duration-500 z-20">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                                <Banknote size={16} />
                                            </div>
                                            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">+12.5%</span>
                                        </div>
                                        <h4 className="text-slate-500 text-sm font-semibold mb-1">Receita Mensal</h4>
                                        <p className="text-2xl font-black text-slate-900 mb-4">R$ 145.200,00</p>
                                        <div className="flex items-end gap-2 h-16 pt-2">
                                            <div className="w-1/4 bg-slate-100 rounded-t-sm h-[40%]"></div>
                                            <div className="w-1/4 bg-slate-100 rounded-t-sm h-[60%]"></div>
                                            <div className="w-1/4 bg-indigo-500 rounded-t-sm h-[90%] relative"><div className="absolute -top-1 left-1.5 w-2 h-2 rounded-full bg-indigo-300 animate-ping"></div></div>
                                            <div className="w-1/4 bg-slate-100 rounded-t-sm h-[70%]"></div>
                                        </div>
                                    </div>

                                    {/* Kanban Card */}
                                    <div className="absolute bottom-10 left-4 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 transform -rotate-2 hover:rotate-0 transition-transform duration-500 z-10">
                                        <h4 className="text-slate-800 font-bold mb-4 flex items-center gap-2"><LayoutDashboard size={18} className="text-indigo-500" /> Fila de Matrículas</h4>
                                        <div className="space-y-3">
                                            <div className="w-full p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">MS</div>
                                                <div className="flex-1">
                                                    <div className="h-3 w-3/4 bg-slate-200 rounded mb-1"></div>
                                                    <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
                                                </div>
                                            </div>
                                            <div className="w-full p-3 bg-white border border-indigo-100 shadow-sm rounded-lg flex items-center gap-3 relative overflow-hidden">
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                                                <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px] font-bold">JP</div>
                                                <div className="flex-1">
                                                    <div className="h-3 w-5/6 bg-slate-700 rounded mb-1"></div>
                                                    <div className="h-2 w-1/3 bg-slate-200 rounded"></div>
                                                </div>
                                                <div className="w-16 h-5 bg-indigo-50 rounded text-indigo-600 text-[10px] flex items-center justify-center font-bold">Faturar</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Perfil 2: Professor */}
                            <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-24">
                                <div className="w-full md:w-1/2 relative h-[400px]">
                                    {/* Abstract Background Blob */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-100/50 rounded-full blur-[60px] -z-10"></div>

                                    {/* Grades Grid Card */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-1 z-10">
                                        <div className="bg-slate-50 w-full h-12 rounded-t-xl flex items-center px-4 border-b border-slate-100 justify-between">
                                            <span className="font-bold text-slate-700 text-sm">Matemática - 1º Ano A</span>
                                            <div className="w-16 h-6 bg-white border border-slate-200 rounded flex items-center justify-center text-[10px] text-slate-500 font-bold">1º Bim</div>
                                        </div>
                                        <div className="p-3">
                                            <div className="grid grid-cols-4 gap-2 mb-2 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                <div className="col-span-2">Aluno</div>
                                                <div className="text-center">P1</div>
                                                <div className="text-center">Média</div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="grid grid-cols-4 gap-2 items-center bg-white border border-slate-100 rounded-md p-2">
                                                    <div className="col-span-2 flex items-center gap-2">
                                                        <div className="w-5 h-5 rounded-full bg-slate-200"></div>
                                                        <div className="h-2.5 w-16 bg-slate-300 rounded"></div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="w-8 h-6 bg-slate-50 border border-slate-200 rounded mx-auto flex items-center justify-center text-xs font-bold text-slate-700">8.5</div>
                                                    </div>
                                                    <div className="text-center font-bold text-emerald-500 text-xs">8.5</div>
                                                </div>
                                                <div className="grid grid-cols-4 gap-2 items-center bg-indigo-50 border border-indigo-100 rounded-md p-2 relative ring-1 ring-indigo-500">
                                                    <div className="col-span-2 flex items-center gap-2">
                                                        <div className="w-5 h-5 rounded-full bg-slate-200"></div>
                                                        <div className="h-2.5 w-12 bg-slate-400 rounded"></div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="w-8 h-6 bg-white border border-indigo-300 rounded mx-auto flex items-center justify-center text-xs font-bold text-indigo-700">9.0|</div>
                                                    </div>
                                                    <div className="text-center font-bold text-emerald-500 text-xs">-</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Animated Success Toast */}
                                    <div className="absolute bottom-16 -right-4 w-48 bg-slate-900 text-white rounded-full shadow-2xl p-2.5 pr-4 flex items-center gap-3 transform rotate-3 animate-bounce z-30">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                            <Check size={16} strokeWidth={4} />
                                        </div>
                                        <span className="text-sm font-bold">Nota salva com sucesso!</span>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                                    <div className="inline-flex items-center justify-center p-3 bg-purple-50 text-purple-600 rounded-xl mb-6">
                                        <ClipboardCheck size={28} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Para o Professor</h3>
                                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                        Devolva o tempo livre para os professores. O Diário de Classe Digital simplifica o registro rápido de frequência e o lançamento de notas com cálculo totalmente automático.
                                    </p>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-center text-slate-700 font-medium">
                                            <div className="mr-3 p-1 bg-green-100 text-green-600 rounded-full"><Check size={14} strokeWidth={3} /></div>
                                            Planilha de Notas Inteligente
                                        </li>
                                        <li className="flex items-center text-slate-700 font-medium">
                                            <div className="mr-3 p-1 bg-green-100 text-green-600 rounded-full"><Check size={14} strokeWidth={3} /></div>
                                            Chamada Nominal em poucos cliques
                                        </li>
                                        <li className="flex items-center text-slate-700 font-medium">
                                            <div className="mr-3 p-1 bg-green-100 text-green-600 rounded-full"><Check size={14} strokeWidth={3} /></div>
                                            Fechamento de Bimestre Automático
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Perfil 3: Família e Aluno */}
                            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                                <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                                    <div className="inline-flex items-center justify-center p-3 bg-orange-50 text-orange-600 rounded-xl mb-6">
                                        <Smartphone size={28} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Para a Famíla e o Aluno</h3>
                                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                        Mostre transparência e melhore a comunicação em tempo real. Os pais visualizam o espelho de faltas e o portal de boletos enquanto o aluno recebe os avisos da escola no celular.
                                    </p>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-center text-slate-700 font-medium">
                                            <div className="mr-3 p-1 bg-green-100 text-green-600 rounded-full"><Check size={14} strokeWidth={3} /></div>
                                            Notificações push de Comunicados
                                        </li>
                                        <li className="flex items-center text-slate-700 font-medium">
                                            <div className="mr-3 p-1 bg-green-100 text-green-600 rounded-full"><Check size={14} strokeWidth={3} /></div>
                                            Portal de Boletos com código PIX
                                        </li>
                                        <li className="flex items-center text-slate-700 font-medium">
                                            <div className="mr-3 p-1 bg-green-100 text-green-600 rounded-full"><Check size={14} strokeWidth={3} /></div>
                                            Boletim e Espelho de Faltas ao vivo
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full md:w-1/2 relative h-[450px] flex justify-center">
                                    {/* Abstract Background Blob */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-orange-100/40 rounded-full blur-[60px] -z-10"></div>

                                    {/* Responsive Smartphone Mockup */}
                                    <div className="relative w-64 h-[420px] bg-slate-900 rounded-[2.5rem] shadow-2xl border-[6px] border-slate-800 overflow-hidden transform rotate-2 z-10">
                                        {/* Notch */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20"></div>

                                        {/* App Header */}
                                        <div className="w-full h-24 bg-indigo-600 flex flex-col justify-end px-4 pb-4">
                                            <p className="text-indigo-200 text-xs font-medium">Olá, João!</p>
                                            <h4 className="text-white font-bold text-lg">Resumo Escolar</h4>
                                        </div>

                                        {/* App Body */}
                                        <div className="bg-slate-50 flex-1 h-full p-4 space-y-4">
                                            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-3">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs font-bold text-slate-500">Próxima Aula</span>
                                                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">09:30</span>
                                                </div>
                                                <div className="h-3 w-1/2 bg-slate-800 rounded mb-1"></div>
                                                <div className="h-2 w-1/3 bg-slate-300 rounded"></div>
                                            </div>

                                            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-3">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs font-bold text-slate-500">Boletos</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-red-50 text-red-500 flex items-center justify-center">
                                                        <Banknote size={14} />
                                                    </div>
                                                    <div>
                                                        <div className="h-2.5 w-16 bg-slate-800 rounded mb-1"></div>
                                                        <div className="h-2 w-10 bg-red-400 rounded"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Notification Bell Popup */}
                                        <div className="absolute top-28 right-2 lg:-right-8 w-48 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-slate-100 p-3 z-30 transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 relative">
                                                    <Bell size={14} fill="currentColor" />
                                                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                                                </div>
                                                <div>
                                                    <h5 className="text-xs font-bold text-slate-800 mb-0.5">Novo Comunicado</h5>
                                                    <p className="text-[10px] text-slate-500 leading-tight">A feira de ciências foi remarcada para o dia 15/05.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* O Grande Diferencial: Gamificação Escolar */}
                <section className="py-24 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 relative overflow-hidden border-t-4 border-indigo-500">
                    {/* Background Decorators */}
                    <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                            {/* Text Content */}
                            <div className="w-full lg:w-1/2 text-center lg:text-left">
                                <div className="inline-flex items-center justify-center px-4 py-1.5 bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 rounded-full font-bold text-sm mb-6 uppercase tracking-wider">
                                    <Star className="w-4 h-4 mr-2" fill="currentColor" />
                                    O Grande Diferencial
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                    Engaje os alunos através da <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Gamificação</span>
                                </h2>
                                <p className="text-lg md:text-xl text-indigo-100/80 mb-8 leading-relaxed">
                                    Transforme o comportamento positivo e o rendimento acadêmico em uma jornada divertida. O sistema recompensa os alunos com moedas digitais e emblemas de conquista, estimulando a participação ativa e reduzindo a indisciplina.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                                        <div className="w-10 h-10 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center flex-shrink-0">
                                            <Trophy size={20} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs text-indigo-200">Recompensas por</p>
                                            <p className="text-sm font-bold text-white">Notas e Assiduidade</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                                        <div className="w-10 h-10 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center flex-shrink-0">
                                            <Medal size={20} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs text-indigo-200">Recompensas por</p>
                                            <p className="text-sm font-bold text-white">Bom Comportamento</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Interactive UI Illustration */}
                            <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end h-[400px]">

                                {/* Main App Window */}
                                <div className="relative w-[340px] bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-indigo-100">
                                    {/* Header */}
                                    <div className="bg-indigo-600 p-5 pb-8 relative overflow-hidden">
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500 rounded-full opacity-50"></div>
                                        <div className="relative z-10 flex items-center gap-4">
                                            <div className="w-14 h-14 bg-indigo-200 rounded-full border-2 border-white overflow-hidden flex items-center justify-center text-indigo-700 font-bold text-xl">L</div>
                                            <div>
                                                <p className="text-indigo-100 text-sm font-medium">Nível 12</p>
                                                <h4 className="text-white font-bold text-xl">Lucas Silva</h4>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Body */}
                                    <div className="bg-slate-50 p-5 -mt-4 rounded-t-2xl relative z-20 space-y-4">
                                        {/* Coins Card */}
                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between transform transition hover:-translate-y-1">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center">
                                                    <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-white border-2 border-yellow-200 shadow-sm text-xs font-bold">E</div>
                                                </div>
                                                <div>
                                                    <h5 className="text-slate-800 font-bold text-sm">EduCoins</h5>
                                                    <p className="text-slate-400 text-[10px]">Saldo Atual</p>
                                                </div>
                                            </div>
                                            <span className="text-xl font-black text-slate-800">1.450</span>
                                        </div>

                                        {/* Badges Label */}
                                        <h5 className="text-slate-600 font-bold text-sm mt-4">Últimas Conquistas</h5>

                                        {/* Badges List */}
                                        <div className="flex gap-3">
                                            <div className="bg-white border text-center border-slate-100 rounded-xl p-3 shadow-sm flex-1 flex flex-col items-center">
                                                <div className="w-12 h-12 mb-2 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-inner relative">
                                                    <Star className="text-white w-6 h-6" fill="currentColor" />
                                                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-[8px] font-bold text-slate-800 shadow-sm">+5</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-700">Gabarito</span>
                                            </div>
                                            <div className="bg-white border text-center border-slate-100 rounded-xl p-3 shadow-sm flex-1 flex flex-col items-center">
                                                <div className="w-12 h-12 mb-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-inner relative">
                                                    <ClipboardCheck className="text-white w-6 h-6" />
                                                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-[8px] font-bold text-slate-800 shadow-sm">+2</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-700">100% Freq.</span>
                                            </div>
                                            <div className="bg-white border text-center border-slate-100 rounded-xl p-3 shadow-sm flex-1 flex flex-col items-center opacity-50 grayscale">
                                                <div className="w-12 h-12 mb-2 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center shadow-inner relative">
                                                    <Trophy className="text-slate-400 w-6 h-6" />
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-500">Mês Perfeito</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Rank Item */}
                                <div className="absolute top-1/2 -left-12 lg:-left-20 transform -translate-y-1/2 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100 z-30 animate-[bounce_4s_infinite]">
                                    <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Ranking da Turma</h5>
                                    <div className="space-y-3 w-48">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold w-4 text-emerald-500">1º</span>
                                                <div className="w-6 h-6 bg-indigo-100 text-indigo-700 font-bold text-[10px] rounded-full flex items-center justify-center">M</div>
                                                <span className="text-sm font-semibold text-slate-700">Mariana</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-400">2.1K</span>
                                        </div>
                                        <div className="flex items-center justify-between bg-indigo-50 -mx-2 px-2 py-1.5 rounded-lg border border-indigo-100 relative">
                                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500 rounded-l-lg"></div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold w-4 text-slate-400">2º</span>
                                                <div className="w-6 h-6 bg-indigo-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center border border-indigo-300">L</div>
                                                <span className="text-sm font-bold text-indigo-700">Lucas</span>
                                            </div>
                                            <span className="text-xs font-bold text-indigo-700">1.4K</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Coin Decoration */}
                                <div className="absolute -top-6 right-10 w-16 h-16 bg-gradient-to-tr from-yellow-300 to-yellow-500 rounded-full border-4 border-yellow-200 shadow-xl flex items-center justify-center transform rotate-12 z-20 animate-[pulse_3s_infinite]">
                                    <span className="text-white font-black text-2xl drop-shadow-md">E</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section (New Layout) */}
                <section id="planos" className="py-24 bg-slate-50 relative border-t border-slate-200">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                                Escolha o plano ideal!
                            </h2>
                            <p className="text-lg text-slate-500 mb-10">
                                Selecione entre os melhores planos para garantir a combinação perfeita. Precisa de mais ou menos?
                                Personalize sua assinatura para um ajuste ideal!
                            </p>

                            {/* Toggle Switch */}
                            <div className="inline-flex bg-white rounded-full p-1 border border-slate-200 shadow-sm mx-auto">
                                <button className="px-8 py-3 rounded-full bg-indigo-500 text-white font-medium text-sm transition-all shadow-md">
                                    Mensal
                                </button>
                                <button className="px-8 py-3 rounded-full text-slate-500 hover:text-slate-800 font-medium text-sm transition-all">
                                    Anual (economize 10%)
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 items-stretch pt-4">

                            {/* Plan 1 */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-xl transition-all duration-300">
                                <div className="mb-6">
                                    <span className="inline-block px-4 py-1.5 bg-indigo-500 text-white text-sm font-semibold rounded-full mb-4">
                                        Básico
                                    </span>
                                    <p className="text-sm text-slate-500 mb-8 min-h-[60px]">
                                        Ideal para escolas que estão começando sua digitalização e buscam o sistema já funcionando para agilizar tarefas básicas.
                                    </p>
                                    <div className="flex items-baseline gap-1 text-slate-900">
                                        <span className="text-5xl font-extrabold tracking-tight">R$490</span>
                                        <span className="text-slate-400 font-medium">/mês</span>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 my-6"></div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Implantação em 3-5 dias</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Painel dedicado de Professor</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Gestão de Matriculas Básica</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Acesso a Agenda Escolar</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Atualizações via Dashboard</span>
                                    </li>
                                </ul>

                                <Link href="/demo-access" className="w-full">
                                    <Button className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm rounded-xl py-6 font-semibold">
                                        Começar agora
                                    </Button>
                                </Link>
                            </div>

                            {/* Plan 2 (Highlighted) */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-md border border-slate-200 flex flex-col h-full relative transform md:-translate-y-4 hover:shadow-xl transition-all duration-300">
                                <div className="mb-6">
                                    <span className="inline-block px-4 py-1.5 bg-indigo-500 text-white text-sm font-semibold rounded-full mb-4">
                                        Pro Master
                                    </span>
                                    <p className="text-sm text-slate-500 mb-8 min-h-[60px]">
                                        Ideal se você quer escalar sua gestão escolar rapidamente, com todas as ferramentas táticas ativadas.
                                    </p>
                                    <div className="flex items-baseline gap-1 text-slate-900">
                                        <span className="text-5xl font-extrabold tracking-tight">R$990</span>
                                        <span className="text-slate-400 font-medium">/mês</span>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 my-6"></div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Implantação Expressa 1-3 dias</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Reuniões mensais estratégicas</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Planejamento Pedagógico Inteligente</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Ensalamento Automático</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Portal dos Pais/Alunos completo</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Secretaria Digital Integrada</span>
                                    </li>
                                </ul>

                                <Link href="/demo-access" className="w-full">
                                    <Button className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm rounded-xl py-6 font-semibold">
                                        Começar agora
                                    </Button>
                                </Link>
                            </div>

                            {/* Plan 3 (Gradient Background) */}
                            <div className="rounded-[2rem] p-8 shadow-lg border border-indigo-100 flex flex-col h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-white hover:shadow-xl transition-all duration-300">
                                <div className="mb-6">
                                    <span className="inline-block px-4 py-1.5 bg-white text-slate-800 shadow-sm text-sm font-semibold rounded-full mb-4">
                                        Customizado
                                    </span>
                                    <p className="text-sm text-slate-500 mb-8">
                                        Se esses planos não se encaixam, vamos criar um que sirva perfeitamente. Personalize sua assinatura maior ou menor!
                                    </p>
                                    <div className="flex items-baseline gap-1 text-slate-900 mt-6">
                                        <span className="text-4xl font-extrabold tracking-tight">Fale com</span>
                                    </div>
                                    <div className="text-4xl font-extrabold tracking-tight text-slate-900 mt-1">Especialistas!</div>
                                </div>

                                <div className="border-t border-indigo-100/50 my-6"></div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Tudo presente no design e dev</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Workshop de estratégia inicial</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Suporte prioritário 24/7</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Múltiplas requisições simultâneas</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Testes A/B autônomos</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Check className="h-5 w-5 text-slate-800 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Desenvolvimento avançado sob medida</span>
                                    </li>
                                </ul>

                                <Link href="/demo-access" className="w-full">
                                    <Button className="w-full bg-slate-800 hover:bg-slate-900 text-white shadow-xl rounded-xl py-6 font-semibold border-none">
                                        Agendar Reunião
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-b from-slate-50 to-white py-24 text-center">
                    <div className="container mx-auto px-4 max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Pronto para digitalizar sua escola?</h2>
                        <p className="text-xl text-slate-600 mb-10">Use nossas contas de testes e valide as funcionalidades você mesmo. Descubra porque dezenas de escolas estão migrando.</p>
                        <Link href="/demo-access">
                            <Button size="lg" className="h-16 px-12 text-lg bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                                Entrar no Sandbox (Demo) <ArrowRight className="ml-2 h-6 w-6" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            {/* Copyright */}
            <footer className="bg-slate-900 border-t border-slate-800 py-8 text-center text-sm font-medium text-slate-500">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center opacity-80 gap-4">
                    <div>&copy; {new Date().getFullYear()} Echo Desenvolvimento de Sistemas. Todos os direitos reservados.</div>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
