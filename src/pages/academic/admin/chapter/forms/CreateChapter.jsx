import React, { useContext, useEffect } from "react";
import FormPopover from "../../../../../components/formComponent/FormPopover";
import { ChpterContext } from "../listing/AdminChapterTab";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";

const CreateChapter = () => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screen

  const {
    academicYearResponse,
    academicYearError,
    academicYearIsLoading,
    getAcademicYear,
    classResponse,
    classIsLoading,
    classError,
    getClass,
    subnjectResponse,
    subnjectError,
    subnjectIsLoading,
    postChapter,
  } = useContext(ChpterContext);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      class: "",
      academicYear: "",
      subject: "",
    },
  });

  const handleClose = (closePopover) => {
    reset();
    closePopover();
  };

  const onSubmit = (data, closePopover) => {
    console.log("Form Data:", data);
    const chapterObj = {
      name: data.name,
      description: data.description,
      classId: data.class,
      subjectId: data.subject,
      academicYearId: data.academicYear,
    };
    console.log("studentobj", chapterObj);
    postChapter(chapterObj);
    reset();
    closePopover(); // Close the popover
  };

  return (
    <FormPopover buttonName={"Add Chapter"} header={"Create Chapter"}>
      {(closePopover) => (
        <form onSubmit={handleSubmit((data) => onSubmit(data, closePopover))}>
          <Grid container spacing={2}>
            {/* Full Name */}
            <Grid item xs={6}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Chapter Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Chapter Name"
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
                      {academicYearResponse?.data?.data?.map((academicdata) => (
                        <MenuItem value={academicdata._id}>
                          {academicdata.academicYear}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="subject"
                control={control}
                rules={{ required: "Academic Year is required" }}
                render={({ field }) => (
                  <FormControl fullWidth margin="dense">
                    <InputLabel>Subject</InputLabel>
                    <Select
                      {...field}
                      label="Subject"
                      error={!!errors.academicYear}
                    >
                      {subnjectResponse?.data?.data?.map((academicdata) => (
                        <MenuItem value={academicdata._id}>
                          {academicdata.name}
                        </MenuItem>
                      ))}
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
  );
};

export default CreateChapter;
