import React, { useState, useMemo } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, Search, X, Users, GraduationCap, UserCheck } from 'lucide-react';

interface Channel {
    id: number;
    name: string;
}

interface ClassRoom {
    id: number;
    name: string;
    grade?: { name: string };
}

interface Student {
    id: number;
    name: string;
    class_room_id?: number;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    channels: Channel[]; 
    classes?: ClassRoom[];
    students?: Student[];
    submitUrl?: string;
}

export function ComposeModal({ isOpen, onClose, channels, classes = [], students = [], submitUrl = '/admin/agenda/message' }: Props) {
    const [studentSearch, setStudentSearch] = useState('');
    const [classFilter, setClassFilter] = useState<string>('all');

    const { data, setData, post, processing, reset, errors } = useForm({
        recipient_type: 'CHANNEL' as 'CHANNEL' | 'CLASS' | 'STUDENT',
        channel_id: '',
        class_room_id: '',
        student_ids: [] as number[],
        title: '',
        body: '',
        type: 'NOTICE',
        target_audience: 'both' as 'student' | 'guardian' | 'both',
        banner_image: null as File | null,
        attachments: [] as File[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(submitUrl, {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setStudentSearch('');
                setClassFilter('all');
                onClose();
            },
        });
    };

    const toggleStudent = (studentId: number) => {
        setData('student_ids', 
            data.student_ids.includes(studentId) 
                ? data.student_ids.filter(id => id !== studentId)
                : [...data.student_ids, studentId]
        );
    };

    const filteredStudents = useMemo(() => {
        let result = students;
        if (classFilter !== 'all') {
            result = result.filter(s => s.class_room_id === parseInt(classFilter));
        }
        if (studentSearch.trim()) {
            result = result.filter(s => s.name.toLowerCase().includes(studentSearch.toLowerCase()));
        }
        return result;
    }, [students, classFilter, studentSearch]);

    const selectedStudents = useMemo(() => {
        return students.filter(s => data.student_ids.includes(s.id));
    }, [students, data.student_ids]);

    const messageTypes = [
        { value: 'NOTICE', label: 'Aviso', color: 'bg-amber-500' },
        { value: 'EVENT', label: 'Evento', color: 'bg-blue-500' },
        { value: 'FINANCIAL', label: 'Financeiro', color: 'bg-green-500' },
        { value: 'URGENT', label: 'Urgente', color: 'bg-red-500' },
        { value: 'HOMEWORK', label: 'Atividade de Casa', color: 'bg-violet-500' },
    ];

    const showTargetAudience = data.recipient_type === 'CLASS' || data.recipient_type === 'STUDENT';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[560px] w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Nova Mensagem</DialogTitle>
                    <DialogDescription>
                        Envie avisos, eventos ou comunicados para canais, turmas ou alunos específicos.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                        {/* Recipient Type Selector - Only for staff */}
                        {(channels.length > 0 && !['aluno', 'responsavel'].includes(usePage<any>().props.data?.user?.role)) && (
                            <div className="flex flex-col gap-2">
                                <Label>Enviar para:</Label>
                                <div className="flex gap-2">
                                    <Button 
                                        type="button" 
                                        variant={data.recipient_type === 'CHANNEL' ? 'default' : 'outline'}
                                        className="flex-1"
                                        onClick={() => setData('recipient_type', 'CHANNEL')}
                                    >
                                        📢 Canais
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant={data.recipient_type === 'CLASS' ? 'default' : 'outline'}
                                        className="flex-1"
                                        onClick={() => setData('recipient_type', 'CLASS')}
                                    >
                                        🏫 Turmas
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant={data.recipient_type === 'STUDENT' ? 'default' : 'outline'}
                                        className="flex-1"
                                        onClick={() => setData('recipient_type', 'STUDENT')}
                                    >
                                        🎓 Alunos
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Channel Selector */}
                        {data.recipient_type === 'CHANNEL' && (
                            <div className="space-y-2">
                                <Select
                                    value={data.channel_id}
                                    onValueChange={(value) => setData('channel_id', value)}
                                >
                                    <SelectTrigger id="channel">
                                        <SelectValue placeholder="Selecione um canal..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {channels.map((channel) => (
                                            <SelectItem key={channel.id} value={channel.id.toString()}>
                                                {channel.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.channel_id && <p className="text-sm text-destructive">{errors.channel_id}</p>}
                            </div>
                        )}

                        {/* Class Selector */}
                        {data.recipient_type === 'CLASS' && (
                            <div className="space-y-2">
                                <Select
                                    value={data.class_room_id}
                                    onValueChange={(value) => setData('class_room_id', value)}
                                >
                                    <SelectTrigger id="class_room">
                                        <SelectValue placeholder="Selecione uma turma..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classes.map((cls) => (
                                            <SelectItem key={cls.id} value={cls.id.toString()}>
                                                {cls.name} {cls.grade?.name ? `(${cls.grade.name})` : ''}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.class_room_id && <p className="text-sm text-destructive">{errors.class_room_id}</p>}
                            </div>
                        )}

                        {/* Multi-Student Selector */}
                        {data.recipient_type === 'STUDENT' && (
                            <div className="space-y-3">
                                {/* Selected Students Badges */}
                                {selectedStudents.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedStudents.map(s => (
                                            <Badge key={s.id} variant="secondary" className="pr-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-none">
                                                {s.name}
                                                <button type="button" onClick={() => toggleStudent(s.id)} className="ml-1.5 rounded-full hover:bg-destructive hover:text-white p-0.5 transition-colors">
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                        <button type="button" onClick={() => setData('student_ids', [])} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
                                            Limpar todos
                                        </button>
                                    </div>
                                )}

                                {/* Filters */}
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input 
                                            placeholder="Buscar aluno..." 
                                            className="pl-9 h-9"
                                            value={studentSearch}
                                            onChange={(e) => setStudentSearch(e.target.value)}
                                        />
                                    </div>
                                    <Select value={classFilter} onValueChange={setClassFilter}>
                                        <SelectTrigger className="w-[140px] h-9">
                                            <SelectValue placeholder="Turma" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas</SelectItem>
                                            {classes.map(cls => (
                                                <SelectItem key={cls.id} value={cls.id.toString()}>
                                                    {cls.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Student List */}
                                <div className="max-h-[200px] overflow-y-auto border rounded-lg divide-y dark:divide-gray-700">
                                    {filteredStudents.length === 0 ? (
                                        <p className="text-center py-6 text-sm text-muted-foreground">Nenhum aluno encontrado.</p>
                                    ) : (
                                        filteredStudents.map(student => (
                                            <label
                                                key={student.id}
                                                className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-secondary/50 transition-colors"
                                            >
                                                <Checkbox 
                                                    checked={data.student_ids.includes(student.id)}
                                                    onCheckedChange={() => toggleStudent(student.id)}
                                                />
                                                <span className="text-sm font-medium flex-1">{student.name}</span>
                                                {student.class_room_id && (
                                                    <span className="text-[10px] text-muted-foreground">
                                                        {classes.find(c => c.id === student.class_room_id)?.name}
                                                    </span>
                                                )}
                                            </label>
                                        ))
                                    )}
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    {data.student_ids.length} aluno{data.student_ids.length !== 1 ? 's' : ''} selecionado{data.student_ids.length !== 1 ? 's' : ''}
                                </p>
                                {errors.student_ids && <p className="text-sm text-destructive">{errors.student_ids}</p>}
                            </div>
                        )}

                        {/* Target Audience — only for CLASS and STUDENT */}
                        {showTargetAudience && (
                            <div className="space-y-2">
                                <Label className="text-sm">Destinatários da mensagem:</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        type="button"
                                        className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all text-xs font-medium ${
                                            data.target_audience === 'student'
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-border hover:border-primary/30'
                                        }`}
                                        onClick={() => setData('target_audience', 'student')}
                                    >
                                        <GraduationCap className="h-5 w-5" />
                                        Somente Alunos
                                    </button>
                                    <button
                                        type="button"
                                        className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all text-xs font-medium ${
                                            data.target_audience === 'guardian'
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-border hover:border-primary/30'
                                        }`}
                                        onClick={() => setData('target_audience', 'guardian')}
                                    >
                                        <UserCheck className="h-5 w-5" />
                                        Somente Responsáveis
                                    </button>
                                    <button
                                        type="button"
                                        className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all text-xs font-medium ${
                                            data.target_audience === 'both'
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-border hover:border-primary/30'
                                        }`}
                                        onClick={() => setData('target_audience', 'both')}
                                    >
                                        <Users className="h-5 w-5" />
                                        Ambos
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Message Type & Title */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Tipo:</Label>
                            <Select
                                value={data.type}
                                onValueChange={(value) => setData('type', value)}
                            >
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {messageTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${type.color}`} />
                                                {type.label}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Título (Opcional):</Label>
                        <Input
                            id="title"
                            placeholder="Ex: Reunião de Pais"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="banner_image">Imagem de Capa (Opcional):</Label>
                        <Input
                            id="banner_image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('banner_image', e.target.files ? e.target.files[0] : null)}
                        />
                        {errors.banner_image && <p className="text-sm text-destructive">{errors.banner_image}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="attachments">Anexos (Opcional):</Label>
                        <Input
                            id="attachments"
                            type="file"
                            multiple
                            onChange={(e) => {
                                if (e.target.files) {
                                    setData('attachments', Array.from(e.target.files));
                                }
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Mensagem:</Label>
                        <Textarea
                            id="message"
                            placeholder="Digite sua mensagem aqui..."
                            className="min-h-[120px]"
                            value={data.body}
                            onChange={(e) => setData('body', e.target.value)}
                        />
                        {errors.body && <p className="text-sm text-destructive">{errors.body}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={processing}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Enviar
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
