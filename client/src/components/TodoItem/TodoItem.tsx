import React from 'react';
import { useDispatch } from 'react-redux';
import { MyDispatch } from "../../store/store";
import { toggleTodoStatus } from "../../slices/todoSlice";
import './TodoItem.css';

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props>  = ({ todo }) => {
  const dispatch = useDispatch<MyDispatch>();

  const toggleTodo = () : void => {
    dispatch(
      toggleTodoStatus({ completed: !todo.completed, id: todo.id })
    );
  };

  return (
    <div className={`todo-item ${todo.completed ? 'done' : ''} ${todo.display ? '' : 'hidden'}`} onClick={toggleTodo} role="button">
      <h2 className="todo-item__name">{todo.name}</h2>
      <p className="todo-item__desc">{todo.description}</p>
    </div>
  );
};

export default TodoItem;
