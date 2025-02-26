import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

     
    </Box>
  );
};

export default Calendar;
