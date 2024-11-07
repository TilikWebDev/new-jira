import React, { useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardTitle } from '@ui/card';
import { Button } from '@ui/button';
import { Task } from '@appTypes/tasks';
import { useModal } from '@context/modals-context';
import RemoveTask from '@components/modals/remove-task';
import EditTask from '@components/modals/edit-task';

type TaskCardProps = {
  task: Task;
  index: number;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const { showModal } = useModal();

  const onEditTask = useCallback(() => {
    showModal(<EditTask task={task} />);
  }, [task, showModal]);

  const onRemoveTask = useCallback(() => {
    showModal(<RemoveTask task={task} />);
  }, [task, showModal]);

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mt-6 p-4 bg-gray-50 shadow-sm rounded-lg"
        >
          <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
            {task.title}
          </CardTitle>

          {task.description && (
            <p className="text-gray-600 mb-3">{task.description}</p>
          )}

          <p className="text-sm font-medium text-gray-500 mb-3">
            Status: {task.status}
          </p>

          {task?.files && task.files?.length > 0 && (
            <div className="mt-2 mb-3 space-y-2">
              <p className="text-sm font-medium text-gray-500 mb-1">
                Additional files:
              </p>

              <ul className="list-disc list-inside text-sm text-blue-600 space-y-2">
                {task.files.map((file) => (
                  <li
                    key={file.id}
                    className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded-lg border"
                  >
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-700 dark:text-gray-300"
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline" onClick={onEditTask}>
              Edit
            </Button>

            <Button variant="destructive" onClick={onRemoveTask}>
              Remove
            </Button>
          </div>
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(TaskCard);
