import secretaria from '@/routes/secretaria';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Secretaria',
        href: '/secretaria/dashboard',
    },
    {
        title: 'Gerenciar Usuários',
        href: '/secretaria/users',
    },
    {
        title: 'Novo Usuário',
        href: '/secretaria/users/create',
    },
];

interface ClassRoom {
    id: number;
    name: string;
    grade_id: number;
    academic_year_id: number;
}

interface Subject {
    id: number;
    name: string;
}

interface AcademicYear {
    id: number;
    year: string;
}

interface EducationLevel {
    id: number;
    name: string;
}

interface Grade {
    id: number;
    name: string;
    education_level_id: number;
}

interface Props {
    classRooms: ClassRoom[];
    subjects: Subject[];
    academicYears: AcademicYear[];
    educationLevels: EducationLevel[];
    grades: Grade[];
}

export default function Create({ classRooms, subjects, academicYears, educationLevels, grades }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        cpf: '',
        username: '',
        active: true,
        password: '',
        password_confirmation: '',
        role: '',
        allocations: [] as { class_room_id: string; subjects: string[] }[],
    });

    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedLevel, setSelectedLevel] = useState<string>('');
    const [selectedGrade, setSelectedGrade] = useState<string>('');
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

    const filteredGrades = useMemo(() => {
        return grades.filter(g => !selectedLevel || String(g.education_level_id) === selectedLevel);
    }, [grades, selectedLevel]);

    const filteredClasses = useMemo(() => {
        return classRooms.filter(c => {
            const matchesYear = !selectedYear || String(c.academic_year_id) === selectedYear;
            const matchesGrade = !selectedGrade || String(c.grade_id) === selectedGrade;
            return matchesYear && matchesGrade;
        });
    }, [classRooms, selectedYear, selectedGrade]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(secretaria.users.store.url(), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const addAllocation = () => {
        if (!selectedClass || selectedSubjects.length === 0) return;

        setData('allocations', [
            ...data.allocations,
            { class_room_id: selectedClass, subjects: selectedSubjects }
        ]);

        setSelectedSubjects([]);
        setSelectedClass('');
    };

    const removeAllocation = (index: number) => {
        const newAllocations = [...data.allocations];
        newAllocations.splice(index, 1);
        setData('allocations', newAllocations);
    };

    const getClassDetails = (id: string) => {
        const room = classRooms.find(c => String(c.id) === id);
        if (!room) return { name: 'Desconhecida', year: '-', grade: '-' };
        const year = academicYears.find(y => y.id === room.academic_year_id)?.year;
        const grade = grades.find(g => g.id === room.grade_id)?.name;
        return { name: room.name, year, grade };
    };

    const getSubjectNames = (ids: string[]) => {
        return subjects.filter(s => ids.includes(String(s.id))).map(s => s.name).join(', ');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Usuário" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-4xl rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar-accent/10">
                    <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">Criar Novo Usuário</h2>

                    <form onSubmit={submit}>
                        <Tabs defaultValue="general" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="general">Dados Gerais</TabsTrigger>
                                <TabsTrigger value="allocations" disabled={data.role !== 'professor'}>Turmas e Disciplinas</TabsTrigger>
                            </TabsList>

                            <TabsContent value="general" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <Label htmlFor="role">Função</Label>
                                        <Select onValueChange={(value) => setData('role', value)} value={data.role}>
                                            <SelectTrigger className="w-full mt-1">
                                                <SelectValue placeholder="Selecione uma função" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="secretaria">Secretaria</SelectItem>
                                                <SelectItem value="professor">Professor</SelectItem>
                                                <SelectItem value="aluno">Aluno</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError className="mt-2" message={errors.role} />
                                    </div>

                                    <div>
                                        <Label htmlFor="name">Nome Completo</Label>
                                        <Input
                                            id="name"
                                            className="mt-1 block w-full"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            autoFocus
                                            autoComplete="name"
                                        />
                                        <InputError className="mt-2" message={errors.name} />
                                    </div>

                                    <div>
                                        <Label htmlFor="cpf">CPF</Label>
                                        <Input
                                            id="cpf"
                                            className="mt-1 block w-full"
                                            value={data.cpf}
                                            onChange={(e) => setData('cpf', e.target.value)}
                                            placeholder="000.000.000-00"
                                        />
                                        <InputError className="mt-2" message={errors.cpf} />
                                    </div>

                                    <div>
                                        <Label htmlFor="username">Preferencia de Login (Usuário)</Label>
                                        <Input
                                            id="username"
                                            className="mt-1 block w-full"
                                            value={data.username}
                                            onChange={(e) => setData('username', e.target.value)}
                                            autoComplete="username"
                                        />
                                        <InputError className="mt-2" message={errors.username} />
                                    </div>

                                    <div>
                                        <Label htmlFor="email">E-mail</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            className="mt-1 block w-full"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            autoComplete="email"
                                        />
                                        <InputError className="mt-2" message={errors.email} />
                                    </div>

                                    <div className="flex items-center gap-2 pt-8">
                                        <Switch
                                            id="active"
                                            checked={data.active}
                                            onCheckedChange={(checked) => setData('active', checked)}
                                        />
                                        <Label htmlFor="active">Ativar acesso</Label>
                                    </div>
                                </div>

                                <div className="border-t pt-4 mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="password">Senha</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                className="mt-1 block w-full"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                                autoComplete="new-password"
                                            />
                                            <InputError className="mt-2" message={errors.password} />
                                        </div>

                                        <div>
                                            <Label htmlFor="password_confirmation">Confirmar Senha</Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                className="mt-1 block w-full"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                required
                                                autoComplete="new-password"
                                            />
                                            <InputError className="mt-2" message={errors.password_confirmation} />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="allocations" className="space-y-6">
                                <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-4">
                                    <h3 className="font-semibold text-sm uppercase text-muted-foreground mb-2">Vincular turmas e disciplinas</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label>Ano Letivo</Label>
                                            <Select value={selectedYear} onValueChange={setSelectedYear}>
                                                <SelectTrigger className="mt-1"><SelectValue placeholder="Selecione" /></SelectTrigger>
                                                <SelectContent>{academicYears.map(y => <SelectItem key={y.id} value={String(y.id)}>{y.year}</SelectItem>)}</SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label>Segmento</Label>
                                            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                                                <SelectTrigger className="mt-1"><SelectValue placeholder="Selecione" /></SelectTrigger>
                                                <SelectContent>{educationLevels.map(l => <SelectItem key={l.id} value={String(l.id)}>{l.name}</SelectItem>)}</SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <Label>Série(s)</Label>
                                            <Select value={selectedGrade} onValueChange={setSelectedGrade} disabled={!selectedLevel}>
                                                <SelectTrigger className="mt-1"><SelectValue placeholder="Selecione" /></SelectTrigger>
                                                <SelectContent>{filteredGrades.map(g => <SelectItem key={g.id} value={String(g.id)}>{g.name}</SelectItem>)}</SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label>Turma(s)</Label>
                                            <Select value={selectedClass} onValueChange={setSelectedClass} disabled={!selectedGrade}>
                                                <SelectTrigger className="mt-1"><SelectValue placeholder="Selecione" /></SelectTrigger>
                                                <SelectContent>{filteredClasses.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}</SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label>Disciplina(s)</Label>
                                            <Select onValueChange={(val) => {
                                                if (!selectedSubjects.includes(val)) setSelectedSubjects([...selectedSubjects, val]);
                                            }}>
                                                <SelectTrigger className="mt-1"><SelectValue placeholder="Selecione (Múltiplos)" /></SelectTrigger>
                                                <SelectContent>{subjects.map(s => <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>)}</SelectContent>
                                            </Select>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {selectedSubjects.map(id => {
                                                    const sub = subjects.find(s => String(s.id) === id);
                                                    return sub ? <Badge key={id} variant="secondary" onClick={() => setSelectedSubjects(selectedSubjects.filter(i => i !== id))} className="cursor-pointer">{sub.name} ×</Badge> : null;
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button type="button" variant="outline" onClick={addAllocation} disabled={!selectedClass || selectedSubjects.length === 0}>
                                            Vincular
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold text-sm uppercase text-muted-foreground">Turmas do Professor</h3>
                                    <div className="border rounded-md overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-800">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ano</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Turma</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Série</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disciplinas</th>
                                                    <th className="px-4 py-3 text-right"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                                {data.allocations.map((alloc, idx) => {
                                                    const details = getClassDetails(alloc.class_room_id);
                                                    return (
                                                        <tr key={idx}>
                                                            <td className="px-4 py-3 text-sm">{details.year}</td>
                                                            <td className="px-4 py-3 text-sm">{details.name}</td>
                                                            <td className="px-4 py-3 text-sm">{details.grade}</td>
                                                            <td className="px-4 py-3 text-sm">{getSubjectNames(alloc.subjects)}</td>
                                                            <td className="px-4 py-3 text-right">
                                                                <Button type="button" variant="ghost" size="icon" className="text-red-500 h-6 w-6" onClick={() => removeAllocation(idx)}>
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                                {data.allocations.length === 0 && (
                                                    <tr>
                                                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">Nenhuma turma vinculada.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="flex items-center justify-end mt-6">
                            <Button className="ml-4" disabled={processing}>
                                Criar Usuário
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
