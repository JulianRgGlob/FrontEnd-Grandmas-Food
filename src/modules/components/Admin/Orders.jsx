import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setRows, setSelectedUserId } from '../../../stores/cartSlice';

function Orders() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const allCarts = JSON.parse(localStorage.getItem('allCarts')) || [];
  
  const selectedUserId = useSelector((state) => state.cart.selectedUserId);
  const rows = useSelector((state) => state.cart.rows);


  const handleUserChange = (event) => {
    const userId = event.target.value;
    dispatch(setSelectedUserId(userId));


    const userCarts = allCarts.filter(cart => cart.userId === userId);
    const newRows = userCarts.flatMap((cart, index) => 
      cart.items.map((order) => {
        const matchingProduct = products.find(
          (product) => product.productUuid === order.productId
        );

        return {
          id: `${cart.userId}-${index}-${order.productId}`, 
          quantity: order.quantity,
          nameProducts: matchingProduct ? matchingProduct.fantasyName : 'Product not found',
          productId: order.productId,
          orderPrice: matchingProduct ? matchingProduct.price : 'Price not found',
        };
      })
    );

    dispatch(setRows(newRows)); 
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'nameProducts',
      headerName: 'Name Products',
      width: 300,
      editable: true,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 100,
      editable: true,
    },
    {
      field: 'productId',
      headerName: 'UUID',
      sortable: true,
      width: 400,
    },
    {
      field: 'orderPrice',
      headerName: 'Price',
      sortable: true,
      width: 150,
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
        Orders in Carts
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="select-user-label" >Select User</InputLabel>
        <Select
          labelId="select-user-label"
          value={selectedUserId}
          onChange={handleUserChange}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
  );
}

export default Orders;