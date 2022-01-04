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
  const [user, setUser] = useState({username: ''});

  const getUser = (data: User): void => {
    setUser(data);
  }

  console.log(user);
  

  return (
    <div className="todo-app">
      <div className="todo-app__content">
        <Routes>
          <Route path="/" element={(
            <>
              <Header />
              <Home user={user}/>
              <Footer />
            </>
          )} />
          <Route path="/login" element={(
            <>
              <Header />
              <Login getUser={getUser}/>
              <Footer />
            </>
          )} />
          <Route path="/join" element={(
            <>
              <Header />
              <Join getUser={getUser}/>
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
