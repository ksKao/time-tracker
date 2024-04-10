import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdModeEdit } from "react-icons/md";
import type { Time } from "@/lib/types";
import { useTasks } from "@/lib/hooks/useTask";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";

export default function EditTimeModal({ time }: { time: Time }) {
	const [open, setOpen] = useState(false);
	const [startTime, setStartTime] = useState(time.start);
	const [endTime, setEndTime] = useState(time.end);
	const { tasks, setTasks } = useTasks();
	const { toast } = useToast();

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		// check if start and end time is valid
		if (isNaN(Date.parse(startTime))) {
			toast({
				variant: "destructive",
				description: "Invalid Start Time",
			});
			return;
		} else if (endTime && isNaN(Date.parse(endTime))) {
			toast({
				variant: "destructive",
				description: "Invalid End Time",
			});
			return;
		}

		const updatedTasks = tasks.map((task) => {
			task.times.forEach((t) => {
				if (t.id === time.id) {
					t.start = startTime;
					t.end = endTime;
				}
			});

			return task;
		});

		setTasks(updatedTasks);
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				if (open) {
					setStartTime(time.start);
					setEndTime(time.end);
				}
				setOpen(open);
			}}
		>
			<DialogTrigger asChild>
				<Button size="icon">
					<MdModeEdit />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Time</DialogTitle>
				</DialogHeader>
				<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
					<div className="grid min-w-full max-w-sm items-center gap-1.5">
						<Label htmlFor="startTime">Start Time</Label>
						<Input
							id="startTime"
							placeholder="Start Time"
							value={startTime}
							onChange={(e) => setStartTime(e.target.value)}
						/>
					</div>
					<div className="grid min-w-full max-w-sm items-center gap-1.5">
						<Label htmlFor="startTime">End Time</Label>
						<Input
							id="endTime"
							placeholder="End Time"
							value={endTime}
							onChange={(e) => setEndTime(e.target.value)}
						/>
					</div>
					<Button>Confirm</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
