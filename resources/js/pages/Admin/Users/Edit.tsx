import admin from '@/routes/admin/index';
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
import { Trash2, User, Lock, BookOpen, ShieldCheck, CheckCircle2, XCircle, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard Admin', href: '/admin/dashboard' },
    { title: 'Gerenciar Usuários', href: '/admin/users' },
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

interface Allocation {
    class_room_id: string;
    subjects: string[];
    class_room_name?: string;
    class_year?: string;
    class_grade?: string;
    subject_names?: string[];
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    cpf?: string;
    username?: string;
    active: number;
    allocations?: { id: number; class_room_id: number; subject_id: number }[];
}

interface Props {
    user: User;
    classRooms: ClassRoom[];
    subjects: Subject[];
    academicYears: AcademicYear[];
    educationLevels: EducationLevel[];
    grades: Grade[];
}

const roleLabels: Record<string, { label: string; color: string }> = {
    admin: { label: 'Admin', color: 'bg-violet-500/15 text-violet-400 border-violet-500/30' },
    secretaria: { label: 'Secretaria', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    professor: { label: 'Professor', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    aluno: { label: 'Aluno', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
};

export default function Edit({ user, classRooms, subjects, academicYears, educationLevels, grades }: Props) {
    const initialAllocations = useMemo(() => {
        if (!user.allocations) return [];
        const grouped = new Map<string, string[]>();
        user.allocations.forEach(alloc => {
            const roomId = String(alloc.class_room_id);
            const subId = String(alloc.subject_id);
            if (!grouped.has(roomId)) grouped.set(roomId, []);
            grouped.get(roomId)?.push(subId);
        });
        return Array.from(grouped.entries()).map(([class_room_id, subjectIds]) => ({
            class_room_id,
            subjects: subjectIds,
        }));
    }, [user.allocations]);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        cpf: user.cpf || '',
        username: user.username || '',
        active: Boolean(user.active),
        role: user.role,
        password: '',
        password_confirmation: '',
        allocations: initialAllocations as { class_room_id: string; subjects: string[] }[],
    });

    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedLevel, setSelectedLevel] = useState<string>('');
    const [selectedGrade, setSelectedGrade] = useState<string>('');
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

    const filteredGrades = useMemo(
        () => grades.filter(g => !selectedLevel || String(g.education_level_id) === selectedLevel),
        [grades, selectedLevel],
    );

    const filteredClasses = useMemo(
        () =>
            classRooms.filter(c => {
                const matchesYear = !selectedYear || String(c.academic_year_id) === selectedYear;
                const matchesGrade = !selectedGrade || String(c.grade_id) === selectedGrade;
                return matchesYear && matchesGrade;
            }),
        [classRooms, selectedYear, selectedGrade],
    );

    const submit: FormEventHandler = e => {
        e.preventDefault();
        put(admin.users.update.url(user.id), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const addAllocation = () => {
        if (!selectedClass || selectedSubjects.length === 0) return;
        const existingIndex = data.allocations.findIndex(a => a.class_room_id === selectedClass);
        if (existingIndex >= 0) {
            const newAllocations = [...data.allocations];
            const currentSubjects = new Set(newAllocations[existingIndex].subjects);
            selectedSubjects.forEach(s => currentSubjects.add(s));
            newAllocations[existingIndex].subjects = Array.from(currentSubjects);
            setData('allocations', newAllocations);
        } else {
            setData('allocations', [...data.allocations, { class_room_id: selectedClass, subjects: selectedSubjects }]);
        }
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

    const getSubjectNames = (ids: string[]) =>
        subjects.filter(s => ids.includes(String(s.id))).map(s => s.name);

    const currentRole = roleLabels[data.role] ?? { label: data.role, color: 'bg-gray-500/15 text-gray-400 border-gray-500/30' };

    return (
        <AppLayout breadcrumbs={[...breadcrumbs, { title: 'Editar Usuário', href: `/admin/users/${user.id}/edit` }]}>
            <Head title="Editar Usuário" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-y-auto p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                            <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-foreground">Editar Usuário</h1>
                            <p className="text-sm text-muted-foreground">ID #{user.id} · {user.email}</p>
                        </div>
                    </div>
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${currentRole.color}`}>
                        {currentRole.label}
                    </span>
                </div>

                <form onSubmit={submit}>
                    <Tabs defaultValue="general" className="w-full">
                        {/* Tabs Navigation */}
                        <TabsList className="mb-6 grid w-full max-w-xs grid-cols-2 rounded-xl bg-muted/50 p-1">
                            <TabsTrigger value="general" className="flex items-center gap-2 rounded-lg text-sm">
                                <User className="h-3.5 w-3.5" />
                                Dados Gerais
                            </TabsTrigger>
                            <TabsTrigger
                                value="allocations"
                                disabled={data.role !== 'professor'}
                                className="flex items-center gap-2 rounded-lg text-sm"
                            >
                                <BookOpen className="h-3.5 w-3.5" />
                                Turmas
                            </TabsTrigger>
                        </TabsList>

                        {/* ─── Tab: Dados Gerais ─── */}
                        <TabsContent value="general" className="space-y-6">

                            {/* Card: Informações da Conta */}
                            <div className="rounded-xl border border-border bg-card shadow-sm">
                                <div className="flex items-center gap-3 border-b border-border px-6 py-4">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    <h2 className="font-semibold text-foreground">Informações da Conta</h2>
                                </div>
                                <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                                    {/* Função - full width */}
                                    <div className="md:col-span-2 space-y-1.5">
                                        <Label htmlFor="role" className="text-sm font-medium">
                                            Função <span className="text-destructive">*</span>
                                        </Label>
                                        <Select onValueChange={value => setData('role', value)} value={data.role}>
                                            <SelectTrigger id="role" className="w-full">
                                                <SelectValue placeholder="Selecione uma função" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="secretaria">Secretaria</SelectItem>
                                                <SelectItem value="professor">Professor</SelectItem>
                                                <SelectItem value="aluno">Aluno</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError className="mt-1" message={errors.role} />
                                    </div>

                                    {/* Nome Completo */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="name" className="text-sm font-medium">
                                            Nome Completo <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            required
                                            autoFocus
                                            autoComplete="name"
                                            placeholder="Nome completo do usuário"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    {/* CPF */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="cpf" className="text-sm font-medium">CPF</Label>
                                        <Input
                                            id="cpf"
                                            value={data.cpf}
                                            onChange={e => setData('cpf', e.target.value)}
                                            placeholder="000.000.000-00"
                                        />
                                        <InputError message={errors.cpf} />
                                    </div>

                                    {/* Username */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="username" className="text-sm font-medium">
                                            Usuário (login)
                                        </Label>
                                        <Input
                                            id="username"
                                            value={data.username}
                                            onChange={e => setData('username', e.target.value)}
                                            autoComplete="username"
                                            placeholder="Login personalizado (opcional)"
                                        />
                                        <InputError message={errors.username} />
                                    </div>

                                    {/* E-mail */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="email" className="text-sm font-medium">
                                            E-mail <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            required
                                            autoComplete="email"
                                            placeholder="email@exemplo.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Ativar acesso - full width */}
                                    <div className="md:col-span-2">
                                        <div className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${data.active ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-border bg-muted/30'}`}>
                                            <div className="flex items-center gap-3">
                                                {data.active
                                                    ? <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                                    : <XCircle className="h-5 w-5 text-muted-foreground" />
                                                }
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">Acesso ao sistema</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {data.active ? 'Usuário pode acessar a plataforma' : 'Acesso bloqueado'}
                                                    </p>
                                                </div>
                                            </div>
                                            <Switch
                                                id="active"
                                                checked={data.active}
                                                onCheckedChange={checked => setData('active', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card: Alterar Senha */}
                            <div className="rounded-xl border border-border bg-card shadow-sm">
                                <div className="flex items-center gap-3 border-b border-border px-6 py-4">
                                    <Lock className="h-4 w-4 text-primary" />
                                    <div>
                                        <h2 className="font-semibold text-foreground">Alterar Senha</h2>
                                        <p className="text-xs text-muted-foreground">Deixe em branco para manter a senha atual</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="password" className="text-sm font-medium">Nova Senha</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="password_confirmation" className="text-sm font-medium">Confirmar Nova Senha</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={e => setData('password_confirmation', e.target.value)}
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* ─── Tab: Turmas e Disciplinas ─── */}
                        <TabsContent value="allocations" className="space-y-6">

                            {/* Card: Vincular */}
                            <div className="rounded-xl border border-border bg-card shadow-sm">
                                <div className="flex items-center gap-3 border-b border-border px-6 py-4">
                                    <Plus className="h-4 w-4 text-primary" />
                                    <h2 className="font-semibold text-foreground">Vincular Turmas e Disciplinas</h2>
                                </div>
                                <div className="space-y-5 p-6">
                                    {/* Linha 1: Ano Letivo + Segmento */}
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-1.5">
                                            <Label className="text-sm font-medium">Ano Letivo</Label>
                                            <Select value={selectedYear} onValueChange={setSelectedYear}>
                                                <SelectTrigger><SelectValue placeholder="Selecione o ano" /></SelectTrigger>
                                                <SelectContent>
                                                    {academicYears.map(y => (
                                                        <SelectItem key={y.id} value={String(y.id)}>{y.year}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-sm font-medium">Segmento</Label>
                                            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                                                <SelectTrigger><SelectValue placeholder="Selecione o segmento" /></SelectTrigger>
                                                <SelectContent>
                                                    {educationLevels.map(l => (
                                                        <SelectItem key={l.id} value={String(l.id)}>{l.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Linha 2: Série + Turma + Disciplinas */}
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div className="space-y-1.5">
                                            <Label className="text-sm font-medium">Série</Label>
                                            <Select value={selectedGrade} onValueChange={setSelectedGrade} disabled={!selectedLevel}>
                                                <SelectTrigger><SelectValue placeholder={!selectedLevel ? 'Selecione o segmento' : 'Selecione'} /></SelectTrigger>
                                                <SelectContent>
                                                    {filteredGrades.map(g => (
                                                        <SelectItem key={g.id} value={String(g.id)}>{g.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-sm font-medium">Turma</Label>
                                            <Select value={selectedClass} onValueChange={setSelectedClass} disabled={!selectedGrade}>
                                                <SelectTrigger><SelectValue placeholder={!selectedGrade ? 'Selecione a série' : 'Selecione'} /></SelectTrigger>
                                                <SelectContent>
                                                    {filteredClasses.map(c => (
                                                        <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-sm font-medium">Disciplina(s)</Label>
                                            <Select
                                                onValueChange={val => {
                                                    if (!selectedSubjects.includes(val))
                                                        setSelectedSubjects([...selectedSubjects, val]);
                                                }}
                                            >
                                                <SelectTrigger><SelectValue placeholder="Selecione (múltiplas)" /></SelectTrigger>
                                                <SelectContent>
                                                    {subjects.map(s => (
                                                        <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {selectedSubjects.length > 0 && (
                                                <div className="mt-2 flex flex-wrap gap-1.5">
                                                    {selectedSubjects.map(id => {
                                                        const sub = subjects.find(s => String(s.id) === id);
                                                        return sub ? (
                                                            <Badge
                                                                key={id}
                                                                variant="secondary"
                                                                onClick={() => setSelectedSubjects(selectedSubjects.filter(i => i !== id))}
                                                                className="cursor-pointer gap-1 hover:bg-destructive/10 hover:text-destructive"
                                                            >
                                                                {sub.name}
                                                                <span className="opacity-60">×</span>
                                                            </Badge>
                                                        ) : null;
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end border-t border-border pt-4">
                                        <Button
                                            type="button"
                                            onClick={addAllocation}
                                            disabled={!selectedClass || selectedSubjects.length === 0}
                                            className="gap-2"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Vincular turma
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Card: Turmas vinculadas */}
                            <div className="rounded-xl border border-border bg-card shadow-sm">
                                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="h-4 w-4 text-primary" />
                                        <h2 className="font-semibold text-foreground">Turmas do Professor</h2>
                                    </div>
                                    {data.allocations.length > 0 && (
                                        <Badge variant="secondary">{data.allocations.length} turma{data.allocations.length > 1 ? 's' : ''}</Badge>
                                    )}
                                </div>

                                {data.allocations.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                                        <BookOpen className="h-8 w-8 text-muted-foreground/40" />
                                        <p className="text-sm font-medium text-muted-foreground">Nenhuma turma vinculada</p>
                                        <p className="text-xs text-muted-foreground/60">Use o formulário acima para vincular turmas e disciplinas</p>
                                    </div>
                                ) : (
                                    <div className="overflow-hidden">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="border-b border-border bg-muted/30">
                                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ano</th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Turma</th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Série</th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Disciplinas</th>
                                                    <th className="px-6 py-3" />
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border">
                                                {data.allocations.map((alloc, idx) => {
                                                    const details = getClassDetails(alloc.class_room_id);
                                                    const subjectNames = getSubjectNames(alloc.subjects);
                                                    return (
                                                        <tr key={idx} className="transition-colors hover:bg-muted/20">
                                                            <td className="px-6 py-3.5 text-sm font-medium text-foreground">{details.year}</td>
                                                            <td className="px-6 py-3.5 text-sm text-foreground">{details.name}</td>
                                                            <td className="px-6 py-3.5 text-sm text-muted-foreground">{details.grade}</td>
                                                            <td className="px-6 py-3.5">
                                                                <div className="flex flex-wrap gap-1">
                                                                    {subjectNames.map((name, i) => (
                                                                        <Badge key={i} variant="outline" className="text-xs">{name}</Badge>
                                                                    ))}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-3.5 text-right">
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                                                    onClick={() => removeAllocation(idx)}
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* Footer Actions */}
                    <div className="mt-6 flex items-center justify-end gap-3 rounded-xl border border-border bg-card px-6 py-4 shadow-sm">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing} className="min-w-[140px] gap-2">
                            {processing ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="h-4 w-4" />
                                    Salvar Alterações
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
