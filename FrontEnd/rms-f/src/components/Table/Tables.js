import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, ButtonToolbar, Button, Pagination } from "react-bootstrap";
import _ from "lodash";
import SideBar from "../Sidebar/SideBar";
import AddTables from "./AddTables";
import EditTables from "./EditTables";

const pageSize = 8;

const Tables = () => {

  const [items, setItems] = useState();
  const [paginatedItems, setPaginatedItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }


  useEffect(() => {
    axios.get("https://localhost:5001/api/Table/", config)
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

  const deleteTable = (tableid) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:5001/api/Table/" + tableid, config)
        .then(() => window.location.reload());
    }
  };

  return (
    <>
    <SideBar />

    <div className="container col-sm-5 mt-4">
      {!paginatedItems ? (
        <h1>No Data</h1>
      ) : (
        <>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Table ID</th>
                <th>Number of Chairs</th>
                <th className="col-sm-3">Place</th>
                <th className="col-sm-3">Options</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.tableId}</td>
                  <td>{item.numberOfChairs}</td>
                  <td>{item.place}</td>

                  <td>
                    <ButtonToolbar>
                      
                      <EditTables 
                        ajdi={item.tableId}
                      />

                      <Button
                        className="ml-2"
                        variant="danger"
                        onClick={() => deleteTable(item.tableId)}
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
            <AddTables />
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

export default Tables;
