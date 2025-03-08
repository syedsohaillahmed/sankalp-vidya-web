import React from "react";
import FormPopover from "../../../components/formComponent/FormPopover";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const AdCreateSubjectform = ({ PostSubject }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      board: "",
    },
  });

  const onSubmit = (data, closeFormPopover) => {
    const classObj = {
      name: data.name,
      board: data.board,
    };
    PostSubject(classObj);
    reset();
    closeFormPopover(); // Close the popover
  };
  const handleClose = (closeFormPopover) => {
    closeFormPopover();
  };

  return (
    <FormPopover buttonName={"Add Subject"} header={"Add Subject"}>
      {(closeFormPopover) => (
        <form
          onSubmit={handleSubmit((data) => onSubmit(data, closeFormPopover))}
        >
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
                name="board"
                control={control}
                rules={{ required: "Class Grade is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Board"
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

export default AdCreateSubjectform;
