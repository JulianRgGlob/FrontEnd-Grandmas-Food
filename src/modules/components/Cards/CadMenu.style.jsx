import { Box, CardMedia } from '@mui/material'
import styled from 'styled-components'

const StyledBoxCard = styled(Box)`
  padding: 4;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`
const StyledCardMediaImg = styled(CardMedia)`
  height: 400px;
`
export { StyledBoxCard, StyledCardMediaImg }
