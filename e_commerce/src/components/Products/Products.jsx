import React from 'react';
import { Grid } from '@mui/material';
import Product from './Product/Product';


function Products({products, onAddToCart}){
    return(
        <main className='mt-5'>
        <Grid container justifyContent="center" spacing={4}>
            {
                products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                         <Product product={product} onAddToCart={onAddToCart}/>
                    </Grid>
                ))
            }
        </Grid>
    </main>
    );
}

export default Products;