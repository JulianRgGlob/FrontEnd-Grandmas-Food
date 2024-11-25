import { Box, CardMedia } from '@mui/material'
import styled from 'styled-components'

const StyledBoxCard = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 16px; 
  padding: 16px;
`

const StyledCardMediaImg = styled(CardMedia)`
  width: 100%;
  height: 200px; 
  object-fit: cover; 
  object-position: center;
`

export { StyledBoxCard, StyledCardMediaImg }
