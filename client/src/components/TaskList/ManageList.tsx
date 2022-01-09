import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUsers } from '@fortawesome/free-solid-svg-icons';
import ListUser from '../Forms/ListUser';
import './TaskList.css';

interface Props {
  id: string;
};

const ManageList: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const toggleDisplay = () => setDisplay(!display);

  const closeDisplay = () => {
    setDisplay(false);
    setError('');
  };

  const handleRedirect = () => navigate('/');

  return (
    <>
      <div className="task-page__manage">
        <button className="manage__button" onClick={handleRedirect}>
          <FontAwesomeIcon icon={faArrowLeft} className="button__icon"/>
        </button>
        <button className="manage__button" onClick={toggleDisplay}>
          <FontAwesomeIcon icon={faUsers} className="button__icon"/>
        </button>
      </div>
      {id &&
        <div className={`task-page__pop-up ${display ? "" : "hidden"}`}>
          <button className="pop-up__close" onClick={closeDisplay}>X</button>
          <ListUser id={id} setDisplay={setDisplay} error={error} setError={setError}/>
        </div>
      }
    </>
  );
};

export default ManageList;
