import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React from 'react';
import Task from './Task';

const Column = ({ tasks }) => {
    return (
        <div className='bg-gray-200 p-4 rounded-md'>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </SortableContext>

        </div>
    );
};

export default Column;