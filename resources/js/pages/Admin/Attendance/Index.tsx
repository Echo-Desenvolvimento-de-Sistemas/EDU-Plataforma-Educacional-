import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar, Search, FileDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ClassRoom {
    id: number;
    name: string;
    grade_id: number;
}

interface Subject {
    id: number;
    name: string;
}

interface Student {
    id: number;
    name: string;
}

interface Props {
    classRooms: ClassRoom[];
    subjects: Subject[];
    filters?: {
        class_room_id: string;
        subject_id: string;
        month: string;
        year: string;
    };
    data?: {
        matrix: Record<number, Record<number, string | null>>;
        students: Student[];
        metrics: Record<number, { percentage: number; total_absences: number; total_justified: number }>;
        daysInMonth: number;
        diaries: Record<number, any>; // Diaries map by day
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Frequência', href: '/admin/attendance' },
];

export default function Index({ classRooms, subjects, filters, data }: Props) {
    const { data: formData, setData, get, processing, errors } = useForm({
        class_room_id: filters?.class_room_id || '',
        subject_id: filters?.subject_id || '',
        month: filters?.month || new Date().getMonth() + 1 + '',
        year: filters?.year || new Date().getFullYear() + '',
        date: new Date().toISOString().split('T')[0], // Keep for quick launch
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get('/admin/attendance', {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleRedirectToEdit = () => {
        router.get('/admin/attendance/edit', {
            class_room_id: formData.class_room_id,
            subject_id: formData.subject_id,
            date: formData.date
        });
    };

    const months = [
        { value: '1', label: 'Janeiro' },
        { value: '2', label: 'Fevereiro' },
        { value: '3', label: 'Março' },
        { value: '4', label: 'Abril' },
        { value: '5', label: 'Maio' },
        { value: '6', label: 'Junho' },
        { value: '7', label: 'Julho' },
        { value: '8', label: 'Agosto' },
        { value: '9', label: 'Setembro' },
        { value: '10', label: 'Outubro' },
        { value: '11', label: 'Novembro' },
        { value: '12', label: 'Dezembro' },
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => (currentYear - 2 + i).toString());

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gerenciar Frequência" />

            <div className="flex flex-col gap-6 p-4 max-w-[1400px] mx-auto w-full pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Gerenciar Frequência</h1>
                        <p className="text-muted-foreground">Consulte o histórico mensal ou lance frequências diárias.</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-[350px_1fr]">
                    {/* Sidebar Filters */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Filtros de Visualização</CardTitle>
                                <CardDescription>Selecione para ver a grade mensal</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Turma</Label>
                                    <Select
                                        value={formData.class_room_id}
                                        onValueChange={(val) => setData('class_room_id', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a turma" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classRooms.map((cls) => (
                                                <SelectItem key={cls.id} value={String(cls.id)}>
                                                    {cls.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Disciplina</Label>
                                    <Select
                                        value={formData.subject_id}
                                        onValueChange={(val) => setData('subject_id', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a disciplina" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subjects.map((sub) => (
                                                <SelectItem key={sub.id} value={String(sub.id)}>
                                                    {sub.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-2">
                                        <Label>Mês</Label>
                                        <Select
                                            value={formData.month}
                                            onValueChange={(val) => setData('month', val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {months.map((m) => (
                                                    <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Ano</Label>
                                        <Select
                                            value={formData.year}
                                            onValueChange={(val) => setData('year', val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {years.map((y) => (
                                                    <SelectItem key={y} value={y}>{y}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleSearch}
                                    className="w-full"
                                    disabled={!formData.class_room_id || !formData.subject_id || processing}
                                >
                                    <Search className="mr-2 h-4 w-4" />
                                    Buscar Grade Mensal
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-muted/30">
                            <CardHeader>
                                <CardTitle className="text-base">Lançamento Rápido</CardTitle>
                                <CardDescription>Ir para edição de um dia específico</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Data Específica</Label>
                                    <Input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handleRedirectToEdit}
                                    className="w-full"
                                    disabled={!formData.class_room_id || !formData.subject_id}
                                >
                                    Ir para Lançamento
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Grid */}
                    <div className="space-y-6">
                        {!data ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg bg-gray-50 h-full min-h-[400px]">
                                <Calendar className="w-12 h-12 text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">Selecione os filtros</h3>
                                <p className="text-muted-foreground max-w-sm">
                                    Escolha a turma, disciplina, mês e ano para visualizar a grade de frequência.
                                </p>
                            </div>
                        ) : (
                            <Card className="overflow-hidden border-2 shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left border-collapse">
                                        <thead className="bg-gray-100 text-gray-700 font-semibold sticky top-0 z-10">
                                            <tr>
                                                <th className="p-2 border-b border-r w-12 text-center bg-gray-100 sticky left-0 z-20">Nº</th>
                                                <th className="p-2 border-b border-r min-w-[200px] bg-gray-100 sticky left-12 z-20">Aluno</th>
                                                {Array.from({ length: data.daysInMonth }, (_, i) => i + 1).map(day => {
                                                    const hasClass = data.diaries?.[day];
                                                    return (
                                                        <th key={day} className={cn(
                                                            "p-1 border-b border-r text-center w-8 min-w-[32px] font-mono text-xs",
                                                            hasClass ? "bg-white text-black" : "text-gray-400 bg-gray-50/50"
                                                        )}>
                                                            {day}
                                                        </th>
                                                    );
                                                })}
                                                <th className="p-2 border-b border-r w-16 text-center bg-gray-50 font-bold text-red-600">F</th>
                                                <th className="p-2 border-b w-16 text-center bg-gray-50 font-bold text-blue-600">%</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {data.students.map((student, idx) => {
                                                const metrics = data.metrics[student.id];
                                                return (
                                                    <tr key={student.id} className="hover:bg-gray-50/80 transition-colors">
                                                        <td className="p-2 border-r text-center text-gray-500 sticky left-0 bg-white">{idx + 1}</td>
                                                        <td className="p-2 border-r font-medium sticky left-12 bg-white">{student.name}</td>

                                                        {Array.from({ length: data.daysInMonth }, (_, i) => i + 1).map(day => {
                                                            const status = data.matrix[student.id]?.[day];

                                                            let cellContent = null;
                                                            let cellClass = "";

                                                            if (status === 'present') {
                                                                cellContent = <div className="w-1.5 h-1.5 rounded-full bg-green-500 mx-auto" />;
                                                            } else if (status === 'absent') {
                                                                cellContent = <span className="text-red-600 font-bold">F</span>;
                                                                cellClass = "bg-red-50";
                                                            } else if (status === 'justified') {
                                                                cellContent = <span className="text-amber-600 font-bold text-xs" title="Justificado">J</span>;
                                                                cellClass = "bg-amber-50";
                                                            } else if (status === 'late') {
                                                                cellContent = <span className="text-orange-500 font-bold text-xs">A</span>;
                                                            }

                                                            return (
                                                                <td key={day} className={cn("p-0 border-r text-center h-8", cellClass)}>
                                                                    {cellContent}
                                                                </td>
                                                            );
                                                        })}

                                                        <td className="p-2 border-r text-center font-bold text-red-600 bg-gray-50/30">
                                                            {metrics?.total_absences || 0}
                                                        </td>
                                                        <td className={cn(
                                                            "p-2 text-center font-bold bg-gray-50/30",
                                                            (metrics?.percentage || 100) < 75 ? "text-red-600" : "text-blue-600"
                                                        )}>
                                                            {metrics?.percentage || 100}%
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 border-t text-xs text-muted-foreground flex justify-between">
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Presente</span>
                                        <span className="flex items-center gap-1 font-bold text-red-600">F</span> Falta
                                        <span className="flex items-center gap-1 font-bold text-amber-600">J</span> Justificado
                                    </div>
                                    <div>
                                        Total de aulas no período: {Object.values(data.diaries || {}).reduce((acc: number, d: any) => acc + d.classes_count, 0)}
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
