import admin from '@/routes/admin';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react'; // Added router
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Alunos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden rounded-xl p-4">
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
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto print:max-w-none print:max-h-none print:overflow-visible print:border-none print:shadow-none dark:bg-gray-900 dark:text-gray-100">
                        <DialogHeader className="print:hidden flex flex-row items-center justify-between">
                            <DialogTitle>Ficha do Aluno</DialogTitle>
                            <DialogDescription className="sr-only">Detalhes do Aluno</DialogDescription>
                            <Button variant="outline" size="sm" onClick={handlePrint} className="ml-auto">
                                <Printer className="mr-2 h-4 w-4" />
                                Imprimir
                            </Button>
                        </DialogHeader>

                        {/* Print Header */}
                        <div className="hidden print:block mb-6">
                            <h1 className="text-2xl font-bold text-center uppercase mb-1">Ficha Cadastral do Aluno</h1>
                            <h2 className="text-xl text-center text-gray-600 mb-4">Sistema de Gestão Escolar</h2>
                            <div className="border-b-2 border-black mb-6"></div>
                        </div>

                        {viewingStudent && (
                            <div className="space-y-6">
                                <StudentRegistrationCard student={viewingStudent} />
                                <div className="hidden print:flex justify-between mt-12 text-xs text-gray-500 px-2 page-break-after-avoid">
                                    <span>Pagina 1/1</span>
                                    <span>Gerado em: {new Date().toLocaleString('pt-BR')}</span>
                                </div>
                            </div>
                        )}
                        <DialogFooter className="sm:justify-between print:hidden">
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
