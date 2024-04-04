import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useTasks } from "@/lib/hooks/useTask";

export default function CreateNewTaskModal() {
	const { tasks, setTasks } = useTasks();
	const [taskName, setTaskName] = useState("");
	const [modalOpen, setModalOpen] = useState(false);

	const addTask: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (!taskName) return;

		setTasks([
			...tasks,
			{
				name: taskName,
				times: [],
			},
		]);

		setTaskName("");
		setModalOpen(false);
	};

	return (
		<>
			<Dialog open={modalOpen} onOpenChange={(open) => setModalOpen(open)}>
				<DialogTrigger asChild>
					<Button className="w-full">Create New Task</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Task</DialogTitle>
						<form onSubmit={addTask}>
							<div className="mt-2">
								<Label htmlFor="taskName">Task Name</Label>
								<Input
									type="text"
									id="taskName"
									placeholder="Task Name"
									className="mt-2"
									value={taskName}
									onChange={(e) => setTaskName(e.target.value)}
								/>
								<Button type="submit" className="mt-4 w-full">
									Create Task
								</Button>
							</div>
						</form>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
}
