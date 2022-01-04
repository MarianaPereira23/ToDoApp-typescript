import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './elements/Header/Header';
import Login from './elements/Forms/Login';
import Footer from './elements/Footer/Footer';
import './App.css';
// import './old.css';

function App() {
  return (
    <div className="todo-app">
      <div className="todo-app__content">
        <Routes>
          <Route path="/" element={(
            <>
              <Header />
              <Login />
              <Footer />
            </>
          )} />
          {/* <Route path="/list" element={(
            <>
              <AddForm />
              <TodoList />
            </>
          )} />
          <Route path="/edit/:id" element={(
            <>
              <EditForm />
            </>
          )} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
