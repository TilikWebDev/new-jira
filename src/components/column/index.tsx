import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from '@components/task-card';
import { Card, CardHeader, CardTitle, CardContent } from '@ui/card';
import { Task } from '@appTypes/tasks';

type ColumnProps = {
  title: string;
  data?: Task[];
  droppableId: string;
};

const Column: React.FC<ColumnProps> = ({ title, data = [], droppableId }) => {
  return (
    <Card className="flex flex-col flex-1 bg-white shadow-md rounded-lg max-h-[calc(100vh-88px)]">
      <CardHeader className="border-b">
        <CardTitle className="text-center text-lg font-semibold text-gray-700">
          {title}
        </CardTitle>
      </CardHeader>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <CardContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex-1 overflow-y-auto"
          >
            {data.map((task, index) => (
              <TaskCard task={task} key={task.id} index={index} />
            ))}
            {provided.placeholder}
          </CardContent>
        )}
      </Droppable>
    </Card>
  );
};

export default React.memo(Column);
