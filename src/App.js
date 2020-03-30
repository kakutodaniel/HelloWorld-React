import React, { useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Department from './components/Department';
import Employee from './components/Employee';
import Nav from './components/Nav';
import About from './components/About';
import Shop from './components/Shop';
import ItemDetail from './components/ItemDetail';
import Login from './components/Login';

function App() {

  const [isLogin, setLogin] = useState(false);


  return (

    <div className="App">

      <Router>
        {
          isLogin ? null : <Nav />
        }

        <Switch>

          <Route path='/login' component={Login} />
          <Route path='/' exact component={Home} />
          <Route path='/department' component={Department} />
          <Route path='/employee' component={Employee} />
          <Route path='/about' component={About} />
          <Route path='/shop' exact component={Shop} />
          <Route path='/shop/:id' component={ItemDetail} />

        </Switch>

      </Router>




    </div>

  )
}

export default App;
