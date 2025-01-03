import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { useSelector, useDispatch } from 'react-redux'
import { setUsers, updateUser, deleteUser } from '../../../stores/usersSlice'
import { useEffect } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { hash } from 'bcryptjs'

function Dashboard() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)

  useEffect(() => {
    const usersFromStorage = localStorage.getItem('users')

    if (usersFromStorage) {
      const parsedUsers = JSON.parse(usersFromStorage).map((user, index) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        userUuid: user.id,
        role: user.role,
        hash: user.hash,
      }))
      dispatch(setUsers(parsedUsers))
    }
  }, [dispatch])

  const handleProcessRowUpdate = (newRow) => {

    const originalUser = users.find((user) => user.id === newRow.id)


    const updatedUser = {
      ...originalUser, 
      ...newRow, 
    }

    dispatch(updateUser(updatedUser))

    localStorage.setItem(
      'users',
      JSON.stringify(
        users.map((user) => (user.id === newRow.id ? updatedUser : user))
      )
    )

    return updatedUser 
  }

  const handleDeleteClick = (id) => () => {
    dispatch(deleteUser(id))
    localStorage.setItem(
      'users',
      JSON.stringify(users.filter((user) => user.id !== id))
    )
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
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
      field: 'hash',
      headerName: 'Hash',
      sortable: true,
      width: 250,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(params.id)}
          color="inherit"
        />,
      ],
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
        User Registers
      </Typography>
      <DataGrid
        rows={users}
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
        processRowUpdate={handleProcessRowUpdate}
      />
    </Box>
  )
}

export default Dashboard
