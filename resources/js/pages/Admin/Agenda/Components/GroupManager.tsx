import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Trash2, UserPlus, X, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { router, useForm } from '@inertiajs/react'; // Added useForm
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Added Dialog
import { Input } from "@/components/ui/input"; // Added Input
import { Label } from "@/components/ui/label"; // Added Label

interface User {
    id: number;
    name: string;
    role: string;
}

interface Channel {
    id: number;
    name: string;
    icon?: string; // Added icon
    speakers: User[];
}

interface Props {
    group: Channel;
    staff: User[];
}

export function GroupManager({ group, staff }: Props) {
    const [open, setOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false); // Edit Modal State

    // Edit Form
    const editForm = useForm({
        name: group.name,
        icon: null as File | null,
        _method: 'put',
    });

    const handleDelete = () => {
        if (confirm('Tem certeza que deseja excluir este grupo?')) {
            router.delete(`/admin/agenda/${group.id}`, {
                preserveScroll: true,
            });
        }
    };

    const handleUpdateGroup = (e: React.FormEvent) => {
        e.preventDefault();
        editForm.post(`/admin/agenda/${group.id}`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => setIsEditOpen(false),
        });
    };

    const handleAddUser = (userId: number) => {
        router.post(`/admin/agenda/${group.id}/users`, {
            user_id: userId,
        }, {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
        });
    };

    const handleRemoveUser = (userId: number) => {
        router.delete(`/admin/agenda/${group.id}/users/${userId}`, {
            preserveScroll: true,
        });
    };

    // Filter out users already in the group
    const availableStaff = staff.filter(s => !group.speakers.find(sp => sp.id === s.id));

    return (
        <Card className="relative group/card">
            {/* Edit Modal */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Grupo</DialogTitle>
                        <DialogDescription>Alterar nome e ícone do grupo.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateGroup}>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor={`name-${group.id}`}>Nome</Label>
                                <Input
                                    id={`name-${group.id}`}
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                    required
                                />
                                {editForm.errors.name && <p className="text-sm text-destructive">{editForm.errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`icon-${group.id}`}>Ícone (Opcional)</Label>
                                <Input
                                    id={`icon-${group.id}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => editForm.setData('icon', e.target.files ? e.target.files[0] : null)}
                                />
                                {editForm.errors.icon && <p className="text-sm text-destructive">{editForm.errors.icon}</p>}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setIsEditOpen(false)}>Cancelar</Button>
                            <Button type="submit" disabled={editForm.processing}>Salvar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                    {group.icon && group.icon.startsWith('http') ? (
                        <img src={group.icon} alt={group.name} className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                        <Users className="h-4 w-4 text-muted-foreground" />
                    )}
                    {group.name}
                </CardTitle>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover/card:opacity-100 transition-opacity"
                    onClick={() => setIsEditOpen(true)}
                >
                    <Settings className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="mt-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Quem pode enviar:</p>
                    <div className="flex flex-wrap gap-2">
                        {group.speakers.map((speaker) => (
                            <Badge key={speaker.id} variant="secondary" className="pr-1">
                                {speaker.name}
                                <button
                                    onClick={() => handleRemoveUser(speaker.id)}
                                    className="ml-1 rounded-full hover:bg-destructive hover:text-destructive-foreground p-0.5"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="h-6 rounded-full border-dashed">
                                    <UserPlus className="mr-1 h-3 w-3" />
                                    Adicionar
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0" side="right" align="start">
                                <Command>
                                    <CommandInput placeholder="Buscar usuário..." />
                                    <CommandList>
                                        <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
                                        <CommandGroup>
                                            {availableStaff.map((user) => (
                                                <CommandItem
                                                    key={user.id}
                                                    value={user.name}
                                                    onSelect={() => handleAddUser(user.id)}
                                                >
                                                    <div className="flex flex-col">
                                                        <span>{user.name}</span>
                                                        <span className="text-[10px] text-muted-foreground capitalize">{user.role}</span>
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-end border-t p-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={handleDelete}
                >
                    <Trash2 className="mr-2 h-3 w-3" />
                    Excluir Grupo
                </Button>
            </CardFooter>
        </Card>
    );
}
