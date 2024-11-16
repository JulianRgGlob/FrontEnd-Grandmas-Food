import React from 'react'
import { setNickName, setErrors } from '../../../stores/authSlice'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import { useDispatch } from 'react-redux'

export const FormName = ({errors,name}) => {
    const dispatch = useDispatch()
    return (
    <FormControl
      fullWidth
      margin="normal"
      variant="outlined"
      error={!!errors.name}
    >
      <TextField
        required
        label="Name"
        value={name}
        onChange={(e) => {
          dispatch(setNickName(e.target.value))
          dispatch(setErrors({ ...errors, name: '' }))
        }}
        placeholder="Jhon Doe"
        error={!!errors.name}
        helperText={errors.name}
      />
    </FormControl>
  )
}
