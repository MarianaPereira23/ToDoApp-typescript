import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EditButton.css';

interface Props {
  todo: Todo;
}

const EditButton: React.FC<Props>  = ({ todo }) => {
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/edit/${todo.id}`);
    e.stopPropagation();
  };

  return (
    <button className="todo-item__edit" type="button" onClick={handleEdit}>
      Edit
    </button>
  );
};

export default EditButton;
