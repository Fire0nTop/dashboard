export interface Task {
    id: string;
    title: string;
    description?: string | null;
    status: string;
    priority: string;
    created_at: string;
    updated_at: string;
    due_date?: string | null;
    created_by: string;
    assigned_to?: string | null;
    [key: string]: string | number | boolean | undefined | null;
}

export interface Column {
    id: string;
    title: string;
}

export type ColumnType = "Column";
export type TaskType = "Task";

export interface ColumnDragData {
    type: ColumnType;
    column: Column;
}

export interface TaskDragData {
    type: TaskType;
    task: Task;
}