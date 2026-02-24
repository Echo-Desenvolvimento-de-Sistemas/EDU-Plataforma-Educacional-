import { KanbanCard as KanbanCardType } from '@/types/kanban';
import { Draggable } from '@hello-pangea/dnd';
import { Calendar, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Props {
    card: KanbanCardType;
    index: number;
    isDragEnabled: boolean;
    onDelete?: (cardId: number) => void;
}

export default function KanbanCard({ card, index, isDragEnabled, onDelete }: Props) {
    return (
        <Draggable draggableId={String(card.id)} index={index} isDragDisabled={!isDragEnabled}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`
                        mb-2 rounded-lg border bg-white p-3 shadow-sm transition-all
                        hover:shadow-md dark:bg-gray-800 dark:border-gray-700
                        ${snapshot.isDragging ? 'rotate-2 scale-105 shadow-xl ring-2 ring-primary' : ''}
                    `}
                    style={provided.draggableProps.style}
                >
                    <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{card.title}</h4>
                        {onDelete && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-muted-foreground hover:text-red-600 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(card.id);
                                }}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        )}
                    </div>
                    {card.description && (
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{card.description}</p>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                        {card.assignee ? (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground" title={card.assignee.name}>
                                <Avatar className="h-5 w-5">
                                    <AvatarImage src={card.assignee.avatar_url} />
                                    <AvatarFallback>{card.assignee.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </div>
                        ) : <div />}

                        {card.due_date && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(card.due_date).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
}
