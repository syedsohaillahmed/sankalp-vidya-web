import React from 'react'
import FormPopover from '../../../components/formComponent/FormPopover'
import { Button } from '@mui/material'

const ADCreateClassForm = () => {
    const handleClose = (closeFormPopover)=>{
closeFormPopover()
    }
  return (
    <FormPopover buttonName={"create Class"} header={"Create Class"} >
        {
            (closeFormPopover)=>(
                <Button onClick={()=> handleClose(closeFormPopover)}>
                    close
                </Button>
            )
        }
    </FormPopover>
  )
}

export default ADCreateClassForm