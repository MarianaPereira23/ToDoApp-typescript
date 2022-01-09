/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import Task from '../Forms/Task';
import TaskCard from '../TaskCard/TaskCard';
import ListName from './ListName';
import ManageList from './ManageList';
import './TaskList.css';

const url = 'http://localhost:8080';

const socket: Socket = io(url);

interface Props {
  user: User | string;
  setUserLists(lists: List[]): void;
};

const TaskList: React.FC<Props> = ({ user, setUserLists }) => {
  const navigate = useNavigate();
  const id: string | undefined = useParams().id;
  const [tasks, setTasks] = useState<Task[]>([]);

  socket.on('tasks', (allTasks: Task[]) => setTasks(allTasks));

  const render = (todos: Task[]) => {
    if (tasks.length !== 0) {
      return todos.map((task, i) => <TaskCard key={i} task={task} setTasks={setTasks} />);
    };
  };

  useEffect(() => {
    if (typeof user === 'string') {
      return navigate('/login');
    };
    socket.emit('joinRoom', id);
    socket.emit('getTasks', id);
  }, []);

  let pendingTasks: Task[] = [];
  let doneTasks: Task[] = [];

  if (tasks.length > 0) {
    pendingTasks = tasks.filter(task => task.status === 'Pending');
    doneTasks = tasks.filter(task => task.status === 'Done');
  };

  return (
    <div className="task-page">
      {id &&
        <>
          <ManageList id={id} setUserLists={setUserLists}/>
          <ListName id={id}/>
          <Task id={id} tasks={tasks} setTasks={setTasks}/>
        </>
      }
      {pendingTasks.length > 0 && 
        <>
          <p className="task-page__section-name">To do</p>
          <div className="task-page__pedding">
            {render(pendingTasks)}
          </div>
        </>
      }
      {doneTasks.length > 0 &&
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
