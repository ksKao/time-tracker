export type TaskContextType = {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
};

export type Time = {
	start: string;
	end?: string;
	break: boolean;
};

export type Task = {
	id: string;
	name: string;
	times: Time[];
};
