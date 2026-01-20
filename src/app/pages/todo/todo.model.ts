export interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
    editing?: boolean;
}

export type TodoFilter = 'all' | 'active' | 'completed';