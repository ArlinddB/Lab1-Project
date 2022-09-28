import React, { useEffect, useState } from "react";
import Form from "./Layouts/Form";
import { Container, Grid, InputAdornment, makeStyles, ButtonGroup, Button as MuiButton } from "@material-ui/core";
import Input from "./Controls/Input";
import Select from "./Controls/Select";
import Button from "./Controls/Button";
import ReplayIcon from "@material-ui/icons/Replay";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu"
import axios from "axios";
import Popup from "./Layouts/Popup";
import OrderList from "./OrderList"


const useStyles = makeStyles(theme => ({
    adornmentText: {
        '& .MuiTypography-root':{
            color:'#2481ee',
            fontWeight:'bolder',
            fontSize:'1.2rem'
        }
    },
    submitButtonGroup: {
        backgroundColor: '#2481ee',
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none',
            color: 'white'
        },
        '&:hover': {
            backgroundColor: '#2481ae',
            transition: "all .2s ease-out"
        }
    }
}))


export default function OrderForm(props) {



const {values, setValues, errors, handleInputChange} = props;

const classes = useStyles();

const [orderListVisibility, setOrderListVisibility] = useState(false);

const [orderId, setOrderId] = useState();

useEffect(() => {
  let gTotal= values.orderDetails.reduce((tempTotal, item) => {
    return tempTotal + (item.quantity * item.foodPrice);
  }, 0);
  setValues({
    ...values,
    gTotal: gTotal
  })
}, [JSON.stringify(values.orderDetails)]);

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
}


useEffect (() => {
  // if(orderId == 0) {
  //   // resetFormControls()
  // }
  // else {
    axios.get("https://localhost:5001/api/Order/" + orderId, config)
    .then(res => {
      setValues(res.data)
    })
  // }
}, [orderId])


const submitOrder = (e) =>{
  e.preventDefault();
  axios.post("https://localhost:5001/api/Order/",{
    ...values
  }, config)
  // .then((res)=> {
  //   console.log(res.data);
  // })
}
  
  const openListOfOrders = () =>{
    setOrderListVisibility(true);
  }
  

  return (
    <>
    <Form onSubmit={submitOrder}>
      <Grid container>
        <Grid item xs={6}>
          <Input 
            disabled 
            label="Order Number" 
            name="orderNumber" 
            value={values.orderNumber} 
            InputProps =  {{
                startAdornment: <InputAdornment
                className={classes.adornmentText}
                position = "start">#</InputAdornment>
            }}
          />
          
        </Grid>
        <Grid item xs={6}>
          <Input 
            disabled 
            label="Grand Total" 
            name="gTotal" 
            value={values.gTotal} 
            InputProps =  {{
                startAdornment: <InputAdornment
                className={classes.adornmentText}
                position = "start">€</InputAdornment>
            }}
          />
          <ButtonGroup className={classes.submitButtonGroup}>
            <MuiButton 
                size = "lg"
                endIcon={<RestaurantMenuIcon />}
                type="submit"
            >
                Order
            </MuiButton>
            <MuiButton 
                size = "lg"
                startIcon={<ReplayIcon />}
            />
            
          </ButtonGroup>
          <MuiButton
            size="large"
            onClick={openListOfOrders}
          >
              Orders
          </MuiButton>
        </Grid>
      </Grid>
    </Form>
    <Popup 
        title="List of orders"
        openPopup={orderListVisibility}
        setOpenPopup={setOrderListVisibility}
    >
      <OrderList 
        {...{setOrderId, setOrderListVisibility}}
      />
    </Popup>
    </>
  );
}
