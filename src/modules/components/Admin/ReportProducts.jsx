import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import ProductsApi from '../../api/ProductsApi'
import {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setCurrentProduct,
  clearCurrentProduct,
} from '../../../stores/productsSlice'

function ReportProducts() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.products)
  const currentProduct = useSelector((state) => state.products.currentProduct)
  const isEditing = currentProduct !== null

  useEffect(() => {
    const fetchProducts = async () => {
      const { getProducts } = ProductsApi()
      const fetchedProducts = await getProducts()
      dispatch(setProducts(fetchedProducts))
    }

    fetchProducts()
  }, [dispatch])

  const handleEditClick = (product) => {
    dispatch(setCurrentProduct(product))
  }

  const handleDeleteClick = (productUuid) => {
    dispatch(deleteProduct(productUuid))
  }

  const handleSave = () => {
    if (isEditing) {
      dispatch(updateProduct(currentProduct))
    } else {
      dispatch(
        addProduct({ ...currentProduct, productUuid: Date.now().toString() })
      )
    }
    dispatch(clearCurrentProduct())
  }

  const handleCloseDialog = () => {
    dispatch(clearCurrentProduct())
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'fantasyName', headerName: 'Fantasy Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'price', headerName: 'Price', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEditClick(params.row)}>Edit</Button>
          <Button onClick={() => handleDeleteClick(params.row.productUuid)}>
            Delete
          </Button>
        </>
      ),
    },
  ]

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(
            setCurrentProduct({
              productUuid: '',
              category: '',
              fantasyName: '',
              description: '',
              price: 0,
            })
          )
        }}
      >
        Add New Product
      </Button>
      <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid rows={products} columns={columns} pageSize={5} />
      </div>

      <Dialog
        open={isEditing || currentProduct !== null}
        onClose={handleCloseDialog}
      >
        <DialogTitle>
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product UUID"
            type="text"
            fullWidth
            variant="standard"
            value={currentProduct ? currentProduct.productUuid : ''}
            onChange={(e) =>
              dispatch(
                setCurrentProduct({
                  ...currentProduct,
                  productUuid: e.target.value,
                })
              )
            }
          />
          <TextField
            margin="dense"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={currentProduct ? currentProduct.category : ''}
            onChange={(e) =>
              dispatch(
                setCurrentProduct({
                  ...currentProduct,
                  category: e.target.value,
                })
              )
            }
          />
          <TextField
            margin="dense"
            label="Fantasy Name"
            type="text"
            fullWidth
            variant="standard"
            value={currentProduct ? currentProduct.fantasyName : ''}
            onChange={(e) =>
              dispatch(
                setCurrentProduct({
                  ...currentProduct,
                  fantasyName: e.target.value,
                })
              )
            }
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={currentProduct ? currentProduct.description : ''}
            onChange={(e) =>
              dispatch(
                setCurrentProduct({
                  ...currentProduct,
                  description: e.target.value,
                })
              )
            }
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={currentProduct ? currentProduct.price : 0}
            onChange={(e) =>
              dispatch(
                setCurrentProduct({
                  ...currentProduct,
                  price: parseFloat(e.target.value),
                })
              )
            }
          />
          <TextField
            margin="dense"
            label="Available"
            type="checkbox"
            checked={currentProduct ? currentProduct.is_available : false}
            onChange={(e) =>
              dispatch(
                setCurrentProduct({
                  ...currentProduct,
                  is_available: e.target.checked,
                })
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ReportProducts
