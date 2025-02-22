import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Task from './Task';

const Column = ({ tasks, category }) => {

    //console.log(tasks);
    return (
        <div className='bg-gray-200 p-4 rounded-md'>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {
                    tasks.filter(task => task.category === category).map((task) => (
                        <Task key={task.id} task={task}/>
                    ))
                }
            </SortableContext>

        </div>
    );
};

export default Column;