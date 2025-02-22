import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor } from '@dnd-kit/core';
import React, { act, useState } from 'react';
import Column from './components/Column';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const App = () => {
  const getTasks = localStorage.getItem('tasks');
  const savedTasks = JSON.parse(getTasks) || [
    { id: 1, content: 'Task 1' },
    { id: 2, content: 'Task 2' },
    { id: 3, content: 'Task 3' },
    { id: 4, content: 'Task 4' },
    { id: 5, content: 'Task 5' },
  ];

  const [tasks, setTasks] = useState(savedTasks);

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setTasks(tasks => {
        const orginalPos = getTaskPos(active.id);
        const newPos = getTaskPos(over.id);

        const updatedTasks = arrayMove(tasks, orginalPos, newPos).map((task, index) => ({
          ...task,
          id: index + 1,
        }));
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;

        // return arrayMove(tasks, orginalPos, newPos);
      })
    }
    return tasks;
  };

  const sensors = useSensor(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )


  return (
    <div className='mt-10'>
      <h1 className='text-center text-xl font-bold'>My Tasks</h1>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <div className='max-w-sm mx-auto mt-10'>
          <Column tasks={tasks} />
        </div>
      </DndContext>
    </div>
  );
};

export default App;