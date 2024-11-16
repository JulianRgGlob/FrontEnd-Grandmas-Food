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
import { setShowPassword, setErrors } from '../../../stores/authSlice'

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
      localStorage.setItem('user', JSON.stringify({ name, email, passwords }))
      navigate('/login')
      console.log('Data Register:', { email, passwords, name })
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
