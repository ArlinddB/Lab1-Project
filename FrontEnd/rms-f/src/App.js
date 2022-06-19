import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Dashboard from "./Dashboard";
import Login from "./components/Login/Login";

import ManageRoles from "./components/Roles/ManageRoles";
import ManageEmployee from "./components/Employee/ManageEmployee";

import FoodCategories from "./components/Food/FoodCategories";
import Pasta from "./components/Food/Pasta/Pasta";
import SeaFood from "./components/Food/SeaFood/SeaFood";
import FastFood from "./components/Food/Fast Food/FastFood";
import TraditionalFood from "./components/Food/TraditionalFood/TraditionalFood";
import Salads from "./components/Food/Salads/Salads";

import DrinkCategories from "./components/Drinks/DrinkCategories";
import AlcoholicDrinks from "./components/Drinks/AlcoholicDrinks/AlcoholicDrinks";
import NonAlcoholicDrinks from "./components/Drinks/NonAlcoholicDrinks/NonAlcoholicDrinks";
import ColdDrinks from "./components/Drinks/ColdDrinks/ColdDrinks";
import HotDrinks from "./components/Drinks/HotDrinks/HotDrinks";

import Tables from "./components/Table/Tables"
import Reservation from "./components/Reservation/Reservation";



function App() {
  return (
    <div className="d-flex">
      <BrowserRouter>
        {/* <SideBar /> */}


        <Switch>
          <Route path="/" component={Login} exact/>

          <Route path="/dashboard" component={Dashboard} />
          <Route path="/manage/roles" component={ManageRoles} />
          <Route path="/manage/employee" component={ManageEmployee} />
          <Route path="/foodcategories" component={FoodCategories} />
          <Route path="/pasta" component={Pasta} />
          <Route path="/seafood" component={SeaFood} />
          <Route path="/fastfood" component={FastFood} />
          <Route path="/traditionalfood" component={TraditionalFood} />
          <Route path="/salads" component={Salads} />
          <Route path="/drinkcategories" component={DrinkCategories} />
          <Route path="/alcoholicdrinks" component={AlcoholicDrinks} />
          <Route path="/nonalcoholicdrinks" component={NonAlcoholicDrinks} />
          <Route path="/colddrinks" component={ColdDrinks} />
          <Route path="/hotdrinks" component={HotDrinks} />
          <Route path="/tables" component={Tables} />
          <Route path="/reservation" component={Reservation} />

          
          <Route path="*" component={() => <h1>Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;