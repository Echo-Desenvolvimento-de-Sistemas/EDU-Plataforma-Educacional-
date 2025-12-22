import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BreadcrumbItem } from '@/types';
import { Trash2, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ClassRoom {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    name: string;
}

interface Schedule {
    id: number;
    subject: { name: string };
    day_of_week: number;
    start_time: string;
    end_time: string;
}

interface Props {
    classRooms: ClassRoom[];
    subjects: Subject[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Horários',
        href: '/admin/class-schedules',
    },
];

const DAYS = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
];

export default function ClassScheduleIndex({ classRooms, subjects }: Props) {
    const [selectedClassId, setSelectedClassId] = useState<string>('');
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(false);

    // Form for new schedule
    const { data, setData, post, processing, reset, errors } = useForm({
        class_room_id: '',
        subject_id: '',
        day_of_week: '1', // Default Monday
        start_time: '07:30',
        end_time: '08:20',
    });

    useEffect(() => {
        if (selectedClassId) {
            fetchSchedules(selectedClassId);
            setData('class_room_id', selectedClassId);
        } else {
            setSchedules([]);
        }
    }, [selectedClassId]);

    const fetchSchedules = async (classId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`/admin/class-schedules/${classId}`);
            const data = await response.json();
            setSchedules(data);
        } catch (error) {
            toast.error('Erro ao buscar horários.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/class-schedules', {
            onSuccess: () => {
                toast.success('Horário adicionado!');
                fetchSchedules(selectedClassId); // Reload list
                // reset({ ...data, subject_id: '' }); // Keep time/day, reset subject?
            },
            onError: () => toast.error('Verifique os dados informados.'),
        });
    };

    const handleDelete = (id: number) => {
        if (!confirm('Tem certeza?')) return;
        router.delete(`/admin/class-schedules/${id}`, {
            onSuccess: () => {
                toast.success('Horário removido.');
                fetchSchedules(selectedClassId);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gerenciar Horários" />

            <div className="p-6 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Gerenciar Horários de Aulas</CardTitle>
                        <CardDescription>Selecione uma turma para visualizar e editar o quadro de horários.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="max-w-md">
                            <Label>Turma</Label>
                            <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a turma..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {classRooms.map((c) => (
                                        <SelectItem key={c.id} value={c.id.toString()}>
                                            {c.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {selectedClassId && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* List - 2 cols */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Quadro de Horários</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <p>Carregando...</p>
                                ) : schedules.length === 0 ? (
                                    <p className="text-muted-foreground">Nenhum horário cadastrado.</p>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Dia</TableHead>
                                                <TableHead>Horário</TableHead>
                                                <TableHead>Disciplina</TableHead>
                                                <TableHead className="w-[50px]"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {schedules.map((schedule) => (
                                                <TableRow key={schedule.id}>
                                                    <TableCell className="font-medium">{DAYS[schedule.day_of_week]}</TableCell>
                                                    <TableCell>{schedule.start_time.slice(0, 5)} - {schedule.end_time.slice(0, 5)}</TableCell>
                                                    <TableCell>{schedule.subject.name}</TableCell>
                                                    <TableCell>
                                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(schedule.id)}>
                                                            <Trash2 className="w-4 h-4 text-destructive" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>

                        {/* Form - 1 col */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Adicionar Aula</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label>Dia da Semana</Label>
                                        <Select
                                            value={data.day_of_week.toString()}
                                            onValueChange={(v) => setData('day_of_week', v)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {DAYS.map((day, idx) => (
                                                    <SelectItem key={idx} value={idx.toString()}>{day}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.day_of_week && <span className="text-red-500 text-xs">{errors.day_of_week}</span>}
                                    </div>

                                    <div>
                                        <Label>Disciplina</Label>
                                        <Select
                                            value={data.subject_id}
                                            onValueChange={(v) => setData('subject_id', v)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {subjects.map((s) => (
                                                    <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.subject_id && <span className="text-red-500 text-xs">{errors.subject_id}</span>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Label>Início</Label>
                                            <Input
                                                type="time"
                                                value={data.start_time}
                                                onChange={e => setData('start_time', e.target.value)}
                                            />
                                            {errors.start_time && <span className="text-red-500 text-xs">{errors.start_time}</span>}
                                        </div>
                                        <div>
                                            <Label>Fim</Label>
                                            <Input
                                                type="time"
                                                value={data.end_time}
                                                onChange={e => setData('end_time', e.target.value)}
                                            />
                                            {errors.end_time && <span className="text-red-500 text-xs">{errors.end_time}</span>}
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full" disabled={processing}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Adicionar
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
