import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, ButtonToolbar, Button, Pagination } from "react-bootstrap";
import _ from "lodash";
import AddRoles from "./AddRoles";
import EditRoles from "./EditRoles";
import SideBar from "../Sidebar/SideBar";


const pageSize = 8;

const ManageRoles = () => {

  const [items, setItems] = useState();
  const [paginatedItems, setPaginatedItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }

  useEffect(() => {
    axios.get("https://localhost:5001/api/roles/", config)
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

  const deleteRole = (roleid) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:5001/api/roles/" + roleid, 
          config
        )
        .then(() => window.location.reload());
    }
  };

  return (
    <>
    <SideBar />

    <div className="container col-sm-6 mt-4">
      {!paginatedItems ? (
        <h1>No Data</h1>
      ) : (
        <>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Category Name</th>
                <th className="col-sm-3">Options</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.roleId}</td>
                  <td>{item.roleName}</td>
                  <td>
                    <ButtonToolbar>
                      
                      <EditRoles 
                        ajdi={item.roleId}
                      />

                      <Button
                        className="ml-2"
                        variant="danger"
                        onClick={() => deleteRole(item.roleId)}
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
            <AddRoles />
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

export default ManageRoles;
