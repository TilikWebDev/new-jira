import React from 'react';
import { Button } from '@ui/button';
import { useModal } from '@context/modals-context';
import CreateTask from '@components/modals/create-task';

const Header = () => {
  const { showModal } = useModal();

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      <Button onClick={() => showModal(<CreateTask />)}>Add task</Button>
    </div>
  );
};

export default React.memo(Header);
