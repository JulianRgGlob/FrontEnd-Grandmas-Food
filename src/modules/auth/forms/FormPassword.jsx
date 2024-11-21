import React from 'react'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useDispatch } from 'react-redux'
import { setPassword, setErrors} from '../../../stores/authSlice'

export const FormPassword = ({errors,showPassword,passwords,handleClickShowPassword}) => {

  const dispatch = useDispatch()
  
  return (
    <FormControl
      fullWidth
      margin="normal"
      variant="outlined"
      error={!!errors.password}
    >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        value={passwords}
        onChange={(e) => {
          dispatch(setPassword(e.target.value))
          dispatch(setErrors({ ...errors, password: '' }))
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {errors.passwords && (
        <div style={{ color: 'red', marginTop: '5px' }}>{errors.password}</div>
      )}
    </FormControl>
  )
}
