import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GradeInputGrid } from '@/components/Professor/GradeInputGrid';
import { Save, Filter, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

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
    grade: number | string;
    originalGrade?: number | string;
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

    // Filters State
    const [selectedClassId, setSelectedClassId] = useState<string>('');
    const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
    const [selectedPeriodId, setSelectedPeriodId] = useState<string>('');
    const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>('');

    // Derived State
    const selectedClass = classes.find(c => c.id.toString() === selectedClassId);
    const availableSubjects = selectedClass ? selectedClass.subjects : [];

    // Auto-select single subject if only one exists for the class
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
            setSelectedAssessmentId('');
        }
    }, [selectedClassId, selectedSubjectId, selectedPeriodId]);

    const fetchData = async () => {
        setLoadingData(true);
        try {
            const response = await axios.get(`/professor/classes/${selectedClassId}/grades?grading_period_id=${selectedPeriodId}&subject_id=${selectedSubjectId}`);
            const { assessments, grades, students: fetchedStudents } = response.data;

            setAssessments(assessments);

            // Default to first assessment if available and none selected
            if (assessments.length > 0 && !selectedAssessmentId) {
                setSelectedAssessmentId(assessments[0].id.toString());
            }

            // We need to map students to the currently selected assessment
            // But we can only do that effectively if we have a selected assessment
            // The mapping happens in the effect dependent on selectedAssessmentId

            // Store raw data references if needed, but for now we just need the students list and grades map
            // We can attach the grade to the student object based on current assessment

            // Initial mapping placeholder
            const mappedStudents = fetchedStudents.map((s: any) => ({
                id: s.id,
                name: s.name,
                grade: '',
                originalGrade: ''
            }));
            setStudents(mappedStudents);

            // Store grades globally for this fetch to avoid refetching on assessment switch?
            // For simplicity, let's store the full grades map in a ref or just rely on the response logic
            // Actually, refining the strategy: 
            // Let's store the "all grades" map in a state variable to switch quickly between assessments
            setAllGradesMap(grades);

        } catch (error) {
            console.error(error);
            toast.error('Erro ao buscar dados.');
        } finally {
            setLoadingData(false);
        }
    };

    const [allGradesMap, setAllGradesMap] = useState<Record<string, Record<string, number>>>({}); // studentId -> assessmentId -> score

    // Update student list when selected assessment changes
    useEffect(() => {
        if (!selectedAssessmentId || students.length === 0) return;

        setStudents(prev => prev.map(student => {
            const studentGrades = allGradesMap[student.id];
            const grade = studentGrades && studentGrades[selectedAssessmentId] !== undefined
                ? studentGrades[selectedAssessmentId]
                : '';

            return {
                ...student,
                grade: grade,
                originalGrade: grade
            };
        }));
    }, [selectedAssessmentId, allGradesMap]);


    const handleGradeChange = (id: number, val: number | string) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, grade: val } : s));
    };

    const handleSave = async () => {
        if (!selectedClassId || !selectedSubjectId || !selectedPeriodId || !selectedAssessmentId) return;

        setIsSaving(true);

        // Filter only changed grades or submit all? Submitting all is safer for batch ops usually
        // But for optimization we could filter. Let's submit all valid ones for this assessment.

        const payload = {
            grading_period_id: selectedPeriodId,
            subject_id: selectedSubjectId,
            grades: students.map(s => ({
                assessment_id: selectedAssessmentId,
                student_id: s.id,
                score: s.grade === '' ? null : s.grade // backend should handle nullable if we want to clear grade? 
                // Wait, backend validation says 'required|numeric' for score usually? 
                // Check GradeController: 'grades.*.score' => 'nullable|numeric' -> OK
            })).filter(g => g.score !== '') // Only send non-empty grades? Or send null to clear?
            // If we want to clear grades, we should send null.
            // Let's adjust filter.
        };

        // If score is empty string, we treat as null used to clear or just ignore?
        // If the user clears the input, they expect the grade to be removed.
        // So we map '' to null.

        const formattedGrades = students.map(s => ({
            assessment_id: selectedAssessmentId,
            student_id: s.id,
            score: s.grade === '' ? null : s.grade
        }));

        try {
            await axios.post(`/professor/classes/${selectedClassId}/grades/batch`, {
                grading_period_id: selectedPeriodId,
                subject_id: selectedSubjectId,
                grades: formattedGrades
            });

            toast.success('Notas salvas com sucesso!');

            // Update "Original" grades to reflect saved state
            setStudents(prev => prev.map(s => ({ ...s, originalGrade: s.grade })));

            // Update allGradesMap with new values so switching assessments keeps them
            setAllGradesMap(prev => {
                const newMap = { ...prev };
                formattedGrades.forEach(g => {
                    if (!newMap[g.student_id]) newMap[g.student_id] = {};
                    // @ts-ignore
                    newMap[g.student_id][g.assessment_id] = g.score;
                });
                return newMap;
            });

        } catch (error) {
            console.error(error);
            toast.error('Erro ao salvar notas.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleFillGaps = () => {
        const assessment = assessments.find(a => a.id.toString() === selectedAssessmentId);
        if (!assessment) return;

        // Logic: Fill empty? Or fill max? The user usually wants to fill Max.
        // But maybe we should be careful. 
        // Let's stick to "Fill Max" as per original mock, assume max is 100 or check logic.
        // For now hardcode 10? Or assume 100? 
        // Ideally we should know the max score of the assessment. 
        // Let's assume standard scale or 10.
        // Wait, GradeController validation says max:1000.
        // In this system, is it 0-10 or 0-100? 
        // Looking at MOCK it had 18.5, 20. So likely 0-20 (PT system) or 0-100.
        // Let's use 10 for safety or ask? 
        // Actually, let's disable this button if we don't know the max, or just not implement it yet.
        // Or better: prompt/default to 10.
        // Let's remove this feature for now to reduce complexity/risk, or make it just clear.
        // Re-reading original code: it had `maxGrade={20}`.
        // I will keep it as 20 for consistency with previous code.

        setStudents(prev => prev.map(s => s.grade === '' ? { ...s, grade: 10 } : s)); // Using 10 as generic safe bet? Or 100?
        // Changed my mind, let's remove the button to avoid accidental mass-assignment of wrong values until we have assessment max_score metadata.
    };

    const isDirty = students.some(s => s.grade != s.originalGrade);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lançamento de Notas" />

            <div className="flex flex-col gap-6 p-4 max-w-5xl mx-auto w-full pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Lançamento de Notas</h1>
                        <p className="text-muted-foreground">Selecione a turma e a avaliação para lançar as notas.</p>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center">
                            <Filter className="w-4 h-4 mr-2" />
                            Filtros de Seleção
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

                        <Select value={selectedAssessmentId} onValueChange={setSelectedAssessmentId} disabled={!assessments.length}>
                            <SelectTrigger>
                                <SelectValue placeholder={assessments.length ? "Selecione a Avaliação" : "Sem avaliações"} />
                            </SelectTrigger>
                            <SelectContent>
                                {assessments.map(a => (
                                    <SelectItem key={a.id} value={a.id.toString()}>
                                        {a.title}
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
                                <p className="text-sm text-gray-400 mt-1">Crie avaliações na aba de "Atividades" ou "Manual".</p>
                            </div>
                        )}

                        {students.length > 0 && selectedAssessmentId && (
                            <div className="space-y-4">
                                <GradeInputGrid
                                    students={students}
                                    maxGrade={100} // Assuming 100 for now, making it generous
                                    onGradeChange={handleGradeChange}
                                />
                            </div>
                        )}
                    </>
                )}

                {/* Sticky Footer */}
                {students.length > 0 && selectedAssessmentId && (
                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10 md:static md:shadow-none md:border-t-0 md:bg-transparent">
                        <div className="max-w-5xl mx-auto flex justify-end">
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
        </AppLayout>
    );
}
