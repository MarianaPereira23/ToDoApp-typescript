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

  return (
    <div className="task-page">
      <h2 className="task-page__list-name">{listName}</h2>
      <Task />
    </div>
  );
};

export default TaskList;
