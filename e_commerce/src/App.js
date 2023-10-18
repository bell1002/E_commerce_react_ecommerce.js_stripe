import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import {Products, Navbar, Cart, Checkout} from './components';
import { commerce } from './lib/commerce';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Outlet } from '@mui/icons-material';


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order,setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const fetchProducts = async () =>{
    const {data} = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  }

  const handleAddToCart = async (product_id, quantity) => {
    const item = await commerce.cart.add(product_id, quantity);

    setCart(item);
  }
  const handleUpdateCartQty =async (product_id, quantity) =>{
    const cart= await commerce.cart.update(product_id, {quantity});

    setCart(cart);
  }
  const handleRemoveFromCart =async (product_id) =>{
    const cart= await commerce.cart.remove(product_id);

    setCart(cart);
  }
  const handleEmptyCart =async () =>{
    const cart= await commerce.cart.empty();

    setCart(cart);
  }

  const refreshCart = async () =>{
    const newCart= await commerce.cart.refresh();

    setCart(newCart);
  }

  const hanldeCaptureCheckout = async (checkoutTokenId, newOrder)=>{
    try{
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder);
      setOrder(incomingOrder);
      refreshCart();
    }
    catch(error){
      setErrorMessage(error.data.error.message);
    }
  }
  
  useEffect(()=>{
    fetchProducts();
    fetchCart();
  },[]);

  //console.log(cart);
  
  return (
    <Router>
      <div className="App">
      <div className='pb-3'><Navbar totalItems={cart?.total_items}/></div>

      <Routes>
      <Route exact path='/' >
     
          <Route index element={ <Products products={products} onAddToCart={handleAddToCart}/>}/>
         
      </Route>
      <Route exact path='/cart' >
    
          <Route index element={
          <Cart 
          cart={cart} 
          handleUpdateCartQty={handleUpdateCartQty}
          handleRemoveFromCart={handleRemoveFromCart}
          handleEmptyCart={handleEmptyCart}
          />}/>
        
      </Route>
      <Route exact path='/checkout'>
      <Route index element={<Checkout cart={cart} order={order} onCaptureCheckout={hanldeCaptureCheckout} error={errorMessage}

      />}/>
      </Route>

      </Routes>
      </div>
    </Router>
  );
}

export default App;
