import React from "react";
import { Typography, Button, Divider } from "@mui/material";
import { Elements,CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


import Review from './Review';

const stripePromise = loadStripe('...');
function PaymentForm({checkoutToken, backStep}){
    return(
        <>
            <Review checkoutToken={checkoutToken}/>
            <Divider/>
            <Typography variant="h6" gutterBottom>Payment Method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) => (
                        <form>
                            <CardElement/>
                            <br/><br/>
                            <div className="d-flex justify-content-between mb-4">
                                <Button variant="outlined" onClick={backStep} className="ml-4">Back</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pay {checkoutToken.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm;