import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from '@components/column';
import Header from '@components/header';
import { useTasks } from '@context/tasks-context';
import { TaskStatuses } from '@appTypes/tasks';

function DashBoard() {
  const { tasks, updateTaskStatus } = useTasks();

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const newStatus = destination.droppableId as TaskStatuses;
    const position = destination.index;

    updateTaskStatus(parseInt(draggableId), newStatus, position);
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-1 gap-4">
          <Column title="To Do" data={tasks.todo} droppableId="To Do" />
          <Column
            title="In Progress"
            data={tasks.inprogress}
            droppableId="In Progress"
          />
          <Column title="Done" data={tasks.done} droppableId="Done" />
        </div>
      </DragDropContext>
    </div>
  );
}

export default React.memo(DashBoard);
