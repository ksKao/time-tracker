/* eslint-disable no-mixed-spaces-and-tabs */
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/lib/hooks/useTask";
import { calculateTotalTime, formatDate } from "@/lib/utils";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export default function TaskItem({ task }: { task: Task }) {
	const { tasks, setTasks } = useTasks();
	const totalTime = calculateTotalTime(task);

	const startTask = () => {
		const updatedTask = tasks.map((t) => {
			t.times.forEach((time) => {
				if (!time.end) time.end = new Date().toString();
			});

			if (t.id == task.id) {
				t.times.push({
					start: new Date().toString(),
					break: false,
				});
			}

			return t;
		});

		setTasks(updatedTask);
	};

	const pauseTask = () => {
		const updatedTask = tasks.map((t) => {
			if (t.id == task.id) {
				t.times.forEach((time) => {
					if (!time.end) time.end = new Date().toString();
				});
			}

			return t;
		});

		setTasks(updatedTask);
	};

	const deleteTask = () => {
		setTasks(tasks.filter((t) => t.id !== task.id));
	};

	const breakTime = (isBreak: boolean, index: number) => {
		const updatedTask = tasks.map((t) => {
			if (t.id == task.id) {
				t.times.forEach((time, i) => {
					if (i === index) time.break = isBreak;
				});
			}

			return t;
		});

		setTasks(updatedTask);
	};

	return (
		<AccordionItem value={task.id}>
			<AccordionTrigger>
				{task.name} (
				{totalTime
					? `${totalTime.hours ? totalTime.hours + "h " : ""}${
							totalTime.minutes ? totalTime.minutes + "m" : ""
					  }`
					: "Not started"}
				)
			</AccordionTrigger>
			<AccordionContent>
				{task.times.length ? (
					<Table className="mb-6">
						<TableHeader>
							<TableRow>
								<TableHead>Start</TableHead>
								<TableHead>End</TableHead>
								<TableHead>Break</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{task.times.map((time, i) => (
								<TableRow key={i}>
									<TableCell>{formatDate(time.start)}</TableCell>
									<TableCell>{time.end ? formatDate(time.end) : "TBD"}</TableCell>
									<TableCell>
										<Checkbox
											onCheckedChange={(checked) =>
												breakTime(checked === true, i)
											}
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : null}
				<div className="flex w-full justify-between gap-2 items-center">
					<Button className="flex-grow" onClick={startTask}>
						Start
					</Button>
					<Button className="flex-grow" onClick={pauseTask}>
						Pause
					</Button>
					<Button className="flex-grow" variant="destructive" onClick={deleteTask}>
						Delete
					</Button>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}
