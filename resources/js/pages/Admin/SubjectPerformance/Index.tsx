import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, TrendingUp, TrendingDown, BookOpen } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Desempenho por Disciplina',
        href: '/admin/subject-performance',
    },
];

interface SubjectStats {
    id: number;
    name: string;
    code: string;
    total_assessments: number;
    average_score: number;
    pass_rate: number;
}

interface Props {
    subjects: SubjectStats[];
}

export default function Index({ subjects }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Desempenho por Disciplina" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Desempenho por Disciplina</h1>
                            <p className="text-muted-foreground">
                                Visão geral das médias e taxas de aprovação por matéria.
                            </p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Todas as Disciplinas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Disciplina</TableHead>
                                            <TableHead>Avaliações</TableHead>
                                            <TableHead>Média Geral</TableHead>
                                            <TableHead>Taxa de Aprovação</TableHead>
                                            <TableHead className="text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {subjects.length > 0 ? subjects.map((subject) => (
                                            <TableRow key={subject.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                        {subject.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{subject.total_assessments}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`font-bold ${subject.average_score >= 6 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {subject.average_score.toFixed(1)}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full ${subject.pass_rate >= 70 ? 'bg-green-500' : subject.pass_rate >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                                style={{ width: `${subject.pass_rate}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs text-muted-foreground">{subject.pass_rate}%</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Link
                                                        href={`/admin/subject-performance/${subject.id}`}
                                                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                                                    >
                                                        Detalhes <ExternalLink className="ml-1 h-3 w-3" />
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                    Nenhuma disciplina encontrada ou sem dados de avaliações.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
