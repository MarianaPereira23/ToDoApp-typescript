import React from 'react';
import axios from 'axios';
import './TaskCard.css';

interface Props {
  task: Task;
  setUpdate(task: string): void;
}

const TaskCard: React.FC<Props> = ({ task, setUpdate }) => {
  const handleStatusChange = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    await axios.put('http://localhost:8000/task/toggle', task);
    setUpdate('Updated');
    e.stopPropagation();
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios.delete(`http://localhost:8000/task/delete/${task.name}`);
    setUpdate('Deleted');
    e.stopPropagation();
  };

  return (
    <div className="task-card">
      <div className="task-card__left">
        <input className="task-card__checkbox" type="checkbox" checked={task.status ==="Done" ? true : false} onChange={handleStatusChange} />
      </div>
      <div className="task-card__right">
        <div className="task-card__top">
          <h3 className="task-card__name">{task.name}</h3>
          <button className="task-card__remove" onClick={handleDelete}>X</button>
        </div>
        {task.description !== "" &&
          <p className="task-card__description">{task.description}</p>
        }
      </div>
    </div>
  );
};

export default TaskCard;
