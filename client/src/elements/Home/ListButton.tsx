import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

interface Props {
  list: List;
}

const ListButton: React.FC<Props> = ({ list }) => {
  const navigate = useNavigate();

  const handleRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/list/${list.id}`);
  };

  return (
    <button className="lists__button" onClick={handleRedirect}>
      {list.name}
    </button>
  );
};

export default ListButton;
