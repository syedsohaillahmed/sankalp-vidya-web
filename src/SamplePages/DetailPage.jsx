import React from "react";
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
import { styled } from "@mui/system";
import Header from "../components/Header";
import MainCard from "../components/cards/MainCard";

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

const DetailPage = () => {
  return (
    <Box sx={{ padding: "1rem" }}>
      <Header title="Chapter" />
      {/* Basic Details Section */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MainCard title={"Basic Details"}>
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Name:
                </Typography>
                <Typography variant="body1">{mockChapter.name}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Description:
                </Typography>
                <Typography variant="body1">
                  {mockChapter.description}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Subject:
                </Typography>
                <Typography variant="body1">
                  {mockChapter.subject.displayName} ({mockChapter.subject.board}
                  )
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Class:
                </Typography>
                <Typography variant="body1">
                  {mockChapter.class.name} (Grade {mockChapter.class.classGrade}
                  )
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Academic Year:
                </Typography>
                <Typography variant="body1">
                  {mockChapter.academicYear.displayName} (
                  {mockChapter.academicYear.batchName})
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Published Date:
                </Typography>
                <Typography variant="body1">
                  {new Date(mockChapter.publishedDate).toLocaleDateString()}
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
                  label={mockChapter.active ? "Active" : "Inactive"}
                  color={mockChapter.active ? "success" : "error"}
                />
              </Box>
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={6}>
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
        <MainCard title={"Video Section"}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1">
              <strong>Title:</strong> {mockChapter.videos.title}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {mockChapter.videos.description}
            </Typography>
            <Typography variant="body1">
              <strong>Author:</strong> {mockChapter.videos.author}
            </Typography>
            <Typography variant="body1">
              <strong>Upload Date:</strong>{" "}
              {new Date(mockChapter.videos.uploadDate).toLocaleDateString()}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <iframe
                width="100%"
                height="400"
                src={mockChapter.videos.videoUrl}
                title={mockChapter.videos.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
            <Link
              href={mockChapter.videos.videoUrl}
              target="_blank"
              rel="noopener"
            >
              Watch on {mockChapter.videos.videoSource}
            </Link>
          </Box>
        </MainCard>
      </Grid>
    </Box>
  );
};

export default DetailPage;
