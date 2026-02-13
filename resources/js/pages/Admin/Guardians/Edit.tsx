import admin from '@/routes/admin';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react'; // Added router
import { FormEventHandler, useState, useEffect } from 'react';
import { MoreHorizontal, Eye, Trash2, Plus } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from 'axios';

interface Student {
    id: number;
    name: string;
    class_room?: {
        name: string;
        grade?: {
            name: string;
        }
    };
    pivot?: {
        is_financial_responsible?: boolean;
        is_pedagogic_responsible?: boolean;
    };
}

interface User {
    id: number;
    email: string;
    username: string;
}

interface Guardian {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    rg: string;
    profession: string;
    workplace: string;
    phone_work: string;
    phone_home: string;
    active: boolean;
    user?: User; // Added user
    students: Student[];
}

interface Grade {
    id: number;
    name: string;
    class_rooms: { id: number; name: string }[];
}

interface Props {
    guardian: Guardian;
    grades: Grade[];
}

export default function Edit({ guardian, grades }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard Admin',
            href: '/admin/dashboard',
        },
        {
            title: 'Visão Geral',
            href: '/admin/dashboard', // Placeholder
        },
        {
            title: 'Responsáveis',
            href: '/admin/guardians',
        },
        {
            title: 'Responsável',
            href: `/admin/guardians/${guardian.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: guardian.name,
        email: guardian.email || '',
        cpf: guardian.cpf,
        phone: guardian.phone || '',
        rg: guardian.rg || '',
        profession: guardian.profession || '',
        workplace: guardian.workplace || '',
        phone_work: guardian.phone_work || '',
        phone_home: guardian.phone_home || '',
        active: Boolean(guardian.active),
        // Mock fields for UI match
        ddi: '+55',
        username: guardian.email ? guardian.email.split('@')[0].toUpperCase() : '',
        status: guardian.active ? 'enabled' : 'disabled',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(admin.guardians.update.url(guardian.id));
    };

    // Student Linking State
    const [selectedGradeId, setSelectedGradeId] = useState<string>('');
    const [selectedClassId, setSelectedClassId] = useState<string>('');
    const [availableStudents, setAvailableStudents] = useState<{ id: number; name: string }[]>([]);
    const [selectedStudentId, setSelectedStudentId] = useState<string>('');
    const [linkType, setLinkType] = useState<string>('');
    const [loadingStudents, setLoadingStudents] = useState(false);

    // Derived lists
    const availableClasses = selectedGradeId
        ? grades.find(g => String(g.id) === selectedGradeId)?.class_rooms || []
        : [];

    useEffect(() => {
        if (selectedClassId) {
            setLoadingStudents(true);
            // Assuming Wayfinder structure: admin.api.classes.students
            // Using object params for safety: { classRoom: ... }
            axios.get(admin.api.classes.students.url({ classRoom: Number(selectedClassId) }))
                .then(res => {
                    setAvailableStudents(res.data);
                })
                .finally(() => setLoadingStudents(false));
        } else {
            setAvailableStudents([]);
        }
    }, [selectedClassId]);

    const handleLinkStudent = () => {
        if (!selectedStudentId || !linkType) return;

        // admin.guardians.students.store
        router.post(admin.guardians.students.store.url({ guardian: guardian.id }), {
            student_id: selectedStudentId,
            type: linkType,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedStudentId('');
                setLinkType('');
                // Optional: clear structure
            }
        });
    };

    const handleUnlinkStudent = (studentId: number) => {
        if (confirm('Tem certeza que deseja desvincular este estudante?')) {
            router.delete(admin.guardians.students.destroy.url({ guardian: guardian.id, student: studentId }), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Responsável - ${guardian.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-y-auto p-4 md:p-8">

                {/* Header Section */}
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{guardian.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500">Responsável • Status</span>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">
                                Habilitado
                            </Badge>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <MoreHorizontal className="h-4 w-4" />
                                    Mais ações
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => window.print()}>
                                    Imprimir Ficha
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                    Desativar Conta
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button onClick={submit} disabled={processing}>
                            Salvar alterações
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="dados-gerais" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                        <TabsTrigger
                            value="dados-gerais"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:text-red-600 data-[state=active]:shadow-none px-4 py-2"
                        >
                            Dados Gerais
                        </TabsTrigger>
                        <TabsTrigger
                            value="estudantes"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:text-red-600 data-[state=active]:shadow-none px-4 py-2"
                        >
                            Estudantes
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dados-gerais" className="mt-6 space-y-8">
                        {/* Personal Data */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="cpf">CPF</Label>
                                    <Input id="cpf" value={data.cpf} disabled className="bg-gray-50 dark:bg-gray-800" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome completo</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="ddi">DDI</Label>
                                    <Select value={data.ddi} onValueChange={(v) => setData('ddi', v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="+55">+55 (Brasil)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 col-span-3">
                                    <Label htmlFor="phone">Celular</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="border-red-300 focus:border-red-500 focus:ring-red-500"
                                    />
                                    <InputError message={errors.phone} />
                                    {!data.phone && <p className="text-xs text-red-500">Campo obrigatório!</p>}
                                </div>
                            </div>
                        </div>

                        {/* Login Options */}
                        <div className="space-y-4 pt-4 border-t">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Opções de login</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Nome de usuário</Label>
                                    <Input id="username" value={data.username} readOnly className="bg-gray-50 dark:bg-gray-800 uppercase" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} />
                                </div>
                            </div>
                        </div>

                        {/* Acesso ao Sistema - RE-ADDED FORCE */}
                        <div className="space-y-4 pt-4 border-t bg-blue-50/50 p-4 rounded-lg border border-blue-100 dark:bg-blue-900/10 dark:border-blue-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Acesso ao Sistema</h3>
                            <div className="rounded-lg border p-4 shadow-sm bg-gray-50 dark:bg-gray-800">
                                {guardian.user ? (
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">Acesso Habilitado</p>
                                            <p className="text-sm text-gray-500">Usuário: {guardian.user.username} ({guardian.user.email})</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">Este responsável não possui acesso ao sistema.</p>
                                            <p className="text-sm text-gray-500">Crie um usuário para permitir login.</p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                if (confirm('Deseja criar um usuário para este responsável?')) {
                                                    router.post(`/admin/guardians/${guardian.id}/user`);
                                                }
                                            }}
                                        >
                                            Criar Acesso
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Status */}
                        <div className="space-y-4 pt-4 border-t">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Status</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={data.active}
                                        onCheckedChange={(checked) => setData('active', checked)}
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {data.active ? 'Habilitado' : 'Desabilitado'}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </TabsContent>

                    <TabsContent value="estudantes" className="mt-6 space-y-6">
                        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Estudantes vinculados ao responsável</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Série</Label>
                                    <Select value={selectedGradeId} onValueChange={setSelectedGradeId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione uma opção" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {grades.map(grade => (
                                                <SelectItem key={grade.id} value={String(grade.id)}>{grade.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Turma</Label>
                                    <Select value={selectedClassId} onValueChange={setSelectedClassId} disabled={!selectedGradeId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione uma opção" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableClasses.map(cls => (
                                                <SelectItem key={cls.id} value={String(cls.id)}>{cls.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Estudante(s)</Label>
                                    <Select value={selectedStudentId} onValueChange={setSelectedStudentId} disabled={!selectedClassId || loadingStudents}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={loadingStudents ? "Carregando..." : "Selecione uma opção"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableStudents.map(student => (
                                                <SelectItem key={student.id} value={String(student.id)}>{student.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Tipo</Label>
                                    <Select value={linkType} onValueChange={setLinkType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="financial">Responsável Financeiro</SelectItem>
                                            <SelectItem value="pedagogic">Responsável Pedagógico</SelectItem>
                                            <SelectItem value="both">Ambos</SelectItem>
                                            <SelectItem value="other">Outro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={handleLinkStudent}>
                                    Vincular Estudante
                                </Button>
                            </div>
                        </div>

                        {/* Students List */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Turma</TableHead>
                                        <TableHead>Série</TableHead>
                                        <TableHead>Tipo de responsável</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {guardian.students.length > 0 ? (
                                        guardian.students.map(student => (
                                            <TableRow key={student.id}>
                                                <TableCell>{student.name}</TableCell>
                                                <TableCell>{student.class_room?.name || '-'}</TableCell>
                                                <TableCell>{student.class_room?.grade?.name || '-'}</TableCell>
                                                <TableCell>
                                                    {student.pivot ? (
                                                        (student.pivot.is_financial_responsible && student.pivot.is_pedagogic_responsible) ? 'Ambos' :
                                                            student.pivot.is_financial_responsible ? 'Financeiro' :
                                                                student.pivot.is_pedagogic_responsible ? 'Pedagógico' :
                                                                    'Outro'
                                                    ) : '-'}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                                        Habilitado
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2 items-center">
                                                        <Button variant="outline" size="sm" className="h-8 rounded-full">
                                                            Ver estudante
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                            onClick={() => handleUnlinkStudent(student.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                                                Nenhum estudante vinculado.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>

            </div>
        </AppLayout>
    );
}
