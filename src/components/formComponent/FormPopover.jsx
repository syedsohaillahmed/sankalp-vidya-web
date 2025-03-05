import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Popover,
  Divider,
  useMediaQuery,
} from "@mui/material";

const FormPopover = ({ header,  buttonName, children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box textAlign="center" mt={1}>
      <Button variant="contained" onClick={handleOpen}>
        {buttonName}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Box p={2} sx={{ width: isMobile ? 300 : 400 }}>
          <Typography variant="h4" gutterBottom>
            {header}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {children(handleClose)} 
        </Box>
      </Popover>
    </Box>
  );
};

export default FormPopover;
