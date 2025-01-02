import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

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
  const handleEditClick = () => () => {}
  const handleDeleteClick = () => () => {}
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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: () => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick()}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick()}
            color="inherit"
          />,
        ];
      },
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
