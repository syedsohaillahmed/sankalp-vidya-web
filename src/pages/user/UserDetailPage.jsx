import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { getUserDetailsByIdUC } from "../../api/svUrlConstructs";
import { useForm, Controller } from "react-hook-form";
import { genderList } from "../../store/constants";
import moment from "moment";
import axios from "axios";
import useAxiosDataFunction from "../../hooks/useAxiosDataFunction";
import ListLoader from "../../components/loader/ListLoader";

const UserDetailPage = () => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const accessToken = useSelector((state) => state.data.accessToken);

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(true);
  };

  const { fetchData, response, error, loading } = useFetch();
  const {
    fetchData: updateUserDetails,
    loading: updateUserloading2,
    error: updateUsererror2,
    response: updateUserresponse2,
  } = useFetch();

  const [
    uDetailsResponse,
    uDetailsError,
    uDetailsIsLoading,
    fetchUserDetails,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const getJobApplication = (id) => {
    fetchUserDetails({
      axiosInstance: axios,
      method: "get",
      url: getUserDetailsByIdUC(id),
      // data:{1234:1234},
      token: accessToken,
    });
  };

  const [
    upUDetailsResponse,
    upUDetailsError,
    upUDetailsIsLoading,
    upUserDetails,
  ] = useAxiosDataFunction();

  // up job Application List
  const upUDetails = (id, data) => {
    upUserDetails({
      axiosInstance: axios,
      method: "put",
      url: getUserDetailsByIdUC(id),
      data:data,
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

  useEffect(() => {
    if (id && accessToken) {
      fetchData(getUserDetailsByIdUC(id), "GET", null, accessToken);
    }
    // getJobApplication(id);
  }, [id, accessToken]);

  useEffect(() => {
    if (response?.statuscode === 200) {
      reset({
        fullName: response.data.userDetails.fullName,
        userName: response.data.userDetails.userName || "",
        email: response.data.userDetails.email || "",
        contact: response.data.userDetails.phoneNo,
        alternateContactNumber:
          response.data.userDetails.alternatePhoneNo || "",
        gender: response.data.userDetails.gender,
        role: response.data.roleDisplayName,
        dateOfBirth: moment(response.data.userDetails.dateOfBirth).format(
          "YYYY-MM-DD"
        ),
      });
    }
  }, [response, error, loading, reset]);

  useEffect(() => {
    if (upUDetailsResponse?.data?.statuscode === 201) {
      reset({
        fullName: upUDetailsResponse.data.data.fullName,
        userName: upUDetailsResponse.data.data.userName || "",
        email: upUDetailsResponse.data.data.email || "",
        contact: upUDetailsResponse.data.data.phoneNo,
        alternateContactNumber: upUDetailsResponse.data.data.alternatePhoneNo || "",
        gender: upUDetailsResponse.data.data.gender,
        dateOfBirth: moment(upUDetailsResponse.data.data.dateOfBirth).format(
          "YYYY-MM-DD"
        ),
      });
    }
  }, [upUDetailsResponse]);

  const handleForCancel = () => {
    setIsEditing(false);
    reset({
      fullName: response.data.userDetails.fullName,
      userName: response.data.userDetails.userName || "",
      email: response.data.userDetails.email || "",
      contact: response.data.userDetails.phoneNo,
      alternateContactNumber: response.data.userDetails.alternatePhoneNo || "",
      gender: response.data.userDetails.gender,
      role: response.data.roleDisplayName,
      dateOfBirth: moment(response.data.userDetails.dateOfBirth).format(
        "YYYY-MM-DD"
      ), //response.data.userDetails.dateOfBirth || "", // Set dateOfBirth from response
    });
  };

  const onSubmit = (data) => {
    const updateData = {
      fullName: data.fullName,
      alternatePhoneNo: data.alternateContactNumber,
      gender: data.gender,
      email: data.email,
      dateOfBirth: data.dateOfBirth, // Include dateOfBirth in the submission
    };
    upUDetails(id, updateData)
    // updateUserDetails(getUserDetailsByIdUC(id), "put", updateData, accessToken);
    handleForCancel();
    // Handle form submission logic here
  };

  return (
    <Box m="20px">
      <Header title="User Detail Page" subtitle={"Manage User Profile Page"} />
      {loading ||
        upUDetailsIsLoading && (
          <ListLoader />
        )}
      {!loading && error && <div> Error While Fetching Data</div>}
      {!loading && !error && !upUDetailsIsLoading && response && (
        <Box>
          <Box mb="20px" display={"flex"} justifySelf={"flex-end"}>
            {!isEditing && (
              <Button
                color="secondary"
                variant="contained"
                onClick={toggleEdit}
              >
                Edit
              </Button>
            )}
            {isEditing && (
              <Button
                color="secondary"
                variant="contained"
                onClick={handleForCancel}
              >
                Cancel
              </Button>
            )}
          </Box>
          <Box mb="20px">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                      sx={{ gridColumn: "span 2" }}
                      inputProps={{
                        readOnly: !isEditing,
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
                      disabled={isEditing}
                      sx={{ gridColumn: "span 2" }}
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
                      sx={{ gridColumn: "span 4" }}
                      inputProps={{
                        readOnly: !isEditing,
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
                      disabled={isEditing}
                      helperText={error ? error.message : null}
                      sx={{ gridColumn: "span 4" }}
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
                      sx={{ gridColumn: "span 4" }}
                      inputProps={{
                        readOnly: !isEditing,
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
                      sx={{ gridColumn: "span 4" }}
                    >
                      <InputLabel>Gender</InputLabel>
                      <Select
                        {...field}
                        error={!!error}
                        inputProps={{
                          readOnly: !isEditing,
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
                <Controller
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
                />
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
                      sx={{ gridColumn: "span 4" }}
                      InputLabelProps={{
                        shrink: true, // Ensure the label doesn't overlap with the value
                      }}
                      inputProps={{
                        readOnly: !isEditing,
                      }}
                    />
                  )}
                />
              </Box>
              {isEditing && (
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Update User
                  </Button>
                </Box>
              )}
            </form>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserDetailPage;
