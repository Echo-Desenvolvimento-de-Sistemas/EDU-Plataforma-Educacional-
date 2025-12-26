import { KanbanColumn as KanbanColumnType } from '@/types/kanban';
import { Droppable } from '@hello-pangea/dnd';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import KanbanCard from './Card';

interface Props {
    column: KanbanColumnType;
    isDragEnabled: boolean;
    onAddCard?: (columnId: number) => void;
}

export default function KanbanColumn({ column, isDragEnabled, onAddCard }: Props) {
    return (
        <div className="flex h-full w-[300px] min-w-[300px] flex-col rounded-xl bg-gray-100/50 p-2 dark:bg-gray-800/50">
            <div className="mb-3 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    {column.color && (
                        <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: column.color }}
                        />
                    )}
                    <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">
                        {column.name}
                    </h3>
                    <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium dark:bg-gray-700">
                        {column.cards.length}
                    </span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>

            <Droppable droppableId={String(column.id)} isDropDisabled={!isDragEnabled}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex-1 rounded-lg transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                            }`}
                    >
                        {column.cards.map((card, index) => (
                            <KanbanCard
                                key={card.id}
                                card={card}
                                index={index}
                                isDragEnabled={isDragEnabled}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {onAddCard && (
                <Button
                    variant="ghost"
                    className="mt-2 w-full justify-start text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => onAddCard(column.id)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Cartão
                </Button>
            )}
        </div>
    );
}
