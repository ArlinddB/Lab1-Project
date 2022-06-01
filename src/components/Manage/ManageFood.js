
import React,{Component} from 'react';
import {Table} from 'react-bootstrap';



import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddFoodModal } from './AddFoodModal';
import { EditFoodModal } from './EditFoodModal';

export class ManageFood extends Component{

    constructor(props){
        super(props);
        this.state={food:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(
            "https://localhost:5001/api/food")
                .then((res) => res.json())
                .then((json) => {
                this.setState({
                food: json
            });
        })
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteFood(foodid){
        if(window.confirm('Are you sure?')){
            fetch("https://localhost:5001/api/food/"+foodid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }

    render(){
        
        const{food, foodid, foodtype, foodname, foodprice}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <th>Food Id</th>
                        <th>Food Type</th>
                        <th>Food name</th>
                        <th>Price</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                        {food.map(f=>
                            <tr key={f.food_id}>
                                <td>{f.food_id}</td>
                                <td>{f.food_type}</td>
                                <td>{f.food_name}</td>
                                <td>{f.food_price}</td>
                                <td>
                                    
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({
                                            editModalShow:true,
                                            foodid:f.food_id,
                                            foodtype:f.food_type,
                                            foodname:f.food_name,
                                            foodprice:f.food_price
                                        })}>
                                        Edit
                                    </Button>


                                    <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteFood(f.food_id)}>
                                        Delete
                                    </Button>


                                    <EditFoodModal show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    foodid={foodid}
                                    foodtype={foodtype}
                                    foodname={foodname}
                                    foodprice={foodprice}
                                    />
                                </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                        <Button variant="primary" 
                        onClick={()=>this.setState({addModalShow:true})}>
                        Add Food    
                        </Button>

                        <AddFoodModal show={this.state.addModalShow}
                        onHide={addModalClose}/>
                </ButtonToolbar>                

            </div>
        )
    }
}