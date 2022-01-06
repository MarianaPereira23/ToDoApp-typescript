import React from 'react';
import './TaskCard.css';

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  return (
    <div className="task-card">
      <div className="task-card__top">
        <h3 className="task-card__name">{task.name}</h3>
        <button className="task-card__remove">X</button>
      </div>
      {task.description !== "" &&
        <p className="task-card__description">{task.description}</p>
      }
    </div>
  );
};

export default TaskCard;
