import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUsers } from '@fortawesome/free-solid-svg-icons';
import ListUser from '../Forms/ListUser';
import './TaskList.css';

interface Props {
  id: string;
  setUserLists(lists: List[]): void;
};

const ManageList: React.FC<Props> = ({ id, setUserLists }) => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState<boolean>(false);

  const toggleDisplay = () => setDisplay(!display);

  const handleRedirect = () => navigate('/');

  return (
    <>
      <div className="task-page__manage">
        <button className="manage__button" onClick={handleRedirect}><FontAwesomeIcon icon={faArrowLeft} className="button__icon"/></button>
        <button className="manage__button" onClick={toggleDisplay}><FontAwesomeIcon icon={faUsers} className="button__icon"/></button>
      </div>
      {id &&
        <div className={`task-page__pop-up ${display ? "" : "hidden"}`}>
          <button className="pop-up__close" onClick={toggleDisplay}>X</button>
          <ListUser id={id} setDisplay={setDisplay} setUserLists={setUserLists}/>
        </div>
      }
    </>
  );
};

export default ManageList;
