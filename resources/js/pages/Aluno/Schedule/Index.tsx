import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Clock, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/aluno/dashboard' },
    { title: 'Horário das Aulas', href: '/aluno/schedules' },
];

interface ClassSession {
    id: number;
    subject: string;
    start_time: string;
    end_time: string;
    professor: string;
}

interface DaySchedule {
    day_name: string;
    classes: ClassSession[];
}

interface Props {
    schedule: DaySchedule[];
}

export default function Index({ schedule }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Horário das Aulas" />

            <div className="flex flex-col gap-6 p-4 max-w-6xl mx-auto w-full">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Horário das Aulas</h1>
                    <p className="text-muted-foreground">Sua grade semanal de aulas.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {schedule.map((day, idx) => (
                        <Card key={idx} className="h-full border-t-4 border-t-indigo-500">
                            <CardHeader className="bg-muted/20 pb-2">
                                <CardTitle className="text-center text-lg">{day.day_name}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4">
                                {day.classes.length > 0 ? (
                                    day.classes.map((cls) => (
                                        <div key={cls.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg border shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                                            <div className="pl-2">
                                                <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">{cls.subject}</h4>
                                                <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {cls.start_time} - {cls.end_time}
                                                </div>
                                                <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
                                                    <User className="w-3 h-3" />
                                                    {cls.professor}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground italic text-sm">
                                        Sem aulas registradas
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
