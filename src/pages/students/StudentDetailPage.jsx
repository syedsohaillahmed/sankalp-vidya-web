import { Box, Button } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import MainCard from '../../components/cards/MainCard'

const StudentDetailPage = () => {
   const {id} = useParams()
  return (
    <Box m="20px">
      <Header title="Student Detail Page" subtitle={"Manage Student Profile"} /> 
      
      <MainCard title="Basic Info" secondary={<Button>cjrc</Button>} >
id: {id}
      </MainCard>

      <MainCard  title="Detailed Info" secondary={<Button>cjrc</Button>} >
id: {id}
      </MainCard>
             
    </Box>
  )
}

export default StudentDetailPage