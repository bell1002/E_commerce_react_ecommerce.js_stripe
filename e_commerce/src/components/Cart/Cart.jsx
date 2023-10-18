import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";


function Cart({cart, handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart}){
    const isEmpty = !cart || !cart.line_items || cart.line_items.length === 0;
    const EmptyCart = () =>(
        <Typography variant="subtitle1">You have no items in your shopping cart, start adding some!</Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className="d-flex justify-content-between pt-5">
                <Typography variant="h5">
                    Subtotal : {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button size="large" type="button" variant="contained" color="secondary" style={{marginRight:"10px"}} onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link}  to='/checkout' size="large" type="button" variant="contained" color="primary" >Checkout</Button>
                </div>
            </div>
        </>
    )
    return(
        <Container>
            <Typography variant="h4" className="mt-5">Your Shooping Cart</Typography>
            {isEmpty ? <EmptyCart/> : <FilledCart/>}
        </Container>
    )
}

export default Cart;