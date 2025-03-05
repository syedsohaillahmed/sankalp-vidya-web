import React, { useEffect } from "react";
import FormPopover from "../../../../../components/formComponent/FormPopover";
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
import { useContext } from "react";
import { ChpterContext } from "../listing/class9/AdminClass9ChapterTab";
const UpdateChapterVideo = ({chapterId, putVideoData, videoDetails }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "qwq",
      description: "",
      videoUrl: "",
      videoEmbededlink: "",
      videoSource: "",
      videoAuthor: "",
    },
  });


   

  useEffect(() => {
    reset({
      name: videoDetails?.title || "",
      description: videoDetails?.description || "",
      videoUrl: videoDetails?.videoUrl || "",
      videoEmbededlink: videoDetails?.videoEmbededLink || "",
      videoSource: videoDetails?.videoSource || "",
      videoAuthor: videoDetails?.author || "",
    });
  }, [videoDetails, reset]); // Ensure reset is called when the component mounts

  const handleClose = (closePopover) => {
    reset();
    closePopover();
  };

  const onSubmit = (data, closePopover) => {
    console.log("Form Data:", data);
    const videoObj = {
      title: data.name,
      description: data.description,
      videoEmbededLink: data.videoEmbededlink,
      videoUrl: data.videoUrl,
      videoSource: data.videoSource,
      author: data.videoAuthor,
    };
    putVideoData(chapterId, videoObj);
    reset();
    closePopover(); // Close the popover
  };

  return (
    <>
      <FormPopover buttonName={"Update Video"} header={"Update Video"}>
        {(closePopover) => (
          <form onSubmit={handleSubmit((data) => onSubmit(data, closePopover))}>
            <Grid container spacing={2}>
              {/* Full Name */}
              <Grid item xs={6}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Title"
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
                  name="videoUrl"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Video Url"
                      type="tel"
                      error={!!errors.videoUrl}
                      helperText={errors.videoUrl?.message}
                      margin="dense"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="videoEmbededlink"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Video Embeded Link"
                      type="tel"
                      error={!!errors.videoEmbededlink}
                      helperText={errors.videoEmbededlink?.message}
                      margin="dense"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="videoSource"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Video Source"
                      type="tel"
                      error={!!errors.videoSource}
                      helperText={errors.videoSource?.message}
                      margin="dense"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="videoAuthor"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Video Author"
                      type="tel"
                      error={!!errors.videoAuthor}
                      helperText={errors.videoAuthor?.message}
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

export default UpdateChapterVideo;
