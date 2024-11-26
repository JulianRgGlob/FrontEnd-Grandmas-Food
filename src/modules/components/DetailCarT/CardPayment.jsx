import React from 'react'
import Box from '@mui/material/Box'
import FilledInput from '@mui/material/FilledInput'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { TextField } from '@mui/material'
export const CardPayment = (name) => {
  return (
    <div
      style={{
        backgroundColor: 'gray',
        borderRadius: '4px',
        width: '35%',
        height: '230px',
      }}
    >
      Card Details
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1 } }}
        noValidate
        autoComplete="off"
      >
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Cardholder Name</InputLabel>
          <Input id="component-simple" defaultValue={name} />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Card Number</InputLabel>
          <Input id="component-simple" label="1234567890-72" />
        </FormControl>
        <TextField
          label="Valid Thru"
        //   {...props}
        //   {...resolveProps(context, props)}
        //   inputProps={{ ...inputProps, ...getExpInputProps(props), size: 9 }}
        />
      </Box>
    </div>
  )
}
