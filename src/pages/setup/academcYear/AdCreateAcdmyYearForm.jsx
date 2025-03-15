import React from "react";
import FormPopover from "../../../components/formComponent/FormPopover";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const AdCreateAcdmyYearForm = ({postAcademicYear}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      academicYear: "",
      batchCode: "",
      batchName: "",
      startDate: "",
    },
  });

  const onSubmit = (data, closeFormPopover) => {
    const acadObj = {
      academicYear: data.academicYear,
      batchCode: data.batchCode,
      batchName: data.batchName,
      startDate: data.startDate,
    };

    console.log("check kar", acadObj)
     postAcademicYear(acadObj);
    reset();
    closeFormPopover(); // Close the popover
  };
  const handleClose = (closeFormPopover) => {
    closeFormPopover();
  };

  return (
    <FormPopover
      buttonName={"Create Academic Year"}
      header={"Create Academic Year"}
    >
      {(closeFormPopover) => (
        <form
          onSubmit={handleSubmit((data) => onSubmit(data, closeFormPopover))}
        >
          <Grid container spacing={2}>
            {/* Full Name */}
            <Grid item xs={6}>
              <Controller
                name="academicYear"
                control={control}
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Academic Year Name"
                    error={!!errors.academicYear}
                    helperText={errors.academicYear?.message}
                    margin="dense"
                  />
                )}
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={6}>
              <Controller
                name="batchCode"
                control={control}
                rules={{ required: "Class Grade is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    fullWidth
                    label="Batch Code"
                    error={!!errors.batchCode}
                    helperText={errors.batchCode?.message}
                    margin="dense"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
            <Controller
              name="batchName"
              control={control}
              rules={{ required: "Full name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Batch Name"
                  error={!!errors.batchName}
                  helperText={errors.batchName?.message}
                  margin="dense"
                />
              )}
            />
            </Grid>
          

          <Grid item xs={6}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: "Date of birth is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Start Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.startDate}
                      helperText={errors.startDate?.message}
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

export default AdCreateAcdmyYearForm;
