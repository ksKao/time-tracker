import { TaskContext } from "@/components/task-context";
import { useContext } from "react";

export const useTasks = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error("useTasks must be used within a TaskContextProvider");
	}
	return context;
};
