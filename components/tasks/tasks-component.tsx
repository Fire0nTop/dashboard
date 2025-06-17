import {Task} from "@/types";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {CheckSquareIcon, Kanban, List} from "lucide-react";

export type tasksComponentProps = {
    tasks?: Task[];
    tasksCollectionId?: string;
}
export default function TasksComponent() {
    return (
        <Tabs defaultValue="kanban">
            <ScrollArea>
                <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
                    <TabsTrigger value="list" className="tab-trigger">
                        <List className="-ms-0.5 me-1.5 opacity-60" size={16}/>
                        List
                    </TabsTrigger>

                    <TabsTrigger value="kanban" className="tab-trigger">
                        <Kanban className="-ms-0.5 me-1.5 opacity-60" size={16}/>
                        Kanban
                    </TabsTrigger>

                    <TabsTrigger value="my-tasks" className="tab-trigger">
                        <CheckSquareIcon className="-ms-0.5 me-1.5 opacity-60" size={16}/>
                        My Tasks
                    </TabsTrigger>
                </TabsList>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>

            <TabsContent value="list">
                <p>List</p>
            </TabsContent>

            <TabsContent value="kanban">
                <p>Kanban</p>
            </TabsContent>

            <TabsContent value="my-tasks">
                <p>My Tasks</p>
            </TabsContent>
        </Tabs>
    )
}