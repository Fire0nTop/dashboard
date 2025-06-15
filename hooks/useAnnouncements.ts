import { Announcements } from "@dnd-kit/core";
import { useRef } from "react";
import {Column, Task} from "@/types/kanban/tasks";
import { hasDraggableData } from "@/lib/dragutils.util";

interface UseAnnouncementsProps {
    columns: Column[];
    columnsId: string[];
    getTaskData: (taskId: string, status: string) => {
        tasksInColumn: Task[];
        taskPosition: number;
        column: Column | undefined;
    };
}

export function useAnnouncements({
                                     columns,
                                     columnsId,
                                     getTaskData,
                                 }: UseAnnouncementsProps) {
    const pickedUpTaskColumn = useRef<string | null>(null);

    const announcements: Announcements = {
        onDragStart({ active }) {
            if (!hasDraggableData(active)) return;
            if (active.data.current?.type === "Column") {
                const startColumnIdx = columnsId.findIndex((id) => id === active.id);
                const startColumn = columns[startColumnIdx];
                return `Picked up Column ${startColumn?.title} at position: ${
                    startColumnIdx + 1
                } of ${columnsId.length}`;
            } else if (active.data.current?.type === "Task") {
                pickedUpTaskColumn.current = active.data.current.task.status;
                const { tasksInColumn, taskPosition, column } = getTaskData(
                    active.id as string,
                    pickedUpTaskColumn.current
                );
                return `Picked up Task ${
                    active.data.current.task.title
                } at position: ${taskPosition + 1} of ${
                    tasksInColumn.length
                } in column ${column?.title}`;
            }
        },
        onDragOver({ active, over }) {
            if (!hasDraggableData(active) || !hasDraggableData(over)) return;

            if (
                active.data.current?.type === "Column" &&
                over.data.current?.type === "Column"
            ) {
                const overColumnIdx = columnsId.findIndex((id) => id === over.id);
                return `Column ${active.data.current.column.title} was moved over ${
                    over.data.current.column.title
                } at position ${overColumnIdx + 1} of ${columnsId.length}`;
            } else if (
                active.data.current?.type === "Task" &&
                over.data.current?.type === "Task"
            ) {
                const { tasksInColumn, taskPosition, column } = getTaskData(
                    over.id as string,
                    over.data.current.task.status
                );
                if (over.data.current.task.status !== pickedUpTaskColumn.current) {
                    return `Task ${
                        active.data.current.task.title
                    } was moved over column ${column?.title} in position ${
                        taskPosition + 1
                    } of ${tasksInColumn.length}`;
                }
                return `Task was moved over position ${taskPosition + 1} of ${
                    tasksInColumn.length
                } in column ${column?.title}`;
            }
        },
        onDragEnd({ active, over }) {
            if (!hasDraggableData(active) || !hasDraggableData(over)) {
                pickedUpTaskColumn.current = null;
                return;
            }
            if (
                active.data.current?.type === "Column" &&
                over.data.current?.type === "Column"
            ) {
                const overColumnPosition = columnsId.findIndex((id) => id === over.id);
                return `Column ${
                    active.data.current.column.title
                } was dropped into position ${overColumnPosition + 1} of ${
                    columnsId.length
                }`;
            } else if (
                active.data.current?.type === "Task" &&
                over.data.current?.type === "Task"
            ) {
                const { tasksInColumn, taskPosition, column } = getTaskData(
                    over.id as string,
                    over.data.current.task.status
                );
                if (over.data.current.task.status !== pickedUpTaskColumn.current) {
                    return `Task was dropped into column ${column?.title} in position ${
                        taskPosition + 1
                    } of ${tasksInColumn.length}`;
                }
                return `Task was dropped into position ${taskPosition + 1} of ${
                    tasksInColumn.length
                } in column ${column?.title}`;
            }
            pickedUpTaskColumn.current = null;
        },
        onDragCancel({ active }) {
            pickedUpTaskColumn.current = null;
            if (!hasDraggableData(active)) return;
            return `Dragging ${active.data.current?.type} cancelled.`;
        },
    };

    return announcements;
}