import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

export class Employee extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'employee/'+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, empid,empname,empusername,emppassword,empphone,empaddress,doj,emproleid}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>DateOfJoining</th>
                            <th>RoleID</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(e=>
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
                                onClick={()=>this.setState({editModalShow:true,
                                    empid:e.e_id,empname:e.e_name,empusername:e.e_username,
                                    emppassword:e.e_password,empphone:e.e_phone,empaddress:e.e_address,
                                    doj:e.DateOfJoining, emproleid:e.e_roleID})}>
                                        Edit
                                    </Button>

                                    <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteEmp(e.e_id)}>
                                        Delete
                                    </Button>

                                    <EditEmpModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        empid={empid}
                                        empname={empname}
                                        empusername={empusername}
                                        emppassword={emppassword}
                                        empphone={empphone}
                                        empaddress={empaddress}
                                        doj={doj}
                                        emproleid={emproleid}
                                    />
                            </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Employee</Button>

                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}