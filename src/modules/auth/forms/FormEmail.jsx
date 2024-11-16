import React from 'react'
import { useDispatch } from 'react-redux'

import { FormControl } from '@mui/material'
import TextField from '@mui/material/TextField'
import { setEmail, setErrors } from '../../../stores/authSlice'

const FormEmail = ({ email, errors }) => {

  const dispatch = useDispatch()

  return (
    <FormControl
      fullWidth
      margin="normal"
      variant="outlined"
      error={!!errors.email}
    >
      <TextField
        required
        id="outlined-required"
        label="Email"
        value={email}
        onChange={(e) => {
          dispatch(setEmail(e.target.value))
          dispatch(setErrors({ ...errors, email: '' }))
        }}

        placeholder="user@email.com"
        error={!!errors.email}
        helperText={errors.email}
      />
    </FormControl>
  )
}

export default FormEmail
