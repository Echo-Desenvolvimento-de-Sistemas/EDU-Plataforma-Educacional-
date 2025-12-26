import KanbanBoardContainer from '@/components/Kanban/Board';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { KanbanBoard as KanbanBoardType, KanbanCard } from '@/types/kanban';
import { BreadcrumbItem } from '@/types';
import { DropResult } from '@hello-pangea/dnd';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    board: KanbanBoardType;
}

export default function KanbanBoardPage({ board }: Props) {
    const [localBoard, setLocalBoard] = useState<KanbanBoardType>(board);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [targetColumnId, setTargetColumnId] = useState<number | null>(null);

    // Sync props to local state when backend updates (e.g. after other user moves)
    useEffect(() => {
        setLocalBoard(board);
    }, [board]);

    // Real-time updates
    useEffect(() => {
        // @ts-ignore
        if (!window.Echo) return;

        // @ts-ignore
        const channel = window.Echo.private(`kanban.${board.id}`);

        channel
            .listen('.KanbanCardCreated', (e: any) => {
                setLocalBoard(prev => {
                    const newCols = prev.columns.map(col => ({ ...col, cards: [...col.cards] }));
                    const targetCol = newCols.find(c => c.id === e.card.column_id);
                    if (targetCol) {
                        // Check if card already exists
                        if (!targetCol.cards.find(c => c.id === e.card.id)) {
                            targetCol.cards.push(e.card);
                            targetCol.cards.sort((a, b) => a.order - b.order);
                        }
                    }
                    return { ...prev, columns: newCols };
                });
            })
            .listen('.KanbanCardUpdated', (e: any) => {
                setLocalBoard(prev => {
                    const newCols = prev.columns.map(col => ({
                        ...col,
                        cards: col.cards.map(c => c.id === e.card.id ? e.card : c)
                    }));
                    return { ...prev, columns: newCols };
                });
            })
            .listen('.KanbanCardMoved', (e: any) => {
                setLocalBoard(prev => {
                    const card = e.card;
                    const newCols = prev.columns.map(col => ({ ...col, cards: [...col.cards] }));

                    // Remove from old location
                    for (const col of newCols) {
                        const idx = col.cards.findIndex(c => c.id === card.id);
                        if (idx !== -1) {
                            col.cards.splice(idx, 1);
                            break;
                        }
                    }

                    // Insert into new location
                    const targetCol = newCols.find(c => c.id === card.column_id);
                    if (targetCol) {
                        targetCol.cards.push(card);
                        targetCol.cards.sort((a, b) => a.order - b.order);
                    }

                    return { ...prev, columns: newCols };
                });
            })
            .listen('.KanbanCardDeleted', (e: any) => {
                setLocalBoard(prev => {
                    const newCols = prev.columns.map(col => ({
                        ...col,
                        cards: col.cards.filter(c => c.id !== e.cardId)
                    }));
                    return { ...prev, columns: newCols };
                });
            });

        return () => {
            // @ts-ignore
            window.Echo.leave(`kanban.${board.id}`);
        };
    }, [board.id]);

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        due_date: '',
        column_id: 0,
    });

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Optimistic Update
        const newBoard = { ...localBoard };
        const sourceColIndex = newBoard.columns.findIndex(col => String(col.id) === source.droppableId);
        const destColIndex = newBoard.columns.findIndex(col => String(col.id) === destination.droppableId);

        const sourceCol = { ...newBoard.columns[sourceColIndex] };
        const destCol = { ...newBoard.columns[destColIndex] };

        const [movedCard] = sourceCol.cards.splice(source.index, 1);

        // If moving to same column
        if (sourceColIndex === destColIndex) {
            sourceCol.cards.splice(destination.index, 0, movedCard);
            newBoard.columns[sourceColIndex] = sourceCol;
        } else {
            // Moving to different column
            movedCard.column_id = destCol.id; // Update locally
            destCol.cards.splice(destination.index, 0, movedCard);
            newBoard.columns[sourceColIndex] = sourceCol;
            newBoard.columns[destColIndex] = destCol;
        }

        setLocalBoard(newBoard);

        // Send to backend
        router.patch(`/kanban/cards/${movedCard.id}/move`, {
            column_id: Number(destination.droppableId),
            order: destination.index
        }, {
            preserveScroll: true,
            onError: () => {
                toast.error('Erro ao mover cartão. Revertendo...');
                setLocalBoard(board); // Revert
            }
        });
    };

    const handleAddCard = (columnId: number) => {
        setTargetColumnId(columnId);
        setData('column_id', columnId);
        setIsCreateOpen(true);
    };

    const submitCard = (e: React.FormEvent) => {
        e.preventDefault();
        post('/kanban/cards', {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
                toast.success('Tarefa criada!');
            },
            onError: () => toast.error('Erro ao criar tarefa.')
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Meus Quadros', href: '/kanban' },
        { title: board.name, href: `/kanban/${board.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={board.name} />

            <div className="flex h-[calc(100vh-80px)] flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">{board.name}</h1>
                        <p className="text-xs text-muted-foreground">{board.description}</p>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <KanbanBoardContainer
                        board={localBoard}
                        onDragEnd={onDragEnd}
                        onAddCard={handleAddCard}
                    />
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Nova Tarefa</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitCard} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Título</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Ex: Corrigir provas"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="desc">Descrição</Label>
                                <Textarea
                                    id="desc"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Detalhes da tarefa..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="due">Prazo</Label>
                                <Input
                                    id="due"
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={processing}>
                                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Criar
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
