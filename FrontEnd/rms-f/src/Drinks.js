
import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddDrinkModal } from './AddDrinkModal';
import { EditDrinkModal } from './EditDrinkModal';

export class Drinks extends Component{

    constructor(props){
        super(props);
        this.state={drink:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'drinks')
        .then(response=>response.json())
        .then(data=>{
            this.setState({drink:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteDrink(drinkid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'drinks/'+drinkid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const{drink, drinkid,drinktype, drinkname, drinkprice}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <th>Drink ID</th>
                        <th>Drink type</th>
                        <th>Drink Name</th>
                        <th>Drink Price</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                        {drink.map(d=>
                            <tr key={d.drink_id}>
                                <td>{d.drink_id}</td>
                                <td>{d.drink_type}</td>
                                <td>{d.drink_name}</td>
                                <td>{d.drink_price}</td>
                                <td>
                                    
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                        drinkid:d.drink_id,drinktype:d.drink_type,drinkname:d.drink_name,drinkprice:d.drink_price})}>
                                        Edit
                                    </Button>


                                    <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteDrink(d.drink_id)}>
                                        Delete
                                    </Button>


                                    <EditDrinkModal show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    drinkid={drinkid}
                                    drinktype={drinktype}
                                    drinkname={drinkname}
                                    drinkprice={drinkprice}
                                    />
                                </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                        <Button variant="primary" 
                        onClick={()=>this.setState({addModalShow:true})}>
                        Add Drink    
                        </Button>

                        <AddDrinkModal show={this.state.addModalShow}
                        onHide={addModalClose}/>
                </ButtonToolbar>                

            </div>
        )
    }
}