import React from "react";
import FormPopover from "../../../components/formComponent/FormPopover";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const ADCreateClassForm = ({PostClass}) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: {
          name: "",
          classGrade: "",
        },
      });


      const onSubmit = (data, closeFormPopover) => {
        const classObj = {
            name: data.name,
            classGrade: data.classGrade,
        };
        PostClass(classObj);
        reset();
        closeFormPopover(); // Close the popover
      };
  const handleClose = (closeFormPopover) => {
    closeFormPopover();
  };
  return (
    <FormPopover buttonName={"create Class"} header={"Create Class"}>
      {(closeFormPopover) => (
       <form onSubmit={handleSubmit((data) => onSubmit(data, closeFormPopover))}>
       <Grid container spacing={2}>
         {/* Full Name */}
         <Grid item xs={6}>
           <Controller
             name="name"
             control={control}
             rules={{ required: "Full name is required" }}
             render={({ field }) => (
               <TextField
                 {...field}
                 fullWidth
                 label="Name"
                 error={!!errors.fullName}
                 helperText={errors.fullName?.message}
                 margin="dense"
               />
             )}
           />
         </Grid>

         {/* Phone Number */}
         <Grid item xs={6}>
           <Controller
             name="classGrade"
             control={control}
             rules={{ required: "Class Grade is required" }}
             render={({ field }) => (
               <TextField
                 {...field}
                 fullWidth
                 label="Class Grade"
                 error={!!errors.fullName}
                 helperText={errors.fullName?.message}
                 margin="dense"
               />
             )}
           />
         </Grid>

       </Grid>

       {/* Buttons */}
       <Box display="flex" justifyContent="space-between" mt={2}>
         <Button
           variant="outlined"
           onClick={() => handleClose(closeFormPopover)}
         >
           Cancel
         </Button>
         <Button type="submit" variant="contained">
           Submit
         </Button>
       </Box>
     </form>
      )}
    </FormPopover>
  );
};

export default ADCreateClassForm;
