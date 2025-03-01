import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const ListLoader = () => {
  return (
    <>
            <Box
              spacing={2}
              display={"flex"}
              height={"50vh"}
              justifyContent={"center"}
              alignItems="center"
            >
              <h1>Loading....</h1>
              <CircularProgress size={40} />
            </Box>
          </>
  )
}

export default ListLoader