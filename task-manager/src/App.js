import React, { useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useTasks } from './context/TaskContext';
import Header from './components/Header';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './styles/main.css';

const App = () => {
  const { tasks, loadTasks, toggleComplete } = useTasks();

  useEffect(() => {
    loadTasks();
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskId = parseInt(draggableId);
    
    // If moving between lists (incomplete ↔ complete)
    if (destination.droppableId !== source.droppableId) {
      toggleComplete(taskId);
    }
  };

  return (
    <div className="app">
      <Header />
      <AddTask />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-lists-container">
          <TaskList tasks={tasks} status="incomplete" />
          <TaskList tasks={tasks} status="completed" />
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;