import React from 'react'
import Card from '@mui/material/Card'
import { CardPayment } from './CardPayment'
import { useSelector } from 'react-redux'
import CartItemHorizontal from './CartItemHorizontal'

export const CardHorizontally = () => {
  const products = useSelector((store) => store.products.products)
  const carts = useSelector((store) => store.cart.items)
  const userId = localStorage.getItem('loggedin')
  const users = JSON.parse(localStorage.getItem('users'))
  const loggedInUser = users.find(user => user.id === userId);
  const name = loggedInUser ? loggedInUser.name : 'Usuario no encontrado';
  const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = carts.reduce((total, cartItem) => {
    
    const product = products.find(product => product.productUuid === cartItem.productId); 
    console.log('product', product);
    
    if (product) {
      return total + (product.price * cartItem.quantity);
    }
    
    return total; 
  }, 0);

  return (
    <div style={{ display: 'flex' }}>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '60%',
          marginRight: '10px',
        }}
      >
        <div style={{width:'100%'}}>
          {carts.map((item, key) => (
            <CartItemHorizontal key={key} data={item} products={products} />
          ))}
        </div>
      </Card>
      <CardPayment name={name} totalPrice={totalPrice.toFixed(2)} quantityTot={totalQuantity} sx={{height:'100%' }} />
    </div>
  )
}
