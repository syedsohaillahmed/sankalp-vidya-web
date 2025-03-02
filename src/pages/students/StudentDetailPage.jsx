import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import MainCard from "../../components/cards/MainCard";
import axios from "axios";
import {
  getStudentsDetailsUC,
  getUserDetailsByIdUC,
} from "../../api/svUrlConstructs";
import useAxiosDataFunction from "../../hooks/useAxiosDataFunction";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { genderList } from "../../store/constants";

const StudentDetailPage = () => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const accessToken = useSelector((state) => state.data.accessToken);
  const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);
  const toggleEdit = () => {
    setIsEditingBasicInfo(true);
  };
  const [
    studentDetailsResponse,
    studentDetailsError,
    studentDetailsIsLoading,
    fetchStudntDetails,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const getStudentDetails = (id) => {
    fetchStudntDetails({
      axiosInstance: axios,
      method: "get",
      url: getStudentsDetailsUC(id),
      // data:{1234:1234},
      token: accessToken,
    });
  };
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: "",
      userName: "",
      email: "",
      contact: "",
      alternateContactNumber: "",
      gender: "",
      role: "",
      dateOfBirth: "", // Add dateOfBirth field
    },
  });

  const handleResetValues = useCallback(
    (responseData) => {
      reset({
        fullName: responseData?.fullName || "",
        userName: responseData?.userName || "",
        email: responseData?.email || "",
        contact: responseData?.phoneNo,
        alternateContactNumber: responseData?.alternatePhoneNo || "",
        gender: responseData?.gender,
        dateOfBirth: moment(responseData?.dateOfBirth || "").format(
          "YYYY-MM-DD"
        ),
      });
    },
    [studentDetailsResponse, reset]
  );

  const [
    updateStudentDetailsResponse,
    updateStudentDetailsError,
    updateStudentDetailsIsLoading,
    updateStudentDetails,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const updateStudent = (id, data) => {
    updateStudentDetails({
      axiosInstance: axios,
      method: "put",
      url: getUserDetailsByIdUC(id),
      data: data,
      token: accessToken,
    });
  };

  useEffect(() => {
    if (studentDetailsResponse?.data?.statuscode === 200) {
      handleResetValues(studentDetailsResponse?.data?.data?.userDetail);
    }
  }, [
    studentDetailsResponse,
    studentDetailsError,
    studentDetailsIsLoading,
    reset,
  ]);

  useEffect(() => {
    if (id) {
      getStudentDetails(id);
    }
  }, [id]);

  const handleBasicDetailsSubmit = (data) => {
    const updateData = {
      fullName: data.fullName,
      alternatePhoneNo: data.alternateContactNumber,
      gender: data.gender,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
    };
    updateStudent(
      studentDetailsResponse?.data?.data?.userDetail?._id || "",
      updateData
    );
  };

  const handleForCancel = () => {
    setIsEditingBasicInfo(false);
    handleResetValues(studentDetailsResponse?.data?.data?.userDetail);
  };

  useEffect(() => {
    if (updateStudentDetailsResponse?.data?.statuscode === 201) {
      setIsEditingBasicInfo(false);
      handleResetValues(updateStudentDetailsResponse?.data?.data);
    }
  }, [
    updateStudentDetailsResponse,
    updateStudentDetailsError,
    updateStudentDetailsIsLoading,
  ]);

  return (
    <Box m="20px">
      <Header title="Student Detail Page" subtitle={"Manage Student Profile"} />

      <MainCard
        title="Basic Info"
        secondary={
          <Box mb="20px" display={"flex"} justifySelf={"flex-end"}>
            {!isEditingBasicInfo && (
              <Button
                color="secondary"
                variant="contained"
                onClick={toggleEdit}
              >
                Edit
              </Button>
            )}
            {isEditingBasicInfo && (
              <Button
                color="secondary"
                variant="contained"
                onClick={handleForCancel}
              >
                Cancel
              </Button>
            )}
          </Box>
        }
      >
        <Box mb="20px">
          <form onSubmit={handleSubmit(handleBasicDetailsSubmit)}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Controller
                name="fullName"
                control={control}
                rules={{ required: "Full Name is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Full Name"
                    error={!!error}
                    helperText={error ? error.message : null}
                    sx={{ gridColumn: "span 1" }}
                    inputProps={{
                      readOnly: !isEditingBasicInfo,
                    }}
                  />
                )}
              />
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="User Name"
                    disabled={isEditingBasicInfo}
                    sx={{ gridColumn: "span 1" }}
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type="email"
                    label="Email"
                    error={!!error}
                    helperText={error ? error.message : null}
                    sx={{ gridColumn: "span 1" }}
                    inputProps={{
                      readOnly: !isEditingBasicInfo,
                    }}
                  />
                )}
              />
              <Controller
                name="contact"
                control={control}
                rules={{ required: "Contact Number is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Contact Number"
                    error={!!error}
                    disabled={isEditingBasicInfo}
                    helperText={error ? error.message : null}
                    sx={{ gridColumn: "span 1" }}
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              />
              <Controller
                name="alternateContactNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Alternate Contact Number"
                    sx={{ gridColumn: "span 1" }}
                    inputProps={{
                      readOnly: !isEditingBasicInfo,
                    }}
                  />
                )}
              />
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Gender is required" }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl
                    fullWidth
                    variant="filled"
                    sx={{ gridColumn: "span 1" }}
                  >
                    <InputLabel>Gender</InputLabel>
                    <Select
                      {...field}
                      error={!!error}
                      inputProps={{
                        readOnly: !isEditingBasicInfo,
                      }}
                    >
                      {genderList.map((gender) => (
                        <MenuItem key={gender.id} value={gender.name}>
                          {gender.dispalyName}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && (
                      <div style={{ color: "red" }}>{error.message}</div>
                    )}
                  </FormControl>
                )}
              />
              {/* <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Role"
                      disabled={isEditing}
                      sx={{ gridColumn: "span 4" }}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                /> */}
              {/* Date of Birth Field */}
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{ required: "Date of Birth is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Date of Birth"
                    error={!!error}
                    helperText={error ? error.message : null}
                    sx={{ gridColumn: "span 1" }}
                    InputLabelProps={{
                      shrink: true, // Ensure the label doesn't overlap with the value
                    }}
                    inputProps={{
                      readOnly: !isEditingBasicInfo,
                    }}
                  />
                )}
              />
            </Box>
            {isEditingBasicInfo && (
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Update User
                </Button>
              </Box>
            )}
          </form>
        </Box>
      </MainCard>
      <Box mt={"1.5rem"}>
        <MainCard title="Detailed Info" secondary={<Button>cjrc</Button>}>
          id: {id}
        </MainCard>
      </Box>
    </Box>
  );
};

export default StudentDetailPage;
