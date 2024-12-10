import React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import IconButton from '@mui/material/IconButton'
import { StyledCardMediaImg } from './CadMenu.style'
import Typography from '@mui/material/Typography'
import { addToCart } from '../../../stores/cartSlice'
import { setSelectProduct } from '../../../stores/productsSlice'
import { useDispatch, useSelector } from 'react-redux'

export const Cards = ({ product, images }) => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => {
    return state.auth.user?.id;
  });

  const handleAddToCart = (product) => {
    if (!userId) {
      console.error('No userId provided')
      return
    }

    dispatch(
      addToCart({
        productId: product.productUuid,
        quantity: 1,
        userId,
      })
    )
  }
  const handleOpen = (product) => {
    dispatch(setOpen(true))
    dispatch(setSelectProduct(product))
  }

  return (
    <Card sx={{ width: 250, margin: 1 }}>
      <CardActionArea>
        <CardContent>
          <StyledCardMediaImg
            component="img"
            image={images[product.productUuid] || ''}
            alt={product.fantasyName}
          />
          <Typography gutterBottom variant="h5" component="div">
            {product.fantasyName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Precio: ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Button
            onClick={() => handleOpen(product)}
            size="small"
            color="primary"
          >
            More info...
          </Button>
        </div>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={() => handleAddToCart(product)}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
