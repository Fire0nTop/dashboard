import { Active, Over } from "@dnd-kit/core";
import { ColumnDragData, TaskDragData } from "@/types/kanban/tasks";

export type DraggableData = ColumnDragData | TaskDragData;

export function hasDraggableData(
    entry: Active | Over | null | undefined
): entry is (Active | Over) & {
    data: {
        current: DraggableData;
    };
} {
    if (!entry) {
        return false;
    }

    const data = entry.data.current;
    return data?.type === "Column" || data?.type === "Task";


}

// Helper function to get priority badge variant
export function getPriorityVariant(priority: string): "default" | "secondary" | "destructive" | "outline" {
    const lowerPriority = priority.toLowerCase();
    if (lowerPriority === 'urgent' || lowerPriority === 'critical') {
        return 'destructive';
    }
    if (lowerPriority === 'high') {
        return 'default';
    }
    return 'secondary';
}

// Helper function to normalize status for column matching
export function normalizeStatus(status: string): string {
    return status.toLowerCase().replace(/[\s_]+/g, '-');
}