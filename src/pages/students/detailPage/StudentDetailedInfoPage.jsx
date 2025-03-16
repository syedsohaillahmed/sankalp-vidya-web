import React, { useCallback, useEffect, useState } from "react";
import MainCard from "../../../components/cards/MainCard";
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
import { useForm, Controller } from "react-hook-form";

const StudentDetailedInfoPage = ({ studentDetailsResponse }) => {
  const [isEditingDetailedInfo, setIseEditingDetailedInfo] = useState(false);
  const toggleEditDetailednfo = () => {
    setIseEditingDetailedInfo(true);
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      studentID: "",
      classGrade: "",
      academicYear: "",
      fatherName: "",
      motherName: "",
      school: "",
    //   role: "",
    //   dateOfBirth: "", // Add dateOfBirth field
    },
  });

  const handleResetValues = useCallback(
    (responseData) => {
      reset({
        studentID: responseData?.studentId || "",
        classGrade: responseData?.class?.displayName || "",
        academicYear: responseData?.academicYear?.displayName || "",
        fatherName: responseData?.fatherName,
        motherName: responseData?.motherName || "",
        school: responseData?.schoolName || ""

      });
    },
    [studentDetailsResponse, reset]
  );


  console.log("studentdetailresponse", studentDetailsResponse)
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleDIFormCancel = () => {
    setIseEditingDetailedInfo(false);
  };

  useEffect(() => {
      if (studentDetailsResponse?.data?.statuscode === 200) {
        handleResetValues(studentDetailsResponse?.data?.data?.studentDetails);
      }
    }, [
      studentDetailsResponse,
      reset,
    ]);

  return (
    <Box mt={"1.5rem"}>
      <MainCard
        title="Detailed Info"
        secondary={
          <Box mb="20px" display={"flex"} justifySelf={"flex-end"}>
            {!isEditingDetailedInfo && (
              <Button
                color="secondary"
                variant="contained"
                onClick={toggleEditDetailednfo}
              >
                Edit
              </Button>
            )}
            {isEditingDetailedInfo && (
              <Button
                color="secondary"
                variant="contained"
                onClick={handleDIFormCancel}
              >
                Cancel
              </Button>
            )}
          </Box>
        }
      >
        <Box mb="20px">
          <form onSubmit={handleSubmit(()=>{})}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Controller
                name="studentID"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Student ID"
                    disabled={isEditingDetailedInfo}
                    sx={{ gridColumn: "span 1" }}
                    inputProps={{
                      readOnly: !isEditingDetailedInfo,
                    }}
                  />
                )}
              />

              <Controller
                name="classGrade"
                control={control}
                rules={{ required: "Full Name is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Class Grade"
                    error={!!error}
                    disabled={isEditingDetailedInfo}
                    helperText={error ? error.message : null}
                    sx={{ gridColumn: "span 1" }}
                    inputProps={{
                      readOnly: !isEditingDetailedInfo,
                    }}
                  />
                )}
              />
              <Controller
                name="academicYear"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Academic Year"
                    disabled={isEditingDetailedInfo}
                    sx={{ gridColumn: "span 1" }}
                    inputProps={{
                      readOnly: !isEditingDetailedInfo,
                    }}
                  />
                )}
              />
              <Controller
                name="fatherName"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Father Name"
                    error={!!error}
                    helperText={error ? error.message : null}
                    sx={{ gridColumn: "span 1" }}
                    inputProps={{
                      readOnly: !isEditingDetailedInfo,
                    }}
                  />
                )}
              />
              <Controller
                name="motherName"
                control={control}
                rules={{ required: "Contact Number is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Mother Name"
                    error={!!error}
                    disabled={isEditingDetailedInfo}
                    helperText={error ? error.message : null}
                    sx={{ gridColumn: "span 1" }}
                    inputProps={{
                      readOnly: !isEditingDetailedInfo,
                    }}
                  />
                )}
              />
              <Controller
                name="caste"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Caste"
                    sx={{ gridColumn: "span 1" }}
                    inputProps={{
                      readOnly: !isEditingDetailedInfo,
                    }}
                  />
                )}
              />
              <Controller
                name="school"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="School"
                    sx={{ gridColumn: "span 1" }}
                    inputProps={{
                      readOnly: !isEditingDetailedInfo,
                    }}
                  />
                )}
              />
            </Box>
            {isEditingDetailedInfo && (
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Update
                </Button>
              </Box>
            )}
          </form>
        </Box>
      </MainCard>
    </Box>
  );
};

export default StudentDetailedInfoPage;
