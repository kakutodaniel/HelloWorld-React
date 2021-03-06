import React, { useState } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Home from './components/Home';
import Nav from './components/Nav';
import About from './components/About';
import Shop from './components/Shop';
import ItemDetail from './components/ItemDetail';
import Login from './components/Login';
import Register from './components/Register';


function App() {

  const [isLogged, setLogin] = useState(sessionStorage.getItem("logged") == null ? false : true);

  function logged() {
    setLogin(true);
  }

  function logout() {
    setLogin(false);
  }

  return (

    <div className="App">

      <Router>
        {
          !isLogged ? null : <Nav handler={logout} />
        }

        <Switch>

          <Route path='/login' render={() => (
            isLogged ? (<Redirect to="/" />)
              : (<Login handler={logged} />)
          )} />

          <Route path='/' exact render={() => (
            isLogged ? (<Home />)
              : (<Login handler={logged} />)
          )} />

          <Route path='/about' render={() => (
            isLogged ? (<About />)
              : (<Redirect to="/" />)
          )} />

          <Route path='/shop' exact render={() => (
            isLogged ? (<Shop />)
              : (<Redirect to="/" />)
          )} />

          <Route path='/shop/:id' render={({ match }) => (
            isLogged ? (<ItemDetail match={match} />)
              : (<Redirect to="/" />)
          )} />

          {/* <Route path='/register' exact render={() => (
            isLogged ? (<Register />)
              : (<Redirect to="/" />)
          )} /> */}

          <Route path='/register/:id?' render={({ match }) => (
            isLogged ? (<Register match={match} />)
              : (<Redirect to="/" />)
          )} />

          <Route render={() => (<Redirect to="/" />)} />


          {/* <Route path='/' exact component={Home} onEnter={auth} />
          <Route path='/department' component={Department} onEnter={auth} />
          <Route path='/employee' component={Employee} onEnter={auth} />
          <Route path='/about' component={About} onEnter={auth} />
          <Route path='/shop' exact component={Shop} onEnter={auth} />
          <Route path='/shop/:id' component={ItemDetail} onEnter={auth} /> */}

        </Switch>

      </Router>


    </div>

  )
}

export default App;
