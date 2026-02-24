import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Kanban, Plus, Trash2, Users, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Quadros de Projetos',
        href: '/kanban',
    },
];

interface User {
    id: number;
    name: string;
    email?: string;
    role: string;
    pivot?: {
        permission: string;
    };
}

interface KanbanBoard {
    id: number;
    name: string;
    description: string;
    columns_count?: number;
    users?: User[];
    permission?: string;
}

export default function KanbanIndex({ boards, potentialUsers = [] }: { boards: KanbanBoard[], potentialUsers?: User[] }) {
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const user = auth.user;
    const isAdmin = user.role === 'admin';

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [managingBoard, setManagingBoard] = useState<KanbanBoard | null>(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        description: '',
    });

    const { data: addUserData, setData: setAddUserData, post: postAddUser, processing: processingAddUser, reset: resetAddUser } = useForm({
        user_id: '',
        permission: 'view',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/kanban', {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
                toast.success('Quadro criado com sucesso!');
            },
            onError: () => toast.error('Erro ao criar quadro.'),
        });
    };

    const handleConfigMembers = (board: KanbanBoard) => {
        setManagingBoard(board);
    };

    const submitAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!managingBoard) return;

        postAddUser(`/kanban/${managingBoard.id}/users`, {
            onSuccess: () => {
                resetAddUser();
                toast.success('Usuário adicionado!');
            },
            onError: () => toast.error('Erro ao adicionar usuário.'),
            preserveScroll: true,
        });
    };

    const removeUser = (userId: number) => {
        if (!managingBoard) return;
        if (!confirm('Remover usuário do quadro?')) return;

        router.delete(`/kanban/${managingBoard.id}/users/${userId}`, {
            onSuccess: () => toast.success('Usuário removido'),
            preserveScroll: true
        });
    }

    const handleDeleteBoard = (boardId: number) => {
        if (!confirm('Tem certeza que deseja excluir ESTE QUADRO INTEIRO? Isso apagará todas as tarefas contidas nele de forma irreversível.')) return;

        router.delete(`/kanban/${boardId}`, {
            onSuccess: () => toast.success('Quadro excluído com sucesso.'),
            preserveScroll: true
        });
    }

    const activeBoard = boards.find(b => b.id === managingBoard?.id) || null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quadros de Projetos" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Gerenciar Quadros</h1>
                        <p className="text-sm text-muted-foreground">Crie e gerencie os quadros de Kanban do sistema.</p>
                    </div>
                    {isAdmin && (
                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Novo Quadro
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Criar Novo Quadro</DialogTitle>
                                    <DialogDescription>Defina o nome e a descrição do novo quadro.</DialogDescription>
                                </DialogHeader>
                                <form onSubmit={submit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nome do Quadro</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Ex: Planejamento 2026"
                                            required
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Descrição</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Para que serve este quadro..."
                                        />
                                    </div>
                                    <DialogFooter>
                                        <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                                            Cancelar
                                        </Button>
                                        <Button type="submit" disabled={processing}>
                                            Criar Quadro
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {boards.map((board) => (
                        <Link key={board.id} href={`/kanban/${board.id}`}>
                            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        <span className="hover:underline hover:text-primary">
                                            {board.name}
                                        </span>
                                    </CardTitle>
                                    <div className="flex items-center gap-2">
                                        {isAdmin && (
                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteBoard(board.id); }}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                        <Kanban className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {board.columns_count !== undefined && (
                                        <div className="text-2xl font-bold">{board.columns_count} Colunas</div>
                                    )}
                                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2 min-h-[32px]">
                                        {board.description || 'Sem descrição'}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            {board.users !== undefined ? (
                                                <>
                                                    <Users className="mr-1 h-3 w-3" />
                                                    {board.users.length} membros
                                                </>
                                            ) : (
                                                <>
                                                    <span className="font-semibold text-primary mr-1 capitalize">{board.permission || 'view'}</span>
                                                    acesso
                                                </>
                                            )}
                                        </div>
                                        {isAdmin && (
                                            <Button variant="outline" size="sm" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleConfigMembers(board); }}>
                                                Gerenciar
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                    {boards.length === 0 && (
                        <div className="col-span-full py-10 text-center text-muted-foreground">
                            {isAdmin ? 'Nenhum quadro encontrado. Crie o primeiro!' : 'Você ainda não participa de nenhum quadro.'}
                        </div>
                    )}
                </div>

                {/* Manage Members Dialog */}
                {isAdmin && (
                    <Dialog open={!!managingBoard} onOpenChange={(open) => !open && setManagingBoard(null)}>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Gerenciar Membros - {activeBoard?.name}</DialogTitle>
                                <DialogDescription>
                                    Adicione ou remova usuários deste quadro e defina suas permissões.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                                <form onSubmit={submitAddUser} className="flex gap-2 items-end rounded-lg border p-3 bg-muted/50">
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="user">Selecionar Usuário</Label>
                                        <Select
                                            value={addUserData.user_id}
                                            onValueChange={(val) => setAddUserData('user_id', val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {potentialUsers
                                                    .filter(u => !activeBoard?.users?.find(member => member.id === u.id))
                                                    .map(u => (
                                                        <SelectItem key={u.id} value={String(u.id)}>
                                                            {u.name} ({u.role})
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="w-[150px] gap-2 grid">
                                        <Label htmlFor="perm">Permissão</Label>
                                        <Select
                                            value={addUserData.permission}
                                            onValueChange={(val) => setAddUserData('permission', val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="view">Só Ver</SelectItem>
                                                <SelectItem value="create_only">Só Adicionar</SelectItem>
                                                <SelectItem value="edit">Total</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="submit" disabled={processingAddUser || !addUserData.user_id}>
                                        Adicionar
                                    </Button>
                                </form>

                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nome</TableHead>
                                                <TableHead>Permissão</TableHead>
                                                <TableHead className="w-[50px]"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {activeBoard?.users?.map((boardUser) => (
                                                <TableRow key={boardUser.id}>
                                                    <TableCell className="font-medium">
                                                        {boardUser.name}
                                                        <span className="block text-xs text-muted-foreground">{boardUser.email}</span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                                                            ${boardUser.pivot?.permission === 'edit' ? 'bg-green-100 text-green-700' :
                                                                boardUser.pivot?.permission === 'create_only' ? 'bg-blue-100 text-blue-700' :
                                                                    'bg-gray-100 text-gray-700'}`}>
                                                            {boardUser.pivot?.permission === 'edit' ? 'Controle Total' :
                                                                boardUser.pivot?.permission === 'create_only' ? 'Só Adicionar' : 'Só Ver'}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                            onClick={() => removeUser(boardUser.id)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {(!activeBoard?.users || activeBoard.users.length === 0) && (
                                                <TableRow>
                                                    <TableCell colSpan={3} className="text-center text-muted-foreground h-24">
                                                        Nenhum membro adicionado a este quadro ainda.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button onClick={() => setManagingBoard(null)}>Fechar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </AppLayout>
    );
}
