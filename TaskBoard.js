import React, { useState } from 'react';
import '../../styles/TaskBoard.css'; // Ensure this path is correct

const initialTasks = {
  todo: [{ id: '1', content: 'Task 1' }],
  inProgress: [{ id: '2', content: 'Task 2' }],
  inReview: [{ id: '3', content: 'Task 3' }],
  inTesting: [{ id: '4', content: 'Task 4' }],
  deployed: [{ id: '5', content: 'Task 5' }],
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragStart = (e, taskId, sourceColumnId) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceColumnId', sourceColumnId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnId) => {
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');

    if (sourceColumnId === targetColumnId) return;

    const sourceItems = tasks[sourceColumnId].filter(task => task.id !== taskId);
    const draggedTask = tasks[sourceColumnId].find(task => task.id === taskId);
    const targetItems = [...tasks[targetColumnId], draggedTask];

    setTasks({
      ...tasks,
      [sourceColumnId]: sourceItems,
      [targetColumnId]: targetItems,
    });
  };

  return (
    <div className="board-container">
      {Object.entries(tasks).map(([columnId, columnTasks]) => (
        <div
          className="column"
          key={columnId}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, columnId)}
        >
          <h2>{columnId}</h2>
          {columnTasks.map(task => (
            <div
              key={task.id}
              className="task"
              draggable
              onDragStart={(e) => handleDragStart(e, task.id, columnId)}
            >
              {task.content}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;