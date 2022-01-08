import React, {useState} from 'react';
import { io, Socket } from "socket.io-client";
import './Forms.css';

const url = 'http://localhost:8080';

const socket: Socket = io(url);

interface Props {
  id: string;
  pendingTasks: Task[];
  setPending(tasks: Task[]): void;
}

const Task: React.FC<Props> = ({ id, pendingTasks, setPending }) => {
  const [taskName, setTaskName] = useState<string>('');
  const [descName, setDescName] = useState<string>('');

  socket.on('newTask', (task: Task) => {
    const newTasks: Task[] = pendingTasks.concat(task);
    setPending(newTasks);
  });

  const handleTaskName = (e: React.ChangeEvent<HTMLInputElement>) => setTaskName(e.currentTarget.value);

  const handleDescName = (e: React.ChangeEvent<HTMLInputElement>) => setDescName(e.currentTarget.value);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskInfo: Task = {
      name: taskName,
      description: descName,
      status: 'Pending',
      list_id: id
    };
    socket.emit('addTask', taskInfo);
    setTaskName('');
    setDescName('');
  };

  return (
    <form className="task-page__form task-form" onSubmit={handleSubmit}>
      <label className="form__label">Create new task</label>
      <input className="form__input" type="text" placeholder="Task name" value={taskName} required onChange={handleTaskName} />
      <input className="form__input" type="text" placeholder="Task description" value={descName} onChange={handleDescName} />
      <button className="form__button" id ="task__button" type="submit">Add</button>
    </form>
  );
};

export default Task;
