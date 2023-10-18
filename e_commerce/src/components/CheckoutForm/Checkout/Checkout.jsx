import React, { useState, useEffect } from "react";
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@mui/material";
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from "../../../lib/commerce";
import { Link } from "react-router-dom";

const steps = ['Shipping address', 'Payment details'];

function Checkout({cart, order, onCaptureCheckout, error}){

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);

    console.log(checkoutToken);
    const [shippingData, setShippingData]= useState([]);
    useEffect(() =>{
        const generateToken = async () =>{
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
  
                setCheckoutToken(token);

            }catch(error){

                console.log(error);
            }

        }
        generateToken();
    },[cart]);

    const nextStep =() =>{
        setActiveStep((prevActiveStep)=>prevActiveStep+1);
    }
    const backStep =() =>{
        setActiveStep((prevActiveStep)=>prevActiveStep-1);
    }
    const next = (data) =>{
        setShippingData(data);

        nextStep();
    }
    let Confirmation = () => order.customer ? (
       
            <>
                <div>
                    <Typography variant="h5">Thank you for your pruchase, {order.customer.firstname}  {order.customer.lastname}</Typography>
                    <Divider />
                    <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
                </div>
                <br/>
                <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
            </>
        ) : (
            <div>
            <CircularProgress/>
            </div>
        );
        if(error){
            <>
                <Typography variant="h5" >Error: {error}</Typography>
                <br/>
                <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
            </>
        }
    
    const Form =()=> activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm shippingData={shippingData} nextStep={nextStep} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout}/>
        
    
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