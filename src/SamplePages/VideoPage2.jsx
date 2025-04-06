import * as React from "react";
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { getAllChapterUC } from "../api/svUrlConstructs";
import { useSelector } from "react-redux";
import useAxiosDataFunction from "../hooks/useAxiosDataFunction";
import { useEffect, useState } from "react";
import axios from "axios";
import { PlayCircleOutline, PersonOutline, Schedule, CheckCircle, Lock } from "@mui/icons-material";

const VideoPage2 = () => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [videos, setVideos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  // API response
  const accessToken = useSelector((state) => state?.data?.accessToken);
  const studentId = useSelector((state) => state?.data?.additionalData[0]?._id);

  const [
    allChapterResponse,
    allChapterError,
    allChapterIsLoading,
    fetchAllChapter,
  ] = useAxiosDataFunction();

  // Fetch all chapters with attendance data
  const getAllChapter = () => {
    fetchAllChapter({
      axiosInstance: axios,
      method: "get",
      url: `${getAllChapterUC()}?studentId=${studentId}`,
      token: accessToken,
    });
  };

  useEffect(() => {
    getAllChapter();
  }, []);

  // Set the first chapter as selected when data loads
  useEffect(() => {
    if (allChapterResponse?.data?.data?.length > 0) {
      const chapter = allChapterResponse.data.data[0];
      setSelectedChapter(chapter);
      setVideos(chapter.videos);
    }
  }, [allChapterResponse]);

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setVideos(chapter.videos);
  };

  // Extract video ID from YouTube URL
  const getVideoId = (url) => {
    if (!url) return "";
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : "";
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleVideoClick = (video) => {
    setCurrentVideo(video);
    // Only show dialog if video hasn't been watched
    if (!video.attendance?.watched) {
      setOpenDialog(true);
    }
  };

  const markAttendance = () => {
    setLoading(true);
    // Simulate API call to mark attendance
    setTimeout(() => {
      setVideos(videos.map(v => 
        v._id === currentVideo._id 
          ? { 
              ...v, 
              attendance: { 
                watched: true, 
                watchedAt: new Date().toISOString(),
                completed: false 
              } 
            } 
          : v
      ));
      setCurrentVideo(prev => ({
        ...prev,
        attendance: { 
          watched: true, 
          watchedAt: new Date().toISOString(),
          completed: false 
        }
      }));
      setLoading(false);
      setOpenDialog(false);
    }, 1000);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentVideo(null);
  };

  if (allChapterIsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (allChapterError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography color="error">Error loading chapters: {allChapterError.message}</Typography>
      </Box>
    );
  }

  if (!allChapterResponse?.data?.data?.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>No chapters available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Mini Sidebar */}
      <Box
        sx={{
          width: "280px",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e0e0e0",
          overflowY: "auto",
          p: 2,
          position: 'sticky',
          top: 0,
          height: '100vh'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Chapters
        </Typography>
        <List>
          {allChapterResponse.data.data.map((chapter) => (
            <ListItem key={chapter._id} disablePadding>
              <ListItemButton
                selected={selectedChapter?._id === chapter._id}
                onClick={() => handleChapterClick(chapter)}
                sx={{
                  borderRadius: "4px",
                  "&.Mui-selected": { 
                    backgroundColor: "secondary.light",
                    color: "primary.main"
                  },
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <ListItemText 
                  primary={chapter.name} 
                  secondary={chapter.description}
                  secondaryTypographyProps={{ noWrap: true }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4 }}>
        {selectedChapter && (
          <>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              {selectedChapter.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {selectedChapter.description}
            </Typography>
            
            {videos?.length > 0 ? (
              <Grid container spacing={4}>
                {videos.map((video) => (
                  <Grid item xs={12} md={6} lg={4} key={video._id}>
                    <Card 
                      onClick={() => handleVideoClick(video)}
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: 3
                        },
                        position: 'relative'
                      }}
                    >
                      {/* Overlay for locked videos */}
                      {!video.attendance?.watched && (
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          zIndex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          color: 'white'
                        }}>
                          <Lock fontSize="large" />
                          <Typography variant="h6" sx={{ mt: 1 }}>
                            Mark attendance to unlock
                          </Typography>
                        </Box>
                      )}
                      
                      {/* Attendance badge */}
                      <Box sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 2
                      }}>
                        <Chip
                          icon={video.attendance?.watched ? <CheckCircle /> : null}
                          label={video.attendance?.watched ? "Completed" : "Pending"}
                          color={video.attendance?.watched ? "success" : "default"}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            backgroundColor: video.attendance?.watched ? 'rgba(46, 125, 50, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                            color: video.attendance?.watched ? '#2e7d32' : 'inherit'
                          }}
                        />
                      </Box>

                      <Box sx={{ position: 'relative', pt: '56.25%' }}>
                        <CardMedia
                          component="iframe"
                          src={`https://www.youtube.com/embed/${getVideoId(video.videoUrl)}?rel=0`}
                          title={video.title}
                          allowFullScreen
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            filter: !video.attendance?.watched ? 'blur(4px)' : 'none'
                          }}
                        />
                      </Box>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {video.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                          {video.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                          <Chip
                            icon={<PersonOutline fontSize="small" />}
                            label={video.author || 'Unknown'}
                            size="medium"
                            variant="outlined"
                            sx={{ mr: 1 }}
                          />
                          <Chip
                            icon={<Schedule fontSize="small" />}
                            label={formatDate(video.uploadDate)}
                            size="medium"
                            variant="outlined"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '60vh',
                textAlign: 'center'
              }}>
                <PlayCircleOutline sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No videos available for this chapter
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Check back later or explore other chapters
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Video Dialog - Only shown for unwatched videos */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentVideo?.title}
        </DialogTitle>
        <DialogContent>
          {currentVideo && (
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px'
            }}>
              <Lock fontSize="large" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Attendance Required
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
                Please mark your attendance to unlock this video content.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={markAttendance}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={24} /> : null}
              >
                {loading ? 'Marking...' : 'Mark Attendance'}
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Video Player - Directly shown for watched videos */}
      {currentVideo?.attendance?.watched && (
        <Dialog
          open={!!currentVideo}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {currentVideo?.title}
            <Chip
              icon={<CheckCircle />}
              label="Attendance Marked"
              color="success"
              size="small"
              sx={{ ml: 2 }}
            />
          </DialogTitle>
          <DialogContent>
            <Box sx={{ position: 'relative', pt: '56.25%', mt: 2 }}>
              <iframe
                src={`https://www.youtube.com/embed/${getVideoId(currentVideo.videoUrl)}?autoplay=1&rel=0`}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default VideoPage2;