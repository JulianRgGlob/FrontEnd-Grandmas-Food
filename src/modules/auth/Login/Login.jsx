import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
  setUser,
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
  const location = useLocation()
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
      const users = JSON.parse(localStorage.getItem('users')) || []
      const admins = JSON.parse(localStorage.getItem('admins')) || []

      const loggedUser = users.find((user) => user.email === email)
      const loggedAdmin = admins.find((admin) => admin.email === email)

      if (!loggedUser && !loggedAdmin) {
        dispatch(setErrorMessage('User not found'))
        return
      }

      if (location.pathname === '/admin/verify' && loggedAdmin && loggedAdmin.role === 'admin') {
        let isMatch = passwords == loggedAdmin.password
        if (isMatch) {
          dispatch(
            setUser({
              id: loggedAdmin.id,
              name: loggedAdmin.name,
              email: loggedAdmin.email,
              role: loggedAdmin.role,
            })
          )
          localStorage.setItem('loggedin', loggedAdmin.id)
          navigate('/admin/dashboard') 
          return
        } else {
          dispatch(setErrorMessage('Incorrect admin password'))
          return
        }
      }

      if (location.pathname === '/login' && loggedUser && loggedUser.role === 'user') {
        let isMatch = bcrypt.compareSync(passwords, loggedUser.hash)
        if (isMatch) {
          dispatch(
            setUser({
              id: loggedUser.id,
              name: loggedUser.name,
              email: loggedUser.email,
              role: loggedUser.role,
            })
          )
          const allCarts = JSON.parse(localStorage.getItem('allCarts')) || []
          
          const userCart = allCarts.find((cart) => cart.userId === loggedUser.id)
          dispatch(setCartItems(userCart?.items || []))

          localStorage.setItem('loggedin', loggedUser.id)
          navigate('/')
          return
        }
      }

      dispatch(setErrorMessage('Incorrect Credentials'))
    } else {
      dispatch(setErrorMessage('Invalid form'))
    }
  }

  return (
    <Container sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh', width: '100%',backgroundColor:'#D9DCD6'}} maxWidth={false}>
      <Box sx={{backgroundColor:'#81C3D7', padding: '30px', borderRadius: '10px', paddingTop: '80px', paddingBottom: '80px',boxShadow:'10px 10px 5px grey, -10px -10px 5px lightgrey'}}>
      <Typography variant="h4" component="h1" gutterBottom sx={{textAlign:'center', textShadow:'3px 4px 12px #3A7CA5' }}>
        Sign in
      </Typography>
      <Box
        component="form"
        sx={{ width: '100%', maxWidth: '600px' }}
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
        <Button variant="contained" type="submit" sx={{ marginTop: 2 , backgroundColor:'#3A7CA5', color:'#000000'}}>
          Login
        </Button>
        <StyledBox />
      </Box>
      </Box>
    </Container>
  )
}

export default Login
