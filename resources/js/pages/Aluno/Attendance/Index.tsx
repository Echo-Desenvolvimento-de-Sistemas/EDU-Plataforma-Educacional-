import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/aluno/dashboard' },
    { title: 'Frequência', href: '/aluno/attendance' },
];

interface SubjectStat {
    subject: string;
    total_classes: number;
    total_absences: number;
    percentage: number;
}

interface Props {
    stats: SubjectStat[];
    overall: {
        percentage: number;
        total_absences: number;
    };
}

export default function Index({ stats, overall }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Minha Frequência" />

            <div className="flex flex-col gap-6 p-4 max-w-5xl mx-auto w-full">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Minha Frequência</h1>
                    <p className="text-muted-foreground">Controle de faltas e presenças por disciplina.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Frequência Global</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{overall.percentage}%</div>
                            <Progress value={overall.percentage} className="mt-2"
                                indicatorClassName={overall.percentage < 75 ? "bg-red-600" : "bg-green-600"}
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                                Mínimo exigido: 75%
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total de Faltas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{overall.total_absences}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Aulas perdidas no ano letivo
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat, idx) => (
                        <Card key={idx} className="overflow-hidden">
                            <CardHeader className="bg-muted/50 pb-3">
                                <CardTitle className="text-base">{stat.subject}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>Frequência</span>
                                        <span className={stat.percentage < 75 ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
                                            {stat.percentage}%
                                        </span>
                                    </div>
                                    <Progress value={stat.percentage}
                                        indicatorClassName={stat.percentage < 75 ? "bg-red-600" : "bg-green-600"}
                                    />
                                </div>
                                <div className="flex justify-between text-sm border-t pt-3">
                                    <span className="text-muted-foreground">Aulas dadas:</span>
                                    <span>{stat.total_classes}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Faltas:</span>
                                    <span className="font-medium text-red-600">{stat.total_absences}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
