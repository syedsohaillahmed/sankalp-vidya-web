import * as React from "react";
import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";

const chapters = [
  { id: 1, name: "Chapter 1: Introduction", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 2, name: "Chapter 2: Basics of React", videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0" },
  { id: 3, name: "Chapter 3: State and Props", videoUrl: "https://www.youtube.com/embed/4UZrsTqkcW4" },
  { id: 4, name: "Chapter 4: Component Lifecycle", videoUrl: "https://www.youtube.com/embed/7CqJlxBYj-M" },
  { id: 5, name: "Chapter 5: Advanced Hooks", videoUrl: "https://www.youtube.com/embed/0aPLk2e2Z3g" },
];

const VideoPage2 = () => {
  const [selectedChapter, setSelectedChapter] = React.useState(chapters[0]);

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
  };

  // Modify the video URL to control YouTube player behavior
  const getVideoUrl = (url) => {
    const videoId = url.split("/embed/")[1];
    return `https://www.youtube.com/embed/${videoId}?rel=0&controls=0&modestbranding=1&autoplay=1`;
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Mini Sidebar */}
      <Box
        sx={{
          width: "250px",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e0e0e0",
          overflowY: "auto",
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Chapters
        </Typography>
        <List>
          {chapters.map((chapter) => (
            <ListItem key={chapter.id} disablePadding>
              <ListItemButton
                selected={selectedChapter.id === chapter.id}
                onClick={() => handleChapterClick(chapter)}
                sx={{
                  borderRadius: "4px",
                  "&.Mui-selected": { backgroundColor: "#e3f2fd" },
                  "&:hover": { backgroundColor: "#f1f1f1" },
                }}
              >
                <ListItemText primary={chapter.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content - Embedded Video */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          {selectedChapter.name}
        </Typography>
        <Box
          sx={{
            position: "relative",
            paddingTop: "56.25%", // 16:9 aspect ratio
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          <iframe
            src={getVideoUrl(selectedChapter.videoUrl)}
            title="Chapter Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPage2;