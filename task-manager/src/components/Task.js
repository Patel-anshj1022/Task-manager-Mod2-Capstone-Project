import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import '../styles/Task.css';

const Task = ({ task, provided }) => {
  const { toggleComplete, updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() !== '' && editText !== task.title) {
      updateTask(task.id, editText);
    }
    setIsEditing(false);
  };

  return (
    <div
      className={`task ${task.completed ? 'completed' : ''}`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="task-content">
        <button 
          className={`complete-btn ${task.completed ? 'completed' : ''}`}
          onClick={() => toggleComplete(task.id)}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed ? '✓' : ''}
        </button>
        
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="edit-form">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleEditSubmit}
              onKeyDown={(e) => e.key === 'Escape' && setIsEditing(false)}
              autoFocus
            />
          </form>
        ) : (
          <span 
            className="task-text" 
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.title}
          </span>
        )}
      </div>
      
      <div className="task-actions">
        {!isEditing && (
          <>
            <button 
              className="edit-btn" 
              onClick={() => setIsEditing(true)}
              aria-label="Edit task"
            >
              ✏️
            </button>
            <button 
              className="delete-btn" 
              onClick={() => deleteTask(task.id)}
              aria-label="Delete task"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Task;