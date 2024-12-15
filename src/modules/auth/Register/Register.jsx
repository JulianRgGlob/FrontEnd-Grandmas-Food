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
  const handleClickShowPassword = () => setShowPassword((show) => !show)

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
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
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
        <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
          Register
        </Button>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <Link href="/login" variant="body2">
            <Typography variant="caption">
              Already have an account? Sign In
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default Register
