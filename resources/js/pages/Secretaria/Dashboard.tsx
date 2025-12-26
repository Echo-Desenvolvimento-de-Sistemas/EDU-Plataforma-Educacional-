import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Users, FileText, Calendar, Plus, ExternalLink, GraduationCap, ClipboardCheck, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Secretaria',
        href: '/secretaria/dashboard',
    },
];

interface Props {
    auth: any;
    stats: {
        totalStudents: number;
        pendingPreRegistrations: number;
        activeClasses: number;
    };
    recentPreRegistrations: any[];
}

export default function Dashboard({ auth, stats, recentPreRegistrations }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Secretaria" />

            <div className="flex flex-col gap-6 p-4 max-w-7xl mx-auto w-full pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                            Olá, {auth.user.name.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-muted-foreground">
                            Bem-vindo ao painel administrativo da secretaria.
                        </p>
                    </div>
                    <div className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                        {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total de Alunos
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalStudents}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Alunos ativos no sistema
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pré-Matrículas Pendentes
                            </CardTitle>
                            <FileText className={`h-4 w-4 ${stats.pendingPreRegistrations > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${stats.pendingPreRegistrations > 0 ? 'text-orange-600' : ''}`}>
                                {stats.pendingPreRegistrations}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Aguardando validação
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Turmas Ativas
                            </CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.activeClasses}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Ano letivo corrente
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Registrations List */}
                    <div className="lg:col-span-2">
                        <Card className="h-full">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Últimas Pré-Matrículas</CardTitle>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/admin/pre-registrations">
                                        Ver Todas <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                {recentPreRegistrations.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nome</TableHead>
                                                <TableHead>Turma</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Data</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentPreRegistrations.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell className="font-medium">
                                                        {item.student_name || item.student?.name || 'Sem nome'}
                                                    </TableCell>
                                                    <TableCell>{item.target_class?.name || '-'}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={item.status === 'completed' ? 'outline' : 'destructive'} className={item.status === 'completed' ? 'text-green-600 border-green-600' : ''}>
                                                            {item.status === 'pending' ? 'Pendente' : 'Concluído'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right text-xs text-muted-foreground">
                                                        {new Date(item.created_at).toLocaleDateString()}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground text-sm">
                                        Nenhuma pré-matrícula recente.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Ações Rápidas</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button asChild className="w-full justify-start" variant="default">
                                    <Link href="/admin/pre-registrations">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Nova Pré-Matrícula
                                    </Link>
                                </Button>

                                <Button asChild className="w-full justify-start" variant="outline">
                                    <Link href="/secretaria/users">
                                        <Users className="mr-2 h-4 w-4" />
                                        Gerenciar Usuários
                                    </Link>
                                </Button>

                                <Button asChild className="w-full justify-start" variant="outline">
                                    <Link href="/secretaria/grades">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Consultar Notas
                                    </Link>
                                </Button>

                                <Button asChild className="w-full justify-start" variant="outline">
                                    <Link href="/admin/attendance">
                                        <ClipboardCheck className="mr-2 h-4 w-4" />
                                        Lançar Frequência
                                    </Link>
                                </Button>

                                <Button asChild className="w-full justify-start" variant="outline">
                                    <Link href="/events">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Agenda Escolar
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
