import {Task} from "@/types";

export type tasksComponentProps = {
    tasks: Task[];
}
export default function TasksComponent({tasks}: tasksComponentProps) {
    return (
        <p>{tasks.length}</p>
    )
}