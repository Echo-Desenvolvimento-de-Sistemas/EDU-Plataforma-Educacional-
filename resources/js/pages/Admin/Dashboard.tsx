import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, GraduationCap, School, FileText, ArrowUpRight, Clock, UserPlus, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DashboardStats {
    totalStudents: number;
    totalProfessors: number;
    totalClasses: number;
    pendingPreRegistrations: number;
}

interface ChartData {
    name: string;
    total: number;
    origin_school?: string;
}

interface RecentActivity {
    id: number;
    name: string;
    status: string;
    date: string;
    target_class: string;
}

interface RecentUser {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Props {
    stats: DashboardStats;
    charts: {
        studentsByLevel: ChartData[];
        studentsByGrade: ChartData[];
        studentsByGender: ChartData[];
        topSchools: ChartData[];
    };
    recent: {
        preRegistrations: RecentActivity[];
        users: RecentUser[];
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: '/admin/dashboard',
    },
];

export default function Dashboard({ stats, charts, recent }: Props) {
    // Helper to calculate max value for chart scaling
    const maxLevel = Math.max(...charts.studentsByLevel.map(c => c.total), 1);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin" />

            <div className="flex flex-col gap-6 p-4">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Visão Geral</h1>
                    <p className="text-muted-foreground">Bem-vindo ao painel administrativo do Edu.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalStudents}</div>
                            <p className="text-xs text-muted-foreground">Matriculados ativos</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Professores</CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalProfessors}</div>
                            <p className="text-xs text-muted-foreground">Docentes cadastrados</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Turmas</CardTitle>
                            <School className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalClasses}</div>
                            <p className="text-xs text-muted-foreground">Em andamento</p>
                        </CardContent>
                    </Card>
                    <Card className={stats.pendingPreRegistrations > 0 ? "border-yellow-500" : ""}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pré-Matrículas</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pendingPreRegistrations}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.pendingPreRegistrations > 0 ? 'Aguardando aprovação' : 'Nenhuma pendência'}
                            </p>
                            {stats.pendingPreRegistrations > 0 && (
                                <Link href="/admin/pre-registrations" className="text-xs text-blue-600 hover:underline flex items-center mt-1">
                                    Ver pendentes <ArrowUpRight className="h-3 w-3 ml-1" />
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Main Charts Area */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                    {/* Bar Chart: Students by Level */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Alunos por Nível de Ensino</CardTitle>
                            <CardDescription>Distribuição de matrículas por ciclo escolar.</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="space-y-4">
                                {charts.studentsByLevel.length > 0 ? (
                                    charts.studentsByLevel.map((item) => (
                                        <div key={item.name} className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-medium">{item.name}</span>
                                                <span className="text-muted-foreground">{item.total} alunos</span>
                                            </div>
                                            <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                                    style={{ width: `${(item.total / maxLevel) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                                        Sem dados de alunos.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Donut Chart: Gender & Top Classes */}
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Distribuição</CardTitle>
                            <CardDescription>Gênero e Maiores Turmas.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {/* Genre Stats (Mini) */}
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    {charts.studentsByGender.map((g) => (
                                        <div key={g.name} className="flex flex-col items-center p-2 bg-secondary/50 rounded-lg">
                                            <span className="text-2xl font-bold">{g.total}</span>
                                            <span className="text-xs text-muted-foreground">{g.name}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Top Classes */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium text-muted-foreground">Maiores Turmas</h4>
                                    {charts.studentsByGrade.length > 0 ? (
                                        charts.studentsByGrade.map((item, index) => (
                                            <div key={item.name} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                                <div className="flex items-center gap-2">
                                                    <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${index === 0 ? 'bg-blue-100 text-blue-700' : 'bg-secondary text-muted-foreground'}`}>
                                                        {index + 1}
                                                    </div>
                                                    <span className="text-sm font-medium">{item.name}</span>
                                                </div>
                                                <span className="text-sm font-bold">{item.total}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-sm text-muted-foreground text-center py-4">Sem dados.</div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activities & Schools */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Recent Pre-Registrations */}
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Pré-Matrículas Recentes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent.preRegistrations.map((pre) => (
                                    <div key={pre.id} className="flex items-start gap-3 text-sm">
                                        <div className={`mt-1 h-2 w-2 rounded-full ${pre.status === 'pending' ? 'bg-yellow-500' : (pre.status === 'approved' ? 'bg-green-500' : 'bg-red-500')}`} />
                                        <div className="flex-1 space-y-1">
                                            <p className="font-medium leading-none">{pre.name}</p>
                                            <p className="text-xs text-muted-foreground">Para: {pre.target_class}</p>
                                        </div>
                                        <div className="text-xs text-muted-foreground">{pre.date}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Users */}
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserPlus className="h-4 w-4" />
                                Usuários Recentes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent.users.map((user) => (
                                    <div key={user.id} className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="truncate text-sm font-medium leading-none">{user.name}</p>
                                            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                        <Badge variant="outline" className="text-[10px]">{user.role}</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Schools */}
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building className="h-4 w-4" />
                                Escolas de Origem
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {charts.topSchools.length > 0 ? (
                                    charts.topSchools.map((school, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                                            <span className="truncate flex-1 pr-2" title={school.origin_school}>
                                                {school.origin_school}
                                            </span>
                                            <Badge variant="secondary">{school.total}</Badge>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-muted-foreground text-sm text-center py-4">
                                        Nenhuma informação de escola de origem.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </AppLayout>
    );
}
