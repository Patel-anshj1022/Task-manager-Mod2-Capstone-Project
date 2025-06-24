import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';
import '../styles/TaskList.css';

const TaskList = ({ tasks, status }) => {
  const filteredTasks = tasks
    .filter(task => status === 'completed' ? task.completed : !task.completed)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className={`task-list ${status}`}>
      <h2>{status === 'completed' ? '✅ Completed Tasks' : '📝 Incomplete Tasks'}</h2>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            className={`tasks-container ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
          >
            {filteredTasks.map((task, index) => (
              <Task 
                key={task.id} 
                task={task} 
                index={index}
                provided={provided}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;