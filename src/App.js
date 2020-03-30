import React, { useState } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Nav from './components/Nav';
import About from './components/About';
import Shop from './components/Shop';
import ItemDetail from './components/ItemDetail';
import Login from './components/Login';

function App() {

  const [isLogged, setLogin] = useState(true);


  return (

    <div className="App">

      <Router>
        {
          !isLogged ? null : <Nav />
        }

        <Switch>

          <Route path='/login' render={() => (
            isLogged ? (<Redirect to="/" />)
              : (<Login />)
          )} />

          <Route path='/' exact render={() => (
            isLogged ? (<Home />)
              : (<Login />)
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


          <Route path='*' render={() => (<Redirect to="/" />)} />


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
