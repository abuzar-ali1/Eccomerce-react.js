import { Box, Skeleton } from '@mui/material'
import React from 'react'

const SkeltonProductDetails = () => {
  return (
    <Box className="container d-flex gap-2">
        <Box>
            <Skeleton variant='rectangular' width={400} height={500}/>
        </Box>
        <Box>
        <Skeleton variant='rectangular' width={700} height={60}/>
        <Skeleton className='my-3' variant='rectangular' width={700} height={80}/>
        <Skeleton className='my-3' variant='rectangular' width={700} height={180}/>
        <Skeleton className='my-3' variant='rectangular' width={700} height={100}/>
        </Box>
    </Box>
  )
}

export default SkeltonProductDetails