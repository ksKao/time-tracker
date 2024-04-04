import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/lib/hooks/useTask";

export default function TaskItem({ task }: { task: Task }) {
	const { tasks, setTasks } = useTasks();

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

	const deleteTask = () => {
		setTasks(tasks.filter((t) => t.id !== task.id));
	};

	return (
		<AccordionItem value={task.id}>
			<AccordionTrigger>{task.name}</AccordionTrigger>
			<AccordionContent>
				{task.times.map((time, i) => (
					<div key={i}>
						<p>
							{new Date(time.start).toString()} -{" "}
							{time.end ? new Date(time.end).toString() : "TBD"}
						</p>
					</div>
				))}
				<div className="flex w-full justify-between gap-2 items-center">
					<Button className="flex-grow" onClick={startTask}>
						Start Now
					</Button>
					<Button className="flex-grow" variant="destructive" onClick={deleteTask}>
						Delete Task
					</Button>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}
