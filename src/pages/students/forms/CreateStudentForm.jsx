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
import { useCallback, useState } from "react";
import FormPopover from "../../../components/formComponent/FormPopover";
import { StudentContext } from "../Student";
import { useContext } from "react";
import axios from "axios";

const CreateStudentForm = () => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screen
  const { registerStudent } = useContext(StudentContext);

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
      class: "",
      academicYear: "",
    },
  });

  const handleClose = (closePopover) => {
    reset();
    closePopover();
  };

  const onSubmit = (data, closePopover) => {
    const studentObj = {
      roleId: "67aa0f6ddcf922f24c9de891",
      fullName: data.fullName,
      phoneNo: data.phoneNo,
      dateOfBirth: data.dateOfBirth,
      userPassword: data.userPassword,
      gender: data.gender,
      classId: data.class,
      studentId: data.studentId,
      academicYear: data.academicYear,
    };
    registerStudent(studentObj);
    reset();
    closePopover(); // Close the popover
  };
  const [phoneExistsError, setPhoneExistsError] = useState("");


  const checkPhoneNumberExists = useCallback(async (phoneNo) => {
    if(phoneNo?.length>9){
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/user/availablePhone?phoneNo=${phoneNo}`);
        if (response?.data?.data?.exists) {
          setPhoneExistsError("phone number is already taken");
          return false; // Return false to indicate the phone number is already taken
        } else {
          setPhoneExistsError(""); // Clear error message if phone number is available
          return true; // Return true if phone number is available
        }
      } catch (error) {
        setPhoneExistsError("Error checking phone number.");
        return false;
      }
    }
    
  }, []);

  const [studentIdExistsError, setStudentIdExistsError] = useState("");
  const checkStudentidExists = useCallback(async (studentId) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/student/rollnoexists?studentId=${studentId}`);
        if (response?.data?.data?.exists) {
          setStudentIdExistsError("Student Id is already taken");
          return false; 
        } else {
          setStudentIdExistsError(""); 
          return true; 
        }
      } catch (error) {
        setStudentIdExistsError("Error checking phone number.");
        return false;
      }
    
  }, []);

  const {
    academicYearResponse,
    academicYearError,
    academicYearIsLoading,
    getAcademicYear,
    classResponse,
    classIsLoading,
    classError,
    getClass,
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
                      onBlur={() => checkPhoneNumberExists(field.value)}
                      error={!!errors.phoneNo || !!phoneExistsError} // Show error if exists
                      helperText={errors.phoneNo?.message || phoneExistsError}
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
              {/* <Grid item xs={6}>
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
              </Grid> */}

              <Grid item xs={6}>
                <Controller
                  name="class"
                  control={control}
                  rules={{ required: "Class Selection is required" }}
                  render={({ field }) => (
                    <FormControl fullWidth margin="dense">
                      <InputLabel>Class</InputLabel>
                      <Select
                        {...field}
                        label="Class"
                        error={!!errors.academicYear}
                      >
                        {classResponse?.data?.data?.map((classres) => (
                          <MenuItem value={classres._id}>
                            {classres.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                      onBlur={() => checkStudentidExists(field.value)}
                      error={!!errors.studentId || !! studentIdExistsError}
                      helperText={errors.studentId?.message || studentIdExistsError}
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
