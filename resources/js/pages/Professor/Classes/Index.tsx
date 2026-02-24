import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, ArrowRight, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Painel', href: '/professor/dashboard' },
    { title: 'Minhas Turmas', href: '/professor/classes' },
];

interface ClassData {
    id: number;
    name: string;
    grade: string;
    year: number;
    student_count: number;
    attendance_rate: number;
    subjects: string[];
}

export default function ClassesIndex({ classes }: { classes: ClassData[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Minhas Turmas" />
            <div className="p-8 max-w-7xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Minhas Turmas</h1>
                    <p className="text-muted-foreground">Gerencie suas disciplinas, alunos e lançamentos.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((cls) => (
                        <Card key={cls.id} className="flex flex-col hover:shadow-lg transition-shadow border-t-4 border-t-primary">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl text-foreground">{cls.name}</CardTitle>
                                        <CardDescription className="font-medium text-slate-600">{cls.grade}</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary/90 border-primary/20">
                                        {cls.year}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <GraduationCap className="h-4 w-4" />
                                    <span>{cls.subjects.join(', ')}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="bg-slate-50 p-3 rounded-lg flex flex-col items-center">
                                        <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                                            <Users className="h-4 w-4" />
                                            <span className="text-xs font-semibold uppercase">Alunos</span>
                                        </div>
                                        <span className="text-2xl font-bold text-slate-800">{cls.student_count}</span>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-lg flex flex-col items-center">
                                        <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                                            <BarChart3 className="h-4 w-4" />
                                            <span className="text-xs font-semibold uppercase">Frequência</span>
                                        </div>
                                        <span className="text-2xl font-bold text-slate-800">{cls.attendance_rate}%</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-2">
                                <Button className="w-full bg-primary hover:bg-primary/90 group" asChild>
                                    <Link href={`/professor/classes/${cls.id}`}>
                                        Gerenciar Turma
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}

                    {classes.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground bg-slate-50 rounded-xl border border-dashed">
                            <p>Você não possui turmas atribuídas neste ano letivo.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
