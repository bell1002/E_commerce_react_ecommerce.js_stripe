import React from "react";
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from "@mui/material";

function CartItem({item, onUpdateCartQty, onRemoveFromCart}){

    return(
        <Card>
            <CardMedia component="img" src={item.image.url} alt={item.name}/>
            <CardContent className="d-flex justify-content-between">
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions>
                <div className="d-flex">
                    <Button type="button" size="small" onClick={()=> onUpdateCartQty(item.id, item.quantity -1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={()=> onUpdateCartQty(item.id, item.quantity +1)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={()=>onRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem;