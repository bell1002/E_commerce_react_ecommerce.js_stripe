import React from "react";
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

import logo from '../../assets/commerce.jpg'
import { useLocation, useNavigate } from "react-router-dom";

function Navbar({totalItems}){
    const navigate= useNavigate();
    const location = useLocation();

    const handleCart=()=>{
        navigate('/cart');
    }

    const handleHome= () =>{
        navigate('/');
    }
    return(
        <>
            <AppBar position="fixed" color="inherit" >
                <Toolbar className="d-flex justify-content-between">
                    <Typography variant="h8" onClick={handleHome} className="btn cursor-pointer">
                    <img src={logo} alt="Commerce.js" height="50px" className="btn cursor-pointer"/>
                    Commerce.js
                    </Typography>
                    <div></div>
                    {location.pathname === '/' && (
                    <div >
                        <IconButton aria-label="Show cart items" color="inherit" onClick={handleCart}>
                            <Badge badgeContent={totalItems} color="secondary" >
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>)}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;