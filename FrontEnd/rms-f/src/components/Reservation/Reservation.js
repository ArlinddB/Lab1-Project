import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, ButtonToolbar, Button, Pagination } from "react-bootstrap";
import _ from "lodash";
import SideBar from "../Sidebar/SideBar";
import EditReservation from "./EditReservation";
import AddReservation from "./AddReservation";

const pageSize = 8;

const Reservation = () => {

  const [items, setItems] = useState();
  const [paginatedItems, setPaginatedItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    axios.get("https://localhost:5001/api/Reservation/")
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

  const deleteReservation = (reservationid) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:5001/api/Reservation/" + reservationid)
        .then(() => window.location.reload());
    }
  };

  return (
    <>
    <SideBar />

    <div className="container col-sm-8 mt-4">
      {!paginatedItems ? (
        <h1>No Data</h1>
      ) : (
        <>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Client Name</th>
                <th>Date And Time</th>
                <th>Client Contact</th>
                <th>Table Id</th>
                <th>Table Place</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.reservationId}</td>
                  <td>{item.clientName}</td>
                  <td>{item.dateAndTime}</td>
                  <td>{item.clientContact}</td>
                  <td>{item.tableId}</td>
                  <td>{item.table.place}</td>

                  <td>
                    <ButtonToolbar>
                      
                      <EditReservation 
                        ajdi={item.reservationId}
                      />

                      <Button
                        className="ml-2"
                        variant="danger"
                        onClick={() => deleteReservation(item.tableId)}
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
            <AddReservation />
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

export default Reservation;
