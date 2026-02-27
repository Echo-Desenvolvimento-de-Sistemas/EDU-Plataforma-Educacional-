import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/app-logo';
import {
    GraduationCap,
    BookOpen,
    Users,
    BarChart3,
    MessageSquare,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';

export default function Landing() {
    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: '#fce169', color: '#4d3d19' }}>
            <Head title="Plataforma Educacional EDU - Gestão Inteligente" />

            {/* Header */}
            <header className="w-full py-6 px-4 md:px-8">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AppLogo className="h-8 max-w-[150px]" />
                    </div>

                    <nav className="hidden md:flex items-center gap-8 font-medium">
                        <Link href="#funcionalidades" className="hover:opacity-80 transition-opacity">Funcionalidades</Link>
                        <Link href="#precos" className="hover:opacity-80 transition-opacity">Preços</Link>
                        <Link href="#contato" className="hover:opacity-80 transition-opacity">Contato</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <button className="hidden md:block font-medium hover:opacity-80 transition-opacity">
                                Entrar
                            </button>
                        </Link>
                        <Link href="/login">
                            <Button className="bg-[#4d3d19] hover:bg-[#3d3014] text-white rounded-full px-6">
                                Agendar Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-4 md:px-8 pt-12 pb-24 h-full relative overflow-hidden">
                <div className="text-center relative z-10 max-w-5xl mx-auto">
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -left-10 md:left-10 bg-white p-3 rounded-2xl shadow-sm rotate-[-12deg] z-20 hidden md:block">
                        <BookOpen className="h-8 w-8 text-[#f97316]" />
                    </div>
                    <div className="absolute top-20 right-0 md:right-20 bg-white p-3 rounded-2xl shadow-sm rotate-[12deg] z-20 hidden md:block">
                        <GraduationCap className="h-8 w-8 text-blue-500" />
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-[#4d3d19] mb-8">
                        GROWING WITH <br />
                        KNOWLEDGE
                    </h1>

                    <p className="text-xl md:text-2xl max-w-2xl mx-auto font-medium mb-16 opacity-80 leading-relaxed">
                        A gestão inteligente que sua escola merece. Inspire curiosidade, construa confiança e torne cada dia uma nova experiência de aprendizado.
                    </p>
                </div>

                {/* Hero Grid / Image Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end relative z-30 max-w-6xl mx-auto">

                    {/* Left Column */}
                    <div className="md:col-span-3 space-y-6">
                        <div className="bg-[#4d3d19] text-white p-6 rounded-[2rem] h-64 flex flex-col justify-between">
                            <h3 className="text-2xl font-bold leading-tight">Gestão de<br />Secretaria<br />Simplificada</h3>
                            <div className="flex justify-between items-end opacity-20">
                                <Users className="h-16 w-16" />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] text-center aspect-square flex flex-col justify-center items-center">
                            <div className="text-[#f97316] text-5xl font-black mb-2">50+</div>
                            <div className="text-[#4d3d19] font-medium leading-tight">Relatórios<br />Gerenciais</div>
                        </div>
                    </div>

                    {/* Center Column (Image Placeholder) */}
                    <div className="md:col-span-6 h-[500px] bg-[#e6c846] rounded-[3rem] relative overflow-hidden hidden md:block shadow-inner border-4 border-[#fce169]">
                        {/* Placeholder for the smiling kid/manager */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#4d3d19] opacity-50">
                            <Users className="h-32 w-32 mb-4" />
                            <span className="font-bold text-xl uppercase tracking-widest">[ Imagem Principal ]</span>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-3 space-y-6">
                        <div className="bg-white p-6 rounded-[2rem] h-64 flex flex-col justify-center text-center">
                            <div className="text-[#f97316] text-5xl font-black mb-2">20+</div>
                            <div className="text-[#4d3d19] font-medium leading-tight mb-6">Módulos de<br />Aprendizado</div>
                            <Link href="/login" className="font-bold border-b-2 border-[#4d3d19] inline-block pb-1 mx-auto hover:text-[#f97316] hover:border-[#f97316] transition-colors">
                                Conheça a Plataforma
                            </Link>
                        </div>
                        <div className="bg-[#4d3d19] text-white p-6 rounded-[2rem] text-center aspect-square flex flex-col justify-center items-center">
                            <div className="flex justify-center mb-4">
                                {/* Avatars placeholder */}
                                <div className="flex -space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-300 border-2 border-[#4d3d19]"></div>
                                    <div className="w-10 h-10 rounded-full bg-slate-400 border-2 border-[#4d3d19]"></div>
                                    <div className="w-10 h-10 rounded-full bg-slate-500 border-2 border-[#4d3d19]"></div>
                                </div>
                            </div>
                            <div className="text-3xl font-black mb-1">500+</div>
                            <div className="text-sm opacity-80 font-medium">Escolas Satisfeitas</div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section id="funcionalidades" className="py-24 bg-white rounded-t-[4rem]">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black uppercase text-[#4d3d19] mb-4">Feito para Gestores</h2>
                        <p className="text-xl opacity-70 max-w-2xl mx-auto">Tudo que uma escola de médio porte precisa para funcionar com eficiência, desde a portaria até a sala dos professores.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-[2rem] bg-[#fce169] bg-opacity-30 border border-[#fce169]">
                            <div className="w-14 h-14 rounded-2xl bg-[#4d3d19] flex items-center justify-center mb-6 text-white">
                                <Users size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Secretaria Ágil</h3>
                            <p className="opacity-80 leading-relaxed">Controle de matrículas, emissão de documentos, histórico escolar e relatórios do Censo Escolar com poucos cliques. Diga adeus ao papel.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-[2rem] bg-orange-50 border border-orange-100">
                            <div className="w-14 h-14 rounded-2xl bg-[#f97316] flex items-center justify-center mb-6 text-white">
                                <BookOpen size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Diário do Professor</h3>
                            <p className="opacity-80 leading-relaxed">Notas, faltas, plano de ensino integrado à BNCC e banco de questões. Tudo via celular ou computador, com interface amigável.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-[2rem] bg-indigo-50 border border-indigo-100">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mb-6 text-white">
                                <MessageSquare size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Agenda Digital</h3>
                            <p className="opacity-80 leading-relaxed">Aproxime os pais da escola. Envie comunicados, boletos e acompanhamento de rotina diretamente pelo app ou WhatsApp integrado.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="precos" className="py-24 bg-[#4d3d19] text-white">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-[#fce169]">Planos e Preços</h2>
                        <p className="text-xl opacity-80 max-w-2xl mx-auto">Valores justos e proporcionais ao tamanho da sua instituição.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Plan 1 */}
                        <div className="bg-white text-[#4d3d19] p-8 rounded-[2rem] flex flex-col">
                            <h3 className="text-2xl font-bold mb-2">Pequeno Porte</h3>
                            <p className="opacity-70 mb-6">Até 200 Alunos</p>
                            <div className="text-4xl font-black mb-8 border-b pb-8">
                                R$ 299 <span className="text-lg font-normal opacity-70">/mês</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#f97316]" size={20} /> Usuários Ilimitados</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#f97316]" size={20} /> Diário Escolar</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#f97316]" size={20} /> Portal do Aluno</li>
                                <li className="flex items-center gap-3 opacity-40"><CheckCircle2 size={20} /> App Agenda e WhatsApp</li>
                            </ul>
                            <Button className="w-full bg-[#4d3d19] hover:bg-[#3d3014] text-white rounded-full h-12">Teste Grátis</Button>
                        </div>

                        {/* Plan 2 */}
                        <div className="bg-[#fce169] text-[#4d3d19] p-8 rounded-[2rem] transform md:-translate-y-4 shadow-xl border-4 border-[#e6c846] flex flex-col relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#f97316] text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider">
                                MAIS ESCOLHIDO
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Médio Porte</h3>
                            <p className="opacity-70 mb-6">Até 600 Alunos</p>
                            <div className="text-4xl font-black mb-8 border-b border-[#4d3d19]/20 pb-8">
                                R$ 599 <span className="text-lg font-normal opacity-70">/mês</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3"><CheckCircle2 size={20} /> Tudo do Pequeno Porte</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={20} /> App Agenda Digital</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={20} /> Integração com WhatsApp</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={20} /> Cobrança Recorrente</li>
                            </ul>
                            <Button className="w-full bg-[#4d3d19] hover:bg-[#3d3014] text-white rounded-full h-12">Falar com Consultor</Button>
                        </div>

                        {/* Plan 3 */}
                        <div className="bg-white text-[#4d3d19] p-8 rounded-[2rem] flex flex-col">
                            <h3 className="text-2xl font-bold mb-2">Grande Porte</h3>
                            <p className="opacity-70 mb-6">Mais de 600 Alunos</p>
                            <div className="text-4xl font-black mb-8 border-b pb-8">
                                Sob Consulta
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#f97316]" size={20} /> Tudo do Médio Porte</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#f97316]" size={20} /> Servidor Dedicado</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#f97316]" size={20} /> Migração de Dados Inclusa</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#f97316]" size={20} /> API Aberta e Treinamento</li>
                            </ul>
                            <Button className="w-full bg-[#4d3d19] hover:bg-[#3d3014] text-white rounded-full h-12">Agendar Reunião</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Credentials Footer */}
            <footer id="contato" className="py-24 bg-white text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-8 text-[#4d3d19]">Acesse o Ambiente de Demonstração</h2>
                    <p className="text-lg opacity-70 mb-12 max-w-2xl mx-auto">
                        Você está no domínio de testes. Use as credenciais abaixo para ver a plataforma por dentro sem compromisso.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <div className="bg-slate-100 px-6 py-4 rounded-xl text-left border border-slate-200">
                            <div className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wider">Acesso Diretor/Secretaria</div>
                            <div className="font-mono font-medium text-[#4d3d19]">admin@admin.com</div>
                            <div className="font-mono text-slate-500">admin123</div>
                        </div>
                        <div className="bg-slate-100 px-6 py-4 rounded-xl text-left border border-slate-200">
                            <div className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wider">Acesso Professor</div>
                            <div className="font-mono font-medium text-[#4d3d19]">professor@demo.com</div>
                            <div className="font-mono text-slate-500">password</div>
                        </div>
                    </div>

                    <Link href="/login">
                        <Button size="lg" className="bg-[#f97316] hover:bg-[#d96614] text-white rounded-full h-14 px-10 text-lg font-bold">
                            Entrar no Sistema <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </footer>
            {/* Copyright */}
            <div className="bg-slate-100 py-6 text-center text-sm font-medium opacity-60">
                &copy; {new Date().getFullYear()} EDU - Gestão Escolar. Todos os direitos reservados.
            </div>
        </div>
    );
}
