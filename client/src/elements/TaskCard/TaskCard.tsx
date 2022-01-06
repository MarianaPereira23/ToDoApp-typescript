import React from 'react';
import axios from 'axios';
import './TaskCard.css';

interface Props {
  task: Task;
  setUpdate(task: string): void;
}

const TaskCard: React.FC<Props> = ({ task, setUpdate }) => {

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios.delete(`http://localhost:8000/task/delete/${task.name}`);
    const deleted: string = "Deleted";
    return setUpdate(deleted);
  };

  return (
    <div className="task-card">
      <div className="task-card__top">
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
