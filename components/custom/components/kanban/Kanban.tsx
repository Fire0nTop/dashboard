"use client"
import { createPortal } from "react-dom";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import {Column, Task} from "@/types/kanban/tasks";
import {useKanban} from "@/hooks/useLogic";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { TaskCard } from "./task-card";
import {KanbanColumn} from "@/components/custom/components/kanban/column";
import { KanbanContainer } from "./container";
import {useEffect, useState} from "react";

interface KanbanProps {
    tasks: Task[];
    columnNames: string[];
    onTaskMove?: (taskId: string, newStatus: string) => void;
    onColumnReorder?: (columns: Column[]) => void;
    className?: string;
}

export function Kanban({
                           tasks: initialTasks,
                           columnNames,
                           onTaskMove,
                           onColumnReorder,
                           className,
                       }: KanbanProps) {
    const {
        columns,
        tasks,
        activeColumn,
        activeTask,
        columnsId,
        sensors,
        getTaskData,
        getColumnForTask,
        onDragStart,
        onDragEnd,
        onDragOver,
    } = useKanban({
        initialTasks,
        columnNames,
        onTaskMove,
        onColumnReorder,
    });

    const announcements = useAnnouncements({
        columns,
        columnsId,
        getTaskData,
    });

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return (
        <div className={className}>
            <DndContext
                accessibility={{ announcements }}
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <KanbanContainer>
                    <SortableContext items={columnsId}>
                        {columns.map((col) => (
                            <KanbanColumn
                                key={col.id}
                                column={col}
                                tasks={tasks.filter((task) => getColumnForTask(task).id === col.id)}
                            />
                        ))}
                    </SortableContext>
                </KanbanContainer>

                {hasMounted &&
                    createPortal(
                        <DragOverlay>
                            {activeColumn && (
                                <KanbanColumn
                                    isOverlay
                                    column={activeColumn}
                                    tasks={tasks.filter(
                                        (task) => getColumnForTask(task).id === activeColumn.id
                                    )}
                                />
                            )}
                            {activeTask && <TaskCard task={activeTask} isOverlay />}
                        </DragOverlay>,
                        document.body
                    )}
            </DndContext>
        </div>
    );
}
