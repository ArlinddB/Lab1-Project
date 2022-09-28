import React from 'react'
import { List, ListItem, ListItemText, Paper, InputBase, IconButton, makeStyles, ListItemSecondaryAction, Button, ButtonGroup } from '@material-ui/core';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';


const useStyles = makeStyles(theme => ({
    paperRoot: {
        margin: '15px 0px',
        '&:hover': {
            cursor: 'pointer'
        },
        // '&:hover $deleteButton': {
        //     display: 'block'
        // }
    },
    buttonGroup: {
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        '& .MuiButtonBase-root ': {
            border: 'none',
            minWidth: '25px',
            padding: '1px'
        },
        '& button:nth-child(2)': {
            fontSize: '1.2em',
            color: '#000'
        }
    },
    deleteButton: {
        // display: 'none',
        '& .MuiButtonBase-root': {
            color: '#E81719'
        },
    },
    totalPerItem: {
        fontWeight: 'bolder',
        fontSize: '1.2em',
        margin: '0px 10px'
    }
}))


export default function OrderedFoodItems(props) {

    const { values, setValues} = props;

    const classes = useStyles();

    let orderedFastFood = values.orderDetails;

    const updateQuantity = (index, value) => {
        let x ={...values};
        if(x.orderDetails[index].quantity + value > 0){
            x.orderDetails[index].quantity += value;
            setValues({...x});
        }
    }

    const removeFastFood = (index, id) => {
        let x = {...values};
        x.orderDetails = x.orderDetails.filter((_, i) => i != index);
        setValues({...x});
      }
  


  return (
    <List>
        {
            orderedFastFood.length == 0 ?
            <ListItem>
                <ListItemText
                    primary="Select Food Items"
                    primaryTypographyProps={{
                        style:{
                            textAlig:"center",
                            color:"#c4c4c4",
                            fontStyle:"italic"
                        }
                    }}
                />
            </ListItem>
            :
            orderedFastFood.map((item, index) => (
                <Paper key={index} className={classes.paperRoot}>
                    <ListItem>
                        <ListItemText 
                            primary={item.foodName}
                            primaryTypographyProps={{
                                component: 'h1',
                                style: {
                                    fontWeight: '500',
                                    fontSize: '1.2em'
                                }
                            }}
                            secondary={
                                <>
                                    <ButtonGroup size="sm" className={classes.buttonGroup}>
                                        <Button
                                            onClick={e => updateQuantity(index, -1)}
                                        >
                                            -
                                        </Button>
                                        <Button disabled>
                                            {item.quantity}
                                        </Button>
                                        <Button
                                            onClick={e => updateQuantity(index, 1)}

                                        >
                                            +
                                        </Button>
                                    </ButtonGroup>
                                    <span className={classes.totalPerItem}>
                                        {"€" + item.quantity * item.foodPrice}
                                    </span>
                                </>
                            }
                            secondaryTypographyProps={{
                                component: 'div'
                            }}
                        />
                        <ListItemSecondaryAction className={classes.deleteButton}>
                            <IconButton
                                disableRipple
                                onClick = { e => removeFastFood(index, item.orderDetailId)} 
                            >
                                <DeleteTwoToneIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Paper>
            ))
        }
    </List>

  )
}
