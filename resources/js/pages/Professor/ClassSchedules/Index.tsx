import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbItem } from '@/types';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

interface Schedule {
    id: number;
    start_time: string;
    end_time: string;
    class_name: string;
    grade_name: string;
    subject_name: string;
    class_room_id: number;
}

interface Props {
    schedules: Record<number, Schedule[]>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Meus Horários',
        href: '/professor/schedules',
    },
];

const DAYS = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
];

export default function ClassScheduleIndex({ schedules }: Props) {
    const workingDays = [1, 2, 3, 4, 5];
    if (schedules[0] && schedules[0].length > 0) workingDays.unshift(0);
    if (schedules[6] && schedules[6].length > 0) workingDays.push(6);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Meus Horários" />

            <div className="p-6 space-y-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Meus Horários de Aulas</h2>
                        <p className="text-muted-foreground">Visualize sua grade de horários semanal pelas turmas e disciplinas alocadas.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {workingDays.map(dayKey => {
                        const daySchedules = schedules[dayKey] || [];
                        return (
                            <Card key={dayKey} className="flex flex-col h-full bg-card/50 shadow-sm border-border/50">
                                <CardHeader className="py-4 border-b bg-card">
                                    <CardTitle className="text-center text-lg">{DAYS[dayKey]}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 flex-1 space-y-3">
                                    {daySchedules.length === 0 ? (
                                        <div className="text-center text-muted-foreground text-sm py-8 flex flex-col items-center justify-center">
                                            <CalendarIcon className="w-8 h-8 mb-2 opacity-20" />
                                            <span>Sem aulas</span>
                                        </div>
                                    ) : (
                                        daySchedules.map((schedule, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-accent/50 rounded-lg p-3 text-sm border hover:border-sidebar-ring/50 transition-colors"
                                            >
                                                <div className="font-semibold text-primary mb-1 truncate" title={schedule.subject_name}>
                                                    {schedule.subject_name}
                                                </div>
                                                <div className="flex items-center text-muted-foreground text-xs mb-1">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {schedule.start_time.slice(0, 5)} - {schedule.end_time.slice(0, 5)}
                                                </div>
                                                <div className="mt-2 text-xs font-medium">
                                                    <Link href={`/professor/classes/${schedule.class_room_id}`} className="hover:underline flex items-center justify-between">
                                                        <span>{schedule.class_name}</span>
                                                        <span className="text-[10px] bg-background/50 px-1 rounded truncate ml-2 max-w-[80px]">{schedule.grade_name}</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
