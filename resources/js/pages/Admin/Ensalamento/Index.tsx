import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Student {
    id: number;
    name: string;
    class_room_id: number | null;
    class_room?: {
        name: string;
    };
}

interface ClassRoom {
    id: number;
    name: string;
    grade_id: number;
    academic_year_id: number;
}

interface AcademicYear {
    id: number;
    year: string;
}

interface Grade {
    id: number;
    name: string;
}

interface Props {
    students: {
        data: Student[];
        links: any[];
    };
    classRooms: ClassRoom[];
    academicYears: AcademicYear[];
    grades: Grade[];
    filters: {
        academic_year_id?: string;
        grade_id?: string;
        class_room_id?: string;
        search?: string;
    };
}

export default function EnsalamentoIndex({
    students,
    classRooms,
    academicYears,
    grades,
    filters,
}: Props) {
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [targetClassId, setTargetClassId] = useState<string>(
        filters.class_room_id || '',
    );
    const [search, setSearch] = useState(filters.search || '');

    // derived state for filters
    const [selectedYear, setSelectedYear] = useState(
        filters.academic_year_id || '',
    );
    const [selectedGrade, setSelectedGrade] = useState(filters.grade_id || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/ensalamento',
            {
                academic_year_id: selectedYear,
                grade_id: selectedGrade,
                class_room_id: targetClassId,
                search,
            },
            { preserveState: true },
        );
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            '/admin/ensalamento',
            {
                academic_year_id:
                    key === 'academic_year_id' ? value : selectedYear,
                grade_id: key === 'grade_id' ? value : selectedGrade,
                class_room_id: key === 'class_room_id' ? value : targetClassId,
                search,
            },
            { preserveState: true },
        );
    };

    const toggleStudent = (studentId: number) => {
        setSelectedStudents((prev) =>
            prev.includes(studentId)
                ? prev.filter((id) => id !== studentId)
                : [...prev, studentId],
        );
    };

    const handleAssign = () => {
        if (!targetClassId) {
            toast.error('Selecione uma turma de destino.');
            return;
        }
        if (selectedStudents.length === 0) {
            toast.error('Selecione pelo menos um aluno.');
            return;
        }

        router.post(
            '/admin/ensalamento',
            {
                class_room_id: targetClassId,
                student_ids: selectedStudents,
            },
            {
                onSuccess: () => {
                    toast.success('Alunos enturmados com sucesso!');
                    setSelectedStudents([]);
                },
            },
        );
    };

    const handleUnassign = () => {
        if (selectedStudents.length === 0) {
            toast.error('Selecione pelo menos um aluno.');
            return;
        }

        if (
            !confirm(
                'Tem certeza que deseja remover os alunos selecionados da turma?',
            )
        )
            return;

        router.delete('/admin/ensalamento', {
            data: {
                student_ids: selectedStudents,
            },
            onSuccess: () => {
                toast.success('Alunos removidos da turma com sucesso!');
                setSelectedStudents([]);
            },
        });
    };

    // Filter students: 
    // Left list: Students NOT in the target class (or all if no target class selected, but usually we want "Available")
    // Right list: Students IN the target class.

    // However, the backend returns paginated 'students' based on search.
    // Ideally, for a robust Ensalamento, we might want 2 lists fetched differently.
    // BUT given the current implementation return:
    // 'students' contains a paginated list of students based on filters.

    // Let's adapt the UI:
    // We will show the MAIN list of students (filtered by search/status)
    // And allow assigning them TO the selected Target Class.

    // If a Target Class IS selected, we should probably fetch its current students too?
    // The current backend implementation `index` returns `students` based on filters.
    // Use Case 1: Search for students -> Select -> Assign to Class X.
    // Use Case 2: Select Class X -> See its students -> Remove them.

    // The current backend implementation allows filtering by `class_room_id`.
    // So if I select a class in filters, I see its students.

    // Refined UI:
    // Single List of Students (from current filters).
    // Bulk Actions: "Assign to [Dropdown Class]" or "Remove from Class".

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/admin/dashboard' },
                { title: 'Ensalamento', href: '/admin/ensalamento' },
            ]}
        >
            <Head title="Ensalamento" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Gerenciar Enturmação</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Filters */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                <div>
                                    <Label>Ano Letivo</Label>
                                    <Select
                                        value={selectedYear}
                                        onValueChange={(val) => {
                                            setSelectedYear(val);
                                            handleFilterChange(
                                                'academic_year_id',
                                                val,
                                            );
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Ano" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                Todos
                                            </SelectItem>
                                            {academicYears.map((year) => (
                                                <SelectItem
                                                    key={year.id}
                                                    value={String(year.id)}
                                                >
                                                    {year.year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Série/Grade</Label>
                                    <Select
                                        value={selectedGrade}
                                        onValueChange={(val) => {
                                            setSelectedGrade(val);
                                            handleFilterChange('grade_id', val);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Série" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                Todas
                                            </SelectItem>
                                            {grades.map((grade) => (
                                                <SelectItem
                                                    key={grade.id}
                                                    value={String(grade.id)}
                                                >
                                                    {grade.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-2">
                                    <Label>Filtrar por Turma Atual</Label>
                                    <Select
                                        value={filters.class_room_id || 'all'}
                                        onValueChange={(val) =>
                                            handleFilterChange(
                                                'class_room_id',
                                                val === 'all' ? '' : val,
                                            )
                                        }
                                        disabled={!selectedYear && !selectedGrade}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione uma turma para ver seus alunos" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                Todas (ou sem turma)
                                            </SelectItem>
                                            {classRooms.map((room) => (
                                                <SelectItem
                                                    key={room.id}
                                                    value={String(room.id)}
                                                >
                                                    {room.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-end gap-4">
                                <div className="flex-1">
                                    <Label>Buscar Aluno</Label>
                                    <Input
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Nome do aluno..."
                                    />
                                </div>
                                <Button
                                    onClick={handleSearch}
                                    variant="secondary"
                                >
                                    Buscar
                                </Button>
                            </div>

                            <Separator />

                            {/* Actions Area */}
                            <div className="flex flex-col gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900 md:flex-row md:items-end md:justify-between">
                                <div className="w-full md:w-1/3">
                                    <Label>Turma de Destino</Label>
                                    <Select
                                        value={targetClassId}
                                        onValueChange={setTargetClassId}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a turma para enturmar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classRooms.map((room) => (
                                                <SelectItem
                                                    key={room.id}
                                                    value={String(room.id)}
                                                >
                                                    {room.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleAssign}
                                        disabled={
                                            !targetClassId ||
                                            selectedStudents.length === 0
                                        }
                                    >
                                        <Save className="mr-2 h-4 w-4" />
                                        Enturmar Selecionados
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={handleUnassign}
                                        disabled={selectedStudents.length === 0}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Remover da Turma
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            {/* Students List */}
                            <div className="rounded-md border">
                                <div className="grid grid-cols-12 gap-4 bg-gray-100 p-2 font-medium dark:bg-gray-800">
                                    <div className="col-span-1 flex justify-center">
                                        <Checkbox
                                            checked={
                                                students.data.length > 0 &&
                                                students.data.every((s) =>
                                                    selectedStudents.includes(
                                                        s.id,
                                                    ),
                                                )
                                            }
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setSelectedStudents(
                                                        students.data.map(
                                                            (s) => s.id,
                                                        ),
                                                    );
                                                } else {
                                                    setSelectedStudents([]);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-6">Nome</div>
                                    <div className="col-span-5">
                                        Turma Atual
                                    </div>
                                </div>
                                <div className="max-h-[500px] overflow-y-auto">
                                    {students.data.length === 0 ? (
                                        <div className="p-4 text-center text-gray-500">
                                            Nenhum aluno encontrado.
                                        </div>
                                    ) : (
                                        students.data.map((student) => (
                                            <div
                                                key={student.id}
                                                className="grid grid-cols-12 gap-4 border-b p-2 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900"
                                            >
                                                <div className="col-span-1 flex justify-center">
                                                    <Checkbox
                                                        checked={selectedStudents.includes(
                                                            student.id,
                                                        )}
                                                        onCheckedChange={() =>
                                                            toggleStudent(
                                                                student.id,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="col-span-6 flex items-center">
                                                    {student.name}
                                                </div>
                                                <div className="col-span-5 flex items-center">
                                                    {student.class_room ? (
                                                        <Badge variant="outline">
                                                            {
                                                                student
                                                                    .class_room
                                                                    .name
                                                            }
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-gray-400">
                                                            Sem turma
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Pagination (Simplified) */}
                            <div className="mt-4 flex justify-between">
                                <Button
                                    variant="outline"
                                    disabled={!students.links[0]?.url}
                                    onClick={() => router.get(students.links[0].url)}
                                >
                                    Anterior
                                </Button>
                                <Button
                                    variant="outline"
                                    disabled={!students.links[students.links.length - 1]?.url}
                                    onClick={() => router.get(students.links[students.links.length - 1].url)}
                                >
                                    Próximo
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
