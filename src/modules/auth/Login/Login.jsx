import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import validationForm from '../../../utils/validation/validation'
import { useDispatch, useSelector } from 'react-redux'
import FormEmail from '../forms/FormEmail'
import { FormPassword } from '../forms/FormPassword'
import StyledBox from './LoginBox'
import {
  setShowPassword,
  setErrors,
  setErrorMessage,
  clearErrors,
  setUser
} from '../../../stores/authSlice'
import bcrypt from 'bcryptjs'
import { setCartItems } from '../../../stores/cartSlice'

const Login = () => {
  
  const dispatch = useDispatch()
  const email = useSelector((state) => state.auth.email)
  const passwords = useSelector((state) => state.auth.passwords)
  const showPassword = useSelector((state) => state.auth.showPassword)
  const errors = useSelector((state) => state.auth.errors)
  const errorMessage = useSelector((state) => state.auth.errorMessage)
  const navigate = useNavigate()
  const handleClickShowPassword = () => dispatch(setShowPassword())
  
  const handleSubmit = (event) => {

    event.preventDefault()
    dispatch(clearErrors())
    const { errors: validationErrors, isValid } = validationForm(
      null,
      email,
      passwords
    )
    dispatch(setErrors(validationErrors))
    
    if (isValid) {

      const users = JSON.parse(localStorage.getItem('users'))
      const loggedUser = users.find((user) => user.email === email)
      const isMatch = bcrypt.compareSync(passwords, loggedUser.hash)

      if (email === loggedUser.email && isMatch) {

        dispatch(setUser({id: loggedUser.id, name: loggedUser.name, email: loggedUser.email}))
        
        const cartKey = `cart-${loggedUser.id}`
        const existingCart = JSON.parse(localStorage.getItem(cartKey)) || []
        dispatch(setCartItems(existingCart))

        localStorage.setItem('loggedin', loggedUser.id)
        
        navigate('/')

      } else {
        dispatch(setErrorMessage('Incorrect Credentials'))
      }
    } else {
      dispatch(setErrorMessage('User not found'))
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Sign in
      </Typography>
      <Box
        component="form"
        sx={{ width: 500, maxWidth: '100%' }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormEmail email={email} errors={errors} />
        <FormPassword
          errors={errors}
          showPassword={showPassword}
          passwords={passwords}
          handleClickShowPassword={handleClickShowPassword}
        />
        {errorMessage && (
          <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div>
        )}
        <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
          Login
        </Button>
        <StyledBox/>
      </Box>
    </Container>
  )
}

export default Login
