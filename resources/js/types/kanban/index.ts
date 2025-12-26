export interface KanbanCard {
    id: number;
    column_id: number;
    title: string;
    description?: string;
    order: number;
    due_date?: string;
    assigned_to?: number; // User ID
    assignee?: {
        id: number;
        name: string;
        avatar_url?: string;
    };
}

export interface KanbanColumn {
    id: number;
    board_id: number;
    name: string;
    order: number;
    color?: string;
    cards: KanbanCard[];
}

export interface KanbanBoard {
    id: number;
    name: string;
    description?: string;
    permission: 'view' | 'create_only' | 'edit';
    columns: KanbanColumn[];
}
