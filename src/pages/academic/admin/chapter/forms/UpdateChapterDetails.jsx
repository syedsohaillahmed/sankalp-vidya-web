import React from "react";
import FormPopover from "../../../../../components/formComponent/FormPopover";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";

const UpdateChapterDetails = ({chapterId,  chapterDetails, updateChapterData}) => {

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: {
          name: "",
          description: "",
        },
      });

    useEffect(() => {
        reset({
          name: chapterDetails?.name || "",
          description: chapterDetails?.description || "",
        });
      }, [chapterDetails, reset]);



  const handleClose = (closeFormPopover) => {
    closeFormPopover();
  };




  const onSubmit = (data, closeFormPopover) => {
    const chapterObj = {
      name: data.name,
      description: data.description,
    };
    updateChapterData(chapterId, chapterObj);
    reset();
    closeFormPopover(); // Close the popover
  };


  return (
    <FormPopover buttonName={"Edit Chapter"} header={"Edit Chapter"}>
      {(closeFormPopover) => (
        <form  onSubmit={handleSubmit((data) => onSubmit(data, closeFormPopover))} > 
          <Grid container spacing={2}>
            {/* Full Name */}
            <Grid item xs={6}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Chapter name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Title"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    margin="dense"
                  />
                )}
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={6}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Description"
                    type="tel"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    margin="dense"
                  />
                )}
              />
            </Grid>
          </Grid>
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

export default UpdateChapterDetails;
