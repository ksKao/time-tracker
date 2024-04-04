import CreateNewTaskModal from "./components/create-new-task-modal";
import { Accordion } from "@/components/ui/accordion";
import TaskItem from "./components/task-item";
import { useTasks } from "./lib/hooks/useTask";

function App() {
	const { tasks } = useTasks();

	return (
		<main className="w-[800px] mx-auto mt-8">
			<Accordion type="multiple">
				{tasks.map((t) => (
					<TaskItem task={t} key={t.id} />
				))}
			</Accordion>
			<div className="h-8" />
			<CreateNewTaskModal />
		</main>
	);
}

export default App;
