import React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import { TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider} from '@mui/material/styles'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setOpenAlert } from '../../../stores/detailCartItemsSlice'

export const CardPayment = ( {name = "Default User" , totalPrice,quantityTot} ) => {
  const open = useSelector((store) => store.detail.openAlert)
  const dispatch = useDispatch()
  const displayName = name
  
  let theme = createTheme({});

  const handleSubmmit = () => {
    dispatch(setOpenAlert(true))
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setOpenAlert(false))
  };

  theme = createTheme(theme, {
    typography: {
      poster: {
        fontSize: 32,
        color: '#D9DCD6',
      },
      fontFamily: [
        'Roboto',
      ]
    },
    palette: {
      white: theme.palette.augmentColor({
        color: {
          main: '#ffffff',
        },
        name: 'white',
      }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
      sx={{
          backgroundColor: '#16425B',
          borderRadius: '4px',
          width: '35%',
          maxHeight: '80%',
          margin: 'auto', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',
          height: '500px', 
          padding: '20px', 
          boxShadow: 3, 
        }}
      >
        <Typography variant="poster" sx={{ textAlign: 'center', padding: '10px', width: '100%', textColor:'white' }}>
          Card Details
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '70%', 
          }}
          noValidate
          autoComplete="off"
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '20px 0', height: '100%' }}>
            <FormControl variant="standard" color="white">
            <InputLabel htmlFor="component-simple" style={{ color: '#D9DCD6' }}>Cardholder Name </InputLabel>
              <Input id="component-simple" defaultValue={displayName.name} style={{ color: '#D9DCD6' }}/>
            </FormControl>
            <FormControl variant="standard" color="white">
              <InputLabel htmlFor="component-simple" style={{ color: '#D9DCD6' }}>Card Number</InputLabel>
              <Input id="component-simple" defaultValue="1234567890-72" style={{ color: '#D9DCD6' }} />
            </FormControl>
            <TextField label="CSV" style={{ color: '#D9DCD6' }} color="white" />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', textAlign:'center',padding: '10px', width: '100%' }}>
         <Typography variant="h6" sx={{ color: '#D9DCD6' }}>Total $: {totalPrice}</Typography>
         <Typography variant="h6" sx={{ color: '#D9DCD6' }}>Total Products: {quantityTot}</Typography>
         </Box>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px', width: '100%' }}>
          <Button variant="contained" sx={{backgroundColor:'#3A7CA5'}} onClick={handleSubmmit}>
            Check Out
          </Button>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{ width: '30%' }}
        >
          <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
            Payment Successful.
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  )
}
