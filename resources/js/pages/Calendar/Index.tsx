import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    isToday,
    parseISO,
    startOfMonth,
    startOfWeek,
    subMonths,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock, MapPin, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Calendário Escolar', href: '/events' },
];

interface SchoolEvent {
    id: number;
    title: string;
    description?: string;
    start_date: string;
    end_date?: string;
    type: 'academic' | 'holiday' | 'event' | 'meeting';
    created_by: number;
    target_audience?: string[]; // 'professor', 'aluno', 'responsavel'
}

interface Props {
    can_edit: boolean;
}

export default function CalendarIndex({ can_edit }: Props) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<SchoolEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<SchoolEvent | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_date: '',
        start_time: '08:00',
        end_date: '',
        end_time: '09:00',

        type: 'event',
        target_audience: ['professor', 'aluno', 'responsavel'] as string[],
    });

    const fetchEvents = async () => {
        try {
            // Fetch for current month view (plus buffer)
            const start = startOfWeek(startOfMonth(currentDate));
            const end = endOfWeek(endOfMonth(currentDate));

            const response = await fetch(`/events?start=${start.toISOString()}&end=${end.toISOString()}`, {
                headers: { 'Accept': 'application/json' }
            });
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Failed to fetch events", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [currentDate]);

    // Calendar Grid Generation
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    const handleDateClick = (day: Date) => {
        setSelectedDate(day);
        if (can_edit) {
            setFormData({ ...formData, start_date: format(day, 'yyyy-MM-dd'), end_date: format(day, 'yyyy-MM-dd') });
            setEditingEvent(null);
            setIsModalOpen(true);
        }
    };

    const handleEventClick = (e: React.MouseEvent, event: SchoolEvent) => {
        e.stopPropagation();
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description || '',
            start_date: format(parseISO(event.start_date), 'yyyy-MM-dd'),
            start_time: format(parseISO(event.start_date), 'HH:mm'),
            end_date: event.end_date ? format(parseISO(event.end_date), 'yyyy-MM-dd') : format(parseISO(event.start_date), 'yyyy-MM-dd'),
            end_time: event.end_date ? format(parseISO(event.end_date), 'HH:mm') : '09:00',
            type: event.type,
            target_audience: event.target_audience || ['professor', 'aluno', 'responsavel']
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const startDateTime = `${formData.start_date} ${formData.start_time}:00`;
        const endDateTime = formData.end_date ? `${formData.end_date} ${formData.end_time}:00` : null;

        const payload = {
            title: formData.title,
            description: formData.description,
            start_date: startDateTime,
            end_date: endDateTime,
            type: formData.type,
            target_audience: formData.target_audience
        };

        if (editingEvent) {
            router.put(`/events/${editingEvent.id}`, payload, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    fetchEvents();
                    toast.success('Evento atualizado!');
                }
            });
        } else {
            router.post('/events', payload, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    fetchEvents();
                    toast.success('Evento criado!');
                }
            });
        }
    };

    const handleDelete = () => {
        if (!editingEvent) return;
        if (confirm('Tem certeza que deseja excluir este evento?')) {
            router.delete(`/events/${editingEvent.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    fetchEvents();
                    toast.success('Evento excluído!');
                }
            });
        }
    };

    const getEventTypeColor = (type: string) => {
        switch (type) {
            case 'academic': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
            case 'holiday': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300';
            case 'meeting': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Calendário Escolar" />

            <div className="p-4 max-w-7xl mx-auto flex flex-col h-[calc(100vh-4rem)]">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold capitalize">
                            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                        </h1>
                        <div className="flex items-center bg-white dark:bg-gray-800 rounded-md border shadow-sm">
                            <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
                            <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    {can_edit && (
                        <Button onClick={() => {
                            setEditingEvent(null);
                            setFormData({
                                title: '', description: '',
                                start_date: format(new Date(), 'yyyy-MM-dd'), start_time: '08:00',
                                end_date: format(new Date(), 'yyyy-MM-dd'), end_time: '09:00',
                                type: 'event',
                                target_audience: ['professor', 'aluno', 'responsavel']
                            });
                            setIsModalOpen(true);
                        }}>
                            <Plus className="w-4 h-4 mr-2" /> Novo Evento
                        </Button>
                    )}
                </div>

                {/* Calendar Grid */}
                <div className="flex-1 border rounded-xl bg-white dark:bg-gray-900 shadow-sm flex flex-col overflow-hidden">
                    {/* Week Days Header */}
                    <div className="grid grid-cols-7 border-b bg-gray-50 dark:bg-gray-800/50">
                        {weekDays.map(day => (
                            <div key={day} className="py-2 text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 flex-1 auto-rows-[1fr] overflow-y-auto">
                        {calendarDays.map((day, idx) => {
                            const isCurrentMonth = isSameMonth(day, monthStart);
                            const dayEvents = events.filter(e => isSameDay(parseISO(e.start_date), day));

                            return (
                                <div
                                    key={idx}
                                    onClick={() => handleDateClick(day)}
                                    className={`
                                        min-h-[100px] border-r border-b p-2 transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50
                                        ${!isCurrentMonth ? 'bg-gray-50/50 text-gray-400 dark:bg-gray-900/50 dark:text-gray-600' : ''}
                                        ${isToday(day) ? 'bg-blue-50/30 ring-inset ring-1 ring-blue-200 dark:ring-blue-800' : ''}
                                    `}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday(day) ? 'bg-blue-600 text-white' : ''}`}>
                                            {format(day, 'd')}
                                        </span>
                                    </div>

                                    <div className="mt-1 space-y-1">
                                        {dayEvents.map(event => (
                                            <div
                                                key={event.id}
                                                onClick={(e) => handleEventClick(e, event)}
                                                className={`text-xs px-2 py-1 rounded border truncate font-medium ${getEventTypeColor(event.type)}`}
                                            >
                                                {event.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Event Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingEvent ? 'Editar Evento' : 'Novo Evento'}</DialogTitle>
                        <DialogDescription>
                            {can_edit ? 'Preencha os detalhes do evento escolar.' : 'Detalhes do evento.'}
                        </DialogDescription>
                    </DialogHeader>

                    {can_edit ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label>Título</Label>
                                <Input
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Ex: Reunião de Pais" required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Data Início</Label>
                                    <Input
                                        type="date"
                                        value={formData.start_date}
                                        onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label>Hora Início</Label>
                                    <Input
                                        type="time"
                                        value={formData.start_time}
                                        onChange={e => setFormData({ ...formData, start_time: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Data Fim (Opcional)</Label>
                                    <Input
                                        type="date"
                                        value={formData.end_date}
                                        onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label>Hora Fim (Opcional)</Label>
                                    <Input
                                        type="time"
                                        value={formData.end_time}
                                        onChange={e => setFormData({ ...formData, end_time: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Tipo</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(val) => setFormData({ ...formData, type: val })}
                                >
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

                            <div className="space-y-3">
                                <Label>Visibilidade (Quem pode ver?)</Label>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="vis-prof"
                                            checked={formData.target_audience?.includes('professor')}
                                            onCheckedChange={(checked) => {
                                                const current = formData.target_audience || [];
                                                if (checked) {
                                                    setFormData({ ...formData, target_audience: [...current, 'professor'] });
                                                } else {
                                                    setFormData({ ...formData, target_audience: current.filter(r => r !== 'professor') });
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
                                            checked={formData.target_audience?.includes('aluno')}
                                            onCheckedChange={(checked) => {
                                                const current = formData.target_audience || [];
                                                if (checked) {
                                                    setFormData({ ...formData, target_audience: [...current, 'aluno'] });
                                                } else {
                                                    setFormData({ ...formData, target_audience: current.filter(r => r !== 'aluno') });
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
                                            checked={formData.target_audience?.includes('responsavel')}
                                            onCheckedChange={(checked) => {
                                                const current = formData.target_audience || [];
                                                if (checked) {
                                                    setFormData({ ...formData, target_audience: [...current, 'responsavel'] });
                                                } else {
                                                    setFormData({ ...formData, target_audience: current.filter(r => r !== 'responsavel') });
                                                }
                                            }}
                                        />
                                        <label htmlFor="vis-guardian" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Responsáveis
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label>Descrição</Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Detalhes adicionais..."
                                />
                            </div>

                            <DialogFooter>
                                {editingEvent && (
                                    <Button type="button" variant="destructive" onClick={handleDelete} className="mr-auto">
                                        Excluir
                                    </Button>
                                )}
                                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                                <Button type="submit">Salvar</Button>
                            </DialogFooter>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-lg">{editingEvent?.title}</h3>
                                <p className="text-sm text-muted-foreground capitalize">
                                    {editingEvent?.type} • {editingEvent && format(parseISO(editingEvent.start_date), 'dd/MM/yyyy HH:mm')}
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-sm whitespace-pre-wrap">
                                {editingEvent?.description || 'Sem descrição.'}
                            </div>
                            <DialogFooter>
                                <Button onClick={() => setIsModalOpen(false)}>Fechar</Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
