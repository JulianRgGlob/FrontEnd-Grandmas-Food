import React from 'react'
import { CardHorizontally } from '../components/DetailCarT/CardHorizontally'
import Typography from '@mui/material/Typography'

function DetailCar() {
  return (
    <div style={{    
      padding: "1.25rem",
    }}>
      <Typography variant="h4" gutterBottom sx={{textAlign:'center', marginBottom:'40px'}}> Shopping Card </Typography>
      <CardHorizontally/>
    </div>
  )
}

export default DetailCar