import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { toggleStatusTab } from '../../../stores/cartSlice';
import { useNavigate } from 'react-router-dom';

function CarT() {
  const navigate = useNavigate();
  const statusTab = useSelector((store) => store.cart.statusTab);
  const carts = useSelector((store) => store.cart.items);
  const products = useSelector((store) => store.products.products);
  const dispatch = useDispatch();
  console.log('statusTab', statusTab);
  const handleToggleDrawer = () => {
    console.log('click close');
    dispatch(toggleStatusTab());
    // console.log("togle",dispatch(toggleStatusTab()));
  };

  const cartContent = (
    <Box
      sx={{
        width: 400,
        display: 'grid',
        gridTemplateRows: '60px 1fr 60px',
        height: '100%',
        backgroundColor: '#f0f0f0',
      }}
      role="presentation"
      onKeyDown={(e) => {
        if (e.key === 'Tab' || e.key === 'Shift') return;
      }}
    >
      <Typography
        variant="h3"
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          textShadow: '2px 2px #ff000',
          backgroundColor: '#f87171',
          alignItems: 'center',
        }}
      >
        Shopping Cart
      </Typography>
      <div style={{ padding: '5px' }}>
        {carts.map((item, key) => (
          <CartItem key={key} data={item} products={products} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}>
        <Button onClick={handleToggleDrawer}>CLOSE</Button>
        <Button onClick={() => navigate('/detailCar')}>CHECKOUT</Button>
      </div>
    </Box>
  );

  return (
    <>
      <Drawer anchor="right" open={statusTab} onClose={handleToggleDrawer}>
        {cartContent}
      </Drawer>
    </>
  );
}

export default CarT;
