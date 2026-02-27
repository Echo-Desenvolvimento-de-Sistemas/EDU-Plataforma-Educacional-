import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    GraduationCap,
    Users,
    BookOpen,
    CalendarCheck,
    FileText,
    MessageCircle,
    ArrowRight
} from 'lucide-react';

export default function Landing() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Head title="Plataforma Educacional EDU - Demonstração" />

            {/* Navigation / Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2 font-bold text-xl text-indigo-700">
                        <GraduationCap className="h-6 w-6" />
                        <span>EDU</span>
                    </div>
                    <div>
                        <Link href="/login">
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                Acessar Plataforma <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 md:py-24 space-y-24">

                {/* Hero Section */}
                <section className="text-center space-y-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-800 mb-4">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
                        Ambiente de Demonstração
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                        O sistema de gestão escolar <span className="text-indigo-600">simples e inteligente.</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Bem-vindo ao ambiente de testes da Plataforma Educacional EDU.
                        Explore todas as funcionalidades do sistema como secretaria, professor ou aluno.
                    </p>
                    <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/login">
                            <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-1">
                                Testar Agora
                            </Button>
                        </Link>
                        <Link href="#credenciais">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base">
                                Ver Credenciais de Acesso
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Features Carousel/Cards */}
                <section className="grid md:grid-cols-3 gap-8">
                    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                                <Users className="h-6 w-6 text-emerald-600" />
                            </div>
                            <CardTitle>Gestão da Secretaria</CardTitle>
                        </CardHeader>
                        <CardContent className="text-slate-600">
                            Controle total sobre matrículas, enturmação, histórico escolar, declarações e relatórios administrativos de forma rápida.
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                                <BookOpen className="h-6 w-6 text-blue-600" />
                            </div>
                            <CardTitle>Portal do Professor</CardTitle>
                        </CardHeader>
                        <CardContent className="text-slate-600">
                            Diário de classe simplificado: chamadas, lançamento de notas, planejamento de aulas integrado à BNCC e banco de questões.
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                                <GraduationCap className="h-6 w-6 text-orange-600" />
                            </div>
                            <CardTitle>Portal do Aluno</CardTitle>
                        </CardHeader>
                        <CardContent className="text-slate-600">
                            Acompanhamento em tempo real de notas, faltas, boletim inteligente e resolução de atividades gamificadas diretamente pela plataforma.
                        </CardContent>
                    </Card>
                </section>

                {/* Additional Modules */}
                <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Muito mais que um diário escolar</h2>
                        <p className="text-slate-400">Ferramentas integradas para facilitar a comunicação e organização do dia a dia.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-3 flex flex-col items-center">
                            <MessageCircle className="h-8 w-8 text-indigo-400" />
                            <h3 className="font-semibold text-lg">Agenda Digital</h3>
                            <p className="text-slate-400 text-sm">Comunicação direta com pais e responsáveis via portal ou WhatsApp.</p>
                        </div>
                        <div className="space-y-3 flex flex-col items-center">
                            <CalendarCheck className="h-8 w-8 text-indigo-400" />
                            <h3 className="font-semibold text-lg">Horários de Aula</h3>
                            <p className="text-slate-400 text-sm">Organização da grade curricular e horários dos professores sem conflitos.</p>
                        </div>
                        <div className="space-y-3 flex flex-col items-center">
                            <FileText className="h-8 w-8 text-indigo-400" />
                            <h3 className="font-semibold text-lg">Documentos</h3>
                            <p className="text-slate-400 text-sm">Geração automática de boletins, atas, contratos com validade digital.</p>
                        </div>
                    </div>
                </section>

                {/* Credentials Section */}
                <section id="credenciais" className="max-w-4xl mx-auto pt-8">
                    <div className="text-center space-y-4 mb-10">
                        <h2 className="text-3xl font-bold">Acesse e Experimente</h2>
                        <p className="text-slate-600">Utilize as credenciais abaixo para testar diferentes perfis do sistema. Fique à vontade para criar, editar ou apagar dados neste ambiente de demonstração.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Admin Credential */}
                        <Card className="border-indigo-100 bg-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-indigo-700">
                                    <Users className="h-5 w-5" />
                                    Admin / Secretaria
                                </CardTitle>
                                <CardDescription>Acesso total às configurações e matrículas.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-slate-50 p-4 rounded-md space-y-2 border border-slate-100 font-mono text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Login:</span>
                                        <span className="font-semibold text-slate-800">admin@admin.com</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Senha:</span>
                                        <span className="font-semibold text-slate-800">admin123</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Professor Credential */}
                        <Card className="border-indigo-100 bg-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-blue-700">
                                    <BookOpen className="h-5 w-5" />
                                    Professor
                                </CardTitle>
                                <CardDescription>Acesso ao diário de classe e avaliações.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-slate-50 p-4 rounded-md space-y-2 border border-slate-100 font-mono text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Login:</span>
                                        <span className="font-semibold text-slate-800">professor@demo.com</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Senha:</span>
                                        <span className="font-semibold text-slate-800">password</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Student Credential */}
                        <Card className="border-indigo-100 bg-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-orange-700">
                                    <GraduationCap className="h-5 w-5" />
                                    Aluno
                                </CardTitle>
                                <CardDescription>Visão do aluno, notas e boletim.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-slate-50 p-4 rounded-md space-y-2 border border-slate-100 font-mono text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Login:</span>
                                        <span className="font-semibold text-slate-800">aluno@demo.com</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Senha:</span>
                                        <span className="font-semibold text-slate-800">password</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Guardian Credential */}
                        <Card className="border-indigo-100 bg-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-emerald-700">
                                    <Users className="h-5 w-5" />
                                    Responsável
                                </CardTitle>
                                <CardDescription>Acesso às informações dos dependentes.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-slate-50 p-4 rounded-md space-y-2 border border-slate-100 font-mono text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Login:</span>
                                        <span className="font-semibold text-slate-800">responsavel@demo.com</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Senha:</span>
                                        <span className="font-semibold text-slate-800">password</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    <div className="mt-12 text-center pb-8 border-b">
                        <Link href="/login">
                            <Button size="lg" className="h-12 px-8 text-base bg-indigo-600 hover:bg-indigo-700">
                                Acessar Plataforma <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </section>

            </main>

            <footer className="py-8 text-center text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Echo Desenvolvimento de Sistemas. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

