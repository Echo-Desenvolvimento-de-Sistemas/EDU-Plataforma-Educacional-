import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Trash2, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Calendário Escolar', href: '/events' },
];

interface Event {
    id: number;
    title: string;
    description: string | null;
    start_date: string;
    end_date: string;
    type: string;
    created_by: number;
    target_audience?: string[] | null;
}

interface ClassSchedule {
    id: number;
    day_of_week: number;
    start_time: string;
    end_time: string;
    subject: { name: string };
    class_room: { name: string };
}

interface Props {
    can_edit: boolean;
    user_role: string;
}

export default function CalendarIndex({ can_edit, user_role }: Props) {
    const { auth } = usePage().props as any;
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState<Event[]>([]);
    const [classSchedules, setClassSchedules] = useState<ClassSchedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        start_date: '',
        start_time: '08:00',
        end_date: '',
        end_time: '09:00',
        type: 'event',
        target_audience: ['professor', 'aluno', 'responsavel'] as string[],
    });

    useEffect(() => {
        fetchCalendarData();
    }, [currentMonth]);

    const fetchCalendarData = async () => {
        setLoading(true);
        try {
            const start = startOfWeek(startOfMonth(currentMonth));
            const end = endOfWeek(endOfMonth(currentMonth));
            const response = await axios.get(`/events?start=${start.toISOString()}&end=${end.toISOString()}`, {
                headers: { 'Accept': 'application/json' }
            });
            setEvents(response.data.events);
            setClassSchedules(response.data.classSchedules);
        } catch (error) {
            toast.error('Erro ao carregar os dados do calendário.');
        } finally {
            setLoading(false);
        }
    };

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const onDateClick = (day: Date) => setSelectedDate(day);

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();

        const startDateTime = `${newEvent.start_date} ${newEvent.start_time}:00`;
        const endDateTime = newEvent.end_date ? `${newEvent.end_date} ${newEvent.end_time}:00` : startDateTime;

        setIsSubmitting(true);
        try {
            const response = await axios.post('/events', {
                ...newEvent,
                start_date: startDateTime,
                end_date: endDateTime,
            });
            fetchCalendarData(); // Refresh to ensure correct format
            toast.success('Evento adicionado!');
            setIsAddModalOpen(false);
            setNewEvent({ title: '', description: '', start_date: '', start_time: '08:00', end_date: '', end_time: '09:00', type: 'event', target_audience: ['professor', 'aluno', 'responsavel'] });
        } catch (error) {
            toast.error('Erro ao salvar evento. Verifique as datas.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteEvent = async (eventId: number) => {
        if (!confirm('Deseja realmente excluir este evento?')) return;
        setDeletingId(eventId);
        try {
            await axios.delete(`/events/${eventId}`);
            setEvents(events.filter(ev => ev.id !== eventId));
            toast.success('Evento excluído.');
        } catch (error) {
            toast.error('Erro ao excluir evento. Apenas seus próprios eventos podem ser excluídos se você for professor.');
        } finally {
            setDeletingId(null);
        }
    };

    // Calculate dates to render on the month grid
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, dateFormat);
            const cloneDay = day;

            // Check if there are events or classes on this day
            const dayEvents = events.filter(e => isSameDay(parseISO(e.start_date), cloneDay));
            const dayOfWeek = day.getDay();
            const dayClasses = classSchedules.filter(c => c.day_of_week === dayOfWeek);

            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, monthStart);

            days.push(
                <div
                    key={day.toString()}
                    className={`min-h-[100px] border border-border/50 p-2 transition-all cursor-pointer overflow-hidden flex flex-col
                        ${!isCurrentMonth ? "bg-muted/10 text-muted-foreground/50" : "bg-card hover:bg-muted/30"}
                        ${isSelected ? "ring-2 ring-primary ring-inset" : ""}
                    `}
                    onClick={() => onDateClick(cloneDay)}
                >
                    <div className="flex justify-end mb-1">
                        <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                            ${isSameDay(day, new Date()) ? "bg-primary text-primary-foreground" : ""}
                        `}>
                            {formattedDate}
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto hide-scrollbar space-y-1">
                        {/* Render Events */}
                        {dayEvents.map(e => (
                            <div key={e.id} className={`text-xs p-1 rounded font-medium truncate
                                ${e.type === 'academic' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                    e.type === 'holiday' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                        e.type === 'meeting' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}
                            `}>
                                {e.title}
                            </div>
                        ))}
                        {/* Render Class Dots if too many to list */}
                        {dayClasses.length > 0 && isCurrentMonth && (
                            <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                {dayClasses.length} aula(s)
                            </div>
                        )}
                    </div>
                </div>
            );
            day = addDays(day, 1);
        }
    }

    // Prepare details for selected day
    const selectedDayEvents = events.filter(e => isSameDay(parseISO(e.start_date), selectedDate));
    const selectedDayClasses = classSchedules.filter(c => c.day_of_week === selectedDate.getDay()).sort((a, b) => a.start_time.localeCompare(b.start_time));

    const pageTitle = (user_role === 'admin' || user_role === 'secretaria') ? 'Calendário Escolar' : 'Meu Calendário';
    const pageDescription = (user_role === 'admin' || user_role === 'secretaria')
        ? 'Gerencie os eventos globais da instituição.'
        : 'Visualize suas aulas semanais e gerencie eventos.';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />
            <div className="p-6 max-w-7xl mx-auto space-y-6">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
                        <p className="text-muted-foreground">{pageDescription}</p>
                    </div>

                    {can_edit && (
                        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={() => setNewEvent({ ...newEvent, start_date: format(selectedDate, 'yyyy-MM-dd'), end_date: format(selectedDate, 'yyyy-MM-dd') })}>
                                    <Plus className="w-4 h-4 mr-2" /> Novo Evento
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Adicionar Evento</DialogTitle>
                                    <DialogDescription>Crie um novo evento no seu calendário.</DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleAddEvent} className="space-y-4">
                                    <div>
                                        <Label>Título</Label>
                                        <Input required value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Ex: Prova Bimestral" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Data Início</Label>
                                            <Input type="date" required value={newEvent.start_date} onChange={e => setNewEvent({ ...newEvent, start_date: e.target.value })} />
                                        </div>
                                        <div>
                                            <Label>Hora Início</Label>
                                            <Input type="time" required value={newEvent.start_time} onChange={e => setNewEvent({ ...newEvent, start_time: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Data Fim (Opcional)</Label>
                                            <Input type="date" value={newEvent.end_date} onChange={e => setNewEvent({ ...newEvent, end_date: e.target.value })} />
                                        </div>
                                        <div>
                                            <Label>Hora Fim</Label>
                                            <Input type="time" value={newEvent.end_time} onChange={e => setNewEvent({ ...newEvent, end_time: e.target.value })} />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Tipo</Label>
                                        <Select value={newEvent.type} onValueChange={v => setNewEvent({ ...newEvent, type: v })}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="academic">Acadêmico</SelectItem>
                                                <SelectItem value="holiday">Feriado</SelectItem>
                                                <SelectItem value="meeting">Reunião</SelectItem>
                                                <SelectItem value="event">Evento</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {(user_role === 'admin' || user_role === 'secretaria') && (
                                        <div className="space-y-3">
                                            <Label>Visibilidade (Quem pode ver?)</Label>
                                            <div className="flex flex-wrap gap-4">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="vis-prof"
                                                        checked={newEvent.target_audience?.includes('professor')}
                                                        onCheckedChange={(checked) => {
                                                            const current = newEvent.target_audience || [];
                                                            if (checked) {
                                                                setNewEvent({ ...newEvent, target_audience: [...current, 'professor'] });
                                                            } else {
                                                                setNewEvent({ ...newEvent, target_audience: current.filter(r => r !== 'professor') });
                                                            }
                                                        }}
                                                    />
                                                    <label htmlFor="vis-prof" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Professores
                                                    </label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="vis-student"
                                                        checked={newEvent.target_audience?.includes('aluno')}
                                                        onCheckedChange={(checked) => {
                                                            const current = newEvent.target_audience || [];
                                                            if (checked) {
                                                                setNewEvent({ ...newEvent, target_audience: [...current, 'aluno'] });
                                                            } else {
                                                                setNewEvent({ ...newEvent, target_audience: current.filter(r => r !== 'aluno') });
                                                            }
                                                        }}
                                                    />
                                                    <label htmlFor="vis-student" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Alunos
                                                    </label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="vis-guardian"
                                                        checked={newEvent.target_audience?.includes('responsavel')}
                                                        onCheckedChange={(checked) => {
                                                            const current = newEvent.target_audience || [];
                                                            if (checked) {
                                                                setNewEvent({ ...newEvent, target_audience: [...current, 'responsavel'] });
                                                            } else {
                                                                setNewEvent({ ...newEvent, target_audience: current.filter(r => r !== 'responsavel') });
                                                            }
                                                        }}
                                                    />
                                                    <label htmlFor="vis-guardian" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Responsáveis
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {user_role === 'professor' && (
                                        <div className="bg-muted p-3 rounded-md text-sm text-muted-foreground">
                                            Os eventos que você cria ficarão visíveis apenas para você e seus alunos.
                                        </div>
                                    )}

                                    <div>
                                        <Label>Descrição (Opcional)</Label>
                                        <Input value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent flex items-center justify-center rounded-full animate-spin mr-2"></div>
                                                Salvando...
                                            </>
                                        ) : (
                                            "Salvar Evento"
                                        )}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Calendar Grid */}
                    <Card className="lg:col-span-3 shadow-sm border-border/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
                            <h2 className="text-xl font-semibold capitalize">
                                {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
                            </h2>
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" onClick={prevMonth}>
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" onClick={() => setCurrentMonth(new Date())}>
                                    Hoje
                                </Button>
                                <Button variant="outline" size="icon" onClick={nextMonth}>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {/* Days of week header */}
                            <div className="grid grid-cols-7 bg-muted/30 border-b border-border/50">
                                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                                    <div key={d} className="py-2 text-center text-sm font-semibold text-muted-foreground">{d}</div>
                                ))}
                            </div>
                            {/* Calendar Body */}
                            <div className="grid grid-cols-7">
                                {days}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Side Panel for Date Details */}
                    <div className="space-y-6">
                        <Card className="shadow-sm border-border/50 bg-muted/10 h-full">
                            <CardHeader className="pb-3 border-b border-border/50">
                                <CardTitle className="text-lg flex items-center">
                                    <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
                                    {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                                </CardTitle>
                                <CardDescription className="capitalize">{format(selectedDate, "EEEE", { locale: ptBR })}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 space-y-6">
                                {/* Events Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 tracking-wider uppercase">Eventos</h3>
                                    {selectedDayEvents.length === 0 ? (
                                        <p className="text-sm text-muted-foreground italic">Nenhum evento neste dia.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {selectedDayEvents.map(e => (
                                                <div key={e.id} className="bg-card p-3 rounded-md border shadow-sm relative group">
                                                    <div className="font-semibold text-sm pr-6 leading-tight mb-1">{e.title}</div>
                                                    {e.description && <div className="text-xs text-muted-foreground mb-2">{e.description}</div>}
                                                    <div className="text-[11px] font-mono flex items-center text-muted-foreground">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {format(parseISO(e.start_date), "HH:mm")} - {e.end_date ? format(parseISO(e.end_date), "HH:mm") : ''}
                                                    </div>
                                                    {(user_role === 'admin' || user_role === 'secretaria' || e.created_by === auth.user.id) && (
                                                        <button
                                                            onClick={() => handleDeleteEvent(e.id)}
                                                            disabled={deletingId === e.id}
                                                            className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-md bg-background/80 hover:bg-background text-muted-foreground hover:text-destructive opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all shadow-sm"
                                                        >
                                                            {deletingId === e.id ? (
                                                                <div className="w-3 h-3 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
                                                            ) : (
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Classes Section */}
                                {(user_role === 'professor' || user_role === 'aluno') && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted-foreground mb-3 tracking-wider uppercase">Minhas Aulas</h3>
                                        {selectedDayClasses.length === 0 ? (
                                            <p className="text-sm text-muted-foreground italic">Sem aulas programadas para este dia da semana.</p>
                                        ) : (
                                            <div className="space-y-2">
                                                {selectedDayClasses.map(c => (
                                                    <div key={c.id} className="flex items-center gap-3 bg-card p-2 rounded-md border shadow-sm">
                                                        <div className="bg-primary/10 text-primary font-mono text-xs px-2 py-1 rounded">
                                                            {c.start_time.slice(0, 5)}
                                                        </div>
                                                        <div className="flex-1 overflow-hidden">
                                                            <div className="text-sm font-bold truncate" title={c.subject.name}>{c.subject.name}</div>
                                                            <div className="text-xs text-muted-foreground flex items-center truncate">
                                                                <MapPin className="w-3 h-3 mr-1" /> {c.class_room.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}

