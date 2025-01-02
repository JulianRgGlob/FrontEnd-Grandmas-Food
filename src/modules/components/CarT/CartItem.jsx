import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeQuantity } from '../../../stores/cartSlice'
import { setDetail } from '../../../stores/detailCartItemsSlice'
import { CartItemButtom } from './CartItemButtom'
import { StyledDivCart } from './Cart.style'
import { cleanName } from '../../../utils/clearData/cleanName'

function CartItem(props) {
  const dispatch = useDispatch()

  const { productId, quantity } = props.data
  const userId = useSelector((state) => {
    return state.auth.user?.id;
  });
  const { products } = props
  const detail = useSelector((store) => store.detail.detail[productId])
  const images = useSelector((store) => store.images.images)
  const total = detail ? detail.price * quantity : 0


  const productImage = detail ? images[detail.productUuid] : null

  useEffect(() => {
    if (Array.isArray(products)) {
      const findDetail = products.find(
        (product) => product.productUuid === productId
      )
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
    
    if (!userId) {
      console.error('No userId provided')
      return
    }

    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity - 1,
        userId,
      })
    )
  }
  const handlePlusQuantity = () => {

    if (!userId) {
      console.error('No userId provided')
      return
    }

    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity + 1,
        userId,
      })
    )
  }
  return (
    <StyledDivCart>
      {productImage && (
        <img
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          src={productImage}
          alt={detail ? detail.fantasyName : ''}
        />
      )}
      {detail ? (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
              padding: '0.5rem',
              width: '100%',
            }}
          >
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="button" style={{ marginBottom: '0.5rem' }}>
                {cleanName(detail.fantasyName)}
              </Typography>
              <p style={{ marginBottom: '0.5rem' }}>
                Price: ${total.toFixed(2)}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.3rem',
                flex: 1,
              }}
            >
              <CartItemButtom value={handleMinusQuantity} text="-" />
              <div
            style={{
              width: '70%',
              textAlign: 'center',
            }}
          >
            <p style={{ margin: '4px' }}> Quantity {quantity}</p>
          </div>
              <CartItemButtom value={handlePlusQuantity} text="+" />
            </div>
          </div>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </StyledDivCart>
  )
}

export default CartItem
