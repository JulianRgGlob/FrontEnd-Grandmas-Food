import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeQuanity } from '../../../stores/cartSlice'
import { setDetail } from '../../../stores/detailCartItemsSlice'
import { CartItemButtom } from './CartItemButtom'

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(128, 128, 128, 0.226)',
        boxShadow: '5px 5px 5px 0px rgba(5, 5, 5, 0.164)',
        margin: '5px',
        padding: '10px',
        borderRadius: '5px',
      }}
    >
      {productImage && (
        <img
          style={{ width: '50px' }}
          src={productImage}
          alt={detail ? detail.fantasyName : ''}
        />
      )}
      {detail ? (
        <>
          <Typography variant="button">{detail.fantasyName}</Typography>
          <p> Price: ${detail.price * quantity}</p>
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
    </div>
  )
}

export default CartItem
