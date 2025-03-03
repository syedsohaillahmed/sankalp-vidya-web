import {
  Box,
  Button,
  Grid,
  TextField,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import FormPopover from "../../../components/formComponent/FormPopover";
import { StudentContext } from "../Student";
import { useContext } from "react";

const CreateStudentForm = () => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screen
  const { registerStudent } = useContext(StudentContext)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phoneNo: "",
      dateOfBirth: "",
      userPassword: "",
      avatar: "",
      gender: "",
      studentId: "",
      academicYear: "",
    },
  });

  const handleClose = (closePopover) => {
    reset();
    closePopover();
  };

  const onSubmit = (data, closePopover) => {
    console.log("Form Data:", data);
    const studentObj = {
        roleId: "67aa0f6ddcf922f24c9de891",
        fullName: data.fullName,
        phoneNo: data.phoneNo,
        dateOfBirth: data.dateOfBirth,
        userPassword: data.userPassword,
        gender: data.gender,
        studentId: data.studentId,
        academicYear: data.academicYear

    }
    console.log("studentobj", studentObj)
    registerStudent(studentObj)
    reset();
    closePopover(); // Close the popover
  };

  const {
    academicYearResponse,
    academicYearError,
    academicYearIsLoading,
    getAcademicYear,
  } = useContext(StudentContext);

  if (academicYearIsLoading) return <div>Loading...</div>;
  if (academicYearError) return <div>Error: {academicYearError.message}</div>;

  return (
    <>
      <FormPopover buttonName={"Create Student"} header={"Create Student"}>
        {(closePopover) => (
          <form onSubmit={handleSubmit((data) => onSubmit(data, closePopover))}>
            <Grid container spacing={2}>
              {/* Full Name */}
              <Grid item xs={6}>
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
              </Grid>

              {/* Phone Number */}
              <Grid item xs={6}>
                <Controller
                  name="phoneNo"
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
                      error={!!errors.phoneNo}
                      helperText={errors.phoneNo?.message}
                      margin="dense"
                    />
                  )}
                />
              </Grid>

              {/* Date of Birth */}
              <Grid item xs={6}>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  rules={{ required: "Date of birth is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Date of Birth"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.dateOfBirth}
                      helperText={errors.dateOfBirth?.message}
                      margin="dense"
                    />
                  )}
                />
              </Grid>

              {/* User Password */}
              <Grid item xs={6}>
                <Controller
                  name="userPassword"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Password"
                      type="password"
                      error={!!errors.userPassword}
                      helperText={errors.userPassword?.message}
                      margin="dense"
                    />
                  )}
                />
              </Grid>

              {/* Avatar (URL) */}
              <Grid item xs={6}>
                <Controller
                  name="avatar"
                  control={control}
                  //   rules={{ required: "Avatar URL is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Avatar URL"
                      error={!!errors.avatar}
                      helperText={errors.avatar?.message}
                      margin="dense"
                    />
                  )}
                />
              </Grid>

              {/* Gender */}
              <Grid item xs={6}>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <FormControl fullWidth margin="dense">
                      <InputLabel>Gender</InputLabel>
                      <Select {...field} label="Gender" error={!!errors.gender}>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Student ID */}
              <Grid item xs={6}>
                <Controller
                  name="studentId"
                  control={control}
                  rules={{ required: "Student ID is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Student ID"
                      error={!!errors.studentId}
                      helperText={errors.studentId?.message}
                      margin="dense"
                    />
                  )}
                />
              </Grid>

              {/* Academic Year */}
              <Grid item xs={6}>
                <Controller
                  name="academicYear"
                  control={control}
                  rules={{ required: "Academic Year is required" }}
                  render={({ field }) => (
                    <FormControl fullWidth margin="dense">
                      <InputLabel>Academic Year</InputLabel>
                      <Select
                        {...field}
                        label="Academic Year"
                        error={!!errors.academicYear}
                      >
                        {academicYearResponse?.data?.data?.map(
                          (academicdata) => (
                            <MenuItem value={academicdata._id}>
                              {academicdata.academicYear}
                            </MenuItem>
                          )
                        )}

                        {/* <MenuItem value="2024">2024</MenuItem>
                        <MenuItem value="2025">2025</MenuItem> */}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>

            {/* Buttons */}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="outlined"
                onClick={() => handleClose(closePopover)}
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
    </>
  );
};

export default CreateStudentForm;
