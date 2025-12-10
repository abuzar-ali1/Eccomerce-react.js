import { Box, Typography } from '@mui/material'
import errImg from "./download.png"

const ErrorPage = () => {
  return (
    <div style={{height:"100vh"}} className='d-flex justify-content-center align-items-center'>
        <Box>
            <Typography className='fw-bold' variant='h3'>Something Went Wrong!</Typography>
            <Typography className='fw-bold' variant='h6'>Page not found!</Typography>
                <img className='img-fluid w-100' src={errImg} alt="" />            
        </Box>
    </div>
  )
}

export default ErrorPage