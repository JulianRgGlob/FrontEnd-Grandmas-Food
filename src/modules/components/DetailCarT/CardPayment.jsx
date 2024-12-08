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

export const CardPayment = ({ name = "Default User" }) => {
  const open = useSelector((store) => store.detail.openAlert)
  const dispatch = useDispatch()
  const displayName = name.name
  let theme = createTheme({});

  const handleSubmmit = () => {
    dispatch(setOpenAlert(true))
    // <Alert severity="success">Payment Successfull.</Alert>
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setOpenAlert(false))
  };

  theme = createTheme(theme, {
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
    <div
      style={{
        backgroundColor: '#1976d2',
        borderRadius: '4px',
        width: '35%',
        marginTop: '20px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems: 'center',

      }}
    >
      <Typography variant="h4" sx={{textAlign:'center',padding:'10px',width:'100%',height:'10%'}}>Card Details</Typography>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column',justifyContent:'space-between',width:'100%',height:'82%' }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',margin:'40px',height:'100%',boxShadow:'3px'}}>
        <FormControl variant="standard" color='white'>
          <InputLabel htmlFor="component-simple">Cardholder Name</InputLabel>
          <Input id="component-simple" defaultValue={displayName} />
        </FormControl>
        <FormControl variant="standard" color='white' >
          <InputLabel htmlFor="component-simple" >Card Number</InputLabel>
          <Input id="component-simple" defaultValue="1234567890-72" />
        </FormControl>
        <TextField
          label="CSV"
          sx={{display:'flex'}}
          color='white'
        />
        </Box>
      </Box>
      <div style={{display:'flex',justifyContent:'center',padding:'10px',width:'100%',height:'8%'}}>
      <Button variant="contained" color='success' onClick={handleSubmmit}>Check Out</Button>
      <Snackbar
        open={open}
        autoHideDuration={4000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ display:'',width: '30%' }}
      >
        <Alert onClose={handleClose}variant='filled' severity="success" sx={{ width: '100%' }}>
          Payment Successful.
        </Alert>
      </Snackbar>
      </div>
    </div>
    </ThemeProvider>
  )
}
