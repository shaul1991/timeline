'use client';

import { Task } from '@/types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onSubtaskToggle: (taskId: string, subtaskId: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit, onSubtaskToggle }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        등록된 작업이 없습니다.
      </div>
    );
  }

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="space-y-6">
      {pendingTasks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            진행 중 ({pendingTasks.length})
          </h3>
          <div className="space-y-2">
            {pendingTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                onSubtaskToggle={onSubtaskToggle}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            완료됨 ({completedTasks.length})
          </h3>
          <div className="space-y-2">
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                onSubtaskToggle={onSubtaskToggle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
