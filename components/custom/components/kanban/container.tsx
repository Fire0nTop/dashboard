import { cva } from "class-variance-authority";
import { useDndContext } from "@dnd-kit/core";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ContainerProps {
    children: React.ReactNode;
}

export function KanbanContainer({ children }: ContainerProps) {
    const dndContext = useDndContext();

    const variations = cva("px-2 md:px-0 flex lg:justify-center pb-4", {
        variants: {
            dragging: {
                default: "snap-x snap-mandatory",
                active: "snap-none",
            },
        },
    });

    return (
        <ScrollArea
            className={variations({
                dragging: dndContext.active ? "active" : "default",
            })}
        >
            <div className="flex gap-4 items-start flex-row justify-center">
                {children}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}