import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";
import {Task, TaskDragData} from "@/types/kanban/tasks";
import {getPriorityVariant} from "@/lib/dragutils.util";

interface CardProps {
    task: Task;
    isOverlay?: boolean;
}

export function TaskCard({ task, isOverlay }: CardProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        } satisfies TaskDragData,
        attributes: {
            roleDescription: "Task",
        },
    });

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    const variants = cva("", {
        variants: {
            dragging: {
                over: "ring-2 opacity-30",
                overlay: "ring-2 ring-primary",
            },
        },
    });

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className={variants({
                dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
            })}
        >
            <CardHeader className="px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative">
                <Button
                    variant={"ghost"}
                    {...attributes}
                    {...listeners}
                    className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
                >
                    <span className="sr-only">Move task</span>
                    <GripVertical />
                </Button>
                <Badge variant={"outline"} className="ml-auto font-semibold">
                    {task.status}
                </Badge>
            </CardHeader>
            <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
                <div className="font-semibold text-sm mb-2">{task.title}</div>
                {task.description && (
                    <div className="text-sm text-muted-foreground mb-2">{task.description}</div>
                )}
                {task.due_date && (
                    <div className="text-xs text-muted-foreground">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                    </div>
                )}
                {task.priority && (
                    <Badge
                        variant={getPriorityVariant(task.priority)}
                        className="mt-2 text-xs"
                    >
                        {task.priority}
                    </Badge>
                )}
            </CardContent>
        </Card>
    );
}