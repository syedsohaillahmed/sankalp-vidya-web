import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
  Link,
  Grid,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@mui/material";
import Header from "../../../../../components/Header";
import MainCard from "../../../../../components/cards/MainCard";
import { styled } from "@mui/system";
import UpdateChapterVideo from "../forms/UpdateChapterVideo";
import { useParams } from "react-router-dom";
import {
  getChapterDetailsUC,
  uploadVideoLinkUC,
} from "../../../../../api/svUrlConstructs";
import { useSelector } from "react-redux";
import axios from "axios";
import useAxiosDataFunction from "../../../../../hooks/useAxiosDataFunction";
import UpdateChapterDetails from "../forms/UpdateChapterDetails";

// Mock data for the Chapter model
const mockChapter = {
  name: "Introduction to Algebra",
  description:
    "This chapter covers the basics of algebraic expressions and equations.",
  subject: {
    displayName: "Mathematics",
    board: "CBSE",
  },
  class: {
    name: "Class 10",
    classGrade: "X",
  },
  academicYear: {
    displayName: "2023-2024",
    batchName: "Batch A",
  },
  notes: [
    {
      file: "algebra_notes.pdf",
      fileName: "Algebra Notes",
      uploadDate: "2023-10-01",
      uploadedBy: "John Doe",
      author: "Jane Smith",
      active: true,
    },
    {
      file: "algebra_exercises.pdf",
      fileName: "Algebra Exercises",
      uploadDate: "2023-10-05",
      uploadedBy: "Jane Smith",
      author: "John Doe",
      active: true,
    },
  ],
  videos: {
    videoEmbededLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Introduction to Algebra",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "This video explains the basics of algebra.",
    videoSource: "YouTube",
    author: "John Doe",
    uploadDate: "2023-10-01",
    videoUploadedToSourceDate: "2023-09-28",
  },
  publishedDate: "2023-10-01",
  active: true,
};

// Styled components for custom design
const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "15px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const AdminChapterDetailPage = () => {
  const { id } = useParams();
  const accessToken = useSelector((state) => state?.data?.accessToken);
  const [chapterDetails, setchapterDetails] = useState({});

  const [
    chapterDetailResponse,
    chapterDetailError,
    chapterDetailIsLoading,
    fetchChapterDetail,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const getChapterDetail = (id) => {
    fetchChapterDetail({
      axiosInstance: axios,
      method: "get",
      url: getChapterDetailsUC(id),
      token: accessToken,
    });
  };

  

  useEffect(() => {
    if (id) {
      getChapterDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (chapterDetailResponse?.data?.statuscode === 200) {
      setchapterDetails(chapterDetailResponse?.data?.data);
    }
  }, [chapterDetailResponse]);

  const [
    updateVideoResponse,
    updateVideoError,
    updateVideoIsLoading,
    updateVideo,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const putVideoData = (id, data) => {
    updateVideo({
      axiosInstance: axios,
      method: "put",
      url: uploadVideoLinkUC(id),
      data: data,
      token: accessToken,
    });
  };

  const [
    updateChapterResponse,
    updateChapterError,
    updateChapterIsLoading,
    updateChapter,
  ] = useAxiosDataFunction();

  // fetch job Application List
  const updateChapterData = (id, data) => {
    updateChapter({
      axiosInstance: axios,
      method: "put",
      url: getChapterDetailsUC(id),
      data: data,
      token: accessToken,
    });
  };

  useEffect(() => {
    if (updateVideoResponse?.data?.statuscode === 200) {
      getChapterDetail(id);
    }
  }, [updateVideoResponse]);

  console.log("chapterDetails", chapterDetails)

  return (
    <Box sx={{ padding: "1rem" }}>
      <Header title="Chapter" />
      {/* Basic Details Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} >
          <MainCard
            title={"Basic Details"}
            secondary={
              <>
                <UpdateChapterDetails chapterId={id} chapterDetails={chapterDetails} updateChapterData={updateChapterData} />
              </>
            }
          >
            {Object.keys(chapterDetails).length !== 0 ? (
              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1" fontWeight="bold">
                    Name:
                  </Typography>
                  <Typography variant="body1">
                    {chapterDetails?.name}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1" fontWeight="bold">
                    Description:
                  </Typography>
                  <Typography variant="body1">
                    {chapterDetails?.description}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1" fontWeight="bold">
                    Subject:
                  </Typography>
                  <Typography variant="body1">
                    {chapterDetails?.subject?.displayName} (
                    {chapterDetails?.subject?.board})
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1" fontWeight="bold">
                    Class:
                  </Typography>
                  <Typography variant="body1">
                    {chapterDetails?.class?.name} (Grade{" "}
                    {chapterDetails?.class?.classGrade})
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1" fontWeight="bold">
                    Academic Year:
                  </Typography>
                  <Typography variant="body1">
                    {chapterDetails?.academicYear?.displayName} (
                    {chapterDetails?.academicYear?.batchName})
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1" fontWeight="bold">
                    Published Date:
                  </Typography>
                  <Typography variant="body1">
                    {new Date(
                      chapterDetails?.publishedDate
                    ).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body1" fontWeight="bold">
                    Status:
                  </Typography>
                  <Chip
                    label={chapterDetails?.active ? "Active" : "Inactive"}
                    color={chapterDetails?.active ? "success" : "error"}
                  />
                </Box>
              </Box>
            ) : (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                Something went wrong
              </Box>
            )}
          </MainCard>
        </Grid>
        <Grid item xs={6} sm={6}>
          <MainCard title={"Notes"}>
            <List>
              {mockChapter.notes.map((note, index) => (
                <ListItem
                  key={index}
                  sx={{
                    mb: 2,
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                    {index + 1}
                  </Avatar>
                  <ListItemText
                    primary={note.fileName}
                    secondary={
                      <>
                        <Typography variant="body2">
                          <strong>Author:</strong> {note.author}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Uploaded By:</strong> {note.uploadedBy}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Upload Date:</strong>{" "}
                          {new Date(note.uploadDate).toLocaleDateString()}
                        </Typography>
                      </>
                    }
                  />
                  <Chip
                    label="Download"
                    component="a"
                    href={note.file}
                    download
                    clickable
                    sx={{ ml: 2 }}
                  />
                </ListItem>
              ))}
            </List>
          </MainCard>
        </Grid>
      </Grid>

      {/* Video Section */}
      
<Grid item xs={12} mt={"1rem"}>
        <MainCard
          title={"Video Section"}
          secondary={
            <>
              <UpdateChapterVideo
                putVideoData={putVideoData}
                chapterId={id}
                // videoDetails={chapterDetails}
              />
            </>
          }
        >
          {
        chapterDetails?.videos?.map((chapterDetails)=>(
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1">
              <strong>Title:</strong> {chapterDetails?.title}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong>{" "}
              {chapterDetails?.description}
            </Typography>
            <Typography variant="body1">
              <strong>Author:</strong> {chapterDetails?.author}
            </Typography>
            <Typography variant="body1">
              <strong>Upload Date:</strong>{" "}
              {new Date(
                chapterDetails?.uploadDate
              ).toLocaleDateString()}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <iframe
                width="100%"
                height="400"
                src={chapterDetails?.videoUrl}
                title={chapterDetails?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
            <Link
              href={chapterDetails?.videoUrl}
              target="_blank"
              rel="noopener"
            >
              Watch on {chapterDetails?.videoSource}
            </Link>
          </Box>
           ))
          }
        </MainCard>
      </Grid>
       
      
    </Box>
  );
};

export default AdminChapterDetailPage;


// const [
//     videoAttendanceResponse,
//     videoAttendanceResponseError,
//     videoAttendanceResponseIsLoading,
//     fetchvideoAttendanceResponse,
//   ] = useAxiosDataFunction();

//   // Fetch all chapters
//   const getvideoAttendanceResponse = (videoId) => {
//     fetchvideoAttendanceResponse({
//       axiosInstance: axios,
//       method: "get",
//       url: `localhost:8000/api/v1/academic/video/${videoId}/attendance`,
//       token: accessToken,
//     });
//   };