import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import validationForm from '../../../utils/validation/validation'
import FormEmail from '../forms/FormEmail'
import { FormPassword } from '../forms/FormPassword'
import { FormName } from '../forms/FormName'
import { useDispatch, useSelector } from 'react-redux'
import {
  setShowPassword,
  setErrors,
  setHashPassword,
} from '../../../stores/authSlice'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

const Register = () => {
  const dispatch = useDispatch()
  const email = useSelector((state) => state.auth.email)
  const passwords = useSelector((state) => state.auth.passwords)
  const showPassword = useSelector((state) => state.auth.showPassword)
  
  const errors = useSelector((state) => state.auth.errors)
  const name = useSelector((state) => state.auth.nickName)
  const navigate = useNavigate()
  const handleClickShowPassword = () => dispatch(setShowPassword())

  const handleSubmit = (event) => {
    event.preventDefault()
    const { errors: validationErrors, isValid } = validationForm(
      name,
      email,
      passwords,
      true
    )

    dispatch(setErrors(validationErrors))

    if (isValid) {
      const hash = bcrypt.hashSync(passwords, 10)
      const id = uuidv4()
      const users = JSON.parse(localStorage.getItem('users')) || []

      dispatch(setHashPassword(hash))
      const existUser = users.find((user) => user.email === email)
      if (existUser) {
        dispatch(setErrors({ email: 'Email already registered' }))
        return
      }
      const newUser = { id, name, email, hash , role: 'user'}
      users.push(newUser)

      localStorage.setItem('users', JSON.stringify(users))
      console.log('Data Register:', newUser)
      navigate('/login')
    }
  }

  return (
    <Container sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh', width: '100%',backgroundColor:'#D9DCD6'}} maxWidth={false}>
     <Box sx={{backgroundColor:'#81C3D7', padding: '30px', borderRadius: '10px', paddingTop: '80px', paddingBottom: '80px',boxShadow:'10px 10px 5px grey, -10px -10px 5px lightgrey'}}>
      <Typography variant="h4" component="h1" gutterBottom sx={{textAlign:'center', textShadow:'3px 4px 12px #3A7CA5' }}>
        Sign Up
      </Typography>
      <Box
        component="form"
        sx={{ width: 500, maxWidth: '100%' }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormName errors={errors} name={name} />
        <FormEmail email={email} errors={errors} />
        <FormPassword
          errors={errors}
          showPassword={showPassword}
          passwords={passwords}
          handleClickShowPassword={handleClickShowPassword}
        />
        <Button variant="contained" type="submit" sx={{ marginTop: 2 , backgroundColor:'#3A7CA5', color:'#000000'}}>
          Register
        </Button>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <Link href="/login" variant="body2" sx={{color:'black',textDecorationColor:'black'}}>
            <Typography variant="caption">
              Already have an account? Sign In
            </Typography>
          </Link>
        </Box>
      </Box>
      </Box>
    </Container>
  )
}

export default Register
