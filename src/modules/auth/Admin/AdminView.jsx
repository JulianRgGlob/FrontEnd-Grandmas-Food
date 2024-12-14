import { Typography } from '@mui/material'
import {Box} from '@mui/material'
import React from 'react'
import Login from '../Login/Login'
function AdminView() {
  return (
    <Box>
      <Typography variant="h2" sx={{textAlign:'center'}}> Login Admin</Typography>
      <Login></Login>
      <div>AdminView2</div>
    </Box>
  )
}

export default AdminView
