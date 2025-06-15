import { useState, useMemo, useRef } from "react";
import {
    useSensors,
    useSensor,
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column, Task } from "@/types/kanban/tasks";
import { hasDraggableData, normalizeStatus } from "@/lib/dragutils.util";

interface UseKanbanProps {
    initialTasks: Task[];
    columnNames: string[];
    onTaskMove?: (taskId: string, newStatus: string) => void;
    onColumnReorder?: (columns: Column[]) => void;
}

export function useKanban({
                              initialTasks,
                              columnNames,
                              onTaskMove,
                              onColumnReorder,
                          }: UseKanbanProps) {
    const initialColumns: Column[] = useMemo(() => {
        const columns = columnNames.map((name) => ({
            id: normalizeStatus(name),
            title: name,
        }));

        const hasUnmatchedTasks = initialTasks.some(
            (task) => !columnNames.some((col) => normalizeStatus(col) === normalizeStatus(task.status))
        );

        if (hasUnmatchedTasks) {
            columns.push({
                id: "undefined",
                title: "Undefined",
            });
        }

        return columns;
    }, [columnNames, initialTasks]);

    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const pickedUpTaskColumn = useRef<string | null>(null);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    useMemo(() => {
        const newColumns = columnNames.map((name) => ({
            id: normalizeStatus(name),
            title: name,
        }));

        const hasUnmatchedTasks = tasks.some(
            (task) => !columnNames.some((col) => normalizeStatus(col) === normalizeStatus(task.status))
        );

        if (hasUnmatchedTasks) {
            newColumns.push({
                id: "undefined",
                title: "Undefined",
            });
        }

        setColumns(newColumns);
    }, [columnNames, tasks]);

    useMemo(() => {
        setTasks(initialTasks);
    }, [initialTasks]);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor)
    );

    function getTaskData(taskId: string, status: string) {
        const tasksInColumn = tasks.filter(
            (task) => getColumnForTask(task).id === getColumnIdFromStatus(status)
        );
        const taskPosition = tasksInColumn.findIndex((task) => task.id === taskId);
        const column = columns.find((col) => col.id === getColumnIdFromStatus(status));
        return {
            tasksInColumn,
            taskPosition,
            column,
        };
    }

    function getColumnIdFromStatus(status: string): string {
        const normalizedStatus = normalizeStatus(status);
        const matchingColumn = columns.find((col) => col.id === normalizedStatus);
        if (matchingColumn) return matchingColumn.id;

        const matchingColumnByTitle = columns.find(
            (col) => normalizeStatus(col.title) === normalizedStatus
        );
        if (matchingColumnByTitle) return matchingColumnByTitle.id;

        return "undefined";
    }

    function getColumnForTask(task: Task): Column {
        const columnId = getColumnIdFromStatus(task.status);
        return (
            columns.find((col) => col.id === columnId) ||
            columns.find((col) => col.id === "undefined")!
        );
    }

    function getStatusFromColumnId(columnId: string): string {
        if (columnId === "undefined") return "pending";
        const column = columns.find((col) => col.id === columnId);
        return column ? column.title : "pending";
    }

    function onDragStart(event: DragStartEvent) {
        if (!hasDraggableData(event.active)) return;
        const data = event.active.data.current;
        if (data?.type === "Column") {
            setActiveColumn(data.column);
            return;
        }
        if (data?.type === "Task") {
            setActiveTask(data.task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (!hasDraggableData(active)) return;

        const activeData = active.data.current;
        if (activeId === overId) return;

        const isActiveAColumn = activeData?.type === "Column";
        if (!isActiveAColumn) return;

        setColumns((columns) => {
            const activeIndex = columns.findIndex((col) => col.id === activeId);
            const overIndex = columns.findIndex((col) => col.id === overId);
            const newColumns = arrayMove(columns, activeIndex, overIndex);
            onColumnReorder?.(newColumns);
            return newColumns;
        });
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;

        if (!hasDraggableData(active) || !hasDraggableData(over)) return;

        const activeData = active.data.current;
        const overData = over.data.current;

        const isActiveATask = activeData?.type === "Task";
        const isOverATask = overData?.type === "Task";
        const isOverAColumn = overData?.type === "Column";

        if (!isActiveATask) return;

        // Task over another Task
        if (isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);
                const activeTask = tasks[activeIndex];
                const overTask = tasks[overIndex];

                if (activeTask && overTask) {
                    const newStatus = overTask.status;

                    if (activeTask.status !== newStatus) {
                        activeTask.status = newStatus;
                        onTaskMove?.(activeTask.id, newStatus);
                        return arrayMove(tasks, activeIndex, overIndex - 1);
                    }
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        // Task over a Column
        if (isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const activeTask = tasks[activeIndex];
                if (activeTask) {
                    const newStatus = getStatusFromColumnId(overId as string);
                    activeTask.status = newStatus;
                    onTaskMove?.(activeTask.id, newStatus);
                    return arrayMove(tasks, activeIndex, activeIndex);
                }
                return tasks;
            });
        }
    }

    return {
        columns,
        tasks,
        activeColumn,
        activeTask,
        columnsId,
        sensors,
        pickedUpTaskColumn,
        getTaskData,
        getColumnForTask,
        onDragStart,
        onDragEnd,
        onDragOver,
    };
}
