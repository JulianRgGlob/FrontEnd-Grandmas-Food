import { Typography } from '@mui/material'
import {Box} from '@mui/material'
import React from 'react'
import DashboardLayoutBasic from '../Admin/NavbarAdmin'

function AdminView() {
  return (
    <Box>
      {/* <Typography variant="h2" sx={{textAlign:'center', margin:'10px'}}>Login Admin View</Typography> */}
      <DashboardLayoutBasic/>
    </Box>
  )
}

export default AdminView
