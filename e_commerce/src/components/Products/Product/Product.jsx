import React from "react";
import {Card,CardActions, CardContent, Typography, IconButton, CardMedia} from '@mui/material'
import { AddShoppingCart } from "@mui/icons-material";

function Product({product, onAddToCart}){

 
   
    return(
        <Card className="mt-3">
            <CardMedia component="img" src={product.image.url} title={product.name} style={{ width: '100%', height: '20%' }} />            <CardContent>
                <div className="d-flex justify-content-between">
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="h7" color="textSecondary"/>
            </CardContent>
            <CardActions disableSpacing className="d-flex justify-content-end">
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product;