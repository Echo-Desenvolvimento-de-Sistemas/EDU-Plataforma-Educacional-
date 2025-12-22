import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeftRight, Check, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface ClassRoom {
    id: number;
    name: string;
    full_label: string;
    grade_name: string;
    academic_year: string;
}

interface Student {
    id: number;
    name: string;
}

interface Props {
    classes: ClassRoom[];
}

export default function BatchEnrollmentIndex({ classes }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Painel', href: '/secretaria/dashboard' },
        { title: 'Enturmação em Lote', href: '/secretaria/batch-enrollment' },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        source_class_id: '',
        destination_class_id: '',
        student_ids: [] as number[],
    });

    const [students, setStudents] = useState<Student[]>([]);
    const [loadingStudents, setLoadingStudents] = useState(false);

    // Fetch students when source class changes
    useEffect(() => {
        if (!data.source_class_id) {
            setStudents([]);
            return;
        }

        setLoadingStudents(true);
        axios.get(`/admin/api/classes/${data.source_class_id}/students`) // Reusing Admin API
            .then(res => {
                setStudents(res.data);
                // Optional: Auto-select all? No, safer to let user choose.
                setData('student_ids', []);
            })
            .catch(err => {
                console.error(err);
                toast.error('Erro ao buscar alunos da turma de origem.');
            })
            .finally(() => setLoadingStudents(false));
    }, [data.source_class_id]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setData('student_ids', students.map(s => s.id));
        } else {
            setData('student_ids', []);
        }
    };

    const handleSelectStudent = (studentId: number, checked: boolean) => {
        if (checked) {
            setData('student_ids', [...data.student_ids, studentId]);
        } else {
            setData('student_ids', data.student_ids.filter(id => id !== studentId));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (data.student_ids.length === 0) {
            toast.error('Selecione pelo menos um aluno.');
            return;
        }

        if (data.source_class_id === data.destination_class_id) {
            toast.error('A turma de destino deve ser diferente da turma de origem.');
            return;
        }

        post('/secretaria/batch-enrollment', {
            onSuccess: () => {
                toast.success('Alunos movidos com sucesso!');
                setStudents([]); // Clear list as they are moved
                setData('source_class_id', ''); // Reset source to force refresh if needed or keeps clear
                reset();
            },
            onError: () => {
                toast.error('Ocorreu um erro ao mover os alunos.');
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Enturmação em Lote" />
            <div className="flex h-full flex-col gap-4 p-4 md:p-8">
                <div className="mx-auto w-full max-w-5xl space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Enturmação em Lote</h1>
                        <p className="text-muted-foreground">Mova alunos de uma turma para outra massivamente.</p>
                    </div>

                    <form onSubmit={submit}>
                        <div className="grid md:grid-cols-2 gap-6 items-start">
                            {/* Source Column */}
                            <Card className="border-l-4 border-l-blue-500">
                                <CardHeader>
                                    <CardTitle>1. Origem</CardTitle>
                                    <CardDescription>Selecione a turma atual dos alunos.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Turma de Origem</Label>
                                        <Select
                                            value={data.source_class_id}
                                            onValueChange={(val) => setData('source_class_id', val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a turma..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {classes.map((c) => (
                                                    <SelectItem key={c.id} value={String(c.id)}>
                                                        {c.full_label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {data.destination_class_id && data.source_class_id === data.destination_class_id && (
                                            <p className="text-sm text-red-500">Origem e destino não podem ser iguais.</p>
                                        )}
                                    </div>

                                    {data.source_class_id && (
                                        <div className="border rounded-md mt-4">
                                            <div className="p-3 bg-muted/50 border-b flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Checkbox
                                                        checked={students.length > 0 && data.student_ids.length === students.length}
                                                        onCheckedChange={handleSelectAll}
                                                        disabled={loadingStudents || students.length === 0}
                                                    />
                                                    <span className="text-sm font-medium">
                                                        Alunos ({data.student_ids.length}/{students.length})
                                                    </span>
                                                </div>
                                                {loadingStudents && <Loader2 className="h-4 w-4 animate-spin" />}
                                            </div>
                                            <div className="max-h-[300px] overflow-y-auto p-1">
                                                {students.length > 0 ? (
                                                    <Table>
                                                        <TableBody>
                                                            {students.map((student) => (
                                                                <TableRow key={student.id} className="hover:bg-muted/50">
                                                                    <TableCell className="p-2 w-[40px]">
                                                                        <Checkbox
                                                                            checked={data.student_ids.includes(student.id)}
                                                                            onCheckedChange={(checked) => handleSelectStudent(student.id, checked as boolean)}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell className="p-2 text-sm">
                                                                        {student.name}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                ) : (
                                                    <div className="p-8 text-center text-sm text-muted-foreground">
                                                        {loadingStudents ? 'Carregando alunos...' : 'Nenhum aluno nesta turma.'}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Destination Column */}
                            <div className="space-y-6">
                                <Card className="border-l-4 border-l-green-500">
                                    <CardHeader>
                                        <CardTitle>2. Destino</CardTitle>
                                        <CardDescription>Para onde os alunos selecionados irão.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Turma de Destino</Label>
                                            <Select
                                                value={data.destination_class_id}
                                                onValueChange={(val) => setData('destination_class_id', val)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione a turma..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {classes.filter(c => String(c.id) !== data.source_class_id).map((c) => (
                                                        <SelectItem key={c.id} value={String(c.id)}>
                                                            {c.full_label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-50 border-dashed">
                                    <CardContent className="pt-6">
                                        <div className="flex flex-col gap-4 text-center items-center">
                                            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                                <ArrowLeftRight className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">Resumo da Ação</h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Você está movendo <span className="font-bold text-foreground">{data.student_ids.length} alunos</span> <br />
                                                    da turma <span className="font-medium text-foreground">{classes.find(c => String(c.id) === data.source_class_id)?.name || '...'}</span> <br />
                                                    para <span className="font-medium text-foreground">{classes.find(c => String(c.id) === data.destination_class_id)?.name || '...'}</span>.
                                                </p>
                                            </div>

                                            <Button
                                                size="lg"
                                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                                                disabled={processing || data.student_ids.length === 0 || !data.destination_class_id}
                                            >
                                                {processing ? (
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Check className="mr-2 h-4 w-4" />
                                                )}
                                                Confirmar Transferência
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
