import ActivityCard from '@/components/Activity/ActivityCard';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Calendar, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/aluno/dashboard' },
];

interface Props {
    activities: any[];
    student: {
        id: number;
        name: string;
        class_room: {
            name: string;
        };
    };
    attendancePercentage: number;

    pendingCount: number;
    notices: any[];
}

export default function Dashboard({ activities = [], student, attendancePercentage, pendingCount, notices = [] }: Props) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Bom dia';
        if (hour < 18) return 'Boa tarde';
        return 'Boa noite';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Aluno" />

            <div className="flex flex-col gap-6 p-4 max-w-7xl mx-auto w-full pb-20">

                {/* Hero Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                            {getGreeting()}, {student?.name?.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Você está matriculado no <span className="font-semibold text-indigo-600 dark:text-indigo-400">{student?.class_room?.name || 'Não enturmado'}</span>
                        </p>
                    </div>
                    <div className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                        {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </div>
                </div>

                {/* Stats Grid - "Dar uma cara" */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Frequência Card */}
                    <Link href="/aluno/attendance" className="group relative overflow-hidden rounded-2xl border bg-white dark:bg-gray-900 p-6 transition-all hover:shadow-lg hover:border-emerald-500/50">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp className="w-24 h-24 text-emerald-500" />
                        </div>
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <div>
                                <h3 className="text-muted-foreground font-medium mb-1">Frequência Global</h3>
                                <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 flex items-baseline gap-2">
                                    {attendancePercentage}%
                                    <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${attendancePercentage >= 75 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700'}`}>
                                        {attendancePercentage >= 75 ? 'Excelente' : 'Atenção'}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                Ver detalhes <TrendingUp className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    </Link>

                    {/* Atividades Card */}
                    <div className="group relative overflow-hidden rounded-2xl border bg-white dark:bg-gray-900 p-6 transition-all shadow-sm">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <CheckCircle2 className="w-24 h-24 text-indigo-500" />
                        </div>
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <div>
                                <h3 className="text-muted-foreground font-medium mb-1">Para Fazer</h3>
                                <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                                    {pendingCount}
                                </div>
                                <p className="text-sm text-muted-foreground">Atividades pendentes</p>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: pendingCount > 0 ? '60%' : '100%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shortcuts Card */}
                    <div className="grid grid-rows-2 gap-4">
                        <Link href="/aluno/grades" className="flex items-center gap-4 rounded-2xl border bg-gradient-to-br from-indigo-500 to-purple-600 p-4 text-white hover:shadow-lg transition-all hover:scale-[1.02]">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Meu Boletim</h3>
                                <p className="text-indigo-100 text-sm">Ver notas e médias</p>
                            </div>
                        </Link>
                        <Link href="/aluno/schedules" className="flex items-center gap-4 rounded-2xl border bg-white dark:bg-gray-900 p-4 hover:border-pink-500/50 hover:shadow-md transition-all">
                            <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-xl text-pink-600 dark:text-pink-400">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-gray-100">Horários</h3>
                                <p className="text-muted-foreground text-sm">Grade semanal</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Feed - Activities */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Clock className="w-5 h-5 text-indigo-500" />
                                Próximas Atividades
                            </h2>
                            {/* Filter/View option could go here */}
                        </div>

                        {activities.length > 0 ? (
                            <div className="space-y-4">
                                {activities.map((activity) => (
                                    <ActivityCard
                                        key={activity.id}
                                        activity={activity}
                                        role="student"
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-2xl bg-gray-50/50 dark:bg-gray-800/30">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-sm mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-lg font-medium">Tudo em dia!</h3>
                                <p className="text-muted-foreground max-w-sm mt-1">
                                    Não há atividades pendentes para os próximos dias. Aproveite para revisar o conteúdo.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Extra Info */}
                    <div className="space-y-6">
                        <div className="rounded-2xl border bg-white dark:bg-gray-900 p-6">
                            <h3 className="font-bold text-lg mb-4">Avisos e Lembretes</h3>

                            {notices.length > 0 ? (
                                <div className="space-y-4">
                                    {notices.map((notice: any) => (
                                        <div key={notice.id} className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30">
                                            <h4 className="font-bold text-amber-800 dark:text-amber-300 text-sm mb-1">{notice.title}</h4>
                                            <p className="text-xs text-amber-700 dark:text-amber-400">
                                                {new Date(notice.start_date).toLocaleDateString('pt-BR')} - {notice.description?.substring(0, 80)}...
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-muted-foreground text-sm">
                                    Nenhum aviso importante no momento.
                                </div>
                            )}

                            <Link href="/events" className="w-full mt-4">
                                <Button variant="outline" className="w-full text-xs font-bold">
                                    Ver calendário completo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

import { Button } from '@/components/ui/button';
