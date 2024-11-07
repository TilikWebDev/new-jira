import React, { useCallback } from 'react';
import Modal from '@components/modal';
import { Task } from '@appTypes/tasks';
import { useModal } from '@context/modals-context';
import { useTasks } from '@context/tasks-context';

type RemoveTaskProps = {
  task: Task;
};

const RemoveTask: React.FC<RemoveTaskProps> = ({ task }) => {
  const { removeTask } = useTasks();
  const { closeModal } = useModal();

  const onConfirmDelete = useCallback((task: Task) => {
    removeTask(task);
    closeModal();
  }, []);

  return (
    <Modal
      title="Do you want to remove task?"
      body={
        <p className="text-gray-600 dark:text-gray-300">
          Are you sure you want to delete the task{' '}
          <strong>"{task.title}"</strong>?
        </p>
      }
      actions={{
        cancelButton: {
          label: 'Cancel',
          onClick: closeModal,
          variant: 'outline',
        },
        confirmButton: {
          label: 'Confirm',
          onClick: () => onConfirmDelete(task),
          variant: 'destructive',
        },
      }}
    />
  );
};

export default React.memo(RemoveTask);
