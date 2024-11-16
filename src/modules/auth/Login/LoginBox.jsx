import { Box } from '@mui/material'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const StyledBox = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Link href="/forgotPass" variant="body2" margin="normal">
        <Typography variant="caption">Forgot password?</Typography>
      </Link>

      <Link href="/register" variant="body2">
        <Typography variant="caption">
          Don't have an account? Sign Up
        </Typography>
      </Link>
    </Box>
  )
}
export default StyledBox
