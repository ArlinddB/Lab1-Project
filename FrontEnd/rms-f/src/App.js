import logo from './logo.svg';
import React, { Component } from "react";
import './App.css';
 import {Home} from './Home';
 import {Roles} from './Roles';
 import {Employee} from './Employee';
 import {Food} from './Food';
import {Navigation} from './Navigation';
import SideBar from "./components/Sidebar/SideBar";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (

    <BrowserRouter>

    <div className="d-flex">

    <SideBar/>

     <Switch>
       <Route path='/' component={Home} exact/>
       <Route path='/roles' component={Roles}/>
       <Route path='/employee' component={Employee}/>
       <Route path='/food' component={Food}/>
     </Switch>
    </div>

    </BrowserRouter>
  );
}

export default App;


// import "./App.css";
// import SideBar from "./components/Sidebar/SideBar";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


// function App() {
//   return (
//     <Router>
//       <SideBar>
//         <Switch>
//           <Route path="/" element={<Home />} />
//           <Route path="/roles" element={<Roles />} />
//           <Route path="/employee" element={<Employee />} />
//           <Route path="/food" element={<Food />} />
          

//           <Route path="*" element={<> not found</>} />
//         </Switch>
//       </SideBar>
//     </Router>
//   );
// }

// export default App;