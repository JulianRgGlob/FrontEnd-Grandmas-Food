import { Box, CardMedia } from '@mui/material'
import styled from 'styled-components'

const StyledBoxCard = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 16px; /* Espaciado uniforme entre tarjetas */
  padding: 16px; /* Espaciado alrededor del contenedor */
`

const StyledCardMediaImg = styled(CardMedia)`
  width: 100%; /* Ocupa todo el ancho del contenedor */
  height: 200px; /* Altura fija */
  object-fit: cover; /* Ajusta la imagen recortándola */
  object-position: center; /* Centra la imagen en caso de recorte */
`

export { StyledBoxCard, StyledCardMediaImg }
