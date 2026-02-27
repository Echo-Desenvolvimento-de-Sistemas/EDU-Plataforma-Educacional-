import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    GraduationCap,
    Users,
    BookOpen,
    ArrowRight,
    ArrowLeft
} from 'lucide-react';
import AppLogo from '@/components/app-logo';

export default function DemoAccess() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
            <Head title="Acesso à Demonstração - EDU" />

            <header className="w-full border-b bg-white">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <AppLogo className="h-8 w-auto" />
                    </Link>
                    <Link href="/">
                        <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">

                <div className="text-center space-y-4 mb-12">
                    <div className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 mb-2">
                        Ambiente Fechado
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                        Bem-vindo ao Sandbox
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Este é um ambiente exclusivo para testes da plataforma EDU. Os dados inseridos aqui são apagados periodicamente.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">1. Escolha um Perfil</h2>
                    <p className="text-slate-600 mb-8">Utilize as credenciais abaixo na tela de login para visualizar a plataforma através da ótica de diferentes usuários.</p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Admin */}
                        <Card className="border-indigo-100 hover:border-indigo-300 transition-colors shadow-none">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-indigo-700 text-lg">
                                    <Users className="h-5 w-5" />
                                    Diretor/Secretaria
                                </CardTitle>
                                <CardDescription className="text-xs">Acesso total às configurações e matrículas.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-slate-50 p-3 rounded-md space-y-1 border border-slate-100 font-mono text-sm">
                                    <div className="block text-slate-500 text-xs mb-1">E-mail:</div>
                                    <div className="font-semibold text-slate-800 break-all">admin@admin.com</div>
                                    <div className="block text-slate-500 text-xs mt-2 mb-1">Senha:</div>
                                    <div className="font-semibold text-slate-800">admin123</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Professor */}
                        <Card className="border-blue-100 hover:border-blue-300 transition-colors shadow-none">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-blue-700 text-lg">
                                    <BookOpen className="h-5 w-5" />
                                    Professor
                                </CardTitle>
                                <CardDescription className="text-xs">Acesso ao diário de classe e avaliações.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-slate-50 p-3 rounded-md space-y-1 border border-slate-100 font-mono text-sm">
                                    <div className="block text-slate-500 text-xs mb-1">E-mail:</div>
                                    <div className="font-semibold text-slate-800 break-all">professor@demo.com</div>
                                    <div className="block text-slate-500 text-xs mt-2 mb-1">Senha:</div>
                                    <div className="font-semibold text-slate-800">password</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Aluno */}
                        <Card className="border-orange-100 hover:border-orange-300 transition-colors shadow-none">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-orange-700 text-lg">
                                    <GraduationCap className="h-5 w-5" />
                                    Aluno
                                </CardTitle>
                                <CardDescription className="text-xs">Visão do aluno, notas e boletim.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-slate-50 p-3 rounded-md space-y-1 border border-slate-100 font-mono text-sm">
                                    <div className="block text-slate-500 text-xs mb-1">E-mail:</div>
                                    <div className="font-semibold text-slate-800 break-all">aluno@demo.com</div>
                                    <div className="block text-slate-500 text-xs mt-2 mb-1">Senha:</div>
                                    <div className="font-semibold text-slate-800">password</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Responsável */}
                        <Card className="border-emerald-100 hover:border-emerald-300 transition-colors shadow-none">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-emerald-700 text-lg">
                                    <Users className="h-5 w-5" />
                                    Responsável
                                </CardTitle>
                                <CardDescription className="text-xs">Acesso às informações dos dependentes.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-slate-50 p-3 rounded-md space-y-1 border border-slate-100 font-mono text-sm">
                                    <div className="block text-slate-500 text-xs mb-1">E-mail:</div>
                                    <div className="font-semibold text-slate-800 break-all">responsavel@demo.com</div>
                                    <div className="block text-slate-500 text-xs mt-2 mb-1">Senha:</div>
                                    <div className="font-semibold text-slate-800">password</div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>

                <div className="text-center py-8">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">2. Realize o Teste</h2>
                    <Link href="/login">
                        <Button size="lg" className="h-14 px-10 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            Acessar Tela de Login <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>

            </main>
        </div>
    );
}
