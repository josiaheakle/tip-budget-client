type Checklist = {
	title: string;
	uuid: string;
	tasks: Array<ChecklistTask>;
	createdDate: Date;
};

type ChecklistTask = {
	title: string;
	uuid: string;
	completed: boolean;
	createdDate: Date;
	completedDate?: Date;
	dueDate?: Date;
	description?: string;
	subTasks?: Array<ChecklistTask>;
	assignedTo?: string;
};

export type { Checklist, ChecklistTask };
