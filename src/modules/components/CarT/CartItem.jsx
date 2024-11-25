import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeQuanity } from '../../../stores/cartSlice'
import { setDetail } from '../../../stores/detailCartItemsSlice'
import { CartItemButtom } from './CartItemButtom'
import { StyledDivCart } from './Cart.style'

function CartItem(props) {
  const dispatch = useDispatch()

  const { productId, quantity } = props.data
  console.log(productId, quantity)

  const { products } = props
  console.log(products)
  const detail = useSelector((store) => store.detail.detail[productId])
  const images = useSelector((store) => store.images.images)

  console.log('detail', detail)

  const productImage = detail ? images[detail.productUuid] : null

  useEffect(() => {
    if (Array.isArray(products)) {
      const findDetail = products.find(
        (product) => product.productUuid === productId
      )
      //si no esta ya el producto ahi si se despacha
      if (
        findDetail &&
        (!detail || detail.productUuid !== findDetail.productUuid)
      ) {
        dispatch(setDetail(findDetail))
      }
    } else {
      console.error('products no es un array:', products)
    }
  }, [productId, products, dispatch, detail])

  const handleMinusQuantity = () => {
    dispatch(
      changeQuanity({
        productId: productId,
        quantity: quantity - 1,
      })
    )
  }
  const handlePlusQuantity = () => {
    dispatch(
      changeQuanity({
        productId: productId,
        quantity: quantity + 1,
      })
    )
  }
  return (
    <StyledDivCart>
      {productImage && (
        <img
          style={{ width: '50px', height: '50px' }}
          src={productImage}
          alt={detail ? detail.fantasyName : ''}
        />
      )}
      {detail ? (
        <>
          <Typography variant="button">{detail.fantasyName}</Typography>
          <p> Price: ${detail.price.toFixed(2) * quantity.toFixed(2)}</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.1rem',
            }}
          >
            <CartItemButtom value={handleMinusQuantity} text="-"/>
            <p style={{ margin: '4px' }}>Quantity:{quantity}</p>
            <CartItemButtom value={handlePlusQuantity} text="+" />
          </div>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </StyledDivCart>
  )
}

export default CartItem
