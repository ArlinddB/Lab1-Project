import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { HalfMalf } from "react-spinner-animated";

import "react-spinner-animated/dist/index.css";

import {
  FaBars,
  FaHome,
  FaUser,
  FaUserCog,
  FaUtensils,
  FaHamburger,
} from "react-icons/fa";

import { BiDrink, BiTask, BiCategoryAlt, BiChair } from "react-icons/bi";
import { GiShrimp, GiCoffeeCup, GiSodaCan } from "react-icons/gi";
import { MdLocalDrink } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";

function Dashboard() {
  const [dashboard, setDashboard] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    // setIsLoading(true);

    axios
      .get("https://localhost:5001/api/Dashboard/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDashboard(res.data);
        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 2000);
      });
  }, []);

  return (
    <>
      {/* {isLoading ? (
        <HalfMalf />
      ) : ( */}
        <>
          <SideBar />
          <Container>
            <div className="dashboardBoxes">
              <Row>
                <Col>
                  <Link to="/manage/roles" style={{ textDecoration: "none" }}>
                    <div className="box">
                      <FaUser className="icons" />
                      <div className="boxNr">{dashboard.countRoles}</div>
                      <div className="boxText">Number of Roles</div>
                    </div>
                  </Link>
                </Col>

                <Col>
                  <Link
                    to="/manage/employee"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="box">
                      <FaUserCog className="icons" />
                      <div className="boxNr">{dashboard.countEmployees}</div>
                      <div className="boxText">Number Of Employees</div>
                    </div>
                  </Link>
                </Col>
                <Col>
                  <Link to="/reservation" style={{ textDecoration: "none" }}>
                    <div className="box">
                      <BsCalendarDate className="icons" />
                      <div className="boxNr">{dashboard.countReservations}</div>
                      <div className="boxText">Number of Reservations</div>
                    </div>
                  </Link>
                </Col>
                <Col>
                  <Link to="/tables" style={{ textDecoration: "none" }}>
                    <div className="box">
                      <BiChair className="icons" />
                      <div className="boxNr">{dashboard.countTables}</div>
                      <div className="boxText">Number of Tables</div>
                    </div>
                  </Link>
                </Col>
              </Row>

              <div className="rows">
                <Row>
                  <Col>
                    <Link to="/seafood" style={{ textDecoration: "none" }}>
                      <div className="box">
                        <GiShrimp className="icons" />
                        <div className="boxNr">{dashboard.countSeaFood}</div>
                        <div className="boxText">Number of Sea Foods</div>
                      </div>
                    </Link>
                  </Col>

                  <Col>
                    <Link to="/fastfood" style={{ textDecoration: "none" }}>
                      <div className="box">
                        <FaHamburger className="icons" />
                        <div className="boxNr">{dashboard.countFastFood}</div>
                        <div className="boxText">Number of Fast Foods</div>
                      </div>
                    </Link>
                  </Col>

                  <Col>
                    <Link to="/pasta" style={{ textDecoration: "none" }}>
                      <div className="box">
                        <FaUtensils className="icons" />
                        <div className="boxNr">{dashboard.countPasta}</div>
                        <div className="boxText">Number of Pastas</div>
                      </div>
                    </Link>
                  </Col>

                  <Col>
                    <Link
                      to="/traditionalfood"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="box">
                        <FaUtensils className="icons" />
                        <div className="boxNr">
                          {dashboard.countTraditionalFood}
                        </div>
                        <div className="boxText">Number of</div>
                        <div className="boxText">Traditional Foods</div>
                      </div>
                    </Link>
                  </Col>
                </Row>
              </div>

              <div className="rows">
                <Row>
                  <Col>
                    <Link
                      to="/alcoholicdrinks"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="box">
                        <BiDrink className="icons" />
                        <div className="boxNr">
                          {dashboard.countAlcoholicDrinks}
                        </div>
                        <div className="boxText">Number of</div>
                        <div className="boxText">Alcoholic Drinks</div>
                      </div>
                    </Link>
                  </Col>

                  <Col>
                    <Link
                      to="/nonalcoholicdrinks"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="box">
                        <MdLocalDrink className="icons" />
                        <div className="boxNr">
                          {dashboard.countNonAlcoholicDrinks}
                        </div>
                        <div className="boxText">Number of Non</div>
                        <div className="boxText">Alcoholic Drinks</div>
                      </div>
                    </Link>
                  </Col>

                  <Col>
                    <Link to="/hotdrinks" style={{ textDecoration: "none" }}>
                      <div className="box">
                        <GiCoffeeCup className="icons" />
                        <div className="boxNr">{dashboard.countHotDrinks}</div>
                        <div className="boxText">Number of Hot Drinks</div>
                      </div>
                    </Link>
                  </Col>

                  <Col>
                    <Link to="/colddrinks" style={{ textDecoration: "none" }}>
                      <div className="box">
                        <GiSodaCan className="icons" />
                        <div className="boxNr">{dashboard.countColdDrinks}</div>
                        <div className="boxText">Number of Cold Drinks</div>
                      </div>
                    </Link>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        </>
      {/* )} */}
    </>
  );
}

export default Dashboard;
