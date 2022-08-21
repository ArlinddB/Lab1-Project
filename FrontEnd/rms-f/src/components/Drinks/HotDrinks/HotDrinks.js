import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, ButtonToolbar, Button, Pagination } from "react-bootstrap";
import _ from "lodash";
import AddHotDrinks from "./AddHotDrinks";
import EditHotDrinks from "./EditHotDrinks";
import SideBar from "../../Sidebar/SideBar";

const pageSize = 8;

const HotDrinks = () => {
  const [items, setItems] = useState();
  const [paginatedItems, setPaginatedItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }

  useEffect(() => {
    axios.get("https://localhost:5001/api/HotDrinks/", config)
    .then((res) => {
      setItems(res.data);

      setPaginatedItems(
        _(res.data)
          .slice(0)
          .take(pageSize)
          .value()
      );
    });
  }, []);

  const pageCount = items ? Math.ceil(items.length / pageSize) : 0;
  // if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedItems = _(items)
      .slice(startIndex)
      .take(pageSize)
      .value();
    setPaginatedItems(paginatedItems);
  };

  const deleteDrink = (drinkid) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:5001/api/HotDrinks/" + drinkid, config)
        .then(() => window.location.reload());
    }
  };

  return (
    <>
      <SideBar />

      <div className="container col-sm-7 mt-4">
        {!paginatedItems ? (
          <h1>No Data</h1>
        ) : (
          <>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Drink Id</th>
                  <th>Drink Name</th>
                  <th>Drink Price</th>
                  <th>Drink Description</th>
                  <th>Category Id</th>
                  <th>Category Name</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.drinkId}</td>
                    <td>{item.drinkName}</td>
                    <td>{item.drinkPrice}</td>
                    <td>{item.drinkDescription}</td>
                    <td>{item.categoryId}</td>
                    <td>{item.category.categoryName}</td>
                    <td>
                      <ButtonToolbar>
                        <EditHotDrinks ajdi={item.drinkId} />

                        <Button
                          className="ml-2"
                          variant="danger"
                          onClick={() => deleteDrink(item.drinkId)}
                        >
                          Delete
                        </Button>
                      </ButtonToolbar>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <ButtonToolbar>
              <AddHotDrinks />
            </ButtonToolbar>
          </>
        )}
        <ul className="pagination d-flex justify-content-center">
          {pages.map((page) => (
            <li
              className={page == currentPage ? "page-item active" : "page-item"}
            >
              <p className="page-link" onClick={() => pagination(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HotDrinks;
