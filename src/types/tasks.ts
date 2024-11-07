export enum TaskStatuses {
  toDo = 'To Do',
  inProgress = 'In Progress',
  Done = 'Done',
}

export type FileAttachment = {
  id: number;
  name: string;
  url: string;
  size?: number;
  type?: string;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatuses;
  files?: FileAttachment[];
};
