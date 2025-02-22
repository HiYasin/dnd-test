import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor } from '@dnd-kit/core';
import React, { act, useState } from 'react';
import Column from './components/Column';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const App = () => {
  const getTasks = localStorage.getItem('tasks');
  const savedTasks = JSON.parse(getTasks) || [
    { id: 1, content: 'Faisal', category: 'Todo', color: 'bg-red-300' },
    { id: 2, content: 'Ahammod', category: 'Doing', color: 'bg-blue-300' },
    { id: 3, content: 'Yasin', category: 'Todo', color: 'bg-yellow-300' },
    { id: 4, content: 'Nazmul', category: 'Done', color: 'bg-green-300' },
    { id: 5, content: 'Abir', category: 'Todo', color: 'bg-pink-300' },
  ];

  const [tasks, setTasks] = useState(savedTasks);

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);
  const getCategory = (id) => tasks.filter((task) => task.id === id)[0].category;

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setTasks(tasks => {
        const orginalPos = getTaskPos(active.id);
        const newPos = getTaskPos(over.id);

        console.log(orginalPos, newPos);

        const oldCategory = getCategory(active.id);
        const newCategory = getCategory(over.id);
        //console.log(active.id, oldCategory);
        //console.log(over.id, newCategory);

        const updatedTasks = arrayMove(tasks, orginalPos, newPos).map((task, index) => ({
          ...task,
          category: index === newPos ? newCategory : task.category
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
        <div className='max-w-screen-lg mx-auto mt-10'>
          <div className="grid grid-cols-3 gap-4">
            {
              ['Todo', 'Doing', 'Done'].map(item=>{
                return <Column key={item} tasks={tasks} category={item} /> 
              }) 
            }
          </div>
        </div>
      </DndContext>
    </div>
  );
};

export default App;