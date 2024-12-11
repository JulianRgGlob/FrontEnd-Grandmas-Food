import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeQuanity } from '../../../stores/cartSlice'
import { setDetail } from '../../../stores/detailCartItemsSlice'
import { CartItemButtom } from '../CarT/CartItemButtom'
import CardMedia from '@mui/material/CardMedia'

function CartItemHorizontal(props) {
  const dispatch = useDispatch()
  const userId = useSelector((state) => {
    return state.auth.user?.id;
  });
  const { productId, quantity } = props.data
  console.log(productId, quantity)

  const { products } = props
  console.log(products)
  const detail = useSelector((store) => store.detail.detail[productId])
  const images = useSelector((store) => store.images.images)

  console.log('detail', detail)

  const productImage = detail ? images[detail.productUuid] : null
    const total = detail ? detail.price * quantity : 0
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
    if (!userId) {
      console.error('No userId provided')
      return
    }

    dispatch(
      changeQuanity({
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
      changeQuanity({
        productId: productId,
        quantity: quantity + 1,
        userId,
      })
    )
  }
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid rgba(0, 0, 0, 0.6)',
        // backgroundColor: 'rgba(128, 128, 128, 0.226)',
        boxShadow: '5px 5px 5px 0px rgba(5, 5, 5, 0.164)',
        marginBottom: '8px',
        padding: '10px',
        borderRadius: '5px',
        overflowY: 'auto',
      }}
    >
      {detail ? (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'center',
              textAlign: 'center',
              flex: '1',
            }}
          >
            <Typography variant="h4">{detail.fantasyName}</Typography>
            <Typography variant="h6">{detail.description}</Typography>
            <p> Price: ${total.toFixed(2)}</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.1rem',
              }}
            >
              <CartItemButtom value={handleMinusQuantity} text="-" />
              <p style={{ margin: '4px' }}>Quantity:{quantity}</p>
              <CartItemButtom value={handlePlusQuantity} text="+" />
            </div>
          </Box>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
      {productImage && (
        <CardMedia
          component="img"
          sx={{ height:200, width: 150, backgroundColor: 'purple' }}
          image={productImage}
          alt={detail ? detail.fantasyName : ''}
        />
      )}
    </div>
  )
}

export default CartItemHorizontal
