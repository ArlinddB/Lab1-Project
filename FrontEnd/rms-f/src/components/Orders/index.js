import React from 'react';
import OrderForm from './OrderForm';
import { useForm } from "./hooks/useForm";
import { Grid } from '@material-ui/core';
import SearchFoodItems from './SearchFoodItems';
import OrderedFoodItems from './OrderedFoodItems';
import SideBar from "../Sidebar/SideBar";

const generateOrderNumber = () =>
  Math.floor(10000 + Math.random() * 90000).toString();

const getFreshModelObject = () => ({
  orderNumber: generateOrderNumber(),
  gTotal: 0,
  deletedOrderItems: "",
  orderDetails: [],
});


const Order = () => {

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = useForm(getFreshModelObject);

    


  return (
    <>
    <SideBar />
    <Grid container spacing={2}>
        <Grid item xs={12}>
          <OrderForm
            {...{values, setValues, errors, handleInputChange}}
          />
        </Grid>
        <Grid item xs={6}>
          <SearchFoodItems 
            {...{ values, setValues }}
          />
        </Grid>
        <Grid item xs={6}>
          <OrderedFoodItems 
            {...{ values, setValues}}
          />
        </Grid>
    </Grid>
    </>
  )
}

export default Order