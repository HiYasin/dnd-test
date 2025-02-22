import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

const Task = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const style = {
        // transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div
            key={task.id}
            className='bg-white rounded-md shadow-sm mb-2 cursor-move hover:shadow-lg touch-none'
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <div className={`flex gap-3 items-center ${task.color} p-2 font-bold`}>
                <input type="checkbox" name="" id="" />
                {
                    <div className={`text-sm grow`}>
                        {task.content}
                    </div>
                }
            </div>

        </div>
    );
};

export default Task;