import React, { useState } from "react";
import { Box, Button, Popover, TextField, Typography, useMediaQuery } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"; // Import MUI Grid2
import { useForm, Controller } from "react-hook-form";

const PopoverForm = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screen

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { fullName: "", email: "", age: "", phone: "" },
  });

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    reset();
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    handleClose();
  };

  return (
    <Box textAlign="center" mt={5}>
      <Button variant="contained" onClick={handleOpen}>
        Open Form
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Box p={3} sx={{ width: isMobile ? 300 : 400 }}> {/* Responsive width */}
          <Typography variant="h6" gutterBottom>
            User Details
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              {/* Full Name & Email - Two fields in one row */}
              <Grid2 xs={12} sm={6}>
                <Controller
                  name="fullName"
                  control={control}
                  rules={{ required: "Full name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Full Name"
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                      margin="dense"
                    />
                  )}
                />
              </Grid2>

              <Grid2 xs={12} sm={6}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      margin="dense"
                    />
                  )}
                />
              </Grid2>

              {/* Age & Phone - Two fields in one row */}
              <Grid2 xs={12} sm={6}>
                <Controller
                  name="age"
                  control={control}
                  rules={{
                    required: "Age is required",
                    min: { value: 1, message: "Age must be a positive number" },
                    max: { value: 120, message: "Enter a valid age" },
                    pattern: { value: /^[0-9]+$/, message: "Age must be a number" },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Age"
                      type="number"
                      error={!!errors.age}
                      helperText={errors.age?.message}
                      margin="dense"
                    />
                  )}
                />
              </Grid2>

              <Grid2 xs={12} sm={6}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit phone number",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Phone Number"
                      type="tel"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      margin="dense"
                    />
                  )}
                />
              </Grid2>
            </Grid2>

            {/* Buttons */}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Popover>
    </Box>
  );
};

export default PopoverForm;
