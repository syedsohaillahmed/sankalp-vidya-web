import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { getUserDetailsByIdUC } from "../../api/svUrlConstructs";
import { useForm, Controller } from "react-hook-form";

const UserDetailPage = () => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const accessToken = useSelector((state) => state.data.accessToken);

  const { fetchData, response, error, loading } = useFetch();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: "",
      userName: "",
      email: "",
      contact: "",
      alternateContactNumber: "",
      gender: "",
      role: "",
    },
  });

  useEffect(() => {
    fetchData(getUserDetailsByIdUC(id), "GET", null, accessToken);
  }, [id, accessToken]);

  useEffect(() => {
    if (response?.statuscode === 200) {
      reset({
        fullName: response.data.fullName,
        userName: response.data.userName || "",
        email: response.data.email || "",
        contact: response.data.phoneNo,
        alternateContactNumber: response.data.alternateContactNumber || "",
        gender: response.data.gender,
        role: response.data.role,
      });
    }
  }, [response, error, loading, reset]);

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    // Handle form submission logic here
  };

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <Box m="20px">
      <Header title="User Detail Page" />
      {loading && <h1>Loading....</h1>}
      {!loading && error && <div> Error While Fetching Data</div>}
      {!loading && !error && response && (
        <Box>
          <Box m="20px" display={"flex"} justifySelf={"flex-end"}>
            <Button color="secondary" variant="contained" onClick={toggleEdit}>Edit</Button>
          </Box>
          <Box m="20px">
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
                      sx={{ gridColumn: "span 2" }}
                      inputProps={{
                        readOnly: !isEditing,
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
                      helperText={error ? error.message : null}
                      sx={{ gridColumn: "span 4" }}
                      inputProps={{
                        readOnly: !isEditing,
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
                    <TextField
                      {...field}
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Gender"
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
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Role"
                      sx={{ gridColumn: "span 4" }}
                      inputProps={{
                        readOnly: !isEditing,
                      }}
                    />
                  )}
                />
              </Box>
              {isEditing && 
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Update User
                </Button>
              </Box>
              }
            </form>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserDetailPage;
