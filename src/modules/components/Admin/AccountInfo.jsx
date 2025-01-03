import React from 'react'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { useNavigate } from 'react-router-dom'

function AccountInfo() {
  const navigate = useNavigate()
  const admin = localStorage.getItem('admins')
  const adminId = localStorage.getItem('adminLogged')
  console.log(adminId);
  
  const adminLogged = JSON.parse(admin).find((admin) => admin.id === adminId)

  console.log(admin)
  console.log(adminId)
  console.log(adminLogged.name)

  const handleLogout = () => {
    localStorage.removeItem('adminLogged')
    navigate('/admin/verify')
  }
  return (
    <Box sx={{ display: 'flex', flexDirection:'column' ,justifyContent: 'center', mt: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ textAlign: 'center' }}
      >
        Admin Information
      </Typography>
      <Card sx={{ maxWidth: 500, margin: 'auto' , padding:'20px',borderRadius:'15px' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/src/assets/AdminPNG.png"
            alt="green iguana"
            sx={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ textAlign: 'center' }}
            >
              Email : {adminLogged.email}
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ textAlign: 'center' }}
            >
              Role : {adminLogged.role}
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ textAlign: 'center' }}
            >
              Name : {adminLogged.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="container"
            sx={{
              backgroundColor: '#81C3D7',
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default AccountInfo
