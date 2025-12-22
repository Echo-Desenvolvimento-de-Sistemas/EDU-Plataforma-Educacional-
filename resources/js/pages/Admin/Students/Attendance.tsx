import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Student {
    id: number;
    name: string;
    class_room?: {
        name: string;
        grade: { name: string };
        academic_year: { year: string };
    };
    photo_path?: string;
}

interface AttendanceRecord {
    date: string;
    status: 'present' | 'absent' | 'late' | 'justified';
    classes_count: number;
    content?: string;
    observations?: string;
}

interface SubjectData {
    id: number;
    name: string;
    stats: {
        total_classes: number;
        presences: number;
        absences: number;
        justified: number;
        late: number;
        percentage: number;
    };
    records: AttendanceRecord[];
}

interface Props {
    student: Student;
    subjects: SubjectData[];
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'present': return <CheckCircle className="w-4 h-4 text-green-500" />;
        case 'absent': return <XCircle className="w-4 h-4 text-red-500" />;
        case 'justified': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
        case 'late': return <Clock className="w-4 h-4 text-orange-500" />;
        default: return null;
    }
};

const getStatusLabel = (status: string) => {
    switch (status) {
        case 'present': return 'Presença';
        case 'absent': return 'Falta';
        case 'justified': return 'Justificada';
        case 'late': return 'Atraso';
        default: return status;
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'present': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        case 'absent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
        case 'justified': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
        case 'late': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export default function StudentAttendance({ student, subjects }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Alunos', href: '/admin/students' },
        { title: student.name, href: '' },
        { title: 'Frequência', href: '' },
    ];

    // Calculate Global Stats
    const globalTotal = subjects.reduce((acc, sub) => acc + sub.stats.total_classes, 0);
    const globalPresences = subjects.reduce((acc, sub) => acc + sub.stats.presences + sub.stats.justified + sub.stats.late, 0); // Effective presences
    const globalPercentage = globalTotal > 0 ? Math.round((globalPresences / globalTotal) * 100) : 100;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Frequência - ${student.name}`} />

            <div className="p-6 space-y-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Button variant="ghost" size="icon" asChild className="-ml-2">
                                <Link href="/admin/students">
                                    <ArrowLeft className="h-5 w-5" />
                                </Link>
                            </Button>
                            <h1 className="text-3xl font-bold tracking-tight">{student.name}</h1>
                        </div>
                        <p className="text-muted-foreground ml-10">
                            {student.class_room?.name} - {student.class_room?.grade.name}
                        </p>
                    </div>

                    <Card className="min-w-[200px]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Frequência Global</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{globalPercentage}%</div>
                            <Progress value={globalPercentage} className="h-2 mt-2"
                                indicatorClassName={globalPercentage < 75 ? 'bg-red-500' : 'bg-green-500'}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Content */}
                {subjects.length === 0 ? (
                    <div className="text-center p-12 text-muted-foreground">
                        Nenhum registro de frequência encontrado.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {subjects.map((subject) => (
                            <Card key={subject.id} className="overflow-hidden">
                                <div className="border-b bg-muted/40 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${subject.stats.percentage < 75 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{subject.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {subject.stats.total_classes} aulas registradas
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 w-full sm:w-auto">
                                        <div className="text-center">
                                            <div className="text-xs text-muted-foreground uppercase font-bold">Presenças</div>
                                            <div className="font-mono font-bold text-green-600">{subject.stats.presences}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs text-muted-foreground uppercase font-bold">Faltas</div>
                                            <div className="font-mono font-bold text-red-600">{subject.stats.absences}</div>
                                        </div>
                                        <div className="text-center border-l pl-6">
                                            <div className="text-2xl font-bold">{subject.stats.percentage}%</div>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-0">
                                    {/* Collapsible or always visible list? Let's use always visible but limited height or just list */}
                                    <div className="max-h-[300px] overflow-y-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-muted-foreground uppercase bg-muted/20 sticky top-0 backdrop-blur-sm">
                                                <tr>
                                                    <th className="px-6 py-3">Data</th>
                                                    <th className="px-6 py-3">Status</th>
                                                    <th className="px-6 py-3">Qtd. Aulas</th>
                                                    <th className="px-6 py-3">Conteúdo / Obs</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {subject.records.map((record, idx) => (
                                                    <tr key={idx} className="hover:bg-muted/50 transition-colors">
                                                        <td className="px-6 py-3 font-medium">
                                                            {new Date(record.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                                                                {getStatusIcon(record.status)}
                                                                {getStatusLabel(record.status)}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-3 text-center w-[100px]">
                                                            {record.classes_count}
                                                        </td>
                                                        <td className="px-6 py-3 text-muted-foreground max-w-md truncate">
                                                            {record.content || record.observations || '-'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
