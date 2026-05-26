import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import admin from '@/routes/admin/index';
import { ArrowLeft, Printer } from 'lucide-react';
import { useState, useMemo } from 'react';

interface Student {
    id: number;
    name: string;
    cpf: string;
    class_room?: {
        id: number;
        name: string;
    } | null;
}

interface DocumentTemplate {
    id: number;
    title: string;
    type: string;
}

interface Props {
    students: Student[];
    templates: DocumentTemplate[];
}

export default function Create({ students, templates }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [classFilter, setClassFilter] = useState('all');

    const { data, setData, post, processing, errors } = useForm({
        student_ids: [] as number[],
        template_id: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin',
            href: '/admin/dashboard',
        },
        {
            title: 'Documentos Emitidos',
            href: admin.documents.index.url(),
        },
        {
            title: 'Emitir Novo',
            href: '#',
        },
    ];

    const uniqueClasses = useMemo(() => {
        const classes = new Set<string>();
        students.forEach((student) => {
            const classObj = student.class_room || (student as any).classRoom;
            if (classObj?.name) {
                classes.add(classObj.name);
            }
        });
        return Array.from(classes).sort();
    }, [students]);

    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const matchesSearch = 
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (student.cpf && student.cpf.includes(searchTerm));

            const classObj = student.class_room || (student as any).classRoom;
            const matchesClass = classFilter === 'all' || classObj?.name === classFilter;

            return matchesSearch && matchesClass;
        });
    }, [students, searchTerm, classFilter]);

    const handleToggleStudent = (studentId: number) => {
        const currentIds = [...data.student_ids];
        const index = currentIds.indexOf(studentId);
        if (index > -1) {
            currentIds.splice(index, 1);
        } else {
            currentIds.push(studentId);
        }
        setData('student_ids', currentIds);
    };

    const handleToggleSelectAllVisible = () => {
        const visibleIds = filteredStudents.map((s) => s.id);
        const allVisibleSelected = visibleIds.every((id) => data.student_ids.includes(id));

        if (allVisibleSelected) {
            setData('student_ids', data.student_ids.filter((id) => !visibleIds.includes(id)));
        } else {
            const newIds = Array.from(new Set([...data.student_ids, ...visibleIds]));
            setData('student_ids', newIds);
        }
    };

    const isAllVisibleSelected = useMemo(() => {
        if (filteredStudents.length === 0) return false;
        return filteredStudents.every((s) => data.student_ids.includes(s.id));
    }, [filteredStudents, data.student_ids]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.documents.store.url());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Emitir Novo Documento" />

            <div className="flex flex-col gap-6 p-4 max-w-3xl mx-auto w-full">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={admin.documents.index.url()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Emitir Novo Documento</h1>
                        <p className="text-muted-foreground">
                            Selecione os alunos e o modelo para gerar os documentos.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Dados da Emissão</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">

                            {/* Template Selection */}
                            <div className="space-y-2">
                                <Label htmlFor="template_id" className="text-sm font-bold text-slate-800 dark:text-slate-200">Modelo de Documento</Label>
                                <Select
                                    value={data.template_id}
                                    onValueChange={(val) => setData('template_id', val)}
                                >
                                    <SelectTrigger className="h-10 rounded-2xl bg-background border-slate-200 dark:border-slate-800 focus:ring-emerald-500">
                                        <SelectValue placeholder="Selecione o modelo..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {templates.map((template) => (
                                            <SelectItem key={template.id} value={template.id.toString()}>
                                                {template.title} ({template.type})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.template_id && <span className="text-sm text-red-500 block">{errors.template_id}</span>}
                            </div>

                            {/* Students Selection List with Filters */}
                            <div className="space-y-3 pt-2">
                                <Label className="text-sm font-bold text-slate-800 dark:text-slate-200">Selecionar Alunos</Label>
                                
                                {/* Search and Filter Controls */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1">
                                        <Input
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Buscar aluno por nome ou CPF..."
                                            className="h-10 rounded-2xl bg-background border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500"
                                        />
                                    </div>
                                    <div className="w-full sm:w-[200px]">
                                        <Select value={classFilter} onValueChange={setClassFilter}>
                                            <SelectTrigger className="h-10 rounded-2xl bg-background border-slate-200 dark:border-slate-800 focus:ring-emerald-500">
                                                <SelectValue placeholder="Filtrar por Turma" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Todas as Turmas</SelectItem>
                                                {uniqueClasses.map((className) => (
                                                    <SelectItem key={className} value={className}>
                                                        {className}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Table checklist */}
                                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-background">
                                    {/* Table Header */}
                                    <div className="flex items-center gap-3 px-4 py-3 bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
                                        <input 
                                            type="checkbox"
                                            checked={isAllVisibleSelected} 
                                            onChange={handleToggleSelectAllVisible}
                                            id="select-all-visible"
                                            className="rounded border-slate-300 dark:border-slate-700 text-emerald-600 focus:ring-emerald-500 h-4 w-4 accent-emerald-600 dark:accent-emerald-400 cursor-pointer"
                                        />
                                        <label htmlFor="select-all-visible" className="text-xs font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider flex-1 cursor-pointer select-none">
                                            Nome do Aluno
                                        </label>
                                        <span className="text-xs font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider w-[120px] text-right">
                                            Turma
                                        </span>
                                    </div>

                                    {/* Table Body scroll area */}
                                    <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
                                        {filteredStudents.length > 0 ? (
                                            filteredStudents.map((student) => {
                                                const classObj = student.class_room || (student as any).classRoom;
                                                const isSelected = data.student_ids.includes(student.id);
                                                return (
                                                    <div 
                                                        key={student.id} 
                                                        className={`flex items-center gap-3 px-4 py-3 hover:bg-slate-50/30 dark:hover:bg-slate-900/20 transition-all cursor-pointer ${
                                                            isSelected ? 'bg-emerald-50/10 dark:bg-emerald-950/5' : ''
                                                        }`}
                                                        onClick={() => handleToggleStudent(student.id)}
                                                    >
                                                        <input 
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => handleToggleStudent(student.id)}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="rounded border-slate-300 dark:border-slate-700 text-emerald-600 focus:ring-emerald-500 h-4 w-4 accent-emerald-600 dark:accent-emerald-400 cursor-pointer"
                                                        />
                                                        <div className="flex-1 min-w-0 select-none">
                                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{student.name}</p>
                                                            <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">{student.cpf || 'Sem CPF'}</p>
                                                        </div>
                                                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-350 bg-slate-100 dark:bg-slate-800/80 py-1 px-2.5 rounded-full shrink-0">
                                                            {classObj?.name || 'Sem turma'}
                                                        </span>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="text-center py-8 text-sm text-slate-400 dark:text-slate-500 font-medium">
                                                Nenhum aluno encontrado para os filtros selecionados.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {errors.student_ids && <span className="text-sm text-red-500 block">{errors.student_ids}</span>}

                                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 pt-1">
                                    <span>Mostrando {filteredStudents.length} de {students.length} alunos</span>
                                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/5 px-2.5 py-0.5 rounded-full">
                                        {data.student_ids.length} selecionado(s)
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button type="submit" disabled={processing || data.student_ids.length === 0 || !data.template_id} className="w-full sm:w-auto">
                                    <Printer className="h-4 w-4 mr-2" />
                                    Gerar e Emitir ({data.student_ids.length})
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
