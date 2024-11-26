import React, { useEffect} from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import IconButton from '@mui/material/IconButton'
import { useSelector, useDispatch } from 'react-redux'
import { toggleStatusTab, setTotalQuantity } from '../../../stores/cartSlice'
import CarT from '../CarT/CarT'
const StyledIconButtonCart = () => {
  const dispatch = useDispatch()
  const totalQuantity = useSelector((store) => store.cart.totalQuantity)
  const carts = useSelector((store) => store.cart.items)
  useEffect(() => {
    let total = 0
    console.log('total', totalQuantity)
    carts.forEach((item) => (total += item.quantity))
    dispatch(setTotalQuantity(total))
  }, [carts])
  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab())
  }
  return (
    <IconButton
      sx={{
        width: '2.5rem',
        height: '2.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
      onClick={handleOpenTabCart}
    >
      <AddShoppingCartIcon
        sx={{ display: { xs: 'flex', md: 'flex' }, mr: 2 }}
      />
      <span
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1.8rem',
          backgroundColor: '#f87171a0',
          color: 'white',
          fontSize: '0.9rem',
          width: '1.25rem',
          height: '1.25rem',
          borderRadius: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {totalQuantity}
      </span>
      <CarT/>
    </IconButton>
  )
}
export default StyledIconButtonCart
