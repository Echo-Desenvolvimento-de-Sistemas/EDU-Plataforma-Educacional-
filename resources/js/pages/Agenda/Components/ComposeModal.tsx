import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send } from 'lucide-react';

interface Channel {
    id: number;
    name: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    channels: Channel[]; // Passed from parent (Admin: all, Prof: theirs)
    submitUrl?: string;
}

export function ComposeModal({ isOpen, onClose, channels, submitUrl = '/admin/agenda/message' }: Props) {
    const { data, setData, post, processing, reset, errors } = useForm({
        channel_id: '',
        title: '',
        body: '',
        type: 'NOTICE',
        banner_image: null as File | null,
        attachments: [] as File[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(submitUrl, {
            forceFormData: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const messageTypes = [
        { value: 'NOTICE', label: 'Aviso', color: 'bg-amber-500' },
        { value: 'EVENT', label: 'Evento', color: 'bg-blue-500' },
        { value: 'FINANCIAL', label: 'Financeiro', color: 'bg-green-500' },
        { value: 'URGENT', label: 'Urgente', color: 'bg-red-500' },
        { value: 'HOMEWORK', label: 'Atividade de Casa', color: 'bg-violet-500' },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Nova Mensagem</DialogTitle>
                    <DialogDescription>
                        Envie avisos, eventos ou comunicados para um canal específico.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="channel">Para:</Label>
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
                        {/* Does not currently support showing error for specific attachment, generic handling */}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Mensagem:</Label>
                        <Textarea
                            id="message"
                            placeholder="Digite sua mensagem aqui..."
                            className="min-h-[150px]"
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
