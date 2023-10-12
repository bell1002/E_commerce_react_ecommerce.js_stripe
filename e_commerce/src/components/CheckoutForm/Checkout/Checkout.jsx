import React, { useState } from "react";
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@mui/material";
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping address', 'Payment details'];

function Checkout(){

    const [activeStep, setActiveStep] = useState(2);

    const Confirmation = () =>{
        <div>
            Confirmation
        </div>
    }
    const Form =()=> activeStep === 0
    ? <AddressForm/>
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
                        {activeStep === steps.length ? <Confirmation/> : <Form/>}
                    </Paper>
                </main>
            </div>
        </>
    )
}

export default Checkout;