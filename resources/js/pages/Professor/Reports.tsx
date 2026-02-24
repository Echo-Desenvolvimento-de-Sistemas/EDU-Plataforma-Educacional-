import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, TrendingUp, Users, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Painel', href: '/professor/dashboard' },
    { title: 'Relatórios', href: '/professor/reports' },
];

interface Props {
    metrics: {
        total_students: number;
        total_classes: number;
        average_attendance: number;
        risk_count: number;
    };
    classPerformance: {
        id: number;
        name: string;
        grade: string;
        attendance_rate: number;
        student_count: number;
    }[];
    studentsAtRisk: {
        id: number;
        name: string;
        class_name: string;
        risk_type: string;
        value: string;
        class_room_id: number;
        subject_id: number;
    }[];
}

export default function Reports({ metrics, classPerformance, studentsAtRisk }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Relatórios de Desempenho" />

            <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Relatórios de Desempenho</h1>
                    <p className="text-muted-foreground">Visão geral da frequência e alunos em risco.</p>
                </div>

                {/* KPI Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-gradient-to-br from-primary to-primary/80 border-primary text-primary-foreground shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-primary-foreground">Total de Alunos</CardTitle>
                            <Users className="h-4 w-4 text-primary-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary-foreground">{metrics.total_students}</div>
                            <p className="text-xs text-primary-foreground/80">Monitorados nas suas turmas</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-purple-800">Aulas Ministradas</CardTitle>
                            <BookOpen className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-900">{metrics.total_classes}</div>
                            <p className="text-xs text-purple-600/80">Total de diários registrados</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-green-800">Frequência Global</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-900">{metrics.average_attendance}%</div>
                            <p className="text-xs text-green-600/80">Média de todas as turmas</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-red-50 to-white border-red-100">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-red-800">Alunos em Risco</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-900">{metrics.risk_count}</div>
                            <p className="text-xs text-red-600/80">Frequência menor que 75%</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    {/* Class Performance */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Desempenho por Turma</CardTitle>
                            <CardDescription>Média de frequência comparativa.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {classPerformance.map((cls) => (
                                <div key={cls.id} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="font-medium text-slate-700">{cls.name} <span className="text-xs text-muted-foreground">({cls.grade})</span></div>
                                        <span className="font-bold text-slate-900">{cls.attendance_rate}%</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${cls.attendance_rate >= 80 ? 'bg-primary/100' :
                                                cls.attendance_rate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${cls.attendance_rate}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {classPerformance.length === 0 && (
                                <p className="text-center text-muted-foreground py-8">Nenhuma turma encontrada.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Students at Risk */}
                    <Card className="h-full">
                        <CardHeader className="border-b bg-red-50/30">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                <CardTitle className="text-red-900">Alunos em Atenção</CardTitle>
                            </div>
                            <CardDescription>Estudantes com baixa frequência (&lt; 75%).</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="pl-6">Aluno</TableHead>
                                        <TableHead>Motivo</TableHead>
                                        <TableHead className="text-right pr-6">Ação</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {studentsAtRisk.map((student) => (
                                        <TableRow key={student.id + student.class_room_id}>
                                            <TableCell className="pl-6">
                                                <div className="font-medium">{student.name}</div>
                                                <div className="text-xs text-muted-foreground">{student.class_name}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">
                                                    {student.value} Freq.
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-6">
                                                <Button size="sm" variant="ghost" asChild className="h-8 w-8 p-0">
                                                    <Link href={`/professor/classes/${student.class_room_id}/students/${student.id}?subject_id=${student.subject_id}`}>
                                                        <ArrowRight className="h-4 w-4 text-slate-400 hover:text-primary" />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {studentsAtRisk.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                                Nenhum aluno em situação de risco no momento.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
