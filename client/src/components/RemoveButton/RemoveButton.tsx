import React from 'react';
import { useDispatch } from 'react-redux';
import { MyDispatch } from "../../store/store";
import { removeTodo } from "../../slices/todoSlice";
import './RemoveButton.css';

interface Props {
  todo: Todo;
}

const RemoveButton: React.FC<Props>  = ({ todo }) => {
  const dispatch = useDispatch<MyDispatch>();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(
      removeTodo(todo.id)
    );
    e.stopPropagation();
  };

  return (
    <button className="todo-item__remove" type="button" onClick={handleDelete}>
      Remove
    </button>
  );
};

export default RemoveButton;
