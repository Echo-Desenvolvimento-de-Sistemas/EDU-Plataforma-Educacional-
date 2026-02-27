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
    Check
} from 'lucide-react';

export default function Landing() {
    return (
        <div className="min-h-screen font-sans bg-slate-50 text-slate-900">
            <Head title="EDU - Sistema de Gestão Escolar" />

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

            {/* Hero Section */}
            <main className="pt-20 pb-32 relative overflow-visible">
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
            </main>

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

            {/* Comprehensive Modules Section */}
            <section id="modulos" className="py-24 bg-white border-t border-slate-200">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="text-indigo-600 font-bold tracking-wider uppercase mb-2">Entenda a Plataforma</div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Módulos que resolvem o seu dia a dia</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            O EDU foi construído pensando nas dores de escolas de pequeno e médio porte, agrupando ferramentas poderosas em uma interface simples e moderna.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                        {/* Module 1 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <LayoutDashboard size={28} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-3">Dashboard Administrativo</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Visão macro da instituição. Gráficos de inadimplência, desempenho de turmas, alunos críticos e fluxo de caixa, permitindo à diretoria tomar decisões baseadas em dados em vez de intuição.
                                </p>
                            </div>
                        </div>

                        {/* Module 2 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                                    <FileSignature size={28} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-3">Gestão Documental Automática</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Chega de malotes e pranchetas. A secretaria pode gerar históricos, atestados, declarações de passe escolar e relatórios do Censo em formatos padronizados automaticamente com um clique.
                                </p>
                            </div>
                        </div>

                        {/* Module 3 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                    <BookOpen size={28} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-3">Planejamento Pedagógico Integrado</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Professores desenham aulas consultando a BNCC diretamente na tela. O processo é submetido para aprovação do supervisor pedagógico e sincronizado automaticamente com o diário de classe.
                                </p>
                            </div>
                        </div>

                        {/* Module 4 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                                    <CalendarDays size={28} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-3">Ensalamento e Horários de Aula</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Motor inteligente para montar o horário das aulas evitando o choque de de horários dos professores entre diferentes turmas. Acesso via portal do aluno sobre qual é a próxima aula.
                                </p>
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
