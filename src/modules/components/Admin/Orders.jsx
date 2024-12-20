import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'

function Orders() {
  const products = useSelector((state) => state.products.products)
  console.log('prodcuts ', products)

  const users = localStorage.getItem('users')
  const userId = JSON.parse(users)[0].id
  console.log(userId)
  const orders = localStorage.getItem(`cart-${userId}`)
  console.log('orders', orders)

  let rows = []
  if (orders) {
    rows = JSON.parse(orders).map((order, index) => {
      const matchingProduct = products.find(
        (product) => product.productUuid === order.productId
      )
      console.log('matchingProduct', matchingProduct)

      return {
        id: index,
        quantity: order.quantity,
        nameProdcuts: matchingProduct
          ? matchingProduct.fantasyName
          : 'Product not found',
        productId: order.productId,
        orderPrice: matchingProduct
        ? matchingProduct.price
        : 'Price not found',
      }
    })
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'nameProdcuts',
      headerName: 'Name Prodcuts',
      width: 300,
      editable: true,
    },
    {
      field: 'quantity',
      headerName: 'quantity',
      width: 100,
      editable: true,
    },
    {
      field: 'productId',
      headerName: 'Uuid',
      sortable: true,
      width: 400,
    },
    {
      field: 'orderPrice',
      headerName: 'price',
      sortable: true,
      width: 150,
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
        Orders in Carts
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

export default Orders
