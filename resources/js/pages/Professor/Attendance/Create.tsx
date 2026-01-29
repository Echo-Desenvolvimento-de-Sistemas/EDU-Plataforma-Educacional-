import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { ArrowLeft, BookOpen, Loader2, Save } from 'lucide-react';
import AttendanceTable, { AttendanceStatus, StudentAttendance } from '@/components/Attendance/AttendanceTable';
import { AttendanceList } from '@/components/Professor/AttendanceList';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

interface Subject {
    id: number;
    name: string;
}

interface Props {
    classRoom: {
        id: number;
        name: string;
        grade: { name: string };
    };
    subjects: Subject[];
    selectedSubjectId: number;
    selectedDate: string;
    students: StudentAttendance[];
    existingContent?: string;
    dailyPlan?: {
        topic: string;
        methodology: string;
    } | null;
}

export default function Create({ classRoom, subjects, selectedSubjectId, selectedDate, students, existingContent }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Painel', href: '/professor/dashboard' },
        { title: classRoom.name, href: `/professor/classes/${classRoom.id}` },
        { title: 'Lançar Frequência', href: '' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        subject_id: selectedSubjectId.toString(),
        date: selectedDate, // Initial from prop
        classes_count: 2,
        content: existingContent || '',
        students: students.map(s => ({
            id: s.id,
            status: s.status, // Should default to present from backend mapping
            observations: s.observations
        }))
    });

    // Local state for table UI interactions
    const [studentList, setStudentList] = useState<StudentAttendance[]>(students);

    // Sync student list when props change (e.g. date change reloads page)
    useEffect(() => {
        setStudentList(students);
        setData('students', students.map(s => ({
            id: s.id,
            status: s.status,
            observations: s.observations
        })));
    }, [students]);

    const handleDateChange = (newDate: string) => {
        setData('date', newDate);
        // Reload page to fetch justifications for new date
        router.visit(window.location.pathname, {
            data: {
                subject_id: data.subject_id,
                date: newDate
            },
            only: ['students', 'selectedDate', 'existingContent'], // Only reload these props
            preserveState: true, // Keep other form state like subject/content
            preserveScroll: true,
            replace: true,
        });
    };

    const handleSubjectChange = (subjectId: string) => {
        setData('subject_id', subjectId);
        // Reload page to maybe change context if needed (less critical than date for justifications)
        router.visit(window.location.pathname, {
            data: {
                subject_id: subjectId,
                date: data.date
            },
            replace: true,
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Update form data when local state changes
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
        post(`/professor/classes/${classRoom.id}/attendance`, {
            onSuccess: () => toast.success('Frequência salva com sucesso!'),
            onError: () => toast.error('Erro ao salvar frequência. Verifique os dados.')
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Frequência - ${classRoom.name}`} />

            <div className="flex flex-col h-full bg-background relative pb-20"> {/* pb-20 for sticky footer space */}
                {/* Header Controls */}
                <div className="p-4 space-y-4 border-b bg-card">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" asChild className="shrink-0">
                                <Link href={`/professor/classes/${classRoom.id}`}>
                                    <ArrowLeft className="h-4 w-4" />
                                </Link>
                            </Button>
                            <div>
                                <h1 className="text-xl font-bold tracking-tight">{classRoom.name}</h1>
                                <p className="text-sm text-muted-foreground">{classRoom.grade.name}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
                            <div className="space-y-1">
                                <Label htmlFor="date" className="text-xs font-semibold">Data</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => handleDateChange(e.target.value)}
                                    className="bg-background h-9"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="subject" className="text-xs font-semibold">Disciplina</Label>
                                <Select
                                    value={data.subject_id}
                                    onValueChange={handleSubjectChange}
                                >
                                    <SelectTrigger id="subject" className="bg-background h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem key={subject.id} value={subject.id.toString()}>
                                                {subject.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-4 md:p-6">
                    {/* Desktop View: Traditional Table */}
                    <div className="hidden md:block bg-card rounded-xl border shadow-sm p-4">
                        <AttendanceTable
                            students={studentList}
                            onStatusChange={updateStudentStatus}
                            onObservationChange={updateStudentObservation}
                        />
                    </div>

                    {/* Mobile View: Card List */}
                    <div className="block md:hidden">
                        <AttendanceList
                            students={studentList}
                            onStatusChange={updateStudentStatus}
                        />
                    </div>

                    {/* Content Input (Optional but good to match desktop) */}
                    <div className="mt-6 md:mt-8 bg-card rounded-xl border shadow-sm p-4">
                        <div className="flex items-center justify-between mb-2">
                            <Label htmlFor="content">Conteúdo Ministrado</Label>
                            {/* @ts-ignore */}
                            {props.dailyPlan && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setData('content', `Tema: ${props.dailyPlan.topic}\nMetodologia: ${props.dailyPlan.methodology || ''}`)}
                                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                >
                                    <BookOpen className="mr-2 h-3 w-3" />
                                    Importar do Planejamento
                                </Button>
                            )}
                        </div>
                        <Textarea
                            id="content"
                            placeholder="Descreva o que foi ensinado hoje..."
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>

                {/* Fixed Footer for Mobile Actions */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10 md:static md:shadow-none md:border-t-0 md:bg-transparent">
                    <div className="max-w-4xl mx-auto flex items-center gap-4">
                        <Button
                            variant="outline"
                            className="hidden md:flex"
                            asChild
                        >
                            <Link href={`/professor/classes/${classRoom.id}`}>
                                Cancelar
                            </Link>
                        </Button>

                        <Button
                            className="w-full h-12 text-lg font-bold shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
                            size="lg"
                            onClick={submit}
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-5 w-5" />
                                    Confirmar Chamada
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
