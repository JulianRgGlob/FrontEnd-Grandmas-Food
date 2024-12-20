import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'

function Dashboard() {

  const users = localStorage.getItem('users')
  console.log(users)
  let rows = []
    if (users) {
        rows = JSON.parse(users).map((user, index) => ({
            id: index ,
            name: user.name,
            email: user.email,
            userUuid: user.id,
        }))
    }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      editable: true,
    },
    {
      field: 'userUuid',
      headerName: 'Uuid',
      sortable: true,
      width: 400,
    },
  ]

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ textAlign: 'center' }}
      >
        {' '}
        User Registers{' '}
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}

export default Dashboard