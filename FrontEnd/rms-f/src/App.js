import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
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

import Tables from "./components/Table/Tables";
import Reservation from "./components/Reservation/Reservation";
import set from "lodash.set";

import { HalfMalf } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState();


  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    let u = localStorage.getItem("token");
    if (u) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  console.log(isLoggedIn);

  return (
    <div className="d-flex">
      <BrowserRouter>
      <>
      {isLoading ? (
      <HalfMalf />
      ) : (
        <Switch>
          {!isLoggedIn ? 
          (
              <Route path="/" component={Login} exact /> 
          ) : (isLoggedIn && 
            <>
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
              
            </>

          )}
          {/* <Route path="*" component={() => <h1>Not Found</h1>} />     */}

          
        </Switch>
      )}
      </>
      </BrowserRouter>
    </div>
  );
}

export default App;
