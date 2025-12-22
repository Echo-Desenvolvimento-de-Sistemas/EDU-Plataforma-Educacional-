import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react'; // Import Link here
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, User, Calendar, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface Props {
    classRoom: { id: number; name: string; grade: { name: string } };
    student: { id: number; name: string };
    subject: { id: number; name: string };
    attendanceHistory: any[];
    periods: any[];
}

export default function StudentShow({ classRoom, student, subject, attendanceHistory, periods }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Painel', href: '/professor/dashboard' },
        { title: classRoom.name, href: `/professor/classes/${classRoom.id}` },
        { title: student.name, href: '' },
    ];

    const [saving, setSaving] = useState(false);

    // Handle grade update (single update for simplicity in this detail view)
    const updateGrade = async (assessmentId: number, value: string) => {
        const numValue = value === '' ? null : parseFloat(value);
        try {
            // Reusing the batch endpoint but for single item effectively involves strict structure
            // Or better, use a specific endpoint if we had one.
            // Using existing batch endpoint requires an array.

            // NOTE: Ideally, we should have a `grades.store` or `grades.update` that takes a single grade.
            // For now, let's assume we can post to the batch endpoint with one item.
            // But wait, the batch endpoint expects `grades: [...]`.

            // Let's implement a simple direct update call if possible or just rely on 'blur'.
            // For this iteration, I'll just toast "Not implemented" for the specific cell or 
            // construct the batch payload.

            await axios.post(`/professor/classes/${classRoom.id}/grades/batch`, {
                grading_period_id: periods.find(p => p.assessments.some((a: any) => a.id === assessmentId))?.id,
                subject_id: subject.id,
                grades: [{
                    student_id: student.id,
                    assessment_id: assessmentId,
                    score: numValue
                }]
            });
            toast.success('Nota atualizada.');
        } catch (error) {
            console.error(error);
            toast.error('Erro ao atualizar nota.');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Aluno: ${student.name}`} />
            <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">

                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={`/professor/classes/${classRoom.id}`}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">{student.name}</h1>
                        <p className="text-muted-foreground">{classRoom.name} • {subject.name}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Student Stats / Info Card */}
                    <Card className="md:col-span-1 h-fit">
                        <CardHeader>
                            <CardTitle>Resumo</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                <User className="h-8 w-8 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Matrícula</p>
                                    <p className="font-bold flex items-center gap-2">#{student.id.toString().padStart(6, '0')}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-blue-50 rounded-lg text-center">
                                    <p className="text-xs font-bold text-blue-600 uppercase">Aulas</p>
                                    <p className="text-xl font-bold text-blue-900">{attendanceHistory.length}</p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg text-center">
                                    <p className="text-xs font-bold text-green-600 uppercase">Presenças</p>
                                    <p className="text-xl font-bold text-green-900">
                                        {attendanceHistory.filter(a => a.status === 'present').length}
                                    </p>
                                </div>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-lg text-center">
                                <p className="text-xs font-bold text-slate-600 uppercase">Taxa de Frequência</p>
                                <p className="text-2xl font-bold text-slate-900">
                                    {attendanceHistory.length > 0
                                        ? Math.round((attendanceHistory.filter(a => a.status === 'present').length / attendanceHistory.length) * 100)
                                        : 100}%
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabs for Grades & Attendance */}
                    <Card className="md:col-span-2">
                        <Tabs defaultValue="grades" className="w-full">
                            <div className="px-6 pt-6">
                                <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto bg-transparent gap-6">
                                    <TabsTrigger value="grades" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-2 px-1">
                                        Notas & Avaliações
                                    </TabsTrigger>
                                    <TabsTrigger value="attendance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-2 px-1">
                                        Histórico de Frequência
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="grades" className="p-6">
                                <div className="space-y-6">
                                    {periods.map((period) => (
                                        <div key={period.id} className="space-y-3">
                                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                                <GraduationCap className="h-5 w-5 text-indigo-600" />
                                                {period.name}
                                                {period.status === 'closed' && <Badge variant="secondary">Fechado</Badge>}
                                            </h3>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Avaliação</TableHead>
                                                        <TableHead className="w-[100px] text-center">Data</TableHead>
                                                        <TableHead className="w-[80px] text-center">Peso</TableHead>
                                                        <TableHead className="w-[100px] text-center">Nota</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {period.assessments && period.assessments.length > 0 ? (
                                                        period.assessments.map((ass: any) => {
                                                            // Find existing grade
                                                            const grade = ass.grades && ass.grades.length > 0 ? ass.grades[0] : null;
                                                            return (
                                                                <TableRow key={ass.id}>
                                                                    <TableCell>
                                                                        <div className="font-medium">{ass.title}</div>
                                                                        {ass.is_recovery && <Badge variant="destructive" className="text-[10px] h-4">REC</Badge>}
                                                                    </TableCell>
                                                                    <TableCell className="text-center text-muted-foreground text-xs">
                                                                        {new Date(ass.date).toLocaleDateString()}
                                                                    </TableCell>
                                                                    <TableCell className="text-center text-xs">
                                                                        {ass.weight}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Input
                                                                            type="number"
                                                                            step="0.1"
                                                                            min="0"
                                                                            max={ass.max_points}
                                                                            defaultValue={grade ? grade.score : ''}
                                                                            disabled={period.status === 'closed'}
                                                                            onBlur={(e) => updateGrade(ass.id, e.target.value)}
                                                                            className="h-8 text-center"
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })
                                                    ) : (
                                                        <TableRow>
                                                            <TableCell colSpan={4} className="text-muted-foreground text-center text-sm">
                                                                Nenhuma avaliação neste período.
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="attendance" className="p-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[120px]">Data</TableHead>
                                            <TableHead>Conteúdo</TableHead>
                                            <TableHead className="text-right w-[100px]">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {attendanceHistory.map((record) => (
                                            <TableRow key={record.id}>
                                                <TableCell className="font-medium">
                                                    {new Date(record.class_diary.date).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground text-sm truncate max-w-[200px]">
                                                    {record.class_diary.content || '-'}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Badge variant={
                                                        record.status === 'present' ? 'default' :
                                                            record.status === 'justified' ? 'secondary' : 'destructive'
                                                    }>
                                                        {record.status === 'present' ? 'Presente' :
                                                            record.status === 'justified' ? 'Justificada' : 'Falta'}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {attendanceHistory.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                                                    Nenhum registro de frequência.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
