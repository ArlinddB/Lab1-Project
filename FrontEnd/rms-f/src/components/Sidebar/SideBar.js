import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaUser,
  FaUserCog,
  FaUtensils,
  FaHamburger,
} from "react-icons/fa";

import {
  BiDrink,
  BiTask,
  BiCategoryAlt,
  BiChair,
  BiPowerOff,
} from "react-icons/bi";
import { GiShrimp, GiCoffeeCup, GiSodaCan } from "react-icons/gi";
import { MdLocalDrink, MdBorderColor } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";

import { useState } from "react";
import { useHistory } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";



const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/",
    name: "Manage",
    icon: <BiTask />,
    exact: true,
    subRoutes: [
      {
        path: "/manage/roles",
        name: "Roles",
        icon: <FaUser />,
      },
      {
        path: "/manage/employee",
        name: "Employees ",
        icon: <FaUserCog />,
      },
      {
        path: "/tables",
        name: "Tables ",
        icon: <BiChair />,
      },
      {
        path: "/reservation",
        name: "Reservation ",
        icon: <BsCalendarDate />,
      },
    ],
  },
  {
    path: "/",
    name: "Food",
    icon: <FaUtensils />,
    exact: true,
    subRoutes: [
      {
        path: "/foodcategories",
        name: "Food Categories",
        icon: <BiCategoryAlt />,
      },
      {
        path: "/pasta",
        name: "Pasta",
        icon: <FaUtensils />,
      },
      {
        path: "/seafood",
        name: "Sea Food",
        icon: <GiShrimp />,
      },
      {
        path: "/fastfood",
        name: "Fast Food",
        icon: <FaHamburger />,
      },
      {
        path: "/traditionalfood",
        name: "Traditional Food",
        icon: <FaUtensils />,
      },
      {
        path: "/salads",
        name: "Salads",
        icon: <FaUtensils />,
      },
    ],
  },
  {
    path: "/",
    name: "Drinks",
    icon: <BiDrink />,
    exact: true,
    subRoutes: [
      {
        path: "/drinkcategories",
        name: "Drink Categories",
        icon: <BiCategoryAlt />,
      },
      {
        path: "/alcoholicdrinks",
        name: "Alcoholic Drinks",
        icon: <BiDrink />,
      },
      {
        path: "/nonalcoholicdrinks",
        name: "Non Alcoholic Drinks",
        icon: <MdLocalDrink />,
      },
      {
        path: "/hotdrinks",
        name: "Hot Drinks",
        icon: <GiCoffeeCup />,
      },
      {
        path: "/colddrinks",
        name: "Cold Drinks",
        icon: <GiSodaCan />,
      },
    ],
  },
  {
    path: "orders",
    name: "Orders",
    icon: <MdBorderColor />
  }
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const history = useHistory();

  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload()
  }

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  <a href="/dashboard">RMS</a>
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
            <AnimatePresence>
              <BiPowerOff className="icon logoutBtn" onClick={logOut}/>
              {isOpen && (
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="link_text"
                >
                  <p className="logout_text" onClick={logOut}>Logout</p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
