export type TaskFrequency = 'daily' | 'weekly' | 'monthly' | 'once';

export interface Task {
  id: string;
  title: string;
  description?: string;
  frequency: TaskFrequency;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  dueDate?: string;
}

export type TasksByFrequency = {
  [key in TaskFrequency]: Task[];
};
