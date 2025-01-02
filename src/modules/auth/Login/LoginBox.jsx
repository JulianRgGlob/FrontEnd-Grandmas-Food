import { Box } from '@mui/material'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const StyledBox = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
      }}
    >
      <Link href="/forgotPass" variant="body2" sx={{color:'black',textDecorationColor:'black'}}  margin="normal">
        <Typography variant="caption">Forgot password?</Typography>
      </Link>

      <Link href="/register" variant="body2" sx={{color:'black',textDecorationColor:'black'}}>
        <Typography variant="caption" >
          Don't have an account? Sign Up
        </Typography>
      </Link>
    </Box>
  )
}
export default StyledBox
