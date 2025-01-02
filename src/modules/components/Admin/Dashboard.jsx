import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers, updateUser, deleteUser } from '../../../stores/usersSlice';
import { useEffect } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

function Dashboard() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users); // Asegúrate de acceder a la propiedad correcta

  useEffect(() => {
    const usersFromStorage = localStorage.getItem('users');
    console.log('users', usersFromStorage);

    if (usersFromStorage) {
      const parsedUsers = JSON.parse(usersFromStorage).map((user, index) => ({
        id: index,
        name: user.name,
        email: user.email,
        userUuid: user.id,
      }));
      dispatch(setUsers(parsedUsers));
    }
  }, [dispatch]);

  const handleProcessRowUpdate = (newRow) => {
    dispatch(updateUser(newRow));
    localStorage.setItem(
      'users',
      JSON.stringify(
        users.map((user) => (user.id === newRow.id ? newRow : user))
      )
    );
    return newRow;
  };

  const handleDeleteClick = (id) => () => {
    dispatch(deleteUser(id));
    localStorage.setItem(
      'users',
      JSON.stringify(users.filter((user) => user.id !== id))
    );
  };

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
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(params.id)}
          color="inherit"
        />,
      ],
    },
  ];

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
        rows={users} // Usa directamente los usuarios del estado
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
  );
}

export default Dashboard;