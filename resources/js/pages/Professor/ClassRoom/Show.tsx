import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { Check, Loader2, Plus, Save, Trash2, Edit, AlertTriangle } from 'lucide-react';
import { useEffect, useState, FormEventHandler } from 'react';
import { toast } from 'sonner';

interface Student {
    id: number;
    name: string;
    user?: { id: number; name: string };
}

interface Assessment {
    id: number;
    title: string;
    description?: string;
    date: string;
    max_points: number;
    weight: number;
    is_recovery: boolean;
}

interface Period {
    id: number;
    name: string;
    status: 'open' | 'closed';
}

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
    periods: Period[];
    students: Student[];
    attendanceHistory: {
        id: number;
        date: string;
        content: string;
    }[];
}

export default function ClassRoomShow({ classRoom, subjects, selectedSubjectId, periods, students, attendanceHistory }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Painel', href: '/professor/dashboard' },
        { title: classRoom.name, href: `/professor/classes/${classRoom.id}` },
    ];

    const [activeTab, setActiveTab] = useState('grades');
    const [selectedPeriodId, setSelectedPeriodId] = useState<string>(periods.length > 0 ? String(periods[0].id) : '');
    const [currentSubjectId, setCurrentSubjectId] = useState(String(selectedSubjectId));

    // Data for the grid
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [grades, setGrades] = useState<Record<number, Record<number, number>>>({}); // student_id -> assessment_id -> score
    const [loadingGrid, setLoadingGrid] = useState(false);
    const [saving, setSaving] = useState(false);

    // Derived state
    const currentPeriod = periods.find(p => String(p.id) === selectedPeriodId);
    const isPeriodClosed = currentPeriod?.status === 'closed';

    // Fetch Grid Data
    const fetchGridData = async () => {
        if (!selectedPeriodId || !currentSubjectId) return;

        setLoadingGrid(true);
        try {
            const response = await axios.get(`/professor/classes/${classRoom.id}/grades`, {
                params: {
                    grading_period_id: selectedPeriodId,
                    subject_id: currentSubjectId
                }
            });

            setAssessments(response.data.assessments);
            setGrades(response.data.grades); // Structure: { student_id: { assessment_id: score } }
        } catch (error) {
            console.error(error);
            toast.error('Erro ao carregar notas.');
        } finally {
            setLoadingGrid(false);
        }
    };

    useEffect(() => {
        fetchGridData();
    }, [selectedPeriodId, currentSubjectId]);

    // Handle grade change locally
    const handleGradeChange = (studentId: number, assessmentId: number, value: string) => {
        if (isPeriodClosed) return; // Prevent edits if closed

        const numValue = value === '' ? null : parseFloat(value);

        setGrades(prev => ({
            ...prev,
            [studentId]: {
                ...(prev[studentId] || {}),
                [assessmentId]: numValue as number
            }
        }));
    };

    // Save Grades Batch
    const saveGrades = async () => {
        if (isPeriodClosed) {
            toast.error('Este período está fechado.');
            return;
        }

        setSaving(true);
        const payloadGrades = [];

        for (const studentId of students.map(s => s.id)) {
            const studentGrades = grades[studentId] || {};
            for (const assessment of assessments) {
                if (studentGrades[assessment.id] !== undefined) {
                    payloadGrades.push({
                        student_id: studentId,
                        assessment_id: assessment.id,
                        score: studentGrades[assessment.id]
                    });
                }
            }
        }

        try {
            await axios.post(`/professor/classes/${classRoom.id}/grades/batch`, {
                grading_period_id: selectedPeriodId,
                subject_id: currentSubjectId,
                grades: payloadGrades
            });
            toast.success('Notas salvas com sucesso!');
        } catch (error) {
            console.error(error);
            toast.error('Erro ao salvar notas.');
        } finally {
            setSaving(false);
        }
    };

    // Switch Subject Helper
    const handleSubjectChange = (val: string) => {
        setCurrentSubjectId(val);
        router.visit(`/professor/classes/${classRoom.id}?subject_id=${val}`, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => setCurrentSubjectId(val)
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Turma ${classRoom.name}`} />
            <div className="flex h-full flex-col gap-4 p-4">

                {/* Header Controls */}
                <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold">{classRoom.name} <span className="text-muted-foreground text-lg font-normal">({classRoom.grade.name})</span></h2>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Label>Disciplina:</Label>
                                <Select value={currentSubjectId} onValueChange={handleSubjectChange}>
                                    <SelectTrigger className="w-[200px] h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map(s => <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                                <Link href={`/professor/classes/${classRoom.id}/attendance/create?subject_id=${currentSubjectId}`}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Lançar Frequência
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {isPeriodClosed && (
                            <Badge variant="destructive" className="items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                <span className="hidden sm:inline">Fechado</span>
                            </Badge>
                        )}
                        <div className="flex items-center gap-2">
                            <Label>Bimestre:</Label>
                            <Select value={selectedPeriodId} onValueChange={setSelectedPeriodId}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {periods.map(p => <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                    <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto bg-transparent gap-6">
                        <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3">
                            Visão Geral
                        </TabsTrigger>
                        <TabsTrigger value="grades" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3">
                            Lançamento de Notas (Grid)
                        </TabsTrigger>
                        <TabsTrigger value="assessments" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3">
                            Gerenciar Avaliações
                        </TabsTrigger>
                        <TabsTrigger value="attendance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3">
                            Frequência
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="flex-1 mt-4 space-y-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="bg-slate-50 border-slate-200">
                                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Total Alunos</span>
                                    <span className="text-3xl font-bold text-slate-900">{students.length}</span>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-50 border-slate-200">
                                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Frequência Média</span>
                                    <span className="text-3xl font-bold text-slate-900">
                                        {Math.round(students.reduce((acc, s: any) => acc + (s.attendance_rate || 0), 0) / (students.length || 1))}%
                                    </span>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Lista de Alunos</CardTitle>
                                <CardDescription>Clique no aluno para ver detalhes individuais de notas e presença.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Frequência (Disciplina)</TableHead>
                                            <TableHead className="text-right">Ação</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {students.map((student: any) => (
                                            <TableRow key={student.id} className="group cursor-pointer hover:bg-slate-50" onClick={() => router.visit(`/professor/classes/${classRoom.id}/students/${student.id}?subject_id=${currentSubjectId}`)}>
                                                <TableCell className="font-medium">
                                                    {student.name}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full ${(student.attendance_rate || 100) >= 75 ? 'bg-green-500' :
                                                                        (student.attendance_rate || 100) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                                                    }`}
                                                                style={{ width: `${student.attendance_rate || 100}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs font-bold text-slate-600">{student.attendance_rate || 100}%</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 text-blue-600">
                                                        Ver Detalhes &rarr;
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="grades" className="flex-1 mt-4 space-y-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div className="space-y-1">
                                    <CardTitle>Diário de Classe</CardTitle>
                                    <CardDescription>Lance as notas para as avaliações deste bimestre.</CardDescription>
                                </div>
                                <Button onClick={saveGrades} disabled={saving || loadingGrid || isPeriodClosed} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                                    <Save className="h-4 w-4" />
                                    Salvar Alterações
                                </Button>
                            </CardHeader>
                            <CardContent className="overflow-auto">
                                {loadingGrid ? (
                                    <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                                ) : (
                                    <div className="relative w-full overflow-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="hover:bg-transparent">
                                                    <TableHead className="w-[300px] min-w-[200px] sticky left-0 bg-background z-20 font-bold text-primary">Aluno</TableHead>
                                                    {assessments.map(ass => (
                                                        <TableHead key={ass.id} className="text-center min-w-[100px]">
                                                            <div className="flex flex-col items-center gap-1 py-2">
                                                                <span className="font-semibold text-foreground whitespace-nowrap">{ass.title}</span>
                                                                <Badge variant={ass.is_recovery ? "destructive" : "secondary"} className="text-[10px] h-5">
                                                                    {ass.is_recovery ? 'Recuperação' : `Peso ${ass.weight}`}
                                                                </Badge>
                                                                <span className="text-[10px] text-muted-foreground">{new Date(ass.date).toLocaleDateString('pt-BR')}</span>
                                                            </div>
                                                        </TableHead>
                                                    ))}
                                                    <TableHead className="text-center w-[100px] font-bold">Média Atual</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {students.map(student => (
                                                    <TableRow key={student.id}>
                                                        <TableCell className="sticky left-0 bg-background z-10 font-medium">
                                                            {student.name}
                                                        </TableCell>
                                                        {assessments.map(ass => {
                                                            const score = grades[student.id]?.[ass.id] ?? '';
                                                            return (
                                                                <TableCell key={ass.id} className="p-1">
                                                                    <Input
                                                                        type="number"
                                                                        min="0"
                                                                        max={ass.max_points}
                                                                        step="0.1"
                                                                        className="text-center h-9 w-full min-w-[80px]"
                                                                        value={score}
                                                                        onChange={(e) => handleGradeChange(student.id, ass.id, e.target.value)}
                                                                        placeholder="-"
                                                                        disabled={isPeriodClosed}
                                                                    />
                                                                </TableCell>
                                                            );
                                                        })}
                                                        <TableCell className="text-center font-bold text-lg">
                                                            {/* Placeholder for now */}
                                                            -
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                {assessments.length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                                                            Nenhuma avaliação criada para este bimestre.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="assessments" className="flex-1 mt-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Avaliações</CardTitle>
                                    <CardDescription>Crie provas e trabalhos para compor a nota.</CardDescription>
                                </div>
                                {!isPeriodClosed && (
                                    <CreateAssessmentDialog
                                        classRoomId={classRoom.id}
                                        gradingPeriodId={selectedPeriodId}
                                        subjectId={currentSubjectId}
                                        onSuccess={fetchGridData}
                                    />
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {assessments.map(ass => (
                                        <div key={ass.id} className="flex items-center justify-between border p-4 rounded-lg">
                                            <div>
                                                <p className="font-semibold">{ass.title} {ass.is_recovery && <Badge variant="destructive">REC</Badge>}</p>
                                                <p className="text-sm text-muted-foreground">{new Date(ass.date).toLocaleDateString()} • Peso: {ass.weight} • Max: {ass.max_points}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon" disabled={isPeriodClosed}><Edit className="h-4 w-4" /></Button>
                                                <Button variant="ghost" size="icon" className="text-red-500" disabled={isPeriodClosed}><Trash2 className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                    ))}
                                    {assessments.length === 0 && <p className="text-muted-foreground text-center py-4">Nenhuma avaliação cadastrada.</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="attendance" className="flex-1 mt-4">
                        <Card>
                            <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div>
                                    <CardTitle>Histórico de Frequência</CardTitle>
                                    <CardDescription>Visualize e edite as chamadas realizadas.</CardDescription>
                                </div>
                                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Link href={`/professor/classes/${classRoom.id}/attendance/create?subject_id=${currentSubjectId}`}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Lançar Nova Chamada
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {attendanceHistory.length > 0 ? (
                                        attendanceHistory.map((diary) => (
                                            <Link
                                                key={diary.id}
                                                href={`/professor/classes/${classRoom.id}/attendance/create?subject_id=${currentSubjectId}&date=${diary.date}`}
                                                className="block group"
                                            >
                                                <div className="flex items-center justify-between p-4 border rounded-lg bg-card hover:border-blue-500 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                                                            <span className="text-xs font-bold uppercase">{new Date(diary.date).toLocaleString('default', { month: 'short' })}</span>
                                                            <span className="text-xl font-bold">{new Date(diary.date).getDate()}</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                                                                Aula de {new Date(diary.date).toLocaleDateString('pt-BR', { weekday: 'long' })}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground truncate max-w-[300px] md:max-w-md">
                                                                {diary.content || "Sem conteúdo registrado"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" size="icon" className="text-muted-foreground group-hover:text-blue-600">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-muted-foreground">
                                            <p>Nenhuma chamada registrada para esta disciplina.</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}

function CreateAssessmentDialog({ classRoomId, gradingPeriodId, subjectId, onSuccess }: { classRoomId: number, gradingPeriodId: string, subjectId: string, onSuccess: () => void }) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset, transform } = useForm({
        title: '',
        date: new Date().toISOString().split('T')[0],
        max_points: '10',
        weight: '1',
        is_recovery: false,
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            grading_period_id: gradingPeriodId,
            subject_id: subjectId,
        }));

        post(`/professor/classes/${classRoomId}/assessments`, {
            onSuccess: () => {
                setOpen(false);
                reset();
                onSuccess();
                toast.success("Avaliação criada com sucesso!");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><Plus className="mr-2 h-4 w-4" /> Nova Avaliação</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nova Avaliação</DialogTitle>
                    <DialogDescription>
                        Crie uma nova coluna no diário de classe.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Título</Label>
                        <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Ex: Prova 1" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="date">Data</Label>
                            <Input id="date" type="date" value={data.date} onChange={e => setData('date', e.target.value)} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="weight">Peso</Label>
                            <Input id="weight" type="number" step="0.1" value={data.weight} onChange={e => setData('weight', e.target.value)} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="max_points">Valor Máx.</Label>
                            <Input id="max_points" type="number" step="0.1" value={data.max_points} onChange={e => setData('max_points', e.target.value)} required />
                        </div>
                        <div className="flex items-end pb-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={data.is_recovery} onChange={e => setData('is_recovery', e.target.checked)} className="rounded border-gray-300 text-primary shadow-sm focus:ring-primary" />
                                <span className="text-sm font-medium">Recuperação?</span>
                            </label>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Descrição (Opcional)</Label>
                        <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>Criar Avaliação</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

