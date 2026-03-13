import React, { useState, useEffect, useRef } from 'react';
import { Head, router, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Plus, MessageSquare, Users, Radio, Send, Settings, Trash2,
    School, Smartphone, Loader2, Link as LinkIcon, LogOut, RefreshCw,
    MessageCircleMore, MailOpen,
} from 'lucide-react';
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { ComposeModal } from '../../Agenda/Components/ComposeModal';
import { GroupManager } from './Components/GroupManager';
import axios from 'axios';
import { toast } from 'sonner';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface User {
    id: number;
    name: string;
    role: string;
}

interface Channel {
    id: number;
    name: string;
    type: 'BROADCAST' | 'CLASS' | 'DIRECT';
    messages_count: number;
    can_reply?: boolean;
    created_at: string;
    icon?: string;
    speakers?: User[];
}

interface Group extends Omit<Channel, 'speakers'> {
    speakers: User[];
}

interface ClassRoom {
    id: number;
    name: string;
    series: string;
    letter: string;
    professors: User[];
    channel?: { id: number; name: string; speakers: User[] };
}

interface Props {
    channels: Channel[];
    groups: Group[];
    classes: ClassRoom[];
    students: any[];
    staff: User[];
    flash: { select_channel?: number };
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const channelTypeIcon = (type: string) => {
    if (type === 'BROADCAST') return <Radio className="h-4 w-4 text-muted-foreground" />;
    if (type === 'DIRECT') return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
    return <Users className="h-4 w-4 text-muted-foreground" />;
};

const channelTypeLabel: Record<string, string> = {
    BROADCAST: 'Transmissão',
    CLASS: 'Turma',
    DIRECT: 'Direto',
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function Index({ channels, groups, classes, students, staff }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [editingChannel, setEditingChannel] = useState<Channel | null>(null);
    const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    // WhatsApp state
    const [waStatus, setWaStatus] = useState<'open' | 'close' | 'connecting' | 'unknown'>('unknown');
    const [waQrCode, setWaQrCode] = useState<string | null>(null);
    const [waLoading, setWaLoading] = useState(false);
    const [waSendInterval, setWaSendInterval] = useState<string>('3');
    const [waSaving, setWaSaving] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        checkWaStatus();
        // Load saved interval
        axios.get('/admin/settings/whatsapp/interval').then(res => {
            setWaSendInterval(res.data?.value || '3');
        }).catch(() => {});
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, []);

    const checkWaStatus = () => {
        axios.get('/admin/settings/whatsapp/status')
            .then(res => {
                const state = res.data?.instance?.state || res.data?.state || 'close';
                setWaStatus(state);
            })
            .catch(() => setWaStatus('unknown'));
    };

    const pollStatus = () => {
        if (waStatus === 'open' || !intervalRef.current) return;
        axios.get('/admin/settings/whatsapp/status').then(statusRes => {
            const state = statusRes.data?.instance?.state || statusRes.data?.state;
            if (state === 'open') {
                setWaStatus('open');
                setWaQrCode(null);
                if (intervalRef.current) { clearTimeout(intervalRef.current); intervalRef.current = null; }
                toast.success('WhatsApp Conectado!', { id: 'wa-connection' });
            } else if (waQrCode) {
                intervalRef.current = setTimeout(pollStatus, 3000);
            }
        }).catch(() => { if (waQrCode) intervalRef.current = setTimeout(pollStatus, 5000); });
    };

    const handleConnectWa = () => {
        if (waLoading || waStatus === 'open') return;
        setWaLoading(true);
        axios.post('/admin/settings/whatsapp/connect')
            .then(res => {
                if (res.data?.base64) {
                    setWaQrCode(res.data.base64);
                    if (intervalRef.current) clearTimeout(intervalRef.current);
                    intervalRef.current = setTimeout(pollStatus, 2000);
                } else if (res.data?.instance?.state === 'open') {
                    setWaStatus('open');
                    toast.success('WhatsApp já está conectado!', { id: 'wa-connection' });
                } else {
                    toast.error(`Não foi possível gerar o QR Code: ${res.data?.error || 'Erro desconhecido.'}`, { id: 'wa-error' });
                }
            })
            .catch(err => toast.error(`Erro: ${err.response?.data?.message || 'Erro ao conectar.'}`, { id: 'wa-error' }))
            .finally(() => setWaLoading(false));
    };

    const handleDisconnectWa = () => {
        if (confirm('Tem certeza que deseja desconectar?')) {
            router.post('/admin/settings/whatsapp/disconnect', {}, {
                onSuccess: () => { setWaStatus('close'); setWaQrCode(null); }
            });
        }
    };

    // Channel forms
    const createForm = useForm({ name: '', type: 'BROADCAST', icon: null as File | null, speakers: [] as number[], can_reply: false });
    const editForm = useForm({ name: '', icon: null as File | null, _method: 'put' });

    const handleCreateChannel = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/admin/agenda', { forceFormData: true, onSuccess: () => { setIsCreateOpen(false); createForm.reset(); } });
    };

    const handleEditChannel = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingChannel) return;
        editForm.post(`/admin/agenda/${editingChannel.id}`, { forceFormData: true, onSuccess: () => { setEditingChannel(null); editForm.reset(); } });
    };

    const openEditModal = (channel: Channel) => {
        setEditingChannel(channel);
        editForm.setData({ name: channel.name, icon: null, _method: 'put' });
    };

    const handleDeleteChannel = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este canal?')) {
            router.delete(`/admin/agenda/${id}`, { preserveScroll: true });
        }
    };

    // Class channels
    const handleEnableClassChannel = (cls: ClassRoom) => {
        const parts = [cls.series, cls.letter].filter(Boolean).join(' ');
        const finalName = parts ? parts : cls.name;
        router.post('/admin/agenda', { name: finalName, type: 'CLASS', related_type: 'App\\Models\\ClassRoom', related_id: cls.id }, { preserveScroll: true });
    };

    const handleDisableClassChannel = (channelId: number) => {
        if (confirm('Desabilitar o canal? As mensagens serão mantidas.')) {
            router.delete(`/admin/agenda/${channelId}`, { preserveScroll: true, onSuccess: () => toast.success('Canal desabilitado.') });
        }
    };

    // Groups
    const handleCreateGroup = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/admin/agenda', { name: newGroupName, type: 'BROADCAST' }, {
            onSuccess: () => { setIsCreateGroupOpen(false); setNewGroupName(''); }
        });
    };

    // Counts
    const broadcastCount = channels.filter(c => c.type === 'BROADCAST').length;
    const classCount = channels.filter(c => c.type === 'CLASS').length;
    const directCount = channels.filter(c => c.type === 'DIRECT').length;

    return (
        <AppLayout breadcrumbs={[{ title: 'Agenda Digital', href: '/admin/agenda' }]}>
            <Head title="Agenda Digital" />
            <div className="space-y-6 p-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Agenda Digital</h1>
                        <p className="text-muted-foreground mt-1">Gerencie canais, mensagens e configurações em um só lugar.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={() => setIsComposeOpen(true)}>
                            <Send className="mr-2 h-4 w-4" />
                            Enviar Mensagem
                        </Button>
                        <Link href="/agenda/inbox">
                            <Button variant="outline">
                                <MailOpen className="mr-2 h-4 w-4" />
                                Abrir Inbox
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="pt-4 pb-4 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                <Radio className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{broadcastCount}</p>
                                <p className="text-xs text-muted-foreground">Canais de Transmissão</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-4 pb-4 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{classCount}</p>
                                <p className="text-xs text-muted-foreground">Canais de Turmas</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-4 pb-4 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                                <MessageCircleMore className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{directCount}</p>
                                <p className="text-xs text-muted-foreground">Chats Diretos</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ─── Tabs ─── */}
                <Tabs defaultValue="channels" className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="channels">
                            <Radio className="mr-2 h-4 w-4" />
                            Canais
                        </TabsTrigger>
                        <TabsTrigger value="classes">
                            <School className="mr-2 h-4 w-4" />
                            Turmas
                        </TabsTrigger>
                        <TabsTrigger value="groups">
                            <Users className="mr-2 h-4 w-4" />
                            Grupos de Envio
                        </TabsTrigger>
                        <TabsTrigger value="whatsapp">
                            <Smartphone className="mr-2 h-4 w-4" />
                            WhatsApp
                            {waStatus === 'open' && (
                                <span className="ml-2 h-2 w-2 rounded-full bg-green-500 inline-block" />
                            )}
                        </TabsTrigger>
                    </TabsList>

                    {/* ── Tab: Canais ── */}
                    <TabsContent value="channels" className="space-y-4">
                        <div className="flex justify-end">
                            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Novo Canal
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Criar Canal de Transmissão</DialogTitle>
                                        <DialogDescription>Crie um canal para enviar mensagens a um grupo (ex: Avisos Gerais).</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleCreateChannel}>
                                        <div className="grid gap-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="create-name">Nome do Canal</Label>
                                                <Input id="create-name" value={createForm.data.name} onChange={e => createForm.setData('name', e.target.value)} placeholder="Ex: Avisos Importantes" required />
                                                {createForm.errors.name && <p className="text-sm text-destructive">{createForm.errors.name}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="create-icon">Ícone (Opcional)</Label>
                                                <Input id="create-icon" type="file" accept="image/*" onChange={e => createForm.setData('icon', e.target.files ? e.target.files[0] : null)} />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="can_reply_new" checked={createForm.data.can_reply} onCheckedChange={checked => createForm.setData('can_reply', !!checked)} />
                                                <Label htmlFor="can_reply_new" className="text-sm font-medium leading-none cursor-pointer">Permitir que usuários respondam (Chat bidirecional)</Label>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Quem pode enviar mensagens:</Label>
                                                <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto p-2 border rounded-md">
                                                    {staff.map(user => (
                                                        <div key={user.id} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`staff-${user.id}`}
                                                                checked={createForm.data.speakers.includes(user.id)}
                                                                onCheckedChange={checked => {
                                                                    const cur = [...createForm.data.speakers];
                                                                    createForm.setData('speakers', checked ? [...cur, user.id] : cur.filter(id => id !== user.id));
                                                                }}
                                                            />
                                                            <Label htmlFor={`staff-${user.id}`} className="text-xs truncate cursor-pointer">{user.name}</Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" disabled={createForm.processing}>Criar Canal</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {channels.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                                <Radio className="h-12 w-12 mb-4 opacity-30" />
                                <p className="text-lg font-medium">Nenhum canal criado</p>
                                <p className="text-sm">Crie seu primeiro canal acima.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Broadcast Channels Section */}
                                {channels.filter(c => !c.can_reply).length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Radio className="h-4 w-4 text-amber-600" />
                                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">📢 Listas de Transmissão</h3>
                                            <span className="text-xs text-muted-foreground">(somente pessoas autorizadas enviam)</span>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {channels.filter(c => !c.can_reply).map(channel => (
                                                <Card key={channel.id} className="relative group">
                                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditModal(channel)}>
                                                            <Settings className="h-3.5 w-3.5" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleDeleteChannel(channel.id)}>
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </div>
                                                    <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                                                            {channel.icon && channel.icon.startsWith('http') ? (
                                                                <img src={channel.icon} alt={channel.name} className="w-full h-full rounded-full object-cover" />
                                                            ) : <Radio className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <CardTitle className="text-sm font-semibold truncate pr-12">{channel.name}</CardTitle>
                                                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 mt-1 border-amber-300 text-amber-700 dark:text-amber-400">Transmissão</Badge>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="text-2xl font-bold">{channel.messages_count}</div>
                                                        <p className="text-xs text-muted-foreground">mensagens enviadas</p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Interactive Channels Section */}
                                {channels.filter(c => c.can_reply).length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <MessageCircleMore className="h-4 w-4 text-emerald-600" />
                                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">💬 Canais de Comunicação</h3>
                                            <span className="text-xs text-muted-foreground">(alunos e responsáveis podem responder)</span>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {channels.filter(c => c.can_reply).map(channel => (
                                                <Card key={channel.id} className="relative group">
                                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditModal(channel)}>
                                                            <Settings className="h-3.5 w-3.5" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleDeleteChannel(channel.id)}>
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </div>
                                                    <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                                                            {channel.icon && channel.icon.startsWith('http') ? (
                                                                <img src={channel.icon} alt={channel.name} className="w-full h-full rounded-full object-cover" />
                                                            ) : <MessageCircleMore className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <CardTitle className="text-sm font-semibold truncate pr-12">{channel.name}</CardTitle>
                                                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 mt-1 border-emerald-400 text-emerald-600 dark:text-emerald-400">Bidirecional</Badge>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="text-2xl font-bold">{channel.messages_count}</div>
                                                        <p className="text-xs text-muted-foreground">mensagens enviadas</p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </TabsContent>

                    {/* ── Tab: Turmas ── */}
                    <TabsContent value="classes">
                        <Card>
                            <CardHeader>
                                <CardTitle>Turmas e Canais</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {classes.map(cls => (
                                        <div key={cls.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold flex items-center gap-2">
                                                    <School className="h-4 w-4 text-muted-foreground shrink-0" />
                                                    {cls.name}
                                                    <span className="text-sm font-normal text-muted-foreground">({cls.series} {cls.letter})</span>
                                                </h3>
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {cls.professors.length > 0 ? cls.professors.map(p => (
                                                        <span key={p.id} className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10">
                                                            {p.name}
                                                        </span>
                                                    )) : (
                                                        <span className="text-xs text-amber-600 italic">Nenhum professor alocado.</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="ml-4 shrink-0">
                                                {cls.channel ? (
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800 hover:bg-emerald-100 cursor-default">
                                                            <Radio className="mr-2 h-4 w-4" />
                                                            Canal Ativo
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDisableClassChannel(cls.channel!.id)}>
                                                            Desabilitar
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <Button variant="outline" size="sm" onClick={() => handleEnableClassChannel(cls)}>
                                                        <Radio className="mr-2 h-4 w-4 text-muted-foreground" />
                                                        Habilitar Canal
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* ── Tab: Grupos de Envio ── */}
                    <TabsContent value="groups" className="space-y-4">
                        <div className="flex justify-end">
                            <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Novo Grupo
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Criar Novo Grupo de Envio</DialogTitle>
                                        <DialogDescription>Crie um grupo para disparos em massa (ex: Avisos Gerais).</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleCreateGroup}>
                                        <div className="grid gap-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="group-name">Nome do Grupo</Label>
                                                <Input id="group-name" value={newGroupName} onChange={e => setNewGroupName(e.target.value)} placeholder="Ex: Avisos Importantes" required />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Criar Grupo</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {groups.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                                <Users className="h-12 w-12 mb-4 opacity-30" />
                                <p className="text-lg font-medium">Nenhum grupo de envio</p>
                                <p className="text-sm">Crie grupos para definir quem pode enviar mensagens em cada canal.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {groups.map(group => (
                                    <GroupManager key={group.id} group={group} staff={staff} />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    {/* ── Tab: WhatsApp ── */}
                    <TabsContent value="whatsapp" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Smartphone className="h-5 w-5" />
                                    Conexão WhatsApp
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg border">
                                    {waStatus === 'open' ? (
                                        <div className="text-center space-y-4">
                                            <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                                                <LinkIcon className="h-10 w-10 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-green-600 dark:text-green-400">WhatsApp Conectado!</h3>
                                                <p className="text-sm text-muted-foreground">O sistema está pronto para enviar mensagens.</p>
                                            </div>
                                            <Button variant="destructive" onClick={handleDisconnectWa}>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Desconectar
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-center space-y-4 w-full max-w-xs">
                                            {!waQrCode ? (
                                                <>
                                                    <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                                                        <Smartphone className="h-8 w-8 text-muted-foreground" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-medium">Não Conectado</h3>
                                                        <p className="text-sm text-muted-foreground mb-4">Clique abaixo para gerar o QR Code e conectar.</p>
                                                    </div>
                                                    <Button onClick={handleConnectWa} disabled={waLoading}>
                                                        {waLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Gerando QR Code...</>) : (<><RefreshCw className="mr-2 h-4 w-4" />Conectar WhatsApp</>)}
                                                    </Button>
                                                </>
                                            ) : (
                                                <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                                                    <h3 className="font-bold text-lg">Escaneie o QR Code</h3>
                                                    <p className="text-sm text-muted-foreground">Abra o WhatsApp &gt; Aparelhos Conectados &gt; Conectar Aparelho</p>
                                                    <div className="bg-white p-4 rounded-lg inline-block border shadow-sm">
                                                        <img src={waQrCode} alt="QR Code WhatsApp" className="h-64 w-64 object-contain" />
                                                    </div>
                                                    <div><Button variant="ghost" onClick={() => setWaQrCode(null)}>Cancelar</Button></div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Send Interval Setting */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    Configurações de Envio
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="send-interval">Intervalo entre envios (segundos)</Label>
                                        <p className="text-xs text-muted-foreground">Tempo de espera entre cada mensagem enviada pelo WhatsApp para evitar bloqueio do número. Recomendado: 3-5 segundos.</p>
                                        <div className="flex gap-2 items-center">
                                            <Input 
                                                id="send-interval" 
                                                type="number" 
                                                min="1" 
                                                max="30" 
                                                value={waSendInterval} 
                                                onChange={e => setWaSendInterval(e.target.value)} 
                                                className="w-24"
                                            />
                                            <span className="text-sm text-muted-foreground">segundos</span>
                                            <Button 
                                                size="sm" 
                                                disabled={waSaving}
                                                onClick={() => {
                                                    setWaSaving(true);
                                                    axios.post('/admin/settings/whatsapp/interval', { value: waSendInterval })
                                                        .then(() => toast.success('Intervalo salvo!'))
                                                        .catch(() => toast.error('Erro ao salvar.'))
                                                        .finally(() => setWaSaving(false));
                                                }}
                                            >
                                                {waSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Salvar'}
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                        <p className="text-xs text-amber-800 dark:text-amber-300">
                                            ⚠️ <strong>Atenção:</strong> Envios muito rápidos (menos de 2 segundos) podem causar bloqueio do número pelo WhatsApp. Lotes com mais de 50 destinatários são automaticamente divididos.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* ── Edit Channel Modal ── */}
                <Dialog open={!!editingChannel} onOpenChange={open => !open && setEditingChannel(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Editar Canal</DialogTitle>
                            <DialogDescription>Atualize as informações deste canal.</DialogDescription>
                        </DialogHeader>
                        {editingChannel && (
                            <form onSubmit={handleEditChannel}>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-name">Nome do Canal</Label>
                                        <Input id="edit-name" value={editForm.data.name} onChange={e => editForm.setData('name', e.target.value)} required />
                                        {editForm.errors.name && <p className="text-sm text-destructive">{editForm.errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-icon">Ícone (Opcional)</Label>
                                        <Input id="edit-icon" type="file" accept="image/*" onChange={e => editForm.setData('icon', e.target.files ? e.target.files[0] : null)} />
                                        <p className="text-xs text-muted-foreground">Deixe em branco para manter o atual.</p>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="ghost" onClick={() => setEditingChannel(null)}>Cancelar</Button>
                                    <Button type="submit" disabled={editForm.processing}>Salvar Alterações</Button>
                                </DialogFooter>
                            </form>
                        )}
                    </DialogContent>
                </Dialog>

                {/* ── Compose Modal ── */}
                <ComposeModal
                    isOpen={isComposeOpen}
                    onClose={() => setIsComposeOpen(false)}
                    channels={channels}
                    classes={classes}
                    students={students}
                />
            </div>
        </AppLayout>
    );
}
