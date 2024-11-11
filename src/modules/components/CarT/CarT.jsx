import { Typography,Button } from '@mui/material'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import CartItem from './CartItem'
import { toggleStatusTab } from '../../../stores/cartSlice'
import { useNavigate } from 'react-router-dom'
function CarT() {
  const navigate = useNavigate();
  const carts = useSelector(store => store.cart.items)
  const products = useSelector(store => store.products.products)
  console.log("products" , JSON.stringify(products, null, 2));
  console.log("carts" , JSON.stringify(carts, null, 2));
  const statusTab = useSelector(store => store.cart.statusTab) 
  const dispatch = useDispatch()
  const handleCLoseTabCart = () => {
    dispatch(toggleStatusTab())
  }
  return (
    <div style={{position:"fixed", top:"0",right:"0", backgroundColor:"white",boxShadow:"10px 5px 20px black", width:"26rem",height:"100%",display:"grid",gridTemplateRows:"60px 1fr 60px",  transform: statusTab === false ? 'translateX(100%)' : 'translateX(0)',transition: 'transform 0.3s ease'}}>
      <Typography variant='h3'sx={{p:1,display:'flex',justifyContent:'center',textShadow:'2px 2px #ff000'}}>
      Shopping Cart
      </Typography>
      <div style={{padding:"5px"}}>
        {carts.map((item,key) =>
          <CartItem key={key} data={item} products={products}/>
        )}
      </div>
      <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)"}}>
        <Button onClick={handleCLoseTabCart}>
          CLOSE
        </Button>
        <Button onClick={() => { return navigate("/detailCar");}}>
          CHECKOUT
        </Button>
      </div>
    </div>
  )
}

export default CarT