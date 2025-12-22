
import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, School, Radio, Smartphone, Loader2, Link as LinkIcon, LogOut, RefreshCw } from "lucide-react";
import { GroupManager } from './Components/GroupManager';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { router } from '@inertiajs/react';
import axios from 'axios';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    role: string;
}

interface Channel {
    id: number;
    name: string;
    speakers: User[];
}

interface ClassRoom {
    id: number;
    name: string;
    series: string;
    letter: string;
    professors: User[];
    channel?: Channel;
}

interface Props {
    groups: Channel[];
    classes: ClassRoom[];
    staff: User[];
}

export default function Settings({ groups, classes, staff }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    // WhatsApp State
    const [waStatus, setWaStatus] = useState<'open' | 'close' | 'connecting' | 'unknown'>('unknown');
    const [waQrCode, setWaQrCode] = useState<string | null>(null);
    const [waLoading, setWaLoading] = useState(false);

    useEffect(() => {
        checkWaStatus();
    }, []);

    const checkWaStatus = () => {
        axios.get('/admin/settings/whatsapp/status')
            .then(res => {
                const state = res.data?.instance?.state || res.data?.state || 'close';
                setWaStatus(state);
            })
            .catch(() => setWaStatus('unknown'));
    };

    const handleConnectWa = () => {
        setWaLoading(true);
        axios.post('/admin/settings/whatsapp/connect')
            .then(res => {
                if (res.data?.base64) {
                    setWaQrCode(res.data.base64);
                    // Start polling for status
                    const interval = setInterval(() => {
                        axios.get('/admin/settings/whatsapp/status')
                            .then(statusRes => {
                                const state = statusRes.data?.instance?.state || statusRes.data?.state;
                                if (state === 'open') {
                                    setWaStatus('open');
                                    setWaQrCode(null);
                                    clearInterval(interval);
                                    toast.success('WhatsApp Conectado!');
                                }
                            });
                    }, 2000);
                } else if (res.data?.instance?.state === 'open') {
                    setWaStatus('open');
                    toast.success('WhatsApp já está conectado!');
                } else {
                    // Show detailed error
                    const errorMsg = res.data?.error || 'Erro desconhecido na API.';
                    toast.error(`Não foi possível gerar o QR Code: ${errorMsg}`);
                    console.error('Falha na conexão:', res.data);
                }
            })
            .catch(err => {
                console.error(err);
                if (err.response?.data?.message) {
                    toast.error(`Erro: ${err.response.data.message}`);
                } else {
                    toast.error('Erro ao conectar com a API.');
                }
            })
            .finally(() => setWaLoading(false));
    };

    const handleDisconnectWa = () => {
        if (confirm('Tem certeza que deseja desconectar?')) {
            router.post('/admin/settings/whatsapp/disconnect', {}, {
                onSuccess: () => {
                    setWaStatus('close');
                    setWaQrCode(null);
                }
            });
        }
    };


    const handleCreateGroup = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/admin/agenda', {
            name: newGroupName,
            type: 'BROADCAST',
        }, {
            onSuccess: () => {
                setIsCreateOpen(false);
                setNewGroupName('');
            }
        });
    };

    const handleEnableClassChannel = (cls: ClassRoom) => {
        // Construct a clean name, avoiding "null" or duplicates
        // e.g. "6° Ano - A" or just "6° Ano" if letter is empty
        const parts = [cls.series, cls.letter].filter(Boolean).join(' ');
        const finalName = parts ? `${parts}` : cls.name;

        router.post('/admin/agenda', {
            name: finalName,
            type: 'CLASS',
            related_type: 'App\\Models\\ClassRoom',
            related_id: cls.id,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Agenda', href: '/admin/agenda' },
            { title: 'Configurações', href: '/admin/agenda/settings' }
        ]}>
            <Head title="Configurações Agenda" />

            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Configurações da Agenda</h1>
                    <p className="text-muted-foreground">Gerencie grupos de envio e permissões.</p>
                </div>

                <Tabs defaultValue="connection" className="w-full">
                    <TabsList>
                        <TabsTrigger value="connection">Conexão</TabsTrigger>
                        <TabsTrigger value="groups">Grupos de Envio</TabsTrigger>
                        <TabsTrigger value="classes">Turmas</TabsTrigger>
                    </TabsList>

                    <TabsContent value="connection" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Smartphone className="h-5 w-5" />
                                    Conexão WhatsApp
                                </CardTitle>
                                <CardDescription>
                                    Conecte o sistema ao WhatsApp para envio de mensagens automáticas via Evolution API.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                                    {waStatus === 'open' ? (
                                        <div className="text-center space-y-4">
                                            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                                <LinkIcon className="h-10 w-10 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-green-600">WhatsApp Conectado!</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">O sistema está pronto para enviar mensagens.</p>
                                            </div>
                                            <Button variant="destructive" onClick={handleDisconnectWa}>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Desconectar
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-center space-y-4 w-full">
                                            {!waQrCode ? (
                                                <>
                                                    <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                                                        <Smartphone className="h-8 w-8 text-gray-500" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-medium">Não Conectado</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                                            Clique abaixo para gerar o QR Code e conectar.
                                                        </p>
                                                    </div>
                                                    <Button onClick={handleConnectWa} disabled={waLoading}>
                                                        {waLoading ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                Gerando QR Code...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                                Conectar WhatsApp
                                                            </>
                                                        )}
                                                    </Button>
                                                </>
                                            ) : (
                                                <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                                                    <h3 className="font-bold text-lg">Escaneie o QR Code</h3>
                                                    <p className="text-sm text-gray-500">Abra o WhatsApp &gt; Aparelhos Conectados &gt; Conectar Aparelho</p>
                                                    <div className="bg-white p-4 rounded-lg inline-block border shadow-sm">
                                                        <img src={waQrCode} alt="QR Code WhatsApp" className="h-64 w-64 object-contain" />
                                                    </div>
                                                    <div>
                                                        <Button variant="ghost" onClick={() => setWaQrCode(null)}>
                                                            Cancelar
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="groups" className="space-y-4">
                        <div className="flex justify-end">
                            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Novo Grupo
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Criar Novo Grupo</DialogTitle>
                                        <DialogDescription>
                                            Crie um grupo para disparos em massa (ex: Avisos Gerais).
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleCreateGroup}>
                                        <div className="grid gap-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Nome do Grupo</Label>
                                                <Input
                                                    id="name"
                                                    value={newGroupName}
                                                    onChange={(e) => setNewGroupName(e.target.value)}
                                                    placeholder="Ex: Avisos Importantes"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Criar Grupo</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {groups.map((group) => (
                                <GroupManager key={group.id} group={group} staff={staff} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="classes">
                        <Card>
                            <CardHeader>
                                <CardTitle>Turmas e Professores</CardTitle>
                                <CardDescription>Associação automática baseada nas alocações de aula.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {classes.map((cls) => (
                                        <div key={cls.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                            <div>
                                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                                    <School className="h-4 w-4 text-muted-foreground" />
                                                    {cls.name} <span className="text-sm font-normal text-muted-foreground">({cls.series} {cls.letter})</span>
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Professores habilitados:
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {cls.professors.length > 0 ? (
                                                        cls.professors.map((p) => (
                                                            <span key={p.id} className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                                {p.name}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-yellow-600 italic">Nenhum professor alocado.</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                {cls.channel ? (
                                                    <Button variant="outline" size="sm" className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700 cursor-default">
                                                        <Radio className="mr-2 h-4 w-4" />
                                                        Canal Ativo
                                                    </Button>
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
                </Tabs>
            </div>
        </AppLayout>
    );
}
