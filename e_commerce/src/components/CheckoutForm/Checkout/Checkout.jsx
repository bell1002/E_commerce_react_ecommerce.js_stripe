import React, { useState, useEffect } from "react";
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@mui/material";
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from "../../../lib/commerce";
const steps = ['Shipping address', 'Payment details'];

function Checkout({cart}){

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);

    useEffect(() =>{
        const generateToken = async () =>{
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});

                console.log(token);

                setCheckoutToken(token);

            }catch(error){

            }

        }
        generateToken();
    },[cart]);
    const Confirmation = () =>{
        return(
            <div>
            Confirmation
        </div>
        )
    }
    const Form =()=> activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken}/>
    : <PaymentForm/>
        
    
    return(
        <>
            
            <div className="row d-flex justify-content-center ">
                <main className="col-md-6 mt-5" >
                    <Paper>
                        <Typography variant="h4" align="center">Checkout</Typography>
                        <Stepper activeStep={activeStep} className="m-5">
                            {steps.map((step) =>(
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? <Confirmation/> :checkoutToken && <Form/>}
                    </Paper>
                </main>
            </div>
        </>
    )
}

export default Checkout;