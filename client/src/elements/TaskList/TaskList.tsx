/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Task from '../Forms/Task';
import './TaskList.css';

interface Props {
  user: User;
}

const TaskList: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const id: string | undefined = useParams().id;
  const [listName, setListName] = useState("");
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    status: "",
    list_id: ""
  });

  const getNewTask = (task: Task): void => {
    setNewTask(task);
  };

  const getListName = async () => {
    const data = await axios.post('http://localhost:8000/list/get', {id});
    setListName(data.data);
  };

  useEffect(() => {
    if (user.username === '') {
      return navigate('/login');
    }
    getListName()
  }, [id]);

  const getTasks = async () => {
    // const data = await axios.post('http://localhost:8000/lists/get', user);
    // setUserLists(data.data);
  };

  useEffect(() => {
    getTasks();
  }, [newTask]);

  return (
    <div className="task-page">
      <h2 className="task-page__list-name">{listName}</h2>
      {id &&
        <Task id={id} getNewTask={getNewTask}/>
      }
    </div>
  );
};

export default TaskList;
