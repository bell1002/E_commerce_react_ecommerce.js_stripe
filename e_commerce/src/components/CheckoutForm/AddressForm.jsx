import React, { useEffect, useState } from "react";
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@mui/material";
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomTextFiels';
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";

function AddressForm({ checkoutToken ,next}) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label:name}));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label:name}));
  const options = shippingOptions.map((sO)=> ({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol}) `}))
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    console.log(countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  }

  const fetchSubdivisions = async (countryCode) =>{
    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  }

  const fetchShippingOptions = async (checkoutTokenId, country, region =null)=>{
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});

    setShippingOptions(options);
    setShippingOption(options[0].id);
  }
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(()=>{
    if(shippingCountry) fetchSubdivisions(shippingCountry);
  },[shippingCountry])

  useEffect(()=>{
    if(shippingSubdivision) fetchShippingOptions(checkoutToken.id ,shippingCountry, shippingSubdivision);

  },[shippingSubdivision])
  const methods = useForm();

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=>next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
          <Grid container spacing={3}>
            <FormInput required name='firstName' label='First name' />
            <FormInput required name='lasttName' label='Last name' />
            <FormInput required name='address1' label='Address' />
            <FormInput required name='email' label='Email' />
            <FormInput required name='city' label='City' />
            <FormInput required name='zip' label='ZIP / Postal code' />
            <Grid item sx={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                 {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))} 
              </Select>
            </Grid>
            <Grid item sx={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item sx={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <div className="d-flex justify-content-between mt-4">
              <Button component={Link} to="/cart" variant="outlined">Back To Cart</Button>
              <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm;