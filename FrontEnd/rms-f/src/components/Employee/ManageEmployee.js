import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, ButtonToolbar, Button, Pagination } from "react-bootstrap";
import _ from "lodash";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";


const pageSize = 8;

const ManageEmployee = () => {

  const [items, setItems] = useState();
  const [paginatedItems, setPaginatedItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [editAdd, setEditAdd] = useState(false);
  const handleCloseEdit = () => setEditAdd(false);
  const handleShowEdit = () => setEditAdd(true);

  useEffect(() => {
    axios.get("https://localhost:5001/api/Employee/")
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

  const deleteEmp = (empid) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:5001/api/employee/" + empid)
        .then(() => window.location.reload());
    }
  };

  return (
    <div className="container col-sm-9 mt-4">
      {!paginatedItems ? (
        <h1>No Data</h1>
      ) : (
        <>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Date of Joining</th>
                <th>Role Id</th>
                <th>Role Name</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.e_id}</td>
                  <td>{item.e_name}</td>
                  <td>{item.e_username}</td>
                  <td>{item.e_password}</td>
                  <td>{item.e_phone}</td>
                  <td>{item.e_address}</td>
                  <td>{item.dateOfJoining}</td>
                  <td>{item.role.roleId}</td>
                  <td>{item.role.roleName}</td>
                  <td>
                    <ButtonToolbar>
                      
                      <EditEmployee 
                        ajdi={item.e_id}
                      />

                      <Button
                        className="ml-2"
                        variant="danger"
                        onClick={() => deleteEmp(item.e_id)}
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
            <AddEmployee />
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
  );
};

export default ManageEmployee;
