import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './elements/Header/Header';
import Home from './elements/Home/Home';
import Login from './elements/Forms/Login';
import Join from './elements/Forms/Join';
import Footer from './elements/Footer/Footer';
import './App.css';
// import './old.css';

const App = () => {
  const [user, setUser] = useState({username: '', email: ''});

  const getUser = (data: User): void => {
    setUser(data);
  };

  return (
    <div className="todo-app">
      <div className="todo-app__content">
        <Routes>
          <Route path="/" element={(
            <>
              <Header user={user}/>
              <Home user={user}/>
              <Footer />
            </>
          )} />
          <Route path="/login" element={(
            <>
              <Header user={user}/>
              <Login getUser={getUser}/>
              <Footer />
            </>
          )} />
          <Route path="/join" element={(
            <>
              <Header user={user}/>
              <Join getUser={getUser}/>
              <Footer />
            </>
          )} />
          <Route path="/list/:id" element={(
            <>
              <Header user={user}/>
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
