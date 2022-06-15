import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";

import { FaBars, FaHome, FaUser, FaUserCog, FaUtensils, FaHamburger } from "react-icons/fa";

import { BiDrink, BiTask, BiCategoryAlt, BiChair } from "react-icons/bi";
import { GiShrimp, GiCoffeeCup, GiSodaCan } from "react-icons/gi";
import { MdLocalDrink } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs"

function Dashboard() {
  const [dashboard, setDashboard] = useState([]);

  useEffect(async () => {
    const getDashboard = async () => {
      const response = await axios.get("https://localhost:5001/api/Dashboard/");
      console.log("Dashboard", response.data);
      setDashboard(response.data);
    };

    try {
      await getDashboard();
    } catch (err) {
      alert(err.response);
    }
  }, []);

  return (
    <>

      <SideBar />

      <Container>
        <div class="dashboardBoxes">
          <Row>

          <Col>
                <Link to="/manage/roles" style={{ textDecoration: "none" }}>
                  <div class="box">
                    <FaUser className="icons" />
                    <div class="boxNr">{dashboard.countRoles}</div>
                    <div class="boxText">Number of Roles</div>
                  </div>
                </Link>
              </Col>

            <Col>
              <Link to="/manage/employee" style={{ textDecoration: "none" }}>
                <div class="box">
                  <FaUserCog className="icons" />
                  <div class="boxNr">{dashboard.countEmployees}</div>
                  <div class="boxText">Number Of Employees</div>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to="/reservation" style={{ textDecoration: "none" }}>
                <div class="box">
                  <BsCalendarDate className="icons" />
                  <div class="boxNr">{dashboard.countReservations}</div>
                  <div class="boxText">Number of Reservations</div>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to="/tables" style={{ textDecoration: "none" }}>
                <div class="box">
                  <BiChair className="icons" />
                  <div class="boxNr">{dashboard.countTables}</div>
                  <div class="boxText">Number of Tables</div>
                </div>
              </Link>
            </Col>
          </Row>

            <div class="rows">
            <Row>
            <Col>
              <Link to="/seafood" style={{ textDecoration: "none" }}>
                <div class="box">
                  <GiShrimp className="icons" />
                  <div class="boxNr">{dashboard.countSeaFood}</div>
                  <div class="boxText">Number of Sea Foods</div>
                </div>
              </Link>
            </Col>

              <Col>
                <Link to="/fastfood" style={{ textDecoration: "none" }}>
                  <div class="box">
                    <FaHamburger className="icons" />
                    <div class="boxNr">{dashboard.countFastFood}</div>
                    <div class="boxText">Number of Fast Foods</div>
                  </div>
                </Link>
              </Col>

              <Col>
                <Link to="/pasta" style={{ textDecoration: "none" }}>
                  <div class="box">
                    <FaUtensils className="icons" />
                    <div class="boxNr">{dashboard.countPasta}</div>
                    <div class="boxText">Number of Pastas</div>
                  </div>
                </Link>
              </Col>

              <Col>
                <Link to="/traditionalfood" style={{ textDecoration: "none" }}>
                  <div class="box">
                    <FaUtensils className="icons" />
                    <div class="boxNr">{dashboard.countTraditionalFood}</div>
                    <div class="boxText">Number of</div>
                    <div class="boxText">Traditional Foods</div>

                  </div>
                </Link>
              </Col>
            </Row>
            </div>

            <div class="rows">
            <Row>
              <Col>
                <Link to="/alcoholicdrinks" style={{ textDecoration: "none" }}>
                  <div class="box">
                    <BiDrink className="icons" />
                    <div class="boxNr">{dashboard.countAlcoholicDrinks}</div>
                    <div class="boxText">Number of</div>
                    <div class="boxText">Alcoholic Drinks</div>

                  </div>
                </Link>
              </Col>

              <Col>
                <Link to="/nonalcoholicdrinks" style={{ textDecoration: "none" }}>
                  <div class="box">
                    <MdLocalDrink className="icons" />
                    <div class="boxNr">{dashboard.countNonAlcoholicDrinks}</div>
                    <div class="boxText">Number of Non</div>
                    <div class="boxText">Alcoholic Drinks</div>

                  </div>
                </Link>
              </Col>

              <Col>
                <Link to="/hotdrinks" style={{ textDecoration: "none" }}>
                  <div class="box">
                    <GiCoffeeCup className="icons" />
                    <div class="boxNr">{dashboard.countHotDrinks}</div>
                    <div class="boxText">Number of Hot Drinks</div>
                  </div>
                </Link>
              </Col>

              <Col>
                <Link to="/colddrinks" style={{ textDecoration: "none" }}>
                  <div class="box">
                    <GiSodaCan className="icons" />
                    <div class="boxNr">{dashboard.countColdDrinks}</div>
                    <div class="boxText">Number of Cold Drinks</div>
                  </div>
                </Link>
              </Col>

            </Row>
          </div>

        </div>
      </Container>
    </>
  );
}

export default Dashboard;