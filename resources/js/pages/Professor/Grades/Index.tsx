import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react'; // Removed router unused
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GradeInputGrid } from '@/components/Professor/GradeInputGrid';
import { Save, Filter, Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from 'date-fns';

// Interfaces
interface Subject {
    id: number;
    name: string;
}

interface ClassRoom {
    id: number;
    name: string;
    subjects: Subject[];
}

interface GradingPeriod {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
}

interface StudentGrade {
    id: number;
    name: string;
    grades: Record<string, string>; // assessmentId -> grade
    originalGrades: Record<string, string>;
}

interface Assessment {
    id: number;
    title: string;
    weight: number;
}

interface Props {
    classes: ClassRoom[];
    gradingPeriods: GradingPeriod[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Painel', href: '/professor/dashboard' },
    { title: 'Lançamento de Notas', href: '' },
];

export default function Index({ classes, gradingPeriods }: Props) {
    // State
    const [students, setStudents] = useState<StudentGrade[]>([]);
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [loadingData, setLoadingData] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // Create Form State
    const [createForm, setCreateForm] = useState({
        title: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        max_points: '10',
        weight: '1',
        description: ''
    });
    const [isCreating, setIsCreating] = useState(false);

    // Filters State
    const [selectedClassId, setSelectedClassId] = useState<string>('');
    const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
    const [selectedPeriodId, setSelectedPeriodId] = useState<string>('');

    // Derived State
    const selectedClass = classes.find(c => c.id.toString() === selectedClassId);
    const availableSubjects = selectedClass ? selectedClass.subjects : [];

    // Auto-select single subject
    useEffect(() => {
        if (availableSubjects.length === 1) {
            setSelectedSubjectId(availableSubjects[0].id.toString());
        } else if (availableSubjects.length > 1 && !availableSubjects.find(s => s.id.toString() === selectedSubjectId)) {
            setSelectedSubjectId('');
        }
    }, [selectedClassId]);

    // Data Fetching
    useEffect(() => {
        if (selectedClassId && selectedSubjectId && selectedPeriodId) {
            fetchData();
        } else {
            setStudents([]);
            setAssessments([]);
        }
    }, [selectedClassId, selectedSubjectId, selectedPeriodId]);

    const fetchData = async () => {
        setLoadingData(true);
        try {
            const response = await axios.get(`/professor/classes/${selectedClassId}/grades?grading_period_id=${selectedPeriodId}&subject_id=${selectedSubjectId}`);

            // Expected response: 
            // assessment: Assessment[]
            // grades: { studentId: { assessmentId: score } }
            // students: { id, name }[]

            const { assessments: fetchedAssessments, grades: fetchedGrades, students: fetchedStudentList } = response.data;

            setAssessments(fetchedAssessments);

            const mappedStudents = fetchedStudentList.map((s: any) => {
                const sGrades = fetchedGrades[s.id] || {};

                // Parse grades to strings
                const gradeStrings: Record<string, string> = {};
                if (fetchedAssessments) {
                    fetchedAssessments.forEach((a: Assessment) => {
                        const val = sGrades[a.id];
                        gradeStrings[a.id] = val !== null && val !== undefined ? String(val) : '';
                    });
                }

                return {
                    id: s.id,
                    name: s.name,
                    grades: gradeStrings,
                    originalGrades: { ...gradeStrings }
                };
            });

            setStudents(mappedStudents);

        } catch (error) {
            console.error(error);
            toast.error('Erro ao buscar dados.');
        } finally {
            setLoadingData(false);
        }
    };

    const handleGradeChange = (studentId: number, assessmentId: string, val: string) => {
        setStudents(prev => prev.map(s => {
            if (s.id === studentId) {
                return {
                    ...s,
                    grades: {
                        ...s.grades,
                        [assessmentId]: val
                    }
                };
            }
            return s;
        }));
    };

    const handleSave = async () => {
        if (!selectedClassId || !selectedSubjectId || !selectedPeriodId) return;

        setIsSaving(true);

        // Prepare payload: flatten the grades
        // Only include changed grades? Or all valid grades?
        // To be safe and ensure sync, we can send all non-empty grades.
        // But optimization: filter only changed.

        const gradesPayload: any[] = [];

        students.forEach(student => {
            assessments.forEach(assessment => {
                const current = student.grades[assessment.id];
                const original = student.originalGrades[assessment.id];

                // If it changed, or if we want to ensure it's saved (e.g. if it was empty and now is not, or became empty)
                if (current !== original) {
                    gradesPayload.push({
                        assessment_id: assessment.id,
                        student_id: student.id,
                        score: current === '' ? null : current
                    });
                }
            });
        });

        if (gradesPayload.length === 0) {
            toast.info('Nenhuma alteração para salvar.');
            setIsSaving(false);
            return;
        }

        try {
            await axios.post(`/professor/classes/${selectedClassId}/grades/batch`, {
                grading_period_id: selectedPeriodId,
                subject_id: selectedSubjectId,
                grades: gradesPayload
            });

            toast.success('Notas salvas com sucesso!');

            // Update "Original" grades to reflect saved state
            setStudents(prev => prev.map(s => ({
                ...s,
                originalGrades: { ...s.grades }
            })));

        } catch (error) {
            console.error(error);
            toast.error('Erro ao salvar notas.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteAssessment = async (assessmentId: number) => {
        if (!confirm('Tem certeza que deseja excluir esta avaliação? Todas as notas associadas serão perdidas.')) {
            return;
        }

        try {
            await axios.delete(`/professor/classes/${selectedClassId}/assessments/${assessmentId}`);
            toast.success('Avaliação excluída com sucesso.');

            // Refresh data
            fetchData();
        } catch (error) {
            console.error(error);
            toast.error('Erro ao excluir avaliação.');
        }
    };

    const isDirty = students.some(s => {
        return Object.keys(s.grades).some(key => s.grades[key] !== s.originalGrades[key]);
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lançamento de Notas" />

            <div className="flex flex-col gap-6 p-4 max-w-[95%] mx-auto w-full pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Lançamento de Notas</h1>
                        <p className="text-muted-foreground">Selecione a turma para visualizar as avaliações.</p>
                    </div>
                    {selectedClassId && selectedSubjectId && (
                        <Button onClick={() => setIsCreateOpen(true)} variant="secondary">
                            <Plus className="w-4 h-4 mr-2" />
                            Nova Avaliação
                        </Button>
                    )}
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center">
                            <Filter className="w-4 h-4 mr-2" />
                            Filtros de Seleção
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-3">
                        <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione a Turma" />
                            </SelectTrigger>
                            <SelectContent>
                                {classes.map(c => (
                                    <SelectItem key={c.id} value={c.id.toString()}>
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId} disabled={!selectedClassId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Disciplina" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableSubjects.map(s => (
                                    <SelectItem key={s.id} value={s.id.toString()}>
                                        {s.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedPeriodId} onValueChange={setSelectedPeriodId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Período / Bimestre" />
                            </SelectTrigger>
                            <SelectContent>
                                {gradingPeriods.map(p => (
                                    <SelectItem key={p.id} value={p.id.toString()}>
                                        {p.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {/* Content */}
                {loadingData ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                    </div>
                ) : (
                    <>
                        {selectedClassId && selectedPeriodId && assessments.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                                <p className="text-gray-500">Nenhuma avaliação encontrada para este período.</p>
                                <p className="text-sm text-gray-400 mt-1">Clique em "Nova Avaliação" para começar.</p>
                            </div>
                        )}

                        {students.length > 0 && assessments.length > 0 && (
                            <div className="space-y-4">
                                <GradeInputGrid
                                    students={students}
                                    assessments={assessments}
                                    onGradeChange={handleGradeChange}
                                    onDeleteAssessment={handleDeleteAssessment}
                                />
                            </div>
                        )}
                    </>
                )}

                {/* Sticky Footer */}
                {students.length > 0 && assessments.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10 md:static md:shadow-none md:border-t-0 md:bg-transparent">
                        <div className="max-w-[95%] mx-auto flex justify-end">
                            <Button
                                className="w-full md:w-auto font-bold text-lg h-12 shadow-lg"
                                size="lg"
                                onClick={handleSave}
                                disabled={isSaving || !isDirty}
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-5 w-5" />
                                        Salvar Notas
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </div>


            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nova Avaliação</DialogTitle>
                        <DialogDescription>
                            Crie uma nova avaliação para lançar notas nesta turma.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Título</Label>
                            <Input
                                id="title"
                                placeholder="Ex: Prova Mensal, Trabalho em Grupo"
                                value={createForm.title}
                                onChange={e => setCreateForm({ ...createForm, title: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="date">Data</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={createForm.date}
                                    onChange={e => setCreateForm({ ...createForm, date: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="max_points">Valor (Pontos)</Label>
                                <Input
                                    id="max_points"
                                    type="number"
                                    value={createForm.max_points}
                                    onChange={e => setCreateForm({ ...createForm, max_points: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="weight">Peso</Label>
                                <Input
                                    id="weight"
                                    type="number"
                                    step="0.1"
                                    value={createForm.weight}
                                    onChange={e => setCreateForm({ ...createForm, weight: e.target.value })}
                                />
                                <p className="text-[0.8rem] text-muted-foreground">
                                    O peso define a importância da nota na média final. Ex: Peso 2 vale o dobro de uma prova com Peso 1.
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                                id="description"
                                placeholder="Detalhes da avaliação..."
                                value={createForm.description}
                                onChange={e => setCreateForm({ ...createForm, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancelar</Button>
                        <Button onClick={async () => {
                            if (!createForm.title || !createForm.date || !createForm.max_points) {
                                toast.error('Preencha os campos obrigatórios');
                                return;
                            }
                            setIsCreating(true);
                            try {
                                const response = await axios.post(`/professor/classes/${selectedClassId}/assessments`, {
                                    ...createForm,
                                    grading_period_id: selectedPeriodId || gradingPeriods[0]?.id,
                                    subject_id: selectedSubjectId,
                                    is_recovery: false
                                }, {
                                    headers: { 'Accept': 'application/json' }
                                });

                                toast.success(response.data.message || 'Avaliação criada!');
                                setIsCreateOpen(false);

                                // Reset form
                                setCreateForm({
                                    title: '',
                                    date: format(new Date(), 'yyyy-MM-dd'),
                                    max_points: '10',
                                    weight: '1',
                                    description: ''
                                });

                                // Refresh Data to show new column
                                if (selectedClassId && selectedSubjectId && selectedPeriodId) {
                                    fetchData();
                                }

                            } catch (error) {
                                console.error(error);
                                toast.error('Erro ao criar avaliação.');
                            } finally {
                                setIsCreating(false);
                            }
                        }} disabled={isCreating}>
                            {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Criar Avaliação'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout >
    );
}
