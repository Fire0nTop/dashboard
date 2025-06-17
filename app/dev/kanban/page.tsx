"use client";

import React from "react";
import { Kanban  } from "@/components/kanban/Kanban";
import {Task} from "@/types/kanban/tasks";
import {BackgroundWrapper} from "@/components/custom-ui/background-wrapper";

const dummyTasks: Task[] = [
    {
        id: "1",
        status: "To Do",
        content: "Set up project structure",
        title: "",
        priority: "",
        created_at: "",
        updated_at: "",
        created_by: ""
    },
    {
        id: "2",
        status: "To Do",
        content: "Design landing page layout",
        title: "",
        priority: "",
        created_at: "",
        updated_at: "",
        created_by: ""
    },
    {
        id: "3",
        status: "In Progress",
        content: "Implement user authentication",
        title: "",
        priority: "",
        created_at: "",
        updated_at: "",
        created_by: ""
    },
    {
        id: "4",
        status: "In Progress",
        content: "Connect to backend API",
        title: "",
        priority: "",
        created_at: "",
        updated_at: "",
        created_by: ""
    },
    {
        id: "5",
        status: "Done",
        content: "Initial commit and repo setup",
        title: "",
        priority: "",
        created_at: "",
        updated_at: "",
        created_by: ""
    },
    {
        id: "6",
        status: "Done",
        content: "Install dependencies",
        title: "",
        priority: "",
        created_at: "",
        updated_at: "",
        created_by: ""
    },
    {
        id: "7",
        status: "Review",
        content: "Code review for feature X",
        title: "",
        priority: "",
        created_at: "",
        updated_at: "",
        created_by: ""
    },
];

const columnNames = ["To Do", "In Progress", "Review", "Done"];

export default function KanbanDemoPage() {
    return (
        <BackgroundWrapper>
            <Kanban
                tasks={dummyTasks}
                columnNames={columnNames}
                onTaskMove={(id, status) =>
                    console.log(`Task ${id} moved to ${status}`)
                }
                onColumnReorder={(columns) =>
                    console.log("Columns reordered:", columns.map((c) => c.title))
                }
            />
        </BackgroundWrapper>
    );
}
