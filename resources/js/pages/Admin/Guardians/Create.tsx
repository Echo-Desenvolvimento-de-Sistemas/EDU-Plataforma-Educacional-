import admin from '@/routes/admin';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import axios from 'axios';

interface Grade {
    id: number;
    name: string;
    class_rooms: { id: number; name: string }[];
}

interface StudentLink {
    student_id: number;
    name: string; // For display
    class_name: string; // For display
    type: string;
}

interface Props {
    grades: Grade[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Responsáveis',
        href: '/admin/guardians',
    },
    {
        title: 'Novo Responsável',
        href: '/admin/guardians/create',
    },
];

export default function Create({ grades }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        rg: '',
        profession: '',
        workplace: '',
        phone_work: '',
        phone_home: '',
        students: [] as StudentLink[], // Array to store linked students
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(admin.guardians.store.url());
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
            axios.get(admin.api.classes.students.url({ classRoom: Number(selectedClassId) }))
                .then(res => {
                    setAvailableStudents(res.data);
                })
                .finally(() => setLoadingStudents(false));
        } else {
            setAvailableStudents([]);
        }
    }, [selectedClassId]);

    const handleAddStudent = () => {
        if (!selectedStudentId || !linkType) return;

        const student = availableStudents.find(s => String(s.id) === selectedStudentId);
        const classRoom = availableClasses.find(c => String(c.id) === selectedClassId);

        if (!student) return;

        // Check if already added
        if (data.students.some(s => s.student_id === student.id)) {
            alert('Estudante já adicionado à lista.');
            return;
        }

        const newLink: StudentLink = {
            student_id: student.id,
            name: student.name,
            class_name: classRoom?.name || '',
            type: linkType,
        };

        setData('students', [...data.students, newLink]);
        setSelectedStudentId('');
        setLinkType('');
    };

    const handleRemoveStudent = (studentId: number) => {
        setData('students', data.students.filter(s => s.student_id !== studentId));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Responsável" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-4xl rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar-accent/10">
                    <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">Novo Responsável</h2>
                    <form onSubmit={submit} className="space-y-8">

                        {/* 1. Dados Pessoais */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Dados Pessoais</h3>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="name">Nome Completo *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <Label htmlFor="cpf">CPF *</Label>
                                    <Input
                                        id="cpf"
                                        value={data.cpf}
                                        onChange={(e) => setData('cpf', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.cpf} />
                                </div>
                                <div>
                                    <Label htmlFor="rg">RG</Label>
                                    <Input
                                        id="rg"
                                        value={data.rg}
                                        onChange={(e) => setData('rg', e.target.value)}
                                    />
                                    <InputError message={errors.rg} />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Celular (WhatsApp)</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="profession">Profissão</Label>
                                    <Input
                                        id="profession"
                                        value={data.profession}
                                        onChange={(e) => setData('profession', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="workplace">Local de Trabalho</Label>
                                    <Input
                                        id="workplace"
                                        value={data.workplace}
                                        onChange={(e) => setData('workplace', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="phone_work">Telefone Comercial</Label>
                                    <Input
                                        id="phone_work"
                                        value={data.phone_work}
                                        onChange={(e) => setData('phone_work', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone_home">Telefone Residencial</Label>
                                    <Input
                                        id="phone_home"
                                        value={data.phone_home}
                                        onChange={(e) => setData('phone_home', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Vínculo com Estudantes */}
                        <div className="space-y-4 pt-6 border-t">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center justify-between">
                                Vínculo com Estudantes
                                <span className="text-sm font-normal text-gray-500">Opcional</span>
                            </h3>

                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-2">
                                        <Label>Série</Label>
                                        <Select value={selectedGradeId} onValueChange={setSelectedGradeId}>
                                            <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                            <SelectContent>
                                                {grades.map(g => <SelectItem key={g.id} value={String(g.id)}>{g.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Turma</Label>
                                        <Select value={selectedClassId} onValueChange={setSelectedClassId} disabled={!selectedGradeId}>
                                            <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                            <SelectContent>
                                                {availableClasses.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Estudante</Label>
                                        <Select value={selectedStudentId} onValueChange={setSelectedStudentId} disabled={!selectedClassId || loadingStudents}>
                                            <SelectTrigger><SelectValue placeholder={loadingStudents ? "Carregando..." : "Selecione..."} /></SelectTrigger>
                                            <SelectContent>
                                                {availableStudents.map(s => <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Tipo de Responsabilidade</Label>
                                        <Select value={linkType} onValueChange={setLinkType}>
                                            <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="financial">Financeiro</SelectItem>
                                                <SelectItem value="pedagogic">Pedagógico</SelectItem>
                                                <SelectItem value="both">Ambos</SelectItem>
                                                <SelectItem value="other">Outro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Button type="button" variant="secondary" onClick={handleAddStudent} disabled={!selectedStudentId || !linkType}>
                                        Adicionar Estudante
                                    </Button>
                                </div>
                            </div>

                            {/* Table of selected students */}
                            {data.students.length > 0 && (
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Estudante</TableHead>
                                                <TableHead>Turma</TableHead>
                                                <TableHead>Tipo</TableHead>
                                                <TableHead className="text-right">Ações</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {data.students.map((student) => (
                                                <TableRow key={student.student_id}>
                                                    <TableCell>{student.name}</TableCell>
                                                    <TableCell>{student.class_name}</TableCell>
                                                    <TableCell>
                                                        {student.type === 'both' ? 'Financeiro e Pedagógico' :
                                                            student.type === 'financial' ? 'Financeiro' :
                                                                student.type === 'pedagogic' ? 'Pedagógico' : 'Outro'}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleRemoveStudent(student.student_id)}
                                                            className="text-red-500 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-end pt-6 border-t">
                            <Button className="ml-4" disabled={processing}>
                                Criar Responsável
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
