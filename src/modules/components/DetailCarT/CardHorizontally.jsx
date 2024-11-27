import React from 'react'
import Card from '@mui/material/Card'
import { CardPayment } from './CardPayment'
import { useSelector } from 'react-redux'
import CartItemHorizontal from './CartItemHorizontal'
import { height } from '@mui/system'

export const CardHorizontally = () => {
  const products = useSelector((store) => store.products.products)
  const detail = useSelector((store) => store.detail.detail)
  const carts = useSelector((store) => store.cart.items)
  console.log('product Horizontal', products)
  console.log('detail cardHorizton', detail)

  return (
    <div style={{ display: 'flex' }}>
      <Card
        sx={{
          display: 'flex',
          // backgroundColor: 'blue',
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
      <CardPayment sx={{ backgroundColor: 'gray',height:'100%' }} />
    </div>
  )
}
