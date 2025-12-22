import React, { useState } from 'react';
import { Head, usePage, router, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, MessageSquare, Users, Radio, Send, Settings } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AppLayout from '@/layouts/app-layout';
import { ComposeModal } from '@/pages/Agenda/Components/ComposeModal';

interface Channel {
    id: number;
    name: string;
    type: 'BROADCAST' | 'CLASS';
    messages_count: number;
    created_at: string;
}

interface Props {
    channels: Channel[];
}

export default function Index({ channels }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [editingChannel, setEditingChannel] = useState<Channel | null>(null);

    // Form for Creating
    const createForm = useForm({
        name: '',
        type: 'BROADCAST',
        icon: null as File | null,
    });

    // Form for Editing - We'll initialize it when opening the modal
    const editForm = useForm({
        name: '',
        icon: null as File | null,
        _method: 'put', // Method spoofing for file upload via POST
    });

    const handleCreateChannel = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/admin/agenda', {
            forceFormData: true,
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
            }
        });
    };

    const handleEditChannel = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingChannel) return;

        editForm.post(`/admin/agenda/${editingChannel.id}`, {
            forceFormData: true, // Important for file uploads
            onSuccess: () => {
                setEditingChannel(null);
                editForm.reset();
            }
        });
    };

    const openEditModal = (channel: Channel) => {
        setEditingChannel(channel);
        editForm.setData({
            name: channel.name,
            icon: null, // Reset file input
            _method: 'put',
        });
        // Note: We don't prepopulate the file input, user uploads new one if desired
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Agenda Digital', href: '/admin/agenda' }]}>
            <Head title="Agenda Digital" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Agenda Digital</h2>
                        <p className="text-muted-foreground">Gerencie canais e mensagens massivas.</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/admin/agenda/settings">
                            <Button variant="outline" size="icon">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button onClick={() => setIsComposeOpen(true)}>
                            <Send className="mr-2 h-4 w-4" />
                            Enviar Mensagem
                        </Button>
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
                                    <DialogDescription>
                                        Crie um canal para enviar mensagens a todos os usuários (ex: Avisos Gerais).
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleCreateChannel}>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="create-name">Nome do Canal</Label>
                                            <Input
                                                id="create-name"
                                                value={createForm.data.name}
                                                onChange={(e) => createForm.setData('name', e.target.value)}
                                                placeholder="Ex: Avisos Importantes"
                                                required
                                            />
                                            {createForm.errors.name && <p className="text-sm text-destructive">{createForm.errors.name}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="create-icon">Ícone (Opcional)</Label>
                                            <Input
                                                id="create-icon"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => createForm.setData('icon', e.target.files ? e.target.files[0] : null)}
                                            />
                                            {createForm.errors.icon && <p className="text-sm text-destructive">{createForm.errors.icon}</p>}
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" disabled={createForm.processing}>Criar Canal</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {channels.map((channel: any) => (
                        <Card key={channel.id} className="relative group">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditModal(channel)}>
                                    <Settings className="h-4 w-4" />
                                </Button>
                            </div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    {channel.icon && channel.icon.startsWith('http') ? (
                                        <img src={channel.icon} alt={channel.name} className="w-6 h-6 rounded-full object-cover" />
                                    ) : (
                                        channel.type === 'BROADCAST' ? <Radio className="h-4 w-4 text-muted-foreground" /> : <Users className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    {channel.name}
                                </CardTitle>
                                {channel.type === 'BROADCAST' ? (
                                    <Radio className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{channel.messages_count}</div>
                                <p className="text-xs text-muted-foreground">
                                    mensagens enviadas
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Edit Modal */}
                <Dialog open={!!editingChannel} onOpenChange={(open) => !open && setEditingChannel(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Editar Canal</DialogTitle>
                            <DialogDescription>
                                Atualize as informações deste canal.
                            </DialogDescription>
                        </DialogHeader>
                        {editingChannel && (
                            <form onSubmit={handleEditChannel}>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-name">Nome do Canal</Label>
                                        <Input
                                            id="edit-name"
                                            value={editForm.data.name}
                                            onChange={(e) => editForm.setData('name', e.target.value)}
                                            placeholder="Ex: Avisos Importantes"
                                            required
                                        />
                                        {editForm.errors.name && <p className="text-sm text-destructive">{editForm.errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-icon">Ícone (Opcional)</Label>
                                        <Input
                                            id="edit-icon"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => editForm.setData('icon', e.target.files ? e.target.files[0] : null)}
                                        />
                                        <p className="text-xs text-muted-foreground">Deixe em branco para manter o atual.</p>
                                        {editForm.errors.icon && <p className="text-sm text-destructive">{editForm.errors.icon}</p>}
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

                <ComposeModal
                    isOpen={isComposeOpen}
                    onClose={() => setIsComposeOpen(false)}
                    channels={channels}
                />
            </div>
        </AppLayout>
    );
}
