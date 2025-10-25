export type TaskFrequency = 'daily' | 'weekly' | 'monthly' | 'once';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  frequency: TaskFrequency;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  dueDate?: string;
  subtasks?: Subtask[];
}

export type TasksByFrequency = {
  [key in TaskFrequency]: Task[];
};
