import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { BreadcrumbItem } from '@/types';
import { Trash2, Plus, Clock, Calendar as CalendarIcon, Users, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import axios from 'axios';

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
    const { data, setData, post, processing, errors } = useForm({
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

    const calculateDiffInMinutes = (start: string, end: string) => {
        if (!start || !end) return 50;
        const [startH = 0, startM = 0] = start.split(':').map(Number);
        const [endH = 0, endM = 0] = end.split(':').map(Number);
        return (endH * 60 + endM) - (startH * 60 + startM);
    };

    const addMinutes = (time: string, minutes: number) => {
        if (!time) return '';
        const [h = 0, m = 0] = time.split(':').map(Number);
        const totalMinutes = h * 60 + m + minutes;
        const newH = Math.floor(totalMinutes / 60) % 24;
        const newM = totalMinutes % 60;
        return `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const currentStartTime = data.start_time;
        const currentEndTime = data.end_time;

        post('/admin/class-schedules', {
            onSuccess: () => {
                toast.success('Horário adicionado!');
                fetchSchedules(selectedClassId); // Reload list

                const diffMinutes = calculateDiffInMinutes(currentStartTime, currentEndTime);
                const nextStartTime = currentEndTime;
                const nextEndTime = addMinutes(nextStartTime, diffMinutes > 0 ? diffMinutes : 50);

                setData({
                    ...data,
                    subject_id: '',
                    start_time: nextStartTime,
                    end_time: nextEndTime,
                });
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

    const handleDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        // Cannot drag to a different day
        if (destination.droppableId !== source.droppableId) {
            toast.error('Você só pode reordenar as aulas dentro do mesmo dia.');
            return;
        }

        if (destination.index === source.index) return;

        const dayOfWeek = parseInt(source.droppableId);

        // Find schedules for this day
        const daySchedules = schedules.filter(s => s.day_of_week === dayOfWeek).sort((a, b) => a.start_time.localeCompare(b.start_time));

        // Create a new array and move the requested item
        const newOrder = Array.from(daySchedules);
        const [movedItem] = newOrder.splice(source.index, 1);
        newOrder.splice(destination.index, 0, movedItem);

        // Optimistically update the UI by preserving the absolute time slots
        const timeSlots = daySchedules.map(s => ({ start: s.start_time, end: s.end_time }));

        const updatedSchedules = schedules.map(s => {
            if (s.day_of_week === dayOfWeek) {
                const newIndex = newOrder.findIndex(ordered => ordered.id === s.id);
                return {
                    ...s,
                    start_time: timeSlots[newIndex].start,
                    end_time: timeSlots[newIndex].end
                };
            }
            return s;
        });

        setSchedules(updatedSchedules);

        try {
            await axios.post('/admin/class-schedules/reorder', {
                class_room_id: selectedClassId,
                day_of_week: dayOfWeek,
                ordered_ids: newOrder.map(s => s.id)
            });
            toast.success('Ordem das aulas atualizada!');
        } catch (error) {
            toast.error('Erro ao reordenar aulas. Recarregando lista.');
            fetchSchedules(selectedClassId); // Revert on fail
        }
    };

    // Group schedules by day of week
    const groupedSchedules = schedules.reduce((acc, schedule) => {
        if (!acc[schedule.day_of_week]) {
            acc[schedule.day_of_week] = [];
        }
        acc[schedule.day_of_week].push(schedule);
        return acc;
    }, {} as Record<number, Schedule[]>);

    // Sort schedules inside each day by start time
    Object.keys(groupedSchedules).forEach(day => {
        groupedSchedules[parseInt(day)].sort((a, b) => a.start_time.localeCompare(b.start_time));
    });

    const workingDays = [1, 2, 3, 4, 5]; // Mon-Fri
    // Optional weekend days if it has schedules
    if (groupedSchedules[0] && groupedSchedules[0].length > 0) workingDays.unshift(0);
    if (groupedSchedules[6] && groupedSchedules[6].length > 0) workingDays.push(6);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gerenciar Horários" />

            <div className="p-6 space-y-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Gerenciamento de Grade Curricular</h2>
                        <p className="text-muted-foreground">Construa e visualize a grade de horários de cada turma de forma interativa. <strong>Arraste as aulas para reordená-las.</strong></p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Form and Selection Column (1/4 width) */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-primary/20 bg-card">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg flex items-center">
                                    <Users className="w-5 h-5 mr-2 text-primary" />
                                    Selecionar Turma
                                </CardTitle>
                                <CardDescription>Escolha a turma que deseja gerenciar.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                                    <SelectTrigger className="w-full font-medium">
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
                            </CardContent>
                        </Card>

                        {selectedClassId && (
                            <Card className="shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-lg">Adicionar Nova Aula</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <Label>Disciplina</Label>
                                            <Select
                                                value={data.subject_id}
                                                onValueChange={(v) => setData('subject_id', v)}
                                            >
                                                <SelectTrigger className="border-input mt-1">
                                                    <SelectValue placeholder="Qual disciplina?" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {subjects.map((s) => (
                                                        <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.subject_id && <span className="text-red-500 text-xs mt-1 block">{errors.subject_id}</span>}
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="col-span-2">
                                                <Label>Dia da Semana</Label>
                                                <Select
                                                    value={data.day_of_week.toString()}
                                                    onValueChange={(v) => setData('day_of_week', v)}
                                                >
                                                    <SelectTrigger className="mt-1">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {DAYS.map((day, idx) => (
                                                            <SelectItem key={idx} value={idx.toString()}>{day}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.day_of_week && <span className="text-red-500 text-xs mt-1 block">{errors.day_of_week}</span>}
                                            </div>

                                            <div>
                                                <Label>Início</Label>
                                                <Input
                                                    type="time"
                                                    value={data.start_time}
                                                    onChange={e => setData('start_time', e.target.value)}
                                                    className="mt-1"
                                                />
                                                {errors.start_time && <span className="text-red-500 text-xs mt-1 block">{errors.start_time}</span>}
                                            </div>
                                            <div>
                                                <Label>Fim</Label>
                                                <Input
                                                    type="time"
                                                    value={data.end_time}
                                                    onChange={e => setData('end_time', e.target.value)}
                                                    className="mt-1"
                                                />
                                                {errors.end_time && <span className="text-red-500 text-xs mt-1 block">{errors.end_time}</span>}
                                            </div>
                                        </div>

                                        <Button type="submit" className="w-full mt-2" disabled={processing}>
                                            <Plus className="w-4 h-4 mr-2" />
                                            {processing ? 'Adicionando...' : 'Adicionar Aula'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Schedule Grid Column (3/4 width) */}
                    <div className="lg:col-span-3">
                        {!selectedClassId ? (
                            <div className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed rounded-xl bg-card/50 text-muted-foreground">
                                <CalendarIcon className="w-16 h-16 opacity-20 mb-4" />
                                <p className="text-lg font-medium">Selecione uma turma para ver a grade de horários.</p>
                            </div>
                        ) : loading ? (
                            <div className="h-[400px] flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                                    {workingDays.map(dayKey => {
                                        const daySchedules = groupedSchedules[dayKey] || [];
                                        return (
                                            <Card key={dayKey} className="flex flex-col h-full shadow-sm border-border/50">
                                                <CardHeader className="py-3 items-center border-b bg-muted/30">
                                                    <CardTitle className="text-base font-semibold">{DAYS[dayKey]}</CardTitle>
                                                </CardHeader>
                                                <Droppable droppableId={dayKey.toString()}>
                                                    {(provided, snapshot) => (
                                                        <CardContent
                                                            className={`p-3 flex-1 space-y-3 transition-colors ${snapshot.isDraggingOver ? 'bg-primary/5' : 'bg-card/50'}`}
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                        >
                                                            {daySchedules.length === 0 ? (
                                                                <div className="text-center text-muted-foreground text-xs py-8 flex flex-col items-center justify-center opacity-50">
                                                                    <span>Sem aulas cadastradas</span>
                                                                </div>
                                                            ) : (
                                                                daySchedules.map((schedule, idx) => (
                                                                    <Draggable key={schedule.id.toString()} draggableId={schedule.id.toString()} index={idx}>
                                                                        {(provided, snapshot) => (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                className={`group flex items-stretch bg-card rounded-md border shadow-sm transition-all relative overflow-hidden ${snapshot.isDragging ? 'shadow-lg border-primary/50 z-50 rotate-1' : 'hover:border-primary/30 hover:shadow-md'}`}
                                                                            >
                                                                                <div
                                                                                    {...provided.dragHandleProps}
                                                                                    className="w-8 flex items-center justify-center bg-muted/50 text-muted-foreground border-r group-hover:bg-primary/10 group-hover:text-primary transition-colors cursor-grab active:cursor-grabbing"
                                                                                    title="Arraste para reordenar"
                                                                                >
                                                                                    <GripVertical className="w-4 h-4" />
                                                                                </div>
                                                                                <div className="flex-1 p-3">
                                                                                    <div className="flex justify-between items-start mb-2">
                                                                                        <div className="font-semibold text-sm leading-tight text-foreground pr-4 line-clamp-2" title={schedule.subject.name}>
                                                                                            {schedule.subject.name}
                                                                                        </div>
                                                                                        <button
                                                                                            onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                handleDelete(schedule.id);
                                                                                            }}
                                                                                            className="text-muted-foreground hover:text-destructive transition-colors -mr-1 -mt-1 p-1 z-10 relative"
                                                                                            title="Remover horário"
                                                                                        >
                                                                                            <Trash2 className="w-4 h-4 opacity-50 hover:opacity-100" />
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className="flex items-center text-muted-foreground text-[11px] font-mono">
                                                                                        <Clock className="w-3 h-3 mr-1.5 opacity-70" />
                                                                                        {schedule.start_time.slice(0, 5)} - {schedule.end_time.slice(0, 5)}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                ))
                                                            )}
                                                            {provided.placeholder}
                                                        </CardContent>
                                                    )}
                                                </Droppable>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </DragDropContext>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
