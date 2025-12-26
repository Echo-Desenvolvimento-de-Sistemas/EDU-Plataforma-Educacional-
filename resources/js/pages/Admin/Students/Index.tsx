import admin from '@/routes/admin';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import AppLogo from '@/components/app-logo';
import { Head, Link, router, usePage } from '@inertiajs/react'; // Added router
import { Edit, Trash2, Plus, Eye, Printer, Search, Filter, Power, Calendar as CalendarIcon } from 'lucide-react'; // Added Search, Filter, Power
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input'; // Added Input
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Added Select components
import { useState, useEffect } from 'react'; // Added useEffect
import axios from 'axios';
import StudentRegistrationCard from '@/components/student-registration-card';
import { useDebounce } from '@/hooks/use-debounce'; // Added useDebounce
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Alunos',
        href: '/admin/students',
    },
];

interface ClassRoom {
    id: number;
    name: string;
}

interface Student {
    id: number;
    name: string;
    birth_date: string;
    cpf: string;
    status: string;
    class_room: ClassRoom;
}

interface Props {
    students: {
        data: Student[];
        links: any[];
    };
    classRooms: ClassRoom[]; // Added classRooms
    filters: { // Added filters
        search?: string;
        class_room_id?: string;
    };
}

export default function Index({ students, classRooms, filters }: Props) {
    const [viewingStudent, setViewingStudent] = useState<any>(null);
    const [loadingStudent, setLoadingStudent] = useState(false);

    // Filter States
    const [search, setSearch] = useState(filters.search || '');
    const [classRoomId, setClassRoomId] = useState(filters.class_room_id || 'all');
    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        router.get(
            '/admin/students',
            {
                search: debouncedSearch,
                class_room_id: classRoomId === 'all' ? undefined : classRoomId
            },
            { preserveState: true, replace: true }
        );
    }, [debouncedSearch, classRoomId]);

    const handleViewStudent = (id: number) => {
        setLoadingStudent(true);
        axios.get(`/admin/students/${id}`)
            .then(response => {
                setViewingStudent(response.data);
            })
            .catch(error => {
                console.error("Error fetching student details", error);
            })
            .finally(() => {
                setLoadingStudent(false);
            });
    };

    const handlePrint = () => {
        window.print();
    };

    const { settings } = usePage().props as any;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Alunos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden rounded-xl p-4 print:hidden">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Alunos</h1>
                    <Link
                        href="/admin/students/create"
                        className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                        <Plus className="h-4 w-4" />
                        Novo Aluno
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Buscar por nome ou CPF..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full sm:w-[250px]">
                        <Select value={classRoomId} onValueChange={setClassRoomId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrar por Turma" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas as Turmas</SelectItem>
                                {classRooms.map((classroom) => (
                                    <SelectItem key={classroom.id} value={String(classroom.id)}>
                                        {classroom.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Mobile View (Cards) */}
                <div className="grid gap-4 sm:hidden overflow-y-auto">
                    {students.data.map((student) => (
                        <Card key={student.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {student.name}
                                </CardTitle>
                                <Badge variant="outline">
                                    {student.class_room?.name || 'Sem Turma'}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    Nascimento: {new Date(student.birth_date).toLocaleDateString()}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                    CPF: {student.cpf || '-'}
                                </div>
                                <div className="mb-4">
                                    <Badge variant={student.status === 'active' ? 'secondary' : 'destructive'}>
                                        {student.status === 'active' ? 'Ativo' : 'Cancelado'}
                                    </Badge>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Link
                                        href={`/admin/students/${student.id}/toggle-status`}
                                        method="patch"
                                        as="button"
                                        preserveScroll
                                        className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 ${student.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}
                                    >
                                        <Power className="h-4 w-4" />
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleViewStudent(student.id)}
                                        disabled={loadingStudent}
                                        title="Visualizar Ficha Cadastral"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Link
                                        href={`/admin/students/${student.id}/edit`}
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 text-indigo-600 hover:text-indigo-900"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href={`/admin/students/${student.id}`}
                                        method="delete"
                                        as="button"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-red-100 hover:text-red-600 h-9 w-9"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Desktop View (Table) */}
                <div className="hidden sm:block flex-1 overflow-auto rounded-md border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Nome
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Turma
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Nascimento
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    CPF
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                            {students.data.length > 0 ? (
                                students.data.map((student) => (
                                    <tr key={student.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{student.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {student.class_room?.name || 'Sem Turma'}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(student.birth_date).toLocaleDateString()}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {student.cpf || '-'}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            <Badge variant={student.status === 'active' ? 'secondary' : 'destructive'}>
                                                {student.status === 'active' ? 'Ativo' : 'Cancelado'}
                                            </Badge>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/students/${student.id}/toggle-status`}
                                                    method="patch"
                                                    as="button"
                                                    preserveScroll
                                                    title={student.status === 'active' ? 'Cancelar Matrícula' : 'Ativar Matrícula'}
                                                    className={`transition-colors p-2 ${student.status === 'active' ? 'text-green-600 hover:text-green-900' : 'text-gray-400 hover:text-gray-600'}`}
                                                >
                                                    <Power className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/students/${student.id}/attendance`}
                                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 text-blue-600 hover:text-blue-900"
                                                    title="Visualizar Frequência (Caderno)"
                                                >
                                                    <CalendarIcon className="h-4 w-4" />
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleViewStudent(student.id)}
                                                    disabled={loadingStudent}
                                                    title="Visualizar Ficha Cadastral"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Link
                                                    href={`/admin/students/${student.id}/edit`}
                                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-2"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/students/${student.id}`}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-2"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                        Nenhum aluno encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* View Student Modal - No changes here but included for completeness if needed, though replacement is safer to cover everything */}
                <Dialog open={!!viewingStudent} onOpenChange={(open) => !open && setViewingStudent(null)}>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto print:hidden dark:bg-gray-900 dark:text-gray-100">
                        <DialogHeader className="print:hidden flex flex-row items-center justify-between">
                            <DialogTitle>Ficha do Aluno</DialogTitle>
                            <DialogDescription className="sr-only">Detalhes do Aluno</DialogDescription>
                            <Button variant="outline" size="sm" onClick={handlePrint} className="ml-auto">
                                <Printer className="mr-2 h-4 w-4" />
                                Imprimir
                            </Button>
                        </DialogHeader>

                        {/* Print Header removed - using dedicated print view */}

                        {viewingStudent && (
                            <div className="space-y-6">
                                <StudentRegistrationCard student={viewingStudent} />
                            </div>
                        )}
                        <DialogFooter className="sm:justify-between print:hidden">
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* DEDICATED PRINT VIEW */}
            {viewingStudent && (
                <div className="hidden print:block print:fixed print:inset-0 print:bg-white print:z-[9999] print:h-screen print:w-screen print:overflow-visible">
                    <div className="print:p-8">
                        {/* Print Header - With Logo and School Info */}
                        <div className="flex items-center gap-4 mb-6 border-b-2 border-black pb-4">
                            <div className="w-24 h-24 flex items-center justify-center shrink-0">
                                <AppLogo className="w-full h-full text-black" />
                            </div>
                            <div className="flex-1 text-center">
                                <h1 className="text-2xl font-bold uppercase">{settings?.school_name || settings?.app_name || 'Centro Educacional Rosa de Sharon'}</h1>
                                <p className="text-sm text-gray-600">Educação Infantil e Ensino Fundamental</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {settings?.school_address || 'Endereço não configurado'}
                                    {(settings?.school_city || settings?.school_state) && ` - ${settings?.school_city || ''}/${settings?.school_state || ''}`}
                                    {settings?.school_cep && ` - CEP: ${settings?.school_cep}`}
                                    {settings?.school_phone && ` - Tel: ${settings?.school_phone}`}
                                </p>
                            </div>
                            <div className="w-24 shrink-0 text-right">
                                <div className="border border-black p-2 text-center">
                                    <p className="text-[10px] uppercase font-bold">Matrícula Nº</p>
                                    <p className="text-lg font-bold">{viewingStudent.id.toString().padStart(4, '0')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mb-4">
                            <h2 className="text-xl font-bold uppercase bg-gray-200 py-1 print:bg-gray-200 print:text-black">Ficha Cadastral do Aluno</h2>
                        </div>

                        {/* Summary Grid */}
                        <div className="grid grid-cols-4 gap-4 mb-4 text-xs border border-gray-300 p-2">
                            <div>
                                <span className="font-bold block uppercase">Status da Matrícula:</span>
                                <span>{viewingStudent.status === 'active' ? 'ATIVA' : 'CANCELADA'}</span>
                            </div>
                            <div>
                                <span className="font-bold block uppercase">Turma Atual:</span>
                                <span>{viewingStudent.class_room?.name || 'Sem Turma'}</span>
                            </div>
                            <div>
                                <span className="font-bold block uppercase">Data Nascimento:</span>
                                <span>{new Date(viewingStudent.birth_date).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <span className="font-bold block uppercase">CPF:</span>
                                <span>{viewingStudent.cpf || '-'}</span>
                            </div>
                        </div>

                        <StudentRegistrationCard student={viewingStudent} />

                        {/* Missing Documents Checklist */}
                        <div className="mt-6 print:break-inside-avoid">
                            <h3 className="text-sm font-bold uppercase border-b border-black mb-2">Conferência de Documentos (Secretaria)</h3>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> Certidão de Nascimento</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> Histórico Escolar / Transferência</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> 2 Fotos 3x4</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> Cartão de Vacina Atualizado</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> Comprovante de Residência</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> RG e CPF do Responsável</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> Cartão do SUS</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> Tipo Sanguíneo (Laudo)</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> Declaração de Quitação</div>
                            </div>
                        </div>

                        {/* Signatures */}
                        <div className="mt-12 grid grid-cols-2 gap-16 print:break-inside-avoid">
                            <div className="text-center pt-8 border-t border-black">
                                <p className="text-xs uppercase font-bold">Assinatura do Responsável</p>
                            </div>
                            <div className="text-center pt-8 border-t border-black">
                                <p className="text-xs uppercase font-bold">Secretaria / Direção</p>
                            </div>
                        </div>

                        <div className="flex justify-between mt-4 text-[10px] text-gray-400">
                            <span>Sistema de Gestão Escolar - Rosa de Sharon</span>
                            <span>Impresso em: {new Date().toLocaleString('pt-BR')}</span>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
