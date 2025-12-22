import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import AttendanceTable, { AttendanceStatus, StudentAttendance } from '@/components/Attendance/AttendanceTable';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

interface Props {
    classRoom: {
        id: number;
        name: string;
        grade: { name: string };
    };
    subject: {
        id: number;
        name: string;
    };
    date: string;
    students: StudentAttendance[];
    diary?: {
        classes_count: number;
        content?: string;
    } | null;
}

export default function Edit({ classRoom, subject, date, students, diary }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Frequência', href: '/admin/attendance' },
        { title: 'Editar', href: '' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        class_room_id: classRoom.id,
        subject_id: subject.id,
        date: date,
        classes_count: diary?.classes_count || 2,
        content: diary?.content || '',
        students: students.map(s => ({
            id: s.id,
            status: s.status,
            observations: s.observations
        }))
    });

    const [studentList, setStudentList] = useState<StudentAttendance[]>(students);

    useEffect(() => {
        setStudentList(students);
        setData('students', students.map(s => ({ // Re-sync form data with backend data
            id: s.id,
            status: s.status,
            observations: s.observations
        })));
    }, [students]);

    const updateStudentStatus = (id: number, status: AttendanceStatus) => {
        setStudentList(prev => prev.map(s => s.id === id ? { ...s, status } : s));
        setData('students', data.students.map(s => s.id === id ? { ...s, status } : s));
    };

    const updateStudentObservation = (id: number, obs: string) => {
        setStudentList(prev => prev.map(s => s.id === id ? { ...s, observations: obs } : s));
        setData('students', data.students.map(s => s.id === id ? { ...s, observations: obs } : s));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/attendance/batch', {
            onSuccess: () => toast.success('Frequência salva com sucesso!'),
            onError: () => toast.error('Erro ao salvar frequência. Verifique os dados.')
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Frequência - ${classRoom.name}`} />

            <form onSubmit={submit} className="flex flex-col gap-6 p-4 max-w-5xl mx-auto w-full">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/attendance">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Editar Frequência</h1>
                        <p className="text-muted-foreground">{classRoom.name} - {classRoom.grade.name} • {subject.name} • {new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Dados da Aula</CardTitle>
                        <CardDescription>Edite o conteúdo e quantidade de aulas.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Quantidade de Aulas</Label>
                            <Input
                                type="number"
                                min="1"
                                max="5"
                                value={data.classes_count}
                                onChange={e => setData('classes_count', parseInt(e.target.value))}
                            />
                            {errors.classes_count && <p className="text-sm text-red-500">{errors.classes_count}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Conteúdo Ministrado</Label>
                            <Textarea
                                placeholder="Resumo do conteúdo..."
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                className="resize-none"
                                rows={1}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Lista de Presença</h2>
                        <div className="text-sm text-muted-foreground">
                            Total: {students.length} alunos
                        </div>
                    </div>

                    <AttendanceTable
                        students={studentList}
                        onStatusChange={updateStudentStatus}
                        onObservationChange={updateStudentObservation}
                    />
                </div>

                <div className="flex justify-end gap-4 pb-8">
                    <Button variant="outline" asChild>
                        <Link href="/admin/attendance">Cancelar</Link>
                    </Button>
                    <Button type="submit" disabled={processing} className="min-w-[150px]">
                        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Salvar Alterações
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
