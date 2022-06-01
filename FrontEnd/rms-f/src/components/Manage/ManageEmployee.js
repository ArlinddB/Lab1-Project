import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddEmpModal } from '../../AddEmpModal';
import { EditEmpModal } from '../../EditEmpModal';
import { CSVLink } from "react-csv";


const headers = [
    { label: "Employee Id", key: "e_id" },
    { label: "Name", key: "e_name" },
    { label: "Username", key: "e_username" },
    { label: "Password", key: "e_password" },
    { label: "Address", key: "e_address" },
    { label: "Date Of Joining", key: "DateOfJoining" },
    { label: "Role Id", key: "e_roleID" }
];
var today = new Date(),
date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

var nameAndDate = `Employees_(${date}).csv`


export class ManageEmployee extends Component{

    constructor(props){
        super(props);
        this.state={emp:[], addModalShow:false, editModalShow:false}
        this.csvLinkEl = React.createRef();
    }

    refreshList(){
        fetch(
            "https://localhost:5001/api/employee")
                .then((res) => res.json())
                .then((json) => {
                this.setState({
                emp: json
            });
        })
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    downloadReport = async () => {
        setTimeout(() => {
            this.csvLinkEl.current.link.click();
        });
    }

    deleteEmp(empid){
        if(window.confirm('Are you sure?')){
            fetch("https://localhost:5001/api/employee/"+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }

    render(){
        
        const{emp, empId, empName, empUname, empPass, empPhone, empAddress, doj, empRoleId}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <th>Employee Id</th>
                        <th>Employee Name</th>
                        <th>Employee Username</th>
                        <th>Employee Password</th>
                        <th>Employee Phone</th>
                        <th>Employee Address</th>
                        <th>Date of Joining</th>
                        <th>Role Id</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                        {emp.map(e=>
                            <tr key={e.e_id}>
                                <td>{e.e_id}</td>
                                <td>{e.e_name}</td>
                                <td>{e.e_username}</td>
                                <td>{e.e_password}</td>
                                <td>{e.e_phone}</td>
                                <td>{e.e_address}</td>
                                <td>{e.DateOfJoining}</td>
                                <td>{e.e_roleID}</td>
                                <td>
                                    
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({
                                            editModalShow:true,
                                            empId:e.e_id,
                                            empName:e.e_name,
                                            empUname:e.e_username,
                                            empPass:e.e_password,
                                            empPhone:e.e_phone,
                                            empAddress:e.e_address,
                                            doj:e.DateOfJoining,
                                            empRoleId:e.e_roleID
                                        })}>
                                        Edit
                                    </Button>


                                    <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteEmp(e.e_id)}>
                                        Delete
                                    </Button>


                                    <EditEmpModal show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    empId={empId}
                                    empName={empName}
                                    empUname={empUname}
                                    empPass={empPass}
                                    empPhone={empPhone}
                                    empAddress={empAddress}
                                    doj={doj}
                                    empRoleId={empRoleId}
                                    />
                                </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                        <Button variant="primary" 
                        onClick={()=>this.setState({addModalShow:true})}>
                        Add Employee    
                        </Button>

                        <input type="button" className="btn btn-outline-success ml-2" value="Export to CSV" onClick={this.downloadReport} />
                        <CSVLink
                            headers={headers}
                            filename={nameAndDate}
                            data={emp}
                            ref={this.csvLinkEl}
                        />

                        <AddEmpModal show={this.state.addModalShow}
                        onHide={addModalClose}/>
                </ButtonToolbar>                

            </div>
        )
    }
}