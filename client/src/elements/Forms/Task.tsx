import React, {useState} from 'react';
import axios from 'axios';
import './Forms.css';

interface Props {
  id: string;
  setUpdate(task: string): void;
}

const Task: React.FC<Props> = ({ id, setUpdate }) => {
  const [taskName, setTaskName] = useState("");
  const [descName, setDescName] = useState("");

  const handleTaskName = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTaskName(e.currentTarget.value);
  };

  const handleDescName = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDescName(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const taskInfo: Task = {
        name: taskName,
        description: descName,
        status: "Pending",
        list_id: id
      };
      await axios.post('http://localhost:8000/task/create', taskInfo);
      setUpdate(taskInfo.name);
      setTaskName("");
      setDescName("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className="task-page__form task-form" onSubmit={handleSubmit}>
      <label className="form__label">Create new task</label>
      <input className="form__input" type="text" placeholder="Task name" value={taskName} required onChange={handleTaskName} />
      <input className="form__input" type="text" placeholder="Task description" value={descName} onChange={handleDescName} />
      <button className="form__button" id ="task__button" type="submit">Add</button>
    </form>
  )
}

export default Task
