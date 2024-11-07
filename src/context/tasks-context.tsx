import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task, TaskStatuses } from '@appTypes/tasks';

type TaskStateKeys = 'todo' | 'inprogress' | 'done';

type TasksContextType = {
  tasks: {
    todo: Task[];
    inprogress: Task[];
    done: Task[];
  };
  addTask: (task: Task) => void;
  removeTask: (task: Task) => void;
  editTask: (updatedTask: Task) => void;
  updateTaskStatus: (
    taskId: number,
    newStatus: TaskStatuses,
    position: number
  ) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const statusToKey = (status: TaskStatuses): TaskStateKeys => {
  switch (status) {
    case TaskStatuses.toDo:
      return 'todo';
    case TaskStatuses.inProgress:
      return 'inprogress';
    case TaskStatuses.Done:
      return 'done';
    default:
      throw new Error('Unknown status');
  }
};

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<{
    todo: Task[];
    inprogress: Task[];
    done: Task[];
  }>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks
      ? JSON.parse(savedTasks)
      : { todo: [], inprogress: [], done: [] };
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    const key = statusToKey(task.status);
    setTasks((prevTasks) => ({
      ...prevTasks,
      [key]: [...prevTasks[key], task],
    }));
  };

  const removeTask = (task: Task) => {
    const key = statusToKey(task.status);
    setTasks((prevTasks) => ({
      ...prevTasks,
      [key]: prevTasks[key].filter((t) => t.id !== task.id),
    }));
  };

  const editTask = (updatedTask: Task) => {
    const key = statusToKey(updatedTask.status);
    setTasks((prevTasks) => ({
      ...prevTasks,
      [key]: prevTasks[key].map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    }));
  };

  const updateTaskStatus = (
    taskId: number,
    newStatus: TaskStatuses,
    position: number
  ) => {
    setTasks((prevTasks) => {
      const sourceKey = Object.keys(prevTasks).find((key) =>
        prevTasks[key as TaskStateKeys].some((task) => task.id === taskId)
      ) as TaskStateKeys;

      if (!sourceKey) return prevTasks;

      const taskIndex = prevTasks[sourceKey].findIndex(
        (task) => task.id === taskId
      );
      const [movedTask] = prevTasks[sourceKey].splice(taskIndex, 1);
      movedTask.status = newStatus;

      const destinationKey = statusToKey(newStatus);
      const updatedList = [...prevTasks[destinationKey]];
      updatedList.splice(position, 0, movedTask);

      return {
        ...prevTasks,
        [destinationKey]: updatedList,
      };
    });
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, removeTask, editTask, updateTaskStatus }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasks must be used within a TasksProvider');
  return context;
};
