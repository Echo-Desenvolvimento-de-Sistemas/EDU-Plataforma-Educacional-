import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ClassPerformance {
    class_name: string;
    average_score: number;
    total_assessments: number;
}

interface Props {
    subject: {
        id: number;
        name: string;
        code: string;
    };
    classPerformance: ClassPerformance[];
}

export default function Show({ subject, classPerformance }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Desempenho por Disciplina',
            href: '/admin/subject-performance',
        },
        {
            title: subject.name,
            href: `/admin/subject-performance/${subject.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Desempenho: ${subject.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{subject.name}</h1>
                        <p className="text-muted-foreground">
                            Análise detalhada de desempenho por turma.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* CSS-based Bar Chart */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Média por Turma</CardTitle>
                                <CardDescription>Comparativo de notas médias entre as turmas</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {classPerformance.map((item, index) => (
                                        <div key={index} className="space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-medium">{item.class_name}</span>
                                                <span className={`font-bold ${item.average_score >= 6 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {item.average_score}
                                                </span>
                                            </div>
                                            <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${item.average_score >= 6 ? 'bg-blue-600' : 'bg-red-500'} transition-all`}
                                                    style={{ width: `${(Math.min(item.average_score, 10) / 10) * 100}%` }}
                                                />
                                            </div>
                                            <div className="text-xs text-muted-foreground text-right">
                                                {item.total_assessments} avaliações
                                            </div>
                                        </div>
                                    ))}
                                    {classPerformance.length === 0 && (
                                        <p className="text-sm text-muted-foreground text-center py-4">
                                            Nenhuma turma com avaliações registrada para esta disciplina.
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
