import React, { useEffect, useState } from 'react'
import axios from "axios";
import Table from "./Layouts/Table"
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';

export default function OrderList(props) {

    const {setOrderId, setOrderListVisibility} = props;

    const [orderList, setOrderList] = useState([]);

    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }

    useEffect(() =>{
        axios.get("https://localhost:5001/api/Order/", config)
        .then((res) =>{
            setOrderList(res.data);
        })
    }, [])

    const showForUpdate = id =>{
        setOrderId(id);
        setOrderListVisibility(false);
    }

  return (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>
                    Order No.
                </TableCell>
                <TableCell>
                    Total
                </TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                orderList.map(item => (
                    <TableRow key={item.orderMasterId}>
                        <TableCell
                            onClick={ e=> showForUpdate(item.orderMasterId)}
                        >
                            {item.orderNumber}
                        </TableCell>
                        <TableCell
                            onClick={ e=> showForUpdate(item.orderMasterId)}
                        >
                            {item.gTotal}
                        </TableCell>
                        <TableCell>
                            <DeleteOutlineTwoToneIcon 
                                color="secondary"
                            />
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
  )
}
