import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

function Review({ checkoutToken }) {
  console.log(checkoutToken.subtotal.formatted_with_code);

  return (
    <>
      <Typography variant="h6" gutterBottom>Order Summary</Typography>
      <List disablePadding>
        {checkoutToken.line_items.map((product) => (
          <ListItem key={product.name}>
            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
            <Typography variant="body2">{product.line_total.formatted_with_code}</Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1">
            {checkoutToken.subtotal.formatted_with_code}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}

export default Review;