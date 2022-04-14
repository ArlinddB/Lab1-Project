import logo from './logo.svg';
import React, { Component } from "react";
import './App.css';
import {Home} from './Home';
import {Roles} from './Roles';
import {Employee} from './Employee';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">

     <Navigation/>

     <Switch>
       <Route path='/' component={Home} exact/>
       <Route path='/roles' component={Roles}/>
       <Route path='/employee' component={Employee}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
