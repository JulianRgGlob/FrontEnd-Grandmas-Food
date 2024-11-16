import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { StyledBoxCard } from './CadMenu.style'
import ModalCard from '../Modal/ModalCard'
import { useSelector, useDispatch } from 'react-redux'
import {fetchProducts,clearSelectProduct} from '../../../stores/productsSlice'
import { fetchImages } from '../../../stores/imagesSlice'
import { setOpen } from '../../../stores/modalSlice'
import { Cards } from './Cards'

function CardMenu() {
  const dispatch = useDispatch()
  const productsRedux = useSelector((store) => store.products.products)
  const open = useSelector((store) => store.modal.open)
  const selectProduct = useSelector((store) => store.products.selectProduct)
  const images = useSelector((store) => store.images.images)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    if (productsRedux.length > 0) {
      dispatch(fetchImages())
    }
  }, [dispatch, productsRedux])

  const handleClose = () => {
    dispatch(setOpen(false))
    dispatch(clearSelectProduct())
  }

  return (
    <StyledBoxCard id="BoxCardMenu">
      {productsRedux.length > 0 ? (
        productsRedux.map((product) => (
          <Cards key={product.productUuid} product={product} images={images} />
        ))
      ) : (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Cargando...
        </Typography>
      )}
      <ModalCard
        open={open}
        handleClose={handleClose}
        selectedProduct={selectProduct}
      ></ModalCard>
    </StyledBoxCard>
  )
}

export default CardMenu
