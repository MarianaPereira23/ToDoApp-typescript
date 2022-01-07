import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

interface Props {
  list: List;
  getNewList(name: string): void;
}

const ListButton: React.FC<Props> = ({ list, getNewList }) => {
  const navigate = useNavigate();

  const handleRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/list/${list.id}`);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios.delete(`http://localhost:8000/lists/delete/${list.id}`);
    getNewList('List deleted');
    e.stopPropagation();
  };

  return (
    <div className="lists__button">
      <button className="button-redirect" onClick={handleRedirect}>
        {list.name}
      </button>
      <button className="button-remove" onClick={handleDelete}>X</button>
    </div>
  );
};

export default ListButton;
