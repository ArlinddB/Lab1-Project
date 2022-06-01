import React, { Component, useState, useEffect } from "react";
import './App.css';
 import {Home} from './Home';
 import {ManageRoles} from './components/Manage/ManageRoles';
 import {ManageEmployee} from './components/Manage/ManageEmployee';
 import {ManageFood} from './components/Manage/ManageFood';
 import {ManageDrinks} from './components/Manage/ManageDrinks';
import SideBar from "./components/Sidebar/SideBar";
import {Login} from "./components/Login/Login";

import {BrowserRouter, Route, Switch } from 'react-router-dom';



function App() {
  
  return (
    
  <div className="d-flex">
    <BrowserRouter>
    <SideBar/>

      
     <Switch>
     <Route path='/login' component={Login}/>

        <Route path='/' exact component={Home} exact/>
        <Route path='/manage/roles' component={ManageRoles}/>
        <Route path='/manage/employee' component={ManageEmployee}/>
        <Route path='/manage/food' component={ManageFood}/>
        <Route path='/manage/drinks' component={ManageDrinks}/>

       <Route path='*' component={() => <h1>Not Found</h1>} />
     </Switch>

    </BrowserRouter>

     

  </div>
  
);
}

export default App; 