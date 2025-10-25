'use client';

import { useState } from 'react';
import { Task, TaskFrequency } from '@/types/task';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';

export default function Home() {
  const [tasks, setTasks, isLoading] = useLocalStorage<Task[]>('tasks', []);
  const [activeTab, setActiveTab] = useState<TaskFrequency>('daily');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      setTasks(tasks.map(t =>
        t.id === editingTask.id
          ? { ...taskData, id: editingTask.id, createdAt: editingTask.createdAt }
          : t
      ));
      setEditingTask(null);
    } else {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }
    setShowForm(false);
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : undefined
          }
        : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('정말 이 작업을 삭제하시겠습니까?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const tasksByFrequency = tasks.filter(task => task.frequency === activeTab);

  const tabs: { key: TaskFrequency; label: string }[] = [
    { key: 'daily', label: '매일' },
    { key: 'weekly', label: '매주' },
    { key: 'monthly', label: '매월' },
    { key: 'once', label: '일회성' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            작업 관리
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            매일, 매주, 매월, 일회성 작업을 효율적으로 관리하세요
          </p>
        </header>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
                <span className="ml-2 text-sm opacity-75">
                  ({tasks.filter(t => t.frequency === tab.key).length})
                </span>
              </button>
            ))}
          </div>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              + 새 작업 추가
            </button>
          )}
        </div>

        {showForm && (
          <div className="mb-6">
            <TaskForm
              onSubmit={handleAddTask}
              onCancel={handleCancelForm}
              editingTask={editingTask}
              defaultFrequency={activeTab}
            />
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <TaskList
            tasks={tasksByFrequency}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>모든 데이터는 브라우저 로컬 스토리지에 안전하게 저장됩니다.</p>
        </footer>
      </div>
    </div>
  );
}
