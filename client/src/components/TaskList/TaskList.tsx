/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUsers } from '@fortawesome/free-solid-svg-icons';
import { io, Socket } from "socket.io-client";
import Task from '../Forms/Task';
import TaskCard from '../TaskCard/TaskCard';
import ListUser from '../Forms/ListUser';
import ListName from './ListName';
import './TaskList.css';

const url = 'http://localhost:8080';

const socket: Socket = io(url);

interface Props {
  user: User | string;
};

const TaskList: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const id: string | undefined = useParams().id;
  const [pendingTasks, setPending] = useState<Task[]>([]);
  const [doneTasks, setDone] = useState<Task[]>([]);
  const [display, setDisplay] = useState<boolean>(false);

  socket.on('tasks', (tasks: Task[]) => {
    const pending: Task[] = tasks.filter(task => task.status === "Pending");
    const done: Task[] = tasks.filter(task => task.status === "Done");
    setPending(pending);
    setDone(done);
    // Infinite loop ? State with only one array ? Display state in another component ?
  });

  useEffect(() => {
    if (typeof user === 'string') {
      return navigate('/login');
    };
    socket.emit('getTasks', id);
  }, []);

  const render = (tasks: Task[]) => {
    return tasks.map((task, i) => <TaskCard key={i} task={task} setPending={setPending} setDone={setDone} />)
  };

  const toggleDisplay = () => setDisplay(!display);

  const handleRedirect = () => navigate('/');

  return (
    <div className="task-page">
      <div className="task-page__manage">
        <button className="manage__button" onClick={handleRedirect}><FontAwesomeIcon icon={faArrowLeft} className="button__icon"/></button>
        <button className="manage__button" onClick={toggleDisplay}><FontAwesomeIcon icon={faUsers} className="button__icon"/></button>
      </div>
      {id &&
        <div className={`task-page__pop-up ${display ? "" : "hidden"}`}>
          <button className="pop-up__close" onClick={toggleDisplay}>X</button>
          <ListUser id={id} setDisplay={setDisplay}/>
        </div>
      }
      {id &&
        <>
          <ListName id={id}/>
          <Task id={id} pendingTasks={pendingTasks} setPending={setPending}/>
        </>
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
