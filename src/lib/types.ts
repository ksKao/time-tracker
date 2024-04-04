export type TaskContextType = {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
};

export type Time = {
	start: Date;
	end: Date;
	break: boolean;
};

export type Task = {
	name: string;
	times: Time[];
};
