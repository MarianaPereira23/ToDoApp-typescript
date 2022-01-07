/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Task from '../Forms/Task';
import TaskCard from '../TaskCard/TaskCard';
import './TaskList.css';

interface Props {
  user: User;
}

const TaskList: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const id: string | undefined = useParams().id;
  const [listName, setListName] = useState("");
  const [updateTasks, setUpdate] = useState("");
  const [pendingTasks, setPending] = useState<Task[]>([]);
  const [doneTasks, setDone] = useState<Task[]>([]);

  console.log(updateTasks);

  const getListName = async () => {
    const data = await axios.post('http://localhost:8000/list/get', {id});
    setListName(data.data);
  };

  useEffect(() => {
    if (user.username === '') {
      return navigate('/login');
    }
    getListName();
  }, []);
  
  const getTasks = async () => {
    const data = await axios.post('http://localhost:8000/tasks/get', {id});
    const allTasks: Task[] = data.data;
    const pending = allTasks.filter(task => task.status === "Pending");
    const done = allTasks.filter(task => task.status === "Done");
    setPending(pending);
    setDone(done);
  };

  useEffect(() => {
    getTasks();
  }, [updateTasks]);

  const render = (tasks: Task[]) => {
    return tasks.map((task, i) => <TaskCard key={i} task={task} setUpdate={setUpdate} />)
  }

  return (
    <div className="task-page">
      <h2 className="task-page__list-name">{listName}</h2>
      {id &&
        <Task id={id} setUpdate={setUpdate}/>
      }
      {pendingTasks.length !== 0 &&
        <>
          <p className="task-page__section-name">To do</p>
          <div className="task-page__pedding">
            {render(pendingTasks)}
          </div>
        </>
      }
      {doneTasks.length !== 0 &&
        <>
          <p className="task-page__section-name done-section">Done</p>
          <div className="task-page__done">
            {render(doneTasks)}
          </div>
        </>
      }   
    </div>
  );
};

export default TaskList;
