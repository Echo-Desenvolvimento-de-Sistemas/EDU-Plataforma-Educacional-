import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Users, Clock, Calendar, FileText } from 'lucide-react';
import { DashboardCard } from '@/components/Professor/DashboardCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Allocation {
    class_room_id: number;
    class_room_name: string;
    grade_name: string;
    academic_year: string;
    subjects: { id: number; name: string }[];
}

interface ScheduleItem {
    id: number;
    time: string;
    class: string;
    subject: string;
    room: string;
    start_time: string; // HH:mm:ss
    end_time: string;   // HH:mm:ss
    status?: 'done' | 'next' | 'current' | 'future';
    class_room_id: number;
}

interface Props {
    allocations: Allocation[];
    dailySchedule: ScheduleItem[];
    stats: {
        totalClasses: number;
        totalStudents: number;
        todayClasses: number;
        attendanceRate: number;
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Painel do Professor',
        href: '/professor/dashboard',
    },
];

export default function Dashboard({ allocations, dailySchedule, stats }: Props) {
    // Process schedule (same logic as before)
    const processedSchedule = dailySchedule.map(item => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const [startH, startM] = item.start_time.split(':').map(Number);
        const [endH, endM] = item.end_time.split(':').map(Number);
        const startTotal = startH * 60 + startM;
        const endTotal = endH * 60 + endM;

        let status: 'done' | 'next' | 'current' | 'future' = 'future';
        if (currentTime > endTotal) status = 'done';
        else if (currentTime >= startTotal && currentTime <= endTotal) status = 'current';

        return { ...item, status };
    });

    const currentClass = processedSchedule.find(s => s.status === 'current');
    const nextClass = processedSchedule.find(s => s.status === 'future');
    const highlightClass = currentClass || nextClass;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Painel do Professor" />

            <div className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">

                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Olá, Professor</h1>
                        <p className="text-muted-foreground flex items-center mt-1">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </p>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Minhas Turmas</span>
                            <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="mt-2">
                            <span className="text-2xl font-bold">{stats.totalClasses}</span>
                        </div>
                    </Card>
                    <Card className="p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Total Alunos</span>
                            <Users className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="mt-2">
                            <span className="text-2xl font-bold">{stats.totalStudents}</span>
                        </div>
                    </Card>
                    <Card className="p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Aulas Hoje</span>
                            <Clock className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="mt-2">
                            <span className="text-2xl font-bold">{stats.todayClasses}</span>
                            <span className="text-xs text-muted-foreground ml-2">agendadas</span>
                        </div>
                    </Card>
                    <Card className="p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Frequência Média</span>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">30 dias</Badge>
                        </div>
                        <div className="mt-2">
                            <span className="text-2xl font-bold">{stats.attendanceRate}%</span>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Content Column (2/3 width) */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Highlight Class */}
                        <section>
                            <h2 className="text-lg font-semibold mb-4">Acompanhamento de Aula</h2>
                            {highlightClass ? (
                                <DashboardCard
                                    classData={{
                                        id: highlightClass.class_room_id,
                                        name: highlightClass.class,
                                        subject: highlightClass.subject,
                                        room: highlightClass.room || '', // Handle missing room safely
                                        time: highlightClass.time,
                                        grade: highlightClass.subject
                                    }}
                                />
                            ) : (
                                <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-xl bg-card">
                                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                                        <Clock className="w-6 h-6 opacity-50" />
                                    </div>
                                    <h3 className="text-lg font-medium">Você está livre por hoje!</h3>
                                    <p>Nenhuma aula agendada para o restante do dia.</p>
                                </div>
                            )}
                        </section>

                        {/* Recent Activity / Timeline */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                                    Cronograma do Dia
                                </h2>
                            </div>

                            <Card className="p-6">
                                {processedSchedule.length > 0 ? (
                                    <div className="relative space-y-0 pl-4 border-l-2 border-muted ml-2">
                                        {processedSchedule.map((slot) => (
                                            <div key={slot.id} className="mb-6 relative pl-6 last:mb-0 group">
                                                <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-background ${slot.status === 'done' ? 'bg-muted-foreground' :
                                                    slot.status === 'current' ? 'bg-blue-600 ring-4 ring-blue-600/20 scale-125' : 'bg-muted'
                                                    }`} />

                                                <div className={`flex flex-col p-4 rounded-lg border transition-all hover:shadow-md ${slot.status === 'current' ? 'bg-background border-blue-600 shadow-sm' :
                                                    slot.status === 'done' ? 'bg-zinc-50 border-transparent opacity-75' : 'bg-card'
                                                    }`}>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-mono font-bold text-gray-900 dark:text-gray-100">
                                                            {slot.time}
                                                        </span>
                                                        {slot.status === 'current' && <Badge className="bg-blue-600">Agora</Badge>}
                                                        {slot.status === 'done' && <Badge variant="secondary">Concluída</Badge>}
                                                    </div>

                                                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{slot.class}</h3>
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{slot.subject}</p>

                                                    <div className="mt-3 flex justify-end">
                                                        <Link
                                                            href={`/professor/classes/${slot.class_room_id}/attendance/create`}
                                                            className="text-blue-600 text-sm font-medium flex items-center hover:underline group-hover:translate-x-1 transition-transform"
                                                        >
                                                            {slot.status === 'done' ? 'Ver Chamada' : 'Gerenciar Aula'} &rarr;
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        Nenhuma aula para hoje.
                                    </div>
                                )}
                            </Card>
                        </section>
                    </div>

                    {/* Sidebar / Shortcuts (1/3 width) */}
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-lg font-semibold mb-4">Acesso Rápido</h2>
                            <div className="grid gap-3">
                                <Link href="/professor/classes" className="flex items-center p-3 bg-card border rounded-lg hover:border-blue-500 hover:shadow-sm transition-all group">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Minhas Turmas</h3>
                                        <p className="text-xs text-muted-foreground">Lançar notas e faltas</p>
                                    </div>
                                </Link>

                                <Link href="/professor/calendar" className="flex items-center p-3 bg-card border rounded-lg hover:border-purple-500 hover:shadow-sm transition-all group">
                                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Calendário</h3>
                                        <p className="text-xs text-muted-foreground">Ver eventos escolares</p>
                                    </div>
                                </Link>

                                <Link href="/professor/reports" className="flex items-center p-3 bg-card border rounded-lg hover:border-orange-500 hover:shadow-sm transition-all group">
                                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Relatórios</h3>
                                        <p className="text-xs text-muted-foreground">Desempenho dos alunos</p>
                                    </div>
                                </Link>
                            </div>
                        </section>

                        <section>
                            <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-lg overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                                <CardHeader>
                                    <CardTitle className="text-lg">Ajuda & Suporte</CardTitle>
                                    <CardDescription className="text-blue-100">Dúvidas sobre o sistema?</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="secondary" className="w-full text-blue-700 font-semibold" asChild>
                                        <Link href="/professor/manual">Acessar Manual</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
