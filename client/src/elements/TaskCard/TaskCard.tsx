import React from 'react';
import axios from 'axios';
import './TaskCard.css';

interface Props {
  task: Task;
  setUpdate(task: string): void;
}

const TaskCard: React.FC<Props> = ({ task, setUpdate }) => {
  const toggleStatus = async () => {
    await axios.put('http://localhost:8000/task/toggle', task);
    return setUpdate('Updated');
  };

  const handleStatusChange = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    await toggleStatus();
    console.log('Ran this');
    e.stopPropagation();
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios.delete(`http://localhost:8000/task/delete/${task.name}`);
    
    console.log('Ran');
    return setUpdate('Deleted');
  };

  return (
    <div className="task-card">
      <div className="task-card__top" onClick={handleStatusChange}>
        <h3 className="task-card__name">{task.name}</h3>
        <button className="task-card__remove" onClick={handleDelete}>X</button>
      </div>
      {task.description !== "" &&
        <p className="task-card__description">{task.description}</p>
      }
    </div>
  );
};

export default TaskCard;
