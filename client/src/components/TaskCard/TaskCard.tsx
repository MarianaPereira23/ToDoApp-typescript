import React from 'react';
import { io, Socket } from "socket.io-client";
import axios from 'axios';
import './TaskCard.css';

const url = 'http://localhost:8080';

const socket: Socket = io(url);

interface Props {
  task: Task;
  setPending(tasks: Task[]): void;
  setDone(tasks: Task[]): void;
};

const TaskCard: React.FC<Props> = ({ task, setPending, setDone }) => {
  socket.on('tasks', (tasks: Task[]) => {
    const pending: Task[] = tasks.filter(task => task.status === "Pending");
    const done: Task[] = tasks.filter(task => task.status === "Done");
    setPending(pending);
    setDone(done);
  });

  // const handleStatusChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   await axios.put('http://localhost:8000/task/toggle', task);
  //   const updated: string = 'Updated' + Date.now();
  //   // setUpdate(updated);
  //   e.stopPropagation();
  // };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => socket.emit('deleteTask', task.name, task.list_id);

  return (
    <div className="task-card">
      <div className="task-card__left">
        {/* <input className="task-card__checkbox" type="checkbox" checked={task.status ==="Done" ? true : false} onChange={handleStatusChange} /> */}
      </div>
      <div className="task-card__right">
        <div className="task-card__top">
          <h3 className="task-card__name">{task.name}</h3>
          <button className="task-card__remove" onClick={handleDelete}>X</button>
        </div>
        <p className="task-card__description">{task.description}</p>
      </div>
    </div>
  );
};

export default TaskCard;
