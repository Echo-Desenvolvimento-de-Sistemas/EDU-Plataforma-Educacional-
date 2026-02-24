import { KanbanBoard as KanbanBoardType, KanbanColumn as KanbanColumnType } from '@/types/kanban';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import KanbanColumn from './Column';

interface Props {
    board: KanbanBoardType;
    onDragEnd: (result: DropResult) => void;
    onAddCard?: (columnId: number) => void;
    onDeleteCard?: (cardId: number, columnId: number) => void;
}

export default function KanbanBoard({ board, onDragEnd, onAddCard, onDeleteCard }: Props) {
    const isDragEnabled = board.permission === 'edit' || (board.permission as string) === 'edit'; // Ensure string check works

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-full flex-1 gap-4 overflow-x-auto pb-4">
                {board.columns.map((column) => (
                    <KanbanColumn
                        key={column.id}
                        column={column}
                        isDragEnabled={isDragEnabled}
                        onAddCard={board.permission !== 'view' ? onAddCard : undefined}
                        onDeleteCard={onDeleteCard}
                    />
                ))}
            </div>
        </DragDropContext>
    );
}
