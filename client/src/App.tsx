import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList/TodoList';
import AddForm from './components/AddForm/AddForm';
import EditForm from './components/EditForm/EditForm';
import './App.css';

function App() {
  return (
    <div className="todo-app">
      <div className="todo-app__content">
        <Routes>
          <Route path="/" element={(
            <>
              <AddForm />
              <TodoList />
            </>
          )} />
          <Route path="/edit/:id" element={(
            <>
              <EditForm />
            </>
          )} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
