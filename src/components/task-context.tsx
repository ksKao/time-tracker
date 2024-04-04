import { createContext, useEffect, useState } from "react";
import type { Task, TaskContextType } from "@/lib/types";

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		const taskString = localStorage.getItem("tasks");

		if (taskString) {
			setTasks(JSON.parse(taskString));
		}
	}, []);

	const setTaskWithLocalStorage = (tasks: Task[]) => {
		setTasks(tasks);

		localStorage.setItem("tasks", JSON.stringify(tasks));
	};

	return (
		<TaskContext.Provider
			value={{
				tasks,
				setTasks: setTaskWithLocalStorage,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};
