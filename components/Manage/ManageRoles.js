
import React,{Component} from 'react';
import {Table} from 'react-bootstrap';



import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddRoleModal } from './AddRoleModal';
import { EditRoleModal } from './EditRoleModal';

export class ManageRoles extends Component{

    constructor(props){
        super(props);
        this.state={roles:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(
            "https://localhost:5001/api/roles")
                .then((res) => res.json())
                .then((json) => {
                this.setState({
                roles: json
            });
        })
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteRole(roleid){
        if(window.confirm('Are you sure?')){
            fetch("https://localhost:5001/api/roles/"+roleid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }

    render(){
        
        const{roles, roleid, rolename}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <th>RoleID</th>
                        <th>RoleName</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                        {roles.map(r=>
                            <tr key={r.r_id}>
                                <td>{r.r_id}</td>
                                <td>{r.r_name}</td>
                                <td>
                                    
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({
                                            editModalShow:true,
                                            roleid:r.r_id,
                                            rolename:r.r_name
                                        })}>
                                        Edit
                                    </Button>


                                    <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteRole(r.r_id)}>
                                        Delete
                                    </Button>


                                    <EditRoleModal show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    roleid={roleid}
                                    rolename={rolename}/>
                                </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                        <Button variant="primary" 
                        onClick={()=>this.setState({addModalShow:true})}>
                        Add Role    
                        </Button>

                        <AddRoleModal show={this.state.addModalShow}
                        onHide={addModalClose}/>
                </ButtonToolbar>                

            </div>
        )
    }
}