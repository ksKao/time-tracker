import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";
import type { Time } from "@/lib/types";
import { useTasks } from "@/lib/hooks/useTask";
import { useState } from "react";

export default function DeleteTimeModal({ time }: { time: Time }) {
	const { tasks, setTasks } = useTasks();
	const [open, setOpen] = useState(false);

	const confirmDelete = () => {
		const updatedTask = tasks.map((task) => {
			task.times = task.times.filter((t) => t.id !== time.id);

			return task;
		});

		setOpen(false);
		setTasks(updatedTask);
	};

	return (
		<Dialog open={open} onOpenChange={(open) => setOpen(open)}>
			<DialogTrigger asChild>
				<Button size="icon" variant="destructive">
					<FaTrash />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirm Delete</DialogTitle>
				</DialogHeader>
				Are you sure you want to delete this time? You cannot undo this action.
				<Button variant="destructive" className="w-fit ml-auto" onClick={confirmDelete}>
					Confirm
				</Button>
			</DialogContent>
		</Dialog>
	);
}
